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

       
       <Image source={require('../assets/icons/AppSpecific/Header.imageset/header_bg.png')} >
       
       <View style={{
       	flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingTop: 35,
        }}>

         <View style={{backgroundColor:'rgba(0,0,0,0)'}}>
           <Text style={{color: 'rgba(0,0,0,0)'}}>H</Text> 
         </View>

         <View> 
       		 <Image source={require('../assets/icons/Menu/Profile.imageset/icProfile.png')} /> 
         </View>
         
        <View>
          <Image source={require('../assets/icons/Menu/Home.imageset/ic_white_ball_header.png')} />
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
    fontSize: 19,
    textAlign: 'center',
  },
});