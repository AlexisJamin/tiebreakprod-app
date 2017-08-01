import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements'
import Svg,{
    Circle,
    Ellipse,
    G,
    LinearGradient,
    RadialGradient,
    Line,
    Path,
    Polygon,
    Polyline,
    Rect,
    Symbol,
    Use,
    Defs,
    Stop
} from 'react-native-svg';
const DropDown = require('react-native-dropdown');
const {
  Select,
  Option,
  OptionList,
  updatePosition
} = DropDown;



import InfoHeader from '../constants/InfoHeader'


export default class Info extends React.Component {

constructor(props) {
    super(props);
    this.state = { 
      firsName: '',
      lastName: '',
      email: '',
  };
  }

componentDidMount() {
    updatePosition(this.refs['SELECT1']);
    updatePosition(this.refs['OPTIONLIST']);
  }

  _getOptionList() {
    return this.refs['OPTIONLIST'];
  }

 _canada(province) {

    this.setState({
      canada: province
    });
  }

  render() {
    return (

    	<View style={{flex: 1}} >
 
            <View style={{height:120}}>
            <InfoHeader/>
            </View>

            <View style={{flex:0.5, alignItems:'center', top:-70}}>
             <Svg height={70} width={70}>
              <Circle
                cx={35}
                cy={35}
                r={35}
                strokeWidth={0.5}
                stroke="black"
                fill="white"
              />
             </Svg>
            </View>

             <View style={{flex: 4, alignItems:'center', marginTop:-60}}>

          <FormInput 
          ref='forminput'
          textInputRef='firsName'
          placeholder='Prénom'
          autoCapitalize='words'
          returnKeyType='done'
          onChangeText={(firsName) => this.setState({firsName})}
          value={this.state.firsName}
          inputStyle={{marginLeft:20}}
          containerStyle={{width:300, borderWidth:1, borderColor:'rgb(213,212,216)', overflow:'hidden', borderRadius:5, marginTop: 20}}/>
          <FormInput 
          ref='forminput'
          textInputRef='lastName'
          placeholder='Nom'
          autoCapitalize='words'
          returnKeyType='done'
          onChangeText={(lastName) => this.setState({lastName})}
          value={this.state.lastName}
          inputStyle={{marginLeft:20}}
          containerStyle={{width:300, borderWidth:1, borderColor:'rgb(213,212,216)', overflow:'hidden', borderRadius:5, marginTop: 20}}/>
          <FormInput 
          ref='forminput'
          textInputRef='email'
          placeholder='Email'
          keyboardType='email-address'
          returnKeyType='done'
          onChangeText={(email) => this.setState({email})}
          value={this.state.email}
          inputStyle={{marginLeft:20}}
          containerStyle={{width:300, borderWidth:1, borderColor:'rgb(213,212,216)', overflow:'hidden', borderRadius:5, marginTop: 20}}/>
          <FormValidationMessage>Merci de remplir tous les champs</FormValidationMessage>


          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Select
            width={250}
            ref="SELECT1"
            optionListRef={this._getOptionList.bind(this)}
            defaultValue="Select a Province in Canada ..."
            onSelect={this._canada.bind(this)}>
            <Option>Alberta</Option>
            <Option>British Columbia</Option>
            <Option>Manitoba</Option>
            <Option>New Brunswick</Option>
            <Option>Newfoundland and Labrador</Option>
            <Option>Northwest Territories</Option>
            <Option>Nova Scotia</Option>
            <Option>Nunavut</Option>
            <Option>Ontario</Option>
            <Option>Prince Edward Island</Option>
            <Option>Quebec</Option>
            <Option>Saskatchewan</Option>
            <Option>Yukon</Option>
          </Select>
          
          <OptionList ref="OPTIONLIST"/>
      </View>

            </View>

      </View>

    );
  }
}
