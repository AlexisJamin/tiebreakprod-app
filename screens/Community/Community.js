import React from 'react';
import { StyleSheet, Text, View, Image, TextInput, Keyboard, Platform, Alert } from 'react-native';
import { Constants, Location, Permissions, IntentLauncherAndroid } from 'expo';
import { TabNavigator } from 'react-navigation';

import CommunityHeader from './CommunityHeader';
import CommunityButton from './CommunityButton';
import CommunityContent from './CommunityContent';
import CommunityFriends from './CommunityFriends';

import { connect } from 'react-redux';

function mapDispatchToProps(dispatch) {
  return {
        handleSubmit: function(value) { 
        dispatch( {type: 'searchPlayer', value: value} ) 
    }
  }
};

const CommunityNavigator = TabNavigator(
{
  CommunityContent: {screen: CommunityContent, navigationOptions: {tabBarVisible: false}},
  CommunityFriends: {screen: CommunityFriends, navigationOptions: {tabBarVisible: false}},
},
{
  swipeEnabled: false,
  lazy: true,
  animationEnabled: false
  },
);

class Community extends React.Component {

  constructor(props) {
    super(props);
    this._searchPlayer = this._searchPlayer.bind(this);
    this.state = {
      location:null
    };
  }

  async componentWillMount() {
     if (Platform.OS === 'android' && !Constants.isDevice) {
      Alert.alert('isDevice'); 
    } else {
      this._getLocationAsync();
      console.log('_getLocationAsync ok');
    }
}

  _searchPlayer(player) {
    console.log('player');
    console.log(player);
    this.props.handleSubmit({player:player});
  }

  _getIntentLauncherAndroidAsync = async () => {
    await IntentLauncherAndroid.startActivityAsync(IntentLauncherAndroid.ACTION_LOCATION_SOURCE_SETTINGS);
    let location = await Location.getCurrentPositionAsync({enableHighAccuracy:true});
    console.log('location');
    console.log(location);
    this.setState({ location: location });
    console.log('setState ok');
    if (this.state.location) {
      console.log('this.state.location ok');
      var point = new Parse.GeoPoint({latitude: this.state.location.coords.latitude, longitude: this.state.location.coords.longitude});
      var user = new Parse.User();
      user.set("geolocation", point);
      user.save();
    }
  };

  _getLocationAsync = async () => {
    let {status} = await Permissions.askAsync(Permissions.LOCATION);
    let service = await Location.getProviderStatusAsync();
    console.log('status');
    console.log(status);
    console.log('service');
    console.log(service);

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
        console.log('location');
        console.log(location);
        this.setState({ location: location });
        console.log('setState ok');
        if (this.state.location) {
          console.log('this.state.location ok');
          var point = new Parse.GeoPoint({latitude: this.state.location.coords.latitude, longitude: this.state.location.coords.longitude});
          var user = new Parse.User();
          user.set("geolocation", point);
          user.save();
        }
      }
  };

  render() {
    return (

    	<View style={{flex:1, backgroundColor:'white'}}>

         <View style={{
        position:'absolute',
        width:'100%',
        height:'100%',
        flexDirection:'row', 
        alignItems:'flex-start',
      }}>
  
          <View style={{flex:1, alignItems:'stretch'}}>
          <CommunityButton navigation={this.props.navigation}/>
          <TextInput 
          style={styles.searchBar}
          keyboardType="default"
          returnKeyType='done'
          autoCorrect={false}
          placeholder='Rechercher un joueur (prénom)'
          underlineColorAndroid='rgba(0,0,0,0)'
          blurOnSubmit={false}
          autoCapitalize='sentences'
          onChangeText={(player) => this._searchPlayer(player)}
          onSubmitEditing={Keyboard.dismiss}
          />
          </View>

        </View>

          <View style={{height:80, marginBottom:90}}>
           <CommunityHeader navigation={this.props.navigation}/>
          </View>

          <CommunityNavigator navigation={this.props.navigation}/>
        

      </View>

    );
  }
}

Community.router = CommunityNavigator.router;

export default connect(null, mapDispatchToProps) (Community);

styles = StyleSheet.create({
  searchBar: {
    paddingLeft:20,
    fontSize:13,
    maxHeight:40,
    flex:.1,
    borderWidth:6,
    borderColor:'#E4E4E4'
  }
})

