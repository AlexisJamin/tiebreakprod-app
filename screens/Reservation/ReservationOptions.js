import React, { Component } from 'react';
import { View, Image, Text, StyleSheet, ScrollView, TouchableOpacity, Switch, Slider} from 'react-native';
import { Font } from 'expo';
import ModalDropdown from 'react-native-modal-dropdown'
import DateTimePicker from 'react-native-modal-datetime-picker';
import { ButtonGroup } from 'react-native-elements';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import { connect } from 'react-redux';
import { Parse } from 'parse/react-native';

import translate from '../../translate.js';

import moment from 'moment/min/moment-with-locales';

function mapStateToProps(store) {

  return { user: store.user, reservationOption: store.reservationOption, button: store.button }
};

function mapDispatchToProps(dispatch) {
  return {
        handleSubmit: function(value) { 
        dispatch( {type: 'reservationOption', value: value} ) 
    },
        handleSubmitButton: function(value) { 
        dispatch( {type: 'button', value: value} ) 
    }
  }
};

class ReservationOptions extends React.Component {

constructor(props) {
    super(props);
    console.log('props.reservationOption');
    console.log(props.reservationOption);
    this._onPressValidateButton = this._onPressValidateButton.bind(this);
    this.state = {
      fontAvenirNextLoaded: false,
      filterCondition:this.props.reservationOption.filterCondition,
      filterType:this.props.reservationOption.filterType,
      filterHours:this.props.reservationOption.filterHours,
      filterDiscount:this.props.reservationOption.filterDiscount,
      range:this.props.reservationOption.range,
      date:this.props.reservationOption.date,
      surface:this.props.reservationOption.surface,
      isDateTimePickerVisible:false
    };
  moment.locale(this.props.user.currentLocale);
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

  _onPressValidateButton() {

    this.props.handleSubmit({
      filterCondition:this.state.filterCondition,
      filterType:this.state.filterType,
      filterHours:this.state.filterHours,
      filterDiscount:this.state.filterDiscount,
      range:this.state.range,
      date:this.state.date,
      surface:this.state.surface
    })

      this.props.handleSubmitButton({
        ChatButtonIndex:this.props.button.ChatButtonIndex,
        CommunityButtonIndex:this.props.button.CommunityButtonIndex,
        CalendarButtonIndex:this.props.button.CalendarButtonIndex,
        ProfileButtonIndex:this.props.button.ProfileButtonIndex,
        ReservationButtonIndex:0
      })

    this.props.navigation.navigate("ReservationContent");

  }

  _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });

  _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

  _handleDatePicked = (date) => {
    console.log('A date has been picked: ', date);
    this.setState({ date: date });
    this._hideDateTimePicker();
  };

  render() {

    const buttonsCourt = [translate.indoor[this.props.user.currentLocale], translate.outdoor[this.props.user.currentLocale], translate.indifferent[this.props.user.currentLocale]];
    const buttonsType = ["Leçon avec professeur", "Terrain", "Les deux"];
    const buttonsDiscount = ["Tous les créneaux", "Uniquement avec réduction"];
    const surfaces = [translate.hard[this.props.user.currentLocale], translate.grass[this.props.user.currentLocale], translate.carpet[this.props.user.currentLocale], translate.clay[this.props.user.currentLocale], translate.synthetic[this.props.user.currentLocale]];
    const defaultValueSurface = (!this.state.surface && translate.surface[this.props.user.currentLocale]) || (this.state.surface)
    let { filterCondition } = this.state;
    let { filterType } = this.state;
    let { filterDiscount } = this.state;
    let { range } = this.state;
    const minimumDate = new Date();
    var limit = moment(minimumDate).add(7, 'days');
    const maximumDate = new Date(limit);

    return (

      <View style={{flex:1, backgroundColor:'white'}}>

        <ScrollView>

        <View style={styles.page}>

         {
          this.state.fontAvenirLoaded ? (<Text style={{marginBottom:30, fontFamily: 'Avenir', fontStyle: 'italic', textAlign:'center'}}>Quelles sont vos préférences de recherche ?</Text>
          ) : null 
         }

        <View style={styles.containerDatePicker}>
        <TouchableOpacity onPress={this._showDateTimePicker}>
          <View style={styles.button}>
            <Text style={{color:'white'}}>{ (this.state.date && moment(this.state.date).format("dddd D MMMM YYYY")) || translate.chooseDate[this.props.user.currentLocale] }</Text>
          </View>
        </TouchableOpacity>
        <DateTimePicker
          isVisible={this.state.isDateTimePickerVisible}
          onConfirm={this._handleDatePicked}
          onCancel={this._hideDateTimePicker}
          mode="date"
          minimumDate={minimumDate}
          maximumDate={maximumDate}
          cancelTextIOS={translate.cancel[this.props.user.currentLocale]}
          confirmTextIOS={translate.validate[this.props.user.currentLocale]}
          titleIOS={translate.chooseDate[this.props.user.currentLocale]}
          locale={this.props.user.currentLocale}
        />
        </View>

         {
          this.state.fontAvenirLoaded ? (<Text style={{marginBottom:20, fontFamily: 'AvenirNext', paddingLeft:10}}>{translate.fields[this.props.user.currentLocale].toUpperCase()}</Text>
          ) : null 
         }

      { !this.state.date &&

        <View>
          <View style={{flexDirection:'row', justifyContent: 'center', marginBottom:5}}>
          {
            this.state.fontAvenirLoaded ? (<Text style={{fontFamily: 'Avenir', fontWeight: '600'}}>{translate.maxDistance[this.props.user.currentLocale]} : </Text> 
            ) : null 
           }
           {
            this.state.fontAvenirLoaded ? (<Text style={{fontFamily: 'Avenir', fontWeight: '600'}}> {this.state.range} km </Text> 
            ) : null 
           }
          </View>

          <View style={{alignItems:'center', marginBottom:5}}>
          <Slider 
            style={{width: 350}}
            maximumValue={30}
            step={1}
            value={range}
            minimumTrackTintColor='rgb(42,129,82)'
            onValueChange={(range) => this.setState({range})}
          />
          </View>
        </View>

      }

         <ButtonGroup 
          onPress={(filterCondition) => this.setState({filterCondition})}
          selectedIndex={filterCondition}
          buttons={buttonsCourt}
          textStyle={styles.title}
          selectedBackgroundColor={'rgb(42,127,83)'}
          selectedTextStyle={styles.subtitle}
          containerStyle={styles.container}
          />

          <View style={{alignItems:'center', justifyContent:'center'}}>

          <ModalDropdown 
          style={styles.input} 
          dropdownStyle={styles.modalDrop} 
          textStyle={styles.text}
          dropdownTextStyle={styles.text}
          defaultValue={defaultValueSurface}
          options={surfaces}
          onSelect={(index, surface) => this.setState({surface:surface})}
          />

          </View>

         {
          this.state.fontAvenirLoaded ? (<Text style={{fontFamily: 'AvenirNext', textAlign: 'left', paddingLeft:10}}>HORAIRES</Text>
          ) : null 
         }

        <View style={{flexDirection:'row', justifyContent: 'center', marginBottom:10, marginTop:10}}>
        {
          this.state.fontAvenirLoaded ? (<Text style={{fontFamily: 'Avenir', fontWeight: '600'}}>Entre {this.state.filterHours[0]} h </Text> 
            ) : null 
         }
       
        {
          this.state.fontAvenirLoaded ? (<Text style={{fontFamily: 'Avenir', fontWeight: '600'}}>et {this.state.filterHours[1]} h </Text> 
            ) : null 
         }
        </View>

        <View style={{alignItems:'center'}}>
        <MultiSlider
            values={[this.state.filterHours[0], this.state.filterHours[1]]}
            sliderLength={320}
            onValuesChange={(values) => this.setState({filterHours:values})}
            min={8}
            max={22}
            step={1}
            selectedStyle={{
            backgroundColor: 'rgb(42,129,82)',
            }}
            allowOverlap
            snapped
          />
          </View>

        {
          this.state.fontAvenirLoaded ? (<Text style={{marginBottom:20, fontFamily: 'AvenirNext', paddingLeft:10}}>TYPE</Text>
          ) : null 
         }

          <ButtonGroup 
          onPress={(filterType) => this.setState({filterType})}
          selectedIndex={filterType}
          buttons={buttonsType}
          textStyle={styles.title}
          selectedBackgroundColor={'rgb(42,127,83)'}
          selectedTextStyle={styles.subtitle}
          containerStyle={styles.container}
          />

          {
          this.state.fontAvenirLoaded ? (<Text style={{marginBottom:20, fontFamily: 'AvenirNext', paddingLeft:10}}>RÉDUCTION</Text>
          ) : null 
         }

          <ButtonGroup 
          onPress={(filterDiscount) => this.setState({filterDiscount})}
          selectedIndex={filterDiscount}
          buttons={buttonsDiscount}
          textStyle={styles.title}
          selectedBackgroundColor={'rgb(42,127,83)'}
          selectedTextStyle={styles.subtitle}
          containerStyle={styles.container}
          />

          </View>

       

         </ScrollView>

         <TouchableOpacity onPress={this._onPressValidateButton}>
         <Text style={styles.buttonLogIn}>{translate.validate[this.props.user.currentLocale]}</Text>
         </TouchableOpacity>

         </View>

    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps) (ReservationOptions);

var styles = StyleSheet.create({
  buttonLogIn: {
    backgroundColor: 'rgb(200,90,24)',
    color: 'white',
    fontSize: 18,
    lineHeight: 30,
    textAlign: 'center',
    overflow:'hidden', 
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
    height: 45,
    marginBottom:30,
  },
  containerDatePicker: {
    flex:1,
    marginBottom:10,
    justifyContent:'center',
    alignItems:'center',
  },
  button: {
    backgroundColor:'rgb(42,127,83)',
    padding:12,
    justifyContent:'center',
    alignItems:'center',
    borderRadius:4,
    borderColor:'rgba(0,0,0,0)',
  },
  modalDrop: {
    marginLeft:1,
    width:320,
    height:150, 
    marginTop:10,
  },
  text: {
    color:'black', 
    paddingTop:10,
    backgroundColor:'rgba(0,0,0,0)',
    fontSize: 14,
  },
  input: {
    width:350,
    height:40, 
    borderWidth:1, 
    borderColor:'rgb(213,212,216)', 
    overflow:'hidden', 
    borderRadius:5,
    marginBottom:20, 
    paddingLeft: 10,
    backgroundColor:'white'
  },
});
