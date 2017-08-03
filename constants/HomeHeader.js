import React, { Component } from 'react'
import { View, Image, Text, StyleSheet, TouchableWithoutFeedback } from 'react-native'
import { Font } from 'expo'
import { Actions } from 'react-native-router-flux'


export default class HomeHeader extends Component {

	constructor() {
		super();
		this.state = {fontLoaded: false};
	}

	async componentDidMount() {
    await Font.loadAsync({
      'SevenOneEightUltra': require('../assets/fonts/SevenOneEight-Ultra.ttf'),
    });
    this.setState({ fontLoaded: true });
  }
  
  render() {

    return (

       
       <Image style={{flex:1, width:null, height:null, resizeMode: 'cover'}} source={require('../assets/icons/AppSpecific/Header.imageset/header_bg.png')} >
       
       <View style={{
        flex:1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        top: 40,
        }}>

       		<TouchableWithoutFeedback onPress={Actions.menu}>
          <Image source={require('../assets/icons/Menu/Profile.imageset/icProfile.png')} /> 
          </TouchableWithoutFeedback>
       {
        this.state.fontLoaded ? (<Text style={styles.title}> TIE BREAK </Text> ) : null 
       }
       <TouchableWithoutFeedback onPress={Actions.chat}>
       <Image source={require('../assets/icons/Menu/Messages.imageset/icMessageBig.png')} />
       </TouchableWithoutFeedback>
       
       </View>
       
       </Image>
      
    );
  }
}

const styles = StyleSheet.create({
  title: {
    color: 'white',
    backgroundColor: 'rgba(0,0,0,0)',
    fontFamily: 'SevenOneEightUltra',
    fontSize: 15,
    top: 3,
    textAlign: 'center',
  },
});