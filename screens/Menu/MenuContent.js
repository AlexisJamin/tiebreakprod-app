import React, { Component } from 'react'
import { View, Image, Text, StyleSheet, TouchableWithoutFeedback } from 'react-native'
import { Font } from 'expo'
import { connect } from 'react-redux'

function mapStateToProps(store) {

  return { user: store.user, userClub: store.userClub, userPreferences: store.userPreferences }
}

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

  render() {

    if (this.props.user.picture!='')
           {
           profileImage = <Image style={{width: 90, height: 90, borderRadius: 45}} source={{uri: this.props.user.picture}}/>
           } else {
             profileImage = <Image style={{width: 90, height: 90, borderRadius: 45}} source={require('../../assets/icons/General/Placeholder.imageset/3639e848-bc9c-11e6-937b-fa2a206349a2.png')}/>
             }

    return (

    	<View style={{
    		    flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
    	}}>

    	  <View style={{flex: 10, top: -25}}>
          <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('Profile', {selectedIndex: 0})} >
          {profileImage}
          </TouchableWithoutFeedback>
        </View>
          
          <View style={{flex: 1, top: -10}}>
            {
        this.state.fontAvenirNextLoaded ? (<Text onPress={() => this.props.navigation.navigate('Profile', {selectedIndex: 0})} style={styles.title}> MON PROFIL </Text>) : null 
          }
          </View>

          <View style={{flex: 1, paddingTop: 20}}>
            <Image source={require('../../assets/icons/AppSpecific/BallYellow.imageset/combinedShapeCopy.png')} />
          </View>

           <View style={{flex: 1, paddingTop: 10}}>
            {
        this.state.fontAvenirLoaded ? (<Text style={styles.subtitle}> MON CALENDRIER </Text>) : null 
          }
          </View>

          <View style={{flex: 1, paddingTop: 20}}>
            <Image source={require('../../assets/icons/AppSpecific/BallYellow.imageset/combinedShapeCopy.png')} />
          </View>

           <View style={{flex: 1, paddingTop: 10}}>
            {
        this.state.fontAvenirLoaded ? (<Text onPress={() => this.props.navigation.navigate('Community', {selectedIndex: 1})} style={styles.subtitle}> MES AMIS </Text>) : null 
          }
          </View>

          <View style={{flex: 1, paddingTop: 20}}>
            <Image source={require('../../assets/icons/AppSpecific/BallYellow.imageset/combinedShapeCopy.png')} />
          </View>

           <View style={{flex: 1, paddingTop: 10}}>
            {
        this.state.fontAvenirLoaded ? (<Text style={styles.subtitle}> INVITER DES AMIS </Text>) : null 
          }
          </View>

          <View style={{flex: 1, paddingTop: 20}}>
            <Image source={require('../../assets/icons/AppSpecific/BallYellow.imageset/combinedShapeCopy.png')} />
          </View>

           <View style={{flex: 1, paddingTop: 10}}>
            {
        this.state.fontAvenirLoaded ? (<Text style={styles.subtitle}> À PROPOS </Text>) : null 
          }
          </View>

          <View style={{flex: 1, paddingTop: 20}}>
            <Image source={require('../../assets/icons/AppSpecific/BallYellow.imageset/combinedShapeCopy.png')} />
          </View>

           <View style={{flex: 1, paddingTop: 10}}>
            {
        this.state.fontAvenirLoaded ? (<Text style={styles.subtitle}> CONTACT </Text>) : null 
          }
          </View>
          
        </View>

    );
  }
}

export default connect(mapStateToProps, null) (MenuContent);

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

