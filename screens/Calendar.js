import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'

import CalendarHeader from '../constants/CalendarHeader'
import CalendarButton from '../constants/CalendarButton'

export default class Calendar extends React.Component {
  render() {
    return (

    	<View style={{flex:1}}>
      <View style={{flex:1}}>
          <View style={{flex:1, top:60}}>
            <CalendarButton/>
          </View>
          <View style={{top:-90, height:110}}>
           <CalendarHeader/>
          </View>
        
        </View>
          <View style={{flex:3, backgroundColor:'blue'}}/>
    
        </View>

    );
  }
}
