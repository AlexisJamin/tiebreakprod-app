import React from 'react';
import { StyleSheet, Text, View, Image, ScrollView, FlatList, TextInput } from 'react-native';
import { List, ListItem } from 'react-native-elements';
import { connect } from 'react-redux';
import { Parse } from 'parse/react-native';

Parse.initialize("3E8CAAOTf6oi3NaL6z8oVVJ7wvtfKa");
Parse.serverURL = 'https://tiebreak.herokuapp.com/parse';


class CommunityFriends extends React.Component {

  constructor(props) {
    super(props);
    this.renderSeparator = this.renderSeparator.bind(this);
    this.renderFooter = this.renderFooter.bind(this);
    this.state = {
      data: ''
    };
  }

  async componentDidMount() {

    var friends = [];
    var edit = this;
    var user = Parse.User.current();
    console.log(user.id);
    var query = new Parse.Query('Relation');
    query.equalTo('status', 3);
    query.equalTo('fromUser', { "__type": "Pointer", "className": "_User", "objectId": user.id });  
    // Final list of objects
    query.find({
      success: function(Friends) {
        console.log('query 1');
        if (Friends.length != 0) {
          var friendsQuery1 = JSON.parse(JSON.stringify(Friends));
          
          for (var i = 0; i < friendsQuery1.length; i++) {
            var User = Parse.Object.extend("User");
            var query = new Parse.Query(User);
            query.get(friendsQuery1[i].toUser.objectId,{
                success: function(users) {
                  console.log('query user 1');
                  var lastName = users.get("lastName");
                  var firstName = users.get("firstName");
                  var style = users.get("style");
                  var gender = users.get("gender");
                  var currentLevel = users.get("currentLevel");
                  var highestLevel = users.get("highestLevel");
                  var availability = users.get("availability");
                  var clubs = users.get("clubs");
                  var picture = users.get("picture").url();
                  console.log('coucou');
                  console.log(friends);
                  console.log(users.id);
                  friends.push({
                    lastName:lastName,
                    firstName:firstName,
                    style:style,
                    gender:gender,
                    currentLevel:currentLevel,
                    highestLevel:highestLevel,
                    availability:availability,
                    objectId:users.id,
                    picture:picture,
                    clubs:clubs
                  });
                  console.log(friends);
                  edit.setState({data: friends})
              }
            });
         }
        }
      },
      error: function(e) {
        console.log(e);
      }
    })

    var query = new Parse.Query('Relation');
    query.equalTo('status', 3);
    query.equalTo('toUser', { "__type": "Pointer", "className": "_User", "objectId": user.id });  
    // Final list of objects
    query.find({
      success: function(Friends) {
        console.log('query 2');
        if (Friends.length != 0) {
          var friendsQuery2 = JSON.parse(JSON.stringify(Friends));
          
          for (var i = 0; i < friendsQuery1.length; i++) {
            var User = Parse.Object.extend("User");
            var query = new Parse.Query(User);
            query.get(friendsQuery2[i].toUser.objectId,{
                success: function(users) {
                  console.log('query user 2');
                  var lastName = users.get("lastName");
                  var firstName = users.get("firstName");
                  var style = users.get("style");
                  var gender = users.get("gender");
                  var currentLevel = users.get("currentLevel");
                  var highestLevel = users.get("highestLevel");
                  var availability = users.get("availability");
                  var clubs = users.get("clubs");
                  var picture = users.get("picture").url();
                  console.log('coucou');
                  console.log(friends);
                  console.log(users.id);
                  friends.push({
                    lastName:lastName,
                    firstName:firstName,
                    style:style,
                    gender:gender,
                    currentLevel:currentLevel,
                    highestLevel:highestLevel,
                    availability:availability,
                    objectId:users.id,
                    picture:picture,
                    clubs:clubs
                  });
                  console.log(friends);
                  edit.setState({data: friends})
              }
            });
         }
       }
       console.log(friends);
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
  };



render () {
  return (

    <View style={{flex:1, backgroundColor:'white', marginTop:0}}>

   <List
   containerStyle={{borderTopWidth:0, borderBottomWidth:0}}
   >
      <FlatList
        data={this.state.data}
        keyExtractor={item => item.objectId}
        ItemSeparatorComponent={this.renderSeparator}
        ListFooterComponent={this.renderFooter}
        renderItem={({ item }) => (
          <ListItem
          avatarStyle={{width:60, height:60, borderRadius:30, borderWidth:1, borderColor:'white', overflow:'hidden', backgroundColor:'white'}}
          avatarContainerStyle={{width:60, height:60, marginTop:7}}
          avatarOverlayContainerStyle={{backgroundColor:'transparent'}}
          titleContainerStyle={{marginLeft:50}}
          containerStyle={{ borderBottomWidth:0, height:90, justifyContent:'center'}}
          avatar={{ uri : item.picture }  || require('../../assets/icons/General/Placeholder.imageset/3639e848-bc9c-11e6-937b-fa2a206349a2.png') }
          title={<Text style={{fontSize:15}}>{item.firstName} {item.lastName[0]}.</Text>}
          subtitleNumberOfLines={3}
          subtitleContainerStyle={{marginLeft:50, width:300}}
          subtitle={
             <View>
            <Text style={{fontSize:12, paddingTop:2}}>XXX disponibilités en commun</Text>
            <Text style={{fontSize:12, paddingTop:2}}>{item.currentLevel} ({item.highestLevel})</Text>
            <Text style={{fontSize:12, paddingTop:2}}>XX km</Text>
            </View>
          }
          />
        )}
      />
    </List>
           
    </View>
           
    );
  }
}

export default connect(null, null) (CommunityFriends);


