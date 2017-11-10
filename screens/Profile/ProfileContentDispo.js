import React, { Component } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { Font } from 'expo';
import { connect } from 'react-redux';

import ProfileContentDispoHours from './ProfileContentDispoHours';


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

export default connect(mapStateToProps, null) (ProfileContentDispo);

const styles = StyleSheet.create({
  name: {
    color: 'black',
    backgroundColor: 'rgba(0,0,0,0)',
    fontFamily: 'AvenirNext',
    fontSize: 15,
    paddingTop: 2,
    alignItem:'center', 
    justifyContent: 'center'
  },
  age: {
    color: 'black',
    backgroundColor: 'rgba(0,0,0,0)',
    fontFamily: 'Avenir',
    fontSize: 13,
    paddingTop: 4,
    alignItem:'center', 
    justifyContent: 'center'
  },
  gender: {
    color: 'black',
    backgroundColor: 'rgba(0,0,0,0)',
    fontFamily: 'Avenir',
    fontSize: 12,
    paddingTop: 4,
    alignItem:'center', 
    justifyContent: 'center'
  },
  level: {
    color: 'black',
    backgroundColor: 'rgba(0,0,0,0)',
    fontFamily: 'Avenir',
    fontSize: 12,
    paddingTop: 9,
    alignItem:'center', 
    justifyContent: 'center'
  },
  clubs: {
    color: 'black',
    backgroundColor: 'rgba(0,0,0,0)',
    fontFamily: 'Avenir',
    fontSize: 14,
    left:5,
    marginBottom: 12,
    alignItem:'center', 
    justifyContent: 'center'
  },
  button: {
    width:50,
    height: 30, 
    borderWidth:1, 
    borderColor:'rgb(42,129,82)', 
    borderRadius:3, 
    overflow:'hidden', 
    paddingTop:5, 
    paddingBottom: 5, 
    marginBottom:5,
    marginRight: 10, 
    color: 'white', 
    backgroundColor: 'rgb(42,129,82)', 
    textAlign:'center'
  }
});

