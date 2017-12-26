import React from 'react';
import { StyleSheet, Text, View, Image, ScrollView, FlatList, TextInput, ActivityIndicator } from 'react-native';
import { List, ListItem } from 'react-native-elements';
import { connect } from 'react-redux';
import { Parse } from 'parse/react-native';

Parse.initialize("3E8CAAOTf6oi3NaL6z8oVVJ7wvtfKa");
Parse.serverURL = 'https://tiebreak.herokuapp.com/parse';

function mapStateToProps(store) {

  return { user: store.user, userClub: store.userClub, userPreferences: store.userPreferences, button: store.button }
};

function mapDispatchToProps(dispatch) {
  return {
        handleSubmit: function(value) { 
        dispatch( {type: 'viewProfile', value: value} ) 
    }
  }
};

class CommunityFriends extends React.Component {

  constructor(props) {
    super(props);
    this.renderSeparator = this.renderSeparator.bind(this);
    this.renderFooter = this.renderFooter.bind(this);
    this.viewProfile = this.viewProfile.bind(this);
    this.state = {
      data: [],
      loading1: true,
      loading2: true,
    };
  }

  async componentDidMount() {

    var friends = [];
    var edit = this;
    var user = Parse.User.current();
    var userGeoPoint = user.get("geolocation");
    var userAvailability = this.props.user.availability;
    var query = new Parse.Query('Relation');
    query.equalTo('status', 3);
    query.equalTo('fromUser', { "__type": "Pointer", "className": "_User", "objectId": user.id });  
    query.find({
      success: function(Friends) {
        console.log('query 1');
        if (Friends.length != 0) {
          var friendsQuery1 = [];
          for (var i = 0; i < Friends.length; i++) {  
           friendsQuery1.push(JSON.parse(JSON.stringify(Friends[i])));
           } 
          for (var i = 0; i < friendsQuery1.length; i++) {
            var User = Parse.Object.extend("User");
            var query = new Parse.Query(User);
            query.get(friendsQuery1[i].toUser.objectId,{
                success: function(users) {
                  console.log('query user 1');
                  var lastName = users.get("lastName");
                  var firstName = users.get("firstName");
                  var style = users.get("style");
                  var gender = users.get("gender");
                  var currentLevel = users.get("currentLevel");
                  var highestLevel = users.get("highestLevel");
                  var availability = users.get("availability");
                  var geolocation = users.get("geolocation");
                  var clubs = users.get("clubs");
                  var picture = users.get("picture").url();
                  friends.push({
                    lastName:lastName,
                    firstName:firstName,
                    style:style,
                    gender:gender,
                    currentLevel:currentLevel,
                    highestLevel:highestLevel,
                    availability:availability,
                    objectId:users.id,
                    picture:picture,
                    geolocation: geolocation,
                    clubs:clubs
                  });
                  for (var i = 0; i < friends.length; i++) {
                    var distance = Math.round(userGeoPoint.kilometersTo(friends[i].geolocation));
                    var distanceParam = {distance: distance};
                    Object.assign(friends[i], distanceParam);
                  }

                  var commonDispo = 0;
                  for (var i = 0; i < friends.length; i++) {
                  commonDispo = 0;
                      for (var j = 0; j < userAvailability.length; j++) {
                        if (friends[i].availability != undefined) { 
                          var array = friends[i].availability[j].hours.filter((n) => userAvailability[j].hours.includes(n));
                          commonDispo = commonDispo + array.length;
                        }
                        else {commonDispo = 0;}
                      }
                  var commonDispoParam = {commonDispo: commonDispo};
                  Object.assign(friends[i], commonDispoParam);
                  }
                  edit.setState({data: [...friends], loading1:false})
              }
            });
         }
        }
        else {edit.setState({loading1:false})}
      },
      error: function(e) {
        console.log(e);
      }
    })

    var query2 = new Parse.Query('Relation');
    query2.equalTo('status', 3);
    query2.equalTo('toUser', { "__type": "Pointer", "className": "_User", "objectId": user.id });  
    query2.find({
      success: function(Friends) {
        console.log('query 2');
        if (Friends.length != 0) {
          var friendsQuery2 = [];
          for (var i = 0; i < Friends.length; i++) {  
           friendsQuery2.push(JSON.parse(JSON.stringify(Friends[i])));
           } 
          for (var i = 0; i < friendsQuery2.length; i++) {
            var User = Parse.Object.extend("User");
            var query = new Parse.Query(User);
            query.get(friendsQuery2[i].fromUser.objectId,{
                success: function(users) {
                  console.log('query user 2');
                  var lastName = users.get("lastName");
                  var firstName = users.get("firstName");
                  var style = users.get("style");
                  var gender = users.get("gender");
                  var currentLevel = users.get("currentLevel");
                  var highestLevel = users.get("highestLevel");
                  var availability = users.get("availability");
                  var geolocation = users.get("geolocation");
                  var clubs = users.get("clubs");
                  var picture = users.get("picture").url();
                  friends.push({
                    lastName:lastName,
                    firstName:firstName,
                    style:style,
                    gender:gender,
                    currentLevel:currentLevel,
                    highestLevel:highestLevel,
                    availability:availability,
                    objectId:users.id,
                    geolocation: geolocation,
                    picture:picture,
                    clubs:clubs
                  });
                  for (var i = 0; i < friends.length; i++) {
                    var distance = Math.round(userGeoPoint.kilometersTo(friends[i].geolocation));
                    var distanceParam = {distance: distance};
                    Object.assign(friends[i], distanceParam);
                  }
                  var commonDispo = 0;
                  for (var i = 0; i < friends.length; i++) {
                  commonDispo = 0;
                      for (var j = 0; j < userAvailability.length; j++) {
                        if (friends[i].availability != undefined) { 
                          var array = friends[i].availability[j].hours.filter((n) => userAvailability[j].hours.includes(n));
                          commonDispo = commonDispo + array.length;
                        }
                        else {commonDispo = 0;}
                      }
                  var commonDispoParam = {commonDispo: commonDispo};
                  Object.assign(friends[i], commonDispoParam);
                  }
                  edit.setState({data: [...friends], loading2:false})
              }
            });
         }
       } 
       else {edit.setState({loading2:false})}
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
    if (!this.state.loading1 && !this.state.loading2) return null;

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

  viewProfile(id) {
     var view = this;
     var User = Parse.Object.extend("User");
     var query = new Parse.Query(User);
     
     query.get(id, {
      success: function(user) {
          // The object was retrieved successfully.
          var lastName = user.get("lastName");
          var firstName = user.get("firstName");
          var style = user.get("style");
          var gender = user.get("gender");
          var currentLevel = user.get("currentLevel");
          var highestLevel = user.get("highestLevel");
          var availability = user.get("availability");
          var picture = user.get("picture").url();
          var clubs = user.get("clubs");
          var id = user.id;

          view.props.handleSubmit({
            lastName:lastName,
            firstName:firstName,
            style:style,
            gender:gender,
            currentLevel:currentLevel,
            highestLevel:highestLevel,
            availability:availability,
            picture: picture,
            isFriend: true,
            friendRequestSent:false,
            friendRequestReceived:false,
            clubs: clubs,
            id: id
          })
    view.props.navigation.navigate("ProfileView");
        }
      });
  }


render () {
  return (

    <View style={{flex:1, backgroundColor:'white', marginTop:0}}>

   <List
   containerStyle={{borderTopWidth:0, borderBottomWidth:0}}
   >
      <FlatList
        data={this.state.data}
        extraData={this.state}
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
          avatar={{ uri : item.picture }  || require('../../assets/icons/General/Placeholder.imageset/3639e848-bc9c-11e6-937b-fa2a206349a2.png') }
          title={<Text style={{fontSize:15}}>{item.firstName} {item.lastName[0]}.</Text>}
          subtitleNumberOfLines={3}
          subtitleContainerStyle={{marginLeft:50, width:300}}
          subtitle={
             <View>
            <Text style={{fontSize:12, paddingTop:2}}>{item.commonDispo} disponibilité(s) en commun</Text>
            <Text style={{fontSize:12, paddingTop:2}}>{item.currentLevel} ({item.highestLevel})</Text>
            <Text style={{fontSize:12, paddingTop:2}}>{item.distance} km</Text>
            </View>
          }
          onPress={()=>{this.viewProfile(item.objectId)}}
          />
        )}
      />
    </List>
           
    </View>
           
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps) (CommunityFriends);


