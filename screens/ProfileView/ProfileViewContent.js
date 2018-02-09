import React, { Component } from 'react';
import { View, Image, Text, StyleSheet, ScrollView , TouchableWithoutFeedback, Alert} from 'react-native';
import { Font } from 'expo';
import Svg,{
    Line,
} from 'react-native-svg';
import { connect } from 'react-redux';
import { Parse } from 'parse/react-native';

Parse.initialize("3E8CAAOTf6oi3NaL6z8oVVJ7wvtfKa");
Parse.serverURL = 'https://tiebreak.herokuapp.com/parse';

import moment from 'moment';
import 'moment/locale/fr';

import ProfileViewContentClubs from './ProfileViewContentClubs';
import ProfileViewContentClubsBullets from './ProfileViewContentClubsBullets';
import ProfileViewContentDispo from './ProfileViewContentDispo';



function mapStateToProps(store) {
  return { user: store.user, userClub: store.userClub, viewProfile: store.viewProfile }
}

function mapDispatchToProps(dispatch) {
  return {
        handleSubmit: function(value) { 
        dispatch( {type: 'viewProfile', value: value} ) 
    }
  }
};


class ProfileViewContent extends React.Component {

constructor(props) {
    super(props);
    this._onPressAddFriend = this._onPressAddFriend.bind(this);
    this._onPressAnswerAdd = this._onPressAnswerAdd.bind(this);
    this._onPressAnswerRefuse = this._onPressAnswerRefuse.bind(this);
    this._onPressAnswer = this._onPressAnswer.bind(this);
    this._onPressDeleteFriend = this._onPressDeleteFriend.bind(this);
    this.ConfirmDeleteFriend = this.ConfirmDeleteFriend.bind(this);
    this.state = {
      fontAvenirNextLoaded: false,
      fontAvenirLoaded: false,
      friendRequestSent: false,
      friendRequestReceived: false,
      friendRequestRefused: false,
      isFriend: false,
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
      'AvenirNext': require('../../assets/fonts/AvenirNext.ttf'),
      'Avenir': require('../../assets/fonts/Avenir.ttf'),
    });
    this.setState({ 
      fontAvenirNextLoaded: true,
      fontAvenirLoaded: true
    });
    
