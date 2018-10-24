import React from 'react';
import { StyleSheet, View, Image, Alert, Text, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import { Font, WebBrowser } from 'expo';
import { connect } from 'react-redux';
import { Parse } from 'parse/react-native';
import { CreditCardInput } from "react-native-credit-card-input";
import Modal from 'react-native-modalbox';

var stripe = require('stripe-client')('pk_test_FuwMh0A8GOWD8G10kmEQIuo4');

import translate from '../../translate.js';

import moment from 'moment/min/moment-with-locales';

function mapStateToProps(store) {
  return { user: store.user, userClub: store.userClub, reservationView:store.reservationView }
};

function mapDispatchToProps(dispatch) {
  return {
        handleSubmit: function(value) { 
        dispatch( {type: 'user', value: value} ) 
    }
  }
}

class PaymentContent extends React.Component {

  constructor(props) {
    super(props);
    this._onPressValidate = this._onPressValidate.bind(this);
    this._onPressConfirm = this._onPressConfirm.bind(this);
    this.onChange = this.onChange.bind(this);
    this.state = {
      fontAvenirNextLoaded:false,
      fontAvenirLoaded:false,
      loading:false,
      disabled:false,
      data:null,
      paid:null,
      price: this.props.reservationView.price*(1-0.01*this.props.reservationView.discount)
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
      fontAvenirLoaded: true,
    });      

  }

  onChange(data) {
      this.setState({
      data:data
    })

  }

  _handleOpenCGU = () => {
    WebBrowser.openBrowserAsync('http://cgu-tie-break.strikingly.com/');
    this.setState({disabled:false})
  }

  async _onPressValidate() {

    var add = this;

  if (this.state.data.status.number === 'valid' && 
    this.state.data.status.name === 'valid' && 
    this.state.data.status.expiry === 'valid' && 
    this.state.data.status.cvc === 'valid') {

    this.setState({disabled:true})

      Alert.alert(
        "Merci d'accepter les CGV.",
        '',
        [
          {text: 'CGU / CGV', onPress : () => this._handleOpenCGU()},
          {text: 'Non', onPress : () => this.setState({disabled:false}), style:'cancel'},
          {text: 'Oui', onPress : () => this._onPressConfirm()},
        ],
        { cancelable: false }
      );

    } else {
        if (this.state.data.status.number !== 'valid') {
          alert('Numéro de carte invalide.');
        } else if (this.state.data.status.name !== 'valid') {
          alert('Veuillez compléter votre nom.');
        } else if (this.state.data.status.expiry !== 'valid') {
          alert("Date d'expériation invalide." );
        } else if (this.state.data.status.cvc !== 'valid') {
          alert('CVC invalide.');
        }
      }

  }

    async _onPressConfirm() {
      
      this.refs.modal.open();
      var add = this;

      var information = {
        card: {
          number: this.state.data.values.number,
          exp_month: this.state.data.values.expiry.split('/')[0],
          exp_year: this.state.data.values.expiry.split('/')[1],
          cvc: this.state.data.values.cvc,
          name: this.state.data.values.name
        }
      };

      var card = await stripe.createToken(information);
      var token = card.id;

      if (token) {
          Parse.Cloud.run("stripe", { 
          "token": token,
          "name": this.state.data.values.name,
          "reservationId": this.props.reservationView.reservationId,
          "price": this.state.price,
          "type": this.props.reservationView.type,
          "email": this.props.reservationView.email,
          "date": this.props.reservationView.start,
          "start": this.props.reservationView.start,
          "end": this.props.reservationView.end,
          "clubName": this.props.reservationView.clubName,
          "clubAddress": this.props.reservationView.clubAddress,
          "stripe": this.props.reservationView.stripe,
          "stripeCustomer": this.props.reservationView.stripeCustomer,
        }).then(function(resp) {
          console.log('resp');
          console.log(resp);
          if (resp.status === 'succeeded') {
            add.setState({paid:true})
            setTimeout(() => {
              add.refs.modal.close();
              add.props.navigation.navigate("Swiper");
            }, 500);
          } else if (resp.status === 'failed') {
            alert('Echec du paiement.');
            add.refs.modal.close();
          } else if (resp.status === 'reserved') {
            alert('Créneau déjà pris.');
            add.refs.modal.close();
            add.props.navigation.navigate("Reservation");
          }
        });
      }

  }

  render() {
    return (

      <View style={{flex:1, backgroundColor:'white'}}>

          <View style={{flex:1}}>
          <CreditCardInput 
            onChange={this.onChange} 
            requiresName={true}
            allowScroll={true}
            cardScale={0.7}
            labels={{ number: "NUMÉRO", expiry: "EXPIRE", cvc: "CVC/CCV", name: "Nom du titulaire" }}
            placeholders={{ number: "1234 5678 1234 5678", expiry: "MM/YY", cvc: "CVC", name: "Prénom Nom" }}
            cardImageFront={require('../../assets/icons/Cards/card-front.png')}
            cardImageBack={require('../../assets/icons/Cards/card-back.png')}
            />

          <Modal 
            style={styles.modal}
            backdrop={true} 
            backdropPressToClose={false}
            swipeToClose={false} 
            position={"center"} 
            ref={"modal"}>
            { !this.state.paid &&
              <View>
              <Text style={{textAlign:'center', marginBottom:15}}>Validation du paiement en cours.</Text>
              <ActivityIndicator size="large" />
              </View>
            }
            { this.state.paid &&
              <Text style={{textAlign:'center', marginBottom:15}}>Paiement validé.</Text>
            }
          </Modal>

          </View>


          <TouchableOpacity onPress={this._onPressValidate} disabled={this.state.disabled}>
          <Text style={styles.buttonValidate}>{translate.validate[this.props.user.currentLocale]} ({this.state.price.toLocaleString("fr-FR", {style: "currency", currency: "EUR"})})</Text>
          </TouchableOpacity>
       
        </View>

    );
  }

}

export default connect(mapStateToProps, mapDispatchToProps) (PaymentContent);

const styles = StyleSheet.create({
 buttonValidate: {
    backgroundColor: 'rgb(200,90,24)',
    color: 'white',
    fontSize: 18,
    lineHeight: 30,
    textAlign: 'center',
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
    height: 200,
    width: 200
  }
});
