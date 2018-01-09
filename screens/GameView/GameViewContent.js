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
      latitude:null,
      longitude:null,
      clubName:null,
      clubAddress:null,
      gameSurface:null,
      gameCondition:null
    };
  }

  async componentWillMount() {
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
              gameSurface:gameSurface
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
      console.log(this.state);
      const {latitude} = this.state;
      const {longitude} = this.state;
      const {gameDate} = this.state;
      const {clubName} = this.state;
      const {clubAddress} = this.state;
      const {gameCondition} = this.state;
      const {gameSurface} = this.state;

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

    return (

      <View style={{flex:1, backgroundColor:'white'}}>

        <ScrollView>

        <View style={styles.page}>

         {
          this.state.fontAvenirLoaded ? (<Text style={{marginBottom:15, fontFamily: 'AvenirNext', paddingLeft:10}}> DATE </Text>
          ) : null 
         }

         {
          this.state.fontAvenirLoaded ? (<Text style={{marginBottom:15, fontFamily: 'Avenir', paddingLeft:10}}> Le {moment(this.state.gameDate).format('LLLL')} </Text>
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
          initialRegion={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        />
        </View>

          {
          this.state.fontAvenirLoaded ? (<Text style={{marginBottom:10, fontFamily: 'AvenirNext', paddingLeft:10}}> TERRAIN </Text>
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
          this.state.fontAvenirLoaded ? (<Text style={{marginBottom:10, fontFamily: 'AvenirNext', paddingLeft:10}}> Créateur de la partie </Text>
          ) : null 
         }

        


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
