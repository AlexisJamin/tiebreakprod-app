import React from 'react';
import Expo from 'expo';
import { StyleSheet, Text, View } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { connect, Provider } from 'react-redux';
import { createStore } from 'redux';


import Login from './screens/Login/Login';
import SignIn from './screens/SignIn/SignIn';
import Swiper from './screens/SwiperApp';
import Profile from './screens/Profile/Profile';
import Calendar from './screens/Calendar/Calendar';
import Community from './screens/Community/Community';
import EditDispo from './screens/EditDispo/EditDispo';
import EditProfile from './screens/EditProfile/EditProfile';
import CreateGame from './screens/CreateGame/CreateGame';
import EditClub from './screens/EditClub/EditClub';
import EditClubSearch from './screens/EditClub/EditClubSearch';


const reducers = require('./combine-reducer').default;
var store = createStore(reducers);

const Navigator = StackNavigator({
        Login: { screen: Login },
        SignIn: { screen: SignIn },
        Swiper: { screen: Swiper },
        Profile: { screen: Profile },
        Community: { screen: Community },
        Calendar: { screen: Calendar },
        EditProfile: { screen: EditProfile },
        EditDispo: { screen: EditDispo },
        EditClub: { screen: EditClub },
        EditClubSearch: { screen: EditClubSearch },
        CreateGame: { screen: CreateGame },
        }, { 
        initialRouteName:'Login', 
        headerMode: 'none',
        navigationOptions: {
        gesturesEnabled: false
        }
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

