import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'



import Header from '../Header/Header';
import CreateGameContent from './CreateGameContent'


export default class CreateGame extends React.Component {
  render() {
    return (

    	<View style={{flex: 1, backgroundColor:'white'}} >
 
            <View style={{flex:0.16, marginBottom:40}}>
            <Header navigation={this.props.navigation} screenProps={{header:"proposeGame", back:true}} />
            </View>

             <View style={{flex:0.84}}>
            <CreateGameContent navigation={this.props.navigation}/>
            </View>

      </View>

    );
  }
}