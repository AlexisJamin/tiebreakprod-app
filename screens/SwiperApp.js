import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import Swiper from 'react-native-swiper'

import Menu from './Menu/Menu'
import Home from './Home/Home'
import Chat from './Chat/Chat'

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
        showsButtons={true}
        buttonWrapperStyle={{alignItems: "flex-start"}}
        prevButton={<Text style={styles.buttonText}>‹</Text>}
        nextButton={<Text style={styles.buttonText}>‹</Text>}
        index={1}>
        <View style={this.viewStyle()}>
          <Menu navigation={this.props.navigation}/>
        </View>    
        <View style={this.viewStyle()}>
          <Home navigation={this.props.navigation}/>
        </View>
        <View style={this.viewStyle()}>
          <Chat navigation={this.props.navigation}/>
        </View>
      </Swiper>

    );
  }
}

const styles = StyleSheet.create({
  buttonText: {
    color: 'transparent',
    top: 10,
    padding:30,
    width:20,
    height:20
  },
});