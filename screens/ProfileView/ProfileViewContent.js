import React, { Component } from 'react';
import { View, Image, Text, StyleSheet, ScrollView , TouchableWithoutFeedback} from 'react-native';
import { Font } from 'expo';
import Svg,{
    Line,
} from 'react-native-svg';
import { connect } from 'react-redux';

import ProfileViewContentClubs from './ProfileViewContentClubs';
import ProfileViewContentClubsBullets from './ProfileViewContentClubsBullets';
import ProfileViewContentDispo from './ProfileViewContentDispo';



function mapStateToProps(store) {

  return { user: store.user, userClub: store.userClub, viewProfile: store.viewProfile }
}


class ProfileViewContent extends React.Component {

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

    var commonAvailabitities = [...this.props.viewProfile.availability];
    var commonAvailabititiesFiltered = [];
    
    for (var i = 0; i < commonAvailabitities.length; i++) {
      if (commonAvailabitities[i].hours != undefined) {   
      var array = commonAvailabitities[i].hours.filter((n) => this.props.user.availability[i].hours.includes(n));
      commonAvailabititiesFiltered.push({day:commonAvailabitities[i].day, hours:array});
      }
    }

    var clubList = [];
    for (var i = 0; i < this.props.viewProfile.clubs.length; i++) {
      clubList.push(<ProfileViewContentClubs clubId = {this.props.viewProfile.clubs[i].id} />)
    }

    var clubListBullets = [];
    for (var i = 0; i < this.props.viewProfile.clubs.length; i++) {
      clubListBullets.push(<ProfileViewContentClubsBullets/>)
    }
  
    var dayList = [];
    for (var i = 0; i < commonAvailabititiesFiltered.length; i++) {
      if (commonAvailabititiesFiltered[i].hours.length > 0) {
      dayList.push(<ProfileViewContentDispo days = {commonAvailabititiesFiltered[i].day.slice(0,3)} hours = {commonAvailabititiesFiltered[i].hours}/>)
      }
    }
  
  
  if (this.props.viewProfile.picture!='')
           {
           profileImage = <Image style={{width: 90, height: 90, borderRadius: 45}} source={{uri: this.props.viewProfile.picture}}/>
           } else {
             profileImage = <Image style={{width: 90, height: 90, borderRadius: 45}} source={require('../../assets/icons/General/Placeholder.imageset/3639e848-bc9c-11e6-937b-fa2a206349a2.png')}/>
             }

    return (

      <View style={{flex:1, backgroundColor:'white'}}>

        <ScrollView>

        <View>

          <View style={{
            alignItems:'center',
            marginBottom:15
          }}>
          
                  {profileImage}

              </View>

          <View style={{flex:1, justifyContent: 'center', flexDirection: 'row'}}>
            
            <View style={{flexDirection:'column', alignItems:'center'}}>
            {
             this.state.fontAvenirNextLoaded ? (<Text style={styles.name}> {this.props.viewProfile.firstName} {this.props.viewProfile.lastName[0]}. </Text> 
             ) : null 
            }
            {
             this.state.fontAvenirLoaded ? (<Text style={styles.age}> (28 ans) </Text> 
             ) : null 
            }
            </View>
          
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
              <Image source={require('../../assets/icons/Profile/Level.imageset/icRank.png')} />
              {
              this.state.fontAvenirLoaded ? (<Text style={styles.level}>{this.props.viewProfile.currentLevel} ({this.props.viewProfile.highestLevel})</Text>) : null 
              } 
            </View>

            <View style={{alignItems: 'center'}}>
              <Image source={require('../../assets/icons/Profile/Style.imageset/shape.png')} />
              {
              this.state.fontAvenirLoaded ? (<Text style={styles.gender}>{this.props.viewProfile.style}</Text>) : null 
              } 
            </View>

            <View style={{alignItems: 'center'}}>
              <Image source={require('../../assets/icons/Profile/Gender.imageset/group5.png')} />
              {
              this.state.fontAvenirLoaded ? (<Text style={styles.gender}>{this.props.viewProfile.gender}</Text>) : null 
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
          justifyContent: 'center'
        }}>

               {
              this.state.fontAvenirLoaded ? (<Text style={styles.name}>CLUBS PRÉFÉRÉS</Text>) : null 
              }   

          </View>

          <View style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'center',
          top: 20
          }}>


          <View style={{
          flexDirection: 'column',
          justifyContent: 'space-around'
          }}>
          {clubListBullets}
          </View>

          <View style={{
          flexDirection: 'column',
          justifyContent: 'space-around'
          }}>
          {clubList}
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
          justifyContent: 'center'
        }}>

               {
              this.state.fontAvenirLoaded ? (<Text style={styles.name}>DISPONIBILITÉS COMMUNES</Text>) : null 
              }   

          </View>


          <View style={{
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'space-around',
          top: 10
          }}>
                    {dayList}


         </View>

         </View>

         </ScrollView>

         </View>

    );
  }
}

export default connect(mapStateToProps, null) (ProfileViewContent);

const styles = StyleSheet.create({
  name: {
    color:'black',
    backgroundColor:'rgba(0,0,0,0)',
    fontFamily: 'AvenirNext',
    fontSize: 15,
    marginTop: 2,
    alignItem:'center', 
    justifyContent: 'center'
  },
  age: {
    color:'black',
    backgroundColor:'rgba(0,0,0,0)',
    fontFamily:'Avenir',
    fontSize: 13,
    marginTop: 2,
    alignItem:'center', 
    justifyContent: 'center'
  },
  gender: {
    color:'black',
    backgroundColor:'rgba(0,0,0,0)',
    fontFamily:'Avenir',
    fontSize: 12,
    paddingTop: 4,
    alignItem:'center', 
    justifyContent:'center'
  },
  level: {
    color:'black',
    backgroundColor:'rgba(0,0,0,0)',
    fontFamily:'Avenir',
    fontSize: 12,
    paddingTop: 9,
    alignItem:'center', 
    justifyContent: 'center'
  },
  clubs: {
    color: 'black',
    backgroundColor: 'rgba(0,0,0,0)',
    fontFamily: 'Avenir',
    fontSize: 14,
    left:5,
    marginBottom: 12,
    alignItem:'center', 
    justifyContent: 'center'
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
  }
});

