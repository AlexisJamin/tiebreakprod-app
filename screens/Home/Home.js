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
import HomeContent from './HomeContent'


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
            <HomeHeader navigation={this.props.navigation}/>
            </View>

      <View style={{flex: 1, marginBottom: 70}}>
      <HomeContent navigation={this.props.navigation}/>
      </View>
        
        <View style={{
        alignItems: 'stretch',
         }}>
            <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('Community', {selectedIndex: 0})}>
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

