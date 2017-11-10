import React from 'react';
import { StyleSheet, Text, View, Image, TextInput } from 'react-native';
import { TabNavigator } from 'react-navigation';

import CommunityHeader from './CommunityHeader';
import CommunityButton from './CommunityButton';
import CommunityContent from './CommunityContent';
import CommunityFriends from './CommunityFriends';


const CommunityNavigator = TabNavigator(
{
  CommunityContent: {screen: CommunityContent, navigationOptions: {tabBarVisible: false}},
  CommunityFriends: {screen: CommunityFriends, navigationOptions: {tabBarVisible: false}},
},
{
  swipeEnabled: false,
  lazy: true,
  animationEnabled: false
  },
);

export default class Community extends React.Component {
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
          <CommunityButton navigation={this.props.navigation}/>
          <TextInput style={styles.searchBar}/>
          </View>

        </View>

          <View style={{height:80, marginBottom:90}}>
           <CommunityHeader navigation={this.props.navigation}/>
          </View>

          <CommunityNavigator navigation={this.props.navigation}/>
        

      </View>

    );
  }
}

Community.router = CommunityNavigator.router;

styles = StyleSheet.create({
  searchBar: {
    paddingLeft: 30,
    fontSize: 13,
    maxHeight: 40,
    flex: .1,
    borderWidth: 6,
    borderColor: '#E4E4E4'
  }
})

