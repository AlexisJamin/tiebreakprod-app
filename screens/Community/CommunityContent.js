import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, FlatList, TextInput } from 'react-native';
import { Parse } from 'parse/react-native';
import { List, ListItem } from 'react-native-elements';
import { connect } from 'react-redux';

Parse.initialize("3E8CAAOTf6oi3NaL6z8oVVJ7wvtfKa");
Parse.serverURL = 'https://tiebreak.herokuapp.com/parse';

function mapStateToProps(store) {

  return { user: store.user, userClub: store.userClub, userPreferences: store.userPreferences, button: store.button }
};

class CommunityContent extends React.Component {

  constructor(props) {
    super(props);
    this.renderSeparator = this.renderSeparator.bind(this);
    this.renderFooter = this.renderFooter.bind(this);
    this.state = {
      data: null,
    };
  }

  async componentDidMount() {

    console.log('hello');

    var user = Parse.User.current();
    var userGeoPoint = user.get("geolocation");
    var query = new Parse.Query(Parse.User);
    var edit = this;
    query.notEqualTo('email', Parse.User.current().getEmail());
    // User's location
    // Interested in locations near user.
    query.withinKilometers("geolocation", userGeoPoint, this.props.userPreferences.filterFieldType.range);
    //query.near("geolocation", userGeoPoint);
    // Limit what could be a lot of points.
    query.limit(2);
    var userAvailability = this.props.user.availability;
    // Final list of objects
    query.find({
      success: function(Community) {
        // don't understand why but can't access to the Objects contained in the Parse Array "Club". Works with JSON.parse(JSON.stringify()).
        var CommunityCopy = [];
        for (var i = 0; i < Community.length; i++) {
          CommunityCopy.push(JSON.parse(JSON.stringify(Community[i])));
        }

        for (var i = 0; i < CommunityCopy.length; i++) {
          var distance = Math.round(userGeoPoint.kilometersTo(CommunityCopy[i].geolocation));
          var distanceParam = {distance: distance};
          Object.assign(CommunityCopy[i], distanceParam);
        }

        var commonDispo =0;
        for (var i = 0; i < CommunityCopy.length; i++) {
        commonDispo = 0;
            for (var j = 0; j < userAvailability.length; j++) {
              if (CommunityCopy[i].availability != undefined) { 
                var array = CommunityCopy[i].availability[j].hours.filter((n) => userAvailability[j].hours.includes(n));
                commonDispo = commonDispo + array.length;
              }
              else {commonDispo = 0}
            }
        var commonDispoParam = {commonDispo: commonDispo};
        Object.assign(CommunityCopy[i], commonDispoParam);
        }
        console.log(CommunityCopy);
        edit.setState({ data: CommunityCopy });
      },
      error: function(e) {
        console.log(e);
      }
    });

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
          avatarStyle={{width:60, height:60, borderRadius:30, borderWidth:1, borderColor:'white', overflow:'hidden', backgroundColor:'white'}}
          avatarContainerStyle={{width:60, height:60, marginTop:7}}
          avatarOverlayContainerStyle={{backgroundColor:'transparent'}}
          titleContainerStyle={{marginLeft:50}}
          containerStyle={{ borderBottomWidth:0, height:90, justifyContent:'center'}}
          avatar={ ( item.picture && { uri : item.picture.url } ) || require('../../assets/icons/General/Placeholder.imageset/3639e848-bc9c-11e6-937b-fa2a206349a2.png') } 
          title={<Text style={{fontSize:15}}>{item.firstName} {item.lastName[0]}</Text>}
          subtitleNumberOfLines={3}
          subtitleContainerStyle={{marginLeft:50, width:300}}
          subtitle={
             <View>
            <Text style={{fontSize:12, paddingTop:2}}>{item.commonDispo} disponibilité(s) en commun</Text>
            <Text style={{fontSize:12, paddingTop:2}}>{item.currentLevel} ({item.highestLevel})</Text>
            <Text style={{fontSize:12, paddingTop:2}}>{item.distance} km</Text>
            </View>
          }
          />
        )}
      />
    </List>

    </ScrollView>
           
    </View>
           
    );
  }
}

export default connect(mapStateToProps, null) (CommunityContent);


