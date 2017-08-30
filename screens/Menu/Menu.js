import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'

import MenuHeader from './MenuHeader'
import MenuButton from './MenuButton'
import MenuContent from './MenuContent'
import Footer from '../../constants/Footer'

export default class Home extends React.Component {
  render() {
    return (

    	<View style={{flex: 1, backgroundColor:'white'}} >
          
          <View style={{height:120}}>
          <MenuHeader/>
          </View>

          <View style={{flex: 1}}>
          <MenuContent/>
          </View>

          <View style={{height:160}}>
          <Footer/>
          </View>


          <View style={{ 
        flexDirection: 'column',
        justifyContent: 'center',
        backgroundColor: 'rgba(200,90,24,1)', 
        alignItems: 'center',
        height: 60,
         }}>
              <MenuButton/>
          </View>

        </View>

    );
  }
}
