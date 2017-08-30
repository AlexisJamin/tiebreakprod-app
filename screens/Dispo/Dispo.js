import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
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


import DispoHeader from './DispoHeader'
import DispoContent from './DispoContent'


export default class Home extends React.Component {
  render() {
    return (

    	<View style={{flex: 1}} >
 
            <View style={{height:120}}>
            <DispoHeader/>
            </View>

             <View style={{flex: 4}}>
            <DispoContent/>
            </View>

      </View>

    );
  }
}
