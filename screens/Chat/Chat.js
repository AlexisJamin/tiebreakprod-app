import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { TabNavigator } from 'react-navigation';

import ChatHeader from './ChatHeader';
import ChatButton from './ChatButton';
import ChatContent from './ChatContent';
import Notifications from './Notifications';


const ChatNavigator = TabNavigator(
{
  Notifications: {screen: Notifications, navigationOptions: {tabBarVisible: false}},
  ChatContent: {screen: ChatContent, navigationOptions: {tabBarVisible: false}}
},
{
  initialRouteName:'Notifications'
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

          <View style={{height:80, marginBottom:60}}>
           <ChatHeader navigation={this.props.navigation}/>
          </View>
        
        <ChatNavigator navigation={this.props.navigation}/>

        </View>
    );
  }
}

Chat.router = ChatNavigator.router;



