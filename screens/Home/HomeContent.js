import React from 'react';
import { StyleSheet, Text, View, Image, TouchableWithoutFeedback } from 'react-native';
import Svg, { Line } from 'react-native-svg';
import { Font } from 'expo';

export default class HomeContent extends React.Component {

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

  render() {
    return (

      <View style={{flex:1, justifyContent:'space-around', marginBottom:150}}>

        <TouchableWithoutFeedback>
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
        </TouchableWithoutFeedback>

        <View style={{
          height:30,
          alignItems: 'center',
        }}>
          <Svg
            height="60"
            width="250"
          >
            <Line
              x1="0"
              y1="0"
              x2="250"
              y2="0"
              stroke="rgb(210,210,210)"
              strokeWidth="2"
             />
          </Svg>
        </View>


            <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('CreateGame')}>
            <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
            <View>
              <Image source={require('../../assets/icons/AppSpecific/OrangeCircle.imageset/btn3Copy.png')} 
              style={{
            justifyContent: 'center',
            alignItems: 'center'
               }}>
                <Image source={require('../../assets/icons/Add/Add.imageset/combinedShape.png')} />
              </Image>
            </View>

            <View style={{top: 10}}>
            {
            this.state.fontAvenirNextLoaded ? ( <Text style={styles.title}> PROPOSER UNE PARTIE </Text> ) : null 
            }
            {
            this.state.fontAvenirLoaded ? ( 
              <View>
              <Text style={styles.subtitle}> Vous avez reservé un terrain mais vous</Text> 
              <Text style={styles.subtitle}> n'avez pas de partenaire. </Text> 
                </View> ) : null 
            }       
            </View>

            <View style={{top: 30}}>
              <Image source={require('../../assets/icons/General/ArrowRightBlack.imageset/fill72.png')} />
            </View>

          </View>
            </TouchableWithoutFeedback>

        </View>

    );
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

