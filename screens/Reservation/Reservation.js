import React from 'react';
import { StyleSheet, Text, View, Image, Platform, Alert } from 'react-native';
import { TabNavigator } from 'react-navigation';
import { Constants, Location, Permissions, IntentLauncherAndroid } from 'expo';
import { Parse } from 'parse/react-native';

import Header from '../Header/Header';
import ReservationContent from './ReservationContent';
import ReservationButton from './ReservationButton';
import ReservationOptions from './ReservationOptions';

const ReservationNavigator = TabNavigator(
{
  ReservationContent: {screen: ReservationContent, navigationOptions: {tabBarVisible: false}},
  ReservationOptions: {screen: ReservationOptions, navigationOptions: {tabBarVisible: false}}
},
{
  initialRouteName:'ReservationContent',
  swipeEnabled: false,
  lazy: true,
  animationEnabled: false
  },
);


export default class Reservation extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      location:null
    };
    this.getLocation();
  }

 getLocation() {
     if (Platform.OS === 'android' && !Constants.isDevice) {
      Alert.alert('isDevice'); 
    } else {
      this._getLocationAsync().then(()=>{
        var point = new Parse.GeoPoint({latitude: this.state.location.coords.latitude, longitude: this.state.location.coords.longitude});
        var user = Parse.User.current() || Parse.User.currentAsync();
        user.set("geolocation", point);
        user.save();
      });
    }
}

  _getIntentLauncherAndroidAsync = async () => {
    await IntentLauncherAndroid.startActivityAsync(IntentLauncherAndroid.ACTION_LOCATION_SOURCE_SETTINGS);
    let location = await Location.getCurrentPositionAsync({enableHighAccuracy:true});
    this.setState({ location: location });
  };

  _getLocationAsync = async () => {
    let {status} = await Permissions.askAsync(Permissions.LOCATION);
    let service = await Location.getProviderStatusAsync();

    if (status != 'granted') {
     Alert.alert(
          "Vous n'avez pas autorisé Tie Break à accéder à votre localisation. Allez dans Réglages > Confidentialité pour l'activer.",
          "La localisation est indispensable pour trouver des ami(e)s ou réserver des terrains");
     this.setState({ location: undefined });
    } else if (!service.locationServicesEnabled) {
      if (Platform.OS === 'android') {
        Alert.alert(
          "La localisation est désactivée sur votre mobile.",
          "La localisation est indispensable pour trouver des ami(e)s ou réserver des terrains.",
          [
            {text: 'Activer', onPress : () => this._getIntentLauncherAndroidAsync()},
            {text: 'Non', onPress : () => this.setState({ location: undefined }), style:'cancel'},
          ],
          { cancelable: false }
          );
      } else {
        Alert.alert(
          "La localisation est désactivée sur votre mobile. Allez dans Réglages > Confidentialité pour l'activer.",
          "La localisation est indispensable pour trouver des ami(e)s ou réserver des terrains");
        this.setState({ location: undefined });
      }
    } else if (service.locationServicesEnabled) {
        let location = await Location.getCurrentPositionAsync({enableHighAccuracy:true});
        this.setState({ location: location });
      }
  };

  render() {
    return (

    	<View style={{flex:1, backgroundColor:'white'}}>

      <View style={{
        position:'absolute',
        width:'100%',
        height:'100%',
        flexDirection:'row', 
        alignItems:'flex-start'
      }}>

        <View style={{flex:1, alignItems:'stretch'}}>
          <ReservationButton navigation={this.props.navigation}/>
        </View>

      </View>

          <View style={{flex:0.17, marginBottom:40}}>
           <Header navigation={this.props.navigation} screenProps={{header:"book", back:true}}/>
          </View>
        
        <View style={{flex:0.83}}>
        <ReservationNavigator navigation={this.props.navigation}/>
        </View>

        </View>

    );
  }
}

Reservation.router = ReservationNavigator.router;

