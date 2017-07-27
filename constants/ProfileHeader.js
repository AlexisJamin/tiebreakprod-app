import React, { Component } from 'react'
import { View, Image, Text, StyleSheet } from 'react-native'
import { Col, Row, Grid } from "react-native-easy-grid"
import { Font } from 'expo'
import Svg,{
    Circle,
    Ellipse,
    G,
    LinearGradient,
    RadialGradient,
    Line,
    Path,
    Polygon,
    Polyline,
    Rect,
    Symbol,
    Use,
    Defs,
    Stop
} from 'react-native-svg';



export default class ProfileHeader extends Component {

  constructor() {
    super();
    this.state = {fontLoaded: false};
  }

  async componentDidMount() {
    await Font.loadAsync({
      'Avenir': require('../assets/fonts/Avenir.ttf'),
    });
    this.setState({ fontLoaded: true });
  }
  
  render() {

    return (

      <View>

       <Image source={require('../assets/icons/AppSpecific/HeaderMin.imageset/header_bg.png')}>
       
         <View style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'space-around',
          paddingTop: 35
        }}>

           <View>
             <Image source={require('../assets/icons/General/BackWhite.imageset/ic_back_white.png')} />
           </View>
       
             <View>
               <Text style={{color: 'rgba(0,0,0,0)', backgroundColor:'rgba(0,0,0,0)'}}>H</Text> 
             </View>

           <View>
             <Text style={{color: 'rgba(0,0,0,0)', backgroundColor:'rgba(0,0,0,0)'}}>H</Text> 
           </View>

         </View>
      </Image>

    

        </View>

      
    );
  }
}

const styles = StyleSheet.create({
  title: {
    color: 'white',
    backgroundColor: 'rgba(0,0,0,0)',
    fontFamily: 'Avenir',
    fontSize: 18,
    textAlign: 'center',
    top: -3,
  },
});