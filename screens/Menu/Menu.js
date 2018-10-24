import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Alert } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { Parse } from 'parse/react-native';
import { connect } from 'react-redux';

import Header from '../Header/Header';
import MenuContent from './MenuContent';

import translate from '../../translate.js';

function mapStateToProps(store) {
  return { user: store.user }
};

class Menu extends React.Component {

  constructor() {
    super();
  }

  render() {
    return (

    	<View style={{flex: 1, backgroundColor:'white'}} >

      <View style={{
        position:'absolute',
        width:'100%',
        height:'100%',
        flexDirection:'row', 
        alignItems:'flex-end',
      }}>

      <Image style={{
        flex:1,
        height:250}} 
        source={require('../../assets/icons/AppSpecific/Footer.imageset/group3.png')} /> 

      </View>
          
          <View style={{flex:0.17, marginBottom:40}}>
          <Header navigation={this.props.navigation} screenProps={{header:"menu", back:false}} />
          </View>

          <View style={{flex:0.83}}>
          <MenuContent navigation={this.props.navigation}/>
          </View>

        </View>

    );
  }
}

export default connect(mapStateToProps, null) (Menu);

const styles = StyleSheet.create({
  buttonLogIn: {
    backgroundColor: 'rgba(0,0,0,0.2)',
    color: 'white',
    fontSize: 14,
    lineHeight: 30,
    textAlign: 'center',
    overflow:'hidden', 
    paddingTop:15,
    paddingBottom:15 
  },
});
