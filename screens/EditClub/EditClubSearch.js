import React, { Component } from 'react';
import { View, Image, Text, StyleSheet, ScrollView, TouchableWithoutFeedback, TextInput, Keyboard, FlatList } from 'react-native';
import { Font } from 'expo';
import { connect } from 'react-redux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Parse } from 'parse/react-native';
import { List, ListItem } from 'react-native-elements';

Parse.initialize("3E8CAAOTf6oi3NaL6z8oVVJ7wvtfKa");
Parse.serverURL = 'https://tiebreak.herokuapp.com/parse';

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
    this.addClub = this.addClub.bind(this);
    this.state = {
      fontAvenirNextLoaded: false,
      fontAvenirLoaded: false,
      club:'',
      selectedClubId:'',
      selectedClubName:'',
      data:''
    };
  }

  async componentDidMount() {
    await Font.loadAsync({
      'AvenirNext': require('../../assets/fonts/AvenirNext.ttf'),
      'Avenir': require('../../assets/fonts/Avenir.ttf'),
    });
    this.setState({ 
      fontAvenirNextLoaded: true,
      fontAvenirLoaded: true 
    });

    var Club = Parse.Object.extend("Club");
    var query = new Parse.Query(Club);
    var edit = this;
    // User's location
    var user = Parse.User.current();
    var userGeoPoint = user.get("geolocation");
    // Interested in locations near user.
    query.near("geopoint", userGeoPoint);
    // Limit what could be a lot of points.
    //query.limit(5);
    // Final list of objects
    query.find({
      success: function(Club) {
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
        edit.setState({ data: ClubCopyFiltered });
      }
    });
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

  addClub(id, name) {
    console.log('clic sur club');
    console.log(name);
    this.setState({selectedClubId:id, selectedClubName: name});
    this.props.handleSubmitClub({id:id, name:name});
    this.props.navigation.goBack();
  }

  render() {
    return (

      <View style={{flex:1, backgroundColor:'white'}}>

      <View style={{flexDirection:'row', justifyContent:"space-around", marginTop:30, marginBottom:30}}>
          <TouchableWithoutFeedback style={{padding:30}} onPress={() => this.props.navigation.goBack()}>
          <Image style={{top:12, left:5}} source={require('../../assets/icons/General/Back.imageset/icBackGrey.png')} />
          </TouchableWithoutFeedback>
          <TextInput 
            style={styles.searchBar}
            keyboardType="default"
            returnKeyType='done'
            autoCapitalize='none'
            autoCorrect={false}
            placeholder='rechercher un club'
            underlineColorAndroid='rgba(0,0,0,0)'
            blurOnSubmit={false}
            onChangeText={(club) => this.setState({club})}
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
