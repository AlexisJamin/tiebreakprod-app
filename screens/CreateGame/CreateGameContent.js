import React from 'react'
import { StyleSheet, View, Image, Alert, Text, TextInput, TouchableWithoutFeedback, ScrollView, Keyboard } from 'react-native'
import { Font, Util } from 'expo'
import ModalDropdown from 'react-native-modal-dropdown'
import DateTimePicker from 'react-native-modal-datetime-picker';
import { ButtonGroup } from 'react-native-elements'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { connect } from 'react-redux'
import { Parse } from 'parse/react-native'

Parse.initialize("3E8CAAOTf6oi3NaL6z8oVVJ7wvtfKa");
Parse.serverURL = 'https://tiebreak.herokuapp.com/parse'

import moment from 'moment';
import 'moment/locale/fr';

function mapDispatchToProps(dispatch) {
  return {
        handleSubmit: function(value) { 
        dispatch( {type: 'user', value: value} ) 
    }
  }
}

class CreateGameContent extends React.Component {

  constructor(props) {
    super(props);
    this._onPressValidateButton = this._onPressValidateButton.bind(this);
    this._onPressAnswerPositive = this._onPressAnswerPositive.bind(this);
    this.state = {
      fontAvenirNextLoaded:false,
      fontAvenirLoaded:false,
      isDateTimePickerVisible:false,
      selectedConditionIndex:null,
      selectedClubIndex:null,
      clubListId:null,
      clubListName:null,
      surface:null,
      date:null,
      price:0
    };
  }

  async componentWillMount() {
   moment.locale('fr');
   //var deviceLocale = await Expo.Util.getCurrentLocaleAsync();

   var user = Parse.User.current();
   var edit = this;
   var query = new Parse.Query("User");
   var clubListName = [];
   var clubListId = [];
    query.get(user.id, {
      success: function(users) {
        // The object was retrieved successfully.
        console.log('success clubList');
        var clubList = users.get("clubs");
        if (clubList!=undefined && clubList.length>0) {
          for (var i = 0; i < clubList.length; i++) {
            clubListName.push(users.get("clubs")[i].get('name'));
            clubListId.push(users.get("clubs")[i].id);
            }
          edit.setState({ clubListId : clubListId, clubListName : clubListName})
        } else { edit.setState({ clubListId: [], clubListName: [] })}

      },
      error: function(object, error) {
        // The object was not retrieved successfully.
        // error is a Parse.Error with an error code and message.
      }
    });
  }

  async componentDidMount() {

    await Font.loadAsync({
      'AvenirNext': require('../../assets/fonts/AvenirNext.ttf'),
      'Avenir': require('../../assets/fonts/Avenir.ttf'),
    });
    this.setState({ 
      fontAvenirNextLoaded: true,
      fontAvenirLoaded: true,
    });
  }

  _onPressAnswerPositive() {
      var add = this;
      var friends = [];
      var user = Parse.User.current();
      var query = new Parse.Query('Relation');
      query.equalTo('status', 3);
      query.equalTo('fromUser', Parse.User.current());  
      query.find({
        success: function(Friends) {
          for (var i = 0; i < Friends.length; i++) {
            var FriendsCopy = JSON.parse(JSON.stringify(Friends[i]));
            friends.push(FriendsCopy.toUser.objectId);
          }
          console.log(friends);
        },
        error: function(e) {
          console.log(e);
        }
      })

      var query2 = new Parse.Query('Relation');
      query2.equalTo('status', 3);
      query2.equalTo('toUser', Parse.User.current());  
      query2.find({
        success: function(Friends) {
          for (var i = 0; i < Friends.length; i++) {
            var FriendsCopy = JSON.parse(JSON.stringify(Friends[i]));
            friends.push(FriendsCopy.fromUser.objectId);
          }
          console.log(friends);
        },
        error: function(e) {
          console.log(e);
        }
      });

      if (this.state.selectedConditionIndex == 0) {
        var condition = 'inside';
      } else if (this.state.selectedConditionIndex == 1) {
        var condition = 'outside';
      }

      if (this.state.surface == 'Dur') {
        var surface = 'hard';
      } else if (this.state.surface == 'Gazon') {
        var surface = 'grass';
      } else if (this.state.surface == 'Moquette') {
        var surface = 'carpet';
      } else if (this.state.surface == 'Terre battue') {
        var surface = 'clay';
      } else if (this.state.surface == 'Synthétique') {
        var surface = 'synthetic';
      }
      var game = new Parse.Object("Game");
      game.set("organiser", Parse.User.current());
      game.set("price", this.state.price);
      game.set("surface", surface);
      game.set("createdAt", Date());
      game.set("updatedAt", Date());
      game.set("date", this.state.date);
      game.set("club", { "__type": "Pointer", "className": "Club", "objectId": this.state.clubListId[this.state.selectedClubIndex]});
      game.set("condition", condition);
      game.save(null, {
        success: function(game) {
          for (var i = 0; i < friends.length; i++) {
            Parse.Cloud.run("createNotification", { 
            "userId": friends[i],
            "message": "Vous propose une partie le "+moment(add.state.date).format('llll'),
            "gameId": game.id,
            "type": 3,
             })
          }
          add.props.navigation.goBack();
        }
      });
      
  }


