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
} from 'react-native-svg'

import Home from './screens/Home'
import Profile from './screens/Profile'
import Menu from './screens/Menu'
import SwiperApp from './screens/SwiperApp'
import Calendar from './screens/Calendar'
import Community from './screens/Community'
import Login from './screens/Login'
import SignIn from './screens/SignIn'
import Dispo from './screens/Dispo'

export default class App extends React.Component {

  render() {
    return (
    	            <Dispo/>
           

    );
  }
}
