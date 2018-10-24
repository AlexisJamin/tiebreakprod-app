import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { connect } from 'react-redux';

function mapStateToProps(store) {
  return { chat: store.chat }
}

import Header from '../Header/Header';
import MessengerContent from './MessengerContent';


class Messenger extends React.Component {
  render() {
    return (

    	<View style={{flex:1, backgroundColor:'white'}}>

          <View style={{flex:0.16, marginBottom:20}}>
           <Header navigation={this.props.navigation} screenProps={{header:this.props.chat.firstName, back:true, chat:true}} />
          </View>
        
        <View style={{flex:0.84}}>
        <MessengerContent navigation={this.props.navigation}/>
        </View>

        </View>
    );
  }
}

export default connect(mapStateToProps, null) (Messenger);



