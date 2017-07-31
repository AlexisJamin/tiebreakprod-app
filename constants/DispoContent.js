import React, { Component } from 'react'
import { View, Image, Text, StyleSheet, ScrollView } from 'react-native'
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


          <View style={{
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'space-around',
          top:-20,
        }}>

           <View style={{marginRight:40}}>
                
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
             

             <View style={{marginRight:40}}>
                
                    <View style={{flexDirection: 'row'}}>


                       <Text style={styles.days}>Mar</Text>

                       <View style={{flexDirection: 'row', flexWrap:'wrap', marginLeft:15, marginTop:5, alignItems:'center'}}>
                        <Text style={styles.buttonPlus}><Image style={{marginTop:12}} source={require('../assets/icons/General/Add.imageset/icAdd.png')}/></Text>
                       </View>
              
                    </View>
             </View>



            <View style={{marginRight:40}}>
                
                    <View style={{flexDirection: 'row'}}>

                    <View style={{alignItems:'center', marginLeft:20}}>
                      <Image source={require('../assets/icons/AppSpecific/DayCircle.imageset/imgDayBg.png')}>
                       <Text style={{color: 'white', backgroundColor: 'rgba(0,0,0,0)', paddingTop:12, paddingLeft: 8}}>Mer</Text>
                      </Image>
                    </View>

              <View style={{flexDirection: 'row', flexWrap:'wrap', marginLeft:15, alignItems:'center'}}>
              <Text style={styles.button}>8h</Text>
              
              
              </View>
              
                  </View>
                </View> 

                 <View style={{marginRight:40}}>
                
                    <View style={{flexDirection: 'row'}}>

                    <View style={{alignItems:'center', marginLeft:20}}>
                      <Image source={require('../assets/icons/AppSpecific/DayCircle.imageset/imgDayBg.png')}>
                       <Text style={{color: 'white', backgroundColor: 'rgba(0,0,0,0)', paddingTop:12, paddingLeft: 8}}>Jeu</Text>
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

                 <View style={{marginRight:40}}>
                
                    <View style={{flexDirection: 'row'}}>

                    <View style={{alignItems:'center', marginLeft:20}}>
                      <Image source={require('../assets/icons/AppSpecific/DayCircle.imageset/imgDayBg.png')}>
                       <Text style={{color: 'white', backgroundColor: 'rgba(0,0,0,0)', paddingTop:12, paddingLeft: 8}}>Ven</Text>
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


                <View style={{marginRight:40}}>
                
                    <View style={{flexDirection: 'row'}}>

                    <View style={{alignItems:'center', marginLeft:20}}>
                      <Image source={require('../assets/icons/AppSpecific/DayCircle.imageset/imgDayBg.png')}>
                       <Text style={{color: 'white', backgroundColor: 'rgba(0,0,0,0)', paddingTop:12, paddingLeft: 8}}>Sam</Text>
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

                <View style={{marginRight:40}}>
                
                    <View style={{flexDirection: 'row'}}>

                    <View style={{alignItems:'center', marginLeft:20}}>
                      <Image source={require('../assets/icons/AppSpecific/DayCircle.imageset/imgDayBg.png')}>
                       <Text style={{color: 'white', backgroundColor: 'rgba(0,0,0,0)', paddingTop:12, paddingLeft: 8}}>Dim</Text>
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
    width:36,
    height:28, 
    borderWidth:1, 
    borderColor:'rgb(42,129,82)', 
    paddingTop:5, 
    paddingBottom: 5, 
    marginBottom:5,
    marginRight: 10, 
    color: 'white', 
    backgroundColor: 'rgb(42,129,82)', 
    textAlign:'center'
  },
  buttonPlus: {
    width:28,
    height:28, 
    borderWidth:1, 
    borderColor:'rgb(200,90,24)', 
    paddingTop:5, 
    paddingBottom: 5, 
    marginBottom:5,
    marginRight: 10, 
    backgroundColor: 'rgb(200,90,24)', 
    textAlign:'center',
  },
  days: {
    marginLeft:20, 
    textAlign:'center', 
    width:40, 
    height:40, 
    color: 'black', 
    backgroundColor: 'rgba(0,0,0,0)', 
    paddingTop:10, 
    borderWidth:0.5, 
    borderColor:'grey', 
    borderRadius:20
  },
});

