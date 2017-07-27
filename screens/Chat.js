import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'

import ChatHeader from '../constants/ChatHeader'
import ChatButton from '../constants/ChatButton'

export default class Chat extends React.Component {
  render() {
    return (

    	<View>
        <View style={{position: 'relative', top: 60}}>
           <ChatButton/>
        </View>

        <View style={{flex: 1, position:'absolute'}}>
              <ChatHeader/>    
        </View>


      </View>

    );
  }
}
