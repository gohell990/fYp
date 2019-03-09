import React from 'react';
import { StyleSheet, Platform, Image, Text, View, Button } from 'react-native';
import {DrawerNavigator,} from 'react-navigation';
import firebase from 'react-native-firebase';

class Main extends React.Component {

  static navigationOptions = {
    drawerLabel: 'Home',
    drawerIcon: ({ tintColor }) => (
      <Image
        source={require('./app/image/cart.png')}
        style={[styles.icon, {tintColor: tintColor}]}
      />
    ),
  };

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
      <View style={styles.container}>
        <Text>
          Hi {currentUser && currentUser.email}!
        </Text>
        <Button onPress={()=> this.props.navigation.navigate('DrawerOpen')}
          title= "MyAccount"/>

        <Button title="Logout" onPress={this.handleLogout} />
      </View>
    )
  }
}

class MyAccountScreen extends React.Component{
  static navigationOptions= {
    drawerLabel: 'MyAccount',
    drawerIcon: ({tintColor}) => (
      <Image
        source={require('./app/image/image2.jpg')}

      />
    ),
  };

  render(){
    return(
      <View style={styles.container}>
        <Button
          onPress={()=> this.props.navigation.goBack()}
          title="Go Main Page"
        />
        <Button
          onPress={()=> this.props.navigation.navigate('DrawerOpen')}
          title="HomePage"
        />
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
  icon: {
    width: 24,
    height: 24,
  },
})

export default DrawerNavigator({
  Main: { screen: Main},
  MyAccount: { screen: MyAccountScreen },

}, {
      drawerPosition: 'right',
      initialRouteName: 'Main',
      drawerBackgroundColor: 'orange',
      drawerWidth: 200,
});
