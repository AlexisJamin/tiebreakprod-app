import React from 'react';
import { StyleSheet, View, Image, Alert, Text, TouchableOpacity, ScrollView, ActivityIndicator, RefreshControl, FlatList } from 'react-native';
import { Font, MapView, Amplitude } from 'expo';
import { List, ListItem } from 'react-native-elements';
import { connect } from 'react-redux';
import { Parse } from 'parse/react-native';

import translate from '../../translate.js';

import moment from 'moment/min/moment-with-locales';

function mapStateToProps(store) {
  return { user: store.user, userClub: store.userClub, game:store.game }
};

function mapDispatchToProps(dispatch) {
  return {
        handleSubmit: function(value) { 
        dispatch( {type: 'user', value: value} ) 
    }
  }
}

class GameViewContent extends React.Component {

  constructor(props) {
    super(props);
    this._onPressAnswerButton = this._onPressAnswerButton.bind(this);
    this._onPressAnswerPositive = this._onPressAnswerPositive.bind(this);
    this._onPressDeleteGame = this._onPressDeleteGame.bind(this);
    this._onPressConfirmDelete = this._onPressConfirmDelete.bind(this);
    this._onPressChoosePartner = this._onPressChoosePartner.bind(this);
    this._onPressConfirmPartner = this._onPressConfirmPartner.bind(this);
    this.renderFooter = this.renderFooter.bind(this);
    this.renderSeparator = this.renderSeparator.bind(this);
    this.renderEmpty = this.renderEmpty.bind(this);
    this.state = {
      fontAvenirNextLoaded:false,
      fontAvenirLoaded:false,
      gameDate:null,
      latitude:0,
      longitude:0,
      clubName:null,
      clubAddress:null,
      gameSurface:null,
      gameCondition:null,
      gamePrice:null,
      partner:null,
      organiser:null,
      canceled:null,
      attendees:null,
      data:null,
      loading:true,
      partnerToken:null,
      organiserToken:null,
    };
    moment.locale(this.props.user.currentLocale);
  }

