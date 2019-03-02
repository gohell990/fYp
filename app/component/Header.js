import React from 'react';
import { StyleSheet, Image, Text, View } from 'react-native';


export default class Header extends React.Component {

  render() {
    return (
      <View style={styles.header}>
        <Image
          source ={require('../image/cart.png')}
          style={styles.cart}
        />
        <Text style={styles.logo}> e-commerce </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  logo: {
    fontSize: 20,
    marginLeft: 10,
    fontStyle: 'italic',
    color: '#292929',
  },
  header:{
    height: 80,
    marginTop: 20,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    borderBottomWidth: 4,
    borderBottomColor: '#ccc',
  },
  cart: {
    width: 40,
    height: 40,
  },

});
