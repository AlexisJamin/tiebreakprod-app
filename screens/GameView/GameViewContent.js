import React from 'react';
import { StyleSheet, View, Image, Alert, Text, TouchableWithoutFeedback, ScrollView } from 'react-native';
import { Font, MapView } from 'expo';
import { ButtonGroup } from 'react-native-elements';
import { connect } from 'react-redux';
import { Parse } from 'parse/react-native';

Parse.initialize("3E8CAAOTf6oi3NaL6z8oVVJ7wvtfKa");
Parse.serverURL = 'https://tiebreak.herokuapp.com/parse';

import moment from 'moment';
import 'moment/locale/fr';

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
      organiser:null,
      gamePrice:null,
      partner:null,
      canceled:null,
      attendees:null,
    };
  }

  componentWillMount() {

   var user = Parse.User.current();
   moment.locale('fr');
   //var deviceLocale = await Expo.Util.getCurrentLocaleAsync();
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
              organiser:organiser,
              gamePrice:gamePrice,
              partner:partner,
              canceled:canceled,
              attendees:attendees,
            })

            if (user.id == organiser.id )  {
            console.log('user.id == organiser.id');

            var title = 'Participants';

            if (attendees>0) {
              var content = [];
              for (var i = 0; i < attendees.length; i++) {
                var query = new Parse.Query("User");
                query.equalTo('objectId', attendees[i].objectId);
                queryClub.first({
                  success: function(attendee) {
                    var attendeeFirstName = attendee.get('firstName');
                    var attendeeLastName = attendee.get('lastName');
                    var attendeeBirthday = attendee.get('birthday');
                    var attendeePicture = attendee.get('picture');

                    moment.locale('fr');
                    if (attendeeBirthday != undefined) {
                      var age = moment().diff(attendeeBirthday, 'years')+' ans';
                    } else {
                      var age = 'inc.';
                    }

                    if (attendee.get('currentLevel') == undefined) {
                      var attendeeCurrentLevel = "inc.";
                    } else if (attendee.get('currentLevel') == 0) {
                      var attendeeCurrentLevel = 'Débutant';
                    } else if (attendee.get('currentLevel') == 1) {
                      var attendeeCurrentLevel = 'Intermédiaire';
                    } else if (attendee.get('currentLevel') == 2) {
                      var attendeeCurrentLevel = 'Avancé';
                    } else if (attendee.get('currentLevel') == 3) {
                      var attendeeCurrentLevel = '40';
                    } else if (attendee.get('currentLevel') == 4) {
                      var attendeeCurrentLevel = '30/5';
                    } else if (attendee.get('currentLevel') == 5) {
                      var attendeeCurrentLevel = '30/4';
                    } else if (attendee.get('currentLevel') == 6) {
                      var attendeeCurrentLevel = '30/3';
                    } else if (attendee.get('currentLevel') == 7) {
                      var attendeeCurrentLevel = '30/2';
                    } else if (attendee.get('currentLevel') == 8) {
                      var attendeeCurrentLevel = '30/1';
                    } else if (attendee.get('currentLevel') == 9) {
                      var attendeeCurrentLevel = '30';
                    } else if (attendee.get('currentLevel') == 10) {
                      var attendeeCurrentLevel = '15/5';
                    } else if (attendee.get('currentLevel') == 11) {
                      var attendeeCurrentLevel = '15/4';
                    } else if (attendee.get('currentLevel') == 12) {
                      var attendeeCurrentLevel = '15/3';
                    } else if (attendee.get('currentLevel') == 13) {
                      var attendeeCurrentLevel = '15/2';
                    } else if (attendee.get('currentLevel') == 14) {
                      var attendeeCurrentLevel = '15/1';
                    } else if (attendee.get('currentLevel') == 15) {
                      var attendeeCurrentLevel = '15';
                    } else if (attendee.get('currentLevel') == 16) {
                      var attendeeCurrentLevel = '5/6';
                    } else if (attendee.get('currentLevel') == 17) {
                      var attendeeCurrentLevel = '4/6';
                    } else if (attendee.get('currentLevel') == 18) {
                      var attendeeCurrentLevel = '3/6';
                    } else if (attendee.get('currentLevel') == 19) {
                      var attendeeCurrentLevel = '2/6';
                    } else if (attendee.get('currentLevel') == 20) {
                      var attendeeCurrentLevel = '1/6';
                    } else if (attendee.get('currentLevel') == 21) {
                      var attendeeCurrentLevel = '0';
                    } else if (attendee.get('currentLevel') == 22) {
                      var attendeeCurrentLevel = '-2/6';
                    } else if (attendee.get('currentLevel') == 23) {
                      var attendeeCurrentLevel = '-4/6';
                    } else if (attendee.get('currentLevel') == 24) {
                      var attendeeCurrentLevel = '-15';
                    }

                    if (attendee.get('highestLevel') == undefined) {
                      var attendeeHighestLevel = "inc.";
                    } else if (attendee.get('highestLevel') == 0) {
                      var attendeeHighestLevel = 'Débutant';
                    } else if (attendee.get('highestLevel') == 1) {
                      var attendeeHighestLevel = 'Intermédiaire';
                    } else if (attendee.get('highestLevel') == 2) {
                      var attendeeHighestLevel = 'Avancé';
                    } else if (attendee.get('highestLevel') == 3) {
                      var attendeeHighestLevel = '40';
                    } else if (attendee.get('highestLevel') == 4) {
                      var attendeeHighestLevel = '30/5';
                    } else if (attendee.get('highestLevel') == 5) {
                      var attendeeHighestLevel = '30/4';
                    } else if (attendee.get('highestLevel') == 6) {
                      var attendeeHighestLevel = '30/3';
                    } else if (attendee.get('highestLevel') == 7) {
                      var attendeeHighestLevel = '30/2';
                    } else if (attendee.get('highestLevel') == 8) {
                      var attendeeHighestLevel = '30/1';
                    } else if (attendee.get('highestLevel') == 9) {
                      var attendeeHighestLevel = '30';
                    } else if (attendee.get('highestLevel') == 10) {
                      var attendeeHighestLevel = '15/5';
                    } else if (attendee.get('highestLevel') == 11) {
                      var attendeeHighestLevel = '15/4';
                    } else if (attendee.get('highestLevel') == 12) {
                      var attendeeHighestLevel = '15/3';
                    } else if (attendee.get('highestLevel') == 13) {
                      var attendeeHighestLevel = '15/2';
                    } else if (attendee.get('highestLevel') == 14) {
                      var attendeeHighestLevel = '15/1';
                    } else if (attendee.get('highestLevel') == 15) {
                      var attendeeHighestLevel = '15';
                    } else if (attendee.get('highestLevel') == 16) {
                      var attendeeHighestLevel = '5/6';
                    } else if (attendee.get('highestLevel') == 17) {
                      var attendeeHighestLevel = '4/6';
                    } else if (attendee.get('highestLevel') == 18) {
                      var attendeeHighestLevel = '3/6';
                    } else if (attendee.get('highestLevel') == 19) {
                      var attendeeHighestLevel = '2/6';
                    } else if (attendee.get('highestLevel') == 20) {
                      var attendeeHighestLevel = '1/6';
                    } else if (attendee.get('highestLevel') == 21) {
                      var attendeeHighestLevel = '0';
                    } else if (attendee.get('highestLevel') == 22) {
                      var attendeeHighestLevel = '-2/6';
                    } else if (attendee.get('highestLevel') == 23) {
                      var attendeeHighestLevel = '-4/6';
                    } else if (attendee.get('highestLevel') == 24) {
                      var attendeeHighestLevel = '-15';
                    }

                    /*content.push(
                      <View style={{flexDirection:'row', justifyContent:'space-between', marginBottom:15, paddingLeft:20, paddingRight:20}}>
                        <View style={{flexDirection:'row'}}>
                          <Image 
                          style={{width:30, height:30, borderRadius:15}} 
                          source={  ( attendeePicture!=null && { uri : attendeePicture } ) || require('../../assets/icons/General/Placeholder.imageset/3639e848-bc9c-11e6-937b-fa2a206349a2.png') } 
                          />
                          {
                          edit.state.fontAvenirLoaded ? (<View style={{flexDirection:'row', paddingTop:7, paddingLeft:10}}>
                             <Text style={{fontFamily: 'Avenir', fontWeight:'bold'}}> {attendeeFirstName} </Text>
                             <Text style={{fontFamily: 'Avenir', fontWeight:'bold'}}> {attendeeLastName}. </Text>
                             <Text style={{fontFamily: 'Avenir'}}> ({age}) </Text>
                           </View>
                          ) : null 
                         }
                        </View>
                        <View style={{flexDirection:'row'}}>
                         <Image style={{marginTop:8, marginRight:0, marginLeft:5}} source={require('../../assets/icons/Profile/Level.imageset/icRank.png')} />
                         {
                          edit.state.fontAvenirLoaded ? (<View style={{flexDirection:'row', paddingTop:7, marginLeft:2}}>
                             <Text style={{fontFamily: 'Avenir'}}> {attendeeCurrentLevel} </Text>
                             <Text style={{fontFamily: 'Avenir'}}> ({attendeeHighestLevel}) </Text>
                           </View>
                          ) : null 
                         }
                        </View>
                    </View>
                    ); */
                  }
                });
              }

            } //else {var content = <Text style={{paddingLeft:10}}> Pas encore de participants. </Text>}

          } else {

              console.log('PAS user.id == organiser');

              var title = 'Créateur de la partie';

              var query = new Parse.Query("User");
                  query.equalTo('objectId', organiser.id); 
                  query.first({
                    success: function(user) {
                    console.log('success !=organiser');
                    var userFirstName = user.get('firstName');
                    var userLastName = user.get('lastName')[0];
                    var userPicture = user.get('picture').url();
                    var currentLevel = user.get('currentLevel');
                    var highestLevel = user.get('highestLevel');
                    var birthday = user.get('birthday');
                    console.log('userFirstName');
                    console.log(userFirstName);

                    moment.locale('fr');
                    if (birthday != undefined) {
                      var age = moment().diff(birthday, 'years')+' ans';
                    } else {
                      var age = 'inc.';
                    }

                    console.log('age');
                    console.log(age);

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

                  /*var content = (
                    <View style={{flexDirection:'row', justifyContent:'space-between', marginBottom:15, paddingLeft:20, paddingRight:20}}>
                      <View style={{flexDirection:'row'}}>
                        <Image 
                        style={{width:30, height:30, borderRadius:15}} 
                        source={  ( userPicture!=null && { uri : userPicture } ) || require('../../assets/icons/General/Placeholder.imageset/3639e848-bc9c-11e6-937b-fa2a206349a2.png') } 
                        />
                        {
                        edit.state.fontAvenirLoaded ? (<View style={{flexDirection:'row', marginTop:7, paddingLeft:10}}>
                           <Text style={{fontFamily: 'Avenir', fontWeight:'bold'}}> {userFirstName} </Text>
                           <Text style={{fontFamily: 'Avenir', fontWeight:'bold'}}> {userLastName}. </Text>
                           <Text style={{fontFamily: 'Avenir'}}> ({age}) </Text>
                         </View>
                        ) : null 
                       }
                      </View>
                      <View style={{flexDirection:'row'}}>
                       <Image style={{marginTop:8, marginRight:0, marginLeft:5}} source={require('../../assets/icons/Profile/Level.imageset/icRank.png')} />
                       {
                        edit.state.fontAvenirLoaded ? (<View style={{flexDirection:'row', marginTop:7, marginLeft:2}}>
                           <Text style={{fontFamily: 'Avenir'}}> {currentLevel} </Text>
                           <Text style={{fontFamily: 'Avenir'}}> ({highestLevel}) </Text>
                         </View>
                        ) : null 
                       }
                      </View>
                  </View>
                    );*/

                    }
                  });

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
      var add = this;
  }

  _onPressDeleteGame() {
      var add = this;
  }


  _onPressAnswerButton() {
      Alert.alert(
        'Vous confirmez vouloir participer à cette partie ?',
        [
          {text: 'Non'},
          {text: 'Oui', onPress: () => this._onPressAnswerPositive()},
        ],
        { cancelable: false }
      ) 
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
      const user = Parse.User.current();
      const date = new Date();
      var edit = this;

      if (gameCondition == 'outside') {
        var imageCondition = <Image style={{marginBottom:5}} source={require('../../assets/icons/Conditions/Exterior.imageset/pic.png')}/>;
        var textCondition = "Extérieur";
      } else if (gameCondition == 'inside') {
        var imageCondition = <Image style={{marginBottom:5}} source={require('../../assets/icons/Conditions/Interior.imageset/indoor.png')}/>;
        var textCondition = "Intérieur";
      }

      if (gameSurface == 'hard') {
        var imageSurface = <Image style={{marginBottom:5}} source={require('../../assets/icons/Terrains/DurTerrain.imageset/img_dur.png')}/>;
        var textSurface = 'Dur';
      } else if (gameSurface == 'grass') {
        var imageSurface = <Image style={{marginBottom:5}} source={require('../../assets/icons/Terrains/GazonTerrain.imageset/img_gazon.png')}/>;
        var textSurface = 'Gazon';
      } else if (gameSurface == 'carpet') {
        var imageSurface = <Image style={{marginBottom:5}} source={require('../../assets/icons/Terrains/MoquetteTerrain.imageset/img_moquette.png')}/>;
        var textSurface = 'Moquette';
      } else if (gameSurface == 'synthetic') {
        var imageSurface = <Image style={{marginBottom:5}} source={require('../../assets/icons/Terrains/SynthTerrain.imageset/img_synth.png')}/>;
        var textSurface = 'Synthétique';
      } else if (gameSurface == 'clay') {
        var imageSurface = <Image style={{marginBottom:5}} source={require('../../assets/icons/Terrains/TerreTerrain.imageset/img_terre.png')}/>;
        var textSurface = 'Terre battue';
      }

      if (this.state.canceled) {
          var button = (
          <View style={{
            flexDirection:'column',
            justifyContent:'center',
            alignItems:'stretch'
             }}>
            <TouchableWithoutFeedback>
            <Text style={styles.buttonLogIn}>Partie annulée</Text>
            </TouchableWithoutFeedback>
          </View>
          );
        } else if ( (organiser && (user.id == organiser.id) && (gameDate>date) ) || ( (this.state.partner!=undefined) && (user.id == this.state.partner.id) && (gameDate>date) ) ) {
          var button = (
          <View style={{
            flexDirection:'column',
            justifyContent:'center',
            alignItems:'stretch'
             }}>
            <TouchableWithoutFeedback onPress={this._onPressDeleteGame}>
            <Text style={styles.buttonLogIn}>Annuler la partie</Text>
            </TouchableWithoutFeedback>
          </View>
          );
        } else if ( organiser && (this.state.partner!=undefined) && (user.id != organiser.id) && (user.id != this.state.partner.id) && (gameDate>date) ) {
          var button = (
          <View style={{
            flexDirection:'column',
            justifyContent:'center',
            alignItems:'stretch'
             }}>
            <TouchableWithoutFeedback onPress={this._onPressAnswerButton}>
            <Text style={styles.buttonLogIn}>Participer à la partie</Text>
            </TouchableWithoutFeedback>
          </View>
          );
        }



      }

    return (

      <View style={{flex:1, backgroundColor:'white'}}>

        <ScrollView>

        <View style={styles.page}>

         {
          this.state.fontAvenirLoaded ? (<Text style={{marginBottom:15, fontFamily: 'AvenirNext', paddingLeft:10}}> DATE </Text>
          ) : null 
         }

         {
          this.state.fontAvenirLoaded ? (<View style={{marginBottom:15}}>
            <Text style={{fontFamily: 'Avenir', paddingLeft:10}}> Le {moment(this.state.gameDate).format('LLLL')} </Text>
             <Text style={{fontFamily: 'Avenir', paddingLeft:10}}> Prix : {this.state.gamePrice} € </Text>
            </View>
          ) : null 
         }
        
        {
          this.state.fontAvenirLoaded ? (<Text style={{marginBottom:10, fontFamily: 'AvenirNext', paddingLeft:10}}> LIEU </Text>
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
          this.state.fontAvenirLoaded ? (<Text style={{marginBottom:15, fontFamily: 'AvenirNext', paddingLeft:10}}> TERRAIN </Text>
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
          this.state.fontAvenirLoaded ? (<Text style={{marginBottom:15, fontFamily: 'AvenirNext', paddingLeft:10}}> {title} </Text>
          ) : null 
         }

         {content}

        
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
