import React, { Component } from 'react';
import { View, Image, Text, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { Font } from 'expo';
import { connect } from 'react-redux';

function mapStateToProps(store) {

  return { user: store.user, userClub: store.userClub, userPreferences: store.userPreferences, button: store.button }
};

function mapDispatchToProps(dispatch) {
  return {
        handleSubmit: function(value) { 
        dispatch( {type: 'user', value: value} ) 
    },
        handleSubmitClub: function(value) { 
        dispatch( {type: 'userClub', value: value} ) 
    },
        handleSubmitPreferences: function(value) { 
        dispatch( {type: 'userPreferences', value: value} ) 
    },
    handleSubmitButton: function(value) { 
        dispatch( {type: 'button', value: value} ) 
    }
  }
};

class HomeHeader extends Component {

	constructor() {
		super();
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

  navigationRoute(route, index) {
  this.props.handleSubmitButton({
    ChatButtonIndex:index,
    CommunityButtonIndex:this.props.button.CommunityButtonIndex,
    CalendarButtonIndex:this.props.button.CalendarButtonIndex,
    ProfileButtonIndex:this.props.button.ProfileButtonIndex
  })
  this.props.navigation.navigate(route);
};
  
  render() {

    return (

       
       <Image style={{flex:1, width:null, height:null, resizeMode: 'cover'}} source={require('../../assets/icons/AppSpecific/Header.imageset/header_bg.png')} >
       
       <View style={{
        flex:1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        top: 40,
        }}>

       		<TouchableWithoutFeedback style={{padding:30}} onPress={() => this.props.navigation.navigate('Menu')}>
          <Image source={require('../../assets/icons/Menu/Profile.imageset/icProfile.png')} /> 
          </TouchableWithoutFeedback>
       {
        this.state.fontLoaded ? (<Text style={styles.title}> TIE BREAK </Text> ) : null 
       }
       <TouchableWithoutFeedback style={{padding:30}} onPress={()=> this.navigationRoute('Chat',0)}>
       <Image source={require('../../assets/icons/Menu/Messages.imageset/icMessageBig.png')} />
       </TouchableWithoutFeedback>
       
       </View>
       
       </Image>
      
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps) (HomeHeader);

const styles = StyleSheet.create({
  title: {
    color: 'white',
    backgroundColor: 'rgba(0,0,0,0)',
    fontFamily: 'SevenOneEightUltra',
    fontSize: 15,
    top: 3,
    textAlign: 'center',
  },
});