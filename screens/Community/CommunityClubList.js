import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Font } from 'expo';


export default class CommunityClubList extends React.Component {

constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
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

  handleClick() {
    this.props.handleClick(this.props.clubList.id);
  }


  render() {
    return (

              <Text style={(this.props.checked && styles.buttonChecked) || styles.button} onPress={this.handleClick}>{this.props.clubList.clubName}</Text>

        );
  }
}


const styles = StyleSheet.create({
  button: {
    borderWidth:1,
    maxHeigth:20,
    borderColor:'grey', 
    borderRadius:3, 
    overflow:'hidden', 
    padding:6, 
    marginBottom:5,
    marginRight:5,
    marginLeft:5,  
    fontFamily: 'Avenir',
    fontSize:12,
    color:'black', 
    backgroundColor:'transparent', 
    textAlign:'center'
  },
  buttonChecked: {
    maxHeigth:20,
    borderWidth:1, 
    borderColor:'rgb(42,129,82)', 
    borderRadius:3, 
    overflow:'hidden', 
    padding:6, 
    marginBottom:5,
    marginRight:5,
    marginLeft:5,
    fontFamily: 'Avenir', 
    fontSize:12, 
    color:'white', 
    backgroundColor:'rgb(42,129,82)', 
    textAlign:'center'
  }
});



