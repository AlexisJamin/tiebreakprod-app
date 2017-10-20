import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'



import CreateGameHeader from './CreateGameHeader'
import CreateGameContent from './CreateGameContent'


export default class CreateGame extends React.Component {
  render() {
    return (

    	<View style={{flex: 1, backgroundColor:'white'}} >
 
            <View style={{height:120}}>
            <CreateGameHeader navigation={this.props.navigation}/>
            </View>

             <View style={{flex: 4}}>
            <CreateGameContent navigation={this.props.navigation}/>
            </View>

      </View>

    );
  }
}