      var user = Parse.User.current() || Parse.User.currentAsync();
      var edit = this;
      var query = new Parse.Query("Relation");
      query.equalTo('fromUser', { "__type": "Pointer", "className": "_User", "objectId": user.id }); 
      query.equalTo('toUser', { "__type": "Pointer", "className": "_User", "objectId": this.props.viewProfile.id }); 
      query.find({
        success: function(relation) {
          console.log('fromUser');
          var relationCopy = JSON.parse(JSON.stringify(relation));
            if (relationCopy[0].status == 1) {
            console.log('friendRequestSent');
            edit.setState({friendRequestSent:true, isFriend:false, friendRequestRefused:false, friendRequestReceived:false})
          } else if (relationCopy[0].status == 2) {
            console.log('friendRequestRefused');
            edit.setState({friendRequestRefused:true, isFriend:false, friendRequestReceived:false, friendRequestSent:false})
          } else if (relationCopy[0].status == 3) {
            console.log('isFriend');
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
          console.log('toUser');
          var relationCopy = JSON.parse(JSON.stringify(relation));
           if (relationCopy[0].status == 1) {
            console.log('friendRequestReceived');
            edit.setState({friendRequestReceived:true, isFriend:false, friendRequestSent:false, friendRequestRefused:false})
          } else if (relationCopy[0].status == 2) {
            console.log('friendRequestRefused');
            edit.setState({friendRequestRefused:true, isFriend:false, friendRequestReceived:false, friendRequestSent:false})
          } else if (relationCopy[0].status == 3) {
            console.log('isFriend');
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
                birthday:add.props.viewProfile.birthday,
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

  _onPressAnswer() {
    Alert.alert(
    'Ajouter comme ami(e)',
    '',
    [
      {text: 'Refuser', onPress: () => this._onPressAnswerRefuse(), style:'destructive'},
      {text: 'Ajouter', onPress: () => this._onPressAnswerAdd()},
    ],
    { cancelable: false }
  )
  }

  _onPressAnswerAdd() {

    var user = Parse.User.current() || Parse.User.currentAsync();
    var add = this;
    var relation = new Parse.Query("Relation");
    relation.equalTo('toUser', { "__type": "Pointer", "className": "_User", "objectId": user.id }); 
    relation.equalTo('fromUser', { "__type": "Pointer", "className": "_User", "objectId": this.props.viewProfile.id }); 
    relation.first({
      success: function(relation) {
        relation.set("updatedAt", Date());
        relation.set("status", 3);
        relation.save();

        Parse.Cloud.run("createNotification", { 
            "userId": add.props.viewProfile.id,
            "message": "A accepté votre demande d’amitié",
            "relationId": relation.id,
            "type": 1,
             })

        var conversation = new Parse.Object("Conversation");
        conversation.set("roomUsers", [user.id, add.props.viewProfile.id]);
        conversation.set("createdAt", Date());
        conversation.set("updatedAt", Date());
        conversation.set("firstUser", Parse.User.current() || Parse.User.currentAsync());
        conversation.set("secondUser", { "__type": "Pointer", "className": "_User", "objectId": add.props.viewProfile.id });
        conversation.save(null, {
        success: function(conversation) {
          console.log('conversation créée');
          var message = new Parse.Object("Message");
          message.set("createdAt", Date());
          message.set("updatedAt", Date());
          message.set("message", '🎾');
          message.set("sender", Parse.User.current() || Parse.User.currentAsync());
          message.set("conversation", conversation.id);
          message.save(null, {
          success: function(message) {
            console.log('message créé');
            console.log(message.get('createdAt'));
            conversation.set("lastMessage", { "__type": "Pointer", "className": "Message", "objectId": message.id });
            conversation.set("lastMessageDate", message.get('createdAt'));
            conversation.save();
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
              friendRequestSent:false,
              friendRequestReceived:false,
              isFriend:true,
            })
            add.setState({friendRequestSent: false, friendRequestReceived:false, isFriend:true})
            }
          });
          }
        });
      },
      error: function(error) {
        console.log(error.message);
      }
    });
  }

  _onPressAnswerRefuse() {

    var user = Parse.User.current() || Parse.User.currentAsync();
    var add = this;
    var relation = new Parse.Query("Relation");
    relation.equalTo('toUser', { "__type": "Pointer", "className": "_User", "objectId": user.id }); 
    relation.equalTo('fromUser', { "__type": "Pointer", "className": "_User", "objectId": this.props.viewProfile.id }); 
    relation.first({
      success: function(relation) {
        relation.set("updatedAt", Date());
        relation.set("status", 2);
        relation.save();

        Parse.Cloud.run("createNotification", { 
            "userId":add.props.viewProfile.id,
            "message":"A refusé votre demande d’amitié",
            "relationId":relation.id,
            "type":2,
             })

        add.setState({friendRequestSent: false, friendRequestReceived:false, isFriend:false, friendRequestRefused:true})
      },
      error: function(error) {
        console.log(error.message);
      }
    });
  }

  _onPressDeleteFriend() {
    Alert.alert(
      "Supprimer le lien d'amitié avec"+this.props.viewProfile.firstName +'?',
      '',
      [
        {text: 'Oui', onPress: () => this.ConfirmDeleteFriend()},
        {text: 'Non'},
      ],
      { cancelable: false }
    )
  }

  ConfirmDeleteFriend() {
    var user = Parse.User.current() || Parse.User.currentAsync();
    var add = this;
    var relation1 = new Parse.Query("Relation");
    relation1.equalTo('toUser', { "__type": "Pointer", "className": "_User", "objectId": user.id }); 
    relation1.equalTo('fromUser', { "__type": "Pointer", "className": "_User", "objectId": this.props.viewProfile.id }); 
    relation1.first({
      success: function(relation) {
          console.log('relation 1');
          var conversation = new Parse.Query("Conversation");
          conversation.equalTo('roomUsers', user.id); 
          conversation.equalTo('roomUsers', add.props.viewProfile.id); 
          conversation.first({
            success: function(conversation) {
              console.log('relation 1 conversation');
              conversation.destroy();
              relation.destroy();
              console.log('relation 1 destroy');
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
                friendRequestSent:false,
                friendRequestReceived:false,
                isFriend:false,
              })
              add.setState({isFriend:false})
            }
          });
       }
    });

    var relation2 = new Parse.Query("Relation");
    relation2.equalTo('fromUser', { "__type": "Pointer", "className": "_User", "objectId": user.id }); 
    relation2.equalTo('toUser', { "__type": "Pointer", "className": "_User", "objectId": this.props.viewProfile.id }); 
    relation2.first({
      success: function(relation) {
        console.log('relation 2');
          var conversation = new Parse.Query("Conversation");
          conversation.equalTo('roomUsers', user.id); 
          conversation.equalTo('roomUsers', add.props.viewProfile.id); 
          conversation.first({
            success: function(conversation) {
              console.log('relation 2 conversation');
              conversation.destroy();
              relation.destroy();
              console.log('relation 2 destroy');

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
                friendRequestSent:false,
                friendRequestReceived:false,
                isFriend:false,
              })
              add.setState({isFriend:false})
            }
          });
        }
    });
  }

  render() {

    moment.locale('fr');
    if (this.props.viewProfile.birthday != undefined) {
      var age = moment().diff(this.props.viewProfile.birthday, 'years')+' ans';
    } else {
      var age = 'inc.';
    }

    if (this.props.viewProfile.currentLevel == undefined) {
    var currentLevel = "inc.";
  } else if (this.props.viewProfile.currentLevel == 0) {
    var currentLevel = 'Débutant';
  } else if (this.props.viewProfile.currentLevel == 1) {
    var currentLevel = 'Intermédiaire';
  } else if (this.props.viewProfile.currentLevel == 2) {
    var currentLevel = 'Avancé';
  } else if (this.props.viewProfile.currentLevel == 3) {
    var currentLevel = '40';
  } else if (this.props.viewProfile.currentLevel == 4) {
    var currentLevel = '30/5';
  } else if (this.props.viewProfile.currentLevel == 5) {
    var currentLevel = '30/4';
  } else if (this.props.viewProfile.currentLevel == 6) {
    var currentLevel = '30/3';
  } else if (this.props.viewProfile.currentLevel == 7) {
    var currentLevel = '30/2';
  } else if (this.props.viewProfile.currentLevel == 8) {
    var currentLevel = '30/1';
  } else if (this.props.viewProfile.currentLevel == 9) {
    var currentLevel = '30';
  } else if (this.props.viewProfile.currentLevel == 10) {
    var currentLevel = '15/5';
  } else if (this.props.viewProfile.currentLevel == 11) {
    var currentLevel = '15/4';
  } else if (this.props.viewProfile.currentLevel == 12) {
    var currentLevel = '15/3';
  } else if (this.props.viewProfile.currentLevel == 13) {
    var currentLevel = '15/2';
  } else if (this.props.viewProfile.currentLevel == 14) {
    var currentLevel = '15/1';
  } else if (this.props.viewProfile.currentLevel == 15) {
    var currentLevel = '15';
  } else if (this.props.viewProfile.currentLevel == 16) {
    var currentLevel = '5/6';
  } else if (this.props.viewProfile.currentLevel == 17) {
    var currentLevel = '4/6';
  } else if (this.props.viewProfile.currentLevel == 18) {
    var currentLevel = '3/6';
  } else if (this.props.viewProfile.currentLevel == 19) {
    var currentLevel = '2/6';
  } else if (this.props.viewProfile.currentLevel == 20) {
    var currentLevel = '1/6';
  } else if (this.props.viewProfile.currentLevel == 21) {
    var currentLevel = '0';
  } else if (this.props.viewProfile.currentLevel == 22) {
    var currentLevel = '-2/6';
  } else if (this.props.viewProfile.currentLevel == 23) {
    var currentLevel = '-4/6';
  } else if (this.props.viewProfile.currentLevel == 24) {
    var currentLevel = '-15';
  }

  if (this.props.viewProfile.highestLevel == undefined) {
    var highestLevel = "inc.";
  } else if (this.props.viewProfile.highestLevel == 0) {
    var highestLevel = 'Débutant';
  } else if (this.props.viewProfile.highestLevel == 1) {
    var highestLevel = 'Intermédiaire';
  } else if (this.props.viewProfile.highestLevel == 2) {
    var highestLevel = 'Avancé';
  } else if (this.props.viewProfile.highestLevel == 3) {
    var highestLevel = '40';
  } else if (this.props.viewProfile.highestLevel == 4) {
    var highestLevel = '30/5';
  } else if (this.props.viewProfile.highestLevel == 5) {
    var highestLevel = '30/4';
  } else if (this.props.viewProfile.highestLevel == 6) {
    var highestLevel = '30/3';
  } else if (this.props.viewProfile.highestLevel == 7) {
    var highestLevel = '30/2';
  } else if (this.props.viewProfile.highestLevel == 8) {
    var highestLevel = '30/1';
  } else if (this.props.viewProfile.highestLevel == 9) {
    var highestLevel = '30';
  } else if (this.props.viewProfile.highestLevel == 10) {
    var highestLevel = '15/5';
  } else if (this.props.viewProfile.highestLevel == 11) {
    var highestLevel = '15/4';
  } else if (this.props.viewProfile.highestLevel == 12) {
    var highestLevel = '15/3';
  } else if (this.props.viewProfile.highestLevel == 13) {
    var highestLevel = '15/2';
  } else if (this.props.viewProfile.highestLevel == 14) {
    var highestLevel = '15/1';
  } else if (this.props.viewProfile.highestLevel == 15) {
    var highestLevel = '15';
  } else if (this.props.viewProfile.highestLevel == 16) {
    var highestLevel = '5/6';
  } else if (this.props.viewProfile.highestLevel == 17) {
    var highestLevel = '4/6';
  } else if (this.props.viewProfile.highestLevel == 18) {
    var highestLevel = '3/6';
  } else if (this.props.viewProfile.highestLevel == 19) {
    var highestLevel = '2/6';
  } else if (this.props.viewProfile.highestLevel == 20) {
    var highestLevel = '1/6';
  } else if (this.props.viewProfile.highestLevel == 21) {
    var highestLevel = '0';
  } else if (this.props.viewProfile.highestLevel == 22) {
    var highestLevel = '-2/6';
  } else if (this.props.viewProfile.highestLevel == 23) {
    var highestLevel = '-4/6';
  } else if (this.props.viewProfile.highestLevel == 24) {
    var highestLevel = '-15';
  }

  if (this.props.viewProfile.gender == undefined) {
    var gender = "inc.";
  } else if (this.props.viewProfile.gender == 'male') {
    var gender = 'Homme';
  } else if (this.props.viewProfile.gender == 'female') {
    var gender = 'Femme';
  }

  if (this.props.viewProfile.style == undefined) {
    var style = "inc.";
  } else if (this.props.viewProfile.style == 'right') {
    var style = 'Droitier';
  } else if (this.props.viewProfile.style == 'left') {
    var style = 'Gaucher';
  }

    var commonAvailabitities = [...this.props.viewProfile.availability];
    var commonAvailabititiesFiltered = [];
    
    for (var i = 0; i < commonAvailabitities.length; i++) {
      if (commonAvailabitities[i].hours != undefined) {   
      var array = commonAvailabitities[i].hours.filter((n) => this.props.user.availability[i].hours.includes(n));
      commonAvailabititiesFiltered.push({day:commonAvailabitities[i].day, hours:array});
      }
    }

    var clubList = [];
    var clubListBullets = [];
    if (this.props.viewProfile.clubs != undefined) {
      for (var i = 0; i < this.props.viewProfile.clubs.length; i++) {
        clubList.push(<ProfileViewContentClubs clubId = {this.props.viewProfile.clubs[i].id} />)
        clubListBullets.push(<ProfileViewContentClubsBullets/>)
      }
    }

    var dayList = [];
    for (var i = 0; i < commonAvailabititiesFiltered.length; i++) {
      if (commonAvailabititiesFiltered[i].hours.length > 0) {
      dayList.push(<ProfileViewContentDispo days = {commonAvailabititiesFiltered[i].day.slice(0,3)} hours = {commonAvailabititiesFiltered[i].hours}/>)
      }
    }
  
  if (this.props.viewProfile.picture!=undefined)
           {
           profileImage = <Image style={{width: 90, height: 90, borderRadius: 45}} source={{uri: this.props.viewProfile.picture}}/>
           } else {
             profileImage = <Image style={{width: 90, height: 90, borderRadius: 45}} source={require('../../assets/icons/General/Placeholder.imageset/3639e848-bc9c-11e6-937b-fa2a206349a2.png')}/>
             }

  var deleteAddFriend= null;
    if (this.state.isFriend) {
      deleteAddFriend=(<TouchableWithoutFeedback hitSlop={{top:300, left:300, bottom:300, right:300}} onPress={this._onPressDeleteFriend} style={{padding:30}}>
       <Text style={{textDecorationLine:'underline'}}> Supprimer le lien d'amitié </Text>
       </TouchableWithoutFeedback>);
    } else if (this.state.isFriend == false && this.state.friendRequestSent == false && this.state.friendRequestReceived == false && !this.state.friendRequestRefused) {
      deleteAddFriend=(<TouchableWithoutFeedback hitSlop={{top:300, left:300, bottom:300, right:300}} onPress={this._onPressAddFriend} style={{padding:30}}>
       <Text style={{textDecorationLine:'underline'}}> Ajouter comme ami(e) </Text>
       </TouchableWithoutFeedback>);
    } else if (this.state.isFriend == false && this.state.friendRequestSent) {
      deleteAddFriend=(<TouchableWithoutFeedback style={{padding:30}}>
       <Text style={{textDecorationLine:'underline'}}> En attente de réponse </Text>
       </TouchableWithoutFeedback>);
    } else if (this.state.friendRequestRefused) {
      deleteAddFriend=null;
    }

  var friendRequest = null;
    if (this.state.friendRequestReceived) {
      friendRequest=(<TouchableWithoutFeedback onPress={this._onPressAnswer}>
         <Text style={styles.buttonValidate}>Répondre à la demande d'amitié</Text>
         </TouchableWithoutFeedback>);
      deleteAddFriend = null;
    }

    return (

      <View style={{flex:1, backgroundColor:'white'}}>

        <ScrollView>

        <View>

          <View style={{
            alignItems:'center',
            marginBottom:5
          }}>
          
                  {profileImage}

              </View>

          <View style={{flex:1, justifyContent: 'center', flexDirection: 'row'}}>
            
            <View style={{flexDirection:'column', alignItems:'center'}}>
            {
             this.state.fontAvenirNextLoaded ? (<Text style={styles.name}> {this.props.viewProfile.firstName} {this.props.viewProfile.lastName[0]}. </Text> 
             ) : null 
            }
            {
             this.state.fontAvenirLoaded ? (<Text style={styles.age}> ({age}) </Text> 
             ) : null 
            }
            </View>
          
          </View>

          <View style={{flex:1, top: 20, alignItems: 'center'}}>
            <Svg
              height="40"
              width="150"
            >
              <Line
                x1="0"
                y1="0"
                x2="150"
                y2="0"
                stroke="rgb(210,210,210)"
                strokeWidth="2"
               />
            </Svg>
          </View>

          <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-around'}}>
            

            <View style={{alignItems: 'center'}}>
              <Image source={require('../../assets/icons/Profile/Level.imageset/icRank.png')} />
              {
              this.state.fontAvenirLoaded ? (<Text style={styles.level}>{currentLevel} ({highestLevel})</Text>) : null 
              } 
            </View>

            <View style={{alignItems: 'center'}}>
              <Image source={require('../../assets/icons/Profile/Style.imageset/shape.png')} />
              {
              this.state.fontAvenirLoaded ? (<Text style={styles.gender}>{style}</Text>) : null 
              } 
            </View>

            <View style={{alignItems: 'center'}}>
              <Image source={require('../../assets/icons/Profile/Gender.imageset/group5.png')} />
              {
              this.state.fontAvenirLoaded ? (<Text style={styles.gender}>{gender}</Text>) : null 
              }  
            </View>

            </View>
    
            <View style={{flex:1, top: 20, alignItems: 'center'}}>
            <Svg
              height="40"
              width="300"
            >
              <Line
                x1="0"
                y1="0"
                x2="300"
                y2="0"
                stroke="rgb(210,210,210)"
                strokeWidth="2"
               />
            </Svg>
          </View>

          <View style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'center'
        }}>

               {
              this.state.fontAvenirLoaded ? (<Text style={styles.name}>CLUBS PRÉFÉRÉS</Text>) : null 
              }   

          </View>

          <View style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'center',
          top: 20
          }}>


          <View style={{
          flexDirection: 'column',
          justifyContent: 'space-around'
          }}>
          {clubListBullets}
          </View>

          <View style={{
          flexDirection: 'column',
          justifyContent: 'space-around'
          }}>
          {clubList}
          </View>

          </View>

         <View style={{flex:1, top:20, alignItems:'center'}}>
            <Svg
              height="40"
              width="300"
            >
              <Line
                x1="0"
                y1="0"
                x2="300"
                y2="0"
                stroke="rgb(210,210,210)"
                strokeWidth="2"
               />
            </Svg>
          </View>

          <View style={{
          flex:1,
          flexDirection:'row',
          justifyContent:'center'
        }}>

               {
              this.state.fontAvenirLoaded ? (<Text style={styles.name}>DISPONIBILITÉS COMMUNES</Text>) : null 
              }   

          </View>


          <View style={{
          flex:1,
          flexDirection:'column',
          justifyContent:'space-around',
          top:10
          }}>
                    {dayList}


         </View>

         <View style={{
          flex:1,
          flexDirection:'row',
          justifyContent:'center',
          marginTop:20,
          marginBottom:20
        }}>
         {deleteAddFriend}
         </View>

         </View>

         </ScrollView>

         {friendRequest}

         </View>

    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps) (ProfileViewContent);

