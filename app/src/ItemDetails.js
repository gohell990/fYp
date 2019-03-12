import React, { Component } from 'react';
import { StyleSheet, ScrollView, ActivityIndicator, View } from 'react-native';
import { List, ListItem, Text, Card, Button } from 'react-native-elements';
import firebase from 'react-native-firebase';

export default class ItemDetails extends React.Component{
  static navigationOptions = {
    title: 'Item Details',
  };

  constructor() {
    super();
    this.state = {
      isLoading: true,
      item: {},
      key: ''
    };
  }

  componentDidMount() {
    const { navigation } = this.props;
    firebase.initializeApp(firebaseConfig)
    .firestore()
    .collection("Items")
    .get()
    .then(snapshot => snapshot.docs.map(doc => console.log(doc.id)))
    .catch(error => console.log("Error getting document:", error))
  }

  deleteBoard(key) {
    const { navigation } = this.props;
    this.setState({
      isLoading: true
    });
    firebase.firestore().collection('items').doc(key).delete().then(() => {
      console.log("Document successfully deleted!");
      this.setState({
        isLoading: false
      });
      navigation.navigate('ShowItem');
    }).catch((error) => {
      console.error("Error removing document: ", error);
      this.setState({
        isLoading: false
      });
    });
  }

  render() {
    if(this.state.isLoading){
      return(
        <View style={styles.activity}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      )
    }
    return (
      <ScrollView>
        <Card style={styles.container}>
          <View style={styles.subContainer}>
            <View>
              <Text h3>{this.state.item.name}</Text>
            </View>
            <View>
              <Text h5>{this.state.item.description}</Text>
            </View>
            <View>
              <Text h4>{this.state.item.category}</Text>
            </View>
            <View>
              <Text h4>{this.state.item.price}</Text>
            </View>
          </View>
          <View style={styles.detailButton}>
            <Button
              large
              backgroundColor={'#CCCCCC'}
              leftIcon={{name: 'edit'}}
              title='Edit'
              onPress={() => {
                this.props.navigation.navigate('EditItem', {
                  itemkey: `${JSON.stringify(this.state.key)}`,
                });
              }} />
          </View>
          <View style={styles.detailButton}>
            <Button
              large
              backgroundColor={'#999999'}
              color={'#FFFFFF'}
              leftIcon={{name: 'delete'}}
              title='Delete'
              onPress={() => this.deleteBoard(this.state.key)} />
          </View>
        </Card>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20
  },
  subContainer: {
    flex: 1,
    paddingBottom: 20,
    borderBottomWidth: 2,
    borderBottomColor: '#CCCCCC',
  },
  activity: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  },
  detailButton: {
    marginTop: 10
  }
})