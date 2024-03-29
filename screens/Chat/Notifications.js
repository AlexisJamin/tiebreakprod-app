import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, FlatList, TextInput, ActivityIndicator, RefreshControl, TouchableOpacity } from 'react-native';
import { Parse } from 'parse/react-native';
import { Notifications, Amplitude } from 'expo';
import { List, ListItem } from 'react-native-elements';
import { connect } from 'react-redux';

import translate from '../../translate.js';

function mapStateToProps(store) {
  return { user: store.user, userClub: store.userClub, userPreferences: store.userPreferences, button: store.button }
};

function mapDispatchToProps(dispatch) {
  return {
        handleSubmit: function(value) { 
        dispatch( {type: 'viewProfile', value: value} ) 
      },
       handleSubmitChat: function(value) { 
          dispatch( {type: 'chat', value: value} ) 
      },
      handleSubmitGame: function(value) { 
          dispatch( {type: 'game', value: value} ) 
      },
      handleSubmitUpdateNotification: function(value) { 
          dispatch( {type: 'update', value: value} ) 
      }
  }
};

class NotificationList extends React.Component {

  constructor(props) {
    super(props);
    this.renderSeparator = this.renderSeparator.bind(this);
    this.renderFooter = this.renderFooter.bind(this);
    this.renderEmpty = this.renderEmpty.bind(this);
    this.onRefresh = this.onRefresh.bind(this);
    this.viewOnPress = this.viewOnPress.bind(this);
    this.state = {
      data: null,
      loading: true,
      refreshing: false,
      notification:null
    };
  }

  componentWillMount() {
    var user = Parse.User.current() || Parse.User.currentAsync();
    var query = new Parse.Query("Notification");
    var edit = this;
    query.equalTo('toUser', Parse.User.current() || Parse.User.currentAsync()); 
    query.descending("updatedAt");
    query.limit(20);
    query.find({
      success: function(Notification) {
        // don't understand why but can't access to the Objects contained in the Parse Array "Club". Works with JSON.parse(JSON.stringify()).
        if (Notification.length != 0) {
          var NotificationCopy = [];
          for (var i = 0; i < Notification.length; i++) {
            NotificationCopy.push(JSON.parse(JSON.stringify(Notification[i])));
              if (NotificationCopy[i].type == 0) {
                NotificationCopy[i].typeName = translate.wantsToBeYourFriend[edit.props.user.currentLocale];
              } else if (NotificationCopy[i].type == 1) {
                NotificationCopy[i].typeName = translate.acceptedToBeYourFriend[edit.props.user.currentLocale];
              } else if (NotificationCopy[i].type == 2) {
                NotificationCopy[i].typeName = translate.refusedToBeYourFriend[edit.props.user.currentLocale];
              } else if (NotificationCopy[i].type == 3) {
                NotificationCopy[i].typeName = translate.proposesYouAGame[edit.props.user.currentLocale];
              } else if (NotificationCopy[i].type == 4) {
                NotificationCopy[i].typeName = translate.acceptedYouGameProposal[edit.props.user.currentLocale];
              } else if (NotificationCopy[i].type == 5) {
                NotificationCopy[i].typeName = translate.refusedYourGameProposal[edit.props.user.currentLocale];
              } else if (NotificationCopy[i].type == 6) {
                NotificationCopy[i].typeName = translate.cancelledYourGame[edit.props.user.currentLocale];
              } else if (NotificationCopy[i].type == 7) {
                NotificationCopy[i].typeName = translate.wantsToParticipate[edit.props.user.currentLocale];
              } else if (NotificationCopy[i].type == 8) {
                NotificationCopy[i].typeName = translate.sentYouAMessage[edit.props.user.currentLocale];
              } 
          }
          
          for (var i = 0; i < NotificationCopy.length; i++) {
            var User = Parse.Object.extend("User");
            var query2 = new Parse.Query(User);

            (function(query, notification, i, edit) { 

              query.get(notification[i].fromUser.objectId,{
                success: function(users) {
                  var lastName = users.get("lastName");
                  var firstName = users.get("firstName");
                  var picture = users.get("picture");
                  var expoPushToken = users.get("expoPushToken");
                  var fromUserParam = {fromUserFirstName: firstName, fromUserLastName: lastName[0], fromUserPicture: picture, fromUserToken:expoPushToken};
                  Object.assign(notification[i], fromUserParam);
                  edit.setState({ data: notification, loading:false });
                }
              });
            })(query2, NotificationCopy, i, edit);

          }
        }
        else {edit.setState({loading:false})}
      },
      error: function(e) {
        console.log(e);
      }
    });

    var query = new Parse.Query("Notification");
    query.equalTo('toUser', Parse.User.current() || Parse.User.currentAsync());
    query.equalTo('seen', false);
    query.find({
      success: function(notification) {
        edit.props.handleSubmitUpdateNotification({
          notification:notification.length
        })
        user.set("badgeNumber", notification.length);
        user.save();
        Notifications.setBadgeNumberAsync(notification.length);
        edit.setState({notification:notification.length})
      }
    });
  }

