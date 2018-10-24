import React from 'react';
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import { ButtonGroup } from 'react-native-elements';
import { Font, Amplitude } from 'expo';
import { connect } from 'react-redux';

import translate from '../../translate.js';

function mapStateToProps(store) {
  return { user: store.user, button: store.button, window:store.window }
};

function mapDispatchToProps(dispatch) {
  return {
    handleSubmitButton: function(value) { 
        dispatch( {type: 'button', value: value} ) 
    }
  }
};

class ProfileButton extends React.Component {

  constructor (props) {
    super(props);
    this.updateIndex = this.updateIndex.bind(this);
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
        CalendarButtonIndex:this.props.button.CalendarButtonIndex,
        ReservationButtonIndex:this.props.button.ReservationButtonIndex,
        ProfileButtonIndex:selectedIndex
      })
    if (selectedIndex==0) {
      Amplitude.logEvent("ProfileContent Button clicked");
      this.props.navigation.navigate("ProfileContent");
    } else {
      Amplitude.logEvent("FriendsContent Button clicked");
      this.props.navigation.navigate("FriendsContent");
    }
  }

  render() {

    const buttons = [translate.myProfile[this.props.user.currentLocale], translate.myFriends[this.props.user.currentLocale]];
    const selectedIndex = this.props.button.ProfileButtonIndex;
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

export default connect(mapStateToProps, mapDispatchToProps) (ProfileButton);

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