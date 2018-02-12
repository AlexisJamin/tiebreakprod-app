import React, { Component } from 'react';
import { View, Image, Text, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { Font } from 'expo';
import { connect } from 'react-redux';
import { Parse } from 'parse/react-native';
import IconBadge from 'react-native-icon-badge';

Parse.initialize("3E8CAAOTf6oi3NaL6z8oVVJ7wvtfKa");
Parse.serverURL = 'https://tiebreak.herokuapp.com/parse';

function mapStateToProps(store) {
  return { user: store.user, userClub: store.userClub, userPreferences: store.userPreferences, button: store.button, updateNotification: store.updateNotification }
};

function mapDispatchToProps(dispatch) {
  return {
        handleSubmit: function(value) { 
        dispatch( {type: 'button', value: value} ) 
    }
  }
};

class HomeHeader extends Component {

	constructor() {
		super();
		this.state = {
      fontLoaded:false,
      badgeCount:0
    };
	}

  componentWillReceiveProps(props) {
    this.setState({badgeCount:props.updateNotification.notification})
  }

  componentWillMount() {
    var edit = this;
    var currentUser = Parse.User.current() || Parse.User.currentAsync();
    var query = new Parse.Query("Notification");
    query.equalTo('toUser', currentUser);
    query.equalTo('seen', false);
    query.find({
      success: function(notification) {
        console.log(notification.length);
        edit.setState({badgeCount:notification.length})
      }
    });
  }

	async componentDidMount() {
    await Font.loadAsync({
      'SevenOneEightUltra': require('../../assets/fonts/SevenOneEight-Ultra.ttf'),
    });
    this.setState({ fontLoaded:true });
  }

  navigationRoute(route, index) {
  this.props.handleSubmit({
    ChatButtonIndex:index,
    CommunityButtonIndex:this.props.button.CommunityButtonIndex,
    CalendarButtonIndex:this.props.button.CalendarButtonIndex,
    ProfileButtonIndex:this.props.button.ProfileButtonIndex
  })
  this.props.navigation.navigate(route);
};
  
  render() {

    return (

       
       <Image style={{flex:1, width:null, height:null, resizeMode: 'cover'}} source={require('../../assets/icons/AppSpecific/Header.imageset/header_bg.png')} >
       
       <View style={{
        flex:1,
        flexDirection:'row',
        justifyContent:'space-around',
        top:40
        }}>

          <IconBadge
            MainElement={
              <TouchableWithoutFeedback hitSlop={{top:300, left:300, bottom:300, right:300}} onPress={() => this.props.navigation.navigate('Menu')}>
              <Image source={require('../../assets/icons/Menu/Profile.imageset/icProfile.png')} /> 
              </TouchableWithoutFeedback>
            }
            BadgeElement={
              <Text style={{color:'#FFFFFF', fontSize:10}}/>
            }
            IconBadgeStyle={
              {width:15,
              height:15,
              borderRadius:15,
              minWidth:15,
              top:-9,
              right:-9,
              backgroundColor:'rgb(200,90,24)',
              borderWidth:2,
              borderColor:'white'}
            }
            Hidden={this.props.user.new==false}
            />

       {
        this.state.fontLoaded ? (<Text style={styles.title}> TIE BREAK </Text> ) : null 
       }
       
           <IconBadge
            MainElement={
              <TouchableWithoutFeedback hitSlop={{top:300, left:300, bottom:300, right:300}} onPress={()=> this.navigationRoute('Chat',0)}>
              <Image source={require('../../assets/icons/Menu/Messages.imageset/icMessageBig.png')} />
              </TouchableWithoutFeedback>
            }
            BadgeElement={
              <Text style={{color:'#FFFFFF', fontSize:10, fontWeight:'bold'}}>{this.state.badgeCount}</Text>
            }
            IconBadgeStyle={
              {width:22,
              height:22,
              borderRadius:22,
              minWidth:22,
              top:-15,
              right:-15,
              backgroundColor:'rgb(200,90,24)',
              borderWidth:2,
              borderColor:'white'}
            }
            Hidden={this.state.badgeCount==0}
            />
      
       
       </View>
       
       </Image>
      
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps) (HomeHeader);

const styles = StyleSheet.create({
  title: {
    color:'white',
    backgroundColor:'rgba(0,0,0,0)',
    fontFamily:'SevenOneEightUltra',
    fontSize:15,
    top:3,
    textAlign:'center'
  }
});