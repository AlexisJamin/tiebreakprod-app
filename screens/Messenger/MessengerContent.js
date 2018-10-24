import React from 'react';
import { StyleSheet, Text, View, Image, ScrollView, FlatList, TextInput, TouchableOpacity, Alert, Platform } from 'react-native';
import { Font, Amplitude } from 'expo';
import { GiftedChat, Bubble } from 'react-native-gifted-chat';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import Modal from 'react-native-modalbox';
import { Parse } from 'parse/react-native';
import { connect } from 'react-redux';

import translate from '../../translate.js';

function mapStateToProps(store) {
  return { user: store.user, userClub: store.userClub, chat: store.chat }
};

function mapDispatchToProps(dispatch) {
  return {
        handleSubmit: function(value) { 
        dispatch( {type: 'viewProfile', value: value} ) 
    }
  }
};

class MessengerContent extends React.Component {

  constructor(props) {
    super(props);
    this.onSend = this.onSend.bind(this);
    this.onCloseModal = this.onCloseModal.bind(this);
    this.renderBubble = this.renderBubble.bind(this);
    this.onPressViewProfile = this.onPressViewProfile.bind(this);
    this.onPressMute = this.onPressMute.bind(this);
    this.MuteFriend = this.MuteFriend.bind(this);
    this.onPressAvatar = this.onPressAvatar.bind(this);
    this.state = {
      messages: []
    };
  }

  componentWillMount() {

    var user = Parse.User.current() || Parse.User.currentAsync();
    this.setState({
      userId:user.id,
      name:user.get('firstName'),
      avatar:user.get('picture'),
    })

    var query = new Parse.Query("Conversation");
    var edit = this;
    query.equalTo('objectId', this.props.chat.id); 
    query.first({
      success: function(Conversation) {
        // don't understand why but can't access to the Objects contained in the Parse Array "Club". Works with JSON.parse(JSON.stringify()).
        var ConversationCopy = JSON.parse(JSON.stringify(Conversation));
        var query2 = new Parse.Query("Message");
        query2.equalTo('conversation', ConversationCopy.objectId);
        query2.descending("createdAt"); 
        query2.find({
          success: function(Message) {
          // don't understand why but can't access to the Objects contained in the Parse Array "Club". Works with JSON.parse(JSON.stringify()).
            if (Message.length != 0) {
              var array = [];
              var MessageCopy = [];
              for (var i = 0; i < Message.length; i++) {
                MessageCopy.push(JSON.parse(JSON.stringify(Message[i])));
              }
              for (var i = 0; i < MessageCopy.length; i++) {
                array.push(
                  {
                    _id: MessageCopy[i].objectId,
                    text: MessageCopy[i].message,
                    createdAt: MessageCopy[i].createdAt,
                    user: {
                      _id: MessageCopy[i].sender.objectId,
                      name: MessageCopy[i].sender.firstName,
                      avatar: ( MessageCopy[i].sender.picture && MessageCopy[i].sender.picture.url ) || null,
                    }
                  }
                )
              }
              edit.setState({messages: array})
            }
          }
        });
        
      },
      error: function(e) {
        console.log(e);
      }
    });
  }

  componentDidMount() {
    var user = Parse.User.current() || Parse.User.currentAsync();
    var sub = this;
    var query = new Parse.Query('Message');
    query.equalTo('conversation', this.props.chat.id);
    var subscription = query.subscribe();

    subscription.on('open', () => {
    });

    subscription.on('create', function (messages = []) {
     let array = [];
     var senderId = messages.get('sender').id;
     if (senderId != user.id) {
      array.push(
        {
          _id: messages.id,
          text: messages.get('message'),
          createdAt: messages.get('createdAt'),
          user: {
            _id: messages.get('sender').objectId,
            name: messages.get('sender').firstName,
            avatar: ( messages.get('sender').get('picture') && messages.get('sender').get('picture').url() ) || null,
          }
        }
      )
      sub.setState((previousState) => ({
          messages: GiftedChat.append(previousState.messages, array),
        }));
     }
    });
  }

