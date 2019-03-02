import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';

import Header from './app/component/Header';
import Banner from './app/component/Banner';
import ContentContainer from './app/component/ContentContainer';

import firebase from 'react-native-firebase';


export default class App extends React.Component {

  render() {
    return (
      <ScrollView
        contentContainerStyle={styles.container}>
        <Header />
        <Banner />
        <ContentContainer />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: '#fff',
  },

  test:{
    width:'100%',
    justifyContent: 'space-around',
    alignItems: 'center',
  }
});
