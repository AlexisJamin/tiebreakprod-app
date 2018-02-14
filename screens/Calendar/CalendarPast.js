import React from 'react';
import { StyleSheet, Text, View, Image, ScrollView, FlatList, TextInput, ActivityIndicator, RefreshControl } from 'react-native';
import { List, ListItem } from 'react-native-elements';
import { Parse } from 'parse/react-native';
import { connect } from 'react-redux';

import moment from 'moment';
import 'moment/locale/fr';

function mapDispatchToProps(dispatch) {
  return {
      handleSubmitGame: function(value) { 
          dispatch( {type: 'game', value: value} ) 
      }
  }
};

class CalendarPast extends React.Component {

  constructor(props) {
    super(props);
    this.renderSeparator = this.renderSeparator.bind(this);
    this.renderFooter = this.renderFooter.bind(this);
    this.renderEmpty = this.renderEmpty.bind(this);
    this.onRefresh = this.onRefresh.bind(this);
    this.viewGame = this.viewGame.bind(this);
    this.state = {
      data: [],
      loading:true,
      refreshing:false
    };
  }

  componentDidMount() {
    var dataMerge = [];
    var edit = this;
    var date = new Date();
    var user = Parse.User.current() || Parse.User.currentAsync();
    var query1 = new Parse.Query("Game");
    query1.equalTo('organiser', user);
    query1.lessThan('date', date); 
    query1.find({
      success: function(game) {
        if (game.length != 0) {
          var gameCopy = [];
          for (var i = 0; i < game.length; i++) {
            gameCopy.push(JSON.parse(JSON.stringify(game[i])));
          }

          for (var i = 0; i < gameCopy.length; i++) {
            if (gameCopy[i].partner == undefined) {
              var partnerParam = {player:'en attente'};
              Object.assign(gameCopy[i], partnerParam);
              dataMerge.push(gameCopy[i]);
              edit.setState({loading:false, data:dataMerge})
            } else {
              
              var query = new Parse.Query("User");

              (function(query, gameCopy, i, edit) { 
              query.equalTo('objectId', gameCopy[i].partner.objectId); 
              query.first({
                success: function(partner) {
                  var firstName = partner.get('firstName');
                  var partnerParam = {player:firstName};
                  Object.assign(gameCopy[i], partnerParam);
                  dataMerge.push(gameCopy[i]);
                  edit.setState({loading:false, data:dataMerge})
                }
              })
              })(query, gameCopy, i, edit);
            }
          } 
        } else {edit.setState({loading:false})}
      }
    });

    var query2 = new Parse.Query("Game");
    query2.lessThan('date', date); 
    query2.equalTo('partner', user); 
    query2.find({
      success: function(game) {
        if (game.length != 0) {
          var gameCopy = [];
          for (var i = 0; i < game.length; i++) {
            gameCopy.push(JSON.parse(JSON.stringify(game[i])));
          }
          for (var i = 0; i < gameCopy.length; i++) {
              
              var query = new Parse.Query("User");
              
              (function(query, gameCopy, i, edit) { 
              query.equalTo('objectId', gameCopy[i].organiser.objectId); 
              query.first({
                success: function(partner) {
                  var firstName = partner.get('firstName');
                  var partnerParam = {player:firstName};
                  Object.assign(gameCopy[i], partnerParam);
                  dataMerge.push(gameCopy[i]);
                  edit.setState({loading:false, data:dataMerge})
                }
              })
              })(query, gameCopy, i, edit);

            }
        } else {edit.setState({loading:false})}
      }
    }); 
  }

