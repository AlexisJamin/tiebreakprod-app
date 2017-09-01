import React from 'react'
import Expo from 'expo'
import { StyleSheet, Text, View, Image, TouchableHighlight, TouchableOpacity, TextInput, Animated , Dimensions } from 'react-native'
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


function userReducer(store = {}, action) {
  var storeCopy = Object.assign({}, store);
  if(action.type == 'user') {
  	storeCopy.user = action.value;
    return storeCopy;
  } else if(action.type == 'userClub') {
    storeCopy.userClub.unshift(action.value);
    return storeCopy;
  }
  else {
	return {
      		user: 
      		{
      			lastName:null,
		    	firstName:null,
		      	style:null,
		      	gender:null,
		      	currentLevel:null,
		      	highestLevel:null,
		      	availability:[],
		  },
		  userClub : []
	}
  }
}

var store = createStore(userReducer);



import Home from './screens/Home/Home'
import Chat from './screens/Chat/Chat'
import Profile from './screens/Profile/Profile'
import Menu from './screens/Menu/Menu'
import Calendar from './screens/Calendar/Calendar'
import Community from './screens/Community/Community'
import Login from './screens/Login/Login'
import SignIn from './screens/SignIn/SignIn'
import Dispo from './screens/Dispo/Dispo'
import Info from './screens/Info/Info'
import HomeHeader from './screens/Home/HomeHeader'



  export default class App extends React.Component {


    render() {


       

    return (
        
      <Provider store={store}>
    	<Router>
        <Scene key="root">
          <Scene key="logIn" 
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



