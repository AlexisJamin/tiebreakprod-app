import React, { Component } from 'react'
import { View, Image, Text, StyleSheet } from 'react-native'
import { Col, Row, Grid } from "react-native-easy-grid"
import { Font } from 'expo';


export default class HomeSlideAdd extends Component {

	constructor() {
		super();
		this.state = {
			fontAvenirNextLoaded: false,
			fontAvenirLoaded: false,
		};
	}

	async componentDidMount() {
    await Font.loadAsync({
      'AvenirNext': require('../assets/fonts/AvenirNext.ttf'),
      'Avenir': require('../assets/fonts/Avenir.ttf'),
    });
    this.setState({ 
    	fontAvenirNextLoaded: true,
    	fontAvenirLoaded: true,
    });
  }

  
  render() {

    return (
      <Grid>
        <Col size={25} style={{paddingLeft: 20}}>
          <Image source={require('../assets/icons/AppSpecific/OrangeCircle.imageset/btn3Copy.png')} 
          style={{
        justifyContent: 'center',
        alignItems: 'center'
           }}>
            <Image source={require('../assets/icons/Add/Add.imageset/combinedShape.png')} />
          </Image>
        </Col>

        <Col size={65} style={{paddingTop: 5, paddingLeft: 15}}>
        {
        this.state.fontAvenirNextLoaded ? ( <Text style={styles.title}> PROPOSER UNE PARTIE </Text> ) : null 
        }
        {
        this.state.fontAvenirLoaded ? ( 
            <View>
          <Text style={styles.subtitle}> Vous avez reservé un terrain mais vous</Text> 
          <Text style={styles.subtitle}> n'avez pas de partenaire. </Text> 
            </View>
          ) : null 
        }       
        </Col>

        <Col size={5} style={{paddingTop: 30}}>
          <Image source={require('../assets/icons/General/ArrowRightBlack.imageset/fill72.png')} />
        </Col>

          <Col size={5}>
        </Col>

      </Grid>
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