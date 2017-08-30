import React, { Component } from 'react'
import { View, Image, Text, StyleSheet } from 'react-native'
import { Col, Row, Grid } from "react-native-easy-grid"
import { Font } from 'expo';


export default class CommunityHeader extends Component {

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

       <Image style={{flex:1, width:null, height:null, resizeMode: 'cover'}} source={require('../../assets/icons/AppSpecific/HeaderMin.imageset/header_bg.png')}>
       
         <View style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          top: 70,
        }}>

             <Image source={require('../../assets/icons/General/BackWhite.imageset/ic_back_white.png')} />
       
             {
        this.state.fontLoaded ? (<Text style={styles.title}> Communauté </Text> ) : null 
       }

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