import React, { Component } from 'react';
import { View, Image, Text, StyleSheet, ScrollView, TouchableWithoutFeedback } from 'react-native';
import { Font } from 'expo';
import { NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Parse } from 'parse/react-native';
import Modal from 'react-native-modalbox';
import { ButtonGroup, CheckBox } from 'react-native-elements';

Parse.initialize("3E8CAAOTf6oi3NaL6z8oVVJ7wvtfKa");
Parse.serverURL = 'https://tiebreak.herokuapp.com/parse';

function mapStateToProps(store) {

  return { user: store.user, userClub: store.userClub, userPreferences: store.userPreferences, button: store.button }
};

function mapDispatchToProps(dispatch) {
  return {
        handleSubmit: function(value) { 
        dispatch( {type: 'user', value: value} ) 
    },
        handleSubmitClub: function(value) { 
        dispatch( {type: 'userClub', value: value} ) 
    },
        handleSubmitPreferences: function(value) { 
        dispatch( {type: 'userPreferences', value: value} ) 
    },
    handleSubmitButton: function(value) { 
        dispatch( {type: 'button', value: value} ) 
    }
  }
};

class EditClubContent extends React.Component {

constructor(props) {
    super(props);
    this._onPressAddClub = this._onPressAddClub.bind(this);
    this.state = {
      fontAvenirNextLoaded: false,
      fontAvenirLoaded: false
    };
  }

  async componentDidMount() {
    await Font.loadAsync({
      'AvenirNext': require('../../assets/fonts/AvenirNext.ttf'),
      'Avenir': require('../../assets/fonts/Avenir.ttf'),
    });
    this.setState({ 
      fontAvenirNextLoaded: true,
      fontAvenirLoaded: true 
    });
  }


  _onPressAddClub () {

  }

  render() {

    return (

      <View style={{flex:1, backgroundColor:'white'}}>
      {
        this.state.fontAvenirLoaded ? (
          <Text style={{marginBottom:30, fontFamily: 'AvenirNext', left:10}}> MES CLUBS FAVORIS </Text>
        ) : null 
       }
      </View>

    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps) (EditClubContent);

const styles = StyleSheet.create({
  buttonLogIn: {
    backgroundColor: 'rgb(200,90,24)',
    color: 'white',
    fontSize: 18,
    lineHeight: 30,
    textAlign: 'center',
    overflow:'hidden', 
    paddingTop:15,
    paddingBottom:15 
  },
  page: {
    flexDirection: 'column',
    justifyContent: 'center',
  },
  title: {
    color: 'black',
    backgroundColor: 'rgba(0,0,0,0)',
    fontFamily: 'Avenir',
    fontSize: 15,
    textAlign: 'center',
  },
   subtitle: {
    color: 'white',
    backgroundColor: 'rgba(0,0,0,0)',
    fontFamily: 'Avenir',
    fontSize: 15,
    textAlign: 'center',
  },
  container: {
    backgroundColor: 'white',
    height: 40,
    marginBottom:30,
  },
});
