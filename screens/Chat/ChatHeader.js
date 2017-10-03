import React, { Component } from 'react'
import { View, Image, Text, StyleSheet, TouchableWithoutFeedback } from 'react-native'
import { Font } from 'expo'
import { NavigationActions } from 'react-navigation'


export default class ChatHeader extends Component {

  
  render() {

    return (

       <Image style={{flex:1, width:null, height:null, resizeMode: 'stretch'}} source={require('../../assets/icons/AppSpecific/HeaderMin.imageset/header_bg.png')}>
       
         <View style={{
          flex:1,
          flexDirection: 'row',
          justifyContent: 'space-around',
          top: 40,
         }}>

            <TouchableWithoutFeedback onPress={() => this.props.navigation.goBack()}>
             <Image source={require('../../assets/icons/Menu/Home.imageset/ic_white_ball_header.png')} />
            </TouchableWithoutFeedback>
       
   
             <Image source={require('../../assets/icons/Menu/Messages.imageset/icMessageBig.png')} /> 
        

         
             <Text style={{color: 'rgba(0,0,0,0)', backgroundColor:'rgba(0,0,0,0)'}}>H</Text> 


         </View>
      </Image>

      
    );
  }
}
