import React, { Component } from 'react'
import { View, Image, Text, StyleSheet, ScrollView, TouchableWithoutFeedback, Switch, Slider} from 'react-native'
import { Font } from 'expo'
import MultiSlider from '@ptomasroos/react-native-multi-slider'
import { ButtonGroup } from 'react-native-elements'
import { connect } from 'react-redux'


function mapDispatchToProps(dispatch) {
  return {
        handleSubmitPreferences: function(value) { 
        dispatch( {type: 'userPreferences', value: value} ) 
    }
  }
}

function mapStateToProps(store) {

  return { user: store.user, userClub: store.userClub, userPreferences: store.userPreferences }
}


class ProfilePreferences extends React.Component {

constructor(props) {
    super(props);
    this.updateIndexCourt = this.updateIndexCourt.bind(this);
    this.updateIndexGenre = this.updateIndexGenre.bind(this);
    var filterCondition;
      if (this.props.userPreferences.filterCondition==="indifferent") {
      filterCondition=2;
    } else if (this.props.userPreferences.filterCondition==="inside") {
      filterCondition=0;
    } else if (this.props.userPreferences.filterCondition==="outside") {
      filterCondition=1;
    }

    this.state = {
      fontAvenirNextLoaded: false,
      fontAvenirLoaded: false,
      multiSliderValueLevel: [this.props.userPreferences.filterLevel.from, this.props.userPreferences.filterLevel.to],
      multiSliderValueAge: [this.props.userPreferences.filterAge.from, this.props.userPreferences.filterAge.to],
      range:this.props.userPreferences.filterFieldType.range,
      filterCondition: filterCondition,
      selectedIndexGenre: 2,
    };
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

  updateIndexCourt (filterCondition) {
    this.setState({filterCondition:filterCondition})
  }

  updateIndexGenre (selectedIndex) {
    this.setState({selectedIndexGenre: selectedIndex})
  }


  render() {

    const buttonsCourt = ['Intérieur', 'Extérieur', 'Indifférent']
    const buttonsGenre = ['Hommes', 'Femmes', 'Indifférent']
    var { filterCondition } = this.state;
    var { range } = this.state;

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
          onPress={this.updateIndexCourt}
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
            onValuesChange={(values) => this.setState({multiSliderValueLevel:values})}
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
            onValuesChange={(values) => this.setState({multiSliderValueAge:values})}
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
