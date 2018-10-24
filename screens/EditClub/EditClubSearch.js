import React, { Component } from 'react';
import { View, Image, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Keyboard, FlatList, ActivityIndicator, Linking, Platform, Alert } from 'react-native';
import { Font, Constants, Location, Permissions, IntentLauncherAndroid } from 'expo';
import { Entypo } from '@expo/vector-icons';
import { connect } from 'react-redux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Parse } from 'parse/react-native';
import { List, ListItem } from 'react-native-elements';

import translate from '../../translate.js';

function mapStateToProps(store) {
  return { user: store.user, userClub: store.userClub, userPreferences: store.userPreferences, button: store.button }
};

function mapDispatchToProps(dispatch) {
  return {
        handleSubmitClub: function(value) { 
        dispatch( {type: 'userClub', value: value} ) 
    }
  }
};


class EditClubSearch extends React.Component {

constructor(props) {
    super(props);
    this.renderSeparator = this.renderSeparator.bind(this);
    this.renderFooter = this.renderFooter.bind(this);
    this.renderEmpty = this.renderEmpty.bind(this);
    this._onChangeText = this._onChangeText.bind(this);
    this.addClub = this.addClub.bind(this);
    this.state = {
      loading:true,
      selectedClubId:'',
      selectedClubName:'',
      data:null,
      dataCopy:null,
      location:null
    };
    this.getLocation();
  }

  getLocation() {
     if (Platform.OS === 'android' && !Constants.isDevice) {
      Alert.alert('isDevice'); 
    } else {
      this._getLocationAsync().then(()=>{
        var point = new Parse.GeoPoint({latitude: this.state.location.coords.latitude, longitude: this.state.location.coords.longitude});
        var user = Parse.User.current() || Parse.User.currentAsync();
        user.set("geolocation", point);
        user.save();
      });
    }
}

  _getIntentLauncherAndroidAsync = async () => {
    await IntentLauncherAndroid.startActivityAsync(IntentLauncherAndroid.ACTION_LOCATION_SOURCE_SETTINGS);
    let location = await Location.getCurrentPositionAsync({enableHighAccuracy:true});
    this.setState({ location: location });
  };

  _getLocationAsync = async () => {
    let {status} = await Permissions.askAsync(Permissions.LOCATION);
    let service = await Location.getProviderStatusAsync();

    if (status != 'granted') {
     console.log('Permission to access location was denied');
     Alert.alert(
          "Vous n'avez pas autorisé Tie Break à accéder à votre localisation. Allez dans Réglages > Confidentialité pour l'activer.",
          "La localisation est indispensable pour trouver des ami(e)s ou réserver des terrains");
     this.setState({ location: undefined });
    } else if (!service.locationServicesEnabled) {
      if (Platform.OS === 'android') {
        Alert.alert(
          "La localisation est désactivée sur votre mobile.",
          "La localisation est indispensable pour trouver des ami(e)s ou réserver des terrains.",
          [
            {text: 'Activer', onPress : () => this._getIntentLauncherAndroidAsync()},
            {text: 'Non', onPress : () => this.setState({ location: undefined }), style:'cancel'},
          ],
          { cancelable: false }
          );
      } else {
        Alert.alert(
          "La localisation est désactivée sur votre mobile. Allez dans Réglages > Confidentialité pour l'activer.",
          "La localisation est indispensable pour trouver des ami(e)s ou réserver des terrains");
        this.setState({ location: undefined });
      }
    } else if (service.locationServicesEnabled) {
        let location = await Location.getCurrentPositionAsync({enableHighAccuracy:true});
        this.setState({ location: location });
      }
  };

   componentDidMount() {

    var Club = Parse.Object.extend("Club");
    var query = new Parse.Query(Club);
    var edit = this;

    var user = Parse.User.current() || Parse.User.currentAsync();
    var userGeoPoint = user.get("geolocation");

    if (userGeoPoint != undefined) {
      query.near("geopoint", userGeoPoint);
      query.limit(30);
      query.find({
        success: function(Club) {
          if (Club.length != 0) {
            // don't understand why but can't access to the Objects contained in the Parse Array "Club". Works with JSON.parse(JSON.stringify()).
            var ClubCopy = JSON.parse(JSON.stringify(Club));
            // sorts clubs already in user's club list
            // calculate distance between user and the clubs
            for (var i = 0; i < ClubCopy.length; i++) {
              var distance = Math.round(userGeoPoint.kilometersTo(ClubCopy[i].geopoint));
              var distanceParam = {distance: distance};
              Object.assign(ClubCopy[i], distanceParam);
            }
            var ClubCopyFiltered = ClubCopy.filter(function (o1) {
                return !edit.props.userClub.some(function (o2) {
                    return o1.objectId === o2.id; 
               });
            });
            edit.setState({ data: ClubCopyFiltered, dataCopy: ClubCopyFiltered, loading:false });
          } else { edit.setState({ data: null, loading:false }) }
        }
      });
    } else { this.setState({ data: null, loading:false }) }
  }

