import React from 'react';
import { StyleSheet, Text, View, Image, ScrollView, FlatList, TextInput } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
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
    this.onLoadEarlier = this.onLoadEarlier.bind(this);
    this.state = {
      messages: [],
      loadEarlier: true,
      isLoadingEarlier: false,
    };
  }

  componentDidMount() {

    var user = Parse.User.current();
    var query = new Parse.Query("Conversation");
    var edit = this;
    query.equalTo('objectId', this.props.viewProfile.id); 
    query.first({
      success: function(Conversation) {
        // don't understand why but can't access to the Objects contained in the Parse Array "Club". Works with JSON.parse(JSON.stringify()).
        var ConversationCopy = JSON.parse(JSON.stringify(Conversation));
        console.log(ConversationCopy.objectId);
        var query2 = new Parse.Query("Message");
        query2.equalTo('conversation', ConversationCopy.objectId);
        query2.descending("updatedAt"); 
        query2.find({
          success: function(Message) {
            console.log(Message);
            console.log(Message.length);
          // don't understand why but can't access to the Objects contained in the Parse Array "Club". Works with JSON.parse(JSON.stringify()).
            }
        });
        /*if (Conversation.length != 0) {
          var ConversationCopy = [];
          for (var i = 0; i < Conversation.length; i++) {
            ConversationCopy.push(JSON.parse(JSON.stringify(Conversation[i])));
          }

          for (var i = 0; i < ConversationCopy.length; i++) {

            // enables to see lastMessage
            var query2 = new Parse.Query("Message");
            (function(query, conversation, i, edit) { 
              query.equalTo('objectId', ConversationCopy[i].lastMessage.objectId); 
              query.first({
                success: function(Message) {
                // don't understand why but can't access to the Objects contained in the Parse Array "Club". Works with JSON.parse(JSON.stringify()).
                    var MessageCopy = JSON.parse(JSON.stringify(Message));
                    var messageParam = {message : MessageCopy.message};
                    Object.assign(conversation[i], messageParam);
                    edit.setState({ data: conversation, loading:false });
                  }
              });
           })(query2, ConversationCopy, i, edit);
         
            var roomUsersCopy = ConversationCopy[i].roomUsers.concat();
            var roomUsersFiltered = roomUsersCopy.filter(userId => userId != user.id);

            // enables to see user
            var query3 = new Parse.Query(Parse.User);
            (function(query, conversation, i, edit) { 
              query.get(roomUsersFiltered[i],{
                success: function(users) {
                  var lastName = users.get("lastName");
                  var firstName = users.get("firstName");
                  var picture = users.get("picture").url();
                  var fromUserParam = {fromUserFirstName: firstName, fromUserLastName: lastName[0], fromUserPicture: picture};
                  Object.assign(conversation[i], fromUserParam);
                  edit.setState({ data: conversation, loading:false });
                }
              });
           })(query3, ConversationCopy, i, edit);
         }
        } 
        else {edit.setState({loading:false})} */
      },
      error: function(e) {
        console.log(e);
      }
    });
  }

  onSend(messages = []) {
    this.setState((previousState) => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }));
  }

  onLoadEarlier() {
    this.setState((previousState) => {
      return {
        isLoadingEarlier: true,
      };
    });
  }

render () {
  return (

     <GiftedChat
        messages={this.state.messages}
        user={{
          _id: 1,
          name: 'Alexis Jamin',
          avatar: 'https://facebook.github.io/react/img/logo_og.png'
        }}
        placeholder={'Écrivez votre message...'}
        onSend={(messages) => this.onSend(messages)}
        showUserAvatar={true}
        loadEarlier={this.state.loadEarlier}
        onLoadEarlier={this.onLoadEarlier}
        isLoadingEarlier={this.state.isLoadingEarlier}
      />

    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps) (MessengerContent);
