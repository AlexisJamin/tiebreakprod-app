import React, { Component } from 'react'
import { StyleSheet, View, TouchableHighlight, TouchableNativeFeedback, Text, Platform } from 'react-native'
import { Font } from 'expo';


export default class SignInButton extends Component {

  constructor() {
		super();
		this.state = {fontAvenirLoaded: false };
	}

	async componentDidMount() {
    await Font.loadAsync({
      'Avenir': require('../../assets/fonts/Avenir.ttf'),
    });
    this.setState({ fontAvenirLoaded: true });
  }

  render() {

    var TouchableElement = TouchableHighlight;
    if (Platform.OS === 'android') {
     TouchableElement = TouchableNativeFeedback;
    }

    return (
    	<View>
         <TouchableElement >
        <View>
          {
        this.state.fontAvenirLoaded ? (<Text style={styles.title}>Créer un compte</Text>) : null 
          }
        </View>
      </TouchableElement>    
       </View>
    )
  }
}

const styles = StyleSheet.create({
  title: {
    color: 'white',
    backgroundColor: 'rgba(0,0,0,0)',
    fontFamily: 'Avenir',
    fontSize: 18,
    alignItem:'center', 
    justifyContent: 'center',
  },
});