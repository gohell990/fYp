import React, { Component } from 'react';
import { StyleSheet, ScrollView, ActivityIndicator, View, Text } from 'react-native';
import { List, ListItem, Button, Icon } from 'react-native-elements';
import firebase from 'react-native-firebase';

export default class ShowItem extends React.Component{
  static navigationOptions = { title: 'My Item List'};

  constructor() {
    super();
    this.ref = firebase.firestore().collection('Items');
    this.unsubscribe = null;
    this.state = {
      isLoading: true,
      items: []
    };
  }

  onCollectionUpdate = (querySnapshot) => {
    const items = [];

    querySnapshot.forEach((doc) => {
      const { name, description, category, price } = doc.data();
      items.push({
        key: doc.id,
        doc,
        name,
        description,
        category,
        price,
      });
    });
    this.setState({
      items,
      isLoading: false,
   });
  }

  componentDidMount() {
    this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
  }

  render() {
    if(this.state.isLoading){
      return(
        <View style={styles.activity}>
          <ActivityIndicator size="large" color="#0000ff"/>
        </View>
      )
    }
    else {
    return (
      <ScrollView contentContainerStylestyle={styles.container}>
        <List>
          {
            this.state.items.map((item, i) => (
              <ListItem
                key={i}
                name={item.name}
                leftIcon={{name: 'book', type: 'font-awesome'}}
                onPress={() => {
                  this.props.navigation.navigate('ItemDetails', {
                    itemkey: `${JSON.stringify(item.key)}`,
                  });
                }}
              />
            ))
          }
        </List>
      </ScrollView>
    );}
  }
}

const styles = StyleSheet.create({
  container: {
   flex: 1,
   paddingBottom: 22
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
  activity: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  }
})
