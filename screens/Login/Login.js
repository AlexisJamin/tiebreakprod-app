import React from 'react'
import { StyleSheet, View, Image, Alert, Text, TextInput, TouchableOpacity, Keyboard } from 'react-native'
import { Facebook } from 'expo'
import { Actions } from 'react-native-router-flux'
import { connect } from 'react-redux'



function mapDispatchToProps(dispatch) {
  return {
        user: function(value) { 
        dispatch( {type: 'user', value: value} ) 
    },
    userClub: function(value) { 
        dispatch( {type: 'userClub', value: value} ) 
    }
  }
}

import Footer from '../../constants/Footer'

import { Parse } from 'parse/react-native'
Parse.initialize("3E8CAAOTf6oi3NaL6z8oVVJ7wvtfKa");
Parse.serverURL = 'https://tiebreak.herokuapp.com/parse'

class Login extends React.Component {

constructor(props) {
    super(props);
    this._onPressLogInButton = this._onPressLogInButton.bind(this);
    this.state = {
      fontAvenirNextLoaded: false,
      fontAvenirLoaded: false
    };
  }
    
    _onPressLogInButton(){

    console.log("Submit ok");
    console.log(this.state.username);
    console.log(this.state.password);

   var user = new Parse.User();
   var login = this;

   Parse.User.logIn(this.state.username, this.state.password, {
   success: function(user) {
    console.log("Trouvé !");
    var userId = user.id;
    // Do stuff after successful login.
           var User = Parse.Object.extend("User");
           var query = new Parse.Query(User);
           
           query.get(userId, {
            success: function(users) {
                // The object was retrieved successfully.
                var lastName = users.get("lastName");
                var firstName = users.get("firstName");
                var style = users.get("style");
                var gender = users.get("gender");
                var currentLevel = users.get("currentLevel");
                var highestLevel = users.get("highestLevel");
                var availability = users.get("availability");
                
                login.props.user({
                  lastName:lastName,
                  firstName:firstName,
                  style:style,
                  gender:gender,
                  currentLevel:currentLevel,
                  highestLevel:highestLevel,
                  availability:availability,
                })

                var clubs = users.get("clubs");
                console.log(clubs);
                var Club = Parse.Object.extend("Club");
                 
                 for (var i = 0; i < clubs.length; i++) {
                 var queryClub = new Parse.Query(Club);
                    console.log(clubs[i].id);
                    queryClub.get(clubs[i].id, {
                      success: function(club) {
                      // The object was retrieved successfully.
                      var clubName = club.get("name");
                      console.log(clubName);
                      login.props.userClub(clubName)
                    },
                    error: function(object, error) {
                      // The object was not retrieved successfully.
                    }
                  });
                }  
              },
           error: function(object, error) {
              // The object was not retrieved successfully.
          }
         }); 
    Actions.home();
   },
   error: function(user, error) {
    console.log("pas trouvé")
    Alert.alert("Identifiant et/ou mot de passe invalide(s)");
    // The login failed. Check error to see why.
   }
   });
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

  _onPressSignInButton() {
    Parse.User.logOut().then(() => {
    var currentUser = Parse.User.current();  // this will now be null
    });
    Actions.signIn();
  }


  render() {
    return (

    	<View style={{
        flex: 1,
        backgroundColor:'white'
      }}>

      <View style={{flex:0.1}}/>

      <View style={{flex:5, alignItems:'center'}}>

          <View style={{flex: 1, justifyContent:'center'}}>
            <Image source={require('../../assets/icons/AppSpecific/Logo.imageset/logoBlack.png')}/>
          </View>

          <View style={{flex: 3, justifyContent:'center'}}>

            <Text style={styles.title}>Email</Text>
            <TextInput 
            ref='username'
            style={styles.input} 
            keyboardType="email-address"
            returnKeyType='next'
            autoCapitalize='none'
            autoCorrect='false'
            onChangeText={(username) => this.setState({username})}
            value={this.state.username}
            blurOnSubmit={false}
            onSubmitEditing={(event) => {this.refs.password.focus();
            }}
            />
            <Text style={styles.title}>Mot de passe</Text>
            <TextInput 
            ref='password'
            style={styles.input} 
            keyboardType="default"
            returnKeyType='done'
            autoCapitalize='none'
            autoCorrect='false'
            secureTextEntry='true'
            onChangeText={(password) => this.setState({password})}
            value={this.state.password}
            onSubmitEditing={Keyboard.dismiss}
            />
            <Text style={styles.subtitle}>Mot de passe oublié?</Text>
            <TouchableOpacity onPress={this._onPressLogInButton}>
            <Text style={styles.buttonLogIn}>Connexion</Text>
            </TouchableOpacity>
            <TouchableOpacity>
            <Text style={styles.buttonFacebook}>Se connecter avec Facebook</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={this._onPressSignInButton}>
            <Text style={styles.buttonSignIn}>Créer un compte</Text>
            </TouchableOpacity>



          </View>

          </View>


          <View style={{height:160}}>
            <Footer/>
          </View>

        </View>

    );
  }
}

export default connect(null, mapDispatchToProps) (Login);

const styles = StyleSheet.create({
  buttonLogIn: {
    backgroundColor: 'rgb(200,90,24)',
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
  buttonSignIn: {
    backgroundColor: 'white',
    color: 'black',
    fontSize: 16,
    width: 300,
    lineHeight: 30,
    marginTop: 10,
    textAlign: 'center',
    borderWidth:1,
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