import React, { Component } from 'react';
import { View, Image, Text, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { Font } from 'expo';
import { connect } from 'react-redux';

function mapStateToProps(store) {
  return { user: store.user, userClub: store.userClub, userPreferences: store.userPreferences, button: store.button, viewProfile: store.viewProfile }
};

function mapDispatchToProps(dispatch) {
  return {
        handleSubmit: function(value) { 
        dispatch( {type: 'profileView', value: value} ) 
    }
  }
};

class ProfileViewHeader extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
      fontLoaded: false
    };
	}

	async componentDidMount() {
    await Font.loadAsync({
      'SevenOneEightUltra': require('../../assets/fonts/SevenOneEight-Ultra.ttf'),
    });
    this.setState({ fontLoaded: true });
  }
  
  render() {

    return (

       
       <Image style={{flex:1, width:null, height:null, resizeMode: 'cover'}} source={require('../../assets/icons/AppSpecific/Header.imageset/header_bg.png')} >
       
       <View style={{
        flex:1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        top: 40
        }}>

     		<TouchableWithoutFeedback style={{padding:30}} onPress={() => this.props.navigation.goBack()}>
        <Image source={require('../../assets/icons/General/BackWhite.imageset/ic_back_white.png')} />
        </TouchableWithoutFeedback>

       <Text style={{color: 'rgba(0,0,0,0)', backgroundColor:'rgba(0,0,0,0)'}}>H</Text> 
       
       <TouchableWithoutFeedback style={{padding:30}}>
       <Image source={require('../../assets/icons/General/AddFriend.imageset/icAddFriend.png')} />
       </TouchableWithoutFeedback>
       
       </View>
       
       </Image>
      
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps) (ProfileViewHeader);

const styles = StyleSheet.create({
  title: {
    color: 'white',
    backgroundColor: 'rgba(0,0,0,0)',
    fontFamily: 'SevenOneEightUltra',
    fontSize: 15,
    top: 3,
    textAlign:'center'
  }
});