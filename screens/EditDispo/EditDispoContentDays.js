import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, TouchableWithoutFeedback, ImageBackground } from 'react-native';
import { Font } from 'expo';
import { connect } from 'react-redux';

import translate from '../../translate.js';

import EditDispoContentHours from './EditDispoContentHours'


function mapStateToProps(store) {
  return { user: store.user }
}

class EditDispoContentDays extends React.Component {

constructor(props) {
    super(props);
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

  handleClick() {
   this.props.handleClick(this.props.modal);
  }


  render() {

      if (this.props.days == 'Mon') {
          var days = translate.monday[this.props.user.currentLocale].slice(0,3);
        } else if (this.props.days == 'Tue') {
          var days = translate.tuesday[this.props.user.currentLocale].slice(0,3);
        } else if (this.props.days == 'Wed') {
          var days = translate.wednesday[this.props.user.currentLocale].slice(0,3);
        } else if (this.props.days == 'Thu') {
          var days = translate.thursday[this.props.user.currentLocale].slice(0,3);
        } else if (this.props.days == 'Fri') {
          var days = translate.friday[this.props.user.currentLocale].slice(0,3);
        } else if (this.props.days == 'Sat') {
          var days = translate.saturday[this.props.user.currentLocale].slice(0,3);
        } else if (this.props.days == 'Sun') {
          var days = translate.sunday[this.props.user.currentLocale].slice(0,3);
        }

        var day;
        var hoursList = [];
        if (this.props.hours.length>0) {
        day=(<ImageBackground 
                source={require('../../assets/icons/AppSpecific/DayCircle.imageset/imgDayBg.png')}
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  width:40,
                  height:40
                 }}>
              <Text style={{color: 'white', backgroundColor: 'rgba(0,0,0,0)', textAlign:'center'}}>{days}</Text>
              </ImageBackground>)
        for (var i = 0; i < this.props.hours.length; i++) {
        hoursList.push(<EditDispoContentHours hours = {this.props.hours[i]} />)
        }
      } else {
        day= <Text style={styles.days}>{days}</Text>
      }

    return (

              <TouchableWithoutFeedback onPress={this.handleClick}>
              <View style={{
                paddingTop:10, 
                paddingBottom: 10, 
                marginRight:40,
                flexDirection: 'row'
              }}>
                

                    <View style={{alignItems:'center', marginLeft:20}}>
                      {day}
                    </View>

              <View style={{flexDirection: 'row', flexWrap:'wrap', marginLeft:15, marginRight:15, alignItems:'center'}}>
              {hoursList}
              <View style={styles.buttonPlus}><Image style={{marginTop:8}} source={require('../../assets/icons/General/Add.imageset/icAdd.png')}/></View>
              </View>
              
                </View>
              </TouchableWithoutFeedback>

        );
  }
}

export default connect(mapStateToProps, null) (EditDispoContentDays);

const styles = StyleSheet.create({
  buttonPlus: {
    width:28,
    height:28, 
    borderWidth:1, 
    borderColor:'rgb(200,90,24)', 
    backgroundColor: 'rgb(200,90,24)', 
    alignItems:'center', 
    marginTop:-5,
  },
  days: {
    textAlign:'center', 
    width:40, 
    height:40, 
    color: 'black', 
    backgroundColor: 'rgba(0,0,0,0)', 
    borderWidth:0.5, 
    paddingTop:10,
    borderColor:'grey', 
    borderRadius:20
  },
});

