import React from 'react'
import { StyleSheet, View, Image, Alert, Text, TextInput, TouchableWithoutFeedback, ScrollView, Keyboard, DatePickerIOS } from 'react-native'
import { Font } from 'expo'
import Modal from 'react-native-modalbox'
import ModalDropdown from 'react-native-modal-dropdown'
import { connect } from 'react-redux'
import DateTimePicker from 'react-native-modal-datetime-picker';
import { ButtonGroup, CheckBox } from 'react-native-elements'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Parse } from 'parse/react-native'

Parse.initialize("3E8CAAOTf6oi3NaL6z8oVVJ7wvtfKa");
Parse.serverURL = 'https://tiebreak.herokuapp.com/parse'

import moment from 'moment'
var dateFormat = moment().format();

function mapDispatchToProps(dispatch) {
  return {
        handleSubmit: function(value) { 
        dispatch( {type: 'user', value: value} ) 
    }
  }
}

class CreateGameContent extends React.Component {

  constructor(props) {
    super(props);
    this._onPressValidateButton = this._onPressValidateButton.bind(this);
    this.updateIndexCourt = this.updateIndexCourt.bind(this);
    this.selectClub = this.selectClub.bind(this);
    this.state = {
      fontAvenirNextLoaded: false,
      fontAvenirLoaded: false,
      isDateTimePickerVisible: false,
      clubs:["Tennis du Luxembourg","Tennis Atlantique"],
      selectedIndexCourt: '',
      selectedClub:'',
      surface: '',
      condition: '',
      date:'',
      price:'',
      checked: false
    };
  }

  async componentDidMount() {
   
    await Font.loadAsync({
      'AvenirNext': require('../../assets/fonts/AvenirNext.ttf'),
      'Avenir': require('../../assets/fonts/Avenir.ttf'),
    });
    this.setState({ 
      fontAvenirNextLoaded: true,
      fontAvenirLoaded: true,

    });
  }

updateIndexCourt (selectedIndex) {
    this.setState({selectedIndexCourt:selectedIndex})
  }

  selectClub (selectedClub) {
    this.setState({selectedClub:selectedClub})
  }
  

  _onPressValidateButton() {
    
      }

