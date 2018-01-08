import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'


import GameViewHeader from './GameViewHeader'
import GameViewContent from './GameViewContent'


export default class CreateGame extends React.Component {
  render() {
    return (

    	<View style={{flex: 1, backgroundColor:'white'}} >
 
            <View style={{height:120}}>
            <GameViewHeader navigation={this.props.navigation}/>
            </View>

             <View style={{flex: 4}}>
            <GameViewContent navigation={this.props.navigation}/>
            </View>

      </View>

    );
  }
}