  renderSeparator() {
      return (<View
        style={{
          height: 1,
          width: "100%",
          backgroundColor: "#CED0CE",
        }}
      /> 
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
        }}
      >
        <ActivityIndicator animating size="large" />
      </View>
    );
  };

  renderEmpty() {
    if (this.state.loading) return null;
    return (
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <Image source={require('../../assets/icons/AppSpecific/BigYellowBall.imageset/icTennisBallBig.png')} />
        <Text style={{marginTop:10}}> Aucune partie à venir</Text>
      </View>
    );
  }

  viewGame(gameId) {
    this.props.handleSubmitGame({
      gameId:gameId,
    })
    this.props.navigation.navigate("GameView");
  }

  onRefresh() {
    console.log('refresh');
    this.setState({refreshing:true, data:[]});

    var dataMerge = [];
    var edit = this;
    var date = new Date();
    var user = Parse.User.current() || Parse.User.currentAsync();
    var query1 = new Parse.Query("Game");
    query1.equalTo('organiser', user);
    query1.lessThan('date', date); 
    query1.find({
      success: function(game) {
        if (game.length != 0) {
          var gameCopy = [];
          for (var i = 0; i < game.length; i++) {
            gameCopy.push(JSON.parse(JSON.stringify(game[i])));
          }

          for (var i = 0; i < gameCopy.length; i++) {
            if (gameCopy[i].partner == undefined) {
              var partnerParam = {player:'en attente'};
              Object.assign(gameCopy[i], partnerParam);
              dataMerge.push(gameCopy[i]);
              edit.setState({refreshing:false, data:dataMerge})
            } else {
              
              var query = new Parse.Query("User");

              (function(query, gameCopy, i, edit) { 
              query.equalTo('objectId', gameCopy[i].partner.objectId); 
              query.first({
                success: function(partner) {
                  var firstName = partner.get('firstName');
                  var partnerParam = {player:firstName};
                  Object.assign(gameCopy[i], partnerParam);
                  dataMerge.push(gameCopy[i]);
                  edit.setState({refreshing:false, data:dataMerge})
                }
              })
              })(query, gameCopy, i, edit);
            }
          } 
        } else {edit.setState({refreshing:false})}
      }
    });

    var query2 = new Parse.Query("Game");
    query2.lessThan('date', date); 
    query2.equalTo('partner', user); 
    query2.find({
      success: function(game) {
        if (game.length != 0) {
          var gameCopy = [];
          for (var i = 0; i < game.length; i++) {
            gameCopy.push(JSON.parse(JSON.stringify(game[i])));
          }
          for (var i = 0; i < gameCopy.length; i++) {
              
              var query = new Parse.Query("User");
              
              (function(query, gameCopy, i, edit) { 
              query.equalTo('objectId', gameCopy[i].organiser.objectId); 
              query.first({
                success: function(partner) {
                  var firstName = partner.get('firstName');
                  var partnerParam = {player:firstName};
                  Object.assign(gameCopy[i], partnerParam);
                  dataMerge.push(gameCopy[i]);
                  edit.setState({refreshing:false, data:dataMerge})
                }
              })
              })(query, gameCopy, i, edit);

            }
        } else {edit.setState({refreshing:false})}
      }
    }); 
  }


render () {
  return (

    <View style={{flex:1, backgroundColor:'white', marginTop:0}}>

   <List
   containerStyle={{ borderTopWidth: 0, borderBottomWidth: 0 }}
   >
      <FlatList
        data={this.state.data}
        keyExtractor={item => item.objectId}
        ItemSeparatorComponent={this.renderSeparator}
        ListFooterComponent={this.renderFooter}
        ListEmptyComponent={this.renderEmpty}
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this.onRefresh}
          />
        }
        renderItem={({ item }) => (
          <ListItem
          avatarStyle={{width:40, height:40, borderRadius:20, borderWidth:1, borderColor:'white', overflow:'hidden', backgroundColor:'white'}}
          avatarContainerStyle={{width:40, height:40, marginTop:7}}
          avatarOverlayContainerStyle={{backgroundColor:'transparent'}}
          titleContainerStyle={{marginLeft:30}}
          containerStyle={{ borderBottomWidth:0, height:90, justifyContent:'center'}}
          subtitleContainerStyle={{marginLeft:30, width:300}}
          avatar={require('../../assets/icons/AppSpecific/BallYellow.imageset/combinedShapeCopy.png')}
          title={<Text style={{fontSize:14}}>Le {moment(item.date.iso).format('LLLL')}</Text>}
          subtitle={
            <View>
            <Text style={{fontSize:12, paddingTop:2}}>Club: {item.club.name}</Text>
            <Text style={{fontSize:12, paddingTop:2}}>Partenaire: {item.player}</Text>
            </View>
          }
          onPress={()=>{this.viewGame(item.objectId)}}
          />
        )}
      />
    </List>
           
    </View>
           

    );
  }
}

export default connect(null, mapDispatchToProps) (CalendarPast);