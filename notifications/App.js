import React from 'react';
import { StyleSheet, Text, View, Alert } from 'react-native';
import {Permissions, Notifications} from 'expo';
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



const PUSH_ENDPOINT = 'https://gsag-c9246.firebaseio.com/';

async function registerForPushNotificatiosnAsync() {
  Alert.alert('started')
  const {status: existingStatus} = await Permissions.getAsync(
    Permissions.NOTIFICATIONS
  );
  let finalStatus = existingStatus;

  if(existingStatus !== 'granted'){
    const {status} = await Permissions.getAsync(Permissions.NOTIFICATIONS);
    finalStatus = status;
  }
  if(finalStatus !== 'granted'){
    return;
  }

  let token = await Notifications.getExpoPushTokenAsync();
  console.log(token)

  firebase.database().ref('users/kacha').set({
    user: {
      username: 'kacha',
    },
    token: {
      value: token,
    }, function(error) {
      if (error) {
        console.log(error.toString())
      } else {
        console.log("Data saved successfully!")
      }
    }
  })
  // return fetch(PUSH_ENDPOINT, {
  //   method: 'POST',
  //   headers: {
  //     Accept: 'application/json',
  //     'Content-Type': 'application/json',
  //   },
  //   body: JSON.stringify({
  //     token: {
  //       value: token,
  //     },
  //     user: {
  //       username: 'kacha',
  //     },
  //   }),
  // });

}

export default class App extends React.Component {
  constructor(props){
    super(props)
    registerForPushNotificatiosnAsync()
  }
  render() {
    return (
      <View style={styles.container}>
        <Text>Open up App.js to start working on your app!</Text>
        <Text>Changes you make will automatically reload.</Text>
        <Text>Shake your phone to open the developer menu.</Text>
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
