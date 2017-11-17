import React, { Component } from 'react';
import { View, Image, Text, StyleSheet, ScrollView , TouchableWithoutFeedback} from 'react-native';
import { Font } from 'expo';
import Svg,{
    Line,
} from 'react-native-svg';
import { connect } from 'react-redux';

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
    if (this.props.userClub.length == 0) {
    var newUserClub = <Text style={{textAlign:'center', top: 20, marginBottom:10}}>À COMPLÉTER</Text>;
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
    if (this.props.user.availability[0].hours.length == 0 &&
        this.props.user.availability[1].hours.length == 0 &&
        this.props.user.availability[2].hours.length == 0 &&
        this.props.user.availability[3].hours.length == 0 &&
        this.props.user.availability[4].hours.length == 0 &&
        this.props.user.availability[5].hours.length == 0 &&
        this.props.user.availability[6].hours.length == 0) {
    var newUserDispo = (<View style={{alignItems:'center', top: 20, marginBottom:10}}>
                        <Text style={{marginBottom:10}}> À COMPLÉTER</Text>
                        <Text> (nécessaire pour trouver des ami(e)s / parties) </Text>
                        </View>);
    } else {
    var dayList = [];
    for (var i = 0; i < this.props.user.availability.length; i++) {
      if (this.props.user.availability[i].hours.length > 0) {
      dayList.push(<ProfileContentDispo days = {this.props.user.availability[i].day.slice(0,3)} hours = {this.props.user.availability[i].hours}/>)
      }
    }
  }
  
  if (this.props.user.picture!='')
           {
           profileImage = <Image style={{width: 90, height: 90, borderRadius: 45}} source={{uri: this.props.user.picture}}/>
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

          <View style={{flex:1, justifyContent: 'space-around', flexDirection: 'row'}}>
            
            <Text style={{color: 'rgba(0,0,0,0)', backgroundColor:'rgba(0,0,0,0)'}}>H</Text> 
            <View style={{flexDirection:'row'}}>
            {
             this.state.fontAvenirNextLoaded ? (<Text style={styles.name}> {this.props.user.firstName} {this.props.user.lastName[0]}. </Text> 
             ) : null 
            }
            {
             this.state.fontAvenirLoaded ? (<Text style={styles.age}> (28 ans) </Text> 
             ) : null 
            }
            </View>
            <TouchableWithoutFeedback style={{padding:30}} onPress={() => this.props.navigation.navigate('EditProfile')} >
            <Image source={require('../../assets/icons/General/EditGray.imageset/icEditGrey.png')} />
            </TouchableWithoutFeedback>
          
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
              this.state.fontAvenirLoaded ? (<Text style={styles.level}>{this.props.user.currentLevel} ({this.props.user.highestLevel})</Text>) : null 
              } 
            </View>

            <View style={{alignItems: 'center'}}>
              <Image source={require('../../assets/icons/Profile/Style.imageset/shape.png')} />
              {
              this.state.fontAvenirLoaded ? (<Text style={styles.gender}>{this.props.user.style}</Text>) : null 
              } 
            </View>

            <View style={{alignItems: 'center'}}>
              <Image source={require('../../assets/icons/Profile/Gender.imageset/group5.png')} />
              {
              this.state.fontAvenirLoaded ? (<Text style={styles.gender}>{this.props.user.gender}</Text>) : null 
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
          justifyContent: 'space-around'
        }}>

               <Text style={{color: 'rgba(0,0,0,0)', backgroundColor:'rgba(0,0,0,0)'}}>H</Text> 
               {
              this.state.fontAvenirLoaded ? (<Text style={styles.name}>MES CLUBS</Text>) : null 
              }   
            <TouchableWithoutFeedback style={{padding:30}} onPress={() => this.props.navigation.navigate('EditClub')} >
             <Image source={require('../../assets/icons/General/EditGray.imageset/icEditGrey.png')} />
             </TouchableWithoutFeedback>

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
          justifyContent: 'space-around'
        }}>

               <Text style={{color: 'rgba(0,0,0,0)', backgroundColor:'rgba(0,0,0,0)'}}>H</Text> 
               {
              this.state.fontAvenirLoaded ? (<Text style={styles.name}>MES DISPONIBILITÉS</Text>) : null 
              }   
            <TouchableWithoutFeedback style={{padding:30}} onPress={() => this.props.navigation.navigate('EditDispo')} >
            <Image source={require('../../assets/icons/General/EditGray.imageset/icEditGrey.png')} />
            </TouchableWithoutFeedback>

          </View>


          <View style={{
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'space-around',
          top: 10
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
    paddingTop: 2,
    alignItem:'center', 
    justifyContent: 'center'
  },
  age: {
    color:'black',
    backgroundColor:'rgba(0,0,0,0)',
    fontFamily:'Avenir',
    fontSize: 13,
    paddingTop: 4,
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

