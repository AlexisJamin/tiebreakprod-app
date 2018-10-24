import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';


import Header from '../Header/Header';
import EditClubContent from './EditClubContent';


export default class EditClub extends React.Component {
  render() {
    return (

    	<View style={{flex: 1, backgroundColor:'white'}} >
 
            <View style={{flex:0.16, marginBottom:40}}>
            <Header navigation={this.props.navigation} screenProps={{header:"editMyClubs", back:false}} />
            </View>

             <View style={{flex:0.84}}>
            <EditClubContent navigation={this.props.navigation}/>
            </View>

      </View>

    );
  }
}
