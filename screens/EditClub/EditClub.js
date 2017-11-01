import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';


import EditClubHeader from './EditClubHeader'
import EditClubContent from './EditClubContent'


export default class EditClub extends React.Component {
  render() {
    return (

    	<View style={{flex: 1, backgroundColor:'white'}} >
 
            <View style={{height:120}}>
            <EditClubHeader navigation={this.props.navigation}/>
            </View>

             <View style={{flex: 4}}>
            <EditClubContent navigation={this.props.navigation}/>
            </View>

      </View>

    );
  }
}
