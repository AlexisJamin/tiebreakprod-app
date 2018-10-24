import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { Parse } from 'parse/react-native';
import { Font } from 'expo';

import Header from '../Header/Header';
import FeedContent from './FeedContent';

export default class Feed extends React.Component {

  constructor() {
    super();
    this.state = {
      fontAvenirLoaded: false
    };
  }

  async componentDidMount() {
      await Font.loadAsync({
      'Avenir': require('../../assets/fonts/Avenir.ttf'),
    });
      this.setState({fontAvenirLoaded:true})
  }

  render() {
    return (

    	<View style={{flex: 1, backgroundColor:'white'}} >

      <View style={{
        position:'absolute',
        width:'100%',
        height:'100%',
        flexDirection:'row', 
        alignItems:'flex-end',
      }}>

      <Image style={{
        flex:1,
        height:250}} 
        source={require('../../assets/icons/AppSpecific/Footer.imageset/group3.png')} /> 

      </View>
          
          <View style={{flex:0.17}}>
          <Header navigation={this.props.navigation} screenProps={{header:"newsFeed", back:false}} />
          </View>

          <View style={{height:40, marginTop:5, flexDirection: 'row', justifyContent:'center'}}>
          <Text style={{marginTop:20, fontFamily:'Avenir'}}> En partenariat avec : </Text>
          <Image source={require('../../assets/icons/TennisActu/Logo.png')} style={{height:40, width:80}} />
          </View>

          <View style={{flex:0.83}}>
          <FeedContent navigation={this.props.navigation}/>
          </View>

        </View>

    );
  }
}

