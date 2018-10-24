import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, FlatList, TextInput, ActivityIndicator, RefreshControl, TouchableOpacity } from 'react-native';
import { Parse } from 'parse/react-native';
import { Amplitude } from 'expo';
import { NavigationActions } from 'react-navigation';
import { List, ListItem } from 'react-native-elements';
import { connect } from 'react-redux';

import translate from '../../translate.js';

function mapStateToProps(store) {
  return { user: store.user, 
           userClub: store.userClub, 
           userPreferences: store.userPreferences, 
           button: store.button, 
           searchPlayer: store.searchPlayer 
         }
};

function mapDispatchToProps(dispatch) {
  return {
        handleSubmit: function(value) { 
        dispatch( {type: 'viewProfile', value: value} ) 
    }
  }
};

class CommunityContent extends React.Component {

  constructor(props) {
    super(props);
    this.renderSeparator = this.renderSeparator.bind(this);
    this.renderFooter = this.renderFooter.bind(this);
    this.renderEmpty = this.renderEmpty.bind(this);
    this.onRefresh = this.onRefresh.bind(this);
    this.viewProfile = this.viewProfile.bind(this);
    this.queryFriends = this.queryFriends.bind(this);
    this.state = {
      data:null,
      dataCopy:null,
      loading:true,
      refreshing:false,
      isFriend:false,
      clubs:[],
      isClubsReady:false
    };

  }

