import React from 'react'
import { StyleSheet, Text, View, Image, ScrollView, FlatList, TextInput } from 'react-native'
import { List, ListItem } from 'react-native-elements'


const list = [
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
    this.state = {
      list: list,
    };
  }



render () {
  return (

    <View style={{flex:1, backgroundColor:'white'}}>

    <List>
      <FlatList
      data={this.state.list}
      renderItem={({ item }) => (
        <ListItem
          avatarStyle={{width:50, height:50, borderRadius:25, borderWidth:1, borderColor:'white'}}
          avatarContainerStyle={{top:12, marginLeft:10}}
          titleContainerStyle={{marginLeft:10}}
          subtitleContainerStyle={{marginLeft:10, width:300}}
          hideChevron='true'
          avatar={{uri:item.avatar_url}}
          title={
          	<View style={styles.titleView}>
          	<Text style={styles.ratingText}>{item.name}</Text>
          	</View>
          }
          subtitle={
          	<View style={styles.subtitleView}>
          	<Text style={styles.ratingText}>{item.dispo} disponibilités en commun</Text>
          	<Text style={styles.ratingText}>{item.geo} km</Text>
          	</View>
          }
          rightTitle={
          	<View style={styles.imageView}>
          	  <Image source={require('../../assets/icons/Profile/Level.imageset/icRank.png')} style={styles.ratingImage}/>
          	    <View style={{alignItems:'center'}}>
          	      <Text style={styles.ratingLevel}>{item.level}</Text>
          	      <Text style={styles.ratingLevel}>({item.bestLevel})</Text>
          	    </View>
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
  titleView: {
    flexDirection: 'row',
    paddingLeft: 10,
    paddingTop: 5
  },
  searchBar: {
  paddingLeft: 30,
  fontSize: 16,
  maxHeight: 50,
  flex: .1,
  borderWidth: 9,
  borderColor: '#E4E4E4',
},
  subtitleView: {
    flexDirection: 'column',
    paddingLeft: 10,
  },
  imageView: {
    flexDirection: 'column',
    alignItems:'center',
    top:12,
    right:5,
    width:65,
    height:40,
  },
  ratingImage: {
    height: 15,
    width: 15,
    marginBottom:5,
  },
  titleText: {
    paddingLeft: 10,
    color: 'black'
  },
  ratingText: {
    paddingLeft: 10,
    color: 'black'
  },
  ratingLevel: {
    color: 'black',
    fontSize:'10'
  }
})
