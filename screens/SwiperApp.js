import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import { TabNavigator } from 'react-navigation';

import Menu from './Menu/Menu'
import Home from './Home/Home'
import Chat from './Chat/Chat'

const HomeNavigator = TabNavigator(
{
  Menu: {screen: Menu, navigationOptions: {tabBarVisible: false}},
  Home: {screen: Home, navigationOptions: {tabBarVisible: false}},
  Chat: {screen: Chat, navigationOptions: {tabBarVisible: false}},
},
  {
  swipeEnabled: true,
  initialRouteName:'Home',
  },
);

export default class Swiper extends React.Component {


  render() {
    return (
        <HomeNavigator navigation={this.props.navigation}/>

    );
  }
}

Swiper.router = HomeNavigator.router;

const styles = StyleSheet.create({
  buttonText: {
    color: 'transparent',
    top: 10,
    padding:40,
    width:20,
    height:20
  },
});