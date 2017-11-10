import React, { Component } from 'react';
import { View, Image, Text, StyleSheet, ScrollView, TouchableWithoutFeedback } from 'react-native';
import { Font } from 'expo';
import { connect } from 'react-redux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Parse } from 'parse/react-native';

import EditClubContentClubList from './EditClubContentClubList';

Parse.initialize("3E8CAAOTf6oi3NaL6z8oVVJ7wvtfKa");
Parse.serverURL = 'https://tiebreak.herokuapp.com/parse';

function mapStateToProps(store) {

  return { user: store.user, userClub: store.userClub, userPreferences: store.userPreferences, button: store.button }
};

function mapDispatchToProps(dispatch) {
  return {
        handleSubmit: function(value) { 
        dispatch( {type: 'user', value: value} ) 
    },
        handleSubmitClub: function(value) { 
        dispatch( {type: 'userClub', value: value} ) 
    },
        handleSubmitPreferences: function(value) { 
        dispatch( {type: 'userPreferences', value: value} ) 
    },
    handleSubmitButton: function(value) { 
        dispatch( {type: 'button', value: value} ) 
    }
  }
};

class EditClubContent extends React.Component {

constructor(props) {
    super(props);
    this._onPressAddClub = this._onPressAddClub.bind(this);
    this._onPressValidateButton = this._onPressValidateButton.bind(this);
    this.state = {
      fontAvenirNextLoaded: false,
      fontAvenirLoaded: false
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
  }


  _onPressAddClub () {

  }

  _onPressValidateButton () {

  }

  render() {

    if (this.props.userClub.length == 0) {
    var newUserClub = <Text style={{textAlign:'center', top: 20, marginBottom:10}}>À COMPLÉTER</Text>;
    } else {
    var clubList = [];
    for (var i = 0; i < this.props.userClub.length; i++) {
      clubList.push(<EditClubContentClubList clubName = {this.props.userClub[i]} />)
    }
  }

    return (

      <View style={{flex:1, backgroundColor:'white'}}>
      {
        this.state.fontAvenirLoaded ? (
          <Text style={{marginBottom:30, fontFamily: 'AvenirNext', left:10}}> MES CLUBS FAVORIS </Text>
        ) : null 
       }

       <KeyboardAwareScrollView>

       <View style={{
        flexDirection:'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20
      }}>
      {clubList}
      </View>

      <TouchableWithoutFeedback style={{padding:30}} onPress={() => this.props.navigation.navigate('EditClubSearch')} >
      <View style={{flexDirection:'row', justifyContent:"center"}}>
       <Image style={{marginRight:10}} source={require('../../assets/icons/Search/Search.imageset/icSearch.png')} /> 
       {
       this.state.fontAvenirLoaded ? (<Text style={styles.clubs}> Ajouter un club favori </Text>) : null 
       } 
       </View>
      </TouchableWithoutFeedback>   

      </KeyboardAwareScrollView>

      <TouchableWithoutFeedback onPress={this._onPressValidateButton}>
      <Text style={styles.buttonValidate}>Valider</Text>
      </TouchableWithoutFeedback>
      </View>

    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps) (EditClubContent);

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
    flexDirection: 'column',
    justifyContent: 'center',
  },
  title: {
    color: 'black',
    backgroundColor: 'rgba(0,0,0,0)',
    fontFamily: 'Avenir',
    fontSize: 15,
    textAlign: 'center',
  },
   subtitle: {
    color: 'white',
    backgroundColor: 'rgba(0,0,0,0)',
    fontFamily: 'Avenir',
    fontSize: 15,
    textAlign: 'center',
  },
  container: {
    backgroundColor: 'white',
    height: 40,
    marginBottom:30,
  },
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
