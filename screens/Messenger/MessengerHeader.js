import React, { Component } from 'react';
import { View, Image, Text, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { Font } from 'expo';
import { Parse } from 'parse/react-native';
import { connect } from 'react-redux';

Parse.initialize("3E8CAAOTf6oi3NaL6z8oVVJ7wvtfKa");
Parse.serverURL = 'https://tiebreak.herokuapp.com/parse';

function mapStateToProps(store) {
  return { user: store.user, userClub: store.userClub, viewProfile: store.viewProfile }
}

class MessengerHeader extends Component {

  constructor() {
    super();
    this.state = {
      fontLoaded: false
    };
  }
  
  async componentDidMount() {
    await Font.loadAsync({
      'Avenir': require('../../assets/fonts/Avenir.ttf'),
    });
    this.setState({ fontLoaded: true });
  }

  render() {

    return (

      <Image style={{flex:1, width:null, height:null, resizeMode:'stretch'}} source={require('../../assets/icons/AppSpecific/HeaderMin.imageset/header_bg.png')}>
       
         <View style={{
          flex:1,
          flexDirection: 'row',
          justifyContent: 'space-around',
          top: 40
        }}>
              <TouchableWithoutFeedback style={{padding:30}} onPress={() => this.props.navigation.goBack()}>
             <Image source={require('../../assets/icons/General/BackWhite.imageset/ic_back_white.png')} />
             </TouchableWithoutFeedback>
               {
                this.state.fontLoaded ? ( <Text style={styles.title}>{this.props.viewProfile.firstName}</Text> ) : null 
               }
   
             <Image style={{top:7}} source={require('../../assets/icons/General/More.imageset/icMore.png')} /> 
        
         </View>
      </Image>

      
    );
  }
}

export default connect(mapStateToProps, null) (MessengerHeader);

const styles = StyleSheet.create({
  title: {
    color: 'white',
    backgroundColor: 'rgba(0,0,0,0)',
    fontFamily: 'Avenir',
    fontSize: 15,
    top: 3,
    textAlign:'center'
  }
});