import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';


import Header from '../Header/Header';
import PaymentContent from './PaymentContent';


export default class Payment extends React.Component {
  render() {
    return (

    	<View style={{flex: 1, backgroundColor:'white'}} >
 
            <View style={{flex:0.17, marginBottom:40}}>
            <Header navigation={this.props.navigation} screenProps={{header:"pay", back:true}}/>
            </View>

             <View style={{flex: 0.83}}>
            <PaymentContent navigation={this.props.navigation}/>
            </View>

      </View>

    );
  }
}