import React from 'react';
import { StyleSheet, Text, View, Image, TouchableWithoutFeedback } from 'react-native';
import { connect } from 'react-redux';

import HomeHeader from './HomeHeader';
import HomeContent from './HomeContent';

function mapDispatchToProps(dispatch) {
  return {
        handleSubmit: function(value) { 
        dispatch( {type: 'user', value: value} ) 
    },
        handleSubmitClub: function(value) { 
        dispatch( {type: 'userClub', value: value} ) 
    },
        handleSubmitPreferences: function(value) { 
        dispatch( {type: 'userPreferences', value: value} ) 
    },
    handleSubmitButton: function(value) { 
        dispatch( {type: 'button', value: value} ) 
    }
  }
};

function mapStateToProps(store) {

  return { user: store.user, userClub: store.userClub, userPreferences: store.userPreferences, button: store.button }
};

class Home extends React.Component {

  constructor(props) {
    super(props);
    this.navigationRoute = this.navigationRoute.bind(this);
  }

navigationRoute() {
  this.props.handleSubmitButton({
    ChatButtonIndex:this.props.button.ChatButtonIndex,
    CommunityButtonIndex:0,
    CalendarButtonIndex:this.props.button.CalendarButtonIndex,
    ProfileButtonIndex:this.props.button.ProfileButtonIndex
  })
  //this.props.navigation.navigate('Community');
};

  render() {
    return (

    	<View style={{
        flex: 1, 
        backgroundColor:'white'
      }}>

        <View style={{
          position:'absolute',
          width:'100%',
          height:'100%',
          flexDirection:'row', 
          alignItems:'flex-end'
        }}>

        <Image style={{
          flex:1,
          height:250}} 
          source={require('../../assets/icons/AppSpecific/Footer.imageset/group3.png')}/> 

        </View>

 
        <View style={{height:120}}>
        <HomeHeader navigation={this.props.navigation}/>
        </View>

        <HomeContent navigation={this.props.navigation}/>

       
        <View style={{alignItems: 'stretch'}}>
        <TouchableWithoutFeedback onPress={this.navigationRoute}>
        <Text style={styles.buttonLogIn}>Trouver des amis</Text>
        </TouchableWithoutFeedback>
        </View>

      </View>

    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps) (Home);

const styles = StyleSheet.create({
  buttonLogIn: {
    backgroundColor:'rgba(0,0,0,0.2)',
    color: 'white',
    fontSize: 18,
    lineHeight: 30,
    textAlign: 'center',
    overflow:'hidden', 
    paddingTop:15,
    paddingBottom:15 
  }
});

