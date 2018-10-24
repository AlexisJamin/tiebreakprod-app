import React from 'react';
import Expo, { Asset, AppLoading, Font, Notifications, Amplitude, DangerZone } from 'expo';
import { StyleSheet, Text, View, AsyncStorage, SafeAreaView, Platform } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { connect, Provider } from 'react-redux';
import { createStore } from 'redux';
import { Parse } from 'parse/react-native';
import DropdownAlert from 'react-native-dropdownalert';

///Prod
Parse.initialize('qvmzghZvBhGF1a7AsN6LCbYbUiwDAI');
Parse.serverURL = 'https://tiebreak-prod.herokuapp.com/parse';
var apiKeyAmplitude = "7563302098ee58fed72710a66b876c7c";

//Test
Parse.setAsyncStorage(AsyncStorage);
//Parse.initialize('3E8CAAOTf6oi3NaL6z8oVVJ7wvtfKa');
//Parse.serverURL = 'https://tiebreak.herokuapp.com/parse';
//var apiKeyAmplitude = "afed0a236331b94ea3f41855f3a70434";

import Login from './screens/Login/Login';
import SignIn from './screens/SignIn/SignIn';
import Swiper from './screens/SwiperApp';
import Profile from './screens/Profile/Profile';
import Calendar from './screens/Calendar/Calendar';
import Community from './screens/Community/Community';
import Friends from './screens/Friends/Friends';
import EditDispo from './screens/EditDispo/EditDispo';
import EditProfile from './screens/EditProfile/EditProfile';
import CreateGame from './screens/CreateGame/CreateGame';
import EditClub from './screens/EditClub/EditClub';
import EditClubSearch from './screens/EditClub/EditClubSearch';
import ProfileView from './screens/ProfileView/ProfileView';
import Messenger from './screens/Messenger/Messenger';
import GameView from './screens/GameView/GameView';
import Reservation from './screens/Reservation/Reservation';
import ReservationView from './screens/ReservationView/ReservationView';
import Payment from './screens/Payment/Payment';


const reducers = require('./reducers/combine-reducer').default;
var store = createStore(reducers);

const Navigator = StackNavigator({
        Login: { screen: Login },
        SignIn: { screen: SignIn },
        Swiper: { screen: Swiper },
        Profile: { screen: Profile },
        Community: { screen: Community },
        Friends: { screen: Friends },
        Calendar: { screen: Calendar },
        EditProfile: { screen: EditProfile },
        EditDispo: { screen: EditDispo },
        EditClub: { screen: EditClub },
        EditClubSearch: { screen: EditClubSearch },
        CreateGame: { screen: CreateGame },
        ProfileView: { screen: ProfileView },
        Messenger: { screen: Messenger },
        GameView: { screen: GameView },
        Reservation: { screen: Reservation },
        ReservationView: { screen: ReservationView },
        Payment: { screen: Payment },
        }, { 
        initialRouteName:'Login', 
        headerMode: 'none',
        navigationOptions: {
        gesturesEnabled: false
        }
        }, );

export default class App extends React.Component {

  constructor() {
    super();
    this.state = {
    isReady: false
    };
  }

  async componentDidMount() {
    this.listener = Notifications.addListener(this.handleNotification); 

    DangerZone.Branch.subscribe((bundle) => {
      if (bundle && bundle.params && !bundle.error) {
        // `bundle.params` contains all the info about the link.
      }
    });

    Amplitude.initialize(apiKeyAmplitude);

    if (Platform.OS === 'android') {
    Expo.Notifications.createChannelAndroidAsync('chat-messages', {
      name: 'Chat messages',
      sound: true,
    });

    Expo.Notifications.createChannelAndroidAsync('game-requests', {
      name: 'Game Requests',
      sound: true,
    });

    Expo.Notifications.createChannelAndroidAsync('friend-requests', {
      name: 'Friend requests',
      sound: true,
    });

    Expo.Notifications.createChannelAndroidAsync('feed', {
      name: 'News feed',
      sound: true,
    });

  }
  }

  componentWillUnmount() {
    this.listener && this.listener.remove();
  }

  handleNotification = (notification) => {
    if (notification.origin == "received") {
      this.dropdown.alertWithType("custom", notification.data.title, notification.data.body);
    }
    console.log(
      `Push notification ${notification.origin} with data: ${JSON.stringify(notification.data)}`,
    );
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
        <SafeAreaView style={{flex:1, backgroundColor:'white'}}>
          <Navigator screenProps={{header:"community", back:true}} />
          <DropdownAlert
              ref={ref => this.dropdown = ref}
              containerStyle={{backgroundColor: "white"}}
              titleStyle={{color:'black'}}
              messageStyle={{color:'black'}}
              imageSrc={require('./assets/icons/AppIcon.appiconset/iconPushColor.png')}
            />
        </SafeAreaView>
      </Provider>


    );
  }

_loadResourcesAsync = async () => {
    return Promise.all([
      Asset.loadAsync([
        require('./assets/icons/AppSpecific/Header.imageset/header_bg.png'),
        require('./assets/icons/AppSpecific/HeaderMin.imageset/header_bg.png'),
        require('./assets/icons/AppSpecific/Footer.imageset/group3.png'),
        require('./assets/icons/AppSpecific/OrangeCircle.imageset/btn3Copy.png'),
        require('./assets/icons/AppSpecific/BigYellowBall.imageset/icTennisBallBig.png'),
        require('./assets/icons/AppSpecific/BallYellow.imageset/combinedShapeCopy.png'),
        require('./assets/icons/AppIcon.appiconset/iconPushColor.png'),
        require('./assets/icons/TennisActu/Logo.png'),
        require('./assets/icons/Decathlon/Logo_DECATHLON.png'),
        require('./assets/icons/Cards/card-front.png'),
        require('./assets/icons/Cards/card-back.png')
      ]),
      Font.loadAsync({
        'AvenirNext': require('./assets/fonts/AvenirNext.ttf'),
        'Avenir': require('./assets/fonts/Avenir.ttf'),
        'SevenOneEightUltra': require('./assets/fonts/SevenOneEight-Ultra.ttf'),
      }),
    ]);
  };

}


