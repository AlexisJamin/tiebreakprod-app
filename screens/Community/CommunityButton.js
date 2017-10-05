import React from 'react'
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native'
import { ButtonGroup } from 'react-native-elements'
import { Font } from 'expo';



export default class ProfileButton extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      selectedIndex: this.props.selectedIndex,
      fontLoaded: false
    }
    this.updateIndex = this.updateIndex.bind(this)
  }  

  async componentDidMount() {
    await Font.loadAsync({
      'Avenir': require('../../assets/fonts/Avenir.ttf'),
    });
    this.setState({ fontLoaded: true });
  }

  updateIndex (selectedIndex) {
    this.setState({selectedIndex})
  }

  render() {

    const buttons = ['Communauté', 'Mes Amis']
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
    marginBottom: 0,
  },
});