import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'



import EditDispoHeader from './EditDispoHeader'
import EditDispoContent from './EditDispoContent'


export default class Home extends React.Component {
  render() {
    return (

    	<View style={{flex: 1, backgroundColor:'white'}} >
 
            <View style={{height:120}}>
            <EditDispoHeader navigation={this.props.navigation}/>
            </View>

             <View style={{flex: 4}}>
            <EditDispoContent navigation={this.props.navigation}/>
            </View>

      </View>

    );
  }
}
