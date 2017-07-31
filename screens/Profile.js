import React from 'react'
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native'
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


import ProfileHeader from '../constants/ProfileHeader'
import ProfileButton from '../constants/ProfileButton'
import ProfileContent from '../constants/ProfileContent'

export default class Profile extends React.Component {
  render() {
    return (

    	  <View style={{flex:1}}>
      <View style={{flex:1}}>
          <View style={{flex:1, top:50}}>
            <ProfileButton/>
          </View>
          <View style={{top:-70, height:110}}>
           <ProfileHeader/>
          </View>

          <View style={{flex:0.5, alignItems:'center', top:-120}}>
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
        
        </View>
          <View style={{flex:3, height:300, alignItems: 'center'}}>
            <ProfileContent/>
          </View>
        </View>



    );
  }
}

const styles = StyleSheet.create({
  title: {
    color: 'black',
    backgroundColor: 'rgba(0,0,0,0)',
    fontFamily: 'AvenirNext',
    fontSize: 13,
    paddingTop: 2,
    alignItem:'center', 
    justifyContent: 'center',
  },
  subtitle: {
    color: 'black',
    backgroundColor: 'rgba(0,0,0,0)',
    fontFamily: 'Avenir',
    fontSize: 12,
    paddingTop: 2,
    alignItem:'center', 
    justifyContent: 'center',
  },
});


