import React from 'react'
import { StyleSheet, View, Image, Alert, Text, TextInput, TouchableOpacity, Keyboard, TouchableWithoutFeedback, ActivityIndicator } from 'react-native'
import { Facebook, Constants, ImagePicker, registerRootComponent, Location, Permissions } from 'expo'
import Modal from 'react-native-modalbox'
import { NavigationActions } from 'react-navigation'
import { connect } from 'react-redux'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Parse } from 'parse/react-native'

Parse.initialize("3E8CAAOTf6oi3NaL6z8oVVJ7wvtfKa");
Parse.serverURL = 'https://tiebreak.herokuapp.com/parse'

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
}

class SignIn extends React.Component {

  constructor(props) {
    super(props);
    this._getLocationAsync();
    this._onPressSignInButton = this._onPressSignInButton.bind(this);
    this.signInWithoutPicture = this.signInWithoutPicture.bind(this);
    this._getLocationAsync = this._getLocationAsync.bind(this);
    this.state = {
      fontAvenirNextLoaded: false,
      fontAvenirLoaded: false,
      image: null,
      uploading: false,
      firstName:'',
      lastName:'',
      username:'',
      password:'',
      confirmPassword:'',
      picture:'',
      location:null
    };
  }

  validateEmail(email) 
      {
          var re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          return re.test(email);
      }

  signInWithoutPicture() {

  var signin = this;

  var user = new Parse.User();
  var point = new Parse.GeoPoint({latitude: this.state.location.coords.latitude, longitude: this.state.location.coords.longitude});

  user.set("username", this.state.username);
  user.set("password", this.state.password);
  user.set("firstName", this.state.firstName);
  user.set("lastName", this.state.lastName);
  user.set("email", this.state.username);
  user.set("availability", [{"day":"Monday","hours":[]},{"day":"Tuesday","hours":[]},{"day":"Wednesday","hours":[]},{"day":"Thursday","hours":[]},{"day":"Friday","hours":[]},{"day":"Saturday","hours":[]},{"day":"Sunday","hours":[]}]);

  user.set("geolocation", point);
  user.set("filterCondition", "indifferent");
  user.set("filterAge", {"to":70,"from":15});
  user.set("filterLevel", {"to":24,"from":0});
  user.set("filterGender", "indifferent");
  user.set("filterStyle", "indifferent");
  user.set("filterFieldType", {"range":30,"key":"aroundMe","latitude":null,"longitude":null});
  
  
  user.signUp(null, {
  success: function(user) {              
    // Hooray! Let them use the app now.

    var userId= user.id;

      signin.props.handleSubmit({
      lastName:signin.state.lastName,
      firstName:signin.state.firstName,
      style:'à compléter',
      gender:'à compléter',
      currentLevel:'à compléter',
      highestLevel:'à compléter',
      availability:[{"day":"Monday","hours":[]},{"day":"Tuesday","hours":[]},{"day":"Wednesday","hours":[]},{"day":"Thursday","hours":[]},{"day":"Friday","hours":[]},{"day":"Saturday","hours":[]},{"day":"Sunday","hours":[]}],
      userId:userId,
      picture: '',
      latitude:signin.state.location.coords.latitude,
      longitude:signin.state.location.coords.longitude
    })

      signin.props.handleSubmitPreferences({
      filterCondition:"indifferent",
      filterAge:{"to":70,"from":15},
      filterLevel:{"to":24,"from":0},
      filterGender:"indifferent",
      filterStyle:"indifferent",
      filterFieldType:{"range":30,"key":"aroundMe","latitude":null,"longitude":null}
    })

      signin.props.handleSubmitButton({
      ChatButtonIndex:null,
      CommunityButtonIndex:null,
      CalendarButtonIndex:null,
      ProfileButtonIndex:null
    })

      signin.props.navigation.navigate("Swiper")
  },
  error: function(user, error) {
    // Show the error message somewhere and let the user try again.
    Alert.alert('Email déjà pris'); 
  }
});
}

// Checks Form and push data to Redux

