import React, { Component } from 'react'
import { StyleSheet, View, Image, Text, TextInput, Keyboard, TouchableWithoutFeedback } from 'react-native'
import { Font } from 'expo'
import { NavigationActions } from 'react-navigation'
import { connect } from 'react-redux'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Parse } from 'parse/react-native'
import ModalDropdown from 'react-native-modal-dropdown';

Parse.initialize("3E8CAAOTf6oi3NaL6z8oVVJ7wvtfKa");
Parse.serverURL = 'https://tiebreak.herokuapp.com/parse'

function mapDispatchToProps(dispatch) {
  return {
        handleSubmit: function(value) { 
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
    this._onPressValidateButton = this._onPressValidateButton.bind(this);
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
        console.log("Edit Profile Content");
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

    var user = Parse.User.current();
    user.set("firstName", this.state.firstName);
    user.set("lastName", this.state.lastName);
    user.set("currentLevel", parseInt(this.state.currentLevel));
    user.set("highestLevel", parseInt(this.state.highestLevel));
    user.set("style", this.state.style);
    user.set("gender", this.state.gender);
    user.save();

        this.props.handleSubmit({
                lastName:this.state.lastName,
                firstName:this.state.firstName,
                style:this.state.style,
                gender:this.state.gender,
                currentLevel:this.state.currentLevel,
                highestLevel:this.state.highestLevel,
                availability:this.state.availability,
              })

      this.props.navigation.goBack();
     
  }



  render() {

    var level = [1,2,3,4,5,6,7,8,9,10];
    var defaultValueGender= this.state.gender;
    if (this.state.gender === "à compléter") {
      defaultValueGender = "gender";
    } 
    var defaultValueStyle= this.state.style;
    if (this.state.style === "à compléter") {
      defaultValueStyle = "style";
    } 
    var defaultValueCurrentLevel= this.state.currentLevel;
    if (this.state.currentLevel === "à compléter") {
      defaultValueCurrentLevel = "currentLevel";
    } 
    var defaultValueHighestLevel= this.state.highestLevel;
    if (this.state.highestLevel === "à compléter") {
      defaultValueHighestLevel = "highestLevel";
    } 


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
          defaultValue={defaultValueGender}
          options={['male', 'female']}
          onSelect={(index, gender) => this.setState({gender})}
          />

          <ModalDropdown 
          style={styles.input} 
          dropdownStyle={styles.modalDrop} 
          textStyle={styles.text}
          dropdownTextStyle={styles.text}
          defaultValue={defaultValueStyle}
          options={['left', 'right']}
          onSelect={(index, style) => this.setState({style})}
          />

           <ModalDropdown 
          style={styles.input} 
          dropdownStyle={styles.modalDrop} 
          textStyle={styles.text}
          dropdownTextStyle={styles.text}
          defaultValue={defaultValueCurrentLevel}
          options={level}
          onSelect={(index, currentLevel) => this.setState({currentLevel})}
          />

          <ModalDropdown 
          style={styles.input} 
          dropdownStyle={styles.modalDrop} 
          textStyle={styles.text}
          dropdownTextStyle={styles.text}
          defaultValue={defaultValueHighestLevel}
          options={level}
          onSelect={(index, highestLevel) => this.setState({highestLevel})}
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
