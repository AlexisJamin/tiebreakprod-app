import React from 'react'
import Expo from 'expo'
import { StyleSheet, Text, View, Image, TouchableHighlight, TouchableOpacity, TextInput, Animated, Dimensions } from 'react-native'
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
import { Router, Scene, Actions } from 'react-native-router-flux';
import { Parse } from 'parse/react-native'
import { connect, Provider } from 'react-redux';
import { createStore } from 'redux'

import Home from './screens/Home/Home'
import Chat from './screens/Chat/Chat'
import Profile from './screens/Profile/Profile'
import Menu from './screens/Menu/Menu'
import Calendar from './screens/Calendar/Calendar'
import Community from './screens/Community/Community'
import Login from './screens/Login/Login'
import SignIn from './screens/SignIn/SignIn'
import EditDispo from './screens/EditProfile/EditDispo'
import EditProfile from './screens/EditProfile/EditProfile'
import Info from './screens/Info/Info'
import HomeHeader from './screens/Home/HomeHeader'



const navigator = Actions.create(
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
          key="profile" 
          component={Profile} 
          hideNavBar={true}/>
          <Scene 
          key="editProfile" 
          component={EditProfile} 
          hideNavBar={true}/>
          <Scene 
          key="chat" 
          component={Chat} 
          hideNavBar={true}/>
        </Scene>
        );
 
function mapStateToProps(store) {
  return { state: store.route }
}

const ReduxRouter = connect(mapStateToProps, null)(Router);
// it is important to load reducers AFTER actions.create (so no import here)
const reducers = require('./combine-reducer').default;



  export default class App extends React.Component {
    
    render() {
   
    return (
        
      <Provider store={createStore(reducers)}>
    	<ReduxRouter navigator={navigator} />
      </Provider>

         
    );
  }
}



