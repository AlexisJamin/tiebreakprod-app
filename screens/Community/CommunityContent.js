import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, FlatList, TextInput, ActivityIndicator, RefreshControl } from 'react-native';
import { Parse } from 'parse/react-native';
import { List, ListItem } from 'react-native-elements';
import { connect } from 'react-redux';

Parse.initialize("3E8CAAOTf6oi3NaL6z8oVVJ7wvtfKa");
Parse.serverURL = 'https://tiebreak.herokuapp.com/parse';

function mapStateToProps(store) {

  return { user: store.user, userClub: store.userClub, userPreferences: store.userPreferences, button: store.button }
};

function mapDispatchToProps(dispatch) {
  return {
        handleSubmit: function(value) { 
        dispatch( {type: 'viewProfile', value: value} ) 
    }
  }
};

class CommunityContent extends React.Component {

  constructor(props) {
    super(props);
    this.renderSeparator = this.renderSeparator.bind(this);
    this.renderFooter = this.renderFooter.bind(this);
    this.renderEmpty = this.renderEmpty.bind(this);
    this.onRefresh = this.onRefresh.bind(this);
    this.viewProfile = this.viewProfile.bind(this);
    this.state = {
      data: null,
      loading: true,
      refreshing: false,
    };
  }

  async componentDidMount() {

    var user = Parse.User.current();
    var userGeoPoint = user.get("geolocation");
    var query = new Parse.Query(Parse.User);
    var edit = this;
    query.notEqualTo('email', Parse.User.current().getEmail());
    query.greaterThanOrEqualTo("currentLevel", this.props.userPreferences.filterLevel.from);
    query.lessThanOrEqualTo("currentLevel", this.props.userPreferences.filterLevel.to);
    if (this.props.userPreferences.filterGender === "man") {
      query.notEqualTo("gender", "female");
    }
     if (this.props.userPreferences.filterGender === "woman") {
      query.notEqualTo("gender", "male");
    }
    // User's location
    // Interested in locations near user.
    query.withinKilometers("geolocation", userGeoPoint, this.props.userPreferences.filterFieldType.range);
    //query.near("geolocation", userGeoPoint);
    // Limit what could be a lot of points.
    query.limit(10);
    var userAvailability = this.props.user.availability;
    // Final list of objects
    query.find({
      success: function(Community) {
        // don't understand why but can't access to the Objects contained in the Parse Array "Club". Works with JSON.parse(JSON.stringify()).
        if (Community.length != 0) {
        var CommunityCopy = [];
        for (var i = 0; i < Community.length; i++) {
          CommunityCopy.push(JSON.parse(JSON.stringify(Community[i])));
        }

        for (var i = 0; i < CommunityCopy.length; i++) {
          var distance = Math.round(userGeoPoint.kilometersTo(CommunityCopy[i].geolocation));
          var distanceParam = {distance: distance};
          Object.assign(CommunityCopy[i], distanceParam);
        }

        var commonDispo = 0;
        for (var i = 0; i < CommunityCopy.length; i++) {
        commonDispo = 0;
            for (var j = 0; j < userAvailability.length; j++) {
              if (CommunityCopy[i].availability != undefined) { 
                var array = CommunityCopy[i].availability[j].hours.filter((n) => userAvailability[j].hours.includes(n));
                commonDispo = commonDispo + array.length;
              }
              else {commonDispo = 0;}
            }
        var commonDispoParam = {commonDispo: commonDispo};
        Object.assign(CommunityCopy[i], commonDispoParam);
        }
        CommunityCopy.sort(function (a, b) {
        return a.commonDispo - b.commonDispo;
        }).reverse();

        function notEqualToZero(element) {
        return element.commonDispo != 0;
      }
        var CommunityCopyFiltered = CommunityCopy.filter(notEqualToZero);
        edit.setState({ data: CommunityCopyFiltered, loading: false });
        }
        else {edit.setState({loading:false})}
      },
      error: function(e) {
        console.log(e);
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
  }

  renderEmpty() {
    return (
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <Image source={require('../../assets/icons/AppSpecific/BigYellowBall.imageset/icTennisBallBig.png')} />
        <Text style={{marginTop:10}}> Aucun résultat.</Text>
        <Text style={{marginTop:10}}> Pensez à compléter votre profil ! </Text>
      </View>
    );
  }

  onRefresh() {
    console.log('refresh');
      this.setState({refreshing:true});
      var user = Parse.User.current();
    var userGeoPoint = user.get("geolocation");
    var query = new Parse.Query(Parse.User);
    var edit = this;
    query.notEqualTo('email', Parse.User.current().getEmail());
    query.greaterThanOrEqualTo("currentLevel", this.props.userPreferences.filterLevel.from);
    query.lessThanOrEqualTo("currentLevel", this.props.userPreferences.filterLevel.to);
    if (this.props.userPreferences.filterGender === "man") {
      query.notEqualTo("gender", "female");
    }
     if (this.props.userPreferences.filterGender === "woman") {
      query.notEqualTo("gender", "male");
    }
    // User's location
    // Interested in locations near user.
    query.withinKilometers("geolocation", userGeoPoint, this.props.userPreferences.filterFieldType.range);
    //query.near("geolocation", userGeoPoint);
    // Limit what could be a lot of points.
    query.limit(10);
    var userAvailability = this.props.user.availability;
    // Final list of objects
    query.find({
      success: function(Community) {
        // don't understand why but can't access to the Objects contained in the Parse Array "Club". Works with JSON.parse(JSON.stringify()).
        if (Conversation.length != 0) {
        var CommunityCopy = [];
        for (var i = 0; i < Community.length; i++) {
          CommunityCopy.push(JSON.parse(JSON.stringify(Community[i])));
        }

        for (var i = 0; i < CommunityCopy.length; i++) {
          var distance = Math.round(userGeoPoint.kilometersTo(CommunityCopy[i].geolocation));
          var distanceParam = {distance: distance};
          Object.assign(CommunityCopy[i], distanceParam);
        }

        var commonDispo = 0;
        for (var i = 0; i < CommunityCopy.length; i++) {
        commonDispo = 0;
            for (var j = 0; j < userAvailability.length; j++) {
              if (CommunityCopy[i].availability != undefined) { 
                var array = CommunityCopy[i].availability[j].hours.filter((n) => userAvailability[j].hours.includes(n));
                commonDispo = commonDispo + array.length;
              }
              else {commonDispo = 0;}
            }
        var commonDispoParam = {commonDispo: commonDispo};
        Object.assign(CommunityCopy[i], commonDispoParam);
        }
        CommunityCopy.sort(function (a, b) {
        return a.commonDispo - b.commonDispo;
        }).reverse();

        function notEqualToZero(element) {
        return element.commonDispo != 0;
      }
        var CommunityCopyFiltered = CommunityCopy.filter(notEqualToZero);
        edit.setState({ data: CommunityCopyFiltered, refreshing: false });
        console.log('refresh terminé');
        }
        else {edit.setState({refreshing:false})}
          console.log('refresh terminé');
      },
      error: function(e) {
        console.log(e);
      }
    });
    }

  viewProfile(id) {
     var view = this;
     var User = Parse.Object.extend("User");
     var query = new Parse.Query(User);
     
     query.get(id, {
      success: function(user) {
          // The object was retrieved successfully.
          var lastName = user.get("lastName");
          var firstName = user.get("firstName");
          var style = user.get("style");
          var gender = user.get("gender");
          var currentLevel = user.get("currentLevel");
          var highestLevel = user.get("highestLevel");
          var availability = user.get("availability");
          var picture = user.get("picture").url();
          var clubs = user.get("clubs");
          var id = user.id;

          view.props.handleSubmit({
            lastName:lastName,
            firstName:firstName,
            style:style,
            gender:gender,
            currentLevel:currentLevel,
            highestLevel:highestLevel,
            availability:availability,
            picture: picture,
            isFriend: false,
            friendRequestSent:false,
            friendRequestReceived:false,
            clubs: clubs,
            id: id
          })
    view.props.navigation.navigate("ProfileView");
        }
      });
  }


render () {
  return (

    <View style={{flex:1, backgroundColor:'white', marginTop:0}}>

   <List
   containerStyle={{borderTopWidth:0, borderBottomWidth:0}}
   >
      <FlatList
        data={this.state.data}
        extraData={this.state}
        keyExtractor={data => data.objectId}
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
          avatarStyle={{width:60, height:60, borderRadius:30, borderWidth:1, borderColor:'white', overflow:'hidden', backgroundColor:'white'}}
          avatarContainerStyle={{width:60, height:60, marginTop:7}}
          avatarOverlayContainerStyle={{backgroundColor:'transparent'}}
          titleContainerStyle={{marginLeft:50}}
          containerStyle={{ borderBottomWidth:0, height:90, justifyContent:'center'}}
          avatar={ ( item.picture && { uri : item.picture.url } ) || require('../../assets/icons/General/Placeholder.imageset/3639e848-bc9c-11e6-937b-fa2a206349a2.png') } 
          title={<Text style={{fontSize:15}}>{item.firstName} {item.lastName[0]}</Text>}
          subtitleNumberOfLines={3}
          subtitleContainerStyle={{marginLeft:50, width:300}}
          subtitle={
             <View>
            <Text style={{fontSize:12, paddingTop:2}}>{item.commonDispo} disponibilité(s) en commun</Text>
            <Text style={{fontSize:12, paddingTop:2}}>{item.currentLevel} ({item.highestLevel})</Text>
            <Text style={{fontSize:12, paddingTop:2}}>{item.distance} km</Text>
            </View>
          }
          onPress={()=>{this.viewProfile(item.objectId)}}
          />
        )}
      />
    </List>
           
    </View>
           
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps) (CommunityContent);


