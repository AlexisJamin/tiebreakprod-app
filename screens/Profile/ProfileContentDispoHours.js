import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Font } from 'expo'
import { connect } from 'react-redux';


export default class ProfileContentDispoHours extends React.Component {

constructor() {
    super();
    this.state = {
      fontAvenirNextLoaded: false,
      fontAvenirLoaded: false,
    };
  }

  async componentDidMount() {
   
    await Font.loadAsync({
      'AvenirNext': require('../../assets/fonts/AvenirNext.ttf'),
      'Avenir': require('../../assets/fonts/Avenir.ttf'),
    });
    this.setState({ 
      fontAvenirNextLoaded: true,
      fontAvenirLoaded: true,

    });
  }


  render() {
    return (

              <Text style={styles.button}>{this.props.hours}</Text>

        );
  }
}


const styles = StyleSheet.create({
  button: {
    width:50,
    height: 30, 
    borderWidth:1, 
    borderColor:'rgb(42,129,82)', 
    borderRadius:'3', 
    overflow:'hidden', 
    paddingTop:5, 
    paddingBottom: 5, 
    marginBottom:5,
    marginRight: 10, 
    color: 'white', 
    backgroundColor: 'rgb(42,129,82)', 
    textAlign:'center'
  },
});

