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

        <ScrollView>

        <View>

          <View style={{flex:1, justifyContent: 'space-around', flexDirection: 'row'}}>
            
            <Text style={{color: 'rgba(0,0,0,0)', backgroundColor:'rgba(0,0,0,0)'}}>H</Text> 
            <View style={{flexDirection:'row'}}>
            {
             this.state.fontAvenirNextLoaded ? (<Text style={styles.name}> Alexis J.</Text> 
             ) : null 
            }
            {
             this.state.fontAvenirLoaded ? (<Text style={styles.age}> (28 ans) </Text> 
             ) : null 
            }
            </View>
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
              {
              this.state.fontAvenirLoaded ? (<Text style={styles.level}>30/5 (30/5)</Text>) : null 
              } 
            </View>

            <View style={{alignItems: 'center'}}>
              <Image source={require('../assets/icons/Profile/Style.imageset/shape.png')} />
              {
              this.state.fontAvenirLoaded ? (<Text style={styles.gender}>Droitier</Text>) : null 
              } 
            </View>

            <View style={{alignItems: 'center'}}>
              <Image source={require('../assets/icons/Profile/Gender.imageset/group5.png')} />
              {
              this.state.fontAvenirLoaded ? (<Text style={styles.gender}>Homme</Text>) : null 
              }  
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
          justifyContent: 'space-around',
        }}>

               <Text style={{color: 'rgba(0,0,0,0)', backgroundColor:'rgba(0,0,0,0)'}}>H</Text> 
               {
              this.state.fontAvenirLoaded ? (<Text style={styles.name}>MES CLUBS</Text>) : null 
              }   
       
             <Image source={require('../assets/icons/General/EditGray.imageset/icEditGrey.png')} />

          </View>

          <View style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'stretch',
          top: 20,
        }}>

              <View style={{justifyContent: 'space-around'}}>
               <Image style={{marginBottom: 12}} source={require('../assets/icons/Profile/ClubDotGreen.imageset/imgClubStatus.png')} />
               <Image style={{marginBottom: 12}} source={require('../assets/icons/Profile/ClubDotGreen.imageset/imgClubStatus.png')} />
               <Image style={{marginBottom: 12}} source={require('../assets/icons/Profile/ClubDotGreen.imageset/imgClubStatus.png')} />

               </View>

          <View style={{justifyContent: 'space-around'}}>
               {
               this.state.fontAvenirLoaded ? (<Text style={styles.clubs}>Tennis Elisabeth</Text>) : null 
               }    
               {
               this.state.fontAvenirLoaded ? (<Text style={styles.clubs}>Tennis Atlantique</Text>) : null 
               }    
               {
               this.state.fontAvenirLoaded ? (<Text style={styles.clubs}>Tennis Luxembourg</Text>) : null 
               }    
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
          justifyContent: 'space-around',
        }}>

               <Text style={{color: 'rgba(0,0,0,0)', backgroundColor:'rgba(0,0,0,0)'}}>H</Text> 
               {
              this.state.fontAvenirLoaded ? (<Text style={styles.name}>MES DISPONIBILITÉS</Text>) : null 
              }   
       
             <Image source={require('../assets/icons/General/EditGray.imageset/icEditGrey.png')} />

          </View>


          <View style={{
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'space-around',
          top: 10,
        }}>

           <View style={{paddingTop:10, paddingBottom: 10, marginRight:40}}>
                
                    <View style={{flexDirection: 'row'}}>

                    <View style={{alignItems:'center', marginLeft:20}}>
                      <Image source={require('../assets/icons/AppSpecific/DayCircle.imageset/imgDayBg.png')}>
                       <Text style={{color: 'white', backgroundColor: 'rgba(0,0,0,0)', paddingTop:12, paddingLeft: 8}}>Lun</Text>
                      </Image>
                    </View>

              <View style={{flexDirection: 'row', flexWrap:'wrap', marginLeft:15, alignItems:'center'}}>
              <Text style={styles.button}>8h</Text>
              <Text style={styles.button}>15h</Text>
              <Text style={styles.button}>15h</Text>
              <Text style={styles.button}>8h</Text>
              <Text style={styles.button}>15h</Text>
              <Text style={styles.button}>8h</Text>
              <Text style={styles.button}>15h</Text>
              <Text style={styles.button}>8h</Text>
              <Text style={styles.button}>15h</Text>
              <Text style={styles.button}>8h</Text>
              <Text style={styles.button}>15h</Text>
              
              </View>
              
                  </View>
                </View>
 <View style={{paddingTop:10, paddingBottom: 10, marginRight:40}}>
                
                    <View style={{flexDirection: 'row'}}>

                    <View style={{alignItems:'center', marginLeft:20}}>
                      <Image source={require('../assets/icons/AppSpecific/DayCircle.imageset/imgDayBg.png')}>
                       <Text style={{color: 'white', backgroundColor: 'rgba(0,0,0,0)', paddingTop:12, paddingLeft: 8}}>Lun</Text>
                      </Image>
                    </View>

              <View style={{flexDirection: 'row', flexWrap:'wrap', marginLeft:15, alignItems:'center'}}>
              <Text style={styles.button}>8h</Text>
              <Text style={styles.button}>15h</Text>
              
              
              </View>
              
                  </View>
                </View>



            <View style={{paddingTop:10, paddingBottom: 10, marginRight:40}}>
                
                    <View style={{flexDirection: 'row'}}>

                    <View style={{alignItems:'center', marginLeft:20}}>
                      <Image source={require('../assets/icons/AppSpecific/DayCircle.imageset/imgDayBg.png')}>
                       <Text style={{color: 'white', backgroundColor: 'rgba(0,0,0,0)', paddingTop:12, paddingLeft: 8}}>Lun</Text>
                      </Image>
                    </View>

              <View style={{flexDirection: 'row', flexWrap:'wrap', marginLeft:15, alignItems:'center'}}>
              <Text style={styles.button}>8h</Text>
              
              
              </View>
              
                  </View>
                </View> 

                 <View style={{paddingTop:10, paddingBottom: 10, marginRight:40}}>
                
                    <View style={{flexDirection: 'row'}}>

                    <View style={{alignItems:'center', marginLeft:20}}>
                      <Image source={require('../assets/icons/AppSpecific/DayCircle.imageset/imgDayBg.png')}>
                       <Text style={{color: 'white', backgroundColor: 'rgba(0,0,0,0)', paddingTop:12, paddingLeft: 8}}>Lun</Text>
                      </Image>
                    </View>

              <View style={{flexDirection: 'row', flexWrap:'wrap', marginLeft:15, alignItems:'center'}}>
              <Text style={styles.button}>8h</Text>
              <Text style={styles.button}>15h</Text>
              <Text style={styles.button}>15h</Text>
              <Text style={styles.button}>8h</Text>
              
              
              </View>
              
                  </View>
                </View>

                 <View style={{paddingTop:10, paddingBottom: 10, marginRight:40}}>
                
                    <View style={{flexDirection: 'row'}}>

                    <View style={{alignItems:'center', marginLeft:20}}>
                      <Image source={require('../assets/icons/AppSpecific/DayCircle.imageset/imgDayBg.png')}>
                       <Text style={{color: 'white', backgroundColor: 'rgba(0,0,0,0)', paddingTop:12, paddingLeft: 8}}>Lun</Text>
                      </Image>
                    </View>

              <View style={{flexDirection: 'row', flexWrap:'wrap', marginLeft:15, alignItems:'center'}}>
              <Text style={styles.button}>8h</Text>
              <Text style={styles.button}>15h</Text>
              <Text style={styles.button}>15h</Text>
              <Text style={styles.button}>8h</Text>
              <Text style={styles.button}>15h</Text>
              <Text style={styles.button}>8h</Text>
              <Text style={styles.button}>15h</Text>
              
              </View>
              
                  </View>
                </View>


          

        </View>



           

          </View>

          </ScrollView>

           
        </View>


      


    );
  }
}

