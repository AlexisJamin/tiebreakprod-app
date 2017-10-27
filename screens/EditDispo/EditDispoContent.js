import React, { Component } from 'react'
import { View, Image, Text, StyleSheet, ScrollView, TouchableWithoutFeedback } from 'react-native'
import { Font } from 'expo'
import { NavigationActions } from 'react-navigation'
import { connect } from 'react-redux'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Parse } from 'parse/react-native'
import Modal from 'react-native-modalbox'
import { ButtonGroup, CheckBox } from 'react-native-elements'


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
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      fontAvenirNextLoaded: false,
      fontAvenirLoaded: false,
      modal:0,
      availability: this.props.user.availability,
      checked:false,
      backgroundColorBox:'white',
      textColorBox:'black'  
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
    console.log("coucou");
    console.log(modal);
    this.setState({modal:modal})
    this.refs.modal.open();
  }
    

  render() {

    var dayList = [];
    var days = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];
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


          <TouchableWithoutFeedback onPress={this._onPressValidateDispo}>
          <Text style={styles.buttonValidate}>Valider</Text>
          </TouchableWithoutFeedback>

          <Modal style={[styles.modal]} position={"bottom"} ref={"modal"}>
          <View style={{
          flex:1, 
          flexDirection: 'row',
          justifyContent: 'space-around',
          marginTop:20, 
          marginBottom:-30
          }}>
         <Text style={{fontSize:14}}> {days[this.state.modal]} </Text> 
         <Text style={{color: 'rgba(0,0,0,0)', backgroundColor:'rgba(0,0,0,0)'}}>H</Text> 
         <TouchableWithoutFeedback onPress={() => this.refs.modal.close()}>
         <Image source={require('../../assets/icons/General/Close.imageset/icCloseGrey.png')} />
         </TouchableWithoutFeedback>
         </View>

         <View style={{flexDirection: 'row', flexWrap:'wrap', marginLeft:5, alignItems:'center'}}>

          <CheckBox
          center
          checkedColor='white'
          containerStyle={{
            width:72,
            height: 35, 
            borderWidth:1, 
            borderRadius:'3', 
            overflow:'hidden',
            borderColor:'rgb(213,212,216)', 
            backgroundColor:this.state.backgroundColorBox,
          }}
          textStyle={{
            color:this.state.textColorBox,
            fontFamily:'Avenir'
          }}
          title='8h'
          onPress={() => this.setState({checked:true, backgroundColorBox:'rgb(42,129,82)', textColorBox:'white' })}
          checked={this.state.checked}
          />

          <CheckBox
          center
          containerStyle={styles.checkHours}
          title='9h'
          onPress={() => this.setState({checked:true})}
          checked={this.state.checked}
          />

          <CheckBox
          center
          containerStyle={styles.checkHours}
          title='10h'
          onPress={() => this.setState({checked:true})}
          checked={this.state.checked}
          />

          <CheckBox
          center
          containerStyle={styles.checkHours}
          title='8h'
          onPress={() => this.setState({checked:true})}
          checked={this.state.checked}
          />

          <CheckBox
          center
          containerStyle={styles.checkHours}
          title='9h'
          onPress={() => this.setState({checked:true})}
          checked={this.state.checked}
          />

          <CheckBox
          center
          containerStyle={styles.checkHours}
          title='10h'
          onPress={() => this.setState({checked:true})}
          checked={this.state.checked}
          />

          <CheckBox
          center
          containerStyle={styles.checkHours}
          title='8h'
          onPress={() => this.setState({checked:true})}
          checked={this.state.checked}
          />

          <CheckBox
          center
          containerStyle={styles.checkHours}
          title='9h'
          onPress={() => this.setState({checked:true})}
          checked={this.state.checked}
          />

          <CheckBox
          center
          containerStyle={styles.checkHours}
          title='10h'
          onPress={() => this.setState({checked:true})}
          checked={this.state.checked}
          />

          <CheckBox
          center
          containerStyle={styles.checkHours}
          title='8h'
          onPress={() => this.setState({checked:true})}
          checked={this.state.checked}
          />

          <CheckBox
          center
          containerStyle={styles.checkHours}
          title='9h'
          onPress={() => this.setState({checked:true})}
          checked={this.state.checked}
          />

          <CheckBox
          center
          containerStyle={styles.checkHours}
          title='10h'
          onPress={() => this.setState({checked:true})}
          checked={this.state.checked}
          />

          <CheckBox
          center
          containerStyle={styles.checkHours}
          title='10h'
          onPress={() => this.setState({checked:true})}
          checked={this.state.checked}
          />

          </View>

          <TouchableWithoutFeedback onPress={this._onPressValidateModal}>
          <Text style={styles.buttonModal}>Valider</Text>
          </TouchableWithoutFeedback>
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
    height: 280
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
    height: 40,
    marginBottom:30,
  },
  checkHours: {
    width:72,
    height: 35, 
    borderWidth:1, 
    borderRadius:'3', 
    overflow:'hidden',
    borderColor:'rgb(213,212,216)', 
    backgroundColor:'white'
  },
});

