import React from 'react';
import { StyleSheet, Text, View, Image, FlatList, TextInput, RefreshControl, ActivityIndicator } from 'react-native';
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

class ChatContent extends React.Component {

  constructor(props) {
    super(props);
    this.renderSeparator = this.renderSeparator.bind(this);
    this.renderFooter = this.renderFooter.bind(this);
    this.renderEmpty = this.renderEmpty.bind(this);
    this.onRefresh = this.onRefresh.bind(this);
    this.viewOnPress = this.viewOnPress.bind(this);
    this.state = {
      data: null,
      loading: true,
      refreshing: false,
    };
  }

async componentDidMount() {

    var user = Parse.User.current();
    var query = new Parse.Query("Conversation");
    var edit = this;
    query.equalTo('roomUsers', user.id); 
    query.descending("updatedAt");
    query.find({
      success: function(Conversation) {
        // don't understand why but can't access to the Objects contained in the Parse Array "Club". Works with JSON.parse(JSON.stringify()).
        if (Conversation.length != 0) {
          var ConversationCopy = [];
          for (var i = 0; i < Conversation.length; i++) {
            ConversationCopy.push(JSON.parse(JSON.stringify(Conversation[i])));
          }

          for (var i = 0; i < ConversationCopy.length; i++) {

            // enables to see lastMessage
            var query2 = new Parse.Query("Message");
            (function(query, conversation, i, edit) { 
              query.equalTo('objectId', ConversationCopy[i].lastMessage.objectId); 
              query.first({
                success: function(Message) {
                // don't understand why but can't access to the Objects contained in the Parse Array "Club". Works with JSON.parse(JSON.stringify()).
                    var MessageCopy = JSON.parse(JSON.stringify(Message));
                    var messageParam = {message : MessageCopy.message};
                    Object.assign(conversation[i], messageParam);
                    edit.setState({ data: conversation, loading:false });
                  }
              });
           })(query2, ConversationCopy, i, edit);
         
            var roomUsersCopy = ConversationCopy[i].roomUsers.concat();
            var roomUsersFiltered = roomUsersCopy.filter(userId => userId != user.id);

            // enables to see user
            var query3 = new Parse.Query(Parse.User);
            (function(query, conversation, i, edit) { 
              query.get(roomUsersFiltered[i],{
                success: function(users) {
                  var lastName = users.get("lastName");
                  var firstName = users.get("firstName");
                  var picture = users.get("picture").url();
                  var fromUserParam = {fromUserFirstName: firstName, fromUserLastName: lastName[0], fromUserPicture: picture};
                  Object.assign(conversation[i], fromUserParam);
                  edit.setState({ data: conversation, loading:false });
                }
              });
           })(query3, ConversationCopy, i, edit);
         }
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
    if (this.state.loading) return null;
    return (
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <Image source={require('../../assets/icons/AppSpecific/BigYellowBall.imageset/icTennisBallBig.png')} />
        <Text style={{marginTop:10}}> Aucune conversation.</Text>
        <Text style={{marginTop:10}}> Ajoutez des ami(e)s pour chatter ! </Text>
      </View>
    );
  }

    onRefresh() {
      this.setState({refreshing:true});
      var user = Parse.User.current();
    var query = new Parse.Query("Conversation");
    var edit = this;
    query.equalTo('roomUsers', user.id); 
    query.descending("updatedAt");
    query.find({
      success: function(Conversation) {
        // don't understand why but can't access to the Objects contained in the Parse Array "Club". Works with JSON.parse(JSON.stringify()).
        if (Conversation.length != 0) {
          var ConversationCopy = [];
          for (var i = 0; i < Conversation.length; i++) {
            ConversationCopy.push(JSON.parse(JSON.stringify(Conversation[i])));
          }

          for (var i = 0; i < ConversationCopy.length; i++) {

            // enables to see lastMessage
            var query2 = new Parse.Query("Message");
            (function(query, conversation, i, edit) { 
              query.equalTo('objectId', ConversationCopy[i].lastMessage.objectId); 
              query.first({
                success: function(Message) {
                // don't understand why but can't access to the Objects contained in the Parse Array "Club". Works with JSON.parse(JSON.stringify()).
                    var MessageCopy = JSON.parse(JSON.stringify(Message));
                    var messageParam = {message : MessageCopy.message};
                    Object.assign(conversation[i], messageParam);
                    edit.setState({ data: conversation, refreshing:false });
                  }
              });
           })(query2, ConversationCopy, i, edit);
         
            var roomUsersCopy = ConversationCopy[i].roomUsers.concat();
            var roomUsersFiltered = roomUsersCopy.filter(userId => userId != user.id);

            // enables to see user
            var query3 = new Parse.Query(Parse.User);
            (function(query, conversation, i, edit) { 
              query.get(roomUsersFiltered[i],{
                success: function(users) {
                  var lastName = users.get("lastName");
                  var firstName = users.get("firstName");
                  var picture = users.get("picture").url();
                  var fromUserParam = {fromUserFirstName: firstName, fromUserLastName: lastName[0], fromUserPicture: picture};
                  Object.assign(conversation[i], fromUserParam);
                  edit.setState({ data: conversation, refreshing:false });
                }
              });
           })(query3, ConversationCopy, i, edit);
         }
        } 
        else {edit.setState({refreshing:false})}
      },
      error: function(e) {
        console.log(e);
      }
    });
    }

  viewOnPress(id, firstName) {
    this.props.handleSubmit({
      firstName:firstName,
      id:id,
    })
    this.props.navigation.navigate("Messenger");
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
          avatarStyle={[styles.avatar, !item.seen && styles.background]}
          avatarContainerStyle={{width:50, height:50, top:-5}}
          avatarOverlayContainerStyle={{backgroundColor:'transparent'}}
          titleContainerStyle={{marginLeft:30}}
          containerStyle={[styles.container, !item.seen && styles.background]}
          avatar={{ uri : item.fromUserPicture } || require('../../assets/icons/General/Placeholder.imageset/3639e848-bc9c-11e6-937b-fa2a206349a2.png') } 
          title={<Text style={{fontSize:15, fontWeight:'bold'}}>{item.fromUserFirstName} {item.fromUserLastName}.</Text>}
          subtitleContainerStyle={{marginLeft:30, width:300}}
          subtitle={<Text style={{fontSize:13, paddingTop:6, fontWeight:'normal'}}>{item.message} </Text>}
          hideChevron={true}
          onPress={()=>{this.viewOnPress(item.objectId, item.fromUserFirstName)}}
          />
        )}
      />
    </List>
           
    </View>

    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps) (ChatContent);

const styles = StyleSheet.create({
  container: {
    borderBottomWidth:0, 
    height:80, 
    justifyContent:'center'
  },
    background: {
    backgroundColor:'#F5F5F5'
  },
  avatar: {
    width:50, 
    height:50, 
    borderRadius:25, 
    borderWidth:1, 
    borderColor:'white', 
    overflow:'hidden', 
    backgroundColor:'white'
  }
});

