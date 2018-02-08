import React from 'react';
import { StyleSheet, View, Image, Alert, Text, TextInput, TouchableOpacity, Keyboard, TouchableWithoutFeedback, Platform } from 'react-native';
import { Facebook, Font, Constants, Location, Permissions, IntentLauncherAndroid } from 'expo';
import { connect } from 'react-redux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Svg, { Line } from 'react-native-svg';
import { Parse } from 'parse/react-native';


function mapDispatchToProps(dispatch) {
  return {
        handleSubmit: function(value) { 
        dispatch( {type: 'user', value: value} ) 
    },
        handleSubmitClub: function(value) { 
        dispatch( {type: 'userClub', value: value} ) 
    },
        handleSubmitClub2: function(value) { 
        dispatch( {type: 'signIn', value: value} ) 
    },
        handleSubmitPreferences: function(value) { 
        dispatch( {type: 'userPreferences', value: value} ) 
    },
        handleSubmitButton: function(value) { 
        dispatch( {type: 'button', value: value} ) 
    }
  }
}

Parse.initialize("3E8CAAOTf6oi3NaL6z8oVVJ7wvtfKa");
Parse.serverURL = 'https://tiebreak.herokuapp.com/parse';

class Login extends React.Component {

constructor(props) {
    super(props);
    this._onPressLogInButton = this._onPressLogInButton.bind(this);
    this._onPressSignInButton = this._onPressSignInButton.bind(this);
    this._onPressFacebookLogin = this._onPressFacebookLogin.bind(this);
    this.state = {
      fontAvenirNextLoaded: false,
      fontAvenirLoaded: false,
      location:null
    };
  }

