import React from 'react';
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import { ButtonGroup } from 'react-native-elements';
import { Font, Amplitude } from 'expo';
import { connect } from 'react-redux';

import translate from '../../translate.js';

function mapStateToProps(store) {
  return { button: store.button, user: store.user, window:store.window }
};

function mapDispatchToProps(dispatch) {
  return {
        handleSubmit: function(value) { 
        dispatch( {type: 'button', value: value} ) 
    }
  }
};

class CommunityButton extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      selectedIndex: this.props.button.CommunityButtonIndex,
      fontLoaded: false
    }
    this.updateIndex = this.updateIndex.bind(this)
  }  

  componentWillReceiveProps(props) {
    this.setState({selectedIndex:props.button.CommunityButtonIndex});
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
      this.props.handleSubmit({
        ChatButtonIndex:this.props.button.ChatButtonIndex,
        CommunityButtonIndex:0,
        CalendarButtonIndex:this.props.button.CalendarButtonIndex,
        ProfileButtonIndex:this.props.button.ProfileButtonIndex
      })
      Amplitude.logEvent("CommunityContent Button clicked");
      this.props.navigation.navigate("CommunityContent");
    }  
    if (selectedIndex==1) {
      this.props.handleSubmit({
        ChatButtonIndex:this.props.button.ChatButtonIndex,
        CommunityButtonIndex:1,
        CalendarButtonIndex:this.props.button.CalendarButtonIndex,
        ProfileButtonIndex:this.props.button.ProfileButtonIndex
      })
      Amplitude.logEvent("CommunityPreferences Button clicked");
      this.props.navigation.navigate("CommunityPreferences");
    }
  }

  render() {

    const buttons = [translate.community[this.props.user.currentLocale], translate.myPreferences[this.props.user.currentLocale]]
    const { selectedIndex } = this.state
    var heightWindow = this.props.window.height*0.21;

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

export default connect(mapStateToProps, mapDispatchToProps) (CommunityButton);

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
    marginBottom:0
  },
});