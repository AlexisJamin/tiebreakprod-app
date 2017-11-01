import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { ButtonGroup } from 'react-native-elements';
import { Font } from 'expo';
import { connect } from 'react-redux';

function mapStateToProps(store) {

  return { user: store.user, userClub: store.userClub, userPreferences: store.userPreferences, button: store.button }
};

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

class ChatButton extends React.Component {

  constructor () {
    super();
    this.updateIndex = this.updateIndex.bind(this)
    this.state = {
      fontLoaded: false
    }
  }  

  async componentDidMount() {
    await Font.loadAsync({
      'Avenir': require('../../assets/fonts/Avenir.ttf'),
    });
    this.setState({ fontLoaded: true });
  }

  updateIndex (selectedIndex) {
     this.props.handleSubmitButton({
        ChatButtonIndex:selectedIndex,
        CommunityButtonIndex:this.props.button.CommunityButtonIndex,
        CalendarButtonIndex:this.props.button.CalendarButtonIndex,
        ProfileButtonIndex:this.props.button.ProfileButtonIndex
      })
    if (selectedIndex==0) {
      this.props.navigation.navigate("Notifications");
      console.log("clic sur bouton notifs");
    } else {
      this.props.navigation.navigate("ChatContent");
      console.log("clic sur bouton chat");
    }
  }

  render() {

    const buttons = ['Notifications', 'Chat']
    const selectedIndex = this.props.button.ChatButtonIndex;

    return (

      <ButtonGroup 
      onPress={this.updateIndex}
      selectedIndex={selectedIndex}
      buttons={buttons}
      textStyle={styles.title}
      selectedBackgroundColor={'rgb(42,127,83)'}
      selectedTextStyle={styles.subtitle}
      containerStyle={styles.container}/>

        
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps) (ChatButton);

const styles = StyleSheet.create({
  title: {
    color: 'black',
    backgroundColor: 'rgba(0,0,0,0)',
    fontFamily: 'Avenir',
    fontSize: 15,
    textAlign: 'center',
    top: 40,
  },
   subtitle: {
    color: 'white',
    backgroundColor: 'rgba(0,0,0,0)',
    fontFamily: 'Avenir',
    fontSize: 15,
    textAlign: 'center',
  },
  container: {
    backgroundColor: 'white',
    height: 120,
    marginRight: 0,
    marginLeft: 0,
  },
});