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


import InfoHeader from '../constants/InfoHeader'


export default class Info extends React.Component {
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

          <FormLabel>Prénom</FormLabel>
          <FormInput onChangeText={'good'}
          containerStyle={{width:300, borderWidth:1, borderColor:'black', overflow:'hidden', borderRadius:5}}/>
          <FormLabel>Nom</FormLabel>
          <FormInput onChangeText={'good'}
          containerStyle={{width:300, borderWidth:1, borderColor:'black', overflow:'hidden', borderRadius:5}}/>
          <FormLabel>Email</FormLabel>
          <FormInput onChangeText={'good'}
          containerStyle={{width:300, borderWidth:1, borderColor:'black', overflow:'hidden', borderRadius:5}}/>
          <FormLabel>Niveau</FormLabel>
          <FormInput onChangeText={'good'}
          containerStyle={{width:300, borderWidth:1, borderColor:'black', overflow:'hidden', borderRadius:5}}/>
          <FormLabel>Meilleur niveau</FormLabel>
          <FormInput onChangeText={'good'}
          containerStyle={{width:300, borderWidth:1, borderColor:'black', overflow:'hidden', borderRadius:5}}/>
          <FormLabel>Style</FormLabel>
          <FormInput onChangeText={'good'}
          containerStyle={{width:300, borderWidth:1, borderColor:'black', overflow:'hidden', borderRadius:5}}/>
          <FormLabel>Genre</FormLabel>
          <FormInput onChangeText={'good'}
          containerStyle={{width:300, borderWidth:1, borderColor:'black', overflow:'hidden', borderRadius:5}}/>
          <FormValidationMessage>Merci de remplir tous les champs</FormValidationMessage>

            </View>

      </View>

    );
  }
}