  _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });

  _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

  _handleDatePicked = (date) => {
    console.log('A date has been picked: ', date);
    this.setState({ date: date });
    this._hideDateTimePicker();
  };

  render() {

    const buttonsCourt = ['Intérieur', 'Extérieur']
    const clubs = ['Tennis du Luxembourg', 'Tennis Atlantique', 'Tennis Elisabeth', 'Tennis 16', 'Autre']
    const { selectedIndexCourt } = this.state;
    const { selectedClub } = this.state;

    return (

      <View style={{flex:1, backgroundColor:'white'}}>

        <ScrollView>

        <View style={styles.page}>

        

         {
          this.state.fontAvenirLoaded ? (<Text style={{marginBottom:15, fontFamily: 'AvenirNext', paddingLeft:10}}> DATE </Text>
          ) : null 
         }

         <View style={styles.container}>
        <TouchableWithoutFeedback onPress={this._showDateTimePicker}>
          <View style={styles.button}>
            <Text></Text>
          </View>
        </TouchableWithoutFeedback>
        <DateTimePicker
          isVisible={this.state.isDateTimePickerVisible}
          onConfirm={this._handleDatePicked}
          onCancel={this._hideDateTimePicker}
          mode="datetime"
          cancelTextIOS="Annuler"
          confirmTextIOS="Valider"
          titleIOS="Choisir une date"
        />
        </View>
        
        {
          this.state.fontAvenirLoaded ? (<Text style={{marginBottom:10, fontFamily: 'AvenirNext', paddingLeft:10}}> TERRAIN </Text>
          ) : null 
         }

         {
          this.state.fontAvenirLoaded ? (<Text style={{marginBottom:10, fontFamily: 'Avenir', paddingLeft:10}}> Lieu </Text>
          ) : null 
         }

            <ButtonGroup 
            onPress={() => this.selectClub()}
            selectedIndex={selectedClub}
            buttons={[this.state.clubs[0]]}
            textStyle={styles.title}
            selectedBackgroundColor={'rgb(42,127,83)'}
            selectedTextStyle={styles.subtitle}
            containerStyle={styles.clubs}
            />

            <ButtonGroup 
            onPress={this.selectClub}
            selectedIndex={selectedClub}
            buttons={[this.state.clubs[1]]}
            textStyle={styles.title}
            selectedBackgroundColor={'rgb(42,127,83)'}
            selectedTextStyle={styles.subtitle}
            containerStyle={styles.clubs}
            />



          {
          this.state.fontAvenirLoaded ? (<Text style={{marginBottom:10, fontFamily: 'Avenir', paddingLeft:10}}> Conditions </Text>
          ) : null 
         }

         <ButtonGroup 
          onPress={this.updateIndexCourt}
          selectedIndex={selectedIndexCourt}
          buttons={buttonsCourt}
          textStyle={styles.title}
          selectedBackgroundColor={'rgb(42,127,83)'}
          selectedTextStyle={styles.subtitle}
          containerStyle={styles.courts}
          />
          
          {
          this.state.fontAvenirLoaded ? (<Text style={{marginBottom:10, fontFamily: 'Avenir', paddingLeft:10}}> Type de surface </Text>
          ) : null 
         }

         <CheckBox
          center
          title='8h'
          onPress={() => this.setState({checked:true})}
          checked={this.state.checked}
        />

          <View style={{alignItems:'center', justifyContent:'center'}}>

          <ModalDropdown 
          style={styles.input} 
          dropdownStyle={styles.modalDrop} 
          textStyle={styles.text}
          dropdownTextStyle={styles.text}
          defaultValue={'Surface'}
          options={['Dur', 'Gazon', 'Moquette', 'Terre battue', 'Synthétique']}
          onSelect={(index, surface) => this.setState({surface})}
          />

          </View>

          {
          this.state.fontAvenirLoaded ? (<Text style={{marginBottom:10, fontFamily: 'Avenir', paddingLeft:10}}> Prix </Text>
          ) : null 
         }

          <View style={{alignItems:'center', justifyContent:'center'}}>

          <TextInput 
            ref='price'
            style={styles.input} 
            keyboardType="default"
            returnKeyType='done'
            autoCapitalize='none'
            autoCorrect='false'
            secureTextEntry='true'
            placeholder='Sans frais'
            underlineColorAndroid='rgba(0,0,0,0)'
            onChangeText={(price) => this.setState({price})}
            onSubmitEditing={Keyboard.dismiss}
            />
            </View>

          </View>

       

         </ScrollView>

          
          <View style={{
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'stretch',
         }}>
            <TouchableWithoutFeedback onPress={this._onPressValidateButton}>
            <Text style={styles.buttonLogIn}>Créer la partie</Text>
            </TouchableWithoutFeedback>
        </View>

       


        </View>

    );
  }

}

export default connect(null, mapDispatchToProps) (CreateGameContent);

const styles = StyleSheet.create({
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
    justifyContent: 'center'
  },
  title: {
    color: 'black',
    backgroundColor: 'rgba(0,0,0,0)',
    fontFamily: 'Avenir',
    fontSize: 15,
    textAlign: 'center'
  },
  modalDrop: {
    marginLeft:1,
    width:295,
    height:80, 
    marginTop:10,
  },
  text: {
    color:'black', 
    top:8,
    backgroundColor: 'rgba(0,0,0,0)',
    fontSize: 18,
  },
   subtitle: {
    color: 'white',
    backgroundColor: 'rgba(0,0,0,0)',
    fontFamily: 'Avenir',
    fontSize: 15,
    textAlign: 'center'
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
  clubs: {
   backgroundColor: 'white',
    height: 60,
    marginBottom:30,
    width:350
  },
  courts: {
    backgroundColor: 'white',
    height: 40,
    marginBottom:30,
    width:350
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: 'lightblue',
    padding: 12,
    margin: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  }
});
