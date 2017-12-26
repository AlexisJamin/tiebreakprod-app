import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

import MessengerHeader from './MessengerHeader';
import MessengerContent from './MessengerContent';


export default class Messenger extends React.Component {
  render() {
    return (

    	<View style={{flex:1, backgroundColor:'white'}}>

          <View style={{height:80, marginBottom:20}}>
           <MessengerHeader navigation={this.props.navigation}/>
          </View>
        
        <MessengerContent navigation={this.props.navigation}/>

        </View>
    );
  }
}




