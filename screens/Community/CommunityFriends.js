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
    this.renderEmpty = this.renderEmpty.bind(this);
    this.viewProfile = this.viewProfile.bind(this);
    this.state = {
      data: [],
      loading1: true,
      loading2: true,
    };
  }

  componentDidMount() {

    var friends = [];
    var edit = this;
    var user = Parse.User.current();
    var userGeoPoint = user.get("geolocation");
    var userAvailability = this.props.user.availability;
    var query = new Parse.Query('Relation');
    query.equalTo('status', 3);
    query.equalTo('fromUser', Parse.User.current());  
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

                  for (var i = 0; i < friends.length; i++) {
            
                    if (friends[i].currentLevel == undefined) {
                        friends[i].currentLevel = "inc.";
                      } else if (friends[i].currentLevel == 0) {
                        friends[i].currentLevel = 'Débutant';
                      } else if (friends[i].currentLevel == 1) {
                        friends[i].currentLevel = 'Intermédiaire';
                      } else if (friends[i].currentLevel == 2) {
                        friends[i].currentLevel = 'Avancé';
                      } else if (friends[i].currentLevel == 3) {
                        friends[i].currentLevel = '40';
                      } else if (friends[i].currentLevel == 4) {
                        friends[i].currentLevel = '30/5';
                      } else if (friends[i].currentLevel == 5) {
                        friends[i].currentLevel = '30/4';
                      } else if (friends[i].currentLevel == 6) {
                        friends[i].currentLevel = '30/3';
                      } else if (friends[i].currentLevel == 7) {
                        friends[i].currentLevel = '30/2';
                      } else if (friends[i].currentLevel == 8) {
                        friends[i].currentLevel = '30/1';
                      } else if (friends[i].currentLevel == 9) {
                        friends[i].currentLevel = '30';
                      } else if (friends[i].currentLevel == 10) {
                        friends[i].currentLevel = '15/5';
                      } else if (friends[i].currentLevel == 11) {
                        friends[i].currentLevel = '15/4';
                      } else if (friends[i].currentLevel == 12) {
                        friends[i].currentLevel = '15/3';
                      } else if (friends[i].currentLevel == 13) {
                        friends[i].currentLevel = '15/2';
                      } else if (friends[i].currentLevel == 14) {
                        friends[i].currentLevel = '15/1';
                      } else if (friends[i].currentLevel == 15) {
                        friends[i].currentLevel = '15';
                      } else if (friends[i].currentLevel == 16) {
                        friends[i].currentLevel = '5/6';
                      } else if (friends[i].currentLevel == 17) {
                        friends[i].currentLevel = '4/6';
                      } else if (friends[i].currentLevel == 18) {
                        friends[i].currentLevel = '3/6';
                      } else if (friends[i].currentLevel == 19) {
                        friends[i].currentLevel = '2/6';
                      } else if (friends[i].currentLevel == 20) {
                        friends[i].currentLevel = '1/6';
                      } else if (friends[i].currentLevel == 21) {
                        friends[i].currentLevel = '0';
                      } else if (friends[i].currentLevel == 22) {
                        friends[i].currentLevel = '-2/6';
                      } else if (friends[i].currentLevel == 23) {
                        friends[i].currentLevel = '-4/6';
                      } else if (friends[i].currentLevel == 24) {
                        friends[i].currentLevel = '-15';
                      }

                      if (friends[i].highestLevel == undefined) {
                        friends[i].highestLevel = "inc.";
                      } else if (friends[i].highestLevel == 0) {
                        friends[i].highestLevel = 'Débutant';
                      } else if (friends[i].highestLevel == 1) {
                        friends[i].highestLevel = 'Intermédiaire';
                      } else if (friends[i].highestLevel == 2) {
                        friends[i].highestLevel = 'Avancé';
                      } else if (friends[i].highestLevel == 3) {
                        friends[i].highestLevel = '40';
                      } else if (friends[i].highestLevel == 4) {
                        friends[i].highestLevel = '30/5';
                      } else if (friends[i].highestLevel == 5) {
                        friends[i].highestLevel = '30/4';
                      } else if (friends[i].highestLevel == 6) {
                        friends[i].highestLevel = '30/3';
                      } else if (friends[i].highestLevel == 7) {
                        friends[i].highestLevel = '30/2';
                      } else if (friends[i].highestLevel == 8) {
                        friends[i].highestLevel = '30/1';
                      } else if (friends[i].highestLevel == 9) {
                        friends[i].highestLevel = '30';
                      } else if (friends[i].highestLevel == 10) {
                        friends[i].highestLevel = '15/5';
                      } else if (friends[i].highestLevel == 11) {
                        friends[i].highestLevel = '15/4';
                      } else if (friends[i].highestLevel == 12) {
                        friends[i].highestLevel = '15/3';
                      } else if (friends[i].highestLevel == 13) {
                        friends[i].highestLevel = '15/2';
                      } else if (friends[i].highestLevel == 14) {
                        friends[i].highestLevel = '15/1';
                      } else if (friends[i].highestLevel == 15) {
                        friends[i].highestLevel = '15';
                      } else if (friends[i].highestLevel == 16) {
                        friends[i].highestLevel = '5/6';
                      } else if (friends[i].highestLevel == 17) {
                        friends[i].highestLevel = '4/6';
                      } else if (friends[i].highestLevel == 18) {
                        friends[i].highestLevel = '3/6';
                      } else if (friends[i].highestLevel == 19) {
                        friends[i].highestLevel = '2/6';
                      } else if (friends[i].highestLevel == 20) {
                        friends[i].highestLevel = '1/6';
                      } else if (friends[i].highestLevel == 21) {
                        friends[i].highestLevel = '0';
                      } else if (friends[i].highestLevel == 22) {
                        friends[i].highestLevel = '-2/6';
                      } else if (friends[i].highestLevel == 23) {
                        friends[i].highestLevel = '-4/6';
                      } else if (friends[i].highestLevel == 24) {
                        friends[i].highestLevel = '-15';
                      }

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
                  edit.setState({data:friends, loading1:false})
                  console.log('loading1 terminé');
              }
            });
         }
        }
        else {edit.setState({loading1:false})}
        console.log('loading1 terminé');
      },
      error: function(e) {
        console.log(e);
      }
    })

    var query2 = new Parse.Query('Relation');
    query2.equalTo('status', 3);
    query2.equalTo('toUser', Parse.User.current());  
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

                  for (var i = 0; i < friends.length; i++) {
            
                    if (friends[i].currentLevel == undefined) {
                        friends[i].currentLevel = "inc.";
                      } else if (friends[i].currentLevel == 0) {
                        friends[i].currentLevel = 'Débutant';
                      } else if (friends[i].currentLevel == 1) {
                        friends[i].currentLevel = 'Intermédiaire';
                      } else if (friends[i].currentLevel == 2) {
                        friends[i].currentLevel = 'Avancé';
                      } else if (friends[i].currentLevel == 3) {
                        friends[i].currentLevel = '40';
                      } else if (friends[i].currentLevel == 4) {
                        friends[i].currentLevel = '30/5';
                      } else if (friends[i].currentLevel == 5) {
                        friends[i].currentLevel = '30/4';
                      } else if (friends[i].currentLevel == 6) {
                        friends[i].currentLevel = '30/3';
                      } else if (friends[i].currentLevel == 7) {
                        friends[i].currentLevel = '30/2';
                      } else if (friends[i].currentLevel == 8) {
                        friends[i].currentLevel = '30/1';
                      } else if (friends[i].currentLevel == 9) {
                        friends[i].currentLevel = '30';
                      } else if (friends[i].currentLevel == 10) {
                        friends[i].currentLevel = '15/5';
                      } else if (friends[i].currentLevel == 11) {
                        friends[i].currentLevel = '15/4';
                      } else if (friends[i].currentLevel == 12) {
                        friends[i].currentLevel = '15/3';
                      } else if (friends[i].currentLevel == 13) {
                        friends[i].currentLevel = '15/2';
                      } else if (friends[i].currentLevel == 14) {
                        friends[i].currentLevel = '15/1';
                      } else if (friends[i].currentLevel == 15) {
                        friends[i].currentLevel = '15';
                      } else if (friends[i].currentLevel == 16) {
                        friends[i].currentLevel = '5/6';
                      } else if (friends[i].currentLevel == 17) {
                        friends[i].currentLevel = '4/6';
                      } else if (friends[i].currentLevel == 18) {
                        friends[i].currentLevel = '3/6';
                      } else if (friends[i].currentLevel == 19) {
                        friends[i].currentLevel = '2/6';
                      } else if (friends[i].currentLevel == 20) {
                        friends[i].currentLevel = '1/6';
                      } else if (friends[i].currentLevel == 21) {
                        friends[i].currentLevel = '0';
                      } else if (friends[i].currentLevel == 22) {
                        friends[i].currentLevel = '-2/6';
                      } else if (friends[i].currentLevel == 23) {
                        friends[i].currentLevel = '-4/6';
                      } else if (friends[i].currentLevel == 24) {
                        friends[i].currentLevel = '-15';
                      }

                      if (friends[i].highestLevel == undefined) {
                        friends[i].highestLevel = "inc.";
                      } else if (friends[i].highestLevel == 0) {
                        friends[i].highestLevel = 'Débutant';
                      } else if (friends[i].highestLevel == 1) {
                        friends[i].highestLevel = 'Intermédiaire';
                      } else if (friends[i].highestLevel == 2) {
                        friends[i].highestLevel = 'Avancé';
                      } else if (friends[i].highestLevel == 3) {
                        friends[i].highestLevel = '40';
                      } else if (friends[i].highestLevel == 4) {
                        friends[i].highestLevel = '30/5';
                      } else if (friends[i].highestLevel == 5) {
                        friends[i].highestLevel = '30/4';
                      } else if (friends[i].highestLevel == 6) {
                        friends[i].highestLevel = '30/3';
                      } else if (friends[i].highestLevel == 7) {
                        friends[i].highestLevel = '30/2';
                      } else if (friends[i].highestLevel == 8) {
                        friends[i].highestLevel = '30/1';
                      } else if (friends[i].highestLevel == 9) {
                        friends[i].highestLevel = '30';
                      } else if (friends[i].highestLevel == 10) {
                        friends[i].highestLevel = '15/5';
                      } else if (friends[i].highestLevel == 11) {
                        friends[i].highestLevel = '15/4';
                      } else if (friends[i].highestLevel == 12) {
                        friends[i].highestLevel = '15/3';
                      } else if (friends[i].highestLevel == 13) {
                        friends[i].highestLevel = '15/2';
                      } else if (friends[i].highestLevel == 14) {
                        friends[i].highestLevel = '15/1';
                      } else if (friends[i].highestLevel == 15) {
                        friends[i].highestLevel = '15';
                      } else if (friends[i].highestLevel == 16) {
                        friends[i].highestLevel = '5/6';
                      } else if (friends[i].highestLevel == 17) {
                        friends[i].highestLevel = '4/6';
                      } else if (friends[i].highestLevel == 18) {
                        friends[i].highestLevel = '3/6';
                      } else if (friends[i].highestLevel == 19) {
                        friends[i].highestLevel = '2/6';
                      } else if (friends[i].highestLevel == 20) {
                        friends[i].highestLevel = '1/6';
                      } else if (friends[i].highestLevel == 21) {
                        friends[i].highestLevel = '0';
                      } else if (friends[i].highestLevel == 22) {
                        friends[i].highestLevel = '-2/6';
                      } else if (friends[i].highestLevel == 23) {
                        friends[i].highestLevel = '-4/6';
                      } else if (friends[i].highestLevel == 24) {
                        friends[i].highestLevel = '-15';
                      }

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
                  edit.setState({data:friends, loading2:false})
                  console.log('loading2 terminé');
              }
            });
         }
       } 
       else {edit.setState({loading2:false})}
        console.log('loading2 terminé');
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
  }

  renderEmpty() {
    if (this.state.loading1 || this.state.loading2) return null;
    return (
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <Image source={require('../../assets/icons/AppSpecific/BigYellowBall.imageset/icTennisBallBig.png')} />
        <Text style={{marginTop:10}}> Vous n'avez pas encore d'ami(e)s.</Text>
        <Text style={{marginTop:10}}> Cliquez sur "Communauté" pour en trouver ! </Text>
      </View>
    );
  }

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
          var birthday = user.get("birthday");
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
            fromChat:false,
            friendRequestSent:false,
            friendRequestReceived:false,
            clubs:clubs,
            id:id,
            birthday:birthday
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
        ListEmptyComponent={this.renderEmpty}
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