const styles = StyleSheet.create({
  name: {
    color: 'black',
    backgroundColor: 'rgba(0,0,0,0)',
    fontFamily: 'AvenirNext',
    fontSize: 15,
    paddingTop: 2,
    alignItem:'center', 
    justifyContent: 'center',
  },
  age: {
    color: 'black',
    backgroundColor: 'rgba(0,0,0,0)',
    fontFamily: 'Avenir',
    fontSize: 13,
    paddingTop: 4,
    alignItem:'center', 
    justifyContent: 'center',
  },
  gender: {
    color: 'black',
    backgroundColor: 'rgba(0,0,0,0)',
    fontFamily: 'Avenir',
    fontSize: 12,
    paddingTop: 4,
    alignItem:'center', 
    justifyContent: 'center',
  },
  level: {
    color: 'black',
    backgroundColor: 'rgba(0,0,0,0)',
    fontFamily: 'Avenir',
    fontSize: 12,
    paddingTop: 9,
    alignItem:'center', 
    justifyContent: 'center',
  },
  clubs: {
    color: 'black',
    backgroundColor: 'rgba(0,0,0,0)',
    fontFamily: 'Avenir',
    fontSize: 14,
    left:5,
    marginBottom: 12,
    alignItem:'center', 
    justifyContent: 'center',
  },
  button: {
    width:50,
    height: 30, 
    borderWidth:1, 
    borderColor:'rgb(42,129,82)', 
    borderRadius:'3', 
    overflow:'hidden', 
    paddingTop:5, 
    paddingBottom: 5, 
    marginBottom:5,
    marginRight: 10, 
    color: 'white', 
    backgroundColor: 'rgb(42,129,82)', 
    textAlign:'center'
  },
});

