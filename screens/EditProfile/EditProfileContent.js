import React, { Component } from 'react'
import { Alert, StyleSheet, View, Image, Text, TextInput, Keyboard, TouchableWithoutFeedback, ActivityIndicator } from 'react-native'
import { Font, Constants, ImagePicker, registerRootComponent } from 'expo'
import { NavigationActions } from 'react-navigation'
import { connect } from 'react-redux'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Parse } from 'parse/react-native'
import ModalDropdown from 'react-native-modal-dropdown'
import Modal from 'react-native-modalbox'

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
      image:null,
      newPicture:false,
      firstName:this.props.user.firstName,
      lastName:this.props.user.lastName,
      currentLevel:this.props.user.currentLevel,
      highestLevel:this.props.user.highestLevel,
      style:this.props.user.style,
      gender:this.props.user.gender,
      availability:this.props.user.availability,
      userId:this.props.user.userId,
      picture:this.props.user.picture
    };
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

    var edit = this;

    if (this.state.firstName.length>0 && 
        this.state.lastName.length>0) {

          if (this.state.newPicture) {

    var user = Parse.User.current();
    var picture = new Parse.File("picture.bin", { base64: edit.state.picture });

     picture.save().then(function() {
        // The file has been saved to Parse.
          user.set("firstName", edit.state.firstName);
          user.set("lastName", edit.state.lastName);
          user.set("currentLevel", parseInt(edit.state.currentLevel));
          user.set("highestLevel", parseInt(edit.state.highestLevel));
          user.set("style", edit.state.style);
          user.set("gender", edit.state.gender);
          user.set("picture", picture);
          user.save();

                edit.props.handleSubmit({
                lastName:edit.state.lastName,
                firstName:edit.state.firstName,
                style:edit.state.style,
                gender:edit.state.gender,
                currentLevel:edit.state.currentLevel,
                highestLevel:edit.state.highestLevel,
                availability:edit.state.availability,
                picture:picture.url()
              })
                 edit.props.navigation.goBack();
                });
          } 
          else {
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
                picture:this.state.picture
              })
                 this.props.navigation.goBack();
                  }
        } else {
        Alert.alert('Veuillez compléter tous les champs');
        }
     
  }



  render() {

    let { image } = this.state;
    let { picture } = this.state;
    var profileImage;

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

       if (this.state.newPicture) {
           profileImage = <Image style={{width: 90, height: 90, borderRadius: 45}} source={{uri: 'data:image/bin;base64,'+picture}}/>
          }
          else if (this.props.picture!='')
           {
           profileImage = <Image style={{width: 90, height: 90, borderRadius: 45}} source={{uri: picture}}/>
           } 
        else {
             profileImage = <Image source={require('../../assets/icons/General/AddPhoto.imageset/placeholderPic.png')}/>
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

           <TouchableWithoutFeedback onPress={() => this.refs.modal.open()}>
           {profileImage}
           </TouchableWithoutFeedback>
       
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
        this.setState({ picture: pickerResult.base64, newPicture: true });
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
  modalTitle: {
    color: "grey",
    fontStyle:"italic",
    fontSize: 14,
    width:"100%",
    textAlign:'center'
  },
  modalText: {
    color: "black",
    fontSize: 20,
    width:"100%",
    textAlign:'center'
  }
});
