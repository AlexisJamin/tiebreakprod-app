import React, { Component } from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import { Font } from 'expo'


export default class EditDispoContentHours extends React.Component {

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

    var hourList;
    if (this.props.hours.length>0) {
      hourList = (
        <View style={{flexDirection: 'row', alignItems:'center', marginBottom:5}}>
        <Text style={styles.button}>{this.props.hours}</Text>
        <View style={styles.delete}><Image style={{marginTop:8}} source={require('../../assets/icons/General/Delete.imageset/icDeletePaleGrey.png')}/></View>
        </View>)
    } else {
      hourList = <Text/>
    }

    return (
              <View>
              {hourList}
              </View>

        );
  }
}


const styles = StyleSheet.create({
  button: {
    width:36,
    height:28, 
    borderWidth:1, 
    borderColor:'rgb(42,129,82)', 
    paddingTop:5, 
    paddingBottom:5, 
    color: 'white', 
    backgroundColor: 'rgb(42,129,82)', 
    textAlign:'center'
  },
  delete: {
    width:28,
    height:28, 
    borderWidth:0.5, 
    borderColor:'grey', 
    marginRight: 10,
    marginLeft: 0.5,
    backgroundColor: 'white',
    alignItems:'center', 
  },
});

