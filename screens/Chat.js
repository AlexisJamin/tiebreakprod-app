import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'

import ChatHeader from '../constants/ChatHeader'
import ChatButton from '../constants/ChatButton'
import ProfileContent from '../constants/ProfileContent'

export default class Chat extends React.Component {
  render() {
    return (

    	<View style={{flex:1, backgroundColor:'white'}}>
      <View style={{flex:1}}>
          <View style={{flex:1, top:60}}>
            <ChatButton/>
          </View>
          <View style={{top:-90, height:110}}>
           <ChatHeader/>
          </View>
        
        </View>
          <View style={{flex:3, backgroundColor:'blue'}}/>
    
        </View>

    );
  }
}