  _onPressSignInButton() {
    
    var signin = this;
    var user = new Parse.User();
      
      // Verify if all inputs are completed & two passwords are equals and email is good format

      var emailFormatIsFalse=true;

      if (this.state.firstName.length>0 && 
        this.state.lastName.length>0 && 
        this.state.username.length>0 && 
        this.state.password.length>0 && 
        this.state.confirmPassword.length>0
        ) 
        {
        if (this.state.password===this.state.confirmPassword && this.validateEmail(this.state.username)) 
          { 
            emailFormatIsFalse=false;
            

            if (signin.state.picture.length>0) {

            var point = new Parse.GeoPoint({latitude: this.state.location.coords.latitude, longitude: this.state.location.coords.longitude});

            user.set("username", this.state.username);
            user.set("password", this.state.password);
            user.set("firstName", this.state.firstName);
            user.set("lastName", this.state.lastName);
            user.set("email", this.state.username);
            user.set("availability", [{"day":"Monday","hours":[]},{"day":"Tuesday","hours":[]},{"day":"Wednesday","hours":[]},{"day":"Thursday","hours":[]},{"day":"Friday","hours":[]},{"day":"Saturday","hours":[]},{"day":"Sunday","hours":[]}]);

            user.set("geolocation", point);
            user.set("filterCondition", "indifferent");
            user.set("filterAge", {"to":70,"from":15});
            user.set("filterLevel", {"to":24,"from":0});
            user.set("filterGender", "indifferent");
            user.set("filterStyle", "indifferent");
            user.set("filterFieldType", {"range":30,"key":"aroundMe","latitude":null,"longitude":null});
            
            //signin._getLocationAsync();

            user.signUp(null, {
            success: function(user) {              
              // Hooray! Let them use the app now.
              console.log("signUp ok");
              var userId= user.id;


                var picture = new Parse.File("picture.bin", { base64: signin.state.picture });

                var user = Parse.User.current();

                picture.save().then(function() {
                // The file has been saved to Parse.
                user.set("picture", picture);
                user.save();

                signin.props.handleSubmit({
                lastName:signin.state.lastName,
                firstName:signin.state.firstName,
                style:'à compléter',
                gender:'à compléter',
                currentLevel:'à compléter',
                highestLevel:'à compléter',
                availability:[{"day":"Monday","hours":[]},{"day":"Tuesday","hours":[]},{"day":"Wednesday","hours":[]},{"day":"Thursday","hours":[]},{"day":"Friday","hours":[]},{"day":"Saturday","hours":[]},{"day":"Sunday","hours":[]}],
                userId:userId,
                picture: picture.url(),
                latitude:signin.state.location.coords.latitude,
                longitude:signin.state.location.coords.longitude
              })

                signin.props.handleSubmitPreferences({
                  filterCondition:"indifferent",
                  filterAge:{"to":70,"from":15},
                  filterLevel:{"to":24,"from":0},
                  filterGender:"indifferent",
                  filterStyle:"indifferent",
                  filterFieldType:{"range":30,"key":"aroundMe","latitude":null,"longitude":null}
                })

                signin.props.handleSubmitButton({
                  ChatButtonIndex:null,
                  CommunityButtonIndex:null,
                  CalendarButtonIndex:null,
                  ProfileButtonIndex:null
                })

                signin.props.navigation.navigate("Swiper")
                }, function(error) {
                // The file either could not be read, or could not be saved to Parse.
                console.log(error);
                });
            },
            error: function(user, error) {
              // Show the error message somewhere and let the user try again.
              Alert.alert('Email déjà pris');
            }
          });
          }
            else {
                Alert.alert(
                'Souhaitez-vous ajouter une photo de profil ?',
                'Une photo de profil augmente vos chances de trouver des partenaires !',
                [
                  {text: 'Ajouter une photo', onPress : () => this.refs.modal.open(), style:'cancel'},
                  {text: 'Passer', onPress : () => this.signInWithoutPicture(), style:'destructive'},
                ],
                { cancelable: false }
              )
                }
        }
         else if (this.state.password!=this.state.confirmPassword) {
           Alert.alert('Veuillez confirmer votre mot de passe');
        }
        else if (emailFormatIsFalse) {
          Alert.alert("Format de l'email invalide");
        }
          
       } else {
        Alert.alert('Veuillez compléter tous les champs');
        }
      }



// FaceBook Login

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

  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
     console.log('Permission to access location was denied');
    }

    let location = await Location.getCurrentPositionAsync({enableHighAccuracy:true});
    console.log(location);
    this.setState({ location });
  };


  render() {

    let { image } = this.state;
    let { picture } = this.state;
    var profileImage;

     if (this.state.picture!='')
           {
           profileImage = <Image style={{width: 90, height: 90, borderRadius: 45}} source={{uri: 'data:image/bin;base64,'+picture}}/>
           } else {
             profileImage = <Image source={require('../../assets/icons/General/AddPhoto.imageset/placeholderPic.png')}/>
             }

    return (

      <View style={{
        flex: 1,
        backgroundColor:'white'
      }}>

          <KeyboardAwareScrollView>

          <View style={{
           flexDirection: 'row',
           justifyContent: 'space-around',
           marginTop: 60,
           marginBottom: 20,
           }}>


           <TouchableWithoutFeedback style={{padding:30}} onPress={() => this.props.navigation.goBack()}>
           <Image source={require('../../assets/icons/General/Back.imageset/icBackGrey.png')} />
           </TouchableWithoutFeedback> 

           <TouchableWithoutFeedback onPress={() => this.refs.modal.open()}>
           {profileImage}
           </TouchableWithoutFeedback>

           <Text style={{color: 'rgba(0,0,0,0)', backgroundColor:'rgba(0,0,0,0)'}}>H</Text> 
       
           </View>

          <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
            
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
            underlineColorAndroid='rgba(0,0,0,0)'
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
            underlineColorAndroid='rgba(0,0,0,0)'
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
            underlineColorAndroid='rgba(0,0,0,0)'
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
            underlineColorAndroid='rgba(0,0,0,0)'
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
            underlineColorAndroid='rgba(0,0,0,0)'
            onChangeText={(confirmPassword) => this.setState({confirmPassword})}
            onSubmitEditing={Keyboard.dismiss}
            />

          </View>

        </KeyboardAwareScrollView>
          
          <View style={{
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'stretch',
         }}>
            <TouchableWithoutFeedback onPress={this._onPressSignInButton}>
            <Text style={styles.buttonLogIn}>Créer un compte</Text>
            </TouchableWithoutFeedback>
        </View>

        <Modal style={[styles.modal]} position={"bottom"} ref={"modal"}>
          
          <TouchableWithoutFeedback>
          <View style={{borderBottomWidth:1, borderColor:'rgb(213,212,216)', width:"100%", paddingBottom: 10}}>
          <Text style={styles.modalTitle}>Choisir la source</Text>
          </View>
          </TouchableWithoutFeedback>

          <TouchableWithoutFeedback onPress={this._pickImage}>
          <View style={{borderBottomWidth:1, borderColor:'rgb(213,212,216)', width:"100%", paddingBottom: 20}}>
          <Text style={styles.modalText}>Bibliothèque</Text>
          </View>
          </TouchableWithoutFeedback>

          <TouchableWithoutFeedback onPress={this._takePhoto}>
          <View style={{borderBottomWidth:1, borderColor:'rgb(213,212,216)', width:"100%", paddingBottom: 20}}>
          <Text style={styles.modalText}>Caméra</Text>
          </View>
          </TouchableWithoutFeedback>

          {this._maybeRenderImage()}
          {this._maybeRenderUploadingOverlay()}

          <TouchableWithoutFeedback onPress={() => this.refs.modal.close()}>
          <Text style={styles.modalText}>Annuler</Text>
          </TouchableWithoutFeedback>
        </Modal>


        </View>

    );
  }

