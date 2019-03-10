import React, { Component } from 'react';
import { StyleSheet, ScrollView, ActivityIndicator, View, TextInput } from 'react-native';
import { Button } from 'react-native-elements';
import firebase from 'react-native-firebase';

export default class UploadItem extends React.Component{

  static navigationOptions = {
    title: 'Upload Item',
  };

  constructor() {
    super();
    this.ref = firebase.firestore().collection('Items');
    this.state = {
      name: '',
      description: '',
      category: '',
      price: '',
      isLoading: false,
    };
  }

  componentDidMount(){

  }
  updateTextInput = (text, field) => {
    const state = this.state
    state[field] = text;
    this.setState(state);
  }

  saveBoard() {
    this.setState({
      isLoading: true,
    });
    this.ref.add({
      name: this.state.name,
      description: this.state.description,
      category: this.state.category,
      price: parseFloat(this.state.price),
    }).then((docRef) => {
      this.setState({
        name: '',
        description: '',
        category: '',
        price: '',
        isLoading: false,
      });
      this.props.navigation.goBack();
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
      this.setState({
        isLoading: false,
      });
    });
  }

  render() {
    if(this.state.isLoading){
      return(
        <View style={styles.activity}>
          <ActivityIndicator size="large" color="#0000ff"/>
        </View>
      )
    }
    return (
      <ScrollView style={styles.container}>
        <View style={styles.subContainer}>
          <TextInput
              placeholder={'Name'}
              value={this.state.name}
              onChangeText={(text) => this.updateTextInput(text, 'name')}
          />
        </View>
        <View style={styles.subContainer}>
          <TextInput
              multiline={true}
              numberOfLines={4}
              placeholder={'Description'}
              value={this.state.description}
              onChangeText={(text) => this.updateTextInput(text, 'description')}
          />
        </View>
        <View style={styles.subContainer}>
          <TextInput
              placeholder={'Category'}
              value={this.state.category}
              onChangeText={(text) => this.updateTextInput(text, 'category')}
          />
        </View>
        <View style={styles.subContainer}>
          <TextInput
              keyboardType= 'numeric'
              placeholder={'Price'}
              value={this.state.price}
              onChangeText={(text) => this.updateTextInput(text, 'price')}
          />
        </View>
        <View style={styles.button}>
          <Button
            large
            leftIcon={{name: 'save'}}
            title='Save'
            onPress={() => this.saveBoard()} />
        </View>
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
    marginBottom: 20,
    padding: 5,
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
  }
})
