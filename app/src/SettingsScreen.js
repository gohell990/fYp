import React, {Component} from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { Icon, Button, Container, Header, Content, Left} from 'native-base';

export default class SettingsScreen extends React.Component{

  render(){
    return(
      <View style={styles.container}>
        <Text> Settings Screen </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
})
