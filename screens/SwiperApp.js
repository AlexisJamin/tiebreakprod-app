import React from 'react';
import { StyleSheet, Text, View, Image, Dimensions } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { TabNavigator, TabBarBottom } from 'react-navigation';
import IconBadge from 'react-native-icon-badge';
import { connect } from 'react-redux';
import { Parse } from 'parse/react-native';

import Menu from './Menu/Menu';
import Home from './Home/Home';
import Chat from './Chat/Chat';
import Feed from './Feed/Feed';
import Profile from './Profile/Profile';

import translate from '../translate.js';

function mapStateToProps(store) {
  return { user: store.user, updateNotification: store.updateNotification, window: store.window }
};

function mapDispatchToProps(dispatch) {
  return {
        handleSubmit: function(value) { 
        dispatch( {type: 'window', value: value} ) 
    }
  }
};

  const HomeNavigator = TabNavigator(
    {
      Home: {
        screen: Home, 
        navigationOptions: ({ screenProps }) => ({
          tabBarLabel: translate.play[screenProps.locale],
          tabBarVisible: true,
          tabBarIcon: ({ tintColor }) => <Entypo name="home" size={26} color={tintColor} style={{marginTop:3}} />,
        }),
      },
      Feed: {
        screen: Feed, 
        navigationOptions: ({ screenProps }) => ({
          tabBarLabel: translate.feed[screenProps.locale],
          tabBarVisible: true,
          tabBarIcon: ({ tintColor }) => <Entypo name="network" size={26} color={tintColor} style={{marginTop:3}} />,
        }),
      },
      Profile: {
        screen: Profile,
        navigationOptions:({ screenProps }) => ({
          tabBarLabel: translate.profile[screenProps.locale],
          tabBarVisible: true,
          tabBarIcon: ({ tintColor }) => 
          <IconBadge
                MainElement={
                  <Entypo name="user" size={26} color={tintColor} style={{marginTop:3}} />
                }
                IconBadgeStyle={
                  {width:18,
                  height:18,
                  borderRadius:18,
                  minWidth:18,
                  top:0,
                  right:-15,
                  backgroundColor:'red',
                  borderWidth:1.5,
                  borderColor:'white'}
                }
                Hidden={screenProps.new===false}
                />
        })
      },
      Chat: {
        screen: Chat,
        navigationOptions:({ screenProps }) => ({
                  tabBarLabel: 'Chat',
                  tabBarVisible: true,
                  tabBarIcon: ({ tintColor }) => 
                  <IconBadge
                        MainElement={
                          <Entypo name="chat" size={26} color={tintColor} style={{marginTop:3}} />
                        }
                        BadgeElement={
                          <Text style={{color:'#FFFFFF', fontSize:10, fontWeight:'bold'}}>{screenProps.badgeCount}</Text>
                        }
                        IconBadgeStyle={
                          {width:18,
                          height:18,
                          borderRadius:18,
                          minWidth:18,
                          top:0,
                          right:-17,
                          backgroundColor:'red',
                          borderWidth:1.5,
                          borderColor:'white'}
                        }
                        Hidden={screenProps.badgeCount===0}
                        />
                })
      },
      Menu: {
        screen: Menu,
        navigationOptions: {
          tabBarLabel: 'Menu',
          tabBarVisible: true,
          tabBarIcon: ({ tintColor }) => <Entypo name="menu" size={26} color={tintColor} style={{marginTop:3}} />,
        }
      },
    },

      {
      tabBarComponent: TabBarBottom,
      tabBarPosition: 'bottom',
      initialRouteName:'Home',
      swipeEnabled: true,
      tabBarOptions: {
          activeTintColor: '#24513d',
          inactiveTintColor: 'gray',
          showIcon: true,
          paddingBottom:0,
          labelStyle: {
            fontSize: 13
          },
          style: {
            backgroundColor: 'transparent',
          },
        }
      },
      
    );

class Swiper extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      fontLoaded:false,
      badgeCount:0,
      height:null,
      width:null
    };
  }

  componentWillMount() {
    let {height, width} = Dimensions.get('window');

    this.props.handleSubmit({width:width, height:height})
  }

  componentDidMount() {
    
    var edit = this;
    var currentUser = Parse.User.current() || Parse.User.currentAsync();
    var query = new Parse.Query("Notification");
    query.equalTo('toUser', currentUser);
    query.equalTo('seen', false);
    query.find({
      success: function(notification) {
        edit.setState({badgeCount:notification.length})
      }
    });
  }

  componentWillReceiveProps(props) {
    this.setState({badgeCount:props.updateNotification.notification})
  }

  render() {
    let badgeCount = this.state.badgeCount;
    return (
        <HomeNavigator navigation={this.props.navigation} screenProps={{ badgeCount:this.state.badgeCount, new:this.props.user.new, locale:this.props.user.currentLocale }}/>
    );
  }
}

Swiper.router = HomeNavigator.router;

export default connect(mapStateToProps, mapDispatchToProps) (Swiper);

const styles = StyleSheet.create({
  buttonText: {
    color: 'transparent',
    top: 10,
    padding:40,
    width:20,
    height:20
  },
});