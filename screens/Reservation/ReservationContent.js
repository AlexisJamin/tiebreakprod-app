import React from 'react';
import { StyleSheet, Text, View, Image, ScrollView, SectionList, TextInput, ActivityIndicator, RefreshControl } from 'react-native';
import { List, ListItem } from 'react-native-elements';
import { Parse } from 'parse/react-native';
import { connect } from 'react-redux';

import translate from '../../translate.js';

import moment from 'moment/min/moment-with-locales';

import _ from "lodash";

function mapStateToProps(store) {
  return { user: store.user, reservationOption: store.reservationOption }
};

function mapDispatchToProps(dispatch) {
  return {
        handleSubmit: function(value) { 
        dispatch( {type: 'reservationView', value: value} ) 
    }
  }
}

class ReservationContent extends React.Component {

  constructor(props) {
    super(props);
    this.renderSeparator = this.renderSeparator.bind(this);
    this.renderFooter = this.renderFooter.bind(this);
    this.renderEmpty = this.renderEmpty.bind(this);
    this.onRefresh = this.onRefresh.bind(this);
    this.viewReservation = this.viewReservation.bind(this);
    this.getReservations = this.getReservations.bind(this);
    this.state = {
      data: [],
      loading:true,
      refreshing:false,
      filterCondition:null,
      filterType:null,
      filterHours:null,
      range:30,
      date:null,
      surface:null,
      filterDiscount:null
    };

    moment.locale(this.props.user.currentLocale);

  }

  componentWillReceiveProps(nextProps) {
    console.log('nextProps.reservationOption');
    console.log(nextProps.reservationOption);

    let condition;
    if (nextProps.reservationOption.filterCondition === 0) {
        condition = 'indoor';
      } else if (nextProps.reservationOption.filterCondition === 1) {
        condition = 'outdoor';
      }

      let type;
      if (nextProps.reservationOption.filterType === 0) {
        type = 'lesson';
      } else if (nextProps.reservationOption.filterType === 1) {
        type = 'court';
      }

      let surface;
      if (nextProps.reservationOption.surface === 'Dur') {
        surface = 'hard';
      } else if (nextProps.reservationOption.surface === 'Gazon') {
        surface = 'grass';
      } else if (nextProps.reservationOption.surface === 'Moquette') {
        surface = 'carpet';
      } else if (nextProps.reservationOption.surface === 'Terre battue') {
        surface = 'clay';
      } else if (nextProps.reservationOption.surface === 'Synthétique') {
        surface = 'synthetic';
      }

      let discount;
      if (nextProps.reservationOption.filterDiscount === 0) {
        discount = false;
      } else if (nextProps.reservationOption.filterDiscount === 1) {
        discount = true;
      }

    this.setState({
      filterCondition:condition,
      filterType:type,
      filterHours:nextProps.reservationOption.filterHours,
      range:nextProps.reservationOption.range,
      date:nextProps.reservationOption.date,
      surface:surface,
      filterDiscount:discount,
      data:[],
    }, () => {
    this.getReservations();
    })

  }

  componentDidMount() {
    this.getReservations();
  }

