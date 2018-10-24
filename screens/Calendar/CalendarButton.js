import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { ButtonGroup } from 'react-native-elements';
import { Font, Amplitude } from 'expo';
import { connect } from 'react-redux';

import translate from '../../translate.js';

function mapStateToProps(store) {
  return { user: store.user, userClub: store.userClub, userPreferences: store.userPreferences, button: store.button, window:store.window }
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

class CalendarButton extends React.Component {

  constructor () {
    super();
    this.updateIndex = this.updateIndex.bind(this)
    this.state = {
      fontLoaded: false
    }
  }  

  async componentDidMount() {
    await Font.loadAsync({
      'Avenir': require('../../assets/fonts/Avenir.ttf'),
    });
    this.setState({ fontLoaded: true });
  }

  updateIndex (selectedIndex) {
     this.props.handleSubmitButton({
        ChatButtonIndex:this.props.button.ChatButtonIndex,
        CommunityButtonIndex:this.props.button.CommunityButtonIndex,
        CalendarButtonIndex:selectedIndex,
        ProfileButtonIndex:this.props.button.ProfileButtonIndex,
        ReservationButtonIndex:this.props.button.ReservationButtonIndex
      })
    if (selectedIndex==0) {
      Amplitude.logEvent("CalendarFuture Button clicked");
      this.props.navigation.navigate("CalendarFuture");
    } else {
      Amplitude.logEvent("CalendarPast Button clicked");
      this.props.navigation.navigate("CalendarPast");
    }
  }

  render() {

    const buttons = [translate.upComing[this.props.user.currentLocale], translate.past[this.props.user.currentLocale]]
    const selectedIndex = this.props.button.CalendarButtonIndex;
    var heightWindow = this.props.window.height*0.2;

    return (

      <ButtonGroup 
      onPress={this.updateIndex}
      selectedIndex={selectedIndex}
      buttons={buttons}
      textStyle={styles.title}
      selectedBackgroundColor={'rgb(42,127,83)'}
      selectedTextStyle={styles.subtitle}
      containerStyle={[styles.container, {height:heightWindow}]}/>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps) (CalendarButton);

const styles = StyleSheet.create({
  title: {
    color: 'black',
    backgroundColor: 'rgba(0,0,0,0)',
    fontFamily: 'Avenir',
    fontSize: 15,
    textAlign: 'center',
    top: 50,
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
    marginRight: 0,
    marginLeft: 0,
  },
});