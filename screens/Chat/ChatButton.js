import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { ButtonGroup } from 'react-native-elements';
import { Font, Amplitude } from 'expo';
import { connect } from 'react-redux';

import translate from '../../translate.js';

function mapStateToProps(store) {
  return { button: store.button, user: store.user, window:store.window }
};

class ChatButton extends React.Component {

  constructor (props) {
    super(props);
    this.updateIndex = this.updateIndex.bind(this)
    this.state = {
      fontLoaded: false,
      selectedIndex:0,
    }
  }  

  async componentDidMount() {
    await Font.loadAsync({
      'Avenir': require('../../assets/fonts/Avenir.ttf'),
    });
    this.setState({ fontLoaded: true });
  }

  updateIndex (selectedIndex) {
    this.setState({selectedIndex});
    if (selectedIndex==0) {
      Amplitude.logEvent("Notifications Button clicked");
      this.props.navigation.navigate("Notifications");
    } else {
      Amplitude.logEvent("Chat Button clicked");
      this.props.navigation.navigate("ChatContent");
    }
  }

  render() {

    const buttons = [translate.notifications[this.props.user.currentLocale], translate.chat[this.props.user.currentLocale]]
    const { selectedIndex } = this.state;
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

export default connect(mapStateToProps, null) (ChatButton);

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