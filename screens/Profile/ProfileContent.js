import React, { Component } from 'react';
import { View, Image, Text, StyleSheet, ScrollView , TouchableOpacity} from 'react-native';
import { Font, Svg, Amplitude } from 'expo';
import { Entypo } from '@expo/vector-icons';
import { connect } from 'react-redux';

import moment from 'moment/min/moment-with-locales';

import translate from '../../translate.js';

import ProfileContentClubs from './ProfileContentClubs';
import ProfileContentClubsBullets from './ProfileContentClubsBullets';
import ProfileContentDispo from './ProfileContentDispo';



function mapStateToProps(store) {
  return { user: store.user, userClub: store.userClub }
}


class ProfileContent extends React.Component {

constructor(props) {
    super(props);
    this.state = {
      fontAvenirNextLoaded: false,
      fontAvenirLoaded: false
    };

    moment.locale(this.props.user.currentLocale);
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

_onPressEditProfile = () => {
  Amplitude.logEvent("EditProfile Button clicked");
  this.props.navigation.navigate('EditProfile');
};

_onPressEditDispo = () => {
  Amplitude.logEvent("EditDispo Button clicked");
  this.props.navigation.navigate('EditDispo');
};

_onPressEditClub = () => {
  Amplitude.logEvent("EditClub Button clicked");
  this.props.navigation.navigate('EditClub');
};

  render() {

    if (this.props.user.birthday != undefined) {
      var age = moment().diff(this.props.user.birthday, 'years')+' '+translate.old[this.props.user.currentLocale];
    } else {
      var age = translate.toComplete[this.props.user.currentLocale];
    }
    

    if (this.props.userClub.length == 0) {
    var newUserClub = <Text style={{textAlign:'center', top: 20, marginBottom:10}}>{translate.toComplete[this.props.user.currentLocale].toUpperCase()}</Text>;
    } else {
    var clubList = [];
    for (var i = 0; i < this.props.userClub.length; i++) {
      clubList.push(<ProfileContentClubs clubName = {this.props.userClub[i].name} />)
    }

    var clubListBullets = [];
    for (var i = 0; i < this.props.userClub.length; i++) {
      clubListBullets.push(<ProfileContentClubsBullets/>)
    }
  }
    if (this.props.user.availability == undefined ||
        this.props.user.availability[0].hours.length == 0 &&
        this.props.user.availability[1].hours.length == 0 &&
        this.props.user.availability[2].hours.length == 0 &&
        this.props.user.availability[3].hours.length == 0 &&
        this.props.user.availability[4].hours.length == 0 &&
        this.props.user.availability[5].hours.length == 0 &&
        this.props.user.availability[6].hours.length == 0) {
    var newUserDispo = (<View style={{alignItems:'center', top: 20, marginBottom:10}}>
                        <Text style={{marginBottom:10}}> {translate.toComplete[this.props.user.currentLocale].toUpperCase()}</Text>
                        <Text> ({translate.required[this.props.user.currentLocale]}) </Text>
                        </View>);
    } else {
    var dayList = [];
    for (var i = 0; i < this.props.user.availability.length; i++) {
      if (this.props.user.availability[i].hours.length > 0) {
      dayList.push(<ProfileContentDispo days = {this.props.user.availability[i].day.slice(0,3)} hours = {this.props.user.availability[i].hours}/>)
      }
    }
  }
  
  if (this.props.user.picture!=undefined)
           {
           profileImage = (
            <TouchableOpacity hitSlop={{top:50, left:50, bottom:50, right:50}} onPress={this._onPressEditProfile} >
            <Image style={{width: 90, height: 90, borderRadius: 45}} source={{uri: this.props.user.picture}}/>
            </TouchableOpacity>)
           } else {
             profileImage = (
              <TouchableOpacity hitSlop={{top:50, left:50, bottom:50, right:50}} onPress={this._onPressEditProfile} >
              <Image style={{width: 90, height: 90, borderRadius: 45}} source={require('../../assets/icons/General/Placeholder.imageset/3639e848-bc9c-11e6-937b-fa2a206349a2.png')}/>
              </TouchableOpacity>)
             }

  if (this.props.user.currentLevel == undefined) {
    var currentLevel = "à compléter";
  } else if (this.props.user.currentLevel == 0) {
    var currentLevel = 'Débutant';
  } else if (this.props.user.currentLevel == 1) {
    var currentLevel = 'Intermédiaire';
  } else if (this.props.user.currentLevel == 2) {
    var currentLevel = 'Avancé';
  } else if (this.props.user.currentLevel == 3) {
    var currentLevel = '40';
  } else if (this.props.user.currentLevel == 4) {
    var currentLevel = '30/5';
  } else if (this.props.user.currentLevel == 5) {
    var currentLevel = '30/4';
  } else if (this.props.user.currentLevel == 6) {
    var currentLevel = '30/3';
  } else if (this.props.user.currentLevel == 7) {
    var currentLevel = '30/2';
  } else if (this.props.user.currentLevel == 8) {
    var currentLevel = '30/1';
  } else if (this.props.user.currentLevel == 9) {
    var currentLevel = '30';
  } else if (this.props.user.currentLevel == 10) {
    var currentLevel = '15/5';
  } else if (this.props.user.currentLevel == 11) {
    var currentLevel = '15/4';
  } else if (this.props.user.currentLevel == 12) {
    var currentLevel = '15/3';
  } else if (this.props.user.currentLevel == 13) {
    var currentLevel = '15/2';
  } else if (this.props.user.currentLevel == 14) {
    var currentLevel = '15/1';
  } else if (this.props.user.currentLevel == 15) {
    var currentLevel = '15';
  } else if (this.props.user.currentLevel == 16) {
    var currentLevel = '5/6';
  } else if (this.props.user.currentLevel == 17) {
    var currentLevel = '4/6';
  } else if (this.props.user.currentLevel == 18) {
    var currentLevel = '3/6';
  } else if (this.props.user.currentLevel == 19) {
    var currentLevel = '2/6';
  } else if (this.props.user.currentLevel == 20) {
    var currentLevel = '1/6';
  } else if (this.props.user.currentLevel == 21) {
    var currentLevel = '0';
  } else if (this.props.user.currentLevel == 22) {
    var currentLevel = '-2/6';
  } else if (this.props.user.currentLevel == 23) {
    var currentLevel = '-4/6';
  } else if (this.props.user.currentLevel == 24) {
    var currentLevel = '-15';
  }

  if (this.props.user.highestLevel == undefined) {
    var highestLevel = "à compléter";
  } else if (this.props.user.highestLevel == 0) {
    var highestLevel = 'Débutant';
  } else if (this.props.user.highestLevel == 1) {
    var highestLevel = 'Intermédiaire';
  } else if (this.props.user.highestLevel == 2) {
    var highestLevel = 'Avancé';
  } else if (this.props.user.highestLevel == 3) {
    var highestLevel = '40';
  } else if (this.props.user.highestLevel == 4) {
    var highestLevel = '30/5';
  } else if (this.props.user.highestLevel == 5) {
    var highestLevel = '30/4';
  } else if (this.props.user.highestLevel == 6) {
    var highestLevel = '30/3';
  } else if (this.props.user.highestLevel == 7) {
    var highestLevel = '30/2';
  } else if (this.props.user.highestLevel == 8) {
    var highestLevel = '30/1';
  } else if (this.props.user.highestLevel == 9) {
    var highestLevel = '30';
  } else if (this.props.user.highestLevel == 10) {
    var highestLevel = '15/5';
  } else if (this.props.user.highestLevel == 11) {
    var highestLevel = '15/4';
  } else if (this.props.user.highestLevel == 12) {
    var highestLevel = '15/3';
  } else if (this.props.user.highestLevel == 13) {
    var highestLevel = '15/2';
  } else if (this.props.user.highestLevel == 14) {
    var highestLevel = '15/1';
  } else if (this.props.user.highestLevel == 15) {
    var highestLevel = '15';
  } else if (this.props.user.highestLevel == 16) {
    var highestLevel = '5/6';
  } else if (this.props.user.highestLevel == 17) {
    var highestLevel = '4/6';
  } else if (this.props.user.highestLevel == 18) {
    var highestLevel = '3/6';
  } else if (this.props.user.highestLevel == 19) {
    var highestLevel = '2/6';
  } else if (this.props.user.highestLevel == 20) {
    var highestLevel = '1/6';
  } else if (this.props.user.highestLevel == 21) {
    var highestLevel = '0';
  } else if (this.props.user.highestLevel == 22) {
    var highestLevel = '-2/6';
  } else if (this.props.user.highestLevel == 23) {
    var highestLevel = '-4/6';
  } else if (this.props.user.highestLevel == 24) {
    var highestLevel = '-15';
  }

  if (this.props.user.gender == undefined) {
    var gender = translate.toComplete[this.props.user.currentLocale];
  } else if (this.props.user.gender == 'male') {
    var gender = translate.man[this.props.user.currentLocale];
  } else if (this.props.user.gender == 'female') {
    var gender = translate.woman[this.props.user.currentLocale];
  }

  if (this.props.user.style == undefined) {
    var style = translate.toComplete[this.props.user.currentLocale];
  } else if (this.props.user.style == 'right') {
    var style = translate.rightHanded[this.props.user.currentLocale];
  } else if (this.props.user.style == 'left') {
    var style = translate.leftHanded[this.props.user.currentLocale];
  }

    return (

      <View style={{flex:1, backgroundColor:'white', marginTop:40}}>

        <ScrollView>

        <View>

          <View style={{
            alignItems:'center',
            marginBottom:15
          }}>
          
                  {profileImage}

              </View>

          <View style={{flex:1, justifyContent: 'center', flexDirection: 'row'}}>
            
            {
             this.state.fontAvenirNextLoaded ? (
               <TouchableOpacity hitSlop={{top:50, left:50, bottom:50, right:50}} onPress={this._onPressEditProfile} >
              <Text style={styles.name}> {this.props.user.firstName} {this.props.user.lastName[0]}. </Text> 
              </TouchableOpacity>
             ) : null 
            }
            {
             this.state.fontAvenirLoaded ? (
              <TouchableOpacity hitSlop={{top:50, left:50, bottom:50, right:50}} onPress={this._onPressEditProfile} >
              <Text style={styles.age}> ({age}) </Text> 
              </TouchableOpacity>
             ) : null 
            }
            <TouchableOpacity hitSlop={{top:50, left:50, bottom:50, right:50}} onPress={this._onPressEditProfile} >
            <Entypo name="pencil" size={20} color='gray' />
            </TouchableOpacity>
          
          </View>

          <View style={{flex:1, top: 20, alignItems: 'center'}}>
            <Svg
              height={40}
              width={150}
            >
              <Svg.Line
                x1={0}
                y1={0}
                x2={150}
                y2={0}
                stroke="rgb(210,210,210)"
                strokeWidth="2"
               />
            </Svg>
          </View>

          <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-around'}}>
            

            <View style={{alignItems: 'center'}}>
              <Image source={require('../../assets/icons/Profile/Level.imageset/icRank.png')} />
              {
              this.state.fontAvenirLoaded ? (<Text style={styles.level}>{currentLevel} ({highestLevel})</Text>) : null 
              } 
            </View>

            <View style={{alignItems: 'center'}}>
              <Image source={require('../../assets/icons/Profile/Style.imageset/shape.png')} />
              {
              this.state.fontAvenirLoaded ? (<Text style={styles.gender}>{style}</Text>) : null 
              } 
            </View>

            <View style={{alignItems: 'center'}}>
              <Image source={require('../../assets/icons/Profile/Gender.imageset/group5.png')} />
              {
              this.state.fontAvenirLoaded ? (<Text style={styles.gender}>{gender}</Text>) : null 
              }  
            </View>

            </View>
    
            <View style={{flex:1, top: 20, alignItems: 'center'}}>
            <Svg
              height={40}
              width={300}
            >
              <Svg.Line
                x1={0}
                y1={0}
                x2={300}
                y2={0}
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
              this.state.fontAvenirLoaded ? (
                <TouchableOpacity hitSlop={{top:50, left:50, bottom:50, right:50}} onPress={this._onPressEditClub} >
                <Text style={styles.name}>{translate.myClubs[this.props.user.currentLocale]}</Text>
                </TouchableOpacity>) : null 
              }   
            <TouchableOpacity hitSlop={{top:50, left:50, bottom:50, right:50}} onPress={this._onPressEditClub} >
             <Entypo name="pencil" size={20} color='gray' style={{left:3}} />
             </TouchableOpacity>

          </View>

          {newUserClub}

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
              height={40}
              width={300}
            >
              <Svg.Line
                x1={0}
                y1={0}
                x2={300}
                y2={0}
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
              this.state.fontAvenirLoaded ? (
                <TouchableOpacity hitSlop={{top:50, left:50, bottom:50, right:50}} onPress={this._onPressEditDispo} >
                <Text style={styles.name}>{translate.myAvailabilities[this.props.user.currentLocale]}</Text>
                </TouchableOpacity>) : null 
              }   
            <TouchableOpacity hitSlop={{top:50, left:50, bottom:50, right:50}} onPress={this._onPressEditDispo} >
            <Entypo name="pencil" size={20} color='gray' style={{left:3}} />
            </TouchableOpacity>

          </View>


          <View style={{
          flex:1,
          flexDirection:'column',
          justifyContent:'space-around',
          marginTop:10,
          marginBottom:20
          }}>
                    {newUserDispo}
                    {dayList}


         </View>

         </View>

         </ScrollView>

         </View>

    );
  }
}

export default connect(mapStateToProps, null) (ProfileContent);

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
    marginTop:3,
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

