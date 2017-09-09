import React, { Component } from 'react'
import { StyleSheet, View, Image, Alert, Text, TextInput, Keyboard, TouchableWithoutFeedback } from 'react-native'
import { Font } from 'expo'
import { Facebook } from 'expo'
import { Actions } from 'react-native-router-flux'
import { connect } from 'react-redux'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Parse } from 'parse/react-native'
import ModalDropdown from 'react-native-modal-dropdown';
import Svg,{
    Circle,
    Ellipse,
    G,
    LinearGradient,
    RadialGradient,
    Line,
    Path,
    Polygon,
    Polyline,
    Rect,
    Symbol,
    Use,
    Defs,
    Stop
} from 'react-native-svg'

Parse.initialize("3E8CAAOTf6oi3NaL6z8oVVJ7wvtfKa");
Parse.serverURL = 'https://tiebreak.herokuapp.com/parse'

function mapDispatchToProps(dispatch) {
  return {
        user: function(value) { 
        dispatch( {type: 'user', value: value} ) 
    }
  }
}

function mapStateToProps(store) {
  return { user: store.user, userClub: store.userClub }
}

class EditProfileContent extends React.Component {

constructor(props) {
    super(props);
    console.log("constructor Edit Profile");
    console.log(props);
    this.state = {
      fontAvenirNextLoaded: false,
      fontAvenirLoaded: false,
      firstName:this.props.user.firstName,
      lastName:this.props.user.lastName,
      currentLevel:this.props.user.currentLevel,
      highestLevel:this.props.user.highestLevel,
      style:this.props.user.style,
      gender:this.props.user.gender,
      availability:this.props.user.availability,
      userId:this.props.user.userId,
    };
    console.log(this.state);
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

  _onPressValidateButton() {
    var validate = this;
    var user = new Parse.User();
    user.save(null, {
      success: function(user) {
        console.log('save success');
        // Now let's update it with some new data. In this case, only cheatMode and score
        // will get sent to the cloud. playerName hasn't changed.
        user.set("firstName", validate.state.firstName);
        user.set("lastName", validate.state.lastName);
        user.set("currentLevel", validate.state.currentLevel);
        user.set("highestLevel", validate.state.highestLevel);
        user.set("style", validate.state.style);
        user.set("gender", validate.state.gender);
        user.save();

        console.log("save success 2");

        validate.props.user({
                lastName:validate.state.lastName,
                firstName:validate.state.firstName,
                style:validate.state.style,
                gender:validate.state.gender,
                currentLevel:validate.state.currentLevel,
                highestLevel:validate.state.highestLevel,
                availability:validate.state.availability,
                userId:validate.state.userId,
              })

        console.log('envoie au reducer user ok');

      Actions.profile();
      }
    });
  }

  render() {

    var level = [1,2,3,4,5,6,7,8,9,10];


    return (

       <View style={{
        flex: 1,
        backgroundColor:'transparent'
      }}>

          <KeyboardAwareScrollView>

          <View style={{
           flexDirection: 'row',
           justifyContent: 'center',
           marginBottom: 20,
           }}>


           <Image source={require('../../assets/icons/General/AddPhoto.imageset/placeholderPic.png')}/>
       
           </View>

          <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>


          <TextInput 
            ref='firstName'
            style={styles.input} 
            keyboardType="default"
            returnKeyType='next'
            autoCorrect='false'
            defaultValue={this.state.firstName}
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
            value={this.state.lastName}
            underlineColorAndroid='rgba(0,0,0,0)'
            onChangeText={(lastName) => this.setState({lastName})}
            blurOnSubmit={false}
            onSubmitEditing={Keyboard.dismiss}
            />

          <ModalDropdown 
          style={styles.input} 
          dropdownStyle={styles.modalDrop} 
          textStyle={styles.text}
          dropdownTextStyle={styles.text}
          defaultValue='genre' 
          options={['male', 'female']}
          onSelect={(genre) => this.setState({genre})}
          />

           <ModalDropdown 
          style={styles.input} 
          dropdownStyle={styles.modalDrop} 
          textStyle={styles.text}
          dropdownTextStyle={styles.text}
          defaultValue='currentLevel' 
          options={level}
          onSelect={(currentLevel) => this.setState({currentLevel})}
          />

          <ModalDropdown 
          style={styles.input} 
          dropdownStyle={styles.modalDrop} 
          textStyle={styles.text}
          dropdownTextStyle={styles.text}
          defaultValue='highestLevel' 
          options={level}
          onSelect={(highestLevel) => this.setState({highestLevel})}
          />

          <TouchableWithoutFeedback onPress={this._onPressValidateButton}>
          <Text style={styles.buttonValidate}>Valider</Text>
          </TouchableWithoutFeedback>

          </View>


        </KeyboardAwareScrollView>
        

        </View>


    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps) (EditProfileContent);

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
  buttonValidate: {
    backgroundColor: 'rgb(200,90,24)',
    color: 'white',
    fontSize: 18,
    width: 300,
    lineHeight: 30,
    marginTop: 20,
    textAlign: 'center',
    borderWidth:1,
    borderColor:'rgb(213,212,216)', 
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
  modalDrop: {
    marginLeft:1,
    width:295,
    height:80, 
    marginTop:10,
  },
  text: {
    color:'black', 
    top:8,
    backgroundColor: 'rgba(0,0,0,0)',
    fontSize: 18,
  },
  container: {
    justifyContent:'center',
  },
});
