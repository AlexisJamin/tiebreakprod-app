import React, { Component } from 'react';
import { View, Image, Text, StyleSheet, ScrollView, TouchableWithoutFeedback } from 'react-native';
import { Font } from 'expo';
import { connect } from 'react-redux';
import { Parse } from 'parse/react-native';

import EditClubContentClubList from './EditClubContentClubList';

Parse.initialize("3E8CAAOTf6oi3NaL6z8oVVJ7wvtfKa");
Parse.serverURL = 'https://tiebreak.herokuapp.com/parse';

function mapStateToProps(store) {

  return { user: store.user, userClub: store.userClub, userPreferences: store.userPreferences, button: store.button }
};

function mapDispatchToProps(dispatch) {
  return {
        handleSubmitClub: function(value) { 
        dispatch( {type: 'newUserClub', value: value} ) 
    }
  }
};

class EditClubContent extends React.Component {

constructor(props) {
    super(props);
    this._onPressValidateButton = this._onPressValidateButton.bind(this);
    this.handleClick = this.handleClick.bind(this);
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

  _onPressValidateButton () {
    var user = Parse.User.current();
    var clubs = [];
    for (var i = 0; i < this.props.userClub.length; i++) {
      clubs.push({"__type":"Pointer","className":"Club","objectId":this.props.userClub[i].id});
    }
    user.set("clubs", clubs);
    user.save();
    this.props.navigation.goBack();
  }

  handleClick(indice) {
    console.log(indice);
    this.props.handleSubmitClub(indice);
  }

  render() {

    if (this.props.userClub.length == 0) {
    var newUserClub = <Text style={{textAlign:'center', top: 20, marginBottom:10}}>À COMPLÉTER</Text>;
    } else {
    var clubList = [];
    for (var i = 0; i < this.props.userClub.length; i++) {
      clubList.push(<EditClubContentClubList clubName={this.props.userClub[i].name} position={i} handleClick={this.handleClick}/>)
    }
  }

    return (

      <View style={{flex:1, backgroundColor:'white'}}>
      {
        this.state.fontAvenirLoaded ? (
          <Text style={{marginBottom:30, fontFamily: 'AvenirNext', left:10}}> MES CLUBS FAVORIS </Text>
        ) : null 
       }

       <ScrollView>

       <View style={{
        flexDirection:'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom:20
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

      </ScrollView>

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
  clubs: {
    color: 'black',
    backgroundColor: 'rgba(0,0,0,0)',
    fontFamily: 'Avenir',
    textDecorationLine:'underline',
    fontSize: 14,
    left:5,
    marginBottom: 12,
    alignItem:'center', 
    justifyContent: 'center',
  }
});
