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


import { Provider } from 'react-redux';
import { createStore } from 'redux'


function userReducer(store, action) {
  if(action.type == 'user') {
   
    return {user: action.value} 
   }
  else {
      return {user: {lastName:null,
      firstName:null,
      style:null,
      gender:null,
      currentLevel:null,
      highestLevel:null
  }}
  }
}

var store = createStore(userReducer);



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



  export default class App extends React.Component {


    render() {
       

    return (
        
      <Provider store={store}>
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
      </Provider>



           
    );
  }
}



