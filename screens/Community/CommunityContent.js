import React from 'react';
import { StyleSheet, Text, View, Image, ScrollView, FlatList, TextInput } from 'react-native';
import { Parse } from 'parse/react-native';
import { List, ListItem } from 'react-native-elements';
var GeoPoint = require('geopoint');

Parse.initialize("3E8CAAOTf6oi3NaL6z8oVVJ7wvtfKa");
Parse.serverURL = 'https://tiebreak.herokuapp.com/parse';


export default class CommunityContent extends React.Component {

  constructor(props) {
    super(props);
    this.renderSeparator = this.renderSeparator.bind(this);
    this.renderFooter = this.renderFooter.bind(this);
    this.state = {
      data: ''
    };

    console.log('hello');

    var query = new Parse.Query(Parse.User);
    var edit = this;
    // User's location
    var user = Parse.User.current();
    var userGeoPoint = user.get("geolocation");
    console.log(userGeoPoint);
    // Interested in locations near user.
    query.near("geolocation", userGeoPoint);
    // Limit what could be a lot of points.
    query.limit(2);
    // Final list of objects
    query.find({
      success: function(Community) {
        // don't understand why but can't access to the Objects contained in the Parse Array "Club". Works with JSON.parse(JSON.stringify()).
        var CommunityCopy = JSON.parse(JSON.stringify(Community));
        var userGeoPointCopy = new GeoPoint(userGeoPoint.latitude, userGeoPoint.longitude);
        for (var i = 0; i < CommunityCopy.length; i++) {
          var CommunityCopyGeoPoint = new GeoPoint(CommunityCopy[i].geolocation.latitude, CommunityCopy[i].geolocation.longitude);
          var distance = Math.round(userGeoPointCopy.distanceTo(CommunityCopyGeoPoint, true));
          var distanceParam = {distance: distance};
          Object.assign(CommunityCopy[i], distanceParam);
        }
        console.log("setState");
        console.log(CommunityCopy);
        edit.setState({ data: CommunityCopy });
      }
    });

  }

  async componentDidMount() {

    

  }

  renderSeparator() {
      return (<View
        style={{
          height: 1,
          width: "100%",
          backgroundColor: "#CED0CE",
        }}
      /> 
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
        }}
      >
        <ActivityIndicator animating size="large" />
      </View>
    );
  };



render () {
  return (

    <View style={{flex:1, backgroundColor:'white', marginTop:0}}>

   <List
   containerStyle={{borderTopWidth:0, borderBottomWidth:0}}
   >
      <FlatList
        data={this.state.data}
        keyExtractor={item => item.objectId}
        ItemSeparatorComponent={this.renderSeparator}
        ListFooterComponent={this.renderFooter}
        renderItem={({ item }) => (
          <ListItem
          avatarStyle={{width:60, height:60, borderRadius:30, borderWidth:1, borderColor:'white', overflow:'hidden', backgroundColor:'white'}}
          avatarContainerStyle={{width:60, height:60, marginTop:7}}
          avatarOverlayContainerStyle={{backgroundColor:'transparent'}}
          titleContainerStyle={{marginLeft:50}}
          containerStyle={{ borderBottomWidth:0, height:90, justifyContent:'center'}}
          avatar={{uri:item.picture}}
          title={<Text style={{fontSize:15}}>{item.lastName}</Text>}
          subtitleNumberOfLines={3}
          subtitleContainerStyle={{marginLeft:50, width:300}}
          subtitle={
             <View>
            <Text style={{fontSize:12, paddingTop:2}}>XXX disponibilités en commun</Text>
            <Text style={{fontSize:12, paddingTop:2}}>{item.currentLevel} ({item.highestLevel})</Text>
            <Text style={{fontSize:12, paddingTop:2}}>{item.distance} km</Text>
            </View>
          }
          />
        )}
      />
    </List>
           
    </View>
           

    );
  }
}

styles = StyleSheet.create({
  searchBar: {
  paddingLeft: 30,
  fontSize: 16,
  maxHeight: 50,
  flex: .1,
  borderWidth: 9,
  borderColor: '#E4E4E4'
}
})