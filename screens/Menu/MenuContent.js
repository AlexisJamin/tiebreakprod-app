import React, { Component } from 'react'
import { View, Image, Text, StyleSheet, TouchableWithoutFeedback } from 'react-native'
import { Col, Row, Grid } from "react-native-easy-grid"
import { Font, Svg } from 'expo'
import { Actions } from 'react-native-router-flux'

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
      'AvenirNext': require('../../assets/fonts/AvenirNext.ttf'),
      'Avenir': require('../../assets/fonts/Avenir.ttf'),
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

    	  <View style={{flex: 10, top: -25}}>
          <TouchableWithoutFeedback onPress={Actions.profil}>
          <Svg height={100} width={100}>
            <Svg.Circle
              cx={50}
              cy={50}
              r={45}
              strokeWidth={0.5}
              stroke="black"
              fill="white"
            />
          </Svg>
          </TouchableWithoutFeedback>
        </View>
          
          <View style={{flex: 1, top: -10}}>
            {
        this.state.fontAvenirNextLoaded ? (<Text onPress={Actions.profil} style={styles.title}> MON PROFIL </Text>) : null 
          }
          </View>

          <View style={{flex: 1, paddingTop: 20}}>
            <Image source={require('../../assets/icons/AppSpecific/BallYellow.imageset/combinedShapeCopy.png')} />
          </View>

           <View style={{flex: 1, paddingTop: 10}}>
            {
        this.state.fontAvenirLoaded ? (<Text style={styles.subtitle}> MON CALENDRIER </Text>) : null 
          }
          </View>

          <View style={{flex: 1, paddingTop: 20}}>
            <Image source={require('../../assets/icons/AppSpecific/BallYellow.imageset/combinedShapeCopy.png')} />
          </View>

           <View style={{flex: 1, paddingTop: 10}}>
            {
        this.state.fontAvenirLoaded ? (<Text style={styles.subtitle}> MES AMIS </Text>) : null 
          }
          </View>

          <View style={{flex: 1, paddingTop: 20}}>
            <Image source={require('../../assets/icons/AppSpecific/BallYellow.imageset/combinedShapeCopy.png')} />
          </View>

           <View style={{flex: 1, paddingTop: 10}}>
            {
        this.state.fontAvenirLoaded ? (<Text style={styles.subtitle}> INVITER DES AMIS </Text>) : null 
          }
          </View>

          <View style={{flex: 1, paddingTop: 20}}>
            <Image source={require('../../assets/icons/AppSpecific/BallYellow.imageset/combinedShapeCopy.png')} />
          </View>

           <View style={{flex: 1, paddingTop: 10}}>
            {
        this.state.fontAvenirLoaded ? (<Text style={styles.subtitle}> À PROPOS </Text>) : null 
          }
          </View>

          <View style={{flex: 1, paddingTop: 20}}>
            <Image source={require('../../assets/icons/AppSpecific/BallYellow.imageset/combinedShapeCopy.png')} />
          </View>

           <View style={{flex: 1, paddingTop: 10}}>
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

