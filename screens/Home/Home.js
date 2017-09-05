import React from 'react'
import { StyleSheet, Text, View, Image, TouchableWithoutFeedback } from 'react-native'
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


import HomeHeader from './HomeHeader'
import HomeSlideSearch from './HomeSlideSearch'
import HomeSlideAdd from './HomeSlideAdd'

export default class Home extends React.Component {
  render() {
    return (

    	<View style={{
        flex: 1, 
        backgroundColor:'white'}} >

      <View style={{
        position:'absolute',
        width:'100%',
        height:'100%',
        flexDirection:'row', 
        alignItems:'flex-end',
      }}>

      <Image style={{
        flex:1,
        height:250}} 
        source={require('../../assets/icons/AppSpecific/Footer.imageset/group3.png')} /> 

      </View>

 
            <View style={{height:120}}>
            <HomeHeader/>
            </View>

      <View style={{flex:1, justifyContent:'space-around', marginBottom:150}}>

        <View>
        <HomeSlideSearch/>
        </View>

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


            <View>
            <HomeSlideAdd/>
            </View>


        </View>
        
        <View style={{
        alignItems: 'stretch',
         }}>
            <TouchableWithoutFeedback onPress={this._onPressLogOutButton}>
            <Text style={styles.buttonLogIn}>Trouver des amis</Text>
            </TouchableWithoutFeedback>
        </View>

      </View>

    );
  }
}

const styles = StyleSheet.create({
  buttonLogIn: {
    backgroundColor: 'rgba(0,0,0,0.2)',
    color: 'white',
    fontSize: 18,
    lineHeight: 30,
    textAlign: 'center',
    overflow:'hidden', 
    paddingTop:15,
    paddingBottom:15 
  },
});

