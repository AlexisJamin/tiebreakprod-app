import React from 'react'
import { StyleSheet, View, Image, Alert, Text } from 'react-native'
import { Button, FormLabel, FormInput, FormValidationMessage } from 'react-native-elements'
import { Facebook } from 'expo'
import { Actions } from 'react-native-router-flux'
import { connect } from 'react-redux';



function mapDispatchToProps(dispatch) {
  return {
        user: function(value) { 
        dispatch( {type: 'user', value: value} ) 
    }
  }
}

import Footer from '../../constants/Footer'

import { Parse } from 'parse/react-native'
Parse.initialize("3E8CAAOTf6oi3NaL6z8oVVJ7wvtfKa");
Parse.serverURL = 'https://tiebreak.herokuapp.com/parse'

class Login extends React.Component {

constructor() {
    super();
    this.onLoginButtonPress = this.onLoginButtonPress.bind(this);
    this.state = {
      fontAvenirNextLoaded: false,
      fontAvenirLoaded: false,
      lastName:'',
      firstName:'',
      style:'',
      gender:'',
      currentLevel:'',
      highestLevel:'',
      clubs:'',
      availability:'',
      username:'',
      password:''
    };
  }

  async componentDidMount() {
   
   var User = Parse.Object.extend("User");
   var query = new Parse.Query(User);
   var MenuContent = this
   query.get("jdrulqlkX1", {
    success: function(users) {
      // The object was retrieved successfully.
      var lastName = users.get("lastName");
      var firstName = users.get("firstName");
      var style = users.get("style");
      var gender = users.get("gender");
      var currentLevel = users.get("currentLevel");
      var highestLevel = users.get("highestLevel");
      var availability = users.get("availability");
      
      MenuContent.setState({
        lastName:lastName,
        firstName:firstName,
        style:style,
        gender:gender,
        currentLevel:currentLevel,
        highestLevel:highestLevel,
        availability:availability,
      })

      var clubs = users.get("clubs");
      //console.log(clubs);
      //console.log(clubs[0].id);

      var clubList=[];

       var Club = Parse.Object.extend("Club");
       
       for (var i = 0; i < clubs.length; i++) {
       var queryClub = new Parse.Query(Club);
          //console.log(clubs[i].id);
          queryClub.get(clubs[i].id, {
            success: function(club) {
            // The object was retrieved successfully.
            var clubName = club.get("name");
            clubList.unshift(clubName);
            //console.log(clubName);
            //console.log(clubList);
            MenuContent.setState({
              clubs : clubList,
            })
          },
          error: function(object, error) {
            // The object was not retrieved successfully.
          }
        });
      }  
    },
     error: function(object, error) {
    // The object was not retrieved successfully.
    // error is a Parse.Error with an error code and message.
    }
   });
  }

  onLoginButtonPress(){
    this.props.user({
      lastName:this.state.lastName,
      firstName:this.state.firstName,
      style:this.state.style,
      gender:this.state.gender,
      currentLevel:this.state.currentLevel,
      highestLevel:this.state.highestLevel,
      clubs:this.state.clubs,
      availability:this.state.availability,
    });
    Actions.home();
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

      <View style={{flex:1, alignItems:'center'}}>

          <View style={{height:55}}/>

          <View style={{flex: 1, justifyContent:'center'}}>
            <Image source={require('../../assets/icons/AppSpecific/Logo.imageset/logoBlack.png')}/>
          </View>

          <View style={{flex: 1, justifyContent:'center'}}>

          <FormLabel>Email</FormLabel>
          <FormInput
          ref='forminput'
          textInputRef='username'
          returnKeyType='next'
          keyboardType='email-address' 
          onChangeText={(username) => this.setState({username})}
          value={this.state.username}
          inputStyle={{left:15}}
          containerStyle={{width:300, borderWidth:1, borderColor:'rgb(213,212,216)', overflow:'hidden', borderRadius:5}}/>
          <FormLabel>Mot de passe</FormLabel>
          <FormInput 
          ref='forminput'
          textInputRef='password'
          onChangeText={(password) => this.setState({password})}
          value={this.state.password}
          inputStyle={{left:15}}
          returnKeyType='done'
          containerStyle={{width:300, borderWidth:1, borderColor:'rgb(213,212,216)', overflow:'hidden', borderRadius:5}}/>
          <FormValidationMessage>Identifiant ou mot de passe incorrect</FormValidationMessage>


          </View>

          <View style={{flex: 1, justifyContent:'center'}}>
          
           <View style={{marginTop: 10}}>
            <Button
              title="Connexion"
              onPress={this.onLoginButtonPress}
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

export default connect(null, mapDispatchToProps) (Login);

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
