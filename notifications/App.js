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
    }
  })

}

export default class App extends React.Component {
  constructor(props){
    super(props)
    registerForPushNotificatiosnAsync()
    this.state ={
      notification: {},
    }
    // TODO: Figure out how to get rid of the warning of time out
    console.ignoredYellowBox = [
      'Setting a timer'
      ];
  }

  componentDidMount(){
    registerForPushNotificatiosnAsync();

    this._notificationSubscription = Notifications.addListener(this._handleNotification);
  }

  _handleNotification = (notification)=> {
    this.setState({notification: notification});
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>Test App to recieve notifications</Text>
        <Text>Origin: {this.state.notification.origin}</Text>
        <Text>Data: {JSON.stringify(this.state.notification.data)}</Text>
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
