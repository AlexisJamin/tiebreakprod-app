import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { Font } from 'expo';
import { connect } from 'react-redux';

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
          var days = 'Lun';
        } else if (this.props.days == 'Tue') {
          var days = 'Mar';
        } else if (this.props.days == 'Wed') {
          var days = 'Mer';
        } else if (this.props.days == 'Thu') {
          var days = 'Jeu';
        } else if (this.props.days == 'Fri') {
          var days = 'Ven';
        } else if (this.props.days == 'Sat') {
          var days = 'Sam';
        } else if (this.props.days == 'Sun') {
          var days = 'Dim';
        }
        var day;
        var hoursList = [];
        if (this.props.hours.length>0) {
        day=(<Image source={require('../../assets/icons/AppSpecific/DayCircle.imageset/imgDayBg.png')}>
              <Text style={{color: 'white', backgroundColor: 'rgba(0,0,0,0)', textAlign:'center', marginTop: 12}}>{days}</Text>
              </Image>)
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
    paddingTop:10, 
    borderWidth:0.5, 
    borderColor:'grey', 
    borderRadius:20
  },
});