  getReservations() {

    var edit = this;
    var user = Parse.User.current() || Parse.User.currentAsync();
    var today = new Date();
    var limit = moment(today).add(7, 'days');
    var userGeoPoint = user.get("geolocation");

    var query = new Parse.Query("Reservation");

    if (this.state.filterCondition) {
      query.equalTo("condition", this.state.filterCondition);
    } 
    if (this.state.filterType) {
      query.equalTo("type", this.state.filterType);
    } 
    if (this.state.surface) {
      query.equalTo("surface", this.state.surface);
    }
    if (this.state.filterDiscount) {
      query.greaterThan("discount", 0);
    }
    if (this.state.filterHours) {
      query.greaterThanOrEqualTo("time", this.state.filterHours[0]*60);
      query.lessThanOrEqualTo("time", this.state.filterHours[1]*60)
    }
    if (this.state.date) {
      var dateMin = moment(this.state.date).hour(23).minute(59).second(59).millisecond(0);
      var dateMax = moment(this.state.date).hour(0).minute(0).second(0).millisecond(0);
      var dateMin = moment(dateMin).add(-1, 'days');
      var dateMax = moment(dateMax).add(1, 'days');

      query.greaterThan("start", new Date(dateMin));
      query.lessThan("start", new Date(dateMax));
    } else {
      query.greaterThan("start", today);
      query.lessThan("start", new Date(limit));  
    }

    query.equalTo("reserved", false);
    query.ascending("start");
    query.find({
    success: function(reservations) {
      if (reservations.length>0) {

        var reservationsCopy = [];
          for (var i = 0; i < reservations.length; i++) {
            reservationsCopy.push(JSON.parse(JSON.stringify(reservations[i])));
          }

          for (var i = 0; i < reservationsCopy.length; i++) {
            
            var date = moment(reservationsCopy[i].start.iso).hour(0).minute(0).second(0).millisecond(0);
            date = new Date(date);

            if (reservationsCopy[i].geopoint != undefined) {
              var distance = Math.round(userGeoPoint.kilometersTo(reservationsCopy[i].geopoint));
            }

            var newParam = {date:date, distance:distance};
            Object.assign(reservationsCopy[i], newParam);

          }
          
          var reservationsCopy = reservationsCopy.filter(x => x.distance < edit.state.range);

          var dataSource = _.groupBy(reservationsCopy, d => d.date);

          var dataSource = _.reduce(dataSource, (acc, next, index) => {
            acc.push({
              title: index,
              data: next
            })
            return acc;
          }, [])

          edit.setState({loading:false, data:dataSource, refreshing:false})

      } else {edit.setState({loading:false, refreshing:false})}
    },
    error: function(error) {
      console.log("Error: " + error.code + " " + error.message);
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
        <Text style={{marginTop:20}}>Désolé, pas de terrains / leçons selon tes crtières de recherche.</Text>
      </View>
    );
  }

  viewReservation(id) {
    this.props.handleSubmit({reservationId:id})
    this.props.navigation.navigate("ReservationView");
  }

  onRefresh() {
    console.log('refresh');
    this.setState({refreshing:true, data:[]});
    this.getReservations();
  }


render () {
  return (

    <View style={{flex:1, backgroundColor:'white', marginTop:-10}}>

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
          avatarContainerStyle={{width:40, height:40, marginTop:15}}
          avatarOverlayContainerStyle={{backgroundColor:'transparent'}}
          titleContainerStyle={{marginLeft:30}}
          containerStyle={{ borderBottomWidth:0, height:120, justifyContent:'center'}}
          subtitleContainerStyle={{marginLeft:30, width:330}}
          avatar={require('../../assets/icons/AppSpecific/BallYellow.imageset/combinedShapeCopy.png')}
          title={<Text style={{fontSize:14}}>{item.clubName} ({item.distance} km)</Text>}
          subtitle={
            <View>
            <Text style={{fontSize:12, paddingTop:2}}>Horaires : {moment(item.start.iso).format('LT')}  -  {moment(item.end.iso).format('LT')} </Text>
            <Text style={{fontSize:12, paddingTop:2, fontWeight:'bold'}}>Type : {(item.type == 'court' && 'Terrain') || (item.type == 'lesson' && 'Leçon individuelle')}</Text>
            <Text style={{fontSize:12, paddingTop:2}}>Prix TTC : {(item.price*(1-0.01*item.discount)).toLocaleString("fr-FR", {style: "currency", currency: "EUR"})}</Text>
            { item.discount != 0 &&
              <Text style={{fontSize:12, fontWeight:'bold', paddingTop:2, color:'rgb(200,90,24)'}}>Réduction : - {item.discount} %</Text>
            }
            <Text style={{fontSize:12, paddingTop:2}}>Terrain : {(item.surface == 'clay' && item.type == 'court' && 'Terre battue ／ ') || (item.surface == 'hard' && item.type == 'court' && 'Dur ／ ') || (item.surface == 'synthetic' && item.type == 'court' && 'Synthétique ／ ') || (item.surface == 'grass' && item.type == 'court' && 'Gazon ／ ') || (item.surface == 'carpet' && item.type == 'court' && 'Moquette ／ ')} {(item.condition == 'outdoor' && 'Extérieur') || (item.condition == 'indoor' && 'Intérieur')} </Text>
            </View>
          }
          onPress={()=>{this.viewReservation(item.objectId)}}
          />
        )}
      />
    </List>
           
    </View>
           

    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps) (ReservationContent);
