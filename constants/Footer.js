import React, { Component } from 'react'
import { View, Image, Text, StyleSheet } from 'react-native'


export default class Footer extends Component {

  
  render() {

    return (
      <View>
       <Image source={require('../assets/icons/AppSpecific/Footer.imageset/group3.png')} />
      </View>
    )
  }
}