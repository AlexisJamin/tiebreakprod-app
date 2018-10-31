import React from 'react';
import { StyleSheet, Text, View, Image, TextInput, Keyboard, Platform, Alert } from 'react-native';
import { Constants, Location, Permissions, IntentLauncherAndroid, Amplitude } from 'expo';
import { TabNavigator } from 'react-navigation';
import { Parse } from 'parse/react-native';

import Header from '../Header/Header';
import CommunityButton from './CommunityButton';
import CommunityContent from './CommunityContent';
import CommunityPreferences from './CommunityPreferences';

import { connect } from 'react-redux';

import translate from '../../translate.js';

function mapStateToProps(store) {
  return { user: store.user, button: store.button }
};

function mapDispatchToProps(dispatch) {
  return {
        handleSubmit: function(value) { 
        dispatch( {type: 'searchPlayer', value: value} ) 
    }
  }
};

const CommunityNavigator = TabNavigator(
{
  CommunityContent: {screen: CommunityContent, navigationOptions: {tabBarVisible: false}},
  CommunityPreferences: {screen: CommunityPreferences, navigationOptions: {tabBarVisible: false}},
},
{
  swipeEnabled: false,
  lazy: true,
  animationEnabled: false
  },
);

class Community extends React.Component {

  constructor(props) {
    super(props);
    this._searchPlayer = this._searchPlayer.bind(this);
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

  _searchPlayer(player) {
    Amplitude.logEvent("Search Player TextInput");
    this.props.handleSubmit({player:player});
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
          <CommunityButton navigation={this.props.navigation}/>
          { this.props.button.CommunityButtonIndex===0 &&
            <TextInput 
              style={styles.searchBar}
              keyboardType="default"
              returnKeyType='done'
              autoCorrect={false}
              placeholder={translate.searchPlayer[this.props.user.currentLocale]}
              underlineColorAndroid='rgba(0,0,0,0)'
              blurOnSubmit={false}
              autoCapitalize='sentences'
              onChangeText={(player) => this._searchPlayer(player)}
              onSubmitEditing={Keyboard.dismiss}
            />
          }
          </View>

        </View>

          <View style={{flex:0.17, marginBottom:90}}>
           <Header navigation={this.props.navigation} screenProps={{header:"community", back:true}} />
          </View>

          <View style={{flex:0.83}}>
          <CommunityNavigator navigation={this.props.navigation}/>
          </View>
        

      </View>

    );
  }
}

Community.router = CommunityNavigator.router;

export default connect(mapStateToProps, mapDispatchToProps) (Community);

styles = StyleSheet.create({
  searchBar: {
    paddingLeft:20,
    fontSize:13,
    maxHeight:45,
    flex:1,
    borderWidth:6,
    borderColor:'#E4E4E4'
  }
})

