import React from 'react';
import { StyleSheet, Text, View, Image, TextInput, Keyboard } from 'react-native';
import { TabNavigator } from 'react-navigation';

import CommunityHeader from './CommunityHeader';
import CommunityButton from './CommunityButton';
import CommunityContent from './CommunityContent';
import CommunityFriends from './CommunityFriends';

import { connect } from 'react-redux';

function mapDispatchToProps(dispatch) {
  return {
        handleSubmit: function(value) { 
        dispatch( {type: 'searchPlayer', value: value} ) 
    }
  }
};

const CommunityNavigator = TabNavigator(
{
  CommunityContent: {screen: CommunityContent, navigationOptions: {tabBarVisible: false}},
  CommunityFriends: {screen: CommunityFriends, navigationOptions: {tabBarVisible: false}},
},
{
  swipeEnabled: false,
  lazy: true,
  animationEnabled: false
  },
);

class Community extends React.Component {

  constructor(props) {
    super(props);
    this._searchPlayer = this._searchPlayer.bind(this);
  }

  _searchPlayer(player) {
    console.log('player');
    console.log(player);
    this.props.handleSubmit({player:player});
  }

  render() {
    return (

    	<View style={{flex:1, backgroundColor:'white'}}>

         <View style={{
        position:'absolute',
        width:'100%',
        height:'100%',
        flexDirection:'row', 
        alignItems:'flex-start',
      }}>
  
          <View style={{flex:1, alignItems:'stretch'}}>
          <CommunityButton navigation={this.props.navigation}/>
          <TextInput 
          style={styles.searchBar}
          keyboardType="default"
          returnKeyType='done'
          autoCorrect={false}
          placeholder='Rechercher un joueur (prénom)'
          underlineColorAndroid='rgba(0,0,0,0)'
          blurOnSubmit={false}
          autoCapitalize='sentences'
          onChangeText={(player) => this._searchPlayer(player)}
          onSubmitEditing={Keyboard.dismiss}
          />
          </View>

        </View>

          <View style={{height:80, marginBottom:90}}>
           <CommunityHeader navigation={this.props.navigation}/>
          </View>

          <CommunityNavigator navigation={this.props.navigation}/>
        

      </View>

    );
  }
}

Community.router = CommunityNavigator.router;

export default connect(null, mapDispatchToProps) (Community);

styles = StyleSheet.create({
  searchBar: {
    paddingLeft:20,
    fontSize:13,
    maxHeight:40,
    flex:.1,
    borderWidth:6,
    borderColor:'#E4E4E4'
  }
})

