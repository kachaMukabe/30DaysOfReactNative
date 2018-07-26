import React from 'react';
import { StyleSheet, Text, TextInput, Button, View, Alert } from 'react-native';
import * as firebase from 'firebase';


const firebaseConfig = {
  apiKey: "AIzaSyBPhneSBSuGXQbH-1LpYrBCvzQVzLL4H5I",
  authDomain: "gsag-c9246.firebaseapp.com",
  databaseURL: "https://gsag-c9246.firebaseio.com",
  projectId: "gsag-c9246",
  storageBucket: "gsag-c9246.appspot.com",
  messagingSenderId: "245473368892"
}

firebase.initializeApp(firebaseConfig);

export default class App extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      email: '',
      password: ''
    }
  }

  async register(email, pass) {
    try {
      await firebase.auth().createUserWithEmailAndPassword(email, pass)
      Alert.alert('user created')
    } catch (error) {
      console.log(error.toString())
    }
  }

  async login(email, pass){
    try {
      await firebase.auth().signInWithEmailAndPassword(email, pass)
      Alert.alert('logged in')
    } catch (error) {
      console.log(error.toString())
    }
  }

  async logout(){
    try {
      await firebase.auth().signOut()
      Alert.alert('signed out')
    } catch (error) {
      console.log(error.toString())
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>{ this.state.email}</Text>
        <TextInput placeholder="Username" onChangeText={(text)=>{this.setState({email: text})}} />
        
        <Text>{this.state.password}</Text>
        <TextInput placeholder="Password" onChangeText={(text)=>{this.setState({password: text})}} />
        <Button title="Sign Up" onPress={()=>this.register(this.state.email, this.state.password)} />
        <Button title="Log in" onPress={()=>this.login(this.state.email, this.state.password)} />
        <Button title="Sign Out" onPress={()=>this.logout()} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
