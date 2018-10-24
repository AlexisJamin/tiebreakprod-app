import React from 'react';
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import { ButtonGroup } from 'react-native-elements';
import { Font } from 'expo';
import { connect } from 'react-redux';

import translate from '../../translate.js';

function mapStateToProps(store) {
  return { button: store.button, user: store.user, window:store.window }
};

class FriendsButton extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      selectedIndex: this.props.button.CommunityButtonIndex,
      fontLoaded: false
    }
    this.updateIndex = this.updateIndex.bind(this)
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
      this.props.navigation.navigate("FriendsContent");
      console.log("clic sur bouton Amis");
    }  
    if (selectedIndex==1) {
      this.props.navigation.navigate("FriendsAdd");
      console.log("clic sur bouton Ajouter des amis");
    }
  }

  render() {

    const buttons = [translate.myFriends[this.props.user.currentLocale], translate.addFriends[this.props.user.currentLocale]];
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

export default connect(mapStateToProps, null) (FriendsButton);

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