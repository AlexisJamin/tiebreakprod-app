import React, { Component } from 'react';
import { View, Text, StyleSheet} from 'react-native';
import { Font } from 'expo';
import { Parse } from 'parse/react-native';

Parse.initialize("3E8CAAOTf6oi3NaL6z8oVVJ7wvtfKa");
Parse.serverURL = 'https://tiebreak.herokuapp.com/parse';

export default class ProfileViewContentClubs extends React.Component {

constructor() {
    super();
    this.state = {
      fontAvenirNextLoaded: false,
      fontAvenirLoaded: false,
      clubName:''
    };
  }

  async componentDidMount() {
   
    await Font.loadAsync({
      'AvenirNext': require('../../assets/fonts/AvenirNext.ttf'),
      'Avenir': require('../../assets/fonts/Avenir.ttf'),
    });
    this.setState({ 
      fontAvenirNextLoaded: true,
      fontAvenirLoaded: true
    });

    var t = this;
    var Club = Parse.Object.extend("Club");
    var query = new Parse.Query(Club);
    query.get(this.props.clubId, {
      success: function(club) {
      // The object was retrieved successfully.
      var clubName = club.get("name");
      t.setState({clubName: clubName});
    }
  });
  }

  render() {

    return (

          <View>
           {
           this.state.fontAvenirLoaded ? (<Text style={styles.clubs}>{this.state.clubName}</Text>) : null 
           }    
           </View>

        );
  }
}


const styles = StyleSheet.create({
  clubs: {
    color: 'black',
    backgroundColor: 'rgba(0,0,0,0)',
    fontFamily: 'Avenir',
    fontSize: 14,
    left:5,
    marginBottom: 12,
    alignItem:'center', 
    justifyContent: 'center',
  }
});

