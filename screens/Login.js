import React from 'react'
import { StyleSheet, View, Image, Alert } from 'react-native'
import { Button } from 'react-native-elements'
import { Facebook } from 'expo';


import Footer from '../constants/Footer'

export default class Login extends React.Component {

  _handleFacebookLogin = async () => {
    try {
      const { type, token } = await Facebook.logInWithReadPermissionsAsync(
        '1201211719949057', // Replace with your own app id in standalone app
        { permissions: ['public_profile'] }
      );

      switch (type) {
        case 'success': {
          // Get the user's name using Facebook's Graph API
          const response = await fetch(`https://graph.facebook.com/me?access_token=${token}`);
          const profile = await response.json();
          Alert.alert(
            'Logged in!',
            `Hi ${profile.name}!`,
          );
          break;
        }
        case 'cancel': {
          Alert.alert(
            'Connexion annulée!',
          );
          break;
        }
        default: {
          Alert.alert(
            'Oops!',
            'Login failed!',
          );
        }
      }
    } catch (e) {
      Alert.alert(
        'Oops!',
        'Login failed!',
      );
    }
  };


  render() {
    return (

    	<View style={{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}>

    	  <View style={{flex: 1}}>
          </View>

          <View style={{flex: 4}}>
            <Image source={require('../assets/icons/AppSpecific/Logo.imageset/logoBlack.png')}/>

            <Button
              title="Se connecter avec Facebook"
              onPress={this._handleFacebookLogin}
              backgroundColor="blue"
              borderRadius= '5'
              containerViewStyle={{width:300}} />


          </View>



          <View style={{flex: 3}}>
            <Footer />
          </View>

        </View>

    );
  }
}

const styles = StyleSheet.create({
  title: {
    color: 'black',
    backgroundColor: 'rgba(0,0,0,0)',
    fontFamily: 'Avenir',
    fontSize: 15,
    textAlign: 'center',
    top: 8,
  },
   subtitle: {
    color: 'white',
    backgroundColor: 'rgba(0,0,0,0)',
    fontFamily: 'Avenir',
    fontSize: 15,
    textAlign: 'center',
  },
  container: {
    backgroundColor: 'white',
    height: 60,
    marginRight: 0,
    marginLeft: 0,
  },
});