  onSend(messages = []) {
    Amplitude.logEvent("OnSendMessage Button clicked");
    var user = Parse.User.current() || Parse.User.currentAsync();
    var send = this;
    var message = new Parse.Object("Message");
    message.set("createdAt", Date());
    message.set("updatedAt", Date());
    message.set("message", messages[0].text);
    message.set("sender", { "__type": "Pointer", "className": "_User", "objectId": messages[0].user._id });
    message.set("conversation", this.props.chat.id);
    message.save(null, {
      success: function(message) {
        messages[0]._id = message.id;
        messages[0].createdAt = message.get('createdAt');

        var query = new Parse.Query("Conversation");
        query.equalTo('objectId', message.get('conversation')); 
        query.first({
          success: function(Conversation) {
            Conversation.set('lastMessage', { "__type": "Pointer", "className": "Message", "objectId": message.id });
            Conversation.set('updatedAt', Date());
            Conversation.save();

            send.setState((previousState) => ({
              messages: GiftedChat.append(previousState.messages, messages),
            }));

            Parse.Cloud.run("createNotification", { 
            "userId":send.props.chat.userId,
            "token":send.props.chat.userToken,
            "firstName":user.get('firstName'),
            "message":"t'a envoyé un message.",
            "channel":"chat-messages",
            "conversationId":Conversation.id,
            "type":8,
             })
            
            }
        });


      }, error: function(message, error) {
        console.log('le message est:', message);
        console.log('lerreur est:', error);
      }
    });
  }

  renderBubble(props) {
    return (
      <Bubble
      {...props}
        wrapperStyle={{
          left: {
            backgroundColor: 'white',
            borderWidth:0.5,
            borderColor:'#CED0CE',
          },
          right: {
            backgroundColor: 'rgb(42,127,83)',
          }
        }}
      />
    );
  }

  onCloseModal() {
    this.refs.modal.close();
    this.props.handleSubmit({
      firstName:this.props.chat.firstName,
      id:this.props.chat.id,
      onPress:false,
    })
  }

  onPressViewProfile() {
     var view = this;
     Amplitude.logEvent("ProfileView Button clicked");
     var User = Parse.Object.extend("User");
     var query1 = new Parse.Query(User);
     query1.get(this.props.chat.userId,{
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
            isFriend:true,
            fromChat:true,
            friendRequestSent:false,
            friendRequestReceived:false,
            clubs:clubs,
            id:id,
            birthday:birthday,
            userToken:expoPushToken
          })
        view.refs.modal.close();
        view.props.navigation.navigate("ProfileView");
        },
        error: function(error) {
          console.log(error);
        }
      }); 
    } 

onPressMute() {
  Amplitude.logEvent("Mute Button clicked");
  Alert.alert(
    'Voulez-vous bloquer '+this.props.chat.firstName+' définitivement ?',
    'Cette action est irréversible',
    [
      {text: translate.yes[this.props.user.currentLocale], onPress: () => this.MuteFriend()},
      {text: translate.no[this.props.user.currentLocale], onPress: () => this.onCloseModal()},
    ],
    { cancelable: false }
  )
  }


