import React, { Component } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { Font } from 'expo';

import ProfileViewContentDispoHours from './ProfileViewContentDispoHours';


export default class ProfileViewContentDispo extends React.Component {

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
        hoursList.push(<ProfileViewContentDispoHours hours = {this.props.hours[i]} />)
        }


    return (

              <View style={{
              paddingTop:10, 
              paddingBottom: 10, 
              marginRight:40,
              flexDirection: 'row'
              }}>
                

                    <View style={{alignItems:'center', marginLeft:20}}>
                      <Image source={require('../../assets/icons/AppSpecific/DayCircle.imageset/imgDayBg.png')}>
                       <Text style={{color: 'white', backgroundColor: 'rgba(0,0,0,0)', textAlign:'center', marginTop: 12}}>{this.props.days}</Text>
                      </Image>
                    </View>

              <View style={{flexDirection: 'row', flexWrap:'wrap', marginLeft:15, marginRight:15, alignItems:'center'}}>
              {hoursList}
              </View>
              
                </View>

        );
  }
}


