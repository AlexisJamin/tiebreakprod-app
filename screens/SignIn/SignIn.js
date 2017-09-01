import React from 'react'
import { StyleSheet, View, Image, Alert, Text, TextInput, TouchableOpacity, Keyboard, TouchableWithoutFeedback, KeyboardAvoidingView } from 'react-native'
import { Facebook } from 'expo'
import { Actions } from 'react-native-router-flux'
import { connect } from 'react-redux'

import { Parse } from 'parse/react-native'
Parse.initialize("3E8CAAOTf6oi3NaL6z8oVVJ7wvtfKa");
Parse.serverURL = 'https://tiebreak.herokuapp.com/parse'

function mapDispatchToProps(dispatch) {
  return {
        user: function(value) { 
        dispatch( {type: 'user', value: value} ) 
    }
  }
}

class SignIn extends React.Component {

  constructor(props) {
    super(props);
    this._onPressSignInButton = this._onPressSignInButton.bind(this);
    this.state = {
      fontAvenirNextLoaded: false,
      fontAvenirLoaded: false,
      firstName:'',
      lastName:'',
      username:'',
      password:'',
      confirmPassword:''
    };
  }

  _onPressSignInButton() {
    
    var signin= this;
    var user = new Parse.User();
      
    function validateEmail(email) 
      {
          var re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          return re.test(email);
      }
      // Verify if all inputs are completed & two passwords are equals and email is good format

      var emailFormatisFalse=true;

      if (this.state.firstName.length>0 && 
        this.state.lastName.length>0 && 
        this.state.username.length>0 && 
        this.state.password.length>0 && 
        this.state.confirmPassword.length>0
        ) {
        if (this.state.password===this.state.confirmPassword && validateEmail(this.state.username)) 
        { 
          emailFormatisFalse=false;
          console.log("ok");
          user.set("username", this.state.username);
          user.set("password", this.state.password);
          user.set("firstName", this.state.firstName);
          user.set("lastName", this.state.lastName);
          user.set("email", this.state.username);
          
          user.signUp(null, {
            success: function(user) {              
              // Hooray! Let them use the app now.
              console.log("signUp ok");
              
              signin.props.user({
                lastName:this.state.lastName,
                firstName:this.state.firstName,
              })
              
              Actions.home();
            },
            error: function(user, error) {
              // Show the error message somewhere and let the user try again.
              alert("Erreur: " + error.code + " " + error.message);
            }
          });
        }
         else if (this.state.password!=this.state.confirmPassword) {
           Alert.alert('Veuillez confirmer votre mot de passe');
        }
        else if (emailFormatisFalse) {
          Alert.alert("Format de l'email invalide");
        }
          
       } else {
        Alert.alert('Veuillez compléter tous les champs');
        }
      }

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

          <KeyboardAvoidingView behavior="padding" style={{flex: 1}}>

          <View style={{
           flexDirection: 'row',
           justifyContent: 'space-around',
           top: 60,
           }}>


           <TouchableWithoutFeedback onPress={Actions.logIn}>
           <Image source={require('../../assets/icons/General/Back.imageset/icBackGrey.png')} />
          </TouchableWithoutFeedback> 

           <Image source={require('../../assets/icons/General/AddPhoto.imageset/placeholderPic.png')}/>
           <Text style={{color: 'rgba(0,0,0,0)', backgroundColor:'rgba(0,0,0,0)'}}>H</Text> 
       
           </View>

          <View style={{flex:1, alignItems:'center'}}>

          <View style={{flex: 1, justifyContent:'center'}}>
            
            <TouchableOpacity>
            <Text style={styles.buttonFacebook}>Remplir avec Facebook</Text>
            </TouchableOpacity>

          <TextInput 
            ref='firsName'
            style={styles.input} 
            keyboardType="default"
            returnKeyType='next'
            autoCorrect='false'
            placeholder='Prénom'
            onChangeText={(firstName) => this.setState({firstName})}
            blurOnSubmit={false}
            onSubmitEditing={(event) => {this.refs.lastName.focus();
            }}
            />
          <TextInput 
            ref='lastName'
            style={styles.input} 
            keyboardType="default"
            returnKeyType='next'
            autoCorrect='false'
            placeholder='Nom'
            onChangeText={(lastName) => this.setState({lastName})}
            blurOnSubmit={false}
            onSubmitEditing={(event) => {this.refs.username.focus();
            }}
            />
          <TextInput 
            ref='username'
            style={styles.input} 
            keyboardType="email-address"
            returnKeyType='next'
            autoCapitalize='none'
            autoCorrect='false'
            placeholder='Email'
            onChangeText={(username) => this.setState({username})}
            blurOnSubmit={false}
            onSubmitEditing={(event) => {this.refs.password.focus();
            }}
            />
          <TextInput 
            ref='password'
            style={styles.input} 
            keyboardType="default"
            returnKeyType='next'
            autoCapitalize='none'
            autoCorrect='false'
            secureTextEntry='true'
            placeholder='Mot de passe'
            onChangeText={(password) => this.setState({password})}
            blurOnSubmit={false}
            onSubmitEditing={(event) => {this.refs.confirmPassword.focus();
            }}
            />
          <TextInput 
            ref='confirmPassword'
            style={styles.input} 
            keyboardType="default"
            returnKeyType='done'
            autoCapitalize='none'
            autoCorrect='false'
            secureTextEntry='true'
            placeholder='Confirmer mot de passe'
            onChangeText={(confirmPassword) => this.setState({confirmPassword})}
            onSubmitEditing={Keyboard.dismiss}
            />


          </View>

          </View>

        </KeyboardAvoidingView>
          
          <View style={{
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'stretch',
         }}>
            <TouchableOpacity onPress={this._onPressSignInButton}>
            <Text style={styles.buttonLogIn}>Créer un compte</Text>
            </TouchableOpacity>
        </View>

        </View>

    );
  }
}

export default connect(null, mapDispatchToProps) (SignIn);

const styles = StyleSheet.create({
  buttonLogIn: {
    backgroundColor: 'rgb(200,90,24)',
    color: 'white',
    fontSize: 18,
    lineHeight: 30,
    textAlign: 'center',
    overflow:'hidden', 
    paddingTop:15,
    paddingBottom:15 
  },
  buttonFacebook: {
    backgroundColor: 'rgb(41,72,125)',
    color: 'white',
    fontSize: 16,
    width: 300,
    lineHeight: 30,
    marginTop: 10,
    textAlign: 'center',
    borderWidth:1,
    borderColor:'white',
    overflow:'hidden', 
    borderRadius:5,
    paddingTop:8,
    paddingBottom:8  
  },
  input: {
    width:300,
    height:40, 
    borderWidth:1, 
    borderColor:'rgb(213,212,216)', 
    overflow:'hidden', 
    borderRadius:5,
    marginTop:20, 
  },
  title: {
    color: 'black',
    backgroundColor: 'rgba(0,0,0,0)',
    fontFamily: 'Avenir',
    fontSize: 15,
  },
   subtitle: {
    color: 'black',
    backgroundColor: 'rgba(0,0,0,0)',
    fontFamily: 'Avenir',
    fontSize: 11,
    left: 20,
    top:5,
    marginBottom:10
  },
  container: {
    justifyContent:'center',
  },
});