   async componentWillMount() {
     if (Platform.OS === 'android' && !Constants.isDevice) {
      Alert.alert('isDevice'); 
    } else {
      this._getLocationAsync();
      console.log('_getLocationAsync ok');
    }
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
    
    _onPressLogInButton() {

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
                var filterCondition = users.get("filterCondition");
                var filterAge = users.get("filterAge");
                var filterLevel = users.get("filterLevel");
                var filterGender = users.get("filterGender");
                var filterStyle = users.get("filterStyle");
                var filterFieldType = users.get("filterFieldType");
                if (users.get("picture") != undefined) {
                  var picture = users.get("picture").url();
                } else {
                  var picture = undefined;
                }
                var birthday = users.get("birthday");

                login.props.handleSubmit({
                  lastName:lastName,
                  firstName:firstName,
                  style:style,
                  gender:gender,
                  currentLevel:currentLevel,
                  highestLevel:highestLevel,
                  availability:availability,
                  userId:userId,
                  picture: picture,
                  birthday:birthday
                })

                login.props.handleSubmitPreferences({
                  filterCondition:filterCondition,
                  filterAge:filterAge,
                  filterLevel:filterLevel,
                  filterGender:filterGender,
                  filterStyle:filterStyle,
                  filterFieldType:filterFieldType
                })

                login.props.handleSubmitButton({
                  ChatButtonIndex:null,
                  CommunityButtonIndex:null,
                  CalendarButtonIndex:null,
                  ProfileButtonIndex:null
                })

                var clubs = users.get("clubs");
                var Club = Parse.Object.extend("Club");
                 
                 for (var i = 0; i < clubs.length; i++) {
                 var queryClub = new Parse.Query(Club);
                    queryClub.get(clubs[i].id, {
                      success: function(club) {
                      // The object was retrieved successfully.
                      var clubName = club.get("name");
                      login.props.handleSubmitClub({id:club.id, name:clubName})
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
           console.log('ET wants to go home');

    login.props.navigation.navigate("Swiper");
   },
   error: function(user, error) {
    console.log("pas trouvé")
    Alert.alert("Identifiant et/ou mot de passe invalide(s)");
    // The login failed. Check error to see why.
   }
   });
  };
  
  _handleFacebookLogin = async () => {
    var login = this;
    try {
      const { type, token, expires } = await Facebook.logInWithReadPermissionsAsync(
        '1201211719949057', // Replace with your own app id in standalone app
        { permissions: ['public_profile', 'user_friends', 'email'] }
      );
      var expdate = new Date(expires*1000);
      console.log('type');
      console.log(type);
      console.log('token');
      console.log(token);
      console.log('expires');
      console.log(expires);
      console.log('expdate');
      console.log(expdate);

      switch (type) {
        case 'success': {
          // Get the user's name using Facebook's Graph API
          const response = await fetch(`https://graph.facebook.com/me?access_token=${token}&fields=id,name,picture,email`);
          const profile = await response.json();
          var name = profile.name.split(" ");
          console.log('profile');
          console.log(profile);
          console.log('profile.picture');
          console.log(profile.picture);

          let authData = {
            id: profile.id,
            access_token: token,
            expiration_date: expdate
          };
          Parse.FacebookUtils.logIn(authData,{
            success: function(user) {
              console.log('user');
              console.log(user);
              if (!user.existed()) {
                console.log("!user.existed()");
                user.set('firstName', name[0]);
                user.set('lastName', name[1]);
                user.set('username', profile.email);
                user.set('email', profile.email);
                //user.set('picture', profile.picture.data.url);
                console.log('set en cours');
                user.set("availability", [{"day":"Monday","hours":[]},{"day":"Tuesday","hours":[]},{"day":"Wednesday","hours":[]},{"day":"Thursday","hours":[]},{"day":"Friday","hours":[]},{"day":"Saturday","hours":[]},{"day":"Sunday","hours":[]}]);
                console.log('this.state.location');
                console.log(login.state.location);
                if (login.state.location) {
                  console.log('set en cours 2');
                  var point = new Parse.GeoPoint({latitude: login.state.location.coords.latitude, longitude: login.state.location.coords.longitude});
                  user.set("geolocation", point);
                }
                console.log('set en cours 3');
                user.set("filterCondition", "indifferent");
                user.set("filterAge", {"to":70,"from":18});
                user.set("filterLevel", {"to":24,"from":0});
                user.set("filterGender", "indifferent");
                user.set("filterStyle", "indifferent");
                user.set("filterFieldType", {"range":30,"key":"aroundMe","latitude":null,"longitude":null});
                user.save();
                console.log('set en cours save');

                login.props.handleSubmit({
                  firstName:name[0],
                  lastName:name[1],
                  style:undefined,
                  gender:undefined,
                  currentLevel:undefined,
                  highestLevel:undefined,
                  availability:[{"day":"Monday","hours":[]},{"day":"Tuesday","hours":[]},{"day":"Wednesday","hours":[]},{"day":"Thursday","hours":[]},{"day":"Friday","hours":[]},{"day":"Saturday","hours":[]},{"day":"Sunday","hours":[]}],
                  userId:user.id,
                  birthday:undefined,
                  picture:undefined
                })

                login.props.handleSubmitPreferences({
                  filterCondition:"indifferent",
                  filterAge:{"to":70,"from":18},
                  filterLevel:{"to":24,"from":0},
                  filterGender:"indifferent",
                  filterStyle:"indifferent",
                  filterFieldType:{"range":30,"key":"aroundMe","latitude":null,"longitude":null}
                })

                login.props.handleSubmitButton({
                  ChatButtonIndex:null,
                  CommunityButtonIndex:null,
                  CalendarButtonIndex:null,
                  ProfileButtonIndex:null
                })

                login.props.handleSubmitClub2({toto:'toto'})
                console.log('redux ok');

                login.props.navigation.navigate("Swiper");
              } 

              else {

                console.log("user.existed()");

                var lastName = user.get("lastName");
                var firstName = user.get("firstName");
                var style = user.get("style");
                var gender = user.get("gender");
                var currentLevel = user.get("currentLevel");
                var highestLevel = user.get("highestLevel");
                var availability = user.get("availability");
                var filterCondition = user.get("filterCondition");
                var filterAge = user.get("filterAge");
                var filterLevel = user.get("filterLevel");
                var filterGender = user.get("filterGender");
                var filterStyle = user.get("filterStyle");
                var filterFieldType = user.get("filterFieldType");

                console.log("user.existed() 2");
                if (user.get("picture") != undefined) {
                  var picture = user.get("picture").url();
                } else {
                  var picture = undefined;
                }
                var birthday = user.get("birthday");

                console.log("user.existed() 3");

                login.props.handleSubmit({
                  lastName:lastName,
                  firstName:firstName,
                  style:style,
                  gender:gender,
                  currentLevel:currentLevel,
                  highestLevel:highestLevel,
                  availability:availability,
                  userId:user.id,
                  picture: picture,
                  birthday:birthday
                })

                login.props.handleSubmitPreferences({
                  filterCondition:filterCondition,
                  filterAge:filterAge,
                  filterLevel:filterLevel,
                  filterGender:filterGender,
                  filterStyle:filterStyle,
                  filterFieldType:filterFieldType
                })

                login.props.handleSubmitButton({
                  ChatButtonIndex:null,
                  CommunityButtonIndex:null,
                  CalendarButtonIndex:null,
                  ProfileButtonIndex:null
                })

                console.log("user.existed() 4");

                var clubs = user.get("clubs");

                console.log("user.existed() 5");
                 
                if (clubs != undefined) {
                  for (var i = 0; i < clubs.length; i++) {
                   var queryClub = new Parse.Query("Club");
                   queryClub.get(clubs[i].id, {
                      success: function(club) {
                      // The object was retrieved successfully.
                      var clubName = club.get("name");
                      login.props.handleSubmitClub({id:club.id, name:clubName})
                      },
                      error: function(object, error) {
                        // The object was not retrieved successfully.
                      }
                    });
                  }
                } else { login.props.handleSubmitClub2({toto:'toto'}) }
                 
                console.log("user.existed() 6");
                login.props.navigation.navigate("Swiper");  
          
              } 
            },
            error: function(user, error) {
              console.log(user, error);
            }
          })
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

  _onPressFacebookLogin() {

    /*Parse.FacebookUtils.logIn(null, {
    success: function(user) {
      console.log('user');
      console.log(user);
      if (!user.existed()) {
        alert("User signed up and logged in through Facebook!");
      } else {
        alert("User logged in through Facebook!");
      }
    },
    error: function(user, error) {
      alert("User cancelled the Facebook login or did not fully authorize.");
    }
  });*/
}

  _onPressSignInButton() {
    Parse.User.logOut().then(() => {
    var currentUser = Parse.User.current();  // this will now be null
    });
    this.props.navigation.navigate("SignIn");
  };

  _getIntentLauncherAndroidAsync = async () => {
    await IntentLauncherAndroid.startActivityAsync(IntentLauncherAndroid.ACTION_LOCATION_SOURCE_SETTINGS);
    let location = await Location.getCurrentPositionAsync({enableHighAccuracy:true});
    console.log('location');
    console.log(location);
    this.setState({ location: location });
    console.log('setState ok');
  };

  _getLocationAsync = async () => {
    let {status} = await Permissions.askAsync(Permissions.LOCATION);
    let service = await Location.getProviderStatusAsync();
    console.log('status');
    console.log(status);
    console.log('service');
    console.log(service);

    if (status != 'granted') {
     console.log('Permission to access location was denied');
     Alert.alert(
          "Vous n'avez pas autorisé Tie Break à accéder à votre localisation. Allez dans Réglages > Confidentialité pour l'activer.",
          "La localisation est indispensable pour trouver des ami(e)s ou réserver des terrains");
     this.setState({ location: undefined });
    } else if (!service.locationServicesEnabled) {
      if (Platform.OS === 'android') {
        Alert.alert(
          "La localisation est désactivée sur votre mobile.",
          "La localisation est indispensable pour trouver des ami(e)s ou réserver des terrains.",
          [
            {text: 'Activer', onPress : () => this._getIntentLauncherAndroidAsync()},
            {text: 'Non', onPress : () => this.setState({ location: undefined }), style:'cancel'},
          ],
          { cancelable: false }
          );
      } else {
        Alert.alert(
          "La localisation est désactivée sur votre mobile. Allez dans Réglages > Confidentialité pour l'activer.",
          "La localisation est indispensable pour trouver des ami(e)s ou réserver des terrains");
        this.setState({ location: undefined });
      }
    } else if (service.locationServicesEnabled) {
        let location = await Location.getCurrentPositionAsync({enableHighAccuracy:true});
        console.log('location');
        console.log(location);
        this.setState({ location: location });
        console.log('setState ok');
      }
  };

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

      <KeyboardAwareScrollView enableOnAndroid={true} style={{alignItems:'center', backgroundColor:'transparent'}}>

          <View style={{alignItems:'center', marginTop: 80, marginBottom: 40}}>
            <Image source={require('../../assets/icons/AppSpecific/Logo.imageset/logoBlack.png')}/>
          </View>

          <View style={{flex: 1, alignItems:'center'}}>

            <TextInput
            style={styles.input} 
            keyboardType="email-address"
            returnKeyType='next'
            autoCapitalize='none'
            autoCorrect={false}
            placeholder='Email'
            underlineColorAndroid='rgba(0,0,0,0)'
            onChangeText={(username) => this.setState({username})}
            value={this.state.username}
            onSubmitEditing={() => {this.refs.password.focus()}}
            />

            <TextInput 
            ref={'password'}
            style={styles.input} 
            keyboardType="default"
            returnKeyType='done'
            autoCapitalize='none'
            autoCorrect={false}
            placeholder='Mot de passe'
            underlineColorAndroid='rgba(0,0,0,0)'
            secureTextEntry={true}
            onChangeText={(password) => this.setState({password})}
            value={this.state.password}
            onSubmitEditing={Keyboard.dismiss}
            />
            <Text style={styles.subtitle}>Mot de passe oublié?</Text>
            <TouchableOpacity onPress={this._onPressLogInButton}>
            <Text style={styles.buttonLogIn}>Connexion</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={this._handleFacebookLogin}>
            <Text style={styles.buttonFacebook}>Se connecter avec Facebook</Text>
            </TouchableOpacity>
            <View style={{flex:1, top: 20, alignItems: 'center'}}>
            <Svg
              height="40"
              width="150"
            >
              <Line
                x1="0"
                y1="0"
                x2="150"
                y2="0"
                stroke="rgb(210,210,210)"
                strokeWidth="2"
               />
            </Svg>
            </View>
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
    paddingLeft: 10
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
    justifyContent:'center'
  },
});
