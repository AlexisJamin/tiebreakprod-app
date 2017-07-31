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


import HomeHeader from '../constants/HomeHeader'
import HomeSlideSearch from '../constants/HomeSlideSearch'
import HomeSlideAdd from '../constants/HomeSlideAdd'
import HomeButton from '../constants/HomeButton'
import Footer from '../constants/Footer'

export default class Home extends React.Component {
  render() {
    return (

    	<View style={{flex: 1}} >
 
            <View style={{height:120}}>
            <HomeHeader/>
            </View>

             <View style={{flex: 1}}>
            <HomeSlideSearch/>
            </View>

        <View style={{
          height:30,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          <Svg
            height="60"
            width="300"
          >
            <Line
              x1="0"
              y1="0"
              x2="300"
              y2="0"
              stroke="rgb(210,210,210)"
              strokeWidth="2"
             />
          </Svg>
        </View>


            <View style={{flex:1}}>
            <HomeSlideAdd/>
            </View>

            <View style={{height:160}}>
            <Footer/>
            </View>


        <View style={{
        flexDirection: 'column',
        justifyContent: 'center',
        backgroundColor: 'rgba(200,90,24,1)', 
        alignItems: 'center',
        height: 60,
         }}>
              <HomeButton/>
        </View>

      </View>

    );
  }
}