  componentWillReceiveProps(props) {

    if (props.navigation.state.params && props.navigation.state.params.newPreference) {
      this.setState({loading:true})
      this.queryFriends();
    }

    if (props.searchPlayer.player && props.searchPlayer.player.length==0 && !props.navigation.state.params) {
      this.setState({data:this.state.dataCopy})
    }

    if (props.searchPlayer.player && props.searchPlayer.player.length>2) {

      this.setState({loading:true})
      var edit = this;
      var user = Parse.User.current() || Parse.User.currentAsync();
      var userGeoPoint = user.get("geolocation");

      if (userGeoPoint != undefined) {
        
        var userAvailability = this.props.user.availability;
        var query = new Parse.Query(Parse.User);
        query.notEqualTo('email', user.getEmail());
        query.startsWith("firstName", props.searchPlayer.player);
        query.find({
          success: function(Community) {
            // don't understand why but can't access to the Objects contained in the Parse Array "Club". Works with JSON.parse(JSON.stringify()).
            if (Community.length != 0) {

            var CommunityCopy = [];
            for (var i = 0; i < Community.length; i++) {
              CommunityCopy.push(JSON.parse(JSON.stringify(Community[i])));
            }

            for (var i = 0; i < CommunityCopy.length; i++) {
              if (CommunityCopy[i].geolocation != undefined) {
              var distance = Math.round(userGeoPoint.kilometersTo(CommunityCopy[i].geolocation));
              var distanceParam = {distance: distance};
              Object.assign(CommunityCopy[i], distanceParam);
              }
            }

            for (var i = 0; i < CommunityCopy.length; i++) {
                
                if (CommunityCopy[i].currentLevel == undefined) {
                    CommunityCopy[i].currentLevel = "inc.";
                  } else if (CommunityCopy[i].currentLevel == 0) {
                    CommunityCopy[i].currentLevel = 'Débutant';
                  } else if (CommunityCopy[i].currentLevel == 1) {
                    CommunityCopy[i].currentLevel = 'Intermédiaire';
                  } else if (CommunityCopy[i].currentLevel == 2) {
                    CommunityCopy[i].currentLevel = 'Avancé';
                  } else if (CommunityCopy[i].currentLevel == 3) {
                    CommunityCopy[i].currentLevel = '40';
                  } else if (CommunityCopy[i].currentLevel == 4) {
                    CommunityCopy[i].currentLevel = '30/5';
                  } else if (CommunityCopy[i].currentLevel == 5) {
                    CommunityCopy[i].currentLevel = '30/4';
                  } else if (CommunityCopy[i].currentLevel == 6) {
                    CommunityCopy[i].currentLevel = '30/3';
                  } else if (CommunityCopy[i].currentLevel == 7) {
                    CommunityCopy[i].currentLevel = '30/2';
                  } else if (CommunityCopy[i].currentLevel == 8) {
                    CommunityCopy[i].currentLevel = '30/1';
                  } else if (CommunityCopy[i].currentLevel == 9) {
                    CommunityCopy[i].currentLevel = '30';
                  } else if (CommunityCopy[i].currentLevel == 10) {
                    CommunityCopy[i].currentLevel = '15/5';
                  } else if (CommunityCopy[i].currentLevel == 11) {
                    CommunityCopy[i].currentLevel = '15/4';
                  } else if (CommunityCopy[i].currentLevel == 12) {
                    CommunityCopy[i].currentLevel = '15/3';
                  } else if (CommunityCopy[i].currentLevel == 13) {
                    CommunityCopy[i].currentLevel = '15/2';
                  } else if (CommunityCopy[i].currentLevel == 14) {
                    CommunityCopy[i].currentLevel = '15/1';
                  } else if (CommunityCopy[i].currentLevel == 15) {
                    CommunityCopy[i].currentLevel = '15';
                  } else if (CommunityCopy[i].currentLevel == 16) {
                    CommunityCopy[i].currentLevel = '5/6';
                  } else if (CommunityCopy[i].currentLevel == 17) {
                    CommunityCopy[i].currentLevel = '4/6';
                  } else if (CommunityCopy[i].currentLevel == 18) {
                    CommunityCopy[i].currentLevel = '3/6';
                  } else if (CommunityCopy[i].currentLevel == 19) {
                    CommunityCopy[i].currentLevel = '2/6';
                  } else if (CommunityCopy[i].currentLevel == 20) {
                    CommunityCopy[i].currentLevel = '1/6';
                  } else if (CommunityCopy[i].currentLevel == 21) {
                    CommunityCopy[i].currentLevel = '0';
                  } else if (CommunityCopy[i].currentLevel == 22) {
                    CommunityCopy[i].currentLevel = '-2/6';
                  } else if (CommunityCopy[i].currentLevel == 23) {
                    CommunityCopy[i].currentLevel = '-4/6';
                  } else if (CommunityCopy[i].currentLevel == 24) {
                    CommunityCopy[i].currentLevel = '-15';
                  }

                  if (CommunityCopy[i].highestLevel == undefined) {
                    CommunityCopy[i].highestLevel = "inc.";
                  } else if (CommunityCopy[i].highestLevel == 0) {
                    CommunityCopy[i].highestLevel = 'Débutant';
                  } else if (CommunityCopy[i].highestLevel == 1) {
                    CommunityCopy[i].highestLevel = 'Intermédiaire';
                  } else if (CommunityCopy[i].highestLevel == 2) {
                    CommunityCopy[i].highestLevel = 'Avancé';
                  } else if (CommunityCopy[i].highestLevel == 3) {
                    CommunityCopy[i].highestLevel = '40';
                  } else if (CommunityCopy[i].highestLevel == 4) {
                    CommunityCopy[i].highestLevel = '30/5';
                  } else if (CommunityCopy[i].highestLevel == 5) {
                    CommunityCopy[i].highestLevel = '30/4';
                  } else if (CommunityCopy[i].highestLevel == 6) {
                    CommunityCopy[i].highestLevel = '30/3';
                  } else if (CommunityCopy[i].highestLevel == 7) {
                    CommunityCopy[i].highestLevel = '30/2';
                  } else if (CommunityCopy[i].highestLevel == 8) {
                    CommunityCopy[i].highestLevel = '30/1';
                  } else if (CommunityCopy[i].highestLevel == 9) {
                    CommunityCopy[i].highestLevel = '30';
                  } else if (CommunityCopy[i].highestLevel == 10) {
                    CommunityCopy[i].highestLevel = '15/5';
                  } else if (CommunityCopy[i].highestLevel == 11) {
                    CommunityCopy[i].highestLevel = '15/4';
                  } else if (CommunityCopy[i].highestLevel == 12) {
                    CommunityCopy[i].highestLevel = '15/3';
                  } else if (CommunityCopy[i].highestLevel == 13) {
                    CommunityCopy[i].highestLevel = '15/2';
                  } else if (CommunityCopy[i].highestLevel == 14) {
                    CommunityCopy[i].highestLevel = '15/1';
                  } else if (CommunityCopy[i].highestLevel == 15) {
                    CommunityCopy[i].highestLevel = '15';
                  } else if (CommunityCopy[i].highestLevel == 16) {
                    CommunityCopy[i].highestLevel = '5/6';
                  } else if (CommunityCopy[i].highestLevel == 17) {
                    CommunityCopy[i].highestLevel = '4/6';
                  } else if (CommunityCopy[i].highestLevel == 18) {
                    CommunityCopy[i].highestLevel = '3/6';
                  } else if (CommunityCopy[i].highestLevel == 19) {
                    CommunityCopy[i].highestLevel = '2/6';
                  } else if (CommunityCopy[i].highestLevel == 20) {
                    CommunityCopy[i].highestLevel = '1/6';
                  } else if (CommunityCopy[i].highestLevel == 21) {
                    CommunityCopy[i].highestLevel = '0';
                  } else if (CommunityCopy[i].highestLevel == 22) {
                    CommunityCopy[i].highestLevel = '-2/6';
                  } else if (CommunityCopy[i].highestLevel == 23) {
                    CommunityCopy[i].highestLevel = '-4/6';
                  } else if (CommunityCopy[i].highestLevel == 24) {
                    CommunityCopy[i].highestLevel = '-15';
                  }

            }

            var commonDispo = 0;
            for (var i = 0; i < CommunityCopy.length; i++) {
            commonDispo = 0;
                for (var j = 0; j < userAvailability.length; j++) {
                  if (CommunityCopy[i].availability != undefined) { 
                    var array = CommunityCopy[i].availability[j].hours.filter((n) => userAvailability[j].hours.includes(n));
                    commonDispo = commonDispo + array.length;
                  }
                  else {commonDispo = 0;}
                }
            var commonDispoParam = {commonDispo: commonDispo};
            Object.assign(CommunityCopy[i], commonDispoParam);
            }
            CommunityCopy.sort(function (a, b) {
            return a.commonDispo - b.commonDispo;
            }).reverse();

            edit.setState({ data: CommunityCopy, loading: false });
            }
            else {edit.setState({loading:false, data:null})}
          },
          error: function(e) {
            console.log(e);
          }
        });
      
      } else {edit.setState({loading:false, data:null})}

    }

  }

