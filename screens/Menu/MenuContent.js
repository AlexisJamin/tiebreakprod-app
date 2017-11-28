import React, { Component } from 'react';
import { View, Image, Text, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { Font } from 'expo';
import { connect } from 'react-redux';

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

function mapStateToProps(store) {

  return { user: store.user, userClub: store.userClub, userPreferences: store.userPreferences, button: store.button }
};

class MenuContent extends React.Component {

constructor(props) {
		super(props);
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

navigationProfile(route, index) {
  this.props.handleSubmitButton({
    ChatButtonIndex:this.props.button.ChatButtonIndex,
    CommunityButtonIndex:this.props.button.CommunityButtonIndex,
    CalendarButtonIndex:this.props.button.CalendarButtonIndex,
    ProfileButtonIndex:index
  })
  this.props.navigation.navigate(route);
};

navigationCalendar(route, index) {
  this.props.handleSubmitButton({
    ChatButtonIndex:this.props.button.ChatButtonIndex,
    CommunityButtonIndex:this.props.button.CommunityButtonIndex,
    CalendarButtonIndex:index,
    ProfileButtonIndex:this.props.button.ProfileButtonIndex
  })
  this.props.navigation.navigate(route);
};

navigationCommunity(route, index) {
  this.props.handleSubmitButton({
    ChatButtonIndex:this.props.button.ChatButtonIndex,
    CommunityButtonIndex:index,
    CalendarButtonIndex:this.props.button.CalendarButtonIndex,
    ProfileButtonIndex:this.props.button.ProfileButtonIndex
  })
  this.props.navigation.navigate(route);
};

  render() {

    if (this.props.user.picture!='')
           {
           var profileImage = <Image style={{width: 90, height: 90, borderRadius: 45}} source={{uri: this.props.user.picture}}/>
           } else {
             var profileImage = <Image style={{width: 90, height: 90, borderRadius: 45}} source={require('../../assets/icons/General/Placeholder.imageset/3639e848-bc9c-11e6-937b-fa2a206349a2.png')}/>
             }

    return (

    	<View style={{
    		    flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            marginTop:-30
    	}}>

    	  <View>
          <TouchableWithoutFeedback onPress={()=> this.navigationProfile('Profile',0)} >
          {profileImage}
          </TouchableWithoutFeedback>
        </View>
          
          <View style={{paddingTop: 20}}>
            {
        this.state.fontAvenirNextLoaded ? (
          <TouchableWithoutFeedback onPress={()=> this.navigationProfile('Profile',0)}>
          <Text style={{padding:30}} style={styles.title}> MON PROFIL </Text>
          </TouchableWithoutFeedback>) : null 
          }
          </View>

          <View style={{paddingTop: 15}}>
            <Image source={require('../../assets/icons/AppSpecific/BallYellow.imageset/combinedShapeCopy.png')} />
          </View>

           <View style={{paddingTop: 10}}>
            {
        this.state.fontAvenirLoaded ? (
          <TouchableWithoutFeedback style={{padding:30}} onPress={()=> this.navigationCalendar('Calendar',0)} >
          <Text style={styles.subtitle}> MON CALENDRIER </Text>
          </TouchableWithoutFeedback>
          ) : null 
          }
          </View>

          <View style={{paddingTop: 15}}>
            <Image source={require('../../assets/icons/AppSpecific/BallYellow.imageset/combinedShapeCopy.png')} />
          </View>

           <View style={{paddingTop: 10}}>
            {
        this.state.fontAvenirLoaded ? (
          <TouchableWithoutFeedback style={{padding:30}} onPress={()=> this.navigationCommunity('Community',1)}>
          <Text style={styles.subtitle}> MES AMIS </Text>
          </TouchableWithoutFeedback>) : null 
          }
          </View>

          <View style={{paddingTop: 15}}>
            <Image source={require('../../assets/icons/AppSpecific/BallYellow.imageset/combinedShapeCopy.png')} />
          </View>

           <View style={{paddingTop: 10}}>
            {
        this.state.fontAvenirLoaded ? (<Text style={styles.subtitle}> INVITER DES AMIS </Text>) : null 
          }
          </View>

          <View style={{paddingTop: 15}}>
            <Image source={require('../../assets/icons/AppSpecific/BallYellow.imageset/combinedShapeCopy.png')} />
          </View>

           <View style={{paddingTop: 10}}>
            {
        this.state.fontAvenirLoaded ? (<Text style={styles.subtitle}> À PROPOS </Text>) : null 
          }
          </View>

          <View style={{paddingTop: 15}}>
            <Image source={require('../../assets/icons/AppSpecific/BallYellow.imageset/combinedShapeCopy.png')} />
          </View>

           <View style={{paddingTop: 10}}>
            {
        this.state.fontAvenirLoaded ? (<Text style={styles.subtitle}> CONTACT </Text>) : null 
          }
          </View>
          
        </View>

    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps) (MenuContent);

const styles = StyleSheet.create({
  title: {
    color: 'black',
    backgroundColor: 'rgba(0,0,0,0)',
    fontFamily: 'AvenirNext',
    fontSize: 13,
    paddingTop: 2,
    alignItem:'center', 
    justifyContent: 'center',
  },
  subtitle: {
    color: 'black',
    backgroundColor: 'rgba(0,0,0,0)',
    fontFamily: 'Avenir',
    fontSize: 12,
    fontWeight:'800',
    paddingTop: 2,
    alignItem:'center', 
    justifyContent: 'center',
  },
});