  componentWillMount() {

   var user = Parse.User.current() || Parse.User.currentAsync();
   //var deviceLocale = await Expo.DangerZone.Localization.getCurrentLocaleAsync();
   var edit = this;
    var query = new Parse.Query("Game");
    query.equalTo('objectId', this.props.game.gameId); 
    query.first({
      success: function(game) {
        var gameDate = game.get('date');
        var gameSurface = game.get('surface');
        var gameCondition = game.get('condition');
        var gamePrice = game.get('price');
        var organiser = game.get('organiser');
        var partner = game.get('partner');
        var canceled = game.get('canceled');
        var attendees = game.get('attendees');
        
        var queryClub = new Parse.Query("Club");
        queryClub.equalTo('objectId', game.get('club').id);
        queryClub.first({
          success: function(club) {
            var clubName = club.get('name');
            var clubAddress = club.get('address');
            var clubGeo = club.get('geopoint');

            edit.setState({
              latitude:clubGeo.latitude, 
              longitude:clubGeo.longitude, 
              gameDate:gameDate,
              clubName:clubName,
              clubAddress:clubAddress,
              gameCondition:gameCondition,
              gameSurface:gameSurface,
              organiser:organiser.id,
              gamePrice:gamePrice,
              partner:partner,
              canceled:canceled,
              attendees:attendees
            })

            // Checks if user is organiser
            if (user.id == organiser.id)  {

              // Checks if there are attendees or partner
              if ( (attendees != undefined && attendees.length>0) || partner!=undefined) {

                // Checks if there are attendees and no partner
                if ( (attendees != undefined) && (attendees.length>0) && (partner == undefined) && !canceled ) {
                  var attendeesContent = [];
                  for (var i = 0; i < attendees.length; i++) {
                    var queryUser = new Parse.Query("User");
                    queryUser.equalTo('objectId', attendees[i].id);
                    queryUser.first({
                      success: function(attendee) {
                        var objectId = attendee.id;
                        var firstName = attendee.get('firstName');
                        var lastName = attendee.get('lastName')[0];
                        var birthday = attendee.get('birthday');
                        if (picture != undefined) {
                          var picture = attendee.get('picture');
                        } else {picture =undefined}
                        var currentLevel = attendee.get('currentLevel');
                        var highestLevel = attendee.get('highestLevel');
                        var expoPushToken = attendee.get("expoPushToken");

                        if (birthday != undefined) {
                          var age = moment().diff(birthday, 'years')+' ' +translate.old[edit.props.user.currentLocale];
                        } else {
                          var age = translate.inc[edit.props.user.currentLocale];
                        }

                        if (currentLevel == undefined) {
                          var currentLevel = translate.inc[edit.props.user.currentLocale];
                        } else if (currentLevel == 0) {
                          var currentLevel = 'Débutant';
                        } else if (currentLevel == 1) {
                          var currentLevel = 'Intermédiaire';
                        } else if (currentLevel == 2) {
                          var currentLevel = 'Avancé';
                        } else if (currentLevel == 3) {
                          var currentLevel = '40';
                        } else if (currentLevel == 4) {
                          var currentLevel = '30/5';
                        } else if (currentLevel == 5) {
                          var currentLevel = '30/4';
                        } else if (currentLevel == 6) {
                          var currentLevel = '30/3';
                        } else if (currentLevel == 7) {
                          var currentLevel = '30/2';
                        } else if (currentLevel == 8) {
                          var currentLevel = '30/1';
                        } else if (currentLevel == 9) {
                          var currentLevel = '30';
                        } else if (currentLevel == 10) {
                          var currentLevel = '15/5';
                        } else if (currentLevel == 11) {
                          var currentLevel = '15/4';
                        } else if (currentLevel == 12) {
                          var currentLevel = '15/3';
                        } else if (currentLevel == 13) {
                          var currentLevel = '15/2';
                        } else if (currentLevel == 14) {
                          var currentLevel = '15/1';
                        } else if (currentLevel == 15) {
                          var currentLevel = '15';
                        } else if (currentLevel == 16) {
                          var currentLevel = '5/6';
                        } else if (currentLevel == 17) {
                          var currentLevel = '4/6';
                        } else if (currentLevel == 18) {
                          var currentLevel = '3/6';
                        } else if (currentLevel == 19) {
                          var currentLevel = '2/6';
                        } else if (currentLevel == 20) {
                          var currentLevel = '1/6';
                        } else if (currentLevel == 21) {
                          var currentLevel = '0';
                        } else if (currentLevel == 22) {
                          var currentLevel = '-2/6';
                        } else if (currentLevel == 23) {
                          var currentLevel = '-4/6';
                        } else if (currentLevel == 24) {
                          var currentLevel = '-15';
                        }

                        if (highestLevel == undefined) {
                          var highestLevel = translate.inc[edit.props.user.currentLocale];
                        } else if (highestLevel == 0) {
                          var highestLevel = 'Débutant';
                        } else if (highestLevel == 1) {
                          var highestLevel = 'Intermédiaire';
                        } else if (highestLevel == 2) {
                          var highestLevel = 'Avancé';
                        } else if (highestLevel == 3) {
                          var highestLevel = '40';
                        } else if (highestLevel == 4) {
                          var highestLevel = '30/5';
                        } else if (highestLevel == 5) {
                          var highestLevel = '30/4';
                        } else if (highestLevel == 6) {
                          var highestLevel = '30/3';
                        } else if (highestLevel == 7) {
                          var highestLevel = '30/2';
                        } else if (highestLevel == 8) {
                          var highestLevel = '30/1';
                        } else if (highestLevel == 9) {
                          var highestLevel = '30';
                        } else if (highestLevel == 10) {
                          var highestLevel = '15/5';
                        } else if (highestLevel == 11) {
                          var highestLevel = '15/4';
                        } else if (highestLevel == 12) {
                          var highestLevel = '15/3';
                        } else if (highestLevel == 13) {
                          var highestLevel = '15/2';
                        } else if (highestLevel == 14) {
                          var highestLevel = '15/1';
                        } else if (highestLevel == 15) {
                          var highestLevel = '15';
                        } else if (highestLevel == 16) {
                          var highestLevel = '5/6';
                        } else if (highestLevel == 17) {
                          var highestLevel = '4/6';
                        } else if (highestLevel == 18) {
                          var highestLevel = '3/6';
                        } else if (highestLevel == 19) {
                          var highestLevel = '2/6';
                        } else if (highestLevel == 20) {
                          var highestLevel = '1/6';
                        } else if (highestLevel == 21) {
                          var highestLevel = '0';
                        } else if (highestLevel == 22) {
                          var highestLevel = '-2/6';
                        } else if (highestLevel == 23) {
                          var highestLevel = '-4/6';
                        } else if (highestLevel == 24) {
                          var highestLevel = '-15';
                        }


                        attendeesContent.push({
                          objectId:objectId,
                          firstName:firstName,
                          lastName:lastName,
                          age:age,
                          picture:picture,
                          currentLevel:currentLevel,
                          highestLevel:highestLevel,
                          token:expoPushToken
                        })
                        edit.setState({data:attendeesContent, loading:false})
                      }
                    });
                  }
                } else if ( partner!=undefined ) {
                  partnerObject = [];

                  var query = new Parse.Query("User");
                      query.equalTo('objectId', partner.id); 
                      query.first({
                        success: function(users) {

                          var objectId = users.id;
                          var firstName = users.get('firstName');
                          var lastName = users.get('lastName')[0];
                          if (picture != undefined) {
                            var picture = users.get('picture');
                          } else {picture =undefined}
                          var currentLevel = users.get('currentLevel');
                          var highestLevel = users.get('highestLevel');
                          var birthday = users.get('birthday');
                          var expoPushToken = users.get("expoPushToken");

                          if (birthday != undefined) {
                            var age = moment().diff(birthday, 'years')+' '+translate.old[edit.props.user.currentLocale];
                          } else {
                            var age = translate.inc[edit.props.user.currentLocale];
                          }

                          if (currentLevel == undefined) {
                            var currentLevel = "inc.";
                          } else if (currentLevel == 0) {
                            var currentLevel = 'Débutant';
                          } else if (currentLevel == 1) {
                            var currentLevel = 'Intermédiaire';
                          } else if (currentLevel == 2) {
                            var currentLevel = 'Avancé';
                          } else if (currentLevel == 3) {
                            var currentLevel = '40';
                          } else if (currentLevel == 4) {
                            var currentLevel = '30/5';
                          } else if (currentLevel == 5) {
                            var currentLevel = '30/4';
                          } else if (currentLevel == 6) {
                            var currentLevel = '30/3';
                          } else if (currentLevel == 7) {
                            var currentLevel = '30/2';
                          } else if (currentLevel == 8) {
                            var currentLevel = '30/1';
                          } else if (currentLevel == 9) {
                            var currentLevel = '30';
                          } else if (currentLevel == 10) {
                            var currentLevel = '15/5';
                          } else if (currentLevel == 11) {
                            var currentLevel = '15/4';
                          } else if (currentLevel == 12) {
                            var currentLevel = '15/3';
                          } else if (currentLevel == 13) {
                            var currentLevel = '15/2';
                          } else if (currentLevel == 14) {
                            var currentLevel = '15/1';
                          } else if (currentLevel == 15) {
                            var currentLevel = '15';
                          } else if (currentLevel == 16) {
                            var currentLevel = '5/6';
                          } else if (currentLevel == 17) {
                            var currentLevel = '4/6';
                          } else if (currentLevel == 18) {
                            var currentLevel = '3/6';
                          } else if (currentLevel == 19) {
                            var currentLevel = '2/6';
                          } else if (currentLevel == 20) {
                            var currentLevel = '1/6';
                          } else if (currentLevel == 21) {
                            var currentLevel = '0';
                          } else if (currentLevel == 22) {
                            var currentLevel = '-2/6';
                          } else if (currentLevel == 23) {
                            var currentLevel = '-4/6';
                          } else if (currentLevel == 24) {
                            var currentLevel = '-15';
                          }

                          if (highestLevel == undefined) {
                            var highestLevel = "inc.";
                          } else if (highestLevel == 0) {
                            var highestLevel = 'Débutant';
                          } else if (highestLevel == 1) {
                            var highestLevel = 'Intermédiaire';
                          } else if (highestLevel == 2) {
                            var highestLevel = 'Avancé';
                          } else if (highestLevel == 3) {
                            var highestLevel = '40';
                          } else if (highestLevel == 4) {
                            var highestLevel = '30/5';
                          } else if (highestLevel == 5) {
                            var highestLevel = '30/4';
                          } else if (highestLevel == 6) {
                            var highestLevel = '30/3';
                          } else if (highestLevel == 7) {
                            var highestLevel = '30/2';
                          } else if (highestLevel == 8) {
                            var highestLevel = '30/1';
                          } else if (highestLevel == 9) {
                            var highestLevel = '30';
                          } else if (highestLevel == 10) {
                            var highestLevel = '15/5';
                          } else if (highestLevel == 11) {
                            var highestLevel = '15/4';
                          } else if (highestLevel == 12) {
                            var highestLevel = '15/3';
                          } else if (highestLevel == 13) {
                            var highestLevel = '15/2';
                          } else if (highestLevel == 14) {
                            var highestLevel = '15/1';
                          } else if (highestLevel == 15) {
                            var highestLevel = '15';
                          } else if (highestLevel == 16) {
                            var highestLevel = '5/6';
                          } else if (highestLevel == 17) {
                            var highestLevel = '4/6';
                          } else if (highestLevel == 18) {
                            var highestLevel = '3/6';
                          } else if (highestLevel == 19) {
                            var highestLevel = '2/6';
                          } else if (highestLevel == 20) {
                            var highestLevel = '1/6';
                          } else if (highestLevel == 21) {
                            var highestLevel = '0';
                          } else if (highestLevel == 22) {
                            var highestLevel = '-2/6';
                          } else if (highestLevel == 23) {
                            var highestLevel = '-4/6';
                          } else if (highestLevel == 24) {
                            var highestLevel = '-15';
                          }

                          partnerObject.push({
                            objectId:objectId,
                            firstName:firstName,
                            lastName:lastName,
                            age:age,
                            picture:picture,
                            currentLevel:currentLevel,
                            highestLevel:highestLevel,
                            token:expoPushToken
                          })

                          edit.setState({data:partnerObject, loading:false, partnerToken:expoPushToken})
                        }
                      });

                } else {edit.setState({loading:false})}
                
              } else {
                edit.setState({loading:false})
              }
            } else {
              organiserObject = [];

              var query = new Parse.Query("User");
                  query.equalTo('objectId', organiser.id); 
                  query.first({
                    success: function(user) {

                      var objectId = user.get('objectId');
                      var firstName = user.get('firstName');
                      var lastName = user.get('lastName')[0];
                      if (picture != undefined) {
                        var picture = user.get('picture');
                      } else {picture =undefined}
                      var currentLevel = user.get('currentLevel');
                      var highestLevel = user.get('highestLevel');
                      var birthday = user.get('birthday');
                      var expoPushToken = user.get("expoPushToken");

                      if (birthday != undefined) {
                        var age = moment().diff(birthday, 'years')+' '+translate.old[edit.props.user.currentLocale];
                      } else {
                        var age = translate.inc[edit.props.user.currentLocale];
                      }

                      if (currentLevel == undefined) {
                        var currentLevel = "inc.";
                      } else if (currentLevel == 0) {
                        var currentLevel = 'Débutant';
                      } else if (currentLevel == 1) {
                        var currentLevel = 'Intermédiaire';
                      } else if (currentLevel == 2) {
                        var currentLevel = 'Avancé';
                      } else if (currentLevel == 3) {
                        var currentLevel = '40';
                      } else if (currentLevel == 4) {
                        var currentLevel = '30/5';
                      } else if (currentLevel == 5) {
                        var currentLevel = '30/4';
                      } else if (currentLevel == 6) {
                        var currentLevel = '30/3';
                      } else if (currentLevel == 7) {
                        var currentLevel = '30/2';
                      } else if (currentLevel == 8) {
                        var currentLevel = '30/1';
                      } else if (currentLevel == 9) {
                        var currentLevel = '30';
                      } else if (currentLevel == 10) {
                        var currentLevel = '15/5';
                      } else if (currentLevel == 11) {
                        var currentLevel = '15/4';
                      } else if (currentLevel == 12) {
                        var currentLevel = '15/3';
                      } else if (currentLevel == 13) {
                        var currentLevel = '15/2';
                      } else if (currentLevel == 14) {
                        var currentLevel = '15/1';
                      } else if (currentLevel == 15) {
                        var currentLevel = '15';
                      } else if (currentLevel == 16) {
                        var currentLevel = '5/6';
                      } else if (currentLevel == 17) {
                        var currentLevel = '4/6';
                      } else if (currentLevel == 18) {
                        var currentLevel = '3/6';
                      } else if (currentLevel == 19) {
                        var currentLevel = '2/6';
                      } else if (currentLevel == 20) {
                        var currentLevel = '1/6';
                      } else if (currentLevel == 21) {
                        var currentLevel = '0';
                      } else if (currentLevel == 22) {
                        var currentLevel = '-2/6';
                      } else if (currentLevel == 23) {
                        var currentLevel = '-4/6';
                      } else if (currentLevel == 24) {
                        var currentLevel = '-15';
                      }

                      if (highestLevel == undefined) {
                        var highestLevel = "inc.";
                      } else if (highestLevel == 0) {
                        var highestLevel = 'Débutant';
                      } else if (highestLevel == 1) {
                        var highestLevel = 'Intermédiaire';
                      } else if (highestLevel == 2) {
                        var highestLevel = 'Avancé';
                      } else if (highestLevel == 3) {
                        var highestLevel = '40';
                      } else if (highestLevel == 4) {
                        var highestLevel = '30/5';
                      } else if (highestLevel == 5) {
                        var highestLevel = '30/4';
                      } else if (highestLevel == 6) {
                        var highestLevel = '30/3';
                      } else if (highestLevel == 7) {
                        var highestLevel = '30/2';
                      } else if (highestLevel == 8) {
                        var highestLevel = '30/1';
                      } else if (highestLevel == 9) {
                        var highestLevel = '30';
                      } else if (highestLevel == 10) {
                        var highestLevel = '15/5';
                      } else if (highestLevel == 11) {
                        var highestLevel = '15/4';
                      } else if (highestLevel == 12) {
                        var highestLevel = '15/3';
                      } else if (highestLevel == 13) {
                        var highestLevel = '15/2';
                      } else if (highestLevel == 14) {
                        var highestLevel = '15/1';
                      } else if (highestLevel == 15) {
                        var highestLevel = '15';
                      } else if (highestLevel == 16) {
                        var highestLevel = '5/6';
                      } else if (highestLevel == 17) {
                        var highestLevel = '4/6';
                      } else if (highestLevel == 18) {
                        var highestLevel = '3/6';
                      } else if (highestLevel == 19) {
                        var highestLevel = '2/6';
                      } else if (highestLevel == 20) {
                        var highestLevel = '1/6';
                      } else if (highestLevel == 21) {
                        var highestLevel = '0';
                      } else if (highestLevel == 22) {
                        var highestLevel = '-2/6';
                      } else if (highestLevel == 23) {
                        var highestLevel = '-4/6';
                      } else if (highestLevel == 24) {
                        var highestLevel = '-15';
                      }


                      organiserObject.push({
                        objectId:objectId,
                        firstName:firstName,
                        lastName:lastName,
                        age:age,
                        picture:picture,
                        currentLevel:currentLevel,
                        highestLevel:highestLevel,
                        token:expoPushToken
                      })

                      edit.setState({data:organiserObject, loading:false, organiserToken:expoPushToken})

                    }
                  });
            }

          }
        });

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
    Amplitude.logEvent("Confirm Wish Participate Button clicked");
      var add = this;
      var user = Parse.User.current() || Parse.User.currentAsync();
      if (this.state.attendees == undefined) {
        var attendeesCopy = []
        attendeesCopy.push({"__type":"Pointer","className":"_User","objectId":user.id});
      } else {
        var attendeesCopy = this.state.attendees.concat();
        attendeesCopy.push({"__type":"Pointer","className":"_User","objectId":user.id});
      }
      var query = new Parse.Query("Game");
      query.equalTo('objectId', this.props.game.gameId); 
      query.first({
        success: function(game) {
          game.set('attendees', attendeesCopy);
          game.save();

          Parse.Cloud.run("createNotification", { 
            "userId":add.state.organiser,
            "token": add.state.organiserToken,
            "firstName": user.get('firstName'),
            "channel":"game-requests",
            "message":"aimerait participer à ta partie le "+moment(add.state.date).format('llll'),
            "gameId":add.props.game.gameId,
            "type":7,
             })

          add.setState({attendees:attendeesCopy})
        }
      });
  }

  _onPressConfirmDelete() {
    Amplitude.logEvent("Confirm Delete Game Button clicked");
      var add = this;
      var user = Parse.User.current() || Parse.User.currentAsync();
      if ( this.state.partner && (user.id == this.state.partner.id) ) {
        var query = new Parse.Query("Game");
        query.equalTo('objectId', this.props.game.gameId); 
        query.first({
          success: function(game) {
            game.set('canceled', true);
            game.save();

            Parse.Cloud.run("createNotification", { 
              "userId":add.state.organiser,
              "token": add.state.organiserToken,
              "firstName": user.get('firstName'),
              "channel":"game-requests",
              "message":"a annulé votre partie le "+moment(add.state.date).format('llll'),
              "gameId":add.props.game.gameId,
              "type":6,
               })

            add.setState({canceled:true})
          }
        });
      } else if ( (user.id == this.state.organiser) && (this.state.partner != undefined) ) {
        var query = new Parse.Query("Game");
        query.equalTo('objectId', this.props.game.gameId); 
        query.first({
          success: function(game) {
            game.set('canceled', true);
            game.save();

            Parse.Cloud.run("createNotification", { 
              "userId":add.state.partner.id,
              "token": add.state.partnerToken,
              "firstName": user.get('firstName'),
              "channel":"game-requests",
              "message":"a annulé votre partie le "+moment(add.state.date).format('llll'),
              "gameId":add.props.game.gameId,
              "type":6,
               })

            add.setState({canceled:true})
          }
        });
      } else if ( (user.id == this.state.organiser) && (this.state.partner == undefined) ) {
        var query = new Parse.Query("Game");
        query.equalTo('objectId', this.props.game.gameId); 
        query.first({
          success: function(game) {
            game.set('canceled', true);
            game.set('attendees', []);
            game.save();
            add.setState({canceled:true, attendees:null, data:null})
          }
        });
      }
}

  _onPressDeleteGame() {
    Amplitude.logEvent("Delete Game Button clicked");
      Alert.alert(
        'Vous confirmez vouloir annuler cette partie ?',
        '',
        [
          {text: 'Non'},
          {text: 'Oui', onPress: () => this._onPressConfirmDelete()},
        ],
        { cancelable: false }
      ) 
  }


  _onPressAnswerButton() {
      Alert.alert(
        'Vous confirmez vouloir participer à cette partie ?',
        '',
        [
          {text: 'Non'},
          {text: 'Oui', onPress: () => this._onPressAnswerPositive()},
        ],
        { cancelable: false }
      ) 
  }

  _onPressChoosePartner(id, firstName, lastName, token) {
    const date = new Date();
    Amplitude.logEvent("Choose Partner Button clicked");
    const user = Parse.User.current() || Parse.User.currentAsync();
    if ( (this.state.organiser == user.id) && (this.state.partner == undefined) && (this.state.gameDate>date) ) {
        Alert.alert(
        'Vous confirmez vouloir jouer avec : '+firstName+' '+lastName+'.'+' ?',
        '',
        [
          {text: translate.no[this.props.user.currentLocale]},
          {text: translate.yes[this.props.user.currentLocale], onPress: () => this._onPressConfirmPartner(id, firstName, token)},
        ],
        { cancelable: false }
      ) 
    } 
}

  _onPressConfirmPartner(id, firstName, token) {
    Amplitude.logEvent("Confirm Partner Button clicked");
    var add = this;
    var query = new Parse.Query("Game");
    query.equalTo('objectId', this.props.game.gameId); 
    query.first({
      success: function(game) {
        game.set('partner', {"__type":"Pointer","className":"_User","objectId":id});
        game.set('attendees', []);
        game.save();
        Parse.Cloud.run("createNotification", { 
          "userId":id,
          "token": token,
          "firstName": firstName,
          "channel":"game-requests",
          "message":"a accepté ta proposition de partie le "+moment(add.state.date).format('llll'),
          "gameId":add.props.game.gameId,
          "type":4,
           })

        partnerObject = [];

        var query = new Parse.Query("User");
        query.equalTo('objectId', id); 
        query.first({
          success: function(users) {

            var objectId = users.id;
            var firstName = users.get('firstName');
            var lastName = users.get('lastName')[0];
            if (picture != undefined) {
              var picture = users.get('picture');
            } else {picture =undefined}
            var currentLevel = users.get('currentLevel');
            var highestLevel = users.get('highestLevel');
            var birthday = users.get('birthday');
            var expoPushToken = users.get("expoPushToken");

            if (birthday != undefined) {
              var age = moment().diff(birthday, 'years')+' '+translate.old[add.props.user.currentLocale];
            } else {
              var age = translate.inc[add.props.user.currentLocale];
            }

            if (currentLevel == undefined) {
              var currentLevel = "inc.";
            } else if (currentLevel == 0) {
              var currentLevel = 'Débutant';
            } else if (currentLevel == 1) {
              var currentLevel = 'Intermédiaire';
            } else if (currentLevel == 2) {
              var currentLevel = 'Avancé';
            } else if (currentLevel == 3) {
              var currentLevel = '40';
            } else if (currentLevel == 4) {
              var currentLevel = '30/5';
            } else if (currentLevel == 5) {
              var currentLevel = '30/4';
            } else if (currentLevel == 6) {
              var currentLevel = '30/3';
            } else if (currentLevel == 7) {
              var currentLevel = '30/2';
            } else if (currentLevel == 8) {
              var currentLevel = '30/1';
            } else if (currentLevel == 9) {
              var currentLevel = '30';
            } else if (currentLevel == 10) {
              var currentLevel = '15/5';
            } else if (currentLevel == 11) {
              var currentLevel = '15/4';
            } else if (currentLevel == 12) {
              var currentLevel = '15/3';
            } else if (currentLevel == 13) {
              var currentLevel = '15/2';
            } else if (currentLevel == 14) {
              var currentLevel = '15/1';
            } else if (currentLevel == 15) {
              var currentLevel = '15';
            } else if (currentLevel == 16) {
              var currentLevel = '5/6';
            } else if (currentLevel == 17) {
              var currentLevel = '4/6';
            } else if (currentLevel == 18) {
              var currentLevel = '3/6';
            } else if (currentLevel == 19) {
              var currentLevel = '2/6';
            } else if (currentLevel == 20) {
              var currentLevel = '1/6';
            } else if (currentLevel == 21) {
              var currentLevel = '0';
            } else if (currentLevel == 22) {
              var currentLevel = '-2/6';
            } else if (currentLevel == 23) {
              var currentLevel = '-4/6';
            } else if (currentLevel == 24) {
              var currentLevel = '-15';
            }

            if (highestLevel == undefined) {
              var highestLevel = "inc.";
            } else if (highestLevel == 0) {
              var highestLevel = 'Débutant';
            } else if (highestLevel == 1) {
              var highestLevel = 'Intermédiaire';
            } else if (highestLevel == 2) {
              var highestLevel = 'Avancé';
            } else if (highestLevel == 3) {
              var highestLevel = '40';
            } else if (highestLevel == 4) {
              var highestLevel = '30/5';
            } else if (highestLevel == 5) {
              var highestLevel = '30/4';
            } else if (highestLevel == 6) {
              var highestLevel = '30/3';
            } else if (highestLevel == 7) {
              var highestLevel = '30/2';
            } else if (highestLevel == 8) {
              var highestLevel = '30/1';
            } else if (highestLevel == 9) {
              var highestLevel = '30';
            } else if (highestLevel == 10) {
              var highestLevel = '15/5';
            } else if (highestLevel == 11) {
              var highestLevel = '15/4';
            } else if (highestLevel == 12) {
              var highestLevel = '15/3';
            } else if (highestLevel == 13) {
              var highestLevel = '15/2';
            } else if (highestLevel == 14) {
              var highestLevel = '15/1';
            } else if (highestLevel == 15) {
              var highestLevel = '15';
            } else if (highestLevel == 16) {
              var highestLevel = '5/6';
            } else if (highestLevel == 17) {
              var highestLevel = '4/6';
            } else if (highestLevel == 18) {
              var highestLevel = '3/6';
            } else if (highestLevel == 19) {
              var highestLevel = '2/6';
            } else if (highestLevel == 20) {
              var highestLevel = '1/6';
            } else if (highestLevel == 21) {
              var highestLevel = '0';
            } else if (highestLevel == 22) {
              var highestLevel = '-2/6';
            } else if (highestLevel == 23) {
              var highestLevel = '-4/6';
            } else if (highestLevel == 24) {
              var highestLevel = '-15';
            }

            partnerObject.push({
              objectId:objectId,
              firstName:firstName,
              lastName:lastName,
              age:age,
              picture:picture,
              currentLevel:currentLevel,
              highestLevel:highestLevel,
              token:expoPushToken
            })

            add.setState({partner:{"__type":"Pointer","className":"_User","objectId":id}, attendees:null, data:partnerObject})
          }
        });
      }
    });
  }

 renderSeparator() {
      return (<View
        style={{
          height: 1,
          width: "100%",
          backgroundColor: "#CED0CE",
        }}
      /> 
      );
  }

  renderFooter() {
    if (!this.state.loading) return null;
    return (
      <View
        style={{
          paddingVertical: 20,
          borderTopWidth: 1,
          borderColor: "#CED0CE"
        }}
      >
        <ActivityIndicator animating size="large" />
      </View>
    );
  }

  renderEmpty() {
    var date = new Date();
    if (this.state.loading) return null;
    if (!this.state.canceled && (this.state.gameDate>date) ) return (
      <Text style={{paddingLeft:10}}> {translate.noParticipants[this.props.user.currentLocale]} </Text>
    );
    return null;
  }

  render() {

      const {latitude} = this.state;
      const {longitude} = this.state;
      const {gameDate} = this.state;
      const {clubName} = this.state;
      const {clubAddress} = this.state;
      const {gameCondition} = this.state;
      const {gameSurface} = this.state;
      const {organiser} = this.state;
      const {attendeesContent} = this.state;
      const {attendees} = this.state;
      const {organiserFirstName} = this.state;
      const {organiserLastName} = this.state;
      const {organiserPicture} = this.state;
      const {organiserAge} = this.state;
      const {canceled} = this.state;
      const {partner} = this.state;
      const user = Parse.User.current() || Parse.User.currentAsync();
      const date = new Date();
      var edit = this;

      if (gameCondition == 'outside') {
        var imageCondition = <Image style={{marginBottom:5}} source={require('../../assets/icons/Conditions/Exterior.imageset/pic.png')}/>;
        var textCondition = translate.outdoor[this.props.user.currentLocale];
      } else if (gameCondition == 'inside') {
        var imageCondition = <Image style={{marginBottom:5}} source={require('../../assets/icons/Conditions/Interior.imageset/indoor.png')}/>;
        var textCondition = translate.indoor[this.props.user.currentLocale];
      }

      if (gameSurface == 'hard') {
        var imageSurface = <Image style={{marginBottom:5}} source={require('../../assets/icons/Terrains/DurTerrain.imageset/img_dur.png')}/>;
        var textSurface = translate.hard[this.props.user.currentLocale];
      } else if (gameSurface == 'grass') {
        var imageSurface = <Image style={{marginBottom:5}} source={require('../../assets/icons/Terrains/GazonTerrain.imageset/img_gazon.png')}/>;
        var textSurface = translate.grass[this.props.user.currentLocale];
      } else if (gameSurface == 'carpet') {
        var imageSurface = <Image style={{marginBottom:5}} source={require('../../assets/icons/Terrains/MoquetteTerrain.imageset/img_moquette.png')}/>;
        var textSurface = translate.carpet[this.props.user.currentLocale];
      } else if (gameSurface == 'synthetic') {
        var imageSurface = <Image style={{marginBottom:5}} source={require('../../assets/icons/Terrains/SynthTerrain.imageset/img_synth.png')}/>;
        var textSurface = translate.synthetic[this.props.user.currentLocale];
      } else if (gameSurface == 'clay') {
        var imageSurface = <Image style={{marginBottom:5}} source={require('../../assets/icons/Terrains/TerreTerrain.imageset/img_terre.png')}/>;
        var textSurface = translate.clay[this.props.user.currentLocale];
      }

      if ( organiser && (organiser == user.id) && (partner == undefined) && (gameDate>date) && !canceled ) {
        var title = translate.confirmPartner[this.props.user.currentLocale];
        var hideChevron = false;
      } else if ( organiser && (organiser == user.id) && (partner != undefined) ) {
        var title = translate.partner[this.props.user.currentLocale];
        var hideChevron = true;
      } else if ( organiser && (organiser != user.id) ) {
        var title = translate.gameCreator[this.props.user.currentLocale];
        var hideChevron = true;
      }

      var contains = function(element) {
          return element.objectId == user.id;
        };

      if ( attendees && (attendees != undefined) && (attendees.length > 0) ) {
        var isAttendee = attendees.some(contains);
      }

      if (canceled) {
          var button = (
          <View style={{
            flexDirection:'column',
            justifyContent:'center',
            alignItems:'stretch'
             }}>
            <Text style={styles.buttonLogIn}>Partie annulée</Text>
          </View>
          );
        } else if ( (organiser && (user.id == organiser) && (gameDate>date) ) || ( partner && (partner!=undefined) && (user.id == partner.id) && (gameDate>date) ) ) {
          var button = (
          <View style={{
            flexDirection:'column',
            justifyContent:'center',
            alignItems:'stretch'
             }}>
            <TouchableOpacity onPress={this._onPressDeleteGame}>
            <Text style={styles.buttonLogIn}>{translate.cancelGame[this.props.user.currentLocale]}</Text>
            </TouchableOpacity>
          </View>
          );
        } else if ( organiser && (partner==undefined) && (user.id != organiser) && !isAttendee && (gameDate>date)) {
          var button = (
          <View style={{
            flexDirection:'column',
            justifyContent:'center',
            alignItems:'stretch'
             }}>
            <TouchableOpacity onPress={this._onPressAnswerButton}>
            <Text style={styles.buttonLogIn}>{translate.participateGame[this.props.user.currentLocale]}</Text>
            </TouchableOpacity>
          </View>
          );
        } else if ( organiser && (partner==undefined) && (user.id != organiser) && isAttendee && (gameDate>date)) {
          var button = (
          <View style={{
            flexDirection:'column',
            justifyContent:'center',
            alignItems:'stretch'
             }}>
            <TouchableOpacity onPress={this._onPressAnswerButton}>
            <Text style={styles.buttonLogIn}>{translate.waiting[this.props.user.currentLocale]}</Text>
            </TouchableOpacity>
          </View>
          );
        } else if ( organiser && (partner!=undefined) && (user.id != organiser) && (user.id != partner.id) && (gameDate>date) ) {
          var button = (
          <View style={{
            flexDirection:'column',
            justifyContent:'center',
            alignItems:'stretch'
             }}>
            <Text style={styles.buttonLogIn}>{translate.gameFull[this.props.user.currentLocale]}</Text>
          </View>
          );
        }


    return (

      <View style={{flex:1, backgroundColor:'white'}}>

        <ScrollView>

        <View style={styles.page}>

         {
          this.state.fontAvenirLoaded ? (<Text style={{marginBottom:15, fontFamily: 'AvenirNext', paddingLeft:10}}> {translate.date[this.props.user.currentLocale].toUpperCase()} </Text>
          ) : null 
         }

         {
          this.state.fontAvenirLoaded ? (<View style={{marginBottom:15}}>
            <Text style={{fontFamily: 'Avenir', paddingLeft:10}}> {translate.on[this.props.user.currentLocale]} {moment(this.state.gameDate).format('LLLL')} </Text>
             <Text style={{fontFamily: 'Avenir', paddingLeft:10}}> {translate.price[this.props.user.currentLocale]} : {this.state.gamePrice} € </Text>
            </View>
          ) : null 
         }
        
        {
          this.state.fontAvenirLoaded ? (<Text style={{marginBottom:10, fontFamily: 'AvenirNext', paddingLeft:10}}> {translate.location[this.props.user.currentLocale].toUpperCase()} </Text>
          ) : null 
         }

         {
          this.state.fontAvenirLoaded ? (<View style={{marginBottom:15}}>
            <Text style={{fontFamily: 'Avenir', paddingLeft:10}}> {clubName} </Text>
            <Text style={{fontFamily: 'Avenir', paddingLeft:10}}> {clubAddress} </Text>
            </View>
          ) : null 
         }

         <View style={{alignItems:'center', marginBottom:15}}>
           <MapView
            style={{width:300, height:150}}
            region={{
              latitude: this.state.latitude,
              longitude: this.state.longitude,
              latitudeDelta:0.003,
              longitudeDelta:0.003,
            }}>
              <MapView.Marker
                coordinate={{
                  latitude: this.state.latitude,
                  longitude: this.state.longitude}}
                image={require('../../assets/icons/AppSpecific/Pin.imageset/fill119.png')}
              />
           </MapView>
        </View>

          {
          this.state.fontAvenirLoaded ? (<Text style={{marginBottom:15, fontFamily: 'AvenirNext', paddingLeft:10}}> {translate.field[this.props.user.currentLocale].toUpperCase()} </Text>
          ) : null 
         }

         <View style={{flexDirection:'row', justifyContent:'flex-start', marginBottom:15}}>
           <View style={{paddingLeft:20, alignItems:'center'}}>
           {imageSurface}
           <Text> {textSurface} </Text>
           </View>

           <View style={{paddingLeft:40, alignItems:'center'}}>
           {imageCondition}
           <Text> {textCondition} </Text>
           </View>
        </View>

          {
          this.state.fontAvenirLoaded ? (<Text style={{fontFamily: 'AvenirNext', paddingLeft:10, marginBottom:-10}}> {title} </Text>
          ) : null 
         }

           <List
           containerStyle={{borderTopWidth:0, borderBottomWidth:0}}
           >
              <FlatList
                data={this.state.data}
                extraData={this.state}
                keyExtractor={item => item.objectId}
                ItemSeparatorComponent={this.renderSeparator}
                ListFooterComponent={this.renderFooter}
                ListEmptyComponent={this.renderEmpty}
                renderItem={({ item }) => (
                  <ListItem
                  avatarStyle={{width:40, height:40, borderRadius:20, borderWidth:1, borderColor:'white', overflow:'hidden', backgroundColor:'white'}}
                  avatarContainerStyle={{width:40, height:40}}
                  avatarOverlayContainerStyle={{backgroundColor:'transparent'}}
                  titleContainerStyle={{marginLeft:15, marginTop:3}}
                  containerStyle={{ borderBottomWidth:0, height:60, justifyContent:'center'}}
                  avatar={ ( item.picture && { uri : item.picture.url } )  || require('../../assets/icons/General/Placeholder.imageset/3639e848-bc9c-11e6-937b-fa2a206349a2.png') }
                  title={<Text style={{fontSize:12, fontWeight:'bold'}}>{item.firstName} {item.lastName}. ({item.age})</Text>}
                  subtitleNumberOfLines={1}
                  subtitleContainerStyle={{marginLeft:15, width:300}}
                  subtitle={<Text style={{fontSize:12, paddingTop:2}}>{item.currentLevel} ({item.highestLevel})</Text>}
                  hideChevron={{hideChevron}}
                  onPress={()=>{this._onPressChoosePartner(item.objectId, item.firstName, item.lastName, item.token)}}
                  />
                )}
              />
            </List>

        
          </View>

         </ScrollView>
          
         {button}

       
        </View>

    );
  }

}

export default connect(mapStateToProps, mapDispatchToProps) (GameViewContent);

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
  }
});
