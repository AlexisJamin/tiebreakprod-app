import React from 'react';
import { StyleSheet, Text, View, Image, ScrollView, FlatList, TextInput, TouchableWithoutFeedback } from 'react-native';
import { GiftedChat, Bubble } from 'react-native-gifted-chat';
import Modal from 'react-native-modalbox';
import { Parse } from 'parse/react-native';
import { connect } from 'react-redux';

Parse.initialize("3E8CAAOTf6oi3NaL6z8oVVJ7wvtfKa");
Parse.serverURL = 'https://tiebreak.herokuapp.com/parse';

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
    this.state = {
      messages: [],
    };
  }

  componentWillReceiveProps(props) {
    console.log('props reçues !!!');
    if (props.chat.onPress) {
      this.refs.modal.open();
    }
  }

  componentWillMount() {

    var user = Parse.User.current();
    this.setState({
      userId:user.id,
      name:user.get('firstName'),
      avatar:user.get('picture').url(),
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
                      avatar: MessageCopy[i].sender.picture.url,
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
    var user = Parse.User.current();
    var query = new Parse.Query('Message');
    var sub = this;

    query.equalTo('conversation', this.props.chat.id);
    var subscription = query.subscribe();

    subscription.on('open', () => {
     console.log('subscription opened');
    });

    subscription.on('create', function (messages = []) {
     let array = [];
     console.log('Message created with text: ', messages.get('message'));
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
            avatar: messages.get('sender').get('picture').url(),
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
    console.log(messages);
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
        send.setState((previousState) => ({
          messages: GiftedChat.append(previousState.messages, messages),
        }));

        var query = new Parse.Query("Conversation");
        query.equalTo('objectId', message.get('conversation')); 
        query.first({
          success: function(Conversation) {
            Conversation.set('lastMessage', { "__type": "Pointer", "className": "Message", "objectId": message.id });
            Conversation.set('updatedAt', Date());
            Conversation.save();
            }
        });
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
            isFriend:true,
            fromChat:true,
            friendRequestSent:false,
            friendRequestReceived:false,
            clubs:clubs,
            id:id
          })
        view.refs.modal.close();
        view.props.navigation.navigate("ProfileView");
        },
        error: function(error) {
          console.log(error);
        }
      }); 
    } 

render () {
  return (

    <View style={{flex:1}}>
     <GiftedChat
        messages={this.state.messages}
        user={{
          _id: this.state.userId,
          name: this.state.name,
          avatar: this.state.avatar,
        }}
        placeholder={'Écrivez votre message...'}
        renderBubble={this.renderBubble}
        showUserAvatar={true}
        onSend={(messages) => this.onSend(messages)}
      />

      <Modal style={[styles.modal]} position={"bottom"} ref={"modal"}>
          
          <View style={{borderBottomWidth:1, borderColor:'rgb(213,212,216)', width:"100%", paddingBottom: 10}}>
          <Text style={styles.modalTitle}>{this.props.chat.firstName}</Text>
          </View>

          <TouchableWithoutFeedback onPress={this.onPressViewProfile}>
          <View style={{borderBottomWidth:1, borderColor:'rgb(213,212,216)', width:"100%", paddingBottom: 20}}>
          <Text style={styles.modalText}>Voir le profil</Text>
          </View>
          </TouchableWithoutFeedback>

          <TouchableWithoutFeedback>
          <View style={{borderBottomWidth:1, borderColor:'rgb(213,212,216)', width:"100%", paddingBottom: 20}}>
          <Text style={styles.modalText}>Bloquer {this.props.chat.firstName}</Text>
          </View>
          </TouchableWithoutFeedback>

          <TouchableWithoutFeedback onPress={this.onCloseModal}>
          <Text style={styles.modalText}>Annuler</Text>
          </TouchableWithoutFeedback>
        </Modal>

        </View>

    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps) (MessengerContent);

const styles = StyleSheet.create({
  modal: {
    flexDirection:'column',
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
    color: "black",
    fontSize: 20,
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

