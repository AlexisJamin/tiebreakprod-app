import React, { Component } from 'react';
import { View, Text, Image, StyleSheet} from 'react-native';
import Svg, { Line } from 'react-native-svg';
import { Font } from 'expo';

export default class EditClubContentClubList extends React.Component {

constructor() {
    super();
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
          <View>
              <View style={{flexDirection:'row', justifyContent:"space-around"}}>
               {
               this.state.fontAvenirLoaded ? (<Text style={styles.clubs}>{this.props.clubName}</Text>) : null 
               }   
               <Image style={{marginLeft:15, marginTop:3}} source={require('../../assets/icons/General/Delete.imageset/icDeletePaleGrey.png')} /> 
               </View>

                <Svg
                height="20"
                width="300"
                >
                <Line
                  x1="0"
                  y1="0"
                  x2="300"
                  y2="0"
                  stroke="rgb(210,210,210)"
                  strokeWidth="2"
                 />
              </Svg>
          </View>

        );
  }
}

const styles = StyleSheet.create({
  clubs: {
    color: 'black',
    backgroundColor: 'rgba(0,0,0,0)',
    fontFamily: 'Avenir',
    fontSize: 14,
    left:5,
    marginBottom: 12,
    alignItem:'center', 
    justifyContent: 'center',
  }
});