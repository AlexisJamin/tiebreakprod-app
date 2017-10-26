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
import { StackNavigator, TabNavigator } from 'react-navigation';
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
import EditDispo from './screens/EditDispo/EditDispo'
import EditProfile from './screens/EditProfile/EditProfile'
import CreateGame from './screens/CreateGame/CreateGame'
import Swiper from './screens/SwiperApp'
import ProfilePreferences from './screens/Profile/ProfilePreferences'
import ProfileContent from './screens/Profile/ProfileContent'
import CreateGameContent from './screens/CreateGame/CreateGameContent'
import ChatContent from './screens/Chat/ChatContent'
import Notifications from './screens/Chat/Notifications'


const reducers = require('./combine-reducer').default;

var store = createStore(reducers);

const Navigator = StackNavigator({
        Login: { screen: Login },
        SignIn: { screen: SignIn },
        Swiper: { screen: Swiper },
        Profile: { screen: Profile },
        Community: { screen: Community },
        EditProfile: { screen: EditProfile },
        EditDispo: { screen: EditDispo },
        CreateGame: { screen: CreateGame },
        }, { 
        initialRouteName:'Login', 
        headerMode: 'none',
        navigationOptions: {
        gesturesEnabled: false
        }
        }, );


const HomeNavigator = TabNavigator(
{
  Menu: {screen: Menu, navigationOptions: {tabBarVisible: false}},
  Home: {screen: Home, navigationOptions: {tabBarVisible: false}},
  Chat: {screen: Chat, navigationOptions: {tabBarVisible: false}},
},
  {
  swipeEnabled: true,
  initialRouteName:'Home',
  },
);

const ChatNavigator = TabNavigator(
{
  Notifications: {screen: Notifications, navigationOptions: {tabBarVisible: false}},
  ChatContent: {screen: ChatContent, navigationOptions: {tabBarVisible: false}},
},
{
  initialRouteName:'Notifications',
  },
);

const ProfileNavigator = TabNavigator(
{
  ProfileContent: {screen: ProfileContent, navigationOptions: {tabBarVisible: false}},
  ProfilePreferences: {screen: ProfilePreferences, navigationOptions: {tabBarVisible: false}},
},
{
  initialRouteName:'ProfileContent',
  },
);


export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Navigator/>
      </Provider>
    );
  }
}

