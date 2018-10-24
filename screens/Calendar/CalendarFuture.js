import React from 'react';
import { StyleSheet, Text, View, Image, ScrollView, SectionList, TextInput, ActivityIndicator, RefreshControl } from 'react-native';
import { Amplitude } from 'expo';
import { List, ListItem } from 'react-native-elements';
import { Parse } from 'parse/react-native';
import { connect } from 'react-redux';
import _ from "lodash";

import translate from '../../translate.js';

import moment from 'moment/min/moment-with-locales';

function mapDispatchToProps(dispatch) {
  return {
      handleSubmitGame: function(value) { 
          dispatch( {type: 'game', value: value} ) 
      },
      handleSubmitReservation: function(value) {
          dispatch( {type: 'reservationView', value: value} )
      }
  }
};

function mapStateToProps(store) {
  return { user: store.user }
};

class CalendarFuture extends React.Component {

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

    moment.locale(this.props.user.currentLocale);

  }

  componentDidMount() {
    var dataMerge = [];
    var edit = this;
    var today = new Date();
    var user = Parse.User.current() || Parse.User.currentAsync();
    var query1 = new Parse.Query("Game");
    query1.equalTo('organiser', user);
    query1.greaterThan('date', today);
    query1.ascending("date"); 
    query1.find({
      success: function(game) {
        if (game.length != 0) {
          var gameCopy = [];
          for (var i = 0; i < game.length; i++) {
            gameCopy.push(JSON.parse(JSON.stringify(game[i])));
          }

          for (var i = 0; i < gameCopy.length; i++) {

            gameCopy[i].start = gameCopy[i].date;
            var date = moment(gameCopy[i].date.iso).hour(0).minute(0).second(0).millisecond(0);
            gameCopy[i].date = new Date(date);

            if (gameCopy[i].partner == undefined) {
              var partnerParam = {player:translate.waiting[edit.props.user.currentLocale], typeOf:'game'};
              Object.assign(gameCopy[i], partnerParam);
              dataMerge.push(gameCopy[i]);
            } else {
              
              var query = new Parse.Query("User");

              (function(query, gameCopy, i, edit) { 
              query.equalTo('objectId', gameCopy[i].partner.objectId); 
              query.first({
                success: function(partner) {
                  var firstName = partner.get('firstName');
                  var partnerParam = {player:firstName, typeOf:'game'};
                  Object.assign(gameCopy[i], partnerParam);
                  dataMerge.push(gameCopy[i]);
                }
              })
              })(query, gameCopy, i, edit);
            }
          } 
        } 
      }
    })
    .then(()=>{
      var query2 = new Parse.Query("Game");
      query2.greaterThan('date', today); 
      query2.equalTo('partner', user);
      query2.ascending("date");  
      return query2.find({
        success: function(game) {
          if (game.length != 0) {
            var gameCopy = [];
            for (var i = 0; i < game.length; i++) {
              gameCopy.push(JSON.parse(JSON.stringify(game[i])));
            }
            for (var i = 0; i < gameCopy.length; i++) {

              gameCopy[i].start = gameCopy[i].date;
              var date = moment(gameCopy[i].date.iso).hour(0).minute(0).second(0).millisecond(0);
              gameCopy[i].date = new Date(date);
                
                var query = new Parse.Query("User");
                
                (function(query, gameCopy, i, edit) { 
                query.equalTo('objectId', gameCopy[i].organiser.objectId); 
                query.first({
                  success: function(partner) {
                    var firstName = partner.get('firstName');
                    var partnerParam = {player:firstName, typeOf:'game'};
                    Object.assign(gameCopy[i], partnerParam);
                    dataMerge.push(gameCopy[i]);
                  }
                })
                })(query, gameCopy, i, edit);

              }
          } 
        }
      }); 
    })
    /*.then(()=> {
      var query3 = new Parse.Query("Reservation");
      query3.greaterThan('start', today); 
      query3.equalTo('customer', user);
      query3.ascending("date");
      query3.equalTo('reserved', true);    
      return query3.find({
        success: function(reservation) {
          if (reservation.length != 0) {
            var reservationCopy = [];
            for (var i = 0; i < reservation.length; i++) {
              reservationCopy.push(JSON.parse(JSON.stringify(reservation[i])));
            }
            for (var i = 0; i < reservationCopy.length; i++) {
                    
                  var date = moment(reservationCopy[i].start.iso).hour(0).minute(0).second(0).millisecond(0);
                  date = new Date(date);

                  var partnerParam = {date:date, name:reservationCopy[i].clubName, typeOf:'reservation'};
                  Object.assign(reservationCopy[i], partnerParam);
                  dataMerge.push(reservationCopy[i]);
                }
            } 
          } 
      }); 
    })*/
    .then(()=> {

       var data = _.orderBy(dataMerge , ['date'], ['asc']);

        var data = _.groupBy(data, d => d.date);

        var data = _.reduce(data, (acc, next, index) => {
          acc.push({
            title: index,
            data: next
          })
          return acc;
        }, [])

        edit.setState({loading:false, data:data})

    })
    
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
        <Text style={{marginTop:20}}> {translate.noGameIncoming[this.props.user.currentLocale]}</Text>
      </View>
    );
  }

  onRefresh() {
    this.setState({refreshing:true, data:[]});

    var dataMerge = [];
    var edit = this;
    var today = new Date();
    var user = Parse.User.current() || Parse.User.currentAsync();
    var query1 = new Parse.Query("Game");
    query1.equalTo('organiser', user);
    query1.greaterThan('date', today); 
    query1.find({
      success: function(game) {
        if (game.length != 0) {
          var gameCopy = [];
          for (var i = 0; i < game.length; i++) {
            gameCopy.push(JSON.parse(JSON.stringify(game[i])));
          }

          for (var i = 0; i < gameCopy.length; i++) {

            gameCopy[i].start = gameCopy[i].date;
            var date = moment(gameCopy[i].date.iso).hour(0).minute(0).second(0).millisecond(0);
            gameCopy[i].date = new Date(date);

            if (gameCopy[i].partner == undefined) {
              var partnerParam = {player:translate.waiting[edit.props.user.currentLocale], typeOf:'game'};
              Object.assign(gameCopy[i], partnerParam);
              dataMerge.push(gameCopy[i]);
            } else {
              
              var query = new Parse.Query("User");

              (function(query, gameCopy, i, edit) { 
              query.equalTo('objectId', gameCopy[i].partner.objectId); 
              query.first({
                success: function(partner) {
                  var firstName = partner.get('firstName');
                  var partnerParam = {player:firstName, typeOf:'game'};
                  Object.assign(gameCopy[i], partnerParam);
                  dataMerge.push(gameCopy[i]);
                }
              })
              })(query, gameCopy, i, edit);
            }
          } 
        } 
      }
    })
    .then(()=>{
      var query2 = new Parse.Query("Game");
      query2.greaterThan('date', today); 
      query2.equalTo('partner', user); 
      return query2.find({
        success: function(game) {
          if (game.length != 0) {
            var gameCopy = [];
            for (var i = 0; i < game.length; i++) {
              gameCopy.push(JSON.parse(JSON.stringify(game[i])));
            }
            for (var i = 0; i < gameCopy.length; i++) {

              gameCopy[i].start = gameCopy[i].date;
              var date = moment(gameCopy[i].date.iso).hour(0).minute(0).second(0).millisecond(0);
              gameCopy[i].date = new Date(date);
                
                var query = new Parse.Query("User");
                
                (function(query, gameCopy, i, edit) { 
                query.equalTo('objectId', gameCopy[i].organiser.objectId); 
                query.first({
                  success: function(partner) {
                    var firstName = partner.get('firstName');
                    var partnerParam = {player:firstName, typeOf:'game'};
                    Object.assign(gameCopy[i], partnerParam);
                    dataMerge.push(gameCopy[i]);
                  }
                })
                })(query, gameCopy, i, edit);

              }
          } 
        }
      }); 
    })
    /*.then(()=> {
      var query3 = new Parse.Query("Reservation");
      query3.greaterThan('start', today); 
      query3.equalTo('customer', user);
      query3.equalTo('reserved', true);  
      return query3.find({
        success: function(reservation) {
          if (reservation.length != 0) {
            var reservationCopy = [];
            for (var i = 0; i < reservation.length; i++) {
              reservationCopy.push(JSON.parse(JSON.stringify(reservation[i])));
            }
            for (var i = 0; i < reservationCopy.length; i++) {
                    
                  var date = moment(reservationCopy[i].start.iso).hour(0).minute(0).second(0).millisecond(0);
                  date = new Date(date);

                  var partnerParam = {date:date, name:reservationCopy[i].clubName, typeOf:'reservation'};
                  Object.assign(reservationCopy[i], partnerParam);
                  dataMerge.push(reservationCopy[i]);
                }
            } 
          } 
      }); 
    })*/
    .then(()=> {
       
       var data = _.orderBy(dataMerge , ['date'], ['asc']);

        var data = _.groupBy(data, d => d.date);

        var data = _.reduce(data, (acc, next, index) => {
          acc.push({
            title: index,
            data: next
          })
          return acc;
        }, [])

        edit.setState({refreshing:false, data:data})

    })
    
  }


  viewGame(id, typeOf) {

    Amplitude.logEvent("GameView Button clicked");
    if (typeOf === 'game') {
      this.props.handleSubmitGame({
        gameId:id,
      })
      this.props.navigation.navigate("GameView");
    } 
    /*else if (typeOf === 'reservation') {
        this.props.handleSubmitReservation({
          reservationId:id
        })
        this.props.navigation.navigate("ReservationView");
    }*/

  }


