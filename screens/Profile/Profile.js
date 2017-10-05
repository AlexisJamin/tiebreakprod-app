import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import { NavigationActions } from 'react-navigation'

import ProfileHeader from './ProfileHeader'
import ProfileButton from './ProfileButton'
import ProfileContent from './ProfileContent'
import ProfilePreferences from './ProfilePreferences'


export default class Profile extends React.Component {
  render() {
    return (

    	  <View style={{flex:1, backgroundColor:'white'}}>

         <View style={{
        position:'absolute',
        width:'100%',
        height:'100%',
        flexDirection:'row', 
        alignItems:'flex-start',
      }}>
  
          <View style={{flex:1, alignItems:'stretch'}}>
          <ProfileButton selectedIndex={this.props.navigation.state.params.selectedIndex}/>
        </View>

      </View>

          <View style={{height:80, marginBottom:60}}>
           <ProfileHeader navigation={this.props.navigation}/>
          </View>

          <ProfilePreferences navigation={this.props.navigation}/>
        

        </View>



    );
  }
}
