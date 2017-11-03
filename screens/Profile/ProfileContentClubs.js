import React, { Component } from 'react';
import { View, Text, StyleSheet} from 'react-native';
import { Font } from 'expo';

export default class ProfileContentClubs extends React.Component {

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

          <View>
           {
           this.state.fontAvenirLoaded ? (<Text style={styles.clubs}>{this.props.clubName}</Text>) : null 
           }    
           </View>

        );
  }
}


const styles = StyleSheet.create({
  clubs: {
    color: 'black',
    backgroundColor: 'rgba(0,0,0,0)',
    fontFamily: 'Avenir',
    fontSize: 14,
    left:5,
    marginBottom: 12,
    alignItem:'center', 
    justifyContent: 'center',
  }
});

