import React from 'react';
import { StyleSheet, View, Image, Alert, Text, TouchableOpacity, ScrollView, Linking } from 'react-native';
import { Font, MapView } from 'expo';
import { connect } from 'react-redux';
import { Parse } from 'parse/react-native';

import translate from '../../translate.js';

import moment from 'moment/min/moment-with-locales';

function mapStateToProps(store) {
  return { user: store.user, userClub: store.userClub, reservationView:store.reservationView }
};

function mapDispatchToProps(dispatch) {
  return {
        handleSubmit: function(value) { 
        dispatch( {type: 'reservationView', value: value} ) 
    }
  }
}

class ReservationViewContent extends React.Component {

  constructor(props) {
    super(props);
    this._onPressPayment = this._onPressPayment.bind(this);
    this._onPressDelete = this._onPressDelete.bind(this);
    this._onPressConfirmDelete = this._onPressConfirmDelete.bind(this);
    this.getData = this.getData.bind(this);
    this.state = {
      fontAvenirNextLoaded:false,
      fontAvenirLoaded:false,
      disabled:null,
    };
    moment.locale(this.props.user.currentLocale);
    this.getData();
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

  getData() {

    var data = this;
    var query = new Parse.Query("Reservation");
    query.equalTo("objectId", this.props.reservationView.reservationId);
    query.first({
    success: function(reservation) {
      console.log('reservation');
      console.log(reservation);
      let start = reservation.get("start");
      let end = reservation.get("end");
      let condition = reservation.get("condition");
      let surface = reservation.get("surface");
      let type = reservation.get("type");
      let latitude = reservation.get("geopoint").latitude;
      let longitude = reservation.get("geopoint").longitude;
      let price = reservation.get("price");
      let discount = reservation.get("discount");
      let organiser = reservation.get("organiser").id;
      let court = reservation.get("court");
      let clubId = reservation.get("club").id;
      let reserved = reservation.get("reserved");
      let chargeId = reservation.get("chargeId");

        var query2 = new Parse.Query("Club");
        query2.equalTo("objectId", clubId);
        query2.first({
        success: function(club) {
          console.log('club');
          console.log(club);
          let name = club.get("name");
          let address = club.get("address");

          data.setState({
            start:start,
            end:end,
            condition:condition,
            surface:surface,
            type:type,
            latitude:latitude,
            longitude:longitude,
            price:price,
            discount:discount,
            organiser:organiser,
            court:court,
            clubName:name,
            clubAddress:address,
            reserved:reserved,
            chargeId:chargeId
          })
        }
      })

    }
  })

  }

  _onPressPayment() {
      var add = this;
      this.setState({disabled:true})
      var user = Parse.User.current() || Parse.User.currentAsync();
      var email = user.get("email");
      var query = new Parse.Query("User");
      query.equalTo("objectId", this.state.organiser);
      query.first({
      success: function(users) {
        let stripe = users.get("stripe");
        let stripeCustomer = users.get("stripeCustomer");

        add.props.handleSubmit({
            reservationId:add.props.reservationView.reservationId,
            organiserId:add.state.organiser,
            price:add.state.price,
            discount:add.state.discount,
            start:add.state.start,
            end:add.state.end,
            clubName:add.state.clubName,
            clubAddress:add.state.clubAddress,
            stripe:stripe,
            stripeCustomer:stripeCustomer,
            email:email,
            type:(add.state.type == 'court' && 'Terrain') || (add.state.type == 'lesson' && 'Leçon individuelle')
          })
        add.setState({disabled:false})
        add.props.navigation.navigate("Payment");
      },
      error: function(error) {
        console.log("Error: " + error.code + " " + error.message);
      }
    })
  }

  _onPressDelete() {
      this.setState({disabled:true})

      Alert.alert(
          'Souhaites-tu annuler ta réservation ?',
          'Cette action est irréversible',
          [
            {text: translate.cancel[this.props.user.currentLocale]},
            {text: translate.ok[this.props.user.currentLocale], onPress : () => this._onPressConfirmDelete()},
          ],
          { cancelable: false }
        )
  }

  _onPressConfirmDelete() {
    var add = this;
    var query = new Parse.Query("User");
      query.equalTo("objectId", this.state.organiser);
      query.first({
      success: function(users) {
        let stripe = users.get("stripe");
        let stripeCustomer = users.get("stripeCustomer");

        Parse.Cloud.run("stripeRefund", { 
          "reservationId": add.props.reservationView.reservationId,
          "stripe": stripe,
          "chargeId": add.state.chargeId,
        }).then(function(resp) {
          console.log('resp');
          console.log(resp);
        });

        add.setState({disabled:false})
        add.props.navigation.goBack();
      }
    })

    

  }

  render() {
      var price = this.state.price*(1-0.01*this.state.discount);
      var today = new Date();

      if (this.state.condition == 'outdoor') {
        var imageCondition = <Image style={{marginBottom:5}} source={require('../../assets/icons/Conditions/Exterior.imageset/pic.png')}/>;
        var textCondition = translate.outdoor[this.props.user.currentLocale];
      } else if (this.state.condition == 'indoor') {
        var imageCondition = <Image style={{marginBottom:5}} source={require('../../assets/icons/Conditions/Interior.imageset/indoor.png')}/>;
        var textCondition = translate.indoor[this.props.user.currentLocale];
      }

      if (this.state.surface == 'hard') {
        var imageSurface = <Image style={{marginBottom:5}} source={require('../../assets/icons/Terrains/DurTerrain.imageset/img_dur.png')}/>;
        var textSurface = translate.hard[this.props.user.currentLocale];
      } else if (this.state.surface == 'grass') {
        var imageSurface = <Image style={{marginBottom:5}} source={require('../../assets/icons/Terrains/GazonTerrain.imageset/img_gazon.png')}/>;
        var textSurface = translate.grass[this.props.user.currentLocale];
      } else if (this.state.surface == 'carpet') {
        var imageSurface = <Image style={{marginBottom:5}} source={require('../../assets/icons/Terrains/MoquetteTerrain.imageset/img_moquette.png')}/>;
        var textSurface = translate.carpet[this.props.user.currentLocale];
      } else if (this.state.surface == 'synthetic') {
        var imageSurface = <Image style={{marginBottom:5}} source={require('../../assets/icons/Terrains/SynthTerrain.imageset/img_synth.png')}/>;
        var textSurface = translate.synthetic[this.props.user.currentLocale];
      } else if (this.state.surface == 'clay') {
        var imageSurface = <Image style={{marginBottom:5}} source={require('../../assets/icons/Terrains/TerreTerrain.imageset/img_terre.png')}/>;
        var textSurface = translate.clay[this.props.user.currentLocale];
      }

      if (this.state.reserved && this.state.start > today) {
        var button = (
          <View style={{
            flexDirection:'column',
            justifyContent:'center',
            alignItems:'stretch'
             }}>
            <TouchableOpacity onPress={this._onPressDelete} disabled={this.state.disabled}>
            <Text style={styles.buttonLogIn}>Annuler la réservation</Text>
            </TouchableOpacity>
          </View>
          );
      } else if (this.state.reserved && this.state.start < today) {
        var button = (
          <View style={{
            flexDirection:'column',
            justifyContent:'center',
            alignItems:'stretch'
             }}>
            <TouchableOpacity onPress={()=>Linking.openURL('mailto: contact@tie-break.fr')} disabled={this.state.disabled}>
            <Text style={styles.buttonLogIn}>Donne ton avis sur le club</Text>
            </TouchableOpacity>
          </View>
          );
      } else {
        var button = (
          <View style={{
            flexDirection:'column',
            justifyContent:'center',
            alignItems:'stretch'
             }}>
            <TouchableOpacity onPress={this._onPressPayment} disabled={this.state.disabled}>
            <Text style={styles.buttonLogIn}>Réserver ({price.toLocaleString("fr-FR", {style: "currency", currency: "EUR"})})</Text>
            </TouchableOpacity>
          </View>
          );
      }

    return (

      <View style={{flex:1, backgroundColor:'white'}}>

        <ScrollView>

        <View style={styles.page}>

        {
          this.state.fontAvenirLoaded ? (<Text style={{marginBottom:10, fontFamily: 'AvenirNext', paddingLeft:10}}> TYPE </Text>
          ) : null 
         }

         {
          this.state.fontAvenirLoaded ? (<View style={{marginBottom:15}}>
            <Text style={{fontFamily: 'Avenir', paddingLeft:10}}> {(this.state.type == 'court' && 'Terrain') || (this.state.type == 'lesson' && 'Leçon individuelle')} </Text>
            <Text style={{fontFamily: 'Avenir', paddingLeft:10}}> {translate.price[this.props.user.currentLocale]} : {price.toLocaleString("fr-FR", {style: "currency", currency: "EUR"})}</Text>
            { this.state.discount !=0 &&
              <Text style={{fontFamily: 'Avenir', paddingLeft:10, fontWeight:'bold', color:'rgb(200,90,24)'}}> Réduction : - {this.state.discount} % </Text>
            }
            </View>
          ) : null 
         }

         {
          this.state.fontAvenirLoaded ? (<Text style={{marginBottom:10, fontFamily: 'AvenirNext', paddingLeft:10}}> {translate.date[this.props.user.currentLocale].toUpperCase()} </Text>
          ) : null 
         }

         {
          this.state.fontAvenirLoaded ? (<View style={{marginBottom:15}}>
            <Text style={{fontFamily: 'Avenir', paddingLeft:10}}> {translate.on[this.props.user.currentLocale]} {moment(this.state.start).format("dddd D MMMM YYYY")} </Text>
             <Text style={{fontFamily: 'Avenir', paddingLeft:10}}> Horaires : {moment(this.state.start).format('LT')}  -  {moment(this.state.end).format('LT')} </Text>
            </View>
          ) : null 
         }
        
        {
          this.state.fontAvenirLoaded ? (<Text style={{marginBottom:10, fontFamily: 'AvenirNext', paddingLeft:10}}> {translate.location[this.props.user.currentLocale].toUpperCase()} </Text>
          ) : null 
         }

         {
          this.state.fontAvenirLoaded ? (<View style={{marginBottom:15}}>
            <Text style={{fontFamily: 'Avenir', paddingLeft:10}}> {this.state.clubName} </Text>
            <Text style={{fontFamily: 'Avenir', paddingLeft:10}}> {this.state.clubAddress} </Text>
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
        
          </View>

         </ScrollView>
          
          {button}
       
        </View>

    );
  }

}

export default connect(mapStateToProps, mapDispatchToProps) (ReservationViewContent);

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
    modal: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 500,
    width: 350
  }
});
