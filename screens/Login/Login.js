import React from 'react';
import { StyleSheet, View, Image, Alert, Text, TextInput, TouchableOpacity, Keyboard, Platform, ImageStore, ImageEditor, ActivityIndicator } from 'react-native';
import { Facebook, Font, Constants, Location, Permissions, IntentLauncherAndroid, Svg, DangerZone, Notifications, Amplitude } from 'expo';
import { connect } from 'react-redux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Parse } from 'parse/react-native';

import moment from 'moment/min/moment-with-locales';

import translate from '../../translate.js';


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
    },
        handleSubmitReservationOption: function(value) { 
        dispatch( {type: 'reservationOption', value: value} ) 
    }
  }
}


class Login extends React.Component {

constructor(props) {
    super(props);
    this._onPressLogInButton = this._onPressLogInButton.bind(this);
    this._onPressSignInButton = this._onPressSignInButton.bind(this);
    this._onPressLoginFacebook = this._onPressLoginFacebook.bind(this);
    this.getImageFromFacebook = this.getImageFromFacebook.bind(this);
    this.state = {
      fontAvenirNextLoaded: false,
      fontAvenirLoaded: false,
      location:null,
      pictureBase64:null,
      loading:false,
      disabled:false,
      currentLocale:'en',
      renderAllContent: false,
    };
    this.getCurrentLocale();
    this.parseUserCurrentAsync();
  }

  async getCurrentLocale() {

    const currentLocaleUtil = await DangerZone.Localization.getCurrentLocaleAsync();

    if (Platform.OS === 'android' && currentLocaleUtil.length>0) {
      var currentLocale = currentLocaleUtil.split("_")[0];
      if (currentLocale === 'fr' || currentLocale === 'de' || currentLocale === 'en') {
        moment.locale(currentLocale);
        this.setState({currentLocale:currentLocale})
      } 
    } else if (Platform.OS === 'ios' && currentLocaleUtil.length>0) {
      var currentLocale = currentLocaleUtil.split("_")[0];
      if (currentLocale === 'fr' || currentLocale === 'de' || currentLocale === 'en') {
        moment.locale(currentLocale);
        this.setState({currentLocale:currentLocale})
      } 
    }

    if (Platform.OS === 'android' && !Constants.isDevice) {
          Alert.alert('isDevice'); 
        } else {
          this._getLocationAsync();
        } 
  }

  async parseUserCurrentAsync() {

      var login = this;

      Parse.User.currentAsync().then(function(user) {

              if (user != null) {

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
                var badgeNumber = user.get("badgeNumber");

                if (badgeNumber) {
                  Notifications.setBadgeNumberAsync(badgeNumber);
                }

                if (user.get("picture") != undefined) {
                  var picture = user.get("picture").url();
                  var isPicture = true;
                } else {
                  var picture = undefined;
                  var isPicture = false;
                }

                if (user.get("birthday") != undefined) {
                  var birthday = user.get("birthday");
                } else {
                  var birthday = undefined;
                }
                let availabilities=0;
                for (var i = 0; i < availability.length; i++) {
                  availabilities = availabilities + availability[i].hours.length;
                }

                var clubs = user.get("clubs");

                Amplitude.setUserId(user.id);
                Amplitude.setUserProperties({gender:gender, isPicture:isPicture, age:moment().diff(birthday, 'years'), availabilities:availabilities, clubNumber: (clubs && clubs.length)||0});

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
                  birthday:birthday,
                  new:false,
                  currentLocale:login.state.currentLocale
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
                  ChatButtonIndex:0,
                  CommunityButtonIndex:null,
                  CalendarButtonIndex:null,
                  ProfileButtonIndex:0,
                  ReservationButtonIndex:null
                })

                login.props.handleSubmitReservationOption({
                  filterCondition:2,
                  filterType:2,
                  filterHours:[8,22],
                  filterDiscount:0,
                  range:30,
                  date:null,
                  surface:null
                })
                 
                if (clubs != undefined) {
                  for (var i = 0; i < clubs.length; i++) {
                   var queryClub = new Parse.Query("Club");
                   queryClub.get(clubs[i].id || clubs[i], {
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

                login.props.navigation.navigate("Swiper");

              } 
            });
  }

   async componentDidMount() {

    setTimeout(() => {
        this.setState({renderAllContent: true});
      }, 200);

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
   this.setState({loading:true, disabled:true});
   Amplitude.logEvent("Login Button clicked");


   Parse.User.logIn(this.state.username, this.state.password, {
   success: function(user) {

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
                  var isPicture = true;
                } else {
                  var picture = undefined;
                  var isPicture = false;
                }
                if (users.get("birthday") != undefined) {
                  var birthday = users.get("birthday");
                } else {
                  var birthday = undefined;
                }

                var clubs = users.get("clubs");

                let availabilities=0;
                for (var i = 0; i < availability.length; i++) {
                  availabilities = availabilities + availability[i].hours.length;
                }

                Amplitude.setUserId(users.id);
                Amplitude.setUserProperties({gender:gender, isPicture:isPicture, age:moment().diff(birthday, 'years'), availabilities:availabilities, clubNumber: (clubs && clubs.length)||0});

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
                  birthday:birthday, 
                  new:false,
                  currentLocale:login.state.currentLocale
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
                  ChatButtonIndex:0,
                  CommunityButtonIndex:null,
                  CalendarButtonIndex:null,
                  ProfileButtonIndex:0,
                  ReservationButtonIndex:null
                })

                login.props.handleSubmitReservationOption({
                  filterCondition:2,
                  filterType:2,
                  filterHours:[8,22],
                  filterDiscount:0,
                  range:30,
                  date:null,
                  surface:null
                }) 

                var Club = Parse.Object.extend("Club");
                
                if (clubs != undefined) {
                  for (var i = 0; i < clubs.length; i++) {
                   var queryClub = new Parse.Query("Club");
                   queryClub.get(clubs[i].id || clubs[i], {
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

              },
           error: function(object, error) {
              // The object was not retrieved successfully.
          }
         }).then(()=>{
            
            login.props.navigation.navigate("Swiper");
            
         }) 
   },
   error: function(user, error) {
    Alert.alert("Identifiant et/ou mot de passe invalide(s)");
    // The login failed. Check error to see why.
   login.setState({loading:false, disabled:false})
   }
   });
  };

