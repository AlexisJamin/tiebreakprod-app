import React, { Component } from 'react';
import { View, Image, Text, StyleSheet, ScrollView, TouchableOpacity, Switch, Slider} from 'react-native';
import { Font } from 'expo';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import { ButtonGroup } from 'react-native-elements';
import { connect } from 'react-redux';
import { Parse } from 'parse/react-native';

import translate from '../../translate.js';

function mapStateToProps(store) {

  return { user: store.user, userClub: store.userClub, userPreferences: store.userPreferences, button: store.button }
};

function mapDispatchToProps(dispatch) {
  return {
        handleSubmit: function(value) { 
        dispatch( {type: 'user', value: value} ) 
    },
        handleSubmitClub: function(value) { 
        dispatch( {type: 'userClub', value: value} ) 
    },
        handleSubmitPreferences: function(value) { 
        dispatch( {type: 'userPreferences', value: value} ) 
    },
        handleSubmitButton: function(value) { 
        dispatch( {type: 'button', value: value} ) 
    }
  }
};

class ProfilePreferences extends React.Component {

constructor(props) {
    super(props);
    this._onPressValidateButton = this._onPressValidateButton.bind(this);

    let filterGender;
      if (this.props.userPreferences.filterGender==="indifferent") {
      filterGender=2;
    } else if (this.props.userPreferences.filterGender==="man") {
      filterGender=0;
    } else if (this.props.userPreferences.filterGender==="woman") {
      filterGender=1;
    }

    let filterStyle;
      if (this.props.userPreferences.filterStyle==="indifferent") {
      filterStyle=2;
    } else if (this.props.userPreferences.filterStyle==="right") {
      filterStyle=0;
    } else if (this.props.userPreferences.filterStyle==="left") {
      filterStyle=1;
    }

    this.state = {
      fontAvenirNextLoaded: false,
      fontAvenirLoaded: false,
      filterLevel: [this.props.userPreferences.filterLevel.from, this.props.userPreferences.filterLevel.to],
      filterAge: [this.props.userPreferences.filterAge.from, this.props.userPreferences.filterAge.to],
      range:this.props.userPreferences.filterFieldType.range,
      filterGender: filterGender,
      filterStyle: filterStyle
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

  _onPressValidateButton() {

    var edit = this;

    let filterGender;
      if (edit.state.filterGender===2) {
      filterGender="indifferent";
    } else if (edit.state.filterGender===0) {
      filterGender="man";
    } else if (edit.state.filterGender===1) {
      filterGender="woman";
    }

    let filterStyle;
      if (edit.state.filterStyle===2) {
      filterStyle="indifferent";
    } else if (edit.state.filterStyle===0) {
      filterStyle="right";
    } else if (edit.state.filterStyle===1) {
      filterStyle="left";
    }
     var user = Parse.User.current() || Parse.User.currentAsync();
     user.set("filterStyle", filterStyle);
     user.set("filterGender", filterGender);
     user.set("filterLevel", {"to":edit.state.filterLevel[1], "from":edit.state.filterLevel[0]});
     user.set("filterAge", {"to":edit.state.filterAge[1], "from":edit.state.filterAge[0]});
     user.set("filterFieldType", {"range":edit.state.range,"key":"aroundMe","latitude":edit.props.user.latitude,"longitude":edit.props.user.longitude});
     user.save();

     edit.props.handleSubmitPreferences({
        filterAge:{"to":edit.state.filterAge[1], "from":edit.state.filterAge[0]},
        filterLevel:{"to":edit.state.filterLevel[1], "from":edit.state.filterLevel[0]},
        filterGender:filterGender,
        filterStyle:filterStyle,
        filterFieldType:{"range":edit.state.range,"key":"aroundMe","latitude":edit.props.user.latitude,"longitude":edit.props.user.longitude}
      })

     edit.props.handleSubmitButton({
        ChatButtonIndex:edit.props.button.ChatButtonIndex,
        CommunityButtonIndex:edit.props.button.CommunityButtonIndex,
        CalendarButtonIndex:edit.props.button.CalendarButtonIndex,
        ProfileButtonIndex:0
      })

     edit.props.navigation.navigate("ProfileContent");
  }

  render() {

    const buttonsGenre = [translate.man[this.props.user.currentLocale], translate.woman[this.props.user.currentLocale], translate.indifferent[this.props.user.currentLocale]];
    const buttonsStyle = [translate.rightHanded[this.props.user.currentLocale], translate.leftHanded[this.props.user.currentLocale], translate.indifferent[this.props.user.currentLocale]];
    let { filterGender } = this.state;
    let { filterStyle } = this.state;
    let { range } = this.state;

    if (this.state.filterLevel[0] == 0) {
    var niveauMin = 'Débutant';
  } else if (this.state.filterLevel[0] == 1) {
    var niveauMin = 'Intermédiaire';
  } else if (this.state.filterLevel[0] == 2) {
    var niveauMin = 'Avancé';
  } else if (this.state.filterLevel[0] == 3) {
    var niveauMin = '40';
  } else if (this.state.filterLevel[0] == 4) {
    var niveauMin = '30/5';
  } else if (this.state.filterLevel[0] == 5) {
    var niveauMin = '30/4';
  } else if (this.state.filterLevel[0] == 6) {
    var niveauMin = '30/3';
  } else if (this.state.filterLevel[0] == 7) {
    var niveauMin = '30/2';
  } else if (this.state.filterLevel[0] == 8) {
    var niveauMin = '30/1';
  } else if (this.state.filterLevel[0] == 9) {
    var niveauMin = '30';
  } else if (this.state.filterLevel[0] == 10) {
    var niveauMin = '15/5';
  } else if (this.state.filterLevel[0] == 11) {
    var niveauMin = '15/4';
  } else if (this.state.filterLevel[0] == 12) {
    var niveauMin = '15/3';
  } else if (this.state.filterLevel[0] == 13) {
    var niveauMin = '15/2';
  } else if (this.state.filterLevel[0] == 14) {
    var niveauMin = '15/1';
  } else if (this.state.filterLevel[0] == 15) {
    var niveauMin = '15';
  } else if (this.state.filterLevel[0] == 16) {
    var niveauMin = '5/6';
  } else if (this.state.filterLevel[0] == 17) {
    var niveauMin = '4/6';
  } else if (this.state.filterLevel[0] == 18) {
    var niveauMin = '3/6';
  } else if (this.state.filterLevel[0] == 19) {
    var niveauMin = '2/6';
  } else if (this.state.filterLevel[0] == 20) {
    var niveauMin = '1/6';
  } else if (this.state.filterLevel[0] == 21) {
    var niveauMin = '0';
  } else if (this.state.filterLevel[0] == 22) {
    var niveauMin = '-2/6';
  } else if (this.state.filterLevel[0] == 23) {
    var niveauMin = '-4/6';
  } else if (this.state.filterLevel[0] == 24) {
    var niveauMin = '-15';
  }

  if (this.state.filterLevel[1] == 0) {
    var niveauMax = 'Débutant';
  } else if (this.state.filterLevel[1] == 1) {
    var niveauMax = 'Intermédiaire';
  } else if (this.state.filterLevel[1] == 2) {
    var niveauMax = 'Avancé';
  } else if (this.state.filterLevel[1] == 3) {
    var niveauMax = '40';
  } else if (this.state.filterLevel[1] == 4) {
    var niveauMax = '30/5';
  } else if (this.state.filterLevel[1] == 5) {
    var niveauMax = '30/4';
  } else if (this.state.filterLevel[1] == 6) {
    var niveauMax = '30/3';
  } else if (this.state.filterLevel[1] == 7) {
    var niveauMax = '30/2';
  } else if (this.state.filterLevel[1] == 8) {
    var niveauMax = '30/1';
  } else if (this.state.filterLevel[1] == 9) {
    var niveauMax = '30';
  } else if (this.state.filterLevel[1] == 10) {
    var niveauMax = '15/5';
  } else if (this.state.filterLevel[1] == 11) {
    var niveauMax = '15/4';
  } else if (this.state.filterLevel[1] == 12) {
    var niveauMax = '15/3';
  } else if (this.state.filterLevel[1] == 13) {
    var niveauMax = '15/2';
  } else if (this.state.filterLevel[1] == 14) {
    var niveauMax = '15/1';
  } else if (this.state.filterLevel[1] == 15) {
    var niveauMax = '15';
  } else if (this.state.filterLevel[1] == 16) {
    var niveauMax = '5/6';
  } else if (this.state.filterLevel[1] == 17) {
    var niveauMax = '4/6';
  } else if (this.state.filterLevel[1] == 18) {
    var niveauMax = '3/6';
  } else if (this.state.filterLevel[1] == 19) {
    var niveauMax = '2/6';
  } else if (this.state.filterLevel[1] == 20) {
    var niveauMax = '1/6';
  } else if (this.state.filterLevel[1] == 21) {
    var niveauMax = '0';
  } else if (this.state.filterLevel[1] == 22) {
    var niveauMax = '-2/6';
  } else if (this.state.filterLevel[1] == 23) {
    var niveauMax = '-4/6';
  } else if (this.state.filterLevel[1] == 24) {
    var niveauMax = '-15';
  }

    return (

      <View style={{flex:1, backgroundColor:'white'}}>

        <ScrollView>

        <View style={styles.page}>

         {
          this.state.fontAvenirLoaded ? (<Text style={{marginBottom:30, fontFamily: 'Avenir', fontStyle: 'italic', textAlign:'center'}}>{translate.gamePreferences[this.props.user.currentLocale]}</Text>
          ) : null 
         }

        {
          this.state.fontAvenirLoaded ? (<Text style={{fontFamily: 'AvenirNext', textAlign: 'left', paddingLeft:10, marginBottom:10 }}>{translate.partners[this.props.user.currentLocale].toUpperCase()}</Text>
          ) : null 
         }

        <View style={{flexDirection:'row', justifyContent: 'center'}}>
        {
          this.state.fontAvenirLoaded ? (<Text style={{fontFamily: 'Avenir', fontWeight: '600'}}>{translate.maxDistance[this.props.user.currentLocale]} : </Text> 
          ) : null 
         }
         {
          this.state.fontAvenirLoaded ? (<Text style={{fontFamily: 'Avenir', fontWeight: '600'}}> {this.state.range} km </Text> 
          ) : null 
         }
        </View>

        <View style={{alignItems:'center'}}>
        <Slider 
          style={{width: 350}}
          maximumValue={30}
          step={1}
          value={range}
          minimumTrackTintColor='rgb(42,129,82)'
          onValueChange={(range) => this.setState({range})}
        />
        </View>

        

        <View style={{flexDirection:'row', justifyContent: 'center', marginBottom:30, marginTop:30}}>
        {
          this.state.fontAvenirLoaded ? (<Text style={{fontFamily: 'Avenir', fontWeight: '600'}}>{translate.minLevel[this.props.user.currentLocale]} : {niveauMin} </Text> 
            ) : null 
         }
        {
          this.state.fontAvenirLoaded ? (<Text style={{fontFamily: 'Avenir', fontWeight: '600'}}>  /  </Text> 
            ) : null 
         }
        {
          this.state.fontAvenirLoaded ? (<Text style={{fontFamily: 'Avenir', fontWeight: '600'}}>{translate.maxLevel[this.props.user.currentLocale]} : {niveauMax} </Text> 
            ) : null 
         }
        </View>

        <View style={{alignItems:'center'}}>
        <MultiSlider
            values={[this.state.filterLevel[0], this.state.filterLevel[1]]}
            sliderLength={320}
            onValuesChange={(values) => this.setState({filterLevel:values})}
            min={0}
            max={24}
            step={1}
            selectedStyle={{
            backgroundColor: 'rgb(42,129,82)',
            }}
            allowOverlap
            snapped
          />
          </View>

          <ButtonGroup 
          onPress={(filterGender) => this.setState({filterGender})}
          selectedIndex={filterGender}
          buttons={buttonsGenre}
          textStyle={styles.title}
          selectedBackgroundColor={'rgb(42,127,83)'}
          selectedTextStyle={styles.subtitle}
          containerStyle={styles.container}
          />

        <View style={{flexDirection:'row', justifyContent: 'center', marginBottom:30}}>
        {
          this.state.fontAvenirLoaded ? (<Text style={{fontFamily: 'Avenir', fontWeight: '600'}}>{translate.ageMin[this.props.user.currentLocale]} : {this.state.filterAge[0]} </Text> 
            ) : null 
         }
        {
          this.state.fontAvenirLoaded ? (<Text style={{fontFamily: 'Avenir', fontWeight: '600'}}>  /  </Text>
            ) : null 
         }
        {
          this.state.fontAvenirLoaded ? (<Text style={{fontFamily: 'Avenir', fontWeight: '600'}}>{translate.ageMax[this.props.user.currentLocale]} : {this.state.filterAge[1]} </Text> 
            ) : null 
         }
        </View>

         <View style={{alignItems:'center'}}>
         <MultiSlider
            values={[this.state.filterAge[0], this.state.filterAge[1]]}
            sliderLength={320}
            onValuesChange={(values) => this.setState({filterAge:values})}
            min={18}
            max={70}
            step={1}
            selectedStyle={{
            backgroundColor: 'rgb(42,129,82)',
            }}
            allowOverlap
            snapped
          />
          </View>

          <ButtonGroup 
          onPress={(filterStyle) => this.setState({filterStyle})}
          selectedIndex={filterStyle}
          buttons={buttonsStyle}
          textStyle={styles.title}
          selectedBackgroundColor={'rgb(42,127,83)'}
          selectedTextStyle={styles.subtitle}
          containerStyle={styles.container}
          />

          </View>

       

         </ScrollView>

         <TouchableOpacity onPress={this._onPressValidateButton}>
         <Text style={styles.buttonLogIn}>{translate.validate[this.props.user.currentLocale]}</Text>
         </TouchableOpacity>

         </View>

    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps) (ProfilePreferences);

var styles = StyleSheet.create({
  buttonLogIn: {
    backgroundColor: 'rgb(200,90,24)',
    color: 'white',
    fontSize: 18,
    lineHeight: 30,
    textAlign: 'center',
    overflow:'hidden', 
    paddingTop:15,
    paddingBottom:15 
  },
  page: {
    flexDirection: 'column',
    justifyContent: 'center',
  },
  title: {
    color: 'black',
    backgroundColor: 'rgba(0,0,0,0)',
    fontFamily: 'Avenir',
    fontSize: 15,
    textAlign: 'center',
  },
   subtitle: {
    color: 'white',
    backgroundColor: 'rgba(0,0,0,0)',
    fontFamily: 'Avenir',
    fontSize: 15,
    textAlign: 'center',
  },
  container: {
    backgroundColor: 'white',
    height: 40,
    marginBottom:30,
  },
});
