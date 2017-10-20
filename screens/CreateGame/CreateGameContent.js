import React from 'react'
import { StyleSheet, View, Image, Alert, Text, TextInput, TouchableWithoutFeedback, ScrollView, Keyboard } from 'react-native'
import { Facebook, Constants, ImagePicker, registerRootComponent, Font } from 'expo'
import Modal from 'react-native-modalbox'
import ModalDropdown from 'react-native-modal-dropdown'
import { NavigationActions } from 'react-navigation'
import { connect } from 'react-redux'
import DatePicker from 'react-native-datepicker'
import { ButtonGroup } from 'react-native-elements'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Parse } from 'parse/react-native'

Parse.initialize("3E8CAAOTf6oi3NaL6z8oVVJ7wvtfKa");
Parse.serverURL = 'https://tiebreak.herokuapp.com/parse'

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
    this.state = {
      fontAvenirNextLoaded: false,
      fontAvenirLoaded: false,
      selectedIndexCourt: '',
      surface: '',
      date:"20-10-2017",
      price:''
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
  

  _onPressValidateButton() {
    
    
      }



  render() {

    const buttonsCourt = ['Intérieur', 'Extérieur']
    const { selectedIndexCourt } = this.state;

    return (

      <View style={{flex:1, backgroundColor:'white'}}>

        <ScrollView>

        <View style={styles.page}>

        

         {
          this.state.fontAvenirLoaded ? (<Text style={{marginBottom:30, fontFamily: 'AvenirNext', paddingLeft:10}}> DATE </Text>
          ) : null 
         }

         <DatePicker
        style={{width: 200, paddingLeft:10}}
        date={this.state.date}
        mode="date"
        placeholder="Date"
        format="DD-MM-YYYY"
        minDate="20-10-2017"
        maxDate="25-10-2017"
        confirmBtnText="Valider"
        cancelBtnText="Annuler"
        customStyles={{
          dateIcon: {
            position: 'absolute',
            left: 0,
            top: 4,
            marginLeft: 0
          },
          dateInput: {
            marginLeft: 36
          }
          // ... You can check the source to find the other keys.
        }}
        onDateChange={(date) => {this.setState({date: date})}}
      />
        
        {
          this.state.fontAvenirLoaded ? (<Text style={{marginBottom:30, fontFamily: 'AvenirNext', paddingLeft:10}}> TERRAIN </Text>
          ) : null 
         }

         <ButtonGroup 
          onPress={this.updateIndexCourt}
          selectedIndex={selectedIndexCourt}
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
          defaultValue={'Surface'}
          options={['Dur', 'Gazon', 'Moquette', 'Terre battue', 'Synthétique']}
          onSelect={(index, surface) => this.setState({surface})}
          />

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
    marginTop:20, 
    paddingLeft: 10
  },
  container: {
    backgroundColor: 'white',
    height: 40,
    marginBottom:30,
    width:350
  }
});
