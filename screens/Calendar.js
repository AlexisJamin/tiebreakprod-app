import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'

import CalendarHeader from '../constants/CalendarHeader'
import CalendarButton from '../constants/CalendarButton'

export default class Calendar extends React.Component {
  render() {
    return (

    	<View>
        <View style={{position: 'relative', top: 60}}>
           <CalendarButton/>
        </View>

        <View style={{flex: 1, position:'absolute'}}>
              <CalendarHeader/>    
        </View>


      </View>

    );
  }
}
