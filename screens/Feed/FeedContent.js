import React from 'react';
import { StyleSheet, Text, View, Image, FlatList, ActivityIndicator, RefreshControl, TouchableOpacity } from 'react-native';
import { Parse } from 'parse/react-native';
import { List, ListItem } from 'react-native-elements';
import { Font, WebBrowser, Amplitude } from 'expo';

import * as rssParser from 'react-native-rss-parser';

import translate from '../../translate.js';

export default class FeedContent extends React.Component {

  constructor() {
    super();
    this.renderSeparator = this.renderSeparator.bind(this);
    this.renderFooter = this.renderFooter.bind(this);
    this.renderEmpty = this.renderEmpty.bind(this);
    this.onRefresh = this.onRefresh.bind(this);
    this.state = {
      data: null,
      loading: true,
      refreshing: false,
      fontAvenirLoaded: false
    };
  }

 async componentDidMount() {
 	let dataRss = [];
 	await Font.loadAsync({
      'Avenir': require('../../assets/fonts/Avenir.ttf'),
    });

 	fetch('http://www.tennisactu.net/rss_cyclismactu.xml')
	  .then((response) => response.text())
	  .then((responseData) => rssParser.parse(responseData))
	  .then((rss) => {

	    for (var i = 0; i < rss.items.length; i++) {
	    	dataRss.push({title:rss.items[i].title, url:rss.items[i].id});
	    	this.setState({data:dataRss, loading:false, fontAvenirLoaded:true})
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
        <Text style={{marginTop:20}}> Aucune Actu.</Text>
      </View>
    );
  }

  onRefresh() {
  	let dataRss = [];
 	fetch('http://www.tennisactu.net/rss_cyclismactu.xml')
	  .then((response) => response.text())
	  .then((responseData) => rssParser.parse(responseData))
	  .then((rss) => {

	    for (var i = 0; i < rss.items.length; i++) {
	    	dataRss.push({title:rss.items[i].title, url:rss.items[i].id});
	    	this.setState({data:dataRss, loading:false})
	    }
	  });
  } 

_onPressNews = (item) => {
  Amplitude.logEvent("OpenBrowser TennisActu clicked");
  WebBrowser.openBrowserAsync(item);
};

render () {
  return (

    <View style={{flex:1, backgroundColor:'white'}}>   


     <List containerStyle={{borderTopWidth:0, borderBottomWidth:0}}>
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
          titleContainerStyle={{marginLeft:30}}
          containerStyle={styles.container}
          title={<Text style={{fontSize:13, fontFamily:'Avenir'}}>{item.title}.</Text>}
          onPress={()=>{this._onPressNews(item.url)}}
          />
        )}
      />
    </List>

    </View>
           

    );
  }
}

const styles = StyleSheet.create({
  container: {
    borderBottomWidth:0, 
    height:80, 
    justifyContent:'center'
  }
});