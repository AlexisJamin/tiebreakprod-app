import React, { Component } from 'react'
import { View, Image, Text, StyleSheet, ScrollView } from 'react-native'
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
} from 'react-native-svg'


import ProfileHeader from '../constants/ProfileHeader'
import ProfileButton from '../constants/ProfileButton'

export default class MenuContent extends React.Component {

constructor() {
    super();
    this.state = {
      fontAvenirNextLoaded: false,
      fontAvenirLoaded: false  
    };
  }

  async componentDidMount() {
    await Font.loadAsync({
      'AvenirNext': require('../assets/fonts/AvenirNext.ttf'),
      'Avenir': require('../assets/fonts/Avenir.ttf'),
    });
    this.setState({ 
      fontAvenirNextLoaded: true,
      fontAvenirLoaded: true 
    });
  }

  render() {
    return (

     <View style={{flex:1}}>
        <View style={{position: 'relative', top: 100}}>
           <ProfileButton/>
        </View>

        <View style={{flex: 1, position:'absolute'}}>
              <ProfileHeader/>    
        </View>

          <View style={{alignItems: 'center', top:30}}>
          <Svg height={70} width={70}>
            <Circle
              cx={35}
              cy={35}
              r={35}
              strokeWidth={0.5}
              stroke="black"
              fill="white"
            />
          </Svg>
        </View>


      <View style={{flex:1, height:50, top: 80, alignItems: 'center'}}>
        
        <ScrollView>

        <View>

          <View style={{flex:1, justifyContent: 'space-around', flexDirection: 'row'}}>
            
            <Text style={{color: 'rgba(0,0,0,0)', backgroundColor:'rgba(0,0,0,0)'}}>H</Text> 
            <Text style={styles.title}> Alexis J. (28 ans) </Text> 
            <Image source={require('../assets/icons/General/EditGray.imageset/icEditGrey.png')} />
          
          </View>

          <View style={{flex:1, top: 20, alignItems: 'center'}}>
            <Svg
              height="40"
              width="150"
            >
              <Line
                x1="0"
                y1="0"
                x2="150"
                y2="0"
                stroke="rgb(210,210,210)"
                strokeWidth="2"
               />
            </Svg>
          </View>

          <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-around'}}>
            

            <View style={{alignItems: 'center'}}>
              <Image source={require('../assets/icons/Profile/Level.imageset/icRank.png')} />
              <Text style={{color: 'black', top: 10}}>30/5 (30/5)</Text> 
            </View>

            <View style={{alignItems: 'center'}}>
              <Image source={require('../assets/icons/Profile/Style.imageset/shape.png')} />
              <Text style={{color: 'black', top: 10}}>Droitier</Text> 
            </View>

            <View style={{alignItems: 'center'}}>
              <Image source={require('../assets/icons/Profile/Gender.imageset/group5.png')} />
              <Text style={{color: 'black', top: 10}}>Homme</Text> 
            </View>

            </View>
    
            <View style={{flex:1, top: 20, alignItems: 'center'}}>
            <Svg
              height="40"
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

          <View style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>

               <Text style={{color: 'black'}}>MES CLUBS</Text> 
       
             <Image source={require('../assets/icons/General/EditGray.imageset/icEditGrey.png')} />

          </View>

          <View style={{
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'space-around',
          top: 10,
        }}>

           <View style={{paddingTop:10, paddingBottom: 10}}>
               <Image style={{top:13}} source={require('../assets/icons/Profile/ClubDotGreen.imageset/imgClubStatus.png')} />
               <Text style={{color: 'black', left:15}}>Tennis Luxembourg</Text> 
          </View>

            <View style={{paddingTop:10, paddingBottom: 10}}>
               <Image style={{top:13}} source={require('../assets/icons/Profile/ClubDotGreen.imageset/imgClubStatus.png')} />
               <Text style={{color: 'black', left:15}}>Tennis Atlantique</Text> 
          </View>

          <View style={{paddingTop:10, paddingBottom: 10}}>
               <Image style={{top:13}} source={require('../assets/icons/Profile/ClubDotGreen.imageset/imgClubStatus.png')} />
               <Text style={{color: 'black', left:15}}>Tennis Elisabeth</Text> 
          </View>

        </View>

         <View style={{flex:1, top: 20, alignItems: 'center'}}>
            <Svg
              height="40"
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

          <View style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>

               <Text style={{color: 'black'}}>MES DISPONIBILITÉS</Text> 
       
             <Image source={require('../assets/icons/General/EditGray.imageset/icEditGrey.png')} />

          </View>

          <View style={{
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'space-around',
        }}>

           <View style={{paddingTop:10, paddingBottom: 10, flexDirection: 'row', alignItems: 'center'}}>
                 <Image source={require('../assets/icons/AppSpecific/DayCircle.imageset/imgDayBg.png')} />
                 <Text style={{color: 'white', backgroundColor: 'rgba(0,0,0,0)', right:35}}>Sam</Text>
                 <View style={{flexDirection: 'row', flexWrap:'wrap'}}>
                   <Text style={{color: 'white', backgroundColor: 'green', padding:8, marginRight: 5}}>8h</Text>
                   <Text style={{color: 'white', backgroundColor: 'green', padding:8, marginRight: 5}}>19h</Text>
                 </View>
          </View>

            <View style={{paddingTop:10, paddingBottom: 10}}>
               <Image style={{top:13}} source={require('../assets/icons/Profile/ClubDotGreen.imageset/imgClubStatus.png')} />
               <Text style={{color: 'black', left:15}}>Tennis Atlantique</Text> 
          </View>

          <View style={{paddingTop:10, paddingBottom: 10}}>
               <Image style={{top:13}} source={require('../assets/icons/Profile/ClubDotGreen.imageset/imgClubStatus.png')} />
               <Text style={{color: 'black', left:15}}>Tennis Elisabeth</Text> 
          </View>

        </View>



           

          </View>

          </ScrollView>

           
        </View>

   </View>
      


    );
  }
}

const styles = StyleSheet.create({
  title: {
    color: 'black',
    backgroundColor: 'rgba(0,0,0,0)',
    fontFamily: 'AvenirNext',
    fontSize: 13,
    paddingTop: 2,
    alignItem:'center', 
    justifyContent: 'center',
  },
  subtitle: {
    color: 'black',
    backgroundColor: 'rgba(0,0,0,0)',
    fontFamily: 'Avenir',
    fontSize: 12,
    paddingTop: 2,
    alignItem:'center', 
    justifyContent: 'center',
  },
});

