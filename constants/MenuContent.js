import React, { Component } from 'react'
import { View, Image, Text, StyleSheet } from 'react-native'
import { Col, Row, Grid } from "react-native-easy-grid"
import { Font } from 'expo'

export default class MenuContent extends React.Component {

constructor() {
		super();
		this.state = {
			fontAvenirNextLoaded: false,
			fontAvenirLoaded: false  
		};
	}

	async componentDidMount() {
    await Font.loadAsync({
      'AvenirNext': require('../assets/fonts/AvenirNext.ttf'),
      'Avenir': require('../assets/fonts/Avenir.ttf'),
    });
    this.setState({ 
    	fontAvenirNextLoaded: true,
    	fontAvenirLoaded: true 
    });
  }

  render() {
    return (

    	<View style={{
    		flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
    	}}>

    	  <View style={{flex: 1}}>
            <Image source={require('../assets/icons/General/StarActive.imageset/icStarSelected.png')} />
          </View>
          
          <View style={{flex: 1}}>
            {
        this.state.fontAvenirNextLoaded ? (<Text style={styles.title}> MON PROFIL </Text>) : null 
          }
          </View>

          <View style={{flex: 1, paddingTop: 10}}>
            <Image source={require('../assets/icons/AppSpecific/BallYellow.imageset/combinedShapeCopy.png')} />
          </View>

           <View style={{flex: 1}}>
            {
        this.state.fontAvenirLoaded ? (<Text style={styles.subtitle}> MON CALENDRIER </Text>) : null 
          }
          </View>

          <View style={{flex: 1, paddingTop: 10}}>
            <Image source={require('../assets/icons/AppSpecific/BallYellow.imageset/combinedShapeCopy.png')} />
          </View>

           <View style={{flex: 1}}>
            {
        this.state.fontAvenirLoaded ? (<Text style={styles.subtitle}> MES AMIS </Text>) : null 
          }
          </View>

          <View style={{flex: 1, paddingTop: 10}}>
            <Image source={require('../assets/icons/AppSpecific/BallYellow.imageset/combinedShapeCopy.png')} />
          </View>

           <View style={{flex: 1}}>
            {
        this.state.fontAvenirLoaded ? (<Text style={styles.subtitle}> MES PRÉFÉRENCES </Text>) : null 
          }
          </View>

          <View style={{flex: 1, paddingTop: 10}}>
            <Image source={require('../assets/icons/AppSpecific/BallYellow.imageset/combinedShapeCopy.png')} />
          </View>

           <View style={{flex: 1}}>
            {
        this.state.fontAvenirLoaded ? (<Text style={styles.subtitle}> INVITER DES AMIS </Text>) : null 
          }
          </View>

          <View style={{flex: 1, paddingTop: 10}}>
            <Image source={require('../assets/icons/AppSpecific/BallYellow.imageset/combinedShapeCopy.png')} />
          </View>

           <View style={{flex: 1}}>
            {
        this.state.fontAvenirLoaded ? (<Text style={styles.subtitle}> À PROPOS </Text>) : null 
          }
          </View>

          <View style={{flex: 1, paddingTop: 10}}>
            <Image source={require('../assets/icons/AppSpecific/BallYellow.imageset/combinedShapeCopy.png')} />
          </View>

           <View style={{flex: 1}}>
            {
        this.state.fontAvenirLoaded ? (<Text style={styles.subtitle}> CONTACT </Text>) : null 
          }
          </View>
          
        </View>

    );
  }
}

const styles = StyleSheet.create({
  title: {
    color: 'black',
    backgroundColor: 'rgba(0,0,0,0)',
    fontFamily: 'AvenirNext',
    fontSize: 12,
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

