import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'


import EditProfileHeader from './EditProfileHeader'
import EditProfileContent from './EditProfileContent'


export default class EditProfile extends React.Component {
  render() {
    return (

    	<View style={{
        flex:1,
        backgroundColor:'white',
      }}>

      <View style={{
        position:'absolute',
        width:'100%',
        height:'100%',
        flexDirection:'row', 
        alignItems:'flex-end',
      }}>

      <Image style={{
        flex:1,
        resizeMode: 'stretch'}} 
        source={require('../../assets/icons/AppSpecific/Footer.imageset/group3.png')} /> 

      </View>
 
            <View style={{height:120}}>
            <EditProfileHeader/>
            </View>

             <View style={{flex: 4}}>
            <EditProfileContent/>
            </View>

      </View>

    );
  }
}
