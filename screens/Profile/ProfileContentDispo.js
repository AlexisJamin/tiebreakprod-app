import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, ImageBackground } from 'react-native';
import { Font } from 'expo';
import { connect } from 'react-redux';

import ProfileContentDispoHours from './ProfileContentDispoHours';

import translate from '../../translate.js';


function mapStateToProps(store) {
  return { user: store.user }
}

class ProfileContentDispo extends React.Component {

constructor() {
    super();
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

        var hoursList = [];
        for (var i = 0; i < this.props.hours.length; i++) {
        hoursList.push(<ProfileContentDispoHours hours = {this.props.hours[i]} />)
        }

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

    return (

              <View style={{
              paddingTop:10, 
              paddingBottom: 10, 
              marginRight:40,
              flexDirection: 'row'
              }}>
                

                    <View style={{alignItems:'center', marginLeft:20}}>
                      <ImageBackground 
                        source={require('../../assets/icons/AppSpecific/DayCircle.imageset/imgDayBg.png')}
                        style={{
                          justifyContent: 'center',
                          alignItems: 'center',
                          width:45,
                          height:45
                         }}>
                       <Text style={{color: 'white', backgroundColor: 'rgba(0,0,0,0)', textAlign:'center'}}>{days}</Text>
                      </ImageBackground>
                    </View>

              <View style={{flexDirection: 'row', flexWrap:'wrap', marginLeft:15, marginRight:15, alignItems:'center'}}>
              {hoursList}
              </View>
              
                </View>

        );
  }
}

export default connect(mapStateToProps, null) (ProfileContentDispo);

