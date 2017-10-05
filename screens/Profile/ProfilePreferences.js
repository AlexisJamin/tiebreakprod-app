import React, { Component } from 'react'
import { View, Image, Text, StyleSheet, ScrollView , TouchableWithoutFeedback, Switch, Slider} from 'react-native'
import { Font } from 'expo'
import MultiSlider from '@ptomasroos/react-native-multi-slider'
import { ButtonGroup } from 'react-native-elements'
import { connect } from 'react-redux'
import { NavigationActions } from 'react-navigation'


function mapDispatchToProps(dispatch) {
  return {
        handleSubmit: function(value) { 
        dispatch( {type: 'user', value: value} ) 
    }
  }
}

function mapStateToProps(store) {

  return { user: store.user, userClub: store.userClub }
}


class ProfilePreferences extends React.Component {

constructor(props) {
    super(props);
    this.multiSliderValueLevelChange = this.multiSliderValueLevelChange.bind(this);
    this.multiSliderValueAgeChange = this.multiSliderValueAgeChange.bind(this);
    this.updateIndexCourt = this.updateIndexCourt.bind(this);
     this.updateIndexGenre = this.updateIndexGenre.bind(this);
    this.state = {
      fontAvenirNextLoaded: false,
      fontAvenirLoaded: false,
      multiSliderValueLevel: [0, 15],
      multiSliderValueAge: [15, 70],
      range:30,
      selectedIndexCourt: 2,
      selectedIndexGenre: 2,
    };
    console.log(this.state.selectedIndexCourt);
  }

  async componentDidMount() {
   
    await Font.loadAsync({
      'AvenirNext': require('../../assets/fonts/AvenirNext.ttf'),
      'Avenir': require('../../assets/fonts/Avenir.ttf'),
    });
    this.setState({ 
      fontAvenirNextLoaded: true,
      fontAvenirLoaded: true,

    });
  }

  multiSliderValueLevelChange(values) {
    this.setState({
      multiSliderValueLevel: values,
    });
  }

  multiSliderValueAgeChange(values) {
    this.setState({
      multiSliderValueAge: values,
    });
  }

  updateIndexCourt (selectedIndex) {
    this.setState({selectedIndexCourt:selectedIndex})
  }

  updateIndexGenre (selectedIndex) {
    this.setState({selectedIndexGenre: selectedIndex})
  }


  render() {

    const buttonsCourt = ['Intérieur', 'Extérieur', 'Indifférent']
    const buttonsGenre = ['Hommes', 'Femmes', 'Indifférent']
    const { selectedIndexCourt } = this.state;

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
          value={30}
          minimumTrackTintColor='rgb(42,129,82)'
          onValueChange={(range) => this.setState({range})}
        />
        </View>

         <ButtonGroup 
          onPress={this.updateIndexCourt}
          selectedIndex={selectedIndexCourt}
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
          this.state.fontAvenirLoaded ? (<Text style={{fontFamily: 'Avenir', fontWeight: '600'}}> Niveau min : {this.state.multiSliderValueLevel[0]} </Text> 
            ) : null 
         }
        {
          this.state.fontAvenirLoaded ? (<Text style={{fontFamily: 'Avenir', fontWeight: '600'}}>  /  </Text> 
            ) : null 
         }
        {
          this.state.fontAvenirLoaded ? (<Text style={{fontFamily: 'Avenir', fontWeight: '600'}}> Niveau max : {this.state.multiSliderValueLevel[1]} </Text> 
            ) : null 
         }
        </View>

        <View style={{alignItems:'center'}}>
        <MultiSlider
            values={[this.state.multiSliderValueLevel[0], this.state.multiSliderValueLevel[1]]}
            sliderLength={320}
            onValuesChange={this.multiSliderValueLevelChange}
            min={0}
            max={15}
            step={1}
            selectedStyle={{
            backgroundColor: 'rgb(42,129,82)',
            }}
            allowOverlap
            snapped
          />
          </View>

          <ButtonGroup 
          onPress={this.updateIndexGenre}
          selectedIndex={this.state.selectedIndexGenre}
          buttons={buttonsGenre}
          textStyle={styles.title}
          selectedBackgroundColor={'rgb(42,127,83)'}
          selectedTextStyle={styles.subtitle}
          containerStyle={styles.container}
          />

        <View style={{flexDirection:'row', justifyContent: 'center', marginBottom:30}}>
        {
          this.state.fontAvenirLoaded ? (<Text style={{fontFamily: 'Avenir', fontWeight: '600'}}> Âge min : {this.state.multiSliderValueAge[0]} </Text> 
            ) : null 
         }
        {
          this.state.fontAvenirLoaded ? (<Text style={{fontFamily: 'Avenir', fontWeight: '600'}}>  /  </Text>
            ) : null 
         }
        {
          this.state.fontAvenirLoaded ? (<Text style={{fontFamily: 'Avenir', fontWeight: '600'}}> Âge max : {this.state.multiSliderValueAge[1]} </Text> 
            ) : null 
         }
        </View>

         <View style={{alignItems:'center'}}>
         <MultiSlider
            values={[this.state.multiSliderValueAge[0], this.state.multiSliderValueAge[1]]}
            sliderLength={320}
            onValuesChange={this.multiSliderValueAgeChange}
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
