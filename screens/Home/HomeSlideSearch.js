import React, { Component } from 'react'
import { View, Image, Text, StyleSheet } from 'react-native'
import { Font } from 'expo';


export default class HomeSlideSearch extends Component {

	constructor() {
		super();
		this.state = {
			fontAvenirNextLoaded: false,
			fontAvenirLoaded: false,
		};
	}

	async componentDidMount() {
    await Font.loadAsync({
      'AvenirNext': require('../../assets/fonts/AvenirNext.ttf'),
      'Avenir': require('../../assets/fonts/Avenir.ttf'),
    });
    this.setState({ 
    	fontAvenirNextLoaded: true,
    	fontAvenirLoaded: true,
    });
  }

  
  render() {

    return (
      <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
        <View>
          <Image source={require('../../assets/icons/AppSpecific/OrangeCircle.imageset/btn3Copy.png')} 
          style={{
        justifyContent: 'center',
        alignItems: 'center'
           }}>
            <Image source={require('../../assets/icons/Search/SearchWhite.imageset/fill56.png')} />
          </Image>
        </View>

        <View style={{top: 10}}>
        {
        this.state.fontAvenirNextLoaded ? ( <Text style={styles.title}> RECHERCHER UNE PARTIE </Text> ) : null 
        }
        {
        this.state.fontAvenirLoaded ? ( <Text style={styles.subtitle}> Vous n'avez pas reservé de terrain. </Text> ) : null 
        }       
        </View>

        <View style={{top: 30}}>
          <Image source={require('../../assets/icons/General/ArrowRightBlack.imageset/fill72.png')} />
        </View>


      </View>
    )
  }
}

const styles = StyleSheet.create({
  title: {
    color: 'black',
    backgroundColor: 'rgba(0,0,0,0)',
    fontFamily: 'AvenirNext',
    fontSize: 14,
    textAlign: 'left',
  },
  subtitle: {
    color: 'black',
    backgroundColor: 'rgba(0,0,0,0)',
    fontFamily: 'Avenir',
    fontSize: 12,
    textAlign: 'left',
    paddingTop: 10,
  },
});