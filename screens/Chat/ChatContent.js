import React from 'react';
import { StyleSheet, Text, View, Image, ScrollView, FlatList, TextInput } from 'react-native';

export default class ChatContent extends React.Component {

  constructor() {
    super();
  }


render () {
  return (

     <View style={{alignItems:'center'}}>

    <Text> Chat </Text>

    <Image source={require('../../assets/icons/Profile/Level.imageset/icRank.png')}/>
           
    </View>

    );
  }
}
