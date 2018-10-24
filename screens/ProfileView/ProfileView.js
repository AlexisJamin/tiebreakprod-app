import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

import ProfileViewHeader from './ProfileViewHeader';
import ProfileViewContent from './ProfileViewContent';

export default class ProfileView extends React.Component {

  render() {

    return (

    	  <View style={{flex:1, backgroundColor:'white'}}>


          <View style={{flex:0.16, marginBottom:40}}>
           <ProfileViewHeader navigation={this.props.navigation}/>
          </View>

          <View style={{flex:0.84}}>
          <ProfileViewContent/>
          </View>
        
        </View>
    );
  }
}
