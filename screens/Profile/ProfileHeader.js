import React, { Component } from 'react'
import { View, Image, Text, StyleSheet, TouchableWithoutFeedback } from 'react-native'
import { Font } from 'expo'
import { NavigationActions } from 'react-navigation'


export default class ProfileHeader extends Component {

  constructor() {
    super();
    this.state = {fontLoaded: false};
  }

  async componentDidMount() {
    await Font.loadAsync({
      'Avenir': require('../../assets/fonts/Avenir.ttf'),
    });
    this.setState({ fontLoaded: true });
  }
  
  render() {

    return (

        <Image style={{flex:1, width:null, height:null, resizeMode: 'stretch'}} source={require('../../assets/icons/AppSpecific/HeaderMin.imageset/header_bg.png')}>
        
        <View style={{
          flex:1,
          flexDirection: 'row',
          justifyContent: 'space-around',
          top: 40,
        }}>

             <TouchableWithoutFeedback onPress={() => this.props.navigation.goBack()}>
             <Image source={require('../../assets/icons/General/BackWhite.imageset/ic_back_white.png')} />
             </TouchableWithoutFeedback>

             <Text style={{color: 'rgba(0,0,0,0)', backgroundColor:'rgba(0,0,0,0)'}}>H</Text> 

             <Text style={{color: 'rgba(0,0,0,0)', backgroundColor:'rgba(0,0,0,0)'}}>H</Text> 

         </View>
        </Image>
    
    );
  }
}

const styles = StyleSheet.create({
  title: {
    color: 'white',
    backgroundColor: 'rgba(0,0,0,0)',
    fontFamily: 'Avenir',
    fontSize: 18,
    textAlign: 'center',
    top: -3,
  },
});