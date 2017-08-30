import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'

import CommunityHeader from './CommunityHeader'
import CommunityButton from './CommunityButton'
import CommunityContent from './CommunityContent'

export default class Community extends React.Component {
  render() {
    return (

    	<View style={{flex:1}}>
      <View style={{flex:1}}>
          <View style={{flex:1, top:70}}>
            <CommunityButton/>
          </View>
          <View style={{top:-90, height:110}}>
           <CommunityHeader/>
          </View>
        
        </View>
          <View style={{flex:3, marginTop:-50, height:250}}>
            <CommunityContent/>
          </View>
    
        </View>

    );
  }
}
