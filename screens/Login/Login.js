import React from 'react'
import { StyleSheet, View, Image, Alert, Text, TextInput, TouchableOpacity, Keyboard, TouchableWithoutFeedback } from 'react-native'
import { Facebook } from 'expo'
import { Actions } from 'react-native-router-flux'
import { connect } from 'react-redux'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Parse } from 'parse/react-native'



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
                  userId:userId,
                })

                var clubs = users.get("clubs");
                var Club = Parse.Object.extend("Club");
                 
                 for (var i = 0; i < clubs.length; i++) {
                 var queryClub = new Parse.Query(Club);
                    queryClub.get(clubs[i].id, {
                      success: function(club) {
                      // The object was retrieved successfully.
                      var clubName = club.get("name");
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
        flex:1,
        backgroundColor:'white',
      }}>

      <View style={{
        position:'absolute',
        width:'100%',
        height:'100%',
        flexDirection:'row', 
        alignItems:'flex-end',
      }}>

    	<Image style={{
        flex:1,
        resizeMode: 'stretch'}} 
        source={require('../../assets/icons/AppSpecific/Footer.imageset/group3.png')} /> 

      </View>

      <KeyboardAwareScrollView style={{alignItems:'center', backgroundColor:'transparent'}}>

          <View style={{alignItems:'center', marginTop: 80, marginBottom: 40}}>
            <Image source={require('../../assets/icons/AppSpecific/Logo.imageset/logoBlack.png')}/>
          </View>

          <View style={{flex: 1, alignItems:'center'}}>

            <TextInput 
            ref='username'
            style={styles.input} 
            keyboardType="email-address"
            returnKeyType='next'
            autoCapitalize='none'
            autoCorrect='false'
            placeholder='Email'
            underlineColorAndroid='rgba(0,0,0,0)'
            onChangeText={(username) => this.setState({username})}
            value={this.state.username}
            blurOnSubmit={false}
            onSubmitEditing={(event) => {this.refs.password.focus();
            }}/>
            <TextInput 
            ref='password'
            style={styles.input} 
            keyboardType="default"
            returnKeyType='done'
            autoCapitalize='none'
            autoCorrect='false'
            placeholder='Mot de passe'
            underlineColorAndroid='rgba(0,0,0,0)'
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
            <TouchableWithoutFeedback onPress={this._onPressSignInButton}>
            <Text style={styles.buttonSignIn}>Créer un compte</Text>
            </TouchableWithoutFeedback>

          </View>


            </KeyboardAwareScrollView>


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
    borderColor:'rgb(213,212,216)', 
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
    borderColor:'rgb(213,212,216)', 
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
    borderColor:'rgb(213,212,216)', 
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
    alignItems: 'flex-start',
  },
   subtitle: {
    color: 'black',
    backgroundColor: 'rgba(0,0,0,0)',
    fontFamily: 'Avenir',
    fontSize: 11,
    top:5,
    marginBottom:10
  },
  container: {
    justifyContent:'center',
  },
});