  _onPressValidateButton() {
    if (this.state.surface != null && this.state.selectedConditionIndex != null && this.state.date != null && this.state.selectedClubIndex != null) {

      Alert.alert(
        'Vous confirmez avoir réservé un terrain le :',
        moment(this.state.date).format('llll')+' ?',
        [
          {text: 'Non'},
          {text: 'Oui', onPress: () => this._onPressAnswerPositive()},
        ],
        { cancelable: false }
      )

    } else {
      Alert.alert('Veuillez compléter tous les champs');
    }
  }

  _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });

  _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

  _handleDatePicked = (date) => {
    console.log('A date has been picked: ', date);
    this.setState({ date: date });
    this._hideDateTimePicker();
  };

  render() {

    const conditions = ['Intérieur', 'Extérieur'];
    const surfaces = ['Dur', 'Gazon', 'Moquette', 'Terre battue', 'Synthétique'];
    const { clubListId } = this.state;
    const clubs = this.state.clubListName;
    const minimumDate = new Date();

    if (clubListId && (clubListId.length==0) ) {
      var warning = (<Text style={{marginBottom:10, fontFamily: 'Avenir', paddingLeft:10, color:'red'}}> Aucun club dans votre profil. </Text>);
    } else if (clubListId && (clubListId.length>0)) {
      var warning = null;
    }

    return (

      <View style={{flex:1, backgroundColor:'white'}}>

        <KeyboardAwareScrollView>

        <View style={styles.page}>

         {
          this.state.fontAvenirLoaded ? (<Text style={{marginBottom:15, fontFamily: 'AvenirNext', paddingLeft:10}}> DATE </Text>
          ) : null 
         }

        <View style={styles.container}>
        <TouchableWithoutFeedback onPress={this._showDateTimePicker}>
          <View style={styles.button}>
            <Text style={{color:'white'}}>{ (this.state.date && moment(this.state.date).format('LLLL')) || 'Choisir une date' }</Text>
          </View>
        </TouchableWithoutFeedback>
        <DateTimePicker
          isVisible={this.state.isDateTimePickerVisible}
          onConfirm={this._handleDatePicked}
          onCancel={this._hideDateTimePicker}
          mode="datetime"
          minimumDate={minimumDate}
          cancelTextIOS="Annuler"
          confirmTextIOS="Valider"
          titleIOS="Choisir une date"
        />
        </View>
        
        {
          this.state.fontAvenirLoaded ? (<Text style={{marginBottom:10, fontFamily: 'AvenirNext', paddingLeft:10}}> TERRAIN </Text>
          ) : null 
         }

         {
          this.state.fontAvenirLoaded ? (<Text style={{marginBottom:10, fontFamily: 'Avenir', paddingLeft:10}}> Lieu </Text>
          ) : null 
         }

         {warning}

         <View style={{alignItems:'center', justifyContent:'center'}}>

          <ModalDropdown 
          style={styles.input} 
          dropdownStyle={styles.modalDrop} 
          textStyle={styles.text}
          dropdownTextStyle={styles.text}
          defaultValue={'Mes clubs'}
          options={clubs}
          onSelect={(index, selectedClub) => this.setState({selectedClubIndex:index})}
          />

          </View>

          {
          this.state.fontAvenirLoaded ? (<Text style={{marginBottom:10, fontFamily: 'Avenir', paddingLeft:10}}> Conditions </Text>
          ) : null 
         }

         <ButtonGroup 
          onPress={(index) => this.setState({selectedConditionIndex:index})}
          selectedIndex={this.state.selectedConditionIndex}
          buttons={conditions}
          textStyle={styles.title}
          selectedBackgroundColor={'rgb(42,127,83)'}
          selectedTextStyle={styles.subtitle}
          containerStyle={styles.courts}
          />
          
          {
          this.state.fontAvenirLoaded ? (<Text style={{marginBottom:10, fontFamily: 'Avenir', paddingLeft:10}}> Type de surface </Text>
          ) : null 
         }

          <View style={{alignItems:'center', justifyContent:'center'}}>

          <ModalDropdown 
          style={styles.input} 
          dropdownStyle={styles.modalDrop} 
          textStyle={styles.text}
          dropdownTextStyle={styles.text}
          defaultValue={'Surface'}
          options={surfaces}
          onSelect={(index, surface) => this.setState({surface})}
          />

          </View>

          {
          this.state.fontAvenirLoaded ? (<Text style={{marginBottom:10, fontFamily: 'Avenir', paddingLeft:10}}> Prix </Text>
          ) : null 
         }

          <View style={{alignItems:'center', justifyContent:'center'}}>

          <TextInput 
            ref='price'
            style={styles.input} 
            keyboardType="numeric"
            returnKeyType='done'
            autoCapitalize='none'
            autoCorrect={false}
            secureTextEntry={false}
            placeholder='Sans frais'
            underlineColorAndroid='rgba(0,0,0,0)'
            onChangeText={(price) => this.setState({price})}
            onSubmitEditing={Keyboard.dismiss}
            />
            </View>

          </View>

         </KeyboardAwareScrollView>
          
          <View style={{
            flexDirection:'column',
            justifyContent:'center',
            alignItems:'stretch'
             }}>
            <TouchableWithoutFeedback onPress={this._onPressValidateButton}>
            <Text style={styles.buttonLogIn}>Créer la partie</Text>
            </TouchableWithoutFeedback>

          </View>

       
        </View>

    );
  }

}

