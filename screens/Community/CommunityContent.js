import React from 'react';
import { StyleSheet, Text, View, Image, ScrollView, FlatList, TextInput } from 'react-native';
import { List, ListItem } from 'react-native-elements';


const data = [
  {
    name: 'Amy Farha',
    avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
    dispo: '5',
    geo: '2',
    level: '15/2',
    bestLevel: '15/1'
  },
  {
    name: 'Chris Jackson',
    avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
    dispo: '3',
    geo: '3',
    level: 'Intermédiaire',
    bestLevel: '15/1'
  },
  {
    name: 'Amy Farha',
    avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
    dispo: '5',
    geo: '2',
    level: '15/2',
    bestLevel: '15/1'
  },
  {
    name: 'Chris Jackson',
    avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
    dispo: '3',
    geo: '3',
    level: 'Intermédiaire',
    bestLevel: '15/1'
  },
  {
    name: 'Amy Farha',
    avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
    dispo: '5',
    geo: '2',
    level: '15/2',
    bestLevel: '15/1'
  },
  {
    name: 'Chris Jackson',
    avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
    dispo: '3',
    geo: '3',
    level: 'Intermédiaire',
    bestLevel: '15/1'
  },
  {
    name: 'Amy Farha',
    avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
    dispo: '5',
    geo: '2',
    level: '15/2',
    bestLevel: '15/1'
  },
  {
    name: 'Chris Jackson',
    avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
    dispo: '3',
    geo: '3',
    level: 'Intermédiaire',
    bestLevel: '15/1'
  },
]



export default class CommunityContent extends React.Component {

  constructor(props) {
    super(props);
    this.renderSeparator = this.renderSeparator.bind(this);
    this.renderFooter = this.renderFooter.bind(this);
    this.state = {
      data: data
    };
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
        keyExtractor={item => item.name}
        ItemSeparatorComponent={this.renderSeparator}
        ListFooterComponent={this.renderFooter}
        renderItem={({ item }) => (
          <ListItem
          avatarStyle={{width:60, height:60, borderRadius:30, borderWidth:1, borderColor:'white', overflow:'hidden', backgroundColor:'white'}}
          avatarContainerStyle={{width:60, height:60, marginTop:7}}
          avatarOverlayContainerStyle={{backgroundColor:'transparent'}}
          titleContainerStyle={{marginLeft:50}}
          containerStyle={{ borderBottomWidth:0, height:90, justifyContent:'center'}}
          avatar={{uri:item.avatar_url}}
          title={<Text style={{fontSize:15}}>{item.name}</Text>}
          subtitleNumberOfLines={3}
          subtitleContainerStyle={{marginLeft:50, width:300}}
          subtitle={
             <View>
            <Text style={{fontSize:12, paddingTop:2}}>{item.dispo} disponibilités en commun</Text>
            <Text style={{fontSize:12, paddingTop:2}}>{item.level} ({item.bestLevel})</Text>
            <Text style={{fontSize:12, paddingTop:2}}>{item.geo} km</Text>
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

styles = StyleSheet.create({
  searchBar: {
  paddingLeft: 30,
  fontSize: 16,
  maxHeight: 50,
  flex: .1,
  borderWidth: 9,
  borderColor: '#E4E4E4'
}
})