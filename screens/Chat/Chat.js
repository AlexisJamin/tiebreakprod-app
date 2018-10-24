import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { TabNavigator } from 'react-navigation';

import Header from '../Header/Header';
import ChatButton from './ChatButton';
import ChatContent from './ChatContent';
import Notifications from './Notifications';


const ChatNavigator = TabNavigator(
{
  Notifications: {screen: Notifications },
  ChatContent: {screen: ChatContent }
},
{
  initialRouteName:'Notifications',
  swipeEnabled: false,
  animationEnabled: false,
  navigationOptions: {
    tabBarVisible: false
  }
  },
);

export default class Chat extends React.Component {
  render() {
    return (

    	<View style={{flex:1, backgroundColor:'white'}}>

      <View style={{
        position:'absolute',
        width:'100%',
        height:'100%',
        flexDirection:'row', 
        alignItems:'flex-start'
      }}>

        <View style={{flex:1, alignItems:'stretch'}}>
          <ChatButton navigation={this.props.navigation}/>
        </View>

      </View>

          <View style={{flex:0.17, marginBottom:40}}>
           <Header navigation={this.props.navigation} screenProps={{header:"chat", back:false}}/>
          </View>
        
        <View style={{flex:0.83}}>
        <ChatNavigator navigation={this.props.navigation}/>
        </View>

        </View>
    );
  }
}

Chat.router = ChatNavigator.router;



