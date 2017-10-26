import React from 'react'
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native'
import { ButtonGroup } from 'react-native-elements'
import { Font } from 'expo';


export default class ProfileButton extends React.Component {

  constructor (props) {
    super(props)
    this.updateIndex = this.updateIndex.bind(this);
    this.state = {
      selectedIndex: this.props.selectedIndex,
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
    this.setState({selectedIndex})
    if (selectedIndex==0) {
      this.props.navigation.navigate("ProfileContent");
      console.log("clic sur bouton Mon Profil");
    } else {
      this.props.navigation.navigate("ProfilePreferences");
      console.log("clic sur bouton Mes Preferences");
    }
  }

  render() {

    const buttons = ['Mon profil', 'Mes préférences']
    const { selectedIndex } = this.state

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