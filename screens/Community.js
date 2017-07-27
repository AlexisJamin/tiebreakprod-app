import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'

import CommunityHeader from '../constants/CommunityHeader'
import CommunityButton from '../constants/CommunityButton'

export default class Community extends React.Component {
  render() {
    return (

    	<View>
        <View style={{position: 'relative', top: 60}}>
           <CommunityButton/>
        </View>

        <View style={{flex: 1, position:'absolute'}}>
              <CommunityHeader/>    
        </View>


      </View>

    );
  }
}
