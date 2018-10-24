import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ImageBackground } from 'react-native';
import { Font, Svg, Amplitude } from 'expo';
import { Entypo } from '@expo/vector-icons';
import { connect } from 'react-redux';

import translate from '../../translate.js';

function mapStateToProps(store) {
  return { user: store.user, button: store.button, window:store.window }
};

function mapDispatchToProps(dispatch) {
  return {
        handleSubmit: function(value) { 
        dispatch( {type: 'button', value: value} ) 
    }
  }
};

class HomeContent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      fontAvenirNextLoaded: false,
      fontAvenirLoaded: false  
    };
  }

  async componentDidMount() {
    await Font.loadAsync({
      'AvenirNext': require('../../assets/fonts/AvenirNext.ttf'),
      'Avenir': require('../../assets/fonts/Avenir.ttf'),
    });
    this.setState({ 
      fontAvenirNextLoaded: true,
      fontAvenirLoaded: true 
    });
  }

    navigationRoute(route, index) {
      this.props.handleSubmit({
        ChatButtonIndex:this.props.button.ChatButtonIndex,
        CommunityButtonIndex:index,
        CalendarButtonIndex:this.props.button.CalendarButtonIndex,
        ProfileButtonIndex:this.props.button.ProfileButtonIndex,
      })
      this.props.navigation.navigate(route);
    };

  _onPressFindFriends = () => {
    Amplitude.logEvent("Find Friends Button clicked");
    this.navigationRoute('Community',0);
  }

  _onPressCreateGame = () => {
    Amplitude.logEvent("Create Game Button clicked");
    this.props.navigation.navigate('CreateGame');
  }

  render() {
    return (

      <View style={{flex:1, marginTop:20}}>

        <TouchableOpacity onPress={()=> this._onPressFindFriends()}>
        <View style={{flexDirection:'row', justifyContent: 'space-around', marginBottom:50}}>
        <View>
          <ImageBackground 
          source={require('../../assets/icons/AppSpecific/OrangeCircle.imageset/btn3Copy.png')} 
          style={{
            justifyContent: 'center',
            alignItems:'center',
            width:85,
            height:85
           }}>
            <Entypo name="magnifying-glass" size={40} color='white' />
          </ImageBackground>
        </View>

        <View style={{top: 10}}>
        {
        this.state.fontAvenirNextLoaded ? ( <Text style={[styles.title, {width:this.props.window.width*0.6}]}>{translate.findFriends[this.props.user.currentLocale].toUpperCase()}</Text> ) : null 
        }
        {
        this.state.fontAvenirLoaded ? ( <Text style={[styles.subtitle, {width:this.props.window.width*0.6}]}>{translate.findFriendsDescription[this.props.user.currentLocale]}</Text> ) : null 
        }       
        </View>

        <View style={{top: 30}}>
          <Entypo name="chevron-right" size={20} />
        </View>
        </View>
        </TouchableOpacity>
        

        <View style={{
          alignItems:'center'
        }}>
          <Svg
            height={60}
            width={250}
          >
            <Svg.Line
              x1={0}
              y1={0}
              x2={250}
              y2={0}
              stroke="rgb(210,210,210)"
              strokeWidth="2"
             />
          </Svg>
        </View>


            <TouchableOpacity onPress={() => this._onPressCreateGame()}>
            <View style={{flexDirection: 'row', justifyContent: 'space-around', marginBottom:20}}>
            <View>
              <ImageBackground source={require('../../assets/icons/AppSpecific/OrangeCircle.imageset/btn3Copy.png')} 
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                width:85,
                height:85
               }}>
                 <Entypo name="calendar" size={40} color='white' />
              </ImageBackground>
            </View>

            <View style={{top: 10}}>
            {
            this.state.fontAvenirNextLoaded ? ( 
              <View>
              <Text style={[styles.title, {width:this.props.window.width*0.6}]}>{translate.proposeGameToFriends[this.props.user.currentLocale].toUpperCase()}</Text> 
              </View>) : null 
            }
            {
            this.state.fontAvenirLoaded ? ( 
              <View>
              <Text style={[styles.subtitle, {width:this.props.window.width*0.6}]}>{translate.proposeGameToFriendsSubtitle[this.props.user.currentLocale]}</Text> 
                </View> ) : null 
            }       
            </View>

            <View style={{top: 30}}>
              <Entypo name="chevron-right" size={20} />
            </View>

          </View>
            </TouchableOpacity>

        </View>

    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps) (HomeContent);

const styles = StyleSheet.create({
  title: {
    color: 'black',
    backgroundColor: 'rgba(0,0,0,0)',
    fontFamily: 'AvenirNext',
    fontSize: 14,
    textAlign:'left'
  },
  subtitle: {
    color: 'black',
    backgroundColor: 'rgba(0,0,0,0)',
    fontFamily: 'Avenir',
    fontSize: 12,
    textAlign: 'left',
    paddingTop: 10,
    width:200
  },
  margin: {
    marginTop:5
  }
});

