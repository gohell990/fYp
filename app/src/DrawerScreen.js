import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Button,
} from 'react-native';
import {NavigationActions, createDrawerNavigator, DrawerNavigator, DrawerItems} from 'react-navigation';
import {Icon} from 'native-base';


export default class DrawerScreen extends Component<Props> {

  render() {
    return (
      <View style={styles.container}>
        <Text
        style={styles.text}>{'Drawer Screen'}</Text>

      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#ff9900',
  },
  text: {
    fontSize: 48,
    color: 'black',
  },
})