  componentDidMount() {

    var user = Parse.User.current();
    var query = new Parse.Query("Notification");
    query.equalTo('toUser', Parse.User.current()); 
    var subscription = query.subscribe();

    subscription.on('open', () => {
    });

    subscription.on('create', (notification) => {
      this.onRefresh();
    });

    subscription.on('update', (notification) => {
      this.onRefresh();
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
        <Text style={{marginTop:20}}> Aucune notification.</Text>
        <TouchableOpacity 
          hitSlop={{top:20, left:20, bottom:20, right:20}} 
          onPress={() => this.props.navigation.navigate('Profile')}
          style={{marginTop:20}}
          >
        <Text style={{textDecorationLine:'underline'}}> Avez-vous pensé à compléter votre profil ? </Text>
        </TouchableOpacity>
      </View>
    );
  }

  onRefresh() {
    this.setState({refreshing:true});
    var user = Parse.User.current() || Parse.User.currentAsync();
    var query = new Parse.Query("Notification");
    var edit = this;
    query.equalTo('toUser', Parse.User.current() || Parse.User.currentAsync()); 
    query.descending("updatedAt");
    query.limit(20);
    query.find({
      success: function(Notification) {
        // don't understand why but can't access to the Objects contained in the Parse Array "Club". Works with JSON.parse(JSON.stringify()).
        if (Notification.length != 0) {
          var NotificationCopy = [];
          for (var i = 0; i < Notification.length; i++) {
            NotificationCopy.push(JSON.parse(JSON.stringify(Notification[i])));
              if (NotificationCopy[i].type == 0) {
                NotificationCopy[i].typeName = translate.wantsToBeYourFriend[edit.props.user.currentLocale];
              } else if (NotificationCopy[i].type == 1) {
                NotificationCopy[i].typeName = translate.acceptedToBeYourFriend[edit.props.user.currentLocale];
              } else if (NotificationCopy[i].type == 2) {
                NotificationCopy[i].typeName = translate.refusedToBeYourFriend[edit.props.user.currentLocale];
              } else if (NotificationCopy[i].type == 3) {
                NotificationCopy[i].typeName = translate.proposesYouAGame[edit.props.user.currentLocale];
              } else if (NotificationCopy[i].type == 4) {
                NotificationCopy[i].typeName = translate.acceptedYouGameProposal[edit.props.user.currentLocale];
              } else if (NotificationCopy[i].type == 5) {
                NotificationCopy[i].typeName = translate.refusedYourGameProposal[edit.props.user.currentLocale];
              } else if (NotificationCopy[i].type == 6) {
                NotificationCopy[i].typeName = translate.cancelledYourGame[edit.props.user.currentLocale];
              } else if (NotificationCopy[i].type == 7) {
                NotificationCopy[i].typeName = translate.wantsToParticipate[edit.props.user.currentLocale];
              } else if (NotificationCopy[i].type == 8) {
                NotificationCopy[i].typeName = translate.sentYouAMessage[edit.props.user.currentLocale];
              } 
          }
          
          for (var i = 0; i < NotificationCopy.length; i++) {
            var User = Parse.Object.extend("User");
            var query2 = new Parse.Query(User);

            (function(query, notification, i, edit) { 

              query.get(notification[i].fromUser.objectId,{
                success: function(users) {
                  var lastName = users.get("lastName");
                  var firstName = users.get("firstName");
                  var picture = users.get("picture");
                  var expoPushToken = users.get("expoPushToken");
                  var fromUserParam = {fromUserFirstName: firstName, fromUserLastName: lastName[0], fromUserPicture: picture, fromUserToken:expoPushToken};
                  Object.assign(notification[i], fromUserParam);
                  edit.setState({ data: notification, refreshing:false });
                }
              });
            })(query2, NotificationCopy, i, edit);

          }
        }
        else {edit.setState({refreshing:false})}
      },
      error: function(e) {
        console.log(e);
      }
    });

    var query = new Parse.Query("Notification");
    query.equalTo('toUser', Parse.User.current() || Parse.User.currentAsync());
    query.equalTo('seen', false);
    query.find({
      success: function(notification) {
        edit.props.handleSubmitUpdateNotification({
          notification:notification.length
        })
        user.set("badgeNumber", notification.length);
        user.save();
        Notifications.setBadgeNumberAsync(notification.length);
        edit.setState({notification:notification.length})
      }
    });

  }

  viewOnPress(id, userId, type, firstName, seen, token) {

    var view = this;

    // allows to change background color when seen
    if (!seen) {
      
      var NotificationCopy = [...this.state.data];
      function findIndexType(element) {
        return element.objectId == id;
      }
      var index = NotificationCopy.findIndex(findIndexType);
      NotificationCopy[index].seen = true;
      
      var Notification = Parse.Object.extend("Notification");
      var query = new Parse.Query(Notification);
      query.equalTo('objectId', id); 
      query.first({
        success: function(notification) {
          // The object was retrieved successfully.
          notification.set("seen", true);
          notification.save();
          view.props.handleSubmitUpdateNotification({
            notification:view.state.notification-1
          })
          user.set("badgeNumber", view.state.notification-1);
          user.save();
          Notifications.setBadgeNumberAsync(view.state.notification-1);
          view.setState({data: NotificationCopy, notification:view.state.notification-1})
        },
        error: function(error) {
          // The object was not retrieved successfully.
          // error is a Parse.Error with an error code and message.
          console.log(error);
        }
      });
    }
    
     if (type == 0) {
         var User = Parse.Object.extend("User");
         var query = new Parse.Query(User);
         query.get(userId, {
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
                isFriend: false,
                friendRequestSent:false,
                friendRequestReceived:true,
                clubs:clubs,
                id:id,
                birthday:birthday,
                userToken:expoPushToken
              })
            Amplitude.logEvent("ProfileView Button clicked");
            view.props.navigation.navigate("ProfileView");
            }
          });
      }

       if (type == 1) {
         var User = Parse.Object.extend("User");
         var query = new Parse.Query(User);
         query.get(userId, {
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
                isFriend:true,
                friendRequestSent:false,
                friendRequestReceived:false,
                clubs:clubs,
                id:id,
                birthday:birthday,
                userToken:expoPushToken
              })
            Amplitude.logEvent("ProfileView Button clicked");
            view.props.navigation.navigate("ProfileView");
            }
          });
      }

      if (type == 8) {
         var user = Parse.User.current() || Parse.User.currentAsync();
         var conversation = new Parse.Query("Conversation");
         conversation.containsAll('roomUsers', [user.id, userId]); 
         conversation.first({
          success: function(conversation) {
              // The object was retrieved successfully.
              view.props.handleSubmitChat({
              id:conversation.id,
              firstName:firstName,
              userId:userId,
              userToken:token
            })
            Amplitude.logEvent("Messenger Button clicked");
            view.props.navigation.navigate("Messenger");
            }
          });
      } 

      if (type == 3) {
         var user = Parse.User.current() || Parse.User.currentAsync();
         var Notification = Parse.Object.extend("Notification");
         var query = new Parse.Query(Notification);
         query.equalTo('objectId', id); 
         query.first({
           success: function(notification) {
            var gameId = notification.get('game').id;
            view.props.handleSubmitGame({
              gameId:gameId,
            })
            Amplitude.logEvent("GameView Button clicked");
            view.props.navigation.navigate("GameView");
           }
          });
      } 

      if (type == 7) {
         var user = Parse.User.current() || Parse.User.currentAsync();
         var Notification = Parse.Object.extend("Notification");
         var query = new Parse.Query(Notification);
         query.equalTo('objectId', id); 
         query.first({
           success: function(notification) {
            var gameId = notification.get('game').id;
            view.props.handleSubmitGame({
              gameId:gameId,
            })
            Amplitude.logEvent("GameView Button clicked");
            view.props.navigation.navigate("GameView");
           }
          });
      }

      if (type == 4) {
         var user = Parse.User.current() || Parse.User.currentAsync();
         var Notification = Parse.Object.extend("Notification");
         var query = new Parse.Query(Notification);
         query.equalTo('objectId', id); 
         query.first({
           success: function(notification) {
            var gameId = notification.get('game').id;
            view.props.handleSubmitGame({
              gameId:gameId,
            })
            Amplitude.logEvent("GameView Button clicked");
            view.props.navigation.navigate("GameView");
           }
          });
      } 

      if (type == 6) {
         var user = Parse.User.current() || Parse.User.currentAsync();
         var Notification = Parse.Object.extend("Notification");
         var query = new Parse.Query(Notification);
         query.equalTo('objectId', id); 
         query.first({
           success: function(notification) {
            var gameId = notification.get('game').id;
            view.props.handleSubmitGame({
              gameId:gameId,
            })
            Amplitude.logEvent("GameView Button clicked");
            view.props.navigation.navigate("GameView");
           }
          });
      }

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
          avatarStyle={[styles.avatar, !item.seen && styles.background]}
          avatarContainerStyle={{width:50, height:50, top:-5}}
          avatarOverlayContainerStyle={{backgroundColor:'transparent'}}
          titleContainerStyle={{marginLeft:30}}
          containerStyle={[styles.container, !item.seen && styles.background]}
          avatar={ ( item.fromUserPicture && { uri : item.fromUserPicture.url() } ) || require('../../assets/icons/General/Placeholder.imageset/3639e848-bc9c-11e6-937b-fa2a206349a2.png') } 
          title={<Text style={{fontSize:15, fontWeight:'bold'}}>{item.fromUserFirstName} {item.fromUserLastName}.</Text>}
          subtitleContainerStyle={{marginLeft:30, width:300}}
          subtitle={<Text style={{fontSize:13, paddingTop:6, fontWeight:'bold'}}>{item.typeName} </Text>}
          hideChevron={true}
          onPress={()=>{this.viewOnPress(item.objectId, item.fromUser.objectId, item.type, item.fromUserFirstName, item.seen, item.fromUserToken)}}
          />
        )}
      />
    </List>
           
    </View>
           
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps) (NotificationList);

const styles = StyleSheet.create({
  container: {
    borderBottomWidth:0, 
    height:80, 
    justifyContent:'center'
  },
    background: {
    backgroundColor:'#F5F5F5'
  },
  avatar: {
    width:50, 
    height:50, 
    borderRadius:25, 
    borderWidth:1, 
    borderColor:'white', 
    overflow:'hidden', 
    backgroundColor:'white'
  }
});
