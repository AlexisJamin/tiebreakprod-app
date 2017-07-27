import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import Swiper from 'react-native-swiper'

import Menu from './Menu'
import Home from './Home'
import Chat from './Chat'

export default class SwiperApp extends React.Component {

viewStyle() {
    return {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    }
  }

  render() {
    return (
        <Swiper
        loop={false}
        showsPagination={false}
        index={1}>
        <View style={this.viewStyle()}>
          <Menu/>
        </View>    
        <View style={this.viewStyle()}>
          <Home/>
        </View>
        <View>
          <Chat/>
        </View>
      </Swiper>

    );
  }
}
