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
import { StackNavigator, addNavigationHelpers } from 'react-navigation';
import { Parse } from 'parse/react-native'
import { connect, Provider } from 'react-redux';
import { createStore } from 'redux'

import moment from 'moment'
import 'moment/locale/pt-br'
moment.locale('pt-BR')

import Home from './screens/Home/Home'
import Chat from './screens/Chat/Chat'
import Profile from './screens/Profile/Profile'
import Menu from './screens/Menu/Menu'
import Calendar from './screens/Calendar/Calendar'
import Community from './screens/Community/Community'
import Login from './screens/Login/Login'
import SignIn from './screens/SignIn/SignIn'
import EditDispo from './screens/EditDispo/EditDispo'
import EditProfile from './screens/EditProfile/EditProfile'
import CreateGame from './screens/CreateGame/CreateGame'



const reducers = require('./combine-reducer').default;

var store = createStore(reducers);

const Navigator = StackNavigator({
        //Login: { screen: Login },
        //SignIn: { screen: SignIn },
        Home: { screen: Home },
        Menu: { screen: Menu },
        Chat: { screen: Chat },
        Profile: { screen: Profile },
        Community: { screen: Community },
        EditProfile: { screen: EditProfile },
        EditDispo: { screen: EditDispo },
        CreateGame: { screen: CreateGame },
        }, { 
        headerMode: 'none' 
        }, );

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Navigator/>
      </Provider>
    );
  }
}





