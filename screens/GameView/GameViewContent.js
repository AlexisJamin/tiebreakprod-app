import React from 'react';
import { StyleSheet, View, Image, Alert, Text, TouchableWithoutFeedback, ScrollView } from 'react-native';
import { Font, MapView } from 'expo';
import { ButtonGroup } from 'react-native-elements';
import { connect } from 'react-redux';
import { Parse } from 'parse/react-native';

Parse.initialize("3E8CAAOTf6oi3NaL6z8oVVJ7wvtfKa");
Parse.serverURL = 'https://tiebreak.herokuapp.com/parse'

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
    this._onPressDeleteButton = this._onPressDeleteButton.bind(this);
    this._onPressAnswerPositive = this._onPressAnswerPositive.bind(this);
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
      userFirstName:null,
      userLastName:null,
      userPicture:null,
      userCurrentLevel:null,
      userHighestLevel:null
    };
  }

  componentWillMount() {

   var user = Parse.User.current();
   moment.locale('fr');
   //var deviceLocale = await Expo.Util.getCurrentLocaleAsync();
   var edit = this;
    var query = new Parse.Query("Game");
    console.log(this.props.game.gameId);
    query.equalTo('objectId', this.props.game.gameId); 
    query.first({
      success: function(game) {
        var gameDate = game.get('date');
        var gameSurface = game.get('surface');
        var gameCondition = game.get('condition');
        var gamePrice = game.get('price');
        var organiser = game.get('organiser');

        if (user.id == organiser) {

        } else {
          var userFirstName = user.get('firstName');
          var userLastName = user.get('lastName')[0];
          var userPicture = user.get('picture').url();
          var userCurrentLevel = user.get('currentLevel');
          var userHighestLevel = user.get('highestLevel');
        }
        
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
              userFirstName:userFirstName,
              userLastName:userLastName,
              userPicture:userPicture,
              userCurrentLevel:userCurrentLevel,
              userHighestLevel:userHighestLevel,
            })
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


  _onPressDeleteButton() {
      Alert.alert(
        'Vous confirmez avoir réservé un terrain le :',
        ' ?',
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

      if (user.id == organiser) {
        var title = 'Participants';
      } else {
        var title = 'Créateur de la partie';
        var userFirstName = this.state.userFirstName;
        var userLastName = this.state.userLastName;
        var userPicture = this.state.userPicture;
        var userCurrentLevel = this.state.userCurrentLevel;
        var userHighestLevel = this.state.userHighestLevel;
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

         <View style={{flexDirection:'row', justifyContent:'space-between', marginBottom:15, paddingLeft:20, paddingRight:20}}>
            <View style={{flexDirection:'row'}}>
              <Image 
              style={{width:30, height:30, borderRadius:15}} 
              source={  ( this.state.userPicture!=null && { uri : this.state.userPicture } ) || require('../../assets/icons/General/Placeholder.imageset/3639e848-bc9c-11e6-937b-fa2a206349a2.png') } 
              />
              {
              this.state.fontAvenirLoaded ? (<View style={{flexDirection:'row', paddingTop:5, paddingLeft:10}}>
                 <Text style={{fontFamily: 'AvenirNext'}}> {userFirstName} </Text>
                 <Text style={{fontFamily: 'AvenirNext'}}> {userLastName}. </Text>
                 <Text style={{fontFamily: 'AvenirNext'}}> (28 ans) </Text>
               </View>
              ) : null 
             }
            </View>
            <View style={{flexDirection:'row'}}>
             <Image style={{marginTop:8}} source={require('../../assets/icons/Profile/Level.imageset/icRank.png')} />
             {
              this.state.fontAvenirLoaded ? (<View style={{flexDirection:'row', paddingTop:5, paddingLeft:10}}>
                 <Text style={{fontFamily: 'Avenir'}}> {userCurrentLevel} </Text>
                 <Text style={{fontFamily: 'Avenir'}}> ({userHighestLevel}) </Text>
               </View>
              ) : null 
             }
            </View>
        </View>

        


          </View>

         </ScrollView>
          
          <View style={{
            flexDirection:'column',
            justifyContent:'center',
            alignItems:'stretch'
             }}>
            <TouchableWithoutFeedback onPress={this._onPressValidateButton}>
            <Text style={styles.buttonLogIn}>Annuler la partie</Text>
            </TouchableWithoutFeedback>

          </View>

       
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
