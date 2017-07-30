import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import Swiper from 'react-native-swiper'

import Menu from './Menu'
import Home from './Home'
import Chat from './Chat'
import Profile from './Profile'

export default class SwiperApp extends React.Component {

viewStyle() {
    return {
      flex: 1,
    }
  }

  render() {
    return (
        <Swiper
        loop={false}
        showsPagination={false}
        index={2}>
        <View style={this.viewStyle()}>
          <Profile/>
        </View>  
        <View style={this.viewStyle()}>
          <Menu/>
        </View>    
        <View style={this.viewStyle()}>
          <Home/>
        </View>
        <View style={this.viewStyle()}>
          <Chat/>
        </View>
      </Swiper>

    );
  }
}
