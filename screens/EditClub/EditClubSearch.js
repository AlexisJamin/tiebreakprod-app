import React, { Component } from 'react';
import { View, Image, Text, StyleSheet, ScrollView, TouchableWithoutFeedback, TextInput } from 'react-native';
import { Font } from 'expo';
import { NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Parse } from 'parse/react-native';
import Modal from 'react-native-modalbox';
import { ButtonGroup, CheckBox } from 'react-native-elements';

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

class EditClubSearch extends React.Component {

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

      <View style={{flexDirection:'row', justifyContent:"space-around", top:30}}>
      <TouchableWithoutFeedback style={{padding:40}} onPress={() => this.props.navigation.goBack()}>
      <Image style={{marginTop:15}} source={require('../../assets/icons/General/Back.imageset/icBackGrey.png')} />
      </TouchableWithoutFeedback>
      <TextInput style={styles.searchBar}/>
      </View>

       <KeyboardAwareScrollView>

    
     

      </KeyboardAwareScrollView>

      </View>

    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps) (EditClubSearch);

const styles = StyleSheet.create({
  searchBar: {
    paddingLeft:20,
    marginLeft:20,
    fontSize:13,
    height:40,
    width:280,
    borderWidth: 6,
    borderColor: '#E4E4E4'
  }
});