_maybeRenderUploadingOverlay = () => {
    if (this.state.uploading) {
      return (
        <View
          style={[
            StyleSheet.absoluteFill,
            {
              backgroundColor: 'rgba(0,0,0,0.4)',
              alignItems: 'center',
              justifyContent: 'center',
            },
          ]}>
          <ActivityIndicator color="#fff" animating size="large" />
        </View>
      );
    }
  };

  _maybeRenderImage = () => {
    let { image } = this.state;
    if (!image) {
      return;
    }

    return (
      <View
        style={{
          marginTop: 30,
          width: 250,
          borderRadius: 3,
          elevation: 2,
          shadowColor: 'rgba(0,0,0,1)',
          shadowOpacity: 0.2,
          shadowOffset: { width: 4, height: 4 },
          shadowRadius: 5,
        }}>
        <View
          style={{
            borderTopRightRadius: 3,
            borderTopLeftRadius: 3,
            overflow: 'hidden',
          }}>
          <Image source={{ uri: image }} style={{ width: 250, height: 250 }} />
        </View>

        <Text
          onPress={this._copyToClipboard}
          onLongPress={this._share}
          style={{ paddingVertical: 10, paddingHorizontal: 10 }}>
          {image}
        </Text>
      </View>
    );
  };

  _share = () => {
    Share.share({
      message: this.state.image,
      title: 'Check out this photo',
      url: this.state.image,
    });
  };

  _copyToClipboard = () => {
    Clipboard.setString(this.state.image);
    alert('Copied image URL to clipboard');
  };

  _takePhoto = async () => {
    let pickerResult = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      base64: 'true'
    });

    this._handleImagePicked(pickerResult);
  };

  _pickImage = async () => {
    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
      base64: 'true'
    });

    this._handleImagePicked(pickerResult);
  };

  _handleImagePicked = async pickerResult => {
    try {
      this.setState({ uploading: true });

      if (!pickerResult.cancelled) {
        this.setState({ picture: pickerResult.base64 });
      }
    } catch (e) {
      console.log({ e });
      alert('Action annulée');
    } finally {
      this.setState({ uploading: false });
      this.refs.modal.close();
    }
  };
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
    paddingLeft: 10,
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
  modal: {
    flexDirection:'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 250,
    borderWidth:1, 
    borderRadius:15,
    width: "95%",
    borderColor:'rgb(213,212,216)',
    bottom:12
  },
  btn: {
    margin: 10,
    backgroundColor: "#3B5998",
    color: "white",
    padding: 10
  },
  modalText: {
    color: "black",
    fontSize: 20,
    width:"100%",
    textAlign:'center'
  },
  modalTitle: {
    color: "grey",
    fontStyle:"italic",
    fontSize: 14,
    width:"100%",
    textAlign:'center'
  }
});
