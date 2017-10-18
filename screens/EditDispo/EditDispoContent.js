import React, { Component } from 'react'
import { View, Image, Text, StyleSheet, ScrollView, TouchableWithoutFeedback } from 'react-native'
import { Font } from 'expo'
import Svg,{
    Circle,
    Ellipse,
    G,
    LinearGradient,
    RadialGradient,
    Line,
    Path,
    Polygon,
    Polyline,
    Rect,
    Symbol,
    Use,
    Defs,
    Stop
} from 'react-native-svg'
import { NavigationActions } from 'react-navigation'
import { connect } from 'react-redux'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Parse } from 'parse/react-native'
import Modal from 'react-native-modalbox'

import EditDispoContentDays from './EditDispoContentDays'

Parse.initialize("3E8CAAOTf6oi3NaL6z8oVVJ7wvtfKa");
Parse.serverURL = 'https://tiebreak.herokuapp.com/parse'

function mapDispatchToProps(dispatch) {
  return {
        handleSubmit: function(value) { 
        dispatch( {type: 'user', value: value} ) 
    }
  }
}

function mapStateToProps(store) {
  return { user: store.user, userClub: store.userClub }
}


class EditDispoContent extends React.Component {

constructor(props) {
    super(props);
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

  render() {

    var dayList = [];
    for (var i = 0; i < this.props.user.availability.length; i++) {
      if (this.props.user.availability[i].hours.length > 0) {
      dayList.push(<EditDispoContentDays days = {this.props.user.availability[i].day.slice(0,3)} hours = {this.props.user.availability[i].hours}/>)
      } else {
      dayList.push(<EditDispoContentDays days = {this.props.user.availability[i].day.slice(0,3)} hours = {[]}/>)
      }
    }

    return (

       <View style={{
        flex: 1,
        backgroundColor:'transparent'
      }}>

      <KeyboardAwareScrollView>

          <View style={{
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'space-around',
          top: 10,
          }}>

          {dayList}
 
        </View>

        </KeyboardAwareScrollView>


          <TouchableWithoutFeedback onPress={this._onPressValidateButton}>
          <Text style={styles.buttonValidate}>Valider</Text>
          </TouchableWithoutFeedback>
           

          </View>

         
      


    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps) (EditDispoContent);

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
});

