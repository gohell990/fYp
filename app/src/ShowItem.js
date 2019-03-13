import React, { Component } from 'react';
import { TouchableHighlight, StyleSheet, ScrollView, ActivityIndicator, View, Text, FlatList } from 'react-native';
import { ListItem, Button, Icon } from 'react-native-elements';
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
        index: i,
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

  renderItem = ({item}) => (
    <ListItem
      key={item.index}
      name={item.name}
      title={`${item.name} title`}
      subtitle={`${item.name} subtitle`}
      leftIcon={{name: 'book', type: 'font-awesome'}}
      onPress={() => {
        this.props.navigation.navigate('ItemDetails', {
          itemkey: `${JSON.stringify(item.key)}`,
        });
      }}
    />
  )

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
          <FlatList
            data={this.state.items}
            renderItem={this.renderItem}
          />
        </ScrollView>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
   flex: 1,
   paddingBottom: 22
  },
  item: {
    justifyContent: 'center',
    borderBottomWidth: 3,
    borderColor: '#ccc',
    marginBottom:10,
    padding: 10,
    fontSize: 18,
    height: 44,
  },
  itemTitle: {
    fontSize: 22,
    fontWeight: '500',
    color: '#000'
  },
  itemSubtitle: {
    fontSize: 18,
    marginBottom:20
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