export default connect(null, mapDispatchToProps) (CreateGameContent);

const styles = StyleSheet.create({
  buttonLogIn: {
    backgroundColor:'rgb(200,90,24)',
    color:'white',
    fontSize:18,
    lineHeight:30,
    textAlign:'center',
    overflow:'hidden', 
    paddingTop:15,
    paddingBottom:15 
  },
  page: {
    flexDirection:'column',
    justifyContent:'center'
  },
  title: {
    color:'black',
    backgroundColor:'rgba(0,0,0,0)',
    fontFamily:'Avenir',
    fontSize:15,
    textAlign:'center'
  },
  modalDrop: {
    marginLeft:1,
    width:295,
    height:80, 
    marginTop:10,
  },
  text: {
    color:'black', 
    paddingTop:10,
    backgroundColor:'rgba(0,0,0,0)',
    fontSize: 14,
  },
   subtitle: {
    color: 'white',
    backgroundColor:'rgba(0,0,0,0)',
    fontFamily: 'Avenir',
    fontSize: 15,
    textAlign:'center'
  },
  input: {
    width:350,
    height:40, 
    borderWidth:1, 
    borderColor:'rgb(213,212,216)', 
    overflow:'hidden', 
    borderRadius:5,
    marginBottom:20, 
    paddingLeft: 10,
    backgroundColor:'white'
  },
  clubs: {
   backgroundColor:'white',
    height:60,
    marginBottom:30,
    width:350
  },
  courts: {
    backgroundColor:'white',
    height:40,
    marginBottom:30,
    width:350
  },
  container: {
    flex:1,
    marginBottom:10,
    justifyContent:'center',
    alignItems:'center',
  },
  button: {
    backgroundColor:'rgb(42,127,83)',
    padding:12,
    justifyContent:'center',
    alignItems:'center',
    borderRadius:4,
    borderColor:'rgba(0,0,0,0)',
  }
});
