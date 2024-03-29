import React, { Component } from 'react';
import { View, Image, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Font, Amplitude } from 'expo';
import { connect } from 'react-redux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Parse } from 'parse/react-native';
import Modal from 'react-native-modalbox';
import { ButtonGroup, CheckBox } from 'react-native-elements';

import translate from '../../translate.js';

import EditDispoContentDays from './EditDispoContentDays';

function mapDispatchToProps(dispatch) {
  return {
        handleSubmit: function(day, hours) { 
        dispatch( {type: 'updateAvailability', day, hours} ) 
    }
  }
}

function mapStateToProps(store) {
  return { user: store.user, userClub: store.userClub }
}

// Necessary for array.sort who takes only first number into account
function compareNombres(a, b) {
  return parseInt(a) - parseInt(b);
}

class CheckBoxCustom extends React.Component {

  constructor(props) {
    super(props);
    this.handleClickHours = this.handleClickHours.bind(this);
    this.state = {
      checked: this.props.checked,
      day: this.props.day,
      hour: this.props.hour
    };
  }

  handleClickHours () {
    var checked = !this.state.checked
    this.setState({checked: checked});
    this.props.handleClickHours(this.props.hour, checked);
  }

  render(){
    return(
       <CheckBox
        center
        containerStyle={styles.checkHours}
        title={this.props.hour+'h'}
        onPress={this.handleClickHours}
        checked={this.state.checked}
        />
   );
  }
}

class EditDispoContent extends React.Component {

constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.handleClickHours = this.handleClickHours.bind(this);
    this._onPressValidateModal = this._onPressValidateModal.bind(this);
    this._onPressValidateDispo = this._onPressValidateDispo.bind(this);
    this.state = {
      fontAvenirNextLoaded: false,
      fontAvenirLoaded: false,
      modal:0,
      availability: this.props.user.availability,
      checked:false,
      hoursSelected:[]
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

  handleClick(modal) {
    this.setState({
      modal:modal,
      hoursSelected:this.props.user.availability[modal].hours
    })
    this.refs.modal.open();
  }

  handleClickHours(hour, isChecked) {
    // hourSelected gets all the hours before feeding Redux's store
    var hoursSelected = this.state.hoursSelected.concat();
    var indexDel;
    if (this.state.hoursSelected.indexOf(hour+'h')==-1 && isChecked==true) {
      hoursSelected.push(hour+"h");
    } else if((indexDel=this.state.hoursSelected.indexOf(hour+'h'))!=-1 && isChecked==false) {
      hoursSelected.splice(indexDel, 1);
    }
    hoursSelected.sort(compareNombres);
    this.setState({hoursSelected});
  }    

  _onPressValidateModal () {
    this.props.handleSubmit(this.state.modal, this.state.hoursSelected);
    this.refs.modal.close();
  }

  _onPressValidateDispo () {
      var user = Parse.User.current() || Parse.User.currentAsync();
      user.set("availability", this.state.availability);
      user.save();
      let availabilities;
      for (var i = 0; i < this.state.availability.length; i++) {
        availabilities = availabilities + this.state.availability[i].hours.length;
      }
      Amplitude.setUserProperties({availabilities:availabilities});
      this.props.navigation.goBack();
  }

  render() {

    var dayList = [];
    var days = [translate.monday[this.props.user.currentLocale],translate.tuesday[this.props.user.currentLocale],translate.wednesday[this.props.user.currentLocale],translate.thursday[this.props.user.currentLocale],translate.friday[this.props.user.currentLocale],translate.saturday[this.props.user.currentLocale],translate.sunday[this.props.user.currentLocale]];
    const { selectedIndex8h } = this.state;
    const { selectedIndex9h } = this.state;
    const { selectedIndex10h } = this.state;

    if (this.props.user.availability[0]===undefined) {
      for (var i = 0; i < days.length; i++) {
         dayList.push(
        <EditDispoContentDays days = {days[i]} hours = {[]} modal={i} handleClick={this.handleClick}/>
       )
      }
    } 
    else {
        for (var i = 0; i < this.state.availability.length; i++) {
          if (this.state.availability[i].hours.length > 0) {
          dayList.push(
            <EditDispoContentDays days = {this.state.availability[i].day.slice(0,3)} hours = {this.state.availability[i].hours} modal={i} handleClick={this.handleClick}/>
           )
          } else {
          dayList.push(
            <EditDispoContentDays days = {this.state.availability[i].day.slice(0,3)} hours = {[]} modal={i} handleClick={this.handleClick}/>
           )
          }
        }
    }

    var checkboxList=[];
    for (var i = 8; i <= 22; i++) {
      var isChecked=false;
      if (this.state.availability[this.state.modal].hours.indexOf(i+'h')!=-1) {
        isChecked = true;
      }
      checkboxList.push(<CheckBoxCustom hour={i} day={days[this.state.modal]} checked={isChecked} handleClickHours={this.handleClickHours}/>);
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
          top: 10
          }}>

          {dayList}
 
        </View>

        </KeyboardAwareScrollView>


          <TouchableOpacity onPress={this._onPressValidateDispo}>
          <Text style={styles.buttonValidate}>{translate.validate[this.props.user.currentLocale]}</Text>
          </TouchableOpacity>

          <Modal style={[styles.modal]} position={"bottom"} ref={"modal"}>
          <View style={{flex:1, justifyContent:'space-around'}}>
          <View style={{
          flexDirection:'row',
          justifyContent:'space-around',
          marginTop:15
          }}>
         <Text style={{fontSize:14}}> {days[this.state.modal]} </Text> 
         <Text style={{color: 'rgba(0,0,0,0)', backgroundColor:'rgba(0,0,0,0)'}}>H</Text> 
         <TouchableOpacity hitSlop={{top:50, left:50, bottom:50, right:50}} onPress={() => this.refs.modal.close()}>
         <Image source={require('../../assets/icons/General/Close.imageset/icCloseGrey.png')} />
         </TouchableOpacity>
         </View>

         <View style={{flexDirection: 'row', flexWrap:'wrap', marginLeft:1, marginRight:1, alignItems:'center'}}>
         {checkboxList}
         </View>
         </View>

          <TouchableOpacity onPress={this._onPressValidateModal}>
          <Text style={styles.buttonModal}>{translate.validate[this.props.user.currentLocale]}</Text>
          </TouchableOpacity>
          </Modal>

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
  buttonModal: {
    backgroundColor: 'rgb(200,90,24)',
    color: 'white',
    fontSize: 18,
    lineHeight: 30,
    textAlign: 'center',
    paddingTop:10,
    paddingBottom:10 
  },
  modal: {
    height:330
  },
  subtitle: {
    color:'white',
    backgroundColor: 'rgba(0,0,0,0)',
    fontFamily: 'Avenir',
    fontSize: 15,
    textAlign: 'center'
  },
  container: {
    backgroundColor:'white',
    height:40,
    marginBottom:30
  },
  checkHours: {
    width:72,
    height: 35, 
    borderWidth:1, 
    borderRadius:3, 
    overflow:'hidden',
    borderColor:'rgb(213,212,216)', 
    backgroundColor:'white'
  }
});