  queryFriends() {

    if (this.props.userPreferences.filterFieldType.key === "myClubs") {
      var selectedClub = this.props.userPreferences.filterFieldType.selectedClub;
    } else if (this.props.userPreferences.filterFieldType.key === "aroundMe") {
      var selectedClub = false;
    }

      var edit = this;
      var user = Parse.User.current() || Parse.User.currentAsync();
      var userGeoPoint = user.get("geolocation");
      
    if (userGeoPoint != undefined) {

      var query = new Parse.Query(Parse.User);
      query.notEqualTo('email', user.getEmail());
      query.greaterThanOrEqualTo("currentLevel", this.props.userPreferences.filterLevel.from);
      query.lessThanOrEqualTo("currentLevel", this.props.userPreferences.filterLevel.to);
      if (this.props.userPreferences.filterGender === "man") {
        query.notEqualTo("gender", "female");
      }
      if (this.props.userPreferences.filterGender === "woman") {
        query.notEqualTo("gender", "male");
      }
      if (this.props.userPreferences.filterFieldType.key === "aroundMe") {
        query.withinKilometers("geolocation", userGeoPoint, this.props.userPreferences.filterFieldType.range);
      }
      if (selectedClub) {
        query.equalTo("clubs", selectedClub);
      }
      query.limit(50);
      var userAvailability = this.props.user.availability;
      query.find({
        success: function(Community) {
          // don't understand why but can't access to the Objects contained in the Parse Array "Club". Works with JSON.parse(JSON.stringify()).
          if (Community.length != 0) {
          var CommunityCopy = [];
          for (var i = 0; i < Community.length; i++) {
            CommunityCopy.push(JSON.parse(JSON.stringify(Community[i])));
          }

          if (edit.props.userPreferences.filterFieldType.key === "aroundMe") {
            for (var i = 0; i < CommunityCopy.length; i++) {
              var distance = Math.round(userGeoPoint.kilometersTo(CommunityCopy[i].geolocation));
              var distanceParam = {distance: distance};
              Object.assign(CommunityCopy[i], distanceParam);
            }
          }

          for (var i = 0; i < CommunityCopy.length; i++) {
              
              if (CommunityCopy[i].currentLevel == undefined) {
                  CommunityCopy[i].currentLevel = "inc.";
                } else if (CommunityCopy[i].currentLevel == 0) {
                  CommunityCopy[i].currentLevel = 'Débutant';
                } else if (CommunityCopy[i].currentLevel == 1) {
                  CommunityCopy[i].currentLevel = 'Intermédiaire';
                } else if (CommunityCopy[i].currentLevel == 2) {
                  CommunityCopy[i].currentLevel = 'Avancé';
                } else if (CommunityCopy[i].currentLevel == 3) {
                  CommunityCopy[i].currentLevel = '40';
                } else if (CommunityCopy[i].currentLevel == 4) {
                  CommunityCopy[i].currentLevel = '30/5';
                } else if (CommunityCopy[i].currentLevel == 5) {
                  CommunityCopy[i].currentLevel = '30/4';
                } else if (CommunityCopy[i].currentLevel == 6) {
                  CommunityCopy[i].currentLevel = '30/3';
                } else if (CommunityCopy[i].currentLevel == 7) {
                  CommunityCopy[i].currentLevel = '30/2';
                } else if (CommunityCopy[i].currentLevel == 8) {
                  CommunityCopy[i].currentLevel = '30/1';
                } else if (CommunityCopy[i].currentLevel == 9) {
                  CommunityCopy[i].currentLevel = '30';
                } else if (CommunityCopy[i].currentLevel == 10) {
                  CommunityCopy[i].currentLevel = '15/5';
                } else if (CommunityCopy[i].currentLevel == 11) {
                  CommunityCopy[i].currentLevel = '15/4';
                } else if (CommunityCopy[i].currentLevel == 12) {
                  CommunityCopy[i].currentLevel = '15/3';
                } else if (CommunityCopy[i].currentLevel == 13) {
                  CommunityCopy[i].currentLevel = '15/2';
                } else if (CommunityCopy[i].currentLevel == 14) {
                  CommunityCopy[i].currentLevel = '15/1';
                } else if (CommunityCopy[i].currentLevel == 15) {
                  CommunityCopy[i].currentLevel = '15';
                } else if (CommunityCopy[i].currentLevel == 16) {
                  CommunityCopy[i].currentLevel = '5/6';
                } else if (CommunityCopy[i].currentLevel == 17) {
                  CommunityCopy[i].currentLevel = '4/6';
                } else if (CommunityCopy[i].currentLevel == 18) {
                  CommunityCopy[i].currentLevel = '3/6';
                } else if (CommunityCopy[i].currentLevel == 19) {
                  CommunityCopy[i].currentLevel = '2/6';
                } else if (CommunityCopy[i].currentLevel == 20) {
                  CommunityCopy[i].currentLevel = '1/6';
                } else if (CommunityCopy[i].currentLevel == 21) {
                  CommunityCopy[i].currentLevel = '0';
                } else if (CommunityCopy[i].currentLevel == 22) {
                  CommunityCopy[i].currentLevel = '-2/6';
                } else if (CommunityCopy[i].currentLevel == 23) {
                  CommunityCopy[i].currentLevel = '-4/6';
                } else if (CommunityCopy[i].currentLevel == 24) {
                  CommunityCopy[i].currentLevel = '-15';
                }

                if (CommunityCopy[i].highestLevel == undefined) {
                  CommunityCopy[i].highestLevel = "inc.";
                } else if (CommunityCopy[i].highestLevel == 0) {
                  CommunityCopy[i].highestLevel = 'Débutant';
                } else if (CommunityCopy[i].highestLevel == 1) {
                  CommunityCopy[i].highestLevel = 'Intermédiaire';
                } else if (CommunityCopy[i].highestLevel == 2) {
                  CommunityCopy[i].highestLevel = 'Avancé';
                } else if (CommunityCopy[i].highestLevel == 3) {
                  CommunityCopy[i].highestLevel = '40';
                } else if (CommunityCopy[i].highestLevel == 4) {
                  CommunityCopy[i].highestLevel = '30/5';
                } else if (CommunityCopy[i].highestLevel == 5) {
                  CommunityCopy[i].highestLevel = '30/4';
                } else if (CommunityCopy[i].highestLevel == 6) {
                  CommunityCopy[i].highestLevel = '30/3';
                } else if (CommunityCopy[i].highestLevel == 7) {
                  CommunityCopy[i].highestLevel = '30/2';
                } else if (CommunityCopy[i].highestLevel == 8) {
                  CommunityCopy[i].highestLevel = '30/1';
                } else if (CommunityCopy[i].highestLevel == 9) {
                  CommunityCopy[i].highestLevel = '30';
                } else if (CommunityCopy[i].highestLevel == 10) {
                  CommunityCopy[i].highestLevel = '15/5';
                } else if (CommunityCopy[i].highestLevel == 11) {
                  CommunityCopy[i].highestLevel = '15/4';
                } else if (CommunityCopy[i].highestLevel == 12) {
                  CommunityCopy[i].highestLevel = '15/3';
                } else if (CommunityCopy[i].highestLevel == 13) {
                  CommunityCopy[i].highestLevel = '15/2';
                } else if (CommunityCopy[i].highestLevel == 14) {
                  CommunityCopy[i].highestLevel = '15/1';
                } else if (CommunityCopy[i].highestLevel == 15) {
                  CommunityCopy[i].highestLevel = '15';
                } else if (CommunityCopy[i].highestLevel == 16) {
                  CommunityCopy[i].highestLevel = '5/6';
                } else if (CommunityCopy[i].highestLevel == 17) {
                  CommunityCopy[i].highestLevel = '4/6';
                } else if (CommunityCopy[i].highestLevel == 18) {
                  CommunityCopy[i].highestLevel = '3/6';
                } else if (CommunityCopy[i].highestLevel == 19) {
                  CommunityCopy[i].highestLevel = '2/6';
                } else if (CommunityCopy[i].highestLevel == 20) {
                  CommunityCopy[i].highestLevel = '1/6';
                } else if (CommunityCopy[i].highestLevel == 21) {
                  CommunityCopy[i].highestLevel = '0';
                } else if (CommunityCopy[i].highestLevel == 22) {
                  CommunityCopy[i].highestLevel = '-2/6';
                } else if (CommunityCopy[i].highestLevel == 23) {
                  CommunityCopy[i].highestLevel = '-4/6';
                } else if (CommunityCopy[i].highestLevel == 24) {
                  CommunityCopy[i].highestLevel = '-15';
                }

          }
          var commonDispo = 0;
          for (var i = 0; i < CommunityCopy.length; i++) {
          commonDispo = 0;
              for (var j = 0; j < userAvailability.length; j++) {
                if (CommunityCopy[i].availability != undefined) { 
                  var array = CommunityCopy[i].availability[j].hours.filter((n) => userAvailability[j].hours.includes(n));
                  commonDispo = commonDispo + array.length;
                }
                else {commonDispo = 0;}
              }
          var commonDispoParam = {commonDispo: commonDispo};
          Object.assign(CommunityCopy[i], commonDispoParam);
          }
          var CommunityCopyFiltered = CommunityCopy.sort(function (a, b) {
          return a.commonDispo - b.commonDispo;
          }).reverse();

            function notEqualToZero(element) {
              return element.commonDispo != 0;
            }
            var CommunityCopyFiltered = CommunityCopy.filter(notEqualToZero);
            edit.setState({ data: CommunityCopyFiltered, dataCopy: CommunityCopyFiltered, loading: false, refreshing:false });

          }
          else {edit.setState({loading:false, refreshing:false, data:null, dataCopy:null})}
        },
        error: function(e) {
          console.log(e);
        }
      });

    } else {edit.setState({loading:false, refreshing:false})}
  }