   renderSeparator() {
      return (<View
        style={{
          height: 1,
          width: "100%",
          backgroundColor: "#CED0CE"
        }}/> 
      );
  }

  renderFooter() {
    if (!this.state.loading) return null;

    return (
      <View
        style={{
          paddingVertical: 20,
          borderTopWidth: 1,
          borderColor: "#CED0CE"
        }}>
        <ActivityIndicator animating size="large" />
      </View>
    );
  }

  renderEmpty() {
    if (this.state.loading) return null;
    return (
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <Image source={require('../../assets/icons/AppSpecific/BigYellowBall.imageset/icTennisBallBig.png')} />
        <Text style={{marginTop:10, marginBottom:5}}> {translate.noResult[this.props.user.currentLocale]} </Text>
        <Text style={{marginTop:10, width:200, textAlign: 'center'}}> {translate.contactUsAddClub[this.props.user.currentLocale]} </Text>
        <Text style={{marginTop:12, textDecorationLine:'underline', fontSize:16}} onPress={()=>Linking.openURL('mailto: contact@tie-break.fr')}> contact@tie-break.fr </Text>
      </View>
    );
  }

  _onChangeText(tag) {

    var edit = this;

    if (tag.length==0) {
      this.setState({data:this.state.dataCopy})
    }

    if (tag.length>2) {

      this.setState({loading:true})

      console.log('tag.length>2');
      var Club = Parse.Object.extend("Club");
      var user = Parse.User.current() || Parse.User.currentAsync();
      var userGeoPoint = user.get("geolocation");
      var query = new Parse.Query(Club);
      query.startsWith("tags", tag);
      query.find({
      success: function(Club) {
        if (Club.length != 0) {
          console.log(Club.length);
          // don't understand why but can't access to the Objects contained in the Parse Array "Club". Works with JSON.parse(JSON.stringify()).
          var ClubCopy = JSON.parse(JSON.stringify(Club));
          // sorts clubs already in user's club list
          // calculate distance between user and the clubs
          for (var i = 0; i < ClubCopy.length; i++) {
            var distance = Math.round(userGeoPoint.kilometersTo(ClubCopy[i].geopoint));
            var distanceParam = {distance: distance};
            Object.assign(ClubCopy[i], distanceParam);
          }
          var ClubCopyFiltered = ClubCopy.filter(function (o1) {
              return !edit.props.userClub.some(function (o2) {
                  return o1.objectId === o2.id; 
             });
          });
          edit.setState({ data: ClubCopyFiltered, loading:false });
          console.log('setState ok');
        } else {edit.setState({ data: null, loading:false })}
      }
      });
    }

}

  addClub(id, name) {
    this.setState({selectedClubId:id, selectedClubName: name});
    this.props.handleSubmitClub({id:id, name:name});
    this.props.navigation.goBack();
  }

  render() {
    return (

      <View style={{flex:1, backgroundColor:'white'}}>

      <View style={{flexDirection:'row', justifyContent:"space-around", marginTop:30, marginBottom:30}}>
          <TouchableOpacity hitSlop={{top:50, left:50, bottom:50, right:50}} onPress={() => this.props.navigation.goBack()}>
          <Entypo name="chevron-left" size={25} style={{top:5}} />
          </TouchableOpacity>
          <TextInput 
            style={styles.searchBar}
            keyboardType="default"
            returnKeyType='done'
            autoCapitalize='none'
            autoCorrect={false}
            placeholder={translate.searchClub[this.props.user.currentLocale]}
            underlineColorAndroid='rgba(0,0,0,0)'
            blurOnSubmit={false}
            onChangeText={(tag) => this._onChangeText(tag)}
            onSubmitEditing={Keyboard.dismiss}
          />
      </View>

       <ScrollView>

      <List
       containerStyle={{borderTopWidth:0, borderBottomWidth:0}}
       >
          <FlatList
            data={this.state.data}
            keyExtractor={data => data.objectId}
            ItemSeparatorComponent={this.renderSeparator}
            ListFooterComponent={this.renderFooter}
            ListEmptyComponent={this.renderEmpty}
            renderItem={({ item }) => (
              <ListItem
              titleContainerStyle={{marginLeft:20}}
              subtitleContainerStyle={{marginLeft:20}}
              containerStyle={{borderBottomWidth: 0, height:70, justifyContent:'center'}}
              title={<Text style={{fontSize:15}}>{item.name}</Text>}
              subtitle={<Text style={{fontSize:12, paddingTop:2}}>{item.distance} km</Text>}
              onPress={()=>{this.addClub(item.objectId, item.name)}}
              />
            )}
          />
      </List>
     

      </ScrollView>

      </View>

    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps) (EditClubSearch);

const styles = StyleSheet.create({
  searchBar: {
    width:250,
    height:40, 
    borderWidth:1, 
    borderColor:'rgb(213,212,216)', 
    overflow:'hidden', 
    borderRadius:5,
    paddingLeft:20
  },
    text: {
    paddingLeft:10,
    color:'black'
  }
});
