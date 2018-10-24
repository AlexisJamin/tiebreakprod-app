import React, { Component } from 'react';
import { View, Image, Text, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import { Font, Amplitude } from 'expo';
import { Entypo } from '@expo/vector-icons';
import { connect } from 'react-redux';
import { Parse } from 'parse/react-native';

function mapStateToProps(store) {
  return { viewProfile: store.viewProfile }
};

function mapDispatchToProps(dispatch) {
  return {
        handleSubmit: function(value) { 
        dispatch( {type: 'viewProfile', value: value} ) 
    },
    handleSubmitChat: function(value) {
      dispatch( {type: 'chat', value: value} ) 
    }
  }
};

class ProfileViewHeader extends React.Component {

	constructor(props) {
		super(props);
    this._onPressAddFriend = this._onPressAddFriend.bind(this);
    this.goToChat = this.goToChat.bind(this);
		this.state = {
      fontLoaded:false,
      friendRequestRefused:false,
      friendRequestSent:false,
      friendRequestReceived:false,
      isFriend:false
    };
	}

  componentWillReceiveProps(props) {
    this.setState({
      friendRequestSent:props.viewProfile.friendRequestSent,
      isFriend:props.viewProfile.isFriend,
      friendRequestReceived:props.viewProfile.friendRequestReceived
    })
  }

	async componentDidMount() {
    await Font.loadAsync({
      'SevenOneEightUltra': require('../../assets/fonts/SevenOneEight-Ultra.ttf'),
    });
    this.setState({ fontLoaded: true });

      var user = Parse.User.current() || Parse.User.currentAsync();
      var edit = this;
      var query = new Parse.Query("Relation");
      query.equalTo('fromUser', { "__type": "Pointer", "className": "_User", "objectId": user.id }); 
      query.equalTo('toUser', { "__type": "Pointer", "className": "_User", "objectId": this.props.viewProfile.id }); 
      query.find({
        success: function(relation) {
          var relationCopy = JSON.parse(JSON.stringify(relation));
            if (relationCopy[0].status == 1) {
            edit.setState({friendRequestSent:true, isFriend:false, friendRequestRefused:false, friendRequestReceived:false})
          } else if (relationCopy[0].status == 2) {
            edit.setState({friendRequestRefused:true, isFriend:false, friendRequestReceived:false, friendRequestSent:false})
          } else if (relationCopy[0].status == 3) {
            edit.setState({isFriend:true, friendRequestReceived:false, friendRequestSent:false, friendRequestRefused:false})
          } 
        },
        error: function(e) {
          console.log(e);
        }
      });

      var query2 = new Parse.Query("Relation");
      query2.equalTo('fromUser', { "__type": "Pointer", "className": "_User", "objectId": this.props.viewProfile.id }); 
      query2.equalTo('toUser', { "__type": "Pointer", "className": "_User", "objectId": user.id }); 
      query2.find({
        success: function(relation) {
          var relationCopy = JSON.parse(JSON.stringify(relation));
            if (relationCopy[0].status == 1) {
            edit.setState({friendRequestReceived:true, isFriend:false, friendRequestSent:false, friendRequestRefused:false})
          } else if (relationCopy[0].status == 2) {
            edit.setState({friendRequestRefused:true, isFriend:false, friendRequestReceived:false, friendRequestSent:false})
          } else if (relationCopy[0].status == 3) {
            edit.setState({isFriend:true, friendRequestReceived:false, friendRequestSent:false, friendRequestRefused:false})
          }
        },
        error: function(e) {
          console.log(e);
        }
      });
  }

  _onPressAddFriend () {
    var add = this;
    Amplitude.logEvent("Add Friend Button clicked");
    var user = Parse.User.current() || Parse.User.currentAsync();
    var otherUser = { "__type": "Pointer", "className": "_User", "objectId": this.props.viewProfile.id };
    var relation = new Parse.Object("Relation");
    relation.set("fromUser", Parse.User.current() || Parse.User.currentAsync());
    relation.set("toUser", otherUser);
    relation.set("createdAt", Date());
    relation.set("updatedAt", Date());
    relation.set("status", 1);
    relation.save(null, {
        success: function(relation) {

          Parse.Cloud.run("createNotification", { 
            "userId": add.props.viewProfile.id,
            "token": add.props.viewProfile.userToken,
            "firstName": user.get('firstName'),
            "channel":"friend-requests",
            "message": "Souhaite devenir votre ami(e)",
            "relationId": relation.id,
            "type": 0,
             })

          add.props.handleSubmit({
                lastName:add.props.viewProfile.lastName,
                firstName:add.props.viewProfile.firstName,
                style:add.props.viewProfile.style,
                gender:add.props.viewProfile.gender,
                currentLevel:add.props.viewProfile.currentLevel,
                highestLevel:add.props.viewProfile.highestLevel,
                availability:add.props.viewProfile.availability,
                picture: add.props.viewProfile.picture,
                clubs: add.props.viewProfile.clubs,
                id: add.props.viewProfile.id,
                birthday:add.props.viewProfile.birthday,
                userToken:add.props.viewProfile.userToken,
                friendRequestSent:true,
                friendRequestReceived:false,
                isFriend:false,
              })
              add.setState({friendRequestSent:true})
        },
        error: function(error) {
         console.log(error);
        }
      });
  }

  goToChat() {
    var user = Parse.User.current() || Parse.User.currentAsync();
    Amplitude.logEvent("GoToChat Button clicked");
    var go = this;
    var conversation = new Parse.Query("Conversation");
    conversation.containsAll('roomUsers', [user.id, this.props.viewProfile.id]); 
    conversation.first({
      success: function(conversation) {
        go.props.handleSubmitChat({
          id:conversation.id,
          firstName:go.props.viewProfile.firstName,
          userId:go.props.viewProfile.id,
          userToken:go.props.viewProfile.userToken
        })
        go.props.navigation.navigate("Messenger");
      }
    });
}
  
  render() {

    var header= null;
    if (this.state.isFriend && !this.props.viewProfile.fromChat) {
      header= (<TouchableOpacity hitSlop={{top:50, left:50, bottom:50, right:50}} onPress={this.goToChat}>
        <Entypo name="message" size={25} color='white' style={{bottom:4}} />
       </TouchableOpacity>);
    } else if (this.state.isFriend == false && this.state.friendRequestSent == false && this.state.friendRequestReceived == false && !this.state.friendRequestRefused) {
      header=(<TouchableOpacity hitSlop={{top:50, left:50, bottom:50, right:50}} onPress={this._onPressAddFriend}>
       <Entypo name="add-user" size={25} color='white' style={{bottom:4}} />
       </TouchableOpacity>);
    } else {
      header= null;
    }

    return (

       
       <ImageBackground style={{flex:1, width:null, height:null, resizeMode: 'cover'}} 
       source={require('../../assets/icons/AppSpecific/HeaderMin.imageset/header_bg.png')} >
       
       <View style={{
        flex:1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        top: 40
        }}>

     		<TouchableOpacity hitSlop={{top:50, left:50, bottom:50, right:50}} onPress={() => this.props.navigation.goBack()}>
        <Entypo name="chevron-left" size={25} color='white' style={{bottom:4}} />
        </TouchableOpacity>

       <Text style={{color: 'rgba(0,0,0,0)', backgroundColor:'rgba(0,0,0,0)'}}>H</Text> 

       {header}
       
       </View>
       
       </ImageBackground>
      
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps) (ProfileViewHeader);

const styles = StyleSheet.create({
  title: {
    color: 'white',
    backgroundColor: 'rgba(0,0,0,0)',
    fontFamily: 'SevenOneEightUltra',
    fontSize: 15,
    top: 3,
    textAlign:'center'
  }
});