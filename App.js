import React from 'react'
import { StyleSheet, Text, View, Image, TouchableHighlight, TouchableOpacity, TextInput, Animated , Dimensions } from 'react-native'
import ModalPicker from 'react-native-modal-picker'
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
import { Router, Scene } from 'react-native-router-flux';



import Home from './screens/Home'
import Chat from './screens/Chat'
import Profile from './screens/Profile'
import Menu from './screens/Menu'
import SwiperApp from './screens/SwiperApp'
import Calendar from './screens/Calendar'
import Community from './screens/Community'
import Login from './screens/Login'
import SignIn from './screens/SignIn'
import Dispo from './screens/Dispo'
import Info from './screens/Info'
import HomeHeader from './constants/HomeHeader'




 const header = {
  uri: 'https://www.google.fr/url?sa=i&rct=j&q=&esrc=s&source=images&cd=&cad=rja&uact=8&ved=0ahUKEwiD_8__3rrVAhVLPxoKHXFnBFAQjRwIBw&url=https%3A%2F%2Ffashionapplis.wordpress.com%2F2015%2F02%2F05%2Fhermes-tie-break%2F&psig=AFQjCNHhW3uzpjObnH1izoR6YiCVR9jVhQ&ust=1501838619321986',
  height: 19, width: 163, 
};

  export default class App extends React.Component {


    render() {
       

    return (

    	<Router>
        <Scene key="root">
          <Scene key="login" 
          component={Login} 
          initial={true} 
          hideNavBar={true}/>
          <Scene 
          key="signIn" 
          component={SignIn} 
          hideNavBar={true}/>
          <Scene 
          key="home" 
          component={Home} 
          hideNavBar={true}/>
          <Scene
          key="menu" 
          component={Menu} 
          hideNavBar={true}/>
            <Scene
            key="profil" 
            component={Profile} 
            hideNavBar={true}/>
          <Scene 
          key="chat" 
          component={Chat} 
          hideNavBar={true}/>
        </Scene>
      </Router>



           
    );
  }
}



