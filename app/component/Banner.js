import React from 'react';
import { StyleSheet, Image, Text } from 'react-native';

export default class Banner extends React.Component {

  render() {
    return (
      <Image source={require('../image/banner.jpg')}
        style={styles.banner} />
    );
  }
}

const styles = StyleSheet.create({
  banner: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
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
