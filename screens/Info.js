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
import ModalPicker from 'react-native-modal-picker'



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



  render() {

    let index = 0;
        const data = [
            { key: index++, label: 'Débutant' },
            { key: index++, label: 'Intermédiaire' },
            { key: index++, label: 'Avancé' },
            { key: index++, label: '30/5' },
            { key: index++, label: '30/4' },
            { key: index++, label: '30/3' },
            { key: index++, label: '30/2' },
            { key: index++, label: '30/1' },
            { key: index++, label: '30' },
            { key: index++, label: '15/5' },
            { key: index++, label: '15/4' },
            { key: index++, label: '15/3' },
            { key: index++, label: '15/2' }
        ];

        const gender = [
            { key: index++, label: 'Homme' },
            { key: index++, label: 'Femme' },
        ];

        const hand = [
            { key: index++, label: 'Droitier' },
            { key: index++, label: 'Gaucher' },
        ];



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
          

          <View style={{marginTop:20}}>
          <ModalPicker
          style={{width:300}}
          data={data}
          initValue="Niveau actuel" />
          </View>

          <View style={{marginTop:20}}>
          <ModalPicker
          style={{width:300}}
          data={data}
          initValue="Meilleur niveau" />
          </View>

          <View style={{marginTop:20}}>
          <ModalPicker
          style={{width:300}}
          data={gender}
          initValue="Genre" />
          </View>

          <View style={{marginTop:20}}>
          <ModalPicker
          optionStyle={{height:50}}
          style={{width:300}}
          data={hand}
          initValue="Style" />
          </View>




            </View>

      </View>

    );
  }
}
