import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { TabNavigator } from 'react-navigation';

import Header from '../Header/Header';
import FriendsButton from './FriendsButton';
import FriendsContent from './FriendsContent';
import FriendsAdd from './FriendsAdd';


const FriendsNavigator = TabNavigator(
{
  FriendsContent: {screen: FriendsContent },
  FriendsAdd: {screen: FriendsAdd }
},
{
  initialRouteName:'FriendsContent',
  swipeEnabled: false,
  animationEnabled: false,
  navigationOptions: {
    tabBarVisible: false
  }
  },
);

export default class Friends extends React.Component {
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
          <FriendsButton navigation={this.props.navigation}/>
        </View>

      </View>

          <View style={{flex:0.16, marginBottom:60}}>
           <Header navigation={this.props.navigation} screenProps={{header:"myFriends", back:true}}/>
          </View>
        
        <View style={{flex:0.84}}>
        <FriendsNavigator navigation={this.props.navigation}/>
        </View>

        </View>
    );
  }
}

Friends.router = FriendsNavigator.router;



