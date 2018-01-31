import React from 'react';
import Expo, { Asset, AppLoading, Font } from 'expo';
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
import ProfileView from './screens/ProfileView/ProfileView';
import Messenger from './screens/Messenger/Messenger';
import GameView from './screens/GameView/GameView';


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
        ProfileView: { screen: ProfileView },
        Messenger: { screen: Messenger },
        GameView: { screen: GameView },
        }, { 
        initialRouteName:'Login', 
        headerMode: 'none',
        navigationOptions: {
        gesturesEnabled: false
        }
        }, );

export default class App extends React.Component {

  state = {
    isReady: false,
  };

  render() {

    if (!this.state.isReady) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onFinish={() => this.setState({ isReady: true })}
          onError={console.warn}
        />
      );
    }

    return (
      <Provider store={store}>
        <Navigator/>
      </Provider>

    );
  }

_loadResourcesAsync = async () => {
    return Promise.all([
      Asset.loadAsync([
        require('./assets/icons/AppSpecific/Logo.imageset/logoBlack.png'),
        require('./assets/icons/AppSpecific/Header.imageset/header_bg.png'),
        require('./assets/icons/Menu/Profile.imageset/icProfile.png'),
        require('./assets/icons/Menu/Messages.imageset/icMessageBig.png'),
        require('./assets/icons/AppSpecific/Footer.imageset/group3.png'),
        require('./assets/icons/AppSpecific/OrangeCircle.imageset/btn3Copy.png'),
        require('./assets/icons/Buy/Buy.imageset/buy.png'),
        require('./assets/icons/General/ArrowRightBlack.imageset/fill72.png'),
        require('./assets/icons/Add/Add.imageset/combinedShape.png'),
      ]),
      Font.loadAsync({
        'AvenirNext': require('./assets/fonts/AvenirNext.ttf'),
        'Avenir': require('./assets/fonts/Avenir.ttf'),
        'SevenOneEightUltra': require('./assets/fonts/SevenOneEight-Ultra.ttf'),
      }),
    ]);
  };

}


