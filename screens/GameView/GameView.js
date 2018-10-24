import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';


import Header from '../Header/Header';
import GameViewContent from './GameViewContent';


export default class CreateGame extends React.Component {
  render() {
    return (

    	<View style={{flex: 1, backgroundColor:'white'}} >
 
            <View style={{flex:0.16, marginBottom:40}}>
            <Header navigation={this.props.navigation} screenProps={{header:"gameDetails", back:true}} />
            </View>

             <View style={{flex:0.84}}>
            <GameViewContent navigation={this.props.navigation}/>
            </View>

      </View>

    );
  }
}