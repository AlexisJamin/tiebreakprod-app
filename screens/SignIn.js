import React from 'react'
import { StyleSheet, View, Image, Alert, Text } from 'react-native'
import { Button, FormLabel, FormInput, FormValidationMessage } from 'react-native-elements'
import { Facebook } from 'expo';


import Footer from '../constants/Footer'
import SignInButton from '../constants/SignInButton'

export default class SignIn extends React.Component {

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
      }}>


          <View style={{
           flexDirection: 'row',
           justifyContent: 'space-around',
           top: 60,
           }}>


           <Image source={require('../assets/icons/General/Back.imageset/icBackGrey.png')} /> 
           <Text style={{color: 'rgba(0,0,0,0)', backgroundColor:'rgba(0,0,0,0)'}}>H</Text> 
           <Text style={{color: 'rgba(0,0,0,0)', backgroundColor:'rgba(0,0,0,0)'}}>H</Text> 
       
           </View>

          <View style={{flex:1, alignItems:'center', top:-80}}>

          <View style={{flex: 1, justifyContent:'center', marginBottom:-30}}>
            <Image source={require('../assets/icons/General/AddPhoto.imageset/placeholderPic.png')}/>
          </View>

          <View style={{flex: 1, justifyContent:'center'}}>

            <View style={{left:5}}>
            <Button
              title="Remplir avec Facebook"
              onPressFacebookLogIn={this._handleFacebookLogin}
              backgroundColor="rgb(41,72,125)"
              borderRadius= '5'
              containerViewStyle={{width:300}} />
              </View>

          <FormLabel>Prénom</FormLabel>
          <FormInput onChangeText={'good'}
          containerStyle={{width:300, borderWidth:1, borderColor:'black', overflow:'hidden', borderRadius:5}}/>
          <FormLabel>Nom</FormLabel>
          <FormInput onChangeText={'good'}
          containerStyle={{width:300, borderWidth:1, borderColor:'black', overflow:'hidden', borderRadius:5}}/>
          <FormLabel>Email</FormLabel>
          <FormInput onChangeText={'good'}
          containerStyle={{width:300, borderWidth:1, borderColor:'black', overflow:'hidden', borderRadius:5}}/>
          <FormLabel>Mot de passe</FormLabel>
          <FormInput onChangeText={'good'}
          containerStyle={{width:300, borderWidth:1, borderColor:'black', overflow:'hidden', borderRadius:5}}/>
          <FormLabel>Confirmer le mot de passe</FormLabel>
          <FormInput onChangeText={'good'}
          containerStyle={{width:300, borderWidth:1, borderColor:'black', overflow:'hidden', borderRadius:5}}/>
          <FormValidationMessage>Merci de remplir tous les champs</FormValidationMessage>


          </View>

          </View>


          <View style={{
        flexDirection: 'column',
        justifyContent: 'center',
        backgroundColor: 'rgba(200,90,24,1)', 
        alignItems: 'center',
        height: 60,
         }}>
              <SignInButton/>
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
