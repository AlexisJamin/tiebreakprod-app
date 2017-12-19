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

function mapDispatchToProps(dispatch) {
  return {
        handleSubmit: function(value) { 
        dispatch( {type: 'viewProfile', value: value} ) 
    }
  }
};

class Notifications extends React.Component {

  constructor(props) {
    super(props);
    this.renderSeparator = this.renderSeparator.bind(this);
    this.renderFooter = this.renderFooter.bind(this);
    this.viewOnPress = this.viewOnPress.bind(this);
    this.state = {
      data: null,
      test : 'toto'
    };
  }

  async componentDidMount() {

    var user = Parse.User.current();
    var query = new Parse.Query("Notification");
    var edit = this;
    query.equalTo('toUser', { "__type": "Pointer", "className": "_User", "objectId": user.id }); 
    query.ascending("updatedAt");
    query.limit(10);
    // Final list of objects
    query.find({
      success: function(Notification) {
        // don't understand why but can't access to the Objects contained in the Parse Array "Club". Works with JSON.parse(JSON.stringify()).
        if (Notification.length != 0) {
          var NotificationCopy = [];
          for (var i = 0; i < Notification.length; i++) {
            NotificationCopy.push(JSON.parse(JSON.stringify(Notification[i])));
              if (NotificationCopy[i].type == 0) {
                NotificationCopy[i].typeName = 'Souhaite devenir votre ami(e)';
              } else if (NotificationCopy[i].type == 1) {
                NotificationCopy[i].typeName = 'A accepté votre demande d’amitié';
              } else if (NotificationCopy[i].type == 2) {
                NotificationCopy[i].typeName = 'A refusé votre demande d’amitié';
              } else if (NotificationCopy[i].type == 3) {
                NotificationCopy[i].typeName = 'Vous propose une partie le XXX';
              } else if (NotificationCopy[i].type == 4) {
                NotificationCopy[i].typeName = 'A accepté votre proposition de partie le XXX';
              } else if (NotificationCopy[i].type == 5) {
                NotificationCopy[i].typeName = 'A refusé votre proposition de partie le XXX';
              } else if (NotificationCopy[i].type == 6) {
                NotificationCopy[i].typeName = 'A annulé votre partie le XXX';
              } else if (NotificationCopy[i].type == 7) {
                NotificationCopy[i].typeName = 'Aimerait participer à votre partie le XXX';
              } else if (NotificationCopy[i].type == 8) {
                NotificationCopy[i].typeName = 'Vous a envoyé un message';
              } 
          }
          
          for (var i = 0; i < NotificationCopy.length; i++) {
            var User = Parse.Object.extend("User");
            var query = new Parse.Query(User);
            var array = []; 
            //var notification = NotificationCopy[i];

            (function(query, notification, i, edit) { 

              query.get(notification[i].fromUser.objectId,{
                success: function(users) {
               
                  var lastName = users.get("lastName");
                  var firstName = users.get("firstName");
                  var picture = users.get("picture").url();
                  var fromUserParam = {fromUserFirstName: firstName, fromUserLastName: lastName[0], fromUserPicture: picture};
                  Object.assign(notification[i], fromUserParam);
                  edit.setState({ data: notification });
                }
              });
            })(query, NotificationCopy, i, edit);

          }
        }
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

  viewOnPress(id, userId, type) {
    var view = this;
    // allows to change background color when seen
    var NotificationCopy = [...this.state.data];
    function findIndexType(element) {
      return element.objectId == id;
    }
    var index = NotificationCopy.findIndex(findIndexType);
    console.log(index);
    NotificationCopy[index].seen = true;
    
    var Notification = Parse.Object.extend("Notification");
    var query = new Parse.Query(Notification);
    query.get(id, {
      success: function(notification) {
        // The object was retrieved successfully.
        notification.set("seen", true);
        notification.save();
      },
      error: function(error) {
        // The object was not retrieved successfully.
        // error is a Parse.Error with an error code and message.
        console.log(error);
      }
    });
    this.setState({data: NotificationCopy})

     if (type == (0 || 1) ) {
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
              var picture = user.get("picture").url();
              var clubs = user.get("clubs");

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
                clubs: clubs
              })
            view.props.navigation.navigate("ProfileView");
            }
          });
      }
  }


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
          avatarStyle={[styles.avatar, !item.seen && styles.background]}
          avatarContainerStyle={{width:40, height:40}}
          avatarOverlayContainerStyle={{backgroundColor:'transparent'}}
          titleContainerStyle={{marginLeft:30}}
          containerStyle={[styles.container, !item.seen && styles.background]}
          avatar={{ uri : item.fromUserPicture } || require('../../assets/icons/General/Placeholder.imageset/3639e848-bc9c-11e6-937b-fa2a206349a2.png') } 
          title={<Text style={{fontSize:13}}>{item.fromUserFirstName} {item.fromUserLastName}.</Text>}
          subtitleContainerStyle={{marginLeft:30, width:300}}
          subtitle={<Text style={{fontSize:11, paddingTop:2}}>{item.typeName} </Text>}
          hideChevron={true}
          onPress={()=>{this.viewOnPress(item.objectId, item.fromUser.objectId, item.type)}}
          />
        )}
      />
    </List>

    </ScrollView>
           
    </View>
           
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps) (Notifications);

const styles = StyleSheet.create({
  container: {
    borderBottomWidth:0, 
    height:60, 
    justifyContent:'center'
  },
    background: {
    backgroundColor:'#F5F5F5'
  },
  avatar: {
    width:40, 
    height:40, 
    borderRadius:20, 
    borderWidth:1, 
    borderColor:'white', 
    overflow:'hidden', 
    backgroundColor:'white'
  }
});
