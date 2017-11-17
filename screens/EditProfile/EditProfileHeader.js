import React, { Component } from 'react'
import { View, Image, Text, StyleSheet } from 'react-native'
import { Font } from 'expo';
import { NavigationActions } from 'react-navigation'


export default class EditProfileHeader extends Component {

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

       
       <Image style={{flex:1, width:null, height:null, resizeMode: 'cover'}} source={require('../../assets/icons/AppSpecific/Header.imageset/header_bg.png')} >
       
       <View style={{
        flex:1,
        flexDirection: 'row',
        justifyContent: 'center',
        top: 40,
        }}>

       {
        this.state.fontLoaded ? (<Text style={styles.title}> Éditer le profil </Text> ) : null 
       }
       
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
    fontSize: 15,
    top: -3,
    textAlign: 'center',
  },
});