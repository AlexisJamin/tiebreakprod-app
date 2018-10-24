import React, { Component } from 'react';
import { View, Image, Text, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { Font, Amplitude } from 'expo';
import { connect } from 'react-redux';

import translate from '../../translate.js';

function mapStateToProps(store) {
  return { user: store.user }
};


class ProfileHeader extends Component {

  constructor(props) {
    super(props);
    this.state = {fontLoaded: false};
  }

  async componentDidMount() {
    await Font.loadAsync({
      'Avenir': require('../../assets/fonts/Avenir.ttf'),
    });
    this.setState({ fontLoaded: true });
  }

  _onPress = () => {
    Amplitude.logEvent("Header Back Button clicked");
    this.props.navigation.goBack();
  };
  
  render() {

    return (

        <ImageBackground 
          style={{flex:1}} 
          source={require('../../assets/icons/AppSpecific/HeaderMin.imageset/header_bg.png')}>
        
        <View style={{
          flexDirection:'row',
          justifyContent:'space-around',
          marginTop:40,
        }}>

          {
          this.props.screenProps.back ? (
            <TouchableOpacity hitSlop={{top:40, left:40, bottom:10, right:40}} onPress={this._onPress}>
             <Entypo name="chevron-left" size={25} color='white' style={{marginBottom:4}} />
             </TouchableOpacity>
          ) 
          : <Text style={{color: 'rgba(0,0,0,0)', backgroundColor:'rgba(0,0,0,0)'}}>H</Text>  
         }

         {
          this.props.screenProps.chat ? (
             <Text style={styles.title}>{this.props.screenProps.header}</Text> 
          ) 
          :  <Text style={styles.title}>{translate[this.props.screenProps.header][this.props.user.currentLocale]}</Text> 
         }

             <Text style={{color: 'rgba(0,0,0,0)', backgroundColor:'rgba(0,0,0,0)'}}>H</Text> 

         </View>
        </ImageBackground>
    
    );
  }
}

export default connect(mapStateToProps, null) (ProfileHeader);

const styles = StyleSheet.create({
  title: {
    color: 'white',
    backgroundColor: 'rgba(0,0,0,0)',
    fontFamily: 'Avenir',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    top: -3,
  },
});