import React, { Component } from 'react'
import { View, Image, Text, StyleSheet } from 'react-native'
import { Col, Row, Grid } from "react-native-easy-grid"
import { Font } from 'expo';


export default class MenuHeader extends Component {

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
        flexDirection: 'row',
        justifyContent: 'space-around',
        top: 40,
        }}>

           <Text style={{color: 'rgba(0,0,0,0)', backgroundColor:'rgba(0,0,0,0)'}}>H</Text> 

       		 <Image source={require('../assets/icons/Menu/Profile.imageset/icProfile.png')} /> 
         
          <Image source={require('../assets/icons/Menu/Home.imageset/ic_white_ball_header.png')} />
       
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
    fontSize: 19,
    textAlign: 'center',
  },
});