import React, { Component } from 'react';
import { Alert, StyleSheet, View, Image, Text, TextInput, Keyboard, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Font, Constants, ImagePicker, registerRootComponent, Permissions, Amplitude } from 'expo';
import { connect } from 'react-redux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Parse } from 'parse/react-native';
import ModalDropdown from 'react-native-modal-dropdown';
import Modal from 'react-native-modalbox';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { NavigationActions } from 'react-navigation';

import translate from '../../translate.js';

import moment from 'moment/min/moment-with-locales';

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
    this.modalGender = this.modalGender.bind(this);
    this.modalStyle = this.modalStyle.bind(this);
    this.state = {
      fontAvenirNextLoaded: false,
      fontAvenirLoaded: false,
      image:null,
      newPicture:false,
      isDateTimePickerVisible:false,
      firstName:this.props.user.firstName,
      lastName:this.props.user.lastName,
      currentLevel:this.props.user.currentLevel,
      highestLevel:this.props.user.highestLevel,
      style:this.props.user.style,
      gender:this.props.user.gender,
      availability:this.props.user.availability,
      userId:this.props.user.userId,
      picture:this.props.user.picture,
      birthday:this.props.user.birthday
    };

    moment.locale(this.props.user.currentLocale);
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

    var user = Parse.User.current() || Parse.User.currentAsync();
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
          user.set("birthday", edit.state.birthday);
          user.save();

          Amplitude.setUserProperties({gender:this.state.gender, isPicture:true, age:moment().diff(this.state.birthday, 'years')});

                edit.props.handleSubmit({
                lastName:edit.state.lastName,
                firstName:edit.state.firstName,
                style:edit.state.style,
                gender:edit.state.gender,
                currentLevel:edit.state.currentLevel,
                highestLevel:edit.state.highestLevel,
                availability:edit.state.availability,
                picture:picture.url(),
                birthday:edit.state.birthday,
                new:false,
                currentLocale:edit.props.user.currentLocale
              })
                 edit.props.navigation.dispatch(NavigationActions.back());
                });
          } 
          else {
          var user = Parse.User.current() || Parse.User.currentAsync();
          user.set("firstName", this.state.firstName);
          user.set("lastName", this.state.lastName);
          user.set("currentLevel", parseInt(this.state.currentLevel));
          user.set("highestLevel", parseInt(this.state.highestLevel));
          user.set("style", this.state.style);
          user.set("gender", this.state.gender);
          user.set("birthday", this.state.birthday);
          user.save();

          Amplitude.setUserProperties({gender:this.state.gender, age:moment().diff(this.state.birthday, 'years')});

           this.props.handleSubmit({
                lastName:this.state.lastName,
                firstName:this.state.firstName,
                style:this.state.style,
                gender:this.state.gender,
                currentLevel:this.state.currentLevel,
                highestLevel:this.state.highestLevel,
                availability:this.state.availability,
                picture:this.state.picture,
                birthday:this.state.birthday,
                new:false,
                currentLocale:this.props.user.currentLocale
              })
                 this.props.navigation.dispatch(NavigationActions.back());
                  }
        } else {
        Alert.alert('Veuillez compléter tous les champs');
        }  
  }

  _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });

  _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

  _handleDatePicked = (birthday) => {
    console.log('A birthday has been picked: ', birthday);
    this.setState({ birthday: birthday });
    this._hideDateTimePicker();
  };

  modalGender(index) {
  if (index == 0) {
    this.setState({gender:'male'});
  } else if (index == 1) {
    this.setState({gender:'female'});
  }
}

  modalStyle(index) {
    if (index == 0) {
      this.setState({style:'left'});
    } else if (index == 1) {
      this.setState({style:'right'});
    }
  }

  render() {
    let { image } = this.state;
    let { picture } = this.state;
    const maximumDate = moment().subtract(18, 'years').toDate();
    var level = ["Débutant","Intermédiaire","Avancé","40","30/5","30/4","30/3","30/2","30/1","30","15/5","15/4","15/3","15/2","15/1","15","5/6","4/6","3/6","2/6","1/6","0","-2/6","-4/6","-15"];

    if (this.props.user.currentLevel == undefined) {
    var defaultValueCurrentLevel = "Niveau actuel: à compléter";
  } else if (this.props.user.currentLevel == 0) {
    var defaultValueCurrentLevel = 'Niveau actuel: Débutant';
  } else if (this.props.user.currentLevel == 1) {
    var defaultValueCurrentLevel = 'Niveau actuel: Intermédiaire';
  } else if (this.props.user.currentLevel == 2) {
    var defaultValueCurrentLevel = 'Niveau actuel: Avancé';
  } else if (this.props.user.currentLevel == 3) {
    var defaultValueCurrentLevel = 'Niveau actuel: 40';
  } else if (this.props.user.currentLevel == 4) {
    var defaultValueCurrentLevel = 'Niveau actuel: 30/5';
  } else if (this.props.user.currentLevel == 5) {
    var defaultValueCurrentLevel = 'Niveau actuel: 30/4';
  } else if (this.props.user.currentLevel == 6) {
    var defaultValueCurrentLevel = 'Niveau actuel: 30/3';
  } else if (this.props.user.currentLevel == 7) {
    var defaultValueCurrentLevel = 'Niveau actuel: 30/2';
  } else if (this.props.user.currentLevel == 8) {
    var defaultValueCurrentLevel = 'Niveau actuel: 30/1';
  } else if (this.props.user.currentLevel == 9) {
    var defaultValueCurrentLevel = 'Niveau actuel: 30';
  } else if (this.props.user.currentLevel == 10) {
    var defaultValueCurrentLevel = 'Niveau actuel: 15/5';
  } else if (this.props.user.currentLevel == 11) {
    var defaultValueCurrentLevel = 'Niveau actuel: 15/4';
  } else if (this.props.user.currentLevel == 12) {
    var defaultValueCurrentLevel = 'Niveau actuel: 15/3';
  } else if (this.props.user.currentLevel == 13) {
    var defaultValueCurrentLevel = 'Niveau actuel: 15/2';
  } else if (this.props.user.currentLevel == 14) {
    var defaultValueCurrentLevel = 'Niveau actuel: 15/1';
  } else if (this.props.user.currentLevel == 15) {
    var defaultValueCurrentLevel = 'Niveau actuel: 15';
  } else if (this.props.user.currentLevel == 16) {
    var defaultValueCurrentLevel = 'Niveau actuel: 5/6';
  } else if (this.props.user.currentLevel == 17) {
    var defaultValueCurrentLevel = 'Niveau actuel: 4/6';
  } else if (this.props.user.currentLevel == 18) {
    var defaultValueCurrentLevel = 'Niveau actuel: 3/6';
  } else if (this.props.user.currentLevel == 19) {
    var defaultValueCurrentLevel = 'Niveau actuel: 2/6';
  } else if (this.props.user.currentLevel == 20) {
    var defaultValueCurrentLevel = 'Niveau actuel: 1/6';
  } else if (this.props.user.currentLevel == 21) {
    var defaultValueCurrentLevel = 'Niveau actuel: 0';
  } else if (this.props.user.currentLevel == 22) {
    var defaultValueCurrentLevel = 'Niveau actuel: -2/6';
  } else if (this.props.user.currentLevel == 23) {
    var defaultValueCurrentLevel = 'Niveau actuel: -4/6';
  } else if (this.props.user.currentLevel == 24) {
    var defaultValueCurrentLevel = 'Niveau actuel: -15';
  }

  if (this.props.user.highestLevel == undefined) {
    var defaultValueHighestLevel = "Meilleur niveau: à compléter";
  } else if (this.props.user.highestLevel == 0) {
    var defaultValueHighestLevel = 'Meilleur niveau: Débutant';
  } else if (this.props.user.highestLevel == 1) {
    var defaultValueHighestLevel = 'Meilleur niveau: Intermédiaire';
  } else if (this.props.user.highestLevel == 2) {
    var defaultValueHighestLevel = 'Meilleur niveau: Avancé';
  } else if (this.props.user.highestLevel == 3) {
    var defaultValueHighestLevel = 'Meilleur niveau: 40';
  } else if (this.props.user.highestLevel == 4) {
    var defaultValueHighestLevel = 'Meilleur niveau: 30/5';
  } else if (this.props.user.highestLevel == 5) {
    var defaultValueHighestLevel = 'Meilleur niveau: 30/4';
  } else if (this.props.user.highestLevel == 6) {
    var defaultValueHighestLevel = 'Meilleur niveau: 30/3';
  } else if (this.props.user.highestLevel == 7) {
    var defaultValueHighestLevel = 'Meilleur niveau: 30/2';
  } else if (this.props.user.highestLevel == 8) {
    var defaultValueHighestLevel = 'Meilleur niveau: 30/1';
  } else if (this.props.user.highestLevel == 9) {
    var defaultValueHighestLevel = 'Meilleur niveau: 30';
  } else if (this.props.user.highestLevel == 10) {
    var defaultValueHighestLevel = 'Meilleur niveau: 15/5';
  } else if (this.props.user.highestLevel == 11) {
    var defaultValueHighestLevel = 'Meilleur niveau: 15/4';
  } else if (this.props.user.highestLevel == 12) {
    var defaultValueHighestLevel = 'Meilleur niveau: 15/3';
  } else if (this.props.user.highestLevel == 13) {
    var defaultValueHighestLevel = 'Meilleur niveau: 15/2';
  } else if (this.props.user.highestLevel == 14) {
    var defaultValueHighestLevel = 'Meilleur niveau: 15/1';
  } else if (this.props.user.highestLevel == 15) {
    var defaultValueHighestLevel = 'Meilleur niveau: 15';
  } else if (this.props.user.highestLevel == 16) {
    var defaultValueHighestLevel = 'Meilleur niveau: 5/6';
  } else if (this.props.user.highestLevel == 17) {
    var defaultValueHighestLevel = 'Meilleur niveau: 4/6';
  } else if (this.props.user.highestLevel == 18) {
    var defaultValueHighestLevel = 'Meilleur niveau: 3/6';
  } else if (this.props.user.highestLevel == 19) {
    var defaultValueHighestLevel = 'Meilleur niveau: 2/6';
  } else if (this.props.user.highestLevel == 20) {
    var defaultValueHighestLevel = 'Meilleur niveau: 1/6';
  } else if (this.props.user.highestLevel == 21) {
    var defaultValueHighestLevel = 'Meilleur niveau: 0';
  } else if (this.props.user.highestLevel == 22) {
    var defaultValueHighestLevel = 'Meilleur niveau: -2/6';
  } else if (this.props.user.highestLevel == 23) {
    var defaultValueHighestLevel = 'Meilleur niveau: -4/6';
  } else if (this.props.user.highestLevel == 24) {
    var defaultValueHighestLevel = 'Meilleur niveau: -15';
  }

  if (this.props.user.gender == undefined) {
    var defaultValueGender = translate.gender[this.props.user.currentLocale];
  } else if (this.props.user.gender == 'male') {
    var defaultValueGender = translate.man[this.props.user.currentLocale];
  } else if (this.props.user.gender == 'female') {
    var defaultValueGender = translate.woman[this.props.user.currentLocale];
  }

  if (this.props.user.style == undefined) {
    var defaultValueStyle = translate.style[this.props.user.currentLocale];
  } else if (this.props.user.style == 'right') {
    var defaultValueStyle = translate.rightHanded[this.props.user.currentLocale];
  } else if (this.props.user.style == 'left') {
    var defaultValueStyle = translate.leftHanded[this.props.user.currentLocale];
  }


   if (this.state.newPicture) {
       var profileImage = <Image style={{width: 90, height: 90, borderRadius: 45}} source={{uri: 'data:image/bin;base64,'+picture}}/>
      }
      else if (picture!=undefined)
       {
       var profileImage = <Image style={{width: 90, height: 90, borderRadius: 45}} source={{uri: picture}}/>
       } 
    else {
         var profileImage = <Image source={require('../../assets/icons/General/AddPhoto.imageset/placeholderPic.png')}/>
         }


    return (

       <View style={{
        flex: 1,
        backgroundColor:'transparent'
      }}>

          <KeyboardAwareScrollView enableOnAndroid={true}>

          <View style={{
           flexDirection: 'row',
           justifyContent: 'center',
           marginBottom: 20,
           }}>

           <TouchableOpacity onPress={() => this.refs.modal.open()}>
           {profileImage}
           </TouchableOpacity>
       
           </View>

          <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>


          <TextInput 
            style={styles.input} 
            keyboardType="default"
            returnKeyType='next'
            autoCorrect={false}
            autoCapitalize='sentences'
            defaultValue={this.state.firstName}
            underlineColorAndroid='rgba(0,0,0,0)'
            onChangeText={(firstName) => this.setState({firstName})}
            onSubmitEditing={(event) => {this.refs.lastName.focus();
            }}
            />
          <TextInput 
            ref='lastName'
            style={styles.input} 
            keyboardType="default"
            returnKeyType='next'
            autoCorrect={false}
            autoCapitalize='sentences'
            value={this.state.lastName}
            underlineColorAndroid='rgba(0,0,0,0)'
            onChangeText={(lastName) => this.setState({lastName})}
            onSubmitEditing={Keyboard.dismiss}
            />

          <ModalDropdown 
          style={styles.input} 
          dropdownStyle={styles.modalDropDual} 
          textStyle={styles.text}
          dropdownTextStyle={styles.text}
          defaultValue={defaultValueGender}
          options={[translate.man[this.props.user.currentLocale], translate.woman[this.props.user.currentLocale]]}
          onSelect={(index) => {this.modalGender(index)}}
          />

          <ModalDropdown 
          style={styles.input} 
          dropdownStyle={styles.modalDropDual} 
          textStyle={styles.text}
          dropdownTextStyle={styles.text}
          defaultValue={defaultValueStyle}
          options={[translate.leftHanded[this.props.user.currentLocale], translate.rightHanded[this.props.user.currentLocale]]}
          onSelect={(index) => {this.modalStyle(index)}}
          />

           <ModalDropdown 
          style={styles.input} 
          dropdownStyle={styles.modalDrop} 
          textStyle={styles.text}
          dropdownTextStyle={styles.text}
          defaultValue={defaultValueCurrentLevel}
          options={level}
          onSelect={(index, currentLevel) => this.setState({currentLevel: index})}
          />

          <ModalDropdown 
          style={styles.input} 
          dropdownStyle={styles.modalDrop} 
          textStyle={styles.text}
          dropdownTextStyle={styles.text}
          defaultValue={defaultValueHighestLevel}
          options={level}
          onSelect={(index, highestLevel) => this.setState({highestLevel: index})}
          />

          <TouchableOpacity onPress={this._showDateTimePicker}>
            <View style={styles.date}>
              <Text style={{color:'black'}}>{ (this.state.birthday && moment(this.state.birthday).format('L')) || translate.chooseBirthday[this.props.user.currentLocale] }</Text>
            </View>
          </TouchableOpacity>
          <DateTimePicker
          isVisible={this.state.isDateTimePickerVisible}
          onConfirm={this._handleDatePicked}
          onCancel={this._hideDateTimePicker}
          mode="date"
          maximumDate={maximumDate}
          cancelTextIOS={translate.cancel[this.props.user.currentLocale]}
          confirmTextIOS={translate.validate[this.props.user.currentLocale]}
          titleIOS={translate.chooseBirthday[this.props.user.currentLocale]}
          locale={this.props.user.currentLocale}
          date={this.state.birthday || new Date()}
        />

          <TouchableOpacity onPress={this._onPressValidateButton}>
          <Text style={styles.buttonValidate}>{translate.validate[this.props.user.currentLocale]}</Text>
          </TouchableOpacity>

          </View>


        </KeyboardAwareScrollView>

        <Modal 
          style={[styles.modal]} 
          position={"bottom"} 
          ref={"modal"}>
          
          <TouchableOpacity style={{borderBottomWidth:1, borderColor:'rgb(213,212,216)', width:"100%", paddingBottom: 10}}>
          <View>
          <Text style={styles.modalTitle}>{translate.chooseSource[this.props.user.currentLocale]}</Text>
          </View>
          </TouchableOpacity>

          <TouchableOpacity 
            onPress={this._pickImage}
            style={{borderBottomWidth:1, borderColor:'rgb(213,212,216)', width:"100%", paddingBottom: 20}}
            hitSlop={{top:10, left:50, bottom:10, right:50}}>
          <View>
          <Text style={styles.modalText}>{translate.library[this.props.user.currentLocale]}</Text>
          </View>
          </TouchableOpacity>

          <TouchableOpacity 
            onPress={this._takePhoto}
            style={{borderBottomWidth:1, borderColor:'rgb(213,212,216)', width:"100%", paddingBottom: 20}}
            hitSlop={{top:10, left:50, bottom:10, right:50}}>
          <View>
          <Text style={styles.modalText}>{translate.camera[this.props.user.currentLocale]}</Text>
          </View>
          </TouchableOpacity>

          {this._maybeRenderImage()}
          {this._maybeRenderUploadingOverlay()}

          <TouchableOpacity 
            onPress={() => this.refs.modal.close()}
            hitSlop={{top:10, left:50, bottom:10, right:50}}>
          <Text style={styles.modalText}>{translate.cancel[this.props.user.currentLocale]}</Text>
          </TouchableOpacity>
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
      </View>
    );
  };

 _takePhoto = async () => {
     const res = await Promise.all([
            Permissions.askAsync(Permissions.CAMERA),
            Permissions.askAsync(Permissions.CAMERA_ROLL)
        ]);
    if(res[0].status === 'granted' && res[1].status === 'granted') {
      let pickerResult = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [4, 3],
        base64: true
      });
      this._handleImagePicked(pickerResult);
       } else {
      this.refs.modal.close();
    }
  };

  _pickImage = async () => {
    const res = await Promise.all([
            Permissions.askAsync(Permissions.CAMERA),
            Permissions.askAsync(Permissions.CAMERA_ROLL)
        ]);
    if(res[0].status === 'granted' && res[1].status === 'granted') {
      let pickerResult = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [4, 3],
        base64: true
      });
      this._handleImagePicked(pickerResult);
    } else {
      this.refs.modal.close();
    }

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
    paddingLeft:10,
    fontSize:14
  },
  date: {
    width:300,
    height:40, 
    borderWidth:1, 
    borderColor:'rgb(213,212,216)', 
    overflow:'hidden', 
    borderRadius:5,
    marginTop:20,
    paddingTop:10,
    paddingLeft:10,
    fontSize:14
  },
  modalDropDual: {
    marginLeft:1,
    width:250,
    height:80, 
    marginTop:10,
  },
  modalDrop: {
    marginLeft:1,
    width:250,
    height:150, 
    marginTop:10,
  },
  text: {
    color:'black', 
    paddingTop:10,
    backgroundColor:'rgba(0,0,0,0)',
    fontSize:14,
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
