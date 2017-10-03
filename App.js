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

 


/* function AppWithNavigationState(dispatch, nav) {
  return { <AppNavigator navigation={addNavigationHelpers({ dispatch, state: nav })} /> }
}

AppWithNavigationState.propTypes = {
  dispatch: PropTypes.func.isRequired,
  nav: PropTypes.object.isRequired,
};

function mapStateToProps(store) {
  return { nav: store.nav }
} 


export default connect(mapStateToProps)(AppWithNavigationState);
*/

const reducers = require('./combine-reducer').default;

var store = createStore(reducers);

const Navigator = StackNavigator({
        Login: { screen: Login },
        Home: { screen: Home },
        SignIn: { screen: SignIn },
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





