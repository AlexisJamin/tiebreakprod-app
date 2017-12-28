import React from 'react';
import { StyleSheet, Text, View, Image, ScrollView, FlatList, TextInput } from 'react-native';
import { GiftedChat, Bubble } from 'react-native-gifted-chat';
import { Parse } from 'parse/react-native';
import { connect } from 'react-redux';

Parse.initialize("3E8CAAOTf6oi3NaL6z8oVVJ7wvtfKa");
Parse.serverURL = 'https://tiebreak.herokuapp.com/parse';

function mapStateToProps(store) {
  return { user: store.user, userClub: store.userClub, viewProfile: store.viewProfile }
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
    this.renderBubble = this.renderBubble.bind(this);
    this.state = {
      messages: [],
    };
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
    query.equalTo('objectId', this.props.viewProfile.id); 
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

    query.equalTo('conversation', this.props.viewProfile.id);
    var subscription = query.subscribe();
    console.log(subscription);

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
    message.set("conversation", this.props.viewProfile.id);
    message.save(null, {
      success: function(message) {
        var messageCopy = JSON.parse(JSON.stringify(message));
        messages[0]._id = messageCopy.objectId;
        messages[0].createdAt = messageCopy.createdAt;
        console.log('après modification');
        console.log(messages);
        send.setState((previousState) => ({
          messages: GiftedChat.append(previousState.messages, messages),
        }));
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

render () {
  return (

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

    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps) (MessengerContent);
