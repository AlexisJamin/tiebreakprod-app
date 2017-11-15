import React, { Component } from 'react';
import { View, Image, Text, StyleSheet, ScrollView, TouchableWithoutFeedback, TextInput, Keyboard, FlatList } from 'react-native';
import { Font } from 'expo';
import { connect } from 'react-redux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Parse } from 'parse/react-native';
import { List, ListItem } from 'react-native-elements';

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

const data = [
  {
    name: 'Amy Farha',
    avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
    dispo: '5',
    geo: '2',
    level: '15/2',
    bestLevel: '15/1'
  },
  {
    name: 'Chris Jackson',
    avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
    dispo: '3',
    geo: '3',
    level: 'Intermédiaire',
    bestLevel: '15/1'
  },
  {
    name: 'Amy Farha',
    avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
    dispo: '5',
    geo: '2',
    level: '15/2',
    bestLevel: '15/1'
  },
  {
    name: 'Chris Jackson',
    avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
    dispo: '3',
    geo: '3',
    level: 'Intermédiaire',
    bestLevel: '15/1'
  },
  {
    name: 'Amy Farha',
    avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
    dispo: '5',
    geo: '2',
    level: '15/2',
    bestLevel: '15/1'
  },
  {
    name: 'Chris Jackson',
    avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
    dispo: '3',
    geo: '3',
    level: 'Intermédiaire',
    bestLevel: '15/1'
  },
  {
    name: 'Amy Farha',
    avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
    dispo: '5',
    geo: '2',
    level: '15/2',
    bestLevel: '15/1'
  },
  {
    name: 'Chris Jackson',
    avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
    dispo: '3',
    geo: '3',
    level: 'Intermédiaire',
    bestLevel: '15/1'
  }
];

const data2 = [
  {
    name: 'Amie Farha',
    avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
    dispo: '5',
    geo: '2',
    level: '15/2',
    bestLevel: '15/1'
  },
  {
    name: 'Christopher Jackson',
    avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
    dispo: '3',
    geo: '3',
    level: 'Intermédiaire',
    bestLevel: '15/1'
  }
  ];
class EditClubSearch extends React.Component {

constructor(props) {
    super(props);
    this.renderSeparator = this.renderSeparator.bind(this);
    this.renderFooter = this.renderFooter.bind(this);
    this.state = {
      fontAvenirNextLoaded: false,
      fontAvenirLoaded: false,
      club:'',
      data:''
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

    var Club = Parse.Object.extend("Club");
    var query = new Parse.Query(Club);
    var edit = this;
    // User's location
    var user = Parse.User.current();
    var userGeoPoint = user.get("geolocation");
    console.log(userGeoPoint);
    // Interested in locations near user.
    query.near("geopoint", userGeoPoint);
    // Limit what could be a lot of points.
    query.limit(20);
    // Final list of objects
    query.find({
      success: function(Club) {
        console.log("clubs autour de moi");
        console.log(Club);
        var ClubCopy = JSON.parse(JSON.stringify(Club));
        edit.setState({ data: ClubCopy });
      }
    });

  }

   renderSeparator() {
      return (<View
        style={{
          height: 1,
          width: "100%",
          backgroundColor: "#CED0CE"
        }}/> 
      );
  }

  renderFooter() {
    if (!this.state.loading) return null;

    return (
      <View
        style={{
          paddingVertical: 20,
          borderTopWidth: 1,
          borderColor: "#CED0CE"
        }}>
        <ActivityIndicator animating size="large" />
      </View>
    );
  }

  render() {
    return (

      <View style={{flex:1, backgroundColor:'white'}}>

      <View style={{flexDirection:'row', justifyContent:"space-around", marginTop:30, marginBottom:30}}>
          <TouchableWithoutFeedback style={{padding:30}} onPress={() => this.props.navigation.goBack()}>
          <Image style={{top:12, left:5}} source={require('../../assets/icons/General/Back.imageset/icBackGrey.png')} />
          </TouchableWithoutFeedback>
          <TextInput 
            style={styles.searchBar}
            keyboardType="default"
            returnKeyType='done'
            autoCapitalize='none'
            autoCorrect={false}
            placeholder='rechercher un club'
            underlineColorAndroid='rgba(0,0,0,0)'
            blurOnSubmit={false}
            onChangeText={(club) => this.setState({club})}
            onSubmitEditing={Keyboard.dismiss}
          />
      </View>

       <ScrollView>

      <List
       containerStyle={{borderTopWidth:0, borderBottomWidth:0}}
       >
          <FlatList
            data={this.state.data}
            keyExtractor={data => data.name}
            ItemSeparatorComponent={this.renderSeparator}
            ListFooterComponent={this.renderFooter}
            renderItem={({ item }) => (
              <ListItem
              titleContainerStyle={{marginLeft:20}}
              containerStyle={{borderBottomWidth: 0, height:70, justifyContent:'center'}}
              title={item.name}
              titleStyle={styles.text}
              />
            )}
          />
      </List>
     

      </ScrollView>

      </View>

    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps) (EditClubSearch);

const styles = StyleSheet.create({
  searchBar: {
    width:250,
    height:40, 
    borderWidth:1, 
    borderColor:'rgb(213,212,216)', 
    overflow:'hidden', 
    borderRadius:5,
    paddingLeft:20
  },
    text: {
    paddingLeft:10,
    color:'black'
  }
});
