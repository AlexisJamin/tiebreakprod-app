import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'


import Header from '../Header/Header';
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
 
            <View style={{flex:0.16}}>
            <Header navigation={this.props.navigation} screenProps={{header:"editProfile", back:false}} />
            </View>

             <View style={{flex:0.84}}>
            <EditProfileContent navigation={this.props.navigation}/>
            </View>

      </View>

    );
  }
}
