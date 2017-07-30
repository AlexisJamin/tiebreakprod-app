import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'

import MenuHeader from '../constants/MenuHeader'
import MenuButton from '../constants/MenuButton'
import MenuContent from '../constants/MenuContent'
import Footer from '../constants/Footer'

export default class Home extends React.Component {
  render() {
    return (

    	<View style={{flex: 1}} >
          
          <View style={{height:120}}>
          <MenuHeader/>
          </View>

          <View style={{flex: 3}}>
          <MenuContent/>
          </View>

          <View style={{flex: 1}}>
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
