import React, { Component } from 'react';
import { View, Image, Text, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { Font } from 'expo';
import { connect } from 'react-redux';
import { Parse } from 'parse/react-native';

Parse.initialize("3E8CAAOTf6oi3NaL6z8oVVJ7wvtfKa");
Parse.serverURL = 'https://tiebreak.herokuapp.com/parse';

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

      var user = Parse.User.current();
      var edit = this;
      var query = new Parse.Query("Relation");
      query.equalTo('fromUser', { "__type": "Pointer", "className": "_User", "objectId": user.id }); 
      query.equalTo('toUser', { "__type": "Pointer", "className": "_User", "objectId": this.props.viewProfile.id }); 
      query.find({
        success: function(relation) {
          console.log('fromUser Header');
          var relationCopy = JSON.parse(JSON.stringify(relation));
            if (relationCopy[0].status == 1) {
            console.log('friendRequestSent Header');
            edit.setState({friendRequestSent:true, isFriend:false, friendRequestRefused:false, friendRequestReceived:false})
          } else if (relationCopy[0].status == 2) {
            console.log('friendRequestRefused Header');
            edit.setState({friendRequestRefused:true, isFriend:false, friendRequestReceived:false, friendRequestSent:false})
          } else if (relationCopy[0].status == 3) {
            console.log('isFriend Header');
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
          console.log('toUser Header');
          var relationCopy = JSON.parse(JSON.stringify(relation));
            if (relationCopy[0].status == 1) {
            console.log('friendRequestReceived Header');
            edit.setState({friendRequestReceived:true, isFriend:false, friendRequestSent:false, friendRequestRefused:false})
          } else if (relationCopy[0].status == 2) {
            console.log('friendRequestRefused Header');
            edit.setState({friendRequestRefused:true, isFriend:false, friendRequestReceived:false, friendRequestSent:false})
          } else if (relationCopy[0].status == 3) {
            console.log('isFriend Header');
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
    var user = Parse.User.current();
    var otherUser = { "__type": "Pointer", "className": "_User", "objectId": this.props.viewProfile.id };
    var relation = new Parse.Object("Relation");
    relation.set("fromUser", Parse.User.current());
    relation.set("toUser", otherUser);
    relation.set("createdAt", Date());
    relation.set("updatedAt", Date());
    relation.set("status", 1);
    relation.save(null, {
        success: function(relation) {
          Parse.Cloud.run("createNotification", { 
            "userId": add.props.viewProfile.id,
            "message": "Souhaite devenir votre ami(e)",
            "relationId":relation.id,
            "type":0,
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
    var user = Parse.User.current();
    var go = this;
    var conversation = new Parse.Query("Conversation");
    conversation.equalTo('roomUsers', user.id); 
    conversation.equalTo('roomUsers', this.props.viewProfile.id); 
    conversation.first({
      success: function(conversation) {
        console.log(conversation);
        go.props.handleSubmitChat({
          id:conversation.id,
          firstName:go.props.viewProfile.firstName,
          userId:go.props.viewProfile.id,
        })
        go.props.navigation.navigate("Messenger");
      }
    });
}
  
  render() {

    var header= null;
    if (this.state.isFriend && !this.props.viewProfile.fromChat) {
      header= (<TouchableWithoutFeedback hitSlop={{top: 50, left: 50, bottom: 50, right: 50}} onPress={this.goToChat}>
       <Image source={require('../../assets/icons/General/Chat.imageset/icChat.png')} />
       </TouchableWithoutFeedback>);
    } else if (this.state.isFriend == false && this.state.friendRequestSent == false && this.state.friendRequestReceived == false && !this.state.friendRequestRefused) {
      header=(<TouchableWithoutFeedback onPress={this._onPressAddFriend} hitSlop={{top: 50, left: 50, bottom: 50, right: 50}}>
       <Image source={require('../../assets/icons/General/AddFriend.imageset/icAddFriend.png')} />
       </TouchableWithoutFeedback>);
    } else {
      header= null;
    }

    return (

       
       <Image style={{flex:1, width:null, height:null, resizeMode: 'cover'}} source={require('../../assets/icons/AppSpecific/Header.imageset/header_bg.png')} >
       
       <View style={{
        flex:1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        top: 40
        }}>

     		<TouchableWithoutFeedback hitSlop={{top: 50, left: 50, bottom: 50, right: 50}} onPress={() => this.props.navigation.goBack()}>
        <Image source={require('../../assets/icons/General/BackWhite.imageset/ic_back_white.png')} />
        </TouchableWithoutFeedback>

       <Text style={{color: 'rgba(0,0,0,0)', backgroundColor:'rgba(0,0,0,0)'}}>H</Text> 

       {header}
       
       </View>
       
       </Image>
      
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