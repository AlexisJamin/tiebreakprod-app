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


import ProfileHeader from '../constants/ProfileHeader'
import ProfileButton from '../constants/ProfileButton'

export default class Profile extends React.Component {
  render() {
    return (

    	<View>
        <View style={{position: 'relative', top: 100}}>
           <ProfileButton/>
        </View>

        <View style={{flex: 1, position:'absolute'}}>
              <ProfileHeader/>    
        </View>

          <View style={{alignItems: 'center', top:30}}>
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

    );
  }
}