const styles = StyleSheet.create({
  name: {
    color:'black',
    backgroundColor:'rgba(0,0,0,0)',
    fontFamily: 'AvenirNext',
    fontSize: 15,
    marginTop: 2,
    alignItem:'center', 
    justifyContent: 'center'
  },
  age: {
    color:'black',
    backgroundColor:'rgba(0,0,0,0)',
    fontFamily:'Avenir',
    fontSize: 13,
    marginTop: 2,
    alignItem:'center', 
    justifyContent: 'center'
  },
  gender: {
    color:'black',
    backgroundColor:'rgba(0,0,0,0)',
    fontFamily:'Avenir',
    fontSize: 12,
    paddingTop: 4,
    alignItem:'center', 
    justifyContent:'center'
  },
  level: {
    color:'black',
    backgroundColor:'rgba(0,0,0,0)',
    fontFamily:'Avenir',
    fontSize: 12,
    paddingTop: 9,
    alignItem:'center', 
    justifyContent: 'center'
  },
  clubs: {
    color: 'black',
    backgroundColor: 'rgba(0,0,0,0)',
    fontFamily: 'Avenir',
    fontSize: 14,
    left:5,
    marginBottom: 12,
    alignItem:'center', 
    justifyContent: 'center'
  },
  button: {
    width:50,
    height: 30, 
    borderWidth:1, 
    borderColor:'rgb(42,129,82)', 
    borderRadius:'3', 
    overflow:'hidden', 
    paddingTop:5, 
    paddingBottom: 5, 
    marginBottom:5,
    marginRight: 10, 
    color: 'white', 
    backgroundColor: 'rgb(42,129,82)', 
    textAlign:'center'
  },
  buttonValidate: {
    backgroundColor:'rgb(200,90,24)',
    color:'white',
    fontSize:18,
    lineHeight:30,
    textAlign:'center',
    paddingTop:15,
    paddingBottom:15 
  }
});

