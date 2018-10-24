import React, { Component } from 'react';
import { View, Image, Text, StyleSheet, TouchableOpacity, Share, ScrollView, Alert } from 'react-native';
import { Font, WebBrowser, Amplitude } from 'expo';
import { NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import Modal from 'react-native-modalbox';
import { Parse } from 'parse/react-native';

import translate from '../../translate.js';

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
    this._onPressLogOut = this._onPressLogOut.bind(this);
    this._onPressConfirmLogOut = this._onPressConfirmLogOut.bind(this);
		this.state = {
			fontAvenirNextLoaded: false,
			fontAvenirLoaded: false,
      store:null  
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

navigationCalendar(route, index) {
  this.props.handleSubmitButton({
    ChatButtonIndex:this.props.button.ChatButtonIndex,
    CommunityButtonIndex:this.props.button.CommunityButtonIndex,
    CalendarButtonIndex:index,
    ProfileButtonIndex:this.props.button.ProfileButtonIndex
  })
  Amplitude.logEvent("Calendar Button clicked");
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

_handleOpenCGU = () => {
    Amplitude.logEvent("CGU Button clicked");
    WebBrowser.openBrowserAsync('http://cgu-tie-break.strikingly.com/');
  }

 _onPressLogOut() {
      Amplitude.logEvent("LogOut Button clicked");
      Alert.alert(
        translate.confirmLogout[this.props.user.currentLocale],
        '',
        [
          {text: translate.no[this.props.user.currentLocale]},
          {text: translate.yes[this.props.user.currentLocale], onPress: () => this._onPressConfirmLogOut()},
        ],
        { cancelable: false }
      ) 
  }

  _onPressConfirmLogOut() {
    Amplitude.logEvent("Confirm LogOut Button clicked");
    var logout = this;
    console.log("1");
    Parse.User.logOut().then(function() {
      console.log("2");
      const resetAction = NavigationActions.reset({
        index: 0, 
        actions: [
        NavigationActions.navigate({ routeName: 'Login'})
        ]
      });
      console.log("3");
      logout.props.navigation.dispatch(resetAction);
      console.log("4");
    })
    
  }

_handleOpenWebsite = () => {
    WebBrowser.openBrowserAsync('https://www.decathlon.de/C-33067-tennis');
  };

/*_handleModal = () => {
  var edit = this;
  var user = Parse.User.current() || Parse.User.currentAsync();
  var userGeoPoint = user.get("geolocation");

  if (userGeoPoint != undefined) {

    Parse.Cloud.run('storeList').then(function(storeList) {
      console.log('storeList');
      console.log(storeList.length);

      console.log("storeList[0].address");
      console.log(storeList[0].address);
      console.log("storeList[0].address.gps");
      console.log(storeList[0].address.gps);

    for (var i = 0; i < storeList.length; i++) {
        if (storeList[i].address.gps != undefined) {
        var distance = Math.round(userGeoPoint.kilometersTo(storeList[i].address.gps));
        var distanceParam = {distance: distance};
        Object.assign(storeList[i], distanceParam);
        }
      }
      console.log('storeList distance');
      console.log(storeList[0]);

      var storeListReduced = storeList.reduce(function(accumulateur, store){
          if (accumulateur.distance < store.distance) {
            return accumulateur;
          } else {
            return store;
          }
      });

      console.log("storeListReduced");
      console.log(storeListReduced);
      edit.setState({store:storeListReduced})

    });
    this.refs.modal.open();

  } else {this.refs.modal.open()}
}*/

    _shareTieBreak = () => {

      let shareOptions = {
      message: "Rejoins-moi sur Tie Break pour faire un tennis ! (http://www.tie-break.fr)",
      title: "Tie Break",
      subject: "Application Tie Break" //  for email
    };

      Amplitude.logEvent("Share Tie Break Button clicked");
      Share.share(shareOptions);
    };

  render() {


    /*if (this.props.user.currentLocale=='de') {
      var decathlon = ( 
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <View style={{marginTop: 15}}>
            <TouchableOpacity onPress={this._handleModal}>
            <Image source={require('../../assets/icons/AppSpecific/BallYellow.imageset/combinedShapeCopy.png')} />
            </TouchableOpacity>
          </View>

           <View style={{marginTop: 10}}>
            {
        this.state.fontAvenirLoaded ? (
           <TouchableOpacity hitSlop={{top:30, left:50, bottom:30, right:50}} onPress={this._handleModal}>
          <Text style={styles.subtitle}>{translate.buyEquipment[this.props.user.currentLocale].toUpperCase()}</Text>
          </TouchableOpacity>) : null 
          }
          </View>
          </View>);
    } else {
      var decathlon = null;
    }*/

    return (

      
        <View style={{flex:1, marginTop:80}}>
        
        <ScrollView >

        <View style={{
            justifyContent: 'center',
            alignItems: 'center'
        }}>

          <View style={{marginTop: 15}}>
            <TouchableOpacity onPress={()=> this.navigationCalendar('Calendar',0)} >
            <Image source={require('../../assets/icons/AppSpecific/BallYellow.imageset/combinedShapeCopy.png')} />
            </TouchableOpacity>
          </View>

           <View style={{marginTop: 10}}>
            {
        this.state.fontAvenirLoaded ? (
          <TouchableOpacity hitSlop={{top:30, left:50, bottom:30, right:50}} onPress={()=> this.navigationCalendar('Calendar',0)} >
          <Text style={styles.subtitle}>{translate.myCalendar[this.props.user.currentLocale].toUpperCase()}</Text>
          </TouchableOpacity>
          ) : null 
          }
          </View>

          <View style={{marginTop: 15}}>
            <TouchableOpacity onPress={this._shareTieBreak}>
            <Image source={require('../../assets/icons/AppSpecific/BallYellow.imageset/combinedShapeCopy.png')} />
            </TouchableOpacity>
          </View>

           <View style={{marginTop: 10}}>
            {
        this.state.fontAvenirLoaded ? (
          <TouchableOpacity hitSlop={{top:30, left:50, bottom:30, right:50}} onPress={this._shareTieBreak}>
          <Text style={styles.subtitle}>{translate.inviteFriends[this.props.user.currentLocale].toUpperCase()}</Text>
          </TouchableOpacity>) : null 
          }
          </View>

          <View style={{marginTop: 15}}>
            <TouchableOpacity onPress={this._handleOpenCGU}>
            <Image source={require('../../assets/icons/AppSpecific/BallYellow.imageset/combinedShapeCopy.png')} />
            </TouchableOpacity>
          </View>

           <View style={{marginTop: 10}}>
            {
        this.state.fontAvenirLoaded ? (
           <TouchableOpacity hitSlop={{top:30, left:50, bottom:30, right:50}} onPress={this._handleOpenCGU}>
          <Text style={styles.subtitle}>{translate.ugc[this.props.user.currentLocale].toUpperCase()}</Text>
          </TouchableOpacity>) : null 
          }
          </View>

          <View style={{marginTop: 15}}>
            <TouchableOpacity onPress={this._onPressLogOut}>
            <Image source={require('../../assets/icons/AppSpecific/BallYellow.imageset/combinedShapeCopy.png')} />
            </TouchableOpacity>
          </View>

           <View style={{marginTop: 10}}>
            {
        this.state.fontAvenirLoaded ? (
           <TouchableOpacity hitSlop={{top:30, left:50, bottom:30, right:50}} onPress={this._onPressLogOut}>
          <Text style={styles.subtitle}>{translate.logout[this.props.user.currentLocale].toUpperCase()}</Text>
          </TouchableOpacity>) : null 
          }
          </View>

           </View>

           </ScrollView>


        <Modal style={[styles.modal]} position={"bottom"} ref={"modal"}>
          <View style={{borderBottomWidth:1, borderColor:'rgb(213,212,216)', width:"100%", paddingBottom: 20, justifyContent:'center', alignItem:'center', flexDirection:'row'}}>
          <Image source={require('../../assets/icons/Decathlon/Logo_DECATHLON.png')} />
          </View>

          <TouchableOpacity 
            style={{borderBottomWidth:1, borderColor:'rgb(213,212,216)', width:"100%", paddingBottom: 20}}
            hitSlop={{top:10, left:50, bottom:10, right:50}}>
            <View>
              <Text style={styles.modalText}>{translate.closestShop[this.props.user.currentLocale]} ({this.state.store && this.state.store.distance} km) : </Text>
              <Text style={styles.modalText}> Décathlon {this.state.store && this.state.store.name}, </Text>
              <Text style={styles.modalText}>{this.state.store && this.state.store.address.line1}, {this.state.store && this.state.store.address.line2}, {this.state.store && this.state.store.address.postalCode} {this.state.store && this.state.store.address.city}</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={this._handleOpenWebsite} 
            style={{borderBottomWidth:1, borderColor:'rgb(213,212,216)', width:"100%", paddingBottom: 13}}
            hitSlop={{top:10, left:50, bottom:10, right:50}}>
            <View>
              <Text style={styles.modalText}>{translate.website[this.props.user.currentLocale]}</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity 
            hitSlop={{top:10, left:50, bottom:10, right:50}}
            onPress={() => this.refs.modal.close()}>
            <Text style={styles.modalCancel}>{translate.cancel[this.props.user.currentLocale]}</Text>
          </TouchableOpacity>
        </Modal>

  
          
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
  modal: {
    justifyContent: 'space-around',
    height: 280,
    borderWidth:1, 
    borderRadius:15,
    width: "95%",
    borderColor:'rgb(213,212,216)',
    bottom:12
  },
  modalCancel: {
    ccolor: "black",
    fontSize: 16,
    width:"100%",
    textAlign:'center',
  },
  modalText: {
    color: "black",
    fontSize: 14,
    width:"100%",
    textAlign:'center',
    paddingBottom:3
  }
});

