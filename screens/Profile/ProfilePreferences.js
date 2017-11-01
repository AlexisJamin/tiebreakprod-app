import React, { Component } from 'react';
import { View, Image, Text, StyleSheet, ScrollView, TouchableWithoutFeedback, Switch, Slider} from 'react-native';
import { Font } from 'expo';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import { ButtonGroup } from 'react-native-elements';
import { connect } from 'react-redux';
import { Parse } from 'parse/react-native';

Parse.initialize("3E8CAAOTf6oi3NaL6z8oVVJ7wvtfKa");
Parse.serverURL = 'https://tiebreak.herokuapp.com/parse';

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
    //this.handleClick = this.handleClick.bind(this);
    this._onPressValidateButton = this._onPressValidateButton.bind(this);

    let filterCondition;
      if (this.props.userPreferences.filterCondition==="indifferent") {
      filterCondition=2;
    } else if (this.props.userPreferences.filterCondition==="inside") {
      filterCondition=0;
    } else if (this.props.userPreferences.filterCondition==="outside") {
      filterCondition=1;
    }

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
      filterCondition: filterCondition,
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

     let filterCondition;
      if (edit.state.filterCondition===2) {
      filterCondition="indifferent";
    } else if (edit.state.filterCondition===0) {
      filterCondition="inside";
    } else if (edit.state.filterCondition===1) {
      filterCondition="outside";
    }

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
     var user = Parse.User.current();
     user.set("filterStyle", filterStyle);
     user.set("filterGender", filterGender);
     user.set("filterCondition", filterCondition);
     user.set("filterLevel", {"to":edit.state.filterLevel[1], "from":edit.state.filterLevel[0]});
     user.set("filterAge", {"to":edit.state.filterAge[1], "from":edit.state.filterAge[0]});
     user.set("filterFieldType", {"range":edit.state.range,"key":"aroundMe","latitude":edit.props.user.latitude,"longitude":edit.props.user.longitude});
     user.save();

     edit.props.handleSubmitPreferences({
        filterCondition:filterCondition,
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

    const buttonsCourt = ['Intérieur', 'Extérieur', 'Indifférent'];
    const buttonsGenre = ['Homme', 'Femme', 'Indifférent'];
    const buttonsStyle = ['Droitier', 'Gaucher', 'Indifférent'];
    let { filterCondition } = this.state;
    let { filterGender } = this.state;
    let { filterStyle } = this.state;
    let { range } = this.state;

    return (

      <View style={{flex:1, backgroundColor:'white'}}>

        <ScrollView>

        <View style={styles.page}>

         {
          this.state.fontAvenirLoaded ? (<Text style={{marginBottom:30, fontFamily: 'Avenir', fontStyle: 'italic', textAlign:'center'}}> Quelles sont vos préférences de jeu ? </Text>
          ) : null 
         }

         {
          this.state.fontAvenirLoaded ? (<Text style={{marginBottom:30, fontFamily: 'AvenirNext', paddingLeft:10}}> TERRAINS </Text>
          ) : null 
         }

        <View style={{flexDirection:'row', justifyContent: 'center'}}>
        {
          this.state.fontAvenirLoaded ? (<Text style={{fontFamily: 'Avenir', fontWeight: '600'}}> Distance maximum : </Text> 
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

         <ButtonGroup 
          onPress={(filterCondition) => this.setState({filterCondition})}
          selectedIndex={filterCondition}
          buttons={buttonsCourt}
          textStyle={styles.title}
          selectedBackgroundColor={'rgb(42,127,83)'}
          selectedTextStyle={styles.subtitle}
          containerStyle={styles.container}
          />

        {
          this.state.fontAvenirLoaded ? (<Text style={{fontFamily: 'AvenirNext', textAlign: 'left', paddingLeft:10}}> PARTENAIRES </Text>
          ) : null 
         }

        <View style={{flexDirection:'row', justifyContent: 'center', marginBottom:30, marginTop:30}}>
        {
          this.state.fontAvenirLoaded ? (<Text style={{fontFamily: 'Avenir', fontWeight: '600'}}> Niveau min : {this.state.filterLevel[0]} </Text> 
            ) : null 
         }
        {
          this.state.fontAvenirLoaded ? (<Text style={{fontFamily: 'Avenir', fontWeight: '600'}}>  /  </Text> 
            ) : null 
         }
        {
          this.state.fontAvenirLoaded ? (<Text style={{fontFamily: 'Avenir', fontWeight: '600'}}> Niveau max : {this.state.filterLevel[1]} </Text> 
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
          this.state.fontAvenirLoaded ? (<Text style={{fontFamily: 'Avenir', fontWeight: '600'}}> Âge min : {this.state.filterAge[0]} </Text> 
            ) : null 
         }
        {
          this.state.fontAvenirLoaded ? (<Text style={{fontFamily: 'Avenir', fontWeight: '600'}}>  /  </Text>
            ) : null 
         }
        {
          this.state.fontAvenirLoaded ? (<Text style={{fontFamily: 'Avenir', fontWeight: '600'}}> Âge max : {this.state.filterAge[1]} </Text> 
            ) : null 
         }
        </View>

         <View style={{alignItems:'center'}}>
         <MultiSlider
            values={[this.state.filterAge[0], this.state.filterAge[1]]}
            sliderLength={320}
            onValuesChange={(values) => this.setState({filterAge:values})}
            min={15}
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

          {
          this.state.fontAvenirLoaded ? (<Text style={{fontFamily: 'AvenirNext', textAlign: 'left', marginBottom:30, paddingLeft:10}}> CALENDRIER </Text>
          ) : null 
         }

         <View style={{flexDirection:'row', justifyContent: 'space-around', marginBottom:30}}>
        {
          this.state.fontAvenirLoaded ? (<Text style={{fontFamily: 'Avenir', width:200}}>Synchroniser le calendrier du téléphone avec Tie Break </Text> 
          ) : null 
         }

         <Switch
         onTintColor='rgb(42,129,82)'
         value='true'
         />
         </View>

         {
          this.state.fontAvenirLoaded ? (<Text style={{fontFamily: 'AvenirNext', textAlign: 'left', marginBottom:30, paddingLeft:10}}> GEOLOCALISATION </Text>
          ) : null 
         }

         <View style={{flexDirection:'row', justifyContent: 'space-around', marginBottom:30}}>
        {
          this.state.fontAvenirLoaded ? (<Text style={{fontFamily: 'Avenir', width:200}}>Autoriser Tie Break (nécessaire pour trouver des amis / parties / terrains ) </Text> 
          ) : null 
         }

         <Switch
         onTintColor='rgb(42,129,82)'
         value='true'
         />
         </View>

          </View>

       

         </ScrollView>

         <TouchableWithoutFeedback onPress={this._onPressValidateButton}>
         <Text style={styles.buttonLogIn}>Valider</Text>
         </TouchableWithoutFeedback>

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
