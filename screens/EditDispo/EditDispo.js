import React from 'react';
import { StyleSheet, Text, View } from 'react-native';



import Header from '../Header/Header';
import EditDispoContent from './EditDispoContent';


export default class EditDispo extends React.Component {
  render() {
    return (

    	<View style={{flex: 1, backgroundColor:'white'}} >
 
            <View style={{flex:0.16, marginBottom:40}}>
            <Header navigation={this.props.navigation} screenProps={{header:"editAvailabilities", back:false}} />
            </View>

             <View style={{flex:0.84}}>
            <EditDispoContent navigation={this.props.navigation}/>
            </View>

      </View>

    );
  }
}
