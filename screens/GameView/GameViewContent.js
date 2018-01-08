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
      clubGeo:null
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
            edit.setState({clubGeo:clubGeo})
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
      const clubGeo = this.state;
    return (

      <View style={{flex:1, backgroundColor:'white'}}>

        <ScrollView>

        <View style={styles.page}>

         {
          this.state.fontAvenirLoaded ? (<Text style={{marginBottom:15, fontFamily: 'AvenirNext', paddingLeft:10}}> DATE </Text>
          ) : null 
         }

       
        
        {
          this.state.fontAvenirLoaded ? (<Text style={{marginBottom:10, fontFamily: 'AvenirNext', paddingLeft:10}}> LIEU </Text>
          ) : null 
         }

         <MapView
            style={{ flex: 1, width:200, heigth:300 }}
            initialRegion={{
              latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
            }}
          />

          {
          this.state.fontAvenirLoaded ? (<Text style={{marginBottom:10, fontFamily: 'AvenirNext', paddingLeft:10}}> TERRAIN </Text>
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
