import React from 'react'
import { StyleSheet, View, Image, Alert, Text } from 'react-native'
import { Button, FormLabel, FormInput, FormValidationMessage } from 'react-native-elements'
import { Facebook } from 'expo'
import { Actions } from 'react-native-router-flux'


import Footer from '../constants/Footer'
import HomeHeader from '../constants/HomeHeader'

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
        backgroundColor:'white'
      }}>

      <View style={{flex:1, alignItems:'center'}}>

          <View style={{height:55}}/>

          <View style={{flex: 1, justifyContent:'center'}}>
            <Image source={require('../assets/icons/AppSpecific/Logo.imageset/logoBlack.png')}/>
          </View>

          <View style={{flex: 1, justifyContent:'center'}}>

          <FormLabel>Email</FormLabel>
          <FormInput onChangeText={'good'}
          containerStyle={{width:300, borderWidth:1, borderColor:'black', overflow:'hidden', borderRadius:5}}/>
          <FormLabel>Mot de passe</FormLabel>
          <FormInput onChangeText={'good'}
          containerStyle={{width:300, borderWidth:1, borderColor:'black', overflow:'hidden', borderRadius:5}}/>
          <FormValidationMessage>Identifiant ou mot de passe incorrect</FormValidationMessage>


          </View>

          <View style={{flex: 1, justifyContent:'center'}}>
          
           <View style={{marginTop: 10}}>
            <Button
              title="Connexion"
              onPress={Actions.home}
              backgroundColor="rgb(200,90,24)"
              borderRadius= '5'
              containerViewStyle={{width:300}} />
            </View>

            <View style={{marginTop: 10}}>
            <Button
              title="Se connecter avec Facebook"
              onPressFacebookLogIn={this._handleFacebookLogin}
              backgroundColor="rgb(41,72,125)"
              borderRadius= '5'
              containerViewStyle={{width:300}} />
              </View>

              <View style={{marginTop: 10}}>

              <Button
              title="Créer un compte"
              onPress={Actions.signIn}
              backgroundColor="white"
              containerViewStyle={{width:300, borderWidth:1, borderColor:'black', overflow:'hidden', borderRadius:5}}
              textStyle={{color:'black'}} />
              </View>

          </View>

          </View>


          <View style={{height:160}}>
            <Footer/>
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
