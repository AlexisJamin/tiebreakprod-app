import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import { TabNavigator } from 'react-navigation'

import Header from '../Header/Header';
import ProfileButton from './ProfileButton';
import ProfileContent from './ProfileContent';
import FriendsContent from '../Friends/FriendsContent';

const ProfileNavigator = TabNavigator(
{
  ProfileContent: {screen: ProfileContent},
  FriendsContent: {screen: FriendsContent},
},
{
  initialRouteName:'ProfileContent',
  swipeEnabled: false,
  animationEnabled: false,
  navigationOptions: {
    tabBarVisible: false
  }
},
);

export default class Profile extends React.Component {
  render() {
    return (

    	  <View style={{flex:1, backgroundColor:'white'}}>

         <View style={{
            position:'absolute',
            width:'100%',
            height:'100%',
            flexDirection:'row', 
            alignItems:'flex-start',
          }}>
  
          <View style={{flex:1, alignItems:'stretch'}}>
          <ProfileButton navigation={this.props.navigation}/>
        </View>

      </View>

          <View style={{flex:0.17, marginBottom:45}}>
           <Header navigation={this.props.navigation} screenProps={{header:"myProfile", back:false}} />
          </View>

          <View style={{flex:0.83}}>
          <ProfileNavigator navigation={this.props.navigation}/>
          </View>
        
        </View>
    );
  }
}

Profile.router = ProfileNavigator.router;


