import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'


import HomeHeader from '../constants/HomeHeader'
import HomeSlideSearch from '../constants/HomeSlideSearch'
import HomeSlideAdd from '../constants/HomeSlideAdd'
import HomeButton from '../constants/HomeButton'
import Footer from '../constants/Footer'

export default class Home extends React.Component {
  render() {
    return (

    	<View style={{flex: 1}} >

    	  <View style={{flex: 1}}>
            <HomeHeader/>
          </View>

            <View style={{flex: 0.8}}>
          </View>

          <View style={{flex: 2}}>
            <HomeSlideSearch/>
          </View>

          <View style={{flex: 2}}>
            <HomeSlideAdd/>
          </View>

          <View style={{flex: 2}}>
            <Footer />
          </View>

          <View style={{
        flexDirection: 'column',
        justifyContent: 'center',
        backgroundColor: 'rgba(200,90,24,1)', 
        alignItems: 'center',
        height: 60,
         }}>
              <HomeButton/>
          </View>

        </View>

    );
  }
}