MuteFriend() {
  Amplitude.logEvent("Confirm Mute Button clicked");
  var user = Parse.User.current() || Parse.User.currentAsync();
  var add = this;
  var relation1 = new Parse.Query("Relation");
  relation1.equalTo('toUser', { "__type": "Pointer", "className": "_User", "objectId": user.id }); 
  relation1.equalTo('fromUser', { "__type": "Pointer", "className": "_User", "objectId": this.props.chat.userId }); 
  relation1.first({
    success: function(relation) {
      var conversation = new Parse.Query("Conversation");
      conversation.containsAll('roomUsers', [user.id, add.props.chat.userId]); 
      conversation.first({
        success: function(conversation) {
          conversation.destroy();
          relation.set("updatedAt", Date());
          relation.set("status", 2);
          relation.save();
          add.onCloseModal();
          add.props.navigation.goBack();
        }
      });
    }
  });

  var relation2 = new Parse.Query("Relation");
  relation2.equalTo('fromUser', { "__type": "Pointer", "className": "_User", "objectId": user.id }); 
  relation2.equalTo('toUser', { "__type": "Pointer", "className": "_User", "objectId": this.props.chat.userId }); 
  relation2.first({
    success: function(relation) {
      var conversation = new Parse.Query("Conversation");
      conversation.containsAll('roomUsers', [user.id, add.props.chat.userId]); 
      conversation.first({
        success: function(conversation) {
          conversation.destroy();
          relation.set("updatedAt", Date());
          relation.set("status", 2);
          relation.save();
          add.onCloseModal();
          add.props.navigation.goBack();
        }
      });
    }
  });
}

onPressAvatar(friend) {
    Amplitude.logEvent("Avatar Button clicked");
    var user = Parse.User.current() || Parse.User.currentAsync();
    if (friend._id != user.id) {
      this.refs.modal.open();
    }
  }

render () {
    if (Platform.OS === 'android') {
      var keyboardSpacer = (<KeyboardSpacer/>);
    } else {
      var keyboardSpacer = null;
    }
  return (

    <View style={{flex:1}}>
     <GiftedChat
        messages={this.state.messages}
        user={{
          _id: this.state.userId,
          name: this.state.name,
          avatar: ( ( this.state.avatar && this.state.avatar.url() ) || null ),
        }}
        placeholder={'Écrivez votre message...'}
        renderBubble={this.renderBubble}
        showUserAvatar={true}
        onPressAvatar={(friend)=> this.onPressAvatar(friend)}
        onSend={(messages) => this.onSend(messages)}
      />
      {keyboardSpacer}

      <Modal style={[styles.modal]} position={"bottom"} ref={"modal"}>
          <View style={{borderBottomWidth:1, borderColor:'rgb(213,212,216)', width:"100%", paddingBottom: 10}}>
          <Text style={styles.modalTitle}>{this.props.chat.firstName}</Text>
          </View>

          <TouchableOpacity 
            onPress={this.onPressViewProfile}
            style={{borderBottomWidth:1, borderColor:'rgb(213,212,216)', width:"100%", paddingBottom: 20}}
            hitSlop={{top:10, left:50, bottom:10, right:50}}>
          <View>
          <Text style={styles.modalText}>{translate.viewProfile[this.props.user.currentLocale]}</Text>
          </View>
          </TouchableOpacity>

          <TouchableOpacity 
            onPress={this.onPressMute}
            style={{borderBottomWidth:1, borderColor:'rgb(213,212,216)', width:"100%", paddingBottom: 20}}
            hitSlop={{top:10, left:50, bottom:10, right:50}}>
          <View>
          <Text style={styles.modalText}>{translate.block[this.props.user.currentLocale]} {this.props.chat.firstName}</Text>
          </View>
          </TouchableOpacity>

          <TouchableOpacity 
            onPress={this.onCloseModal}
            hitSlop={{top:10, left:50, bottom:10, right:50}}>
          <Text style={styles.modalText}>{translate.cancel[this.props.user.currentLocale]}</Text>
          </TouchableOpacity>
        </Modal>

        </View>

    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps) (MessengerContent);

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 250,
    borderWidth:1, 
    borderRadius:15,
    width: "95%",
    borderColor:'rgb(213,212,216)',
    bottom:12
  },
  modalText: {
    color:"black",
    fontSize:20,
    width:"100%",
    textAlign:'center'
  },
  modalTitle: {
    color: "grey",
    fontStyle:"italic",
    fontSize: 14,
    width:"100%",
    textAlign:'center'
  }
});