  getImageFromFacebook(url) {
    const imageURL = url;
    Image.getSize(imageURL, (width, height) => {
      var imageSize = {
        size: {
          width,
          height
        },
        offset: {
          x: 0,
          y: 0,
        }
      };
      ImageEditor.cropImage(imageURL, imageSize, (imageURI) => {
        ImageStore.getBase64ForTag(imageURI, (base64Data) => {
          this.setState({pictureBase64: base64Data});
          if (Platform.OS === 'ios') {
            ImageStore.removeImageForTag(imageURI);
          }
        }, (reason) => console.log(reason) )
      }, (reason) => console.log(reason) )
    }, (reason) => console.log(reason))
  }
  
  _handleFacebookLogin = async () => {
    console.log('Facebook');
    var login = this;
    this.setState({loading:false})
    try {
      const { type, token, expires } = await Facebook.logInWithReadPermissionsAsync(
        '233912777050369', // Replace with your own app id in standalone app
        { 
          permissions: ['public_profile', 'user_friends', 'email']
        }
      );

      switch (type) {
        case 'success': {
          console.log('success');
          // Get the user's name using Facebook's Graph API
          const response = await fetch(`https://graph.facebook.com/me?access_token=${token}&fields=id,name,picture.type(large),email`);
          const profile = await response.json();
          var name = profile.name.split(" ");
          var expdate = new Date(expires*1000);

          if (profile.picture) {  
            this.getImageFromFacebook(profile.picture.data.url);
          }

          let authData = {
            id: profile.id,
            access_token: token,
            expiration_date: expdate
          };
          
          Parse.FacebookUtils.logIn(authData,{
            success: function(user) {
              
              if (!user.existed()) {
                user.set('firstName', name[0]);
                user.set('lastName', name[1]);
                user.set('username', profile.email);
                user.set('email', profile.email);
                user.set("badgeNumber", 0);
                if (login.state.pictureBase64) {
                  var picture = new Parse.File("picture.bin", { base64: login.state.pictureBase64 });
                  user.set('picture', picture);
                  var isPicture = true;
                } else {
                  var isPicture = false;
                }
                user.set("availability", [{"day":"Monday","hours":[]},{"day":"Tuesday","hours":[]},{"day":"Wednesday","hours":[]},{"day":"Thursday","hours":[]},{"day":"Friday","hours":[]},{"day":"Saturday","hours":[]},{"day":"Sunday","hours":[]}]);
                if (login.state.location) {
                  var point = new Parse.GeoPoint({latitude: login.state.location.coords.latitude, longitude: login.state.location.coords.longitude});
                  user.set("geolocation", point);
                }
                user.set("filterCondition", "indifferent");
                user.set("filterAge", {"to":70,"from":18});
                user.set("filterLevel", {"to":24,"from":0});
                user.set("filterGender", "indifferent");
                user.set("filterStyle", "indifferent");
                user.set("filterFieldType", {"range":30,"key":"aroundMe"});
                user.save();

                Amplitude.setUserId(user.id);

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
                  picture:(profile.picture && profile.picture.data.url)||undefined,
                  new:true,
                  currentLocale:login.state.currentLocale
                })

                login.props.handleSubmitPreferences({
                  filterCondition:"indifferent",
                  filterAge:{"to":70,"from":18},
                  filterLevel:{"to":24,"from":0},
                  filterGender:"indifferent",
                  filterStyle:"indifferent",
                  filterFieldType:{"range":30,"key":"aroundMe"}
                })

                login.props.handleSubmitButton({
                  ChatButtonIndex:0,
                  CommunityButtonIndex:null,
                  CalendarButtonIndex:null,
                  ProfileButtonIndex:0,
                  ReservationButtonIndex:null
                })

                login.props.handleSubmitReservationOption({
                  filterCondition:2,
                  filterType:2,
                  filterHours:[8,22],
                  filterDiscount:0,
                  range:30,
                  date:null,
                  surface:null
                })

                login.props.handleSubmitClub2({toto:'toto'})

                login.props.navigation.navigate("Swiper");
              } 

              else {

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

                if (user.get("picture") != undefined) {
                  var picture = user.get("picture").url();
                  var isPicture = true;
                } else {
                  var picture = undefined;
                  var isPicture = false;
                }
                if (user.get("birthday") != undefined) {
                  var birthday = user.get("birthday");
                } else {
                  var birthday = undefined;
                }

                let availabilities=0;
                for (var i = 0; i < availability.length; i++) {
                  availabilities = availabilities + availability[i].hours.length;
                }
                
                var clubs = user.get("clubs");

                Amplitude.setUserId(user.id);
                Amplitude.setUserProperties({gender:gender, isPicture:isPicture, age:moment().diff(birthday, 'years'), availabilities:availabilities, clubNumber: (clubs && clubs.length)||0});

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
                  birthday:birthday,
                  new:false,
                  currentLocale:login.state.currentLocale
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
                  ChatButtonIndex:0,
                  CommunityButtonIndex:null,
                  CalendarButtonIndex:null,
                  ProfileButtonIndex:0,
                  ReservationButtonIndex:null
                })

                login.props.handleSubmitReservationOption({
                  filterCondition:2,
                  filterType:2,
                  filterHours:[8,22],
                  filterDiscount:0,
                  range:30,
                  date:null,
                  surface:null
                })

                 
                if (clubs != undefined) {
                  for (var i = 0; i < clubs.length; i++) {
                   var queryClub = new Parse.Query("Club");
                   queryClub.get(clubs[i].id || clubs[i], {
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
          login.setState({disabled:false})
          break;
        }
        default: {
          Alert.alert(
            'Oops!',
            'Login failed!',
          );
          login.setState({disabled:false})
        }
      }
    } catch (e) {
      Alert.alert(
        'Oops!',
        'Login failed!',
      );
      login.setState({disabled:false})
    }
  }; 

  _onPressLoginFacebook() {
    this.setState({loading:true, disabled:true});
    Amplitude.logEvent("Facebook Login Button clicked");
    this._handleFacebookLogin();
  }
  

  _onPressSignInButton() {
    Parse.User.logOut().then(() => {
    var currentUser = Parse.User.current();  // this will now be null
    });
    Amplitude.logEvent("SignIn Button clicked on Login Screen");
    this.props.navigation.navigate("SignIn");
  };

  _getIntentLauncherAndroidAsync = async () => {
    await IntentLauncherAndroid.startActivityAsync(IntentLauncherAndroid.ACTION_LOCATION_SOURCE_SETTINGS);
    let location = await Location.getCurrentPositionAsync({enableHighAccuracy:true});
    this.setState({ location: location });
  };

  _getLocationAsync = async () => {
    let {status} = await Permissions.askAsync(Permissions.LOCATION);
    let service = await Location.getProviderStatusAsync();

    if (status != 'granted') {
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
        this.setState({ location: location });
      }
  };

  render() {

        if (!this.state.renderAllContent) {
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

              </View>

         );
      }

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

      { this.state.renderAllContent &&

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
            placeholder={translate.email[this.state.currentLocale]}
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
            placeholder={translate.password[this.state.currentLocale]}
            underlineColorAndroid='rgba(0,0,0,0)'
            secureTextEntry={true}
            onChangeText={(password) => this.setState({password})}
            value={this.state.password}
            onSubmitEditing={Keyboard.dismiss}
            />
            <Text style={styles.subtitle}>{translate.forgotPassword[this.state.currentLocale]}</Text>
            <TouchableOpacity 
              onPress={this._onPressLogInButton}
              disabled={this.state.disabled}>
            <Text style={styles.buttonLogIn}>{translate.login[this.state.currentLocale]}</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              onPress={this._onPressLoginFacebook}
              disabled={this.state.disabled}
              >
            <Text style={styles.buttonFacebook}>{translate.facebookLogin[this.state.currentLocale]}</Text>
            </TouchableOpacity>

          

            <View style={{flex:1, top: 20, alignItems: 'center'}}>
            <Svg
              height={40}
              width={150}
            >
              <Svg.Line
                x1={0}
                y1={0}
                x2={150}
                y2={0}
                stroke="rgb(210,210,210)"
                strokeWidth="2"
               />
            </Svg>
            </View>
            <TouchableOpacity onPress={this._onPressSignInButton}>
            <Text style={styles.buttonSignIn}>{translate.signIn[this.state.currentLocale]}</Text>
            </TouchableOpacity>

          </View>

          {this.state.loading &&
              <View style={styles.loading}>
                <ActivityIndicator size='large' />
              </View>
          }

            </KeyboardAwareScrollView>
        }

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
  loading: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor:'#F5FCFF88'
  }
});
