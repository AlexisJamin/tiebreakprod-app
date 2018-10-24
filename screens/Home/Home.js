import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Platform, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import { Notifications, Permissions } from 'expo';
import { Parse } from 'parse/react-native';

import Header from '../Header/Header';
import HomeContent from './HomeContent';

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
  return { user: store.user, userClub: store.userClub, userPreferences: store.userPreferences, button: store.button, window:store.window }
};

class Home extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      renderAllContent: false
    }
  }

  async registerForPushNotificationsAsync() {
    const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);

    let finalStatus = existingStatus;

    // only ask if permissions have not already been determined, because
    // iOS won't necessarily prompt the user a second time.
    if (existingStatus !== 'granted') {
      // Android remote notification permissions are granted during the app
      // install, so this will only ask on iOS
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
    }

    // Stop here if the user did not grant permissions
    if (finalStatus !== 'granted') {
      return;
    }

    // Get the token that uniquely identifies this device
    let token = await Notifications.getExpoPushTokenAsync();

    var user = Parse.User.current() || Parse.User.currentAsync();
    user.set("expoPushToken", token);
    user.save();
  }

  async componentDidMount() {

    this.registerForPushNotificationsAsync();

    setTimeout(() => {
        this.setState({renderAllContent: true});
      }, 100);
  }

  render() {

    if (!this.state.renderAllContent) {
      return (

       <View style={{
          flex: 1, 
          backgroundColor:'white'
        }}>

          <View style={{
            position:'absolute',
            width:'100%',
            height:'100%',
            flexDirection:'row', 
            alignItems:'flex-end'
          }}>

          <Image style={{
            flex:1,
            height:250}} 
            source={require('../../assets/icons/AppSpecific/Footer.imageset/group3.png')}/> 

          </View>

   
          <View style={{height:105}}>
          <Header navigation={this.props.navigation} screenProps={{header:"playTennis", back:false}} />
          </View>
         

        </View>);

    } else {

        return (

        <View style={{
          flex: 1, 
          backgroundColor:'white'
        }}>

          <View style={{
            position:'absolute',
            width:'100%',
            height:'100%',
            flexDirection:'row', 
            alignItems:'flex-end'
          }}>

          <Image style={{
            flex:1,
            height:250}} 
            source={require('../../assets/icons/AppSpecific/Footer.imageset/group3.png')}/> 

          </View>

   
          <View style={{flex:0.17, marginBottom:40}}>
          <Header navigation={this.props.navigation} screenProps={{header:"playTennis", back:false}} />
          </View>

          <View style={{flex:0.83}}>
          <HomeContent navigation={this.props.navigation} />
          </View>

        </View>

      );

    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps) (Home);

const styles = StyleSheet.create({
  buttonLogIn: {
    backgroundColor:'rgba(0,0,0,0.2)',
    color: 'white',
    fontSize: 18,
    lineHeight: 30,
    textAlign: 'center',
    overflow:'hidden', 
    paddingTop:15,
    paddingBottom:15 
  }
});

