import React, { Component } from 'react'
import { View, Image, Text, StyleSheet } from 'react-native'
import { Col, Row, Grid } from "react-native-easy-grid"
import { Font } from 'expo';


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

       
       <Image source={require('../assets/icons/AppSpecific/Header.imageset/header_bg.png')} >
       
       <View style={{
       	flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingTop: 35,
        }}>

       <View> 
       		<Image source={require('../assets/icons/Menu/Profile.imageset/icProfile.png')} /> 
       </View>
       {
        this.state.fontLoaded ? (<Text style={styles.title}> TIE BREAK </Text> ) : null 
       }
       <View> 
       <Image source={require('../assets/icons/Menu/Messages.imageset/icMessageBig.png')} />
       </View>
       
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
    textAlign: 'center',
  },
});