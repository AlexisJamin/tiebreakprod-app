import React from 'react'
import { StyleSheet, Text, View, Image, TouchableWithoutFeedback } from 'react-native'
import { Actions } from 'react-native-router-flux'
import { Parse } from 'parse/react-native'

import MenuHeader from './MenuHeader'
import MenuContent from './MenuContent'

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

      <View style={{
        position:'absolute',
        width:'100%',
        height:'100%',
        flexDirection:'row', 
        alignItems:'flex-end',
      }}>

      <Image style={{
        flex:1,
        height:250}} 
        source={require('../../assets/icons/AppSpecific/Footer.imageset/group3.png')} /> 

      </View>
          
          <View style={{height:120}}>
          <MenuHeader/>
          </View>

          <View style={{flex: 1, marginBottom: 70}}>
          <MenuContent/>
          </View>


          <View style={{
        alignItems: 'stretch',
         }}>
            <TouchableWithoutFeedback onPress={this._onPressLogOutButton}>
            <Text style={styles.buttonLogIn}>Se déconnecter</Text>
            </TouchableWithoutFeedback>
        </View>

        </View>

    );
  }
}

const styles = StyleSheet.create({
  buttonLogIn: {
    backgroundColor: 'rgba(0,0,0,0.2)',
    color: 'white',
    fontSize: 18,
    lineHeight: 30,
    textAlign: 'center',
    overflow:'hidden', 
    paddingTop:15,
    paddingBottom:15 
  },
});
