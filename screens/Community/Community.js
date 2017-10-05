import React from 'react'
import { StyleSheet, Text, View, Image, TextInput } from 'react-native'

import ProfileHeader from '../Profile/ProfileHeader'
import ProfileButton from '../Profile/ProfileButton'
import ProfilePreferences from '../Profile/ProfilePreferences'
import CommunityHeader from './CommunityHeader'
import CommunityButton from './CommunityButton'
import CommunityContent from './CommunityContent'

export default class Community extends React.Component {
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
          <CommunityButton selectedIndex={this.props.navigation.state.params.selectedIndex}/>
          <TextInput style={styles.searchBar}/>
          </View>

        </View>

          <View style={{height:80, marginBottom:120}}>
           <CommunityHeader navigation={this.props.navigation}/>
          </View>

          <ProfilePreferences navigation={this.props.navigation}/>
        

      </View>

    );
  }
}

styles = StyleSheet.create({
  searchBar: {
    paddingLeft: 30,
    fontSize: 13,
    maxHeight: 40,
    flex: .1,
    borderWidth: 6,
    borderColor: '#E4E4E4',
  }
})

