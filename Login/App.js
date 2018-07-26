import React from 'react';
import { StyleSheet, View, Alert } from 'react-native';
import {
  Form,
  Input,
  Item,
  Container,
  Content,
  Button,
  Text,
  Icon,
  Body,
  Left,
  Right
} from 'native-base';
import {
  createBottomTabNavigator,
  createStackNavigator,
  withNavigation
} from 'react-navigation';
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
  render(){
    return <RootStack />
  }
}


class LoginScreen extends React.Component{
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
      this.props.navigation.navigate('Register')
    } catch (error) {
      console.log(error.toString())
    }
  }

  async login(email, pass){
    try {
      await firebase.auth().signInWithEmailAndPassword(email, pass)
      Alert.alert('logged in')
      this.props.navigation.navigate('Home')
    } catch (error) {
      console.log(error.toString())
    }
  }

  async logout(){
    try {
      await firebase.auth().signOut()
      Alert.alert('signed out')
      this.props.navigation.navigate('Login')
    } catch (error) {
      console.log(error.toString())
    }
  }

  static navigationOptions = {
      title: 'Login',
  }

  render() {
    return (
      // <View style={styles.container}>
      //   <Text>{ this.state.email}</Text>
      //   <TextInput placeholder="Username" onChangeText={(text)=>{this.setState({email: text})}} />
        
      //   <Text>{this.state.password}</Text>
      //   <TextInput placeholder="Password" onChangeText={(text)=>{this.setState({password: text})}} />
      //   <Button title="Sign Up" onPress={()=>this.register(this.state.email, this.state.password)} />
      //   <Button title="Log in" onPress={()=>this.login(this.state.email, this.state.password)} />
      //   <Button title="Sign Out" onPress={()=> this.props.navigation.navigate('Home')} />
      // </View>
      <Container >
        {/* <Body> */}
          <Content padder>
            <Form>
              <Item>
                <Input placeholder="email" onChangeText={(text)=>{this.setState({email: text})}}/>
              </Item>
              <Item last>
                <Input secureTextEntry={true} placeholder="password" onChangeText={(text)=>{this.setState({password: text})}}/>
              </Item>
              
            </Form>
            <Button block style={styles.button} onPress={()=>this.login(this.state.email, this.state.password)}>
              <Text>Log In</Text>
            </Button>
            <Button block style={styles.button} onPress={()=>this.register(this.state.email, this.state.password)}>
              <Text>Register</Text>
            </Button>
          </Content>
          
        {/* </Body> */}
      </Container>
    );
  }
}

class RegisterScreen extends React.Component{
  static navigationOptions = {
    title: 'Registration',
  }
  render(){
    return(
      <View>
        <Text>Register Screen</Text>
      </View>
    );
    
  }
}

class HomeScreen extends React.Component{

  constructor(props){
    super(props)
  }

  async logout(){
    try {
      await firebase.auth().signOut()
      console.log('signed out')
      //Alert.alert('signed out')
    } catch (error) {
      console.log(error.toString())
    }
  }

  componentDidMount(){
    this.props.navigation.setParams({logout: ()=>{
      //Alert.alert('aaaa');
      this.logout();
      this.props.navigation.navigate('Login')
    }})
  }

  static navigationOptions = ({navigation}) => {
    return{
      title: 'Home',
      headerRight: (
        <Button transparent onPress={navigation.getParam('logout')}><Icon name="md-log-out"/></Button>
      ),
    }
    
  }
  render(){
    return(
      <View>
        <Text>Home Screen</Text>
      </View>
    );
  }
}

const RootStack = createStackNavigator(
  {
    Login: LoginScreen,
    Register: RegisterScreen,
    Home: HomeScreen
  },
  {
    initialRouteName: 'Login',
  }
)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    marginTop: 10,
  },
});