   componentDidMount() {

    this.queryFriends();

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
        <Text style={{marginTop:20}}>{translate.noResult[this.props.user.currentLocale]}</Text>
        
        <TouchableOpacity 
          hitSlop={{top:20, left:20, bottom:20, right:20}} 
          onPress={() => this.props.navigation.dispatch(NavigationActions.back())}
          style={{marginTop:20}}
          >
         <Text style={{textDecorationLine:'underline'}}>{translate.thinkAboutYourProfile[this.props.user.currentLocale]}</Text>
        </TouchableOpacity>
      </View>
    );
  }

  onRefresh() {
    
    this.setState({refreshing:true});
    Amplitude.logEvent("Refresh CommunityContent Button clicked");
    this.queryFriends();

  }

  viewProfile(id) {
     var view = this;
     Amplitude.logEvent("ProfileView Button clicked");
     user= Parse.User.current() || Parse.User.currentAsync();
     var User = Parse.Object.extend("User");
     var query = new Parse.Query(User);

    var query1 = new Parse.Query('Relation');
    query1.equalTo('status', 3);
    query1.equalTo('fromUser', { "__type": "Pointer", "className": "_User", "objectId": user.id });
    query1.equalTo('toUser', { "__type": "Pointer", "className": "_User", "objectId": id });    
    query1.first({
    success: function(Friends) {
      if (Friends != undefined) {
        view.setState({isFriend:true})
      }
    }
    });

    var query2 = new Parse.Query('Relation');
    query2.equalTo('status', 3);
    query2.equalTo('toUser', { "__type": "Pointer", "className": "_User", "objectId": user.id });
    query2.equalTo('fromUser', { "__type": "Pointer", "className": "_User", "objectId": id });    
    query2.first({
    success: function(Friends) {
      if (Friends != undefined) {
        view.setState({isFriend:true})
      }
    }
    });
     
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
          var picture = user.get("picture");
          if (picture != undefined) {
            var picture = picture.url()
          }
          var clubs = user.get("clubs");
          var birthday = user.get("birthday");
          var expoPushToken = user.get("expoPushToken");
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
            fromChat:false,
            isFriend:view.state.isFriend,
            friendRequestSent:false,
            friendRequestReceived:false,
            clubs: clubs,
            id:id,
            birthday:birthday,
            userToken:expoPushToken
          })
    view.props.navigation.navigate("ProfileView");
        }
      });
  }


render () {
  return (

    <View style={{flex:1, backgroundColor:'white', marginTop:30}}>

   <List
   containerStyle={{borderTopWidth:0, borderBottomWidth:0}}
   >
      <FlatList
        data={this.state.data}
        extraData={this.state}
        keyExtractor={data => data.objectId}
        ItemSeparatorComponent={this.renderSeparator}
        ListFooterComponent={this.renderFooter}
        ListEmptyComponent={this.renderEmpty}
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this.onRefresh}
          />
        }
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
            <Text style={{fontSize:12, paddingTop:2}}>{item.commonDispo} {translate.commonDispo[this.props.user.currentLocale]}</Text>
            <Text style={{fontSize:12, paddingTop:2}}>{item.currentLevel} ({item.highestLevel})</Text>
            { this.props.userPreferences.filterFieldType.key === "aroundMe" &&
              <Text style={{fontSize:12, paddingTop:2}}>{item.distance} km</Text>
            }
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

export default connect(mapStateToProps, mapDispatchToProps) (CommunityContent);


