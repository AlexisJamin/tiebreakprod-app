import React from 'react'
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native'

import ProfileHeader from './ProfileHeader'
import ProfileButton from './ProfileButton'
import ProfileContent from './ProfileContent'




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
          <ProfileButton/>
        </View>

      </View>

          <View style={{height:80, marginBottom:60}}>
           <ProfileHeader/>
          </View>

          <ProfileContent/>
        

        </View>



    );
  }
}

const styles = StyleSheet.create({
  title: {
    color: 'black',
    backgroundColor: 'rgba(0,0,0,0)',
    fontFamily: 'AvenirNext',
    fontSize: 13,
    paddingTop: 2,
    alignItem:'center', 
    justifyContent: 'center',
  },
  subtitle: {
    color: 'black',
    backgroundColor: 'rgba(0,0,0,0)',
    fontFamily: 'Avenir',
    fontSize: 12,
    paddingTop: 2,
    alignItem:'center', 
    justifyContent: 'center',
  },
});