render () {
  return (

   <View style={{flex:1, backgroundColor:'white', marginTop:20}}>

   <List
   containerStyle={{ borderTopWidth: 0, borderBottomWidth: 0 }}
   >
      <SectionList
        sections={this.state.data}
        keyExtractor={item => item.objectId}
        renderSectionHeader={({ section: { title } }) => <Text style={{ padding:10, backgroundColor:'rgb(42,129,82)', color:'white' }}> {moment(title).format("dddd D MMMM YYYY")} </Text>} 
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
          subtitleContainerStyle={{marginLeft:30, width:330}}
          avatar={require('../../assets/icons/AppSpecific/BallYellow.imageset/combinedShapeCopy.png')}
          title={ <Text style={{fontSize:12, paddingTop:2}}>{translate.club[this.props.user.currentLocale]}: {item.club.name || item.clubName}</Text>}
          subtitle={
            <View>
            { item.typeOf === "game" &&
            <View>
            <Text style={{fontSize:12, paddingTop:2, fontWeight:'bold'}}>{translate.partner[this.props.user.currentLocale]}: {item.player} </Text>
            <Text style={{fontSize:12, paddingTop:2}}>Horaire : {moment(item.start.iso).format('LT')} </Text>
            </View>
            }
            </View>
          }
          onPress={()=>{this.viewGame(item.objectId, item.typeOf)}}
          />
        )}
      />
    </List>

           
    </View>
           

    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps) (CalendarFuture);
