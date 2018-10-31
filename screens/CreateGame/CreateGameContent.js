import React from 'react'
import { StyleSheet, View, Image, Alert, Text, TextInput, TouchableOpacity, ScrollView, Keyboard, Share, AsyncStorage } from 'react-native'
import { Font, Util, Amplitude } from 'expo'
import ModalDropdown from 'react-native-modal-dropdown'
import DateTimePicker from 'react-native-modal-datetime-picker';
import { ButtonGroup } from 'react-native-elements'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { connect } from 'react-redux'
import { Parse } from 'parse/react-native'

import moment from 'moment/min/moment-with-locales';

import translate from '../../translate.js';

function mapStateToProps(store) {
  return { user: store.user, userClub: store.userClub }
};

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
    this._shareFriends = this._shareFriends.bind(this);
    this._showResult = this._showResult.bind(this);
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
      price:0,
      friends1:null,
      friends2:null
    };

    moment.locale(this.props.user.currentLocale);
  }

  async componentWillMount() {

   var user = Parse.User.current() || Parse.User.currentAsync();
   var edit = this;
   var query = new Parse.Query("User");
   var clubListName = [];
   var clubListId = [];

    if (this.props.userClub.length>0) {
      for (var i = 0; i < this.props.userClub.length; i++) {
        clubListName.push(this.props.userClub[i].name);
        clubListId.push(this.props.userClub[i].id);
        }
      edit.setState({ clubListId : clubListId, clubListName : clubListName})
    } 
    else { edit.setState({ clubListId: [], clubListName: [] })}

    var query1 = new Parse.Query('Relation');
    query1.equalTo('status', 3);
    query1.equalTo('fromUser', Parse.User.current() || Parse.User.currentAsync());  
    query1.find({
      success: function(Friends) {
        if (Friends.length != 0) {
          edit.setState({friends1:true})
        }
        else {edit.setState({friends1:false})}
      },
      error: function(e) {
        console.log(e);
      }
    })

    var query2 = new Parse.Query('Relation');
    query2.equalTo('status', 3);
    query2.equalTo('toUser', Parse.User.current() || Parse.User.currentAsync());  
    query2.find({
      success: function(Friends) {
        if (Friends.length != 0) {
          edit.setState({friends2:true})
       } 
       else {edit.setState({friends2:false})}
      },
      error: function(e) {
        console.log(e);
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
      var user = Parse.User.current() || Parse.User.currentAsync();
      Amplitude.logEvent("Validate Create Game Button clicked");

      if (this.state.selectedConditionIndex == 0) {
        var condition = 'inside';
      } else if (this.state.selectedConditionIndex == 1) {
        var condition = 'outside';
      }

      if (this.state.surface == 0) {
        var surface = 'hard';
      } else if (this.state.surface == 1) {
        var surface = 'grass';
      } else if (this.state.surface == 2) {
        var surface = 'carpet';
      } else if (this.state.surface == 3) {
        var surface = 'clay';
      } else if (this.state.surface == 4) {
        var surface = 'synthetic';
      }
      
      var query = new Parse.Query('Relation');
      query.equalTo('status', 3);
      query.equalTo('fromUser', Parse.User.current() || Parse.User.currentAsync());  
      query.find({
        success: function(Friends) {
          for (var i = 0; i < Friends.length; i++) {
            var FriendsCopy = JSON.parse(JSON.stringify(Friends[i]));
            var objectFriend = {id:FriendsCopy.toUser.objectId, token:FriendsCopy.toUser.expoPushToken}
            friends.push(objectFriend);
          }
        },
        error: function(e) {
          console.log(e);
        }
      })
      .then(()=>{
        var query2 = new Parse.Query('Relation');
        query2.equalTo('status', 3);
        query2.equalTo('toUser', Parse.User.current() || Parse.User.currentAsync());  
        return query2.find({
          success: function(Friends) {
            for (var i = 0; i < Friends.length; i++) {
              var FriendsCopy = JSON.parse(JSON.stringify(Friends[i]));
              var objectFriend = {id:FriendsCopy.fromUser.objectId, token:FriendsCopy.fromUser.expoPushToken}
              friends.push(objectFriend);
            }
          },
          error: function(e) {
            console.log(e);
          }
        });

      })
      .then(()=> {
        var game = new Parse.Object("Game");
        game.set("organiser", Parse.User.current() || Parse.User.currentAsync());
        game.set("price", this.state.price);
        game.set("surface", surface);
        game.set("createdAt", Date());
        game.set("updatedAt", Date());
        game.set("date", this.state.date);
        game.set("club", { "__type": "Pointer", "className": "Club", "objectId": this.state.clubListId[this.state.selectedClubIndex]});
        game.set("condition", condition);
        return game.save(null, {
          success: function(game) {
            for (var i = 0; i < friends.length; i++) {

              if (friends[i].token) {
                Parse.Cloud.run("createNotification", { 
                  "userId": friends[i].id,
                  "token": friends[i].token,
                  "firstName": user.get('firstName'),
                  "channel":"game-requests",
                  "message": "te propose une partie le "+moment(add.state.date).format('llll'),
                  "gameId": game.id,
                  "type": 3,
                   })
              } else {
                Parse.Cloud.run("createNotification", { 
                  "userId": friends[i].id,
                  "token": false,
                  "firstName": user.get('firstName'),
                  "channel":"game-requests",
                  "message": "te propose une partie le "+moment(add.state.date).format('llll'),
                  "gameId": game.id,
                  "type": 3,
                   })
              }
            }
          }
        });

      })   
      .then(()=>{
          Alert.alert(
            'Souhaites-tu partager ce challenge à tes ami(e)s hors Tie Break ?',
            '',
            [
              {text: translate.cancel[this.props.user.currentLocale], onPress: () => add.props.navigation.goBack()},
              {text: translate.ok[this.props.user.currentLocale], onPress : () => add._shareFriends()},
            ],
            { cancelable: false }
          )
      })   
      
  }

  _shareFriends() {
    let user = Parse.User.current() || Parse.User.currentAsync();
    let firstName = user.get('firstName');
    let shareOptions = {
      message: firstName + " a créé une partie sur Tie Break le "+moment(this.state.date).format('LLLL')+" ! (http://www.tie-break.fr)",
      title: "Tie Break",
      subject: "Application Tie Break" //  for email
    };
    Share.share(shareOptions)
    .then(this._showResult)
    .catch((error) => this.setState({result: 'error: ' + error.message}));
  }

   _showResult(result) {
    if (result.action === Share.sharedAction) {
      Amplitude.logEvent("Shared Game");
      this.props.navigation.goBack();
    } else {
      Amplitude.logEvent("Refused Share Game");
      this.props.navigation.goBack();
    }
  }

  _onPressValidateButton() {
    if (this.state.surface != null && this.state.selectedConditionIndex != null && this.state.date != null && this.state.selectedClubIndex != null) {

      if (this.state.friends1 || this.state.friends2) {
          Alert.alert(
          translate.confirmTennisCourtBooked[this.props.user.currentLocale],
          moment(this.state.date).format('llll')+' ?',
          [
            {text: translate.no[this.props.user.currentLocale]},
            {text: translate.yes[this.props.user.currentLocale], onPress: () => this._onPressAnswerPositive()},
          ],
          { cancelable: false }
        )
      } else {Alert.alert(translate.NoFriendsToInvite[this.props.user.currentLocale])}
    } else {
      Alert.alert(translate.pleaseCompleteAllInputs[this.props.user.currentLocale]);
    }
  }

  _showDateTimePicker = () => {
    Amplitude.logEvent("DatePicker Button clicked");
    this.setState({ isDateTimePickerVisible: true })
  };

  _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

  _handleDatePicked = (date) => {
    this.setState({ date: date });
    Amplitude.logEvent("Date picked");
    this._hideDateTimePicker();
  };

  _handleSelectClub = (index) => {
    this.setState({selectedClubIndex:index});
    Amplitude.logEvent("Club picked");
  };

  render() {

    const conditions = [translate.indoor[this.props.user.currentLocale], translate.outdoor[this.props.user.currentLocale]];
    const surfaces = [translate.hard[this.props.user.currentLocale], translate.grass[this.props.user.currentLocale], translate.carpet[this.props.user.currentLocale], translate.clay[this.props.user.currentLocale], translate.synthetic[this.props.user.currentLocale]];
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
          this.state.fontAvenirLoaded ? (<Text style={{marginBottom:15, fontFamily: 'AvenirNext', paddingLeft:10}}> {translate.date[this.props.user.currentLocale].toUpperCase()} </Text>
          ) : null 
         }

        <View style={styles.container}>
        <TouchableOpacity onPress={this._showDateTimePicker}>
          <View style={styles.button}>
            <Text style={{color:'white'}}>{ (this.state.date && moment(this.state.date).format('LLLL')) || translate.chooseDate[this.props.user.currentLocale] }</Text>
          </View>
        </TouchableOpacity>
        <DateTimePicker
          isVisible={this.state.isDateTimePickerVisible}
          onConfirm={this._handleDatePicked}
          onCancel={this._hideDateTimePicker}
          mode="datetime"
          minimumDate={minimumDate}
          cancelTextIOS={translate.cancel[this.props.user.currentLocale]}
          confirmTextIOS={translate.validate[this.props.user.currentLocale]}
          titleIOS={translate.chooseDate[this.props.user.currentLocale]}
          locale={this.props.user.currentLocale}
        />
        </View>
        
        {
          this.state.fontAvenirLoaded ? (<Text style={{marginBottom:10, fontFamily: 'AvenirNext', paddingLeft:10}}> {translate.field[this.props.user.currentLocale].toUpperCase()} </Text>
          ) : null 
         }

         {
          this.state.fontAvenirLoaded ? (<Text style={{marginBottom:10, fontFamily: 'Avenir', paddingLeft:10}}> {translate.location[this.props.user.currentLocale]} </Text>
          ) : null 
         }

         {warning}

         <View style={{alignItems:'center', justifyContent:'center'}}>

          <ModalDropdown 
          style={styles.input} 
          dropdownStyle={styles.modalDrop} 
          textStyle={styles.text}
          dropdownTextStyle={styles.text}
          defaultValue={translate.myClubs[this.props.user.currentLocale]}
          options={clubs}
          onSelect={(index, selectedClub) => this._handleSelectClub(index)}
          />

          </View>

          {
          this.state.fontAvenirLoaded ? (<Text style={{marginBottom:10, fontFamily: 'Avenir', paddingLeft:10}}> {translate.conditions[this.props.user.currentLocale]} </Text>
          ) : null 
         }

         <View style={{alignItems:'center', justifyContent:'center'}}>

         <ButtonGroup 
          onPress={(index) => this.setState({selectedConditionIndex:index})}
          selectedIndex={this.state.selectedConditionIndex}
          buttons={conditions}
          textStyle={styles.title}
          selectedBackgroundColor={'rgb(42,127,83)'}
          selectedTextStyle={styles.subtitle}
          containerStyle={styles.courts}
          />
          
          </View>
          
          {
          this.state.fontAvenirLoaded ? (<Text style={{marginBottom:10, fontFamily: 'Avenir', paddingLeft:10}}> {translate.surfaceType[this.props.user.currentLocale]} </Text>
          ) : null 
         }

          <View style={{alignItems:'center', justifyContent:'center'}}>

          <ModalDropdown 
          style={styles.input} 
          dropdownStyle={styles.modalDrop} 
          textStyle={styles.text}
          dropdownTextStyle={styles.text}
          defaultValue={translate.surface[this.props.user.currentLocale]}
          options={surfaces}
          onSelect={(index, surface) => this.setState({surface:index})}
          />

          </View>

          {
          this.state.fontAvenirLoaded ? (<Text style={{marginBottom:10, fontFamily: 'Avenir', paddingLeft:10}}> {translate.price[this.props.user.currentLocale]} </Text>
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
            placeholder={translate.free[this.props.user.currentLocale]}
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
            <TouchableOpacity onPress={this._onPressValidateButton}>
            <Text style={styles.buttonLogIn}>{translate.createGame[this.props.user.currentLocale]}</Text>
            </TouchableOpacity>

          </View>

       
        </View>

    );
  }

}

export default connect(mapStateToProps, mapDispatchToProps) (CreateGameContent);

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
    height:150, 
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
