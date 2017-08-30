import React from 'react'
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native'
import { List, ListItem, ListView } from 'react-native-elements'


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


render () {
  return (

    <View style={{flex:1}}>

        <ScrollView>

    <List containerStyle={{marginBottom: 20}}>
    {
    list.map((l, i) => (
      <ListItem
        avatarStyle={{width:50, height:50, borderRadius:25, borderWidth:1, borderColor:'white'}}
        avatarContainerStyle={{top:12, marginLeft:10}}
        titleContainerStyle={{marginLeft:10}}
        subtitleContainerStyle={{marginLeft:10, width:300}}
        hideChevron='true'
        avatar={{uri:l.avatar_url}}
        key={i}
        title={
        	<View style={styles.titleView}>
        	<Text style={styles.ratingText}>{l.name}</Text>
        	</View>
        }
        subtitle={
        	<View style={styles.subtitleView}>
        	<Text style={styles.ratingText}>{l.dispo} disponibilités en commun</Text>
        	<Text style={styles.ratingText}>{l.geo} km</Text>
        	</View>
        }
        rightTitle={
        	<View style={styles.imageView}>
        	  <Image source={require('../../assets/icons/Profile/Level.imageset/icRank.png')} style={styles.ratingImage}/>
        	    <View style={{alignItems:'center'}}>
        	      <Text style={styles.ratingLevel}>{l.level}</Text>
        	      <Text style={styles.ratingLevel}>({l.bestLevel})</Text>
        	    </View>
        	</View>
        }
      />
       ))
      }
    </List>

    </ScrollView>

           
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
