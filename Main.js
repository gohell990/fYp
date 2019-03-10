import React from 'react';
import { ScrollView, StyleSheet, Image, Text, View, Button, DrawerLayoutAndroid } from 'react-native';
import firebase from 'react-native-firebase';
import {createDrawerNavigator} from 'react-navigation';

import MyAccountScreen from './app/src/MyAccountScreen';
import DrawerScreen from './app/src/DrawerScreen';
import SettingsScreen from './app/src/SettingsScreen';

export default class Main extends React.Component {
  handleLogout = () => {
    const { email, password } = this.state
    firebase
    .auth()
    .signOut()
    .then(() => this.props.navigation.navigate('Login'))
    .catch(error => this.setState({errorMessage:error.message}))
    console.log('handleLogout')
  }

  componentDidMount() {
    const {currentUser} = firebase.auth()
    this.setState({currentUser})
  }

  state = { currentUser: null }

  render() {
      const { currentUser } = this.state
      return (

          <ScrollView contentContainerStyle={styles.container}>
            <Text>
              Hi {currentUser && currentUser.email}!
            </Text>
            <View style={styles.buttonContainer}>
              <Button style={styles.button} title="Logout" onPress={this.handleLogout} />

              <Button style={styles.button} title="My Account" onPress={()=>this.props.navigation.navigate('Settings')}/>
              <Button style={styles.button} title="Home" onPress={()=>this.props.navigation.navigate('MyAccount')}/>
            </View>
          </ScrollView>

      );
    }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    position: 'absolute',
    bottom: 0,
    alignItems: 'center',
  },
  button: {
    width: 70,
    justifyContent: 'flex-end',
    flex: 1,

  }
})
