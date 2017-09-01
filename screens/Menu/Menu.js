import React from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import { Actions } from 'react-native-router-flux'

import MenuHeader from './MenuHeader'
import MenuButton from './MenuButton'
import MenuContent from './MenuContent'
import Footer from '../../constants/Footer'

import { Parse } from 'parse/react-native'
Parse.initialize("3E8CAAOTf6oi3NaL6z8oVVJ7wvtfKa");
Parse.serverURL = 'https://tiebreak.herokuapp.com/parse'

export default class Home extends React.Component {

  _onPressLogOutButton() {
    console.log("déconnecté !");
    Parse.User.logOut().then(() => {
    var currentUser = Parse.User.current();  // this will now be null
    });
    Actions.logIn();
  }


  render() {
    return (

    	<View style={{flex: 1, backgroundColor:'white'}} >
          
          <View style={{height:120}}>
          <MenuHeader/>
          </View>

          <View style={{flex: 1}}>
          <MenuContent/>
          </View>

          <View style={{height:160}}>
          <Footer/>
          </View>


          <View style={{
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'stretch',
         }}>
            <TouchableOpacity onPress={this._onPressLogOutButton}>
            <Text style={styles.buttonLogIn}>Se déconnecter</Text>
            </TouchableOpacity>
        </View>

        </View>

    );
  }
}

const styles = StyleSheet.create({
  buttonLogIn: {
    backgroundColor: 'rgb(200,90,24)',
    color: 'white',
    fontSize: 18,
    lineHeight: 30,
    textAlign: 'center',
    overflow:'hidden', 
    paddingTop:15,
    paddingBottom:15 
  },
});
