import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { TabNavigator } from 'react-navigation';

import Header from '../Header/Header';
import CalendarButton from './CalendarButton';
import CalendarFuture from './CalendarFuture';
import CalendarPast from './CalendarPast';

const CalendarNavigator = TabNavigator(
{
  CalendarFuture: {screen: CalendarFuture, navigationOptions: {tabBarVisible: false}},
  CalendarPast: {screen: CalendarPast, navigationOptions: {tabBarVisible: false}},
},
{
  initialRouteName:'CalendarFuture',
  swipeEnabled: false,
  lazy: true,
  animationEnabled: false
  },
);

export default class Calendar extends React.Component {
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
          <CalendarButton navigation={this.props.navigation}/>
        </View>

      </View>

          <View style={{flex:0.16, marginBottom:40}}>
           <Header navigation={this.props.navigation} screenProps={{header:"myCalendar", back:true}} />
          </View>
        
        <View style={{flex:0.84}}>
        <CalendarNavigator navigation={this.props.navigation} />
        </View>

        </View>

    );
  }
}

Calendar.router = CalendarNavigator.router;
