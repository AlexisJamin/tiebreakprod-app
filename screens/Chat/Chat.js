import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'

import ChatHeader from './ChatHeader'
import ChatButton from './ChatButton'
import ProfileContent from '../Profile/ProfileContent'

export default class Chat extends React.Component {
  render() {
    return (

    	<View style={{flex:1, backgroundColor:'white'}}>

      <View style={{
        position:'absolute',
        width:'100%',
        height:'100%',
        flexDirection:'row', 
        alignItems:'flex-start',
      }}>

        <View style={{flex:1, alignItems:'stretch'}}>
          <ChatButton/>
        </View>

      </View>

          <View style={{height:80}}>
           <ChatHeader navigation={this.props.navigation}/>
          </View>
        

    
        </View>

    );
  }
}
