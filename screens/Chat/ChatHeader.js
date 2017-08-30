import React, { Component } from 'react'
import { View, Image, Text, StyleSheet, TouchableWithoutFeedback } from 'react-native'
import { Col, Row, Grid } from "react-native-easy-grid"
import { Font } from 'expo'
import { Actions } from 'react-native-router-flux'


export default class ChatHeader extends Component {

  
  render() {

    return (

       <Image style={{flex:1, width:null, height:null, resizeMode: 'cover'}} source={require('../../assets/icons/AppSpecific/HeaderMin.imageset/header_bg.png')}>
       
         <View style={{
          flex:1,
          flexDirection: 'row',
          justifyContent: 'space-around',
          top: 70,
        }}>

            <TouchableWithoutFeedback onPress={Actions.pop}>
             <Image source={require('../../assets/icons/Menu/Home.imageset/ic_white_ball_header.png')} />
            </TouchableWithoutFeedback>
       
   
             <Image source={require('../../assets/icons/Menu/Messages.imageset/icMessageBig.png')} /> 
        

         
             <Text style={{color: 'rgba(0,0,0,0)', backgroundColor:'rgba(0,0,0,0)'}}>H</Text> 


         </View>
      </Image>

      
    );
  }
}
