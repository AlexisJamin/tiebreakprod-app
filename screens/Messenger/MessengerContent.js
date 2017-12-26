import React from 'react';
import { StyleSheet, Text, View, Image, ScrollView, FlatList, TextInput } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import { Parse } from 'parse/react-native';
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
