import React from 'react';
import { StyleSheet, Alert, AsyncStorage, Modal} from 'react-native';
import {
  Container,
  Content,
  Header,
  Text,
  List,
  ListItem,
  Fab,
  Left,
  Right,
  Body,
  Icon,
  View,
  Card,
  CardItem
} from 'native-base';

export default class App extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      title: '',
      note: '',
      modalVisible: false
    }
  }

  _storeData = async() => {
    try {
      await AsyncStorage.setItem(this.state.title, this.state.note)
    } catch (error) {
      console.log(error.toString())
    }
    
  }

  _retrieveData = async(note) =>{
    try {
      const value = await AsyncStorage.getItem(note)
      if(value != null){
        console.log('reached here')
        return value
      } else{
        return ''
      }
    } catch (error) {
      console.log(error.toString())
    }
  }

  _getAllNotes = async() =>{
    try {
      const value = await AsyncStorage.getAllKeys()
      if(value != null){
        return value
      }
    } catch (error) {
      console.log(error.toString())
    }
  }

  render() {
    console.log(this._getAllNotes())
    return (
      <Container>
        <Header>

        </Header>
        <View style={{flex:1}}>
          <List dataArray={['w', 'e']}
            renderRow={(item)=>
              <ListItem>
                <View style={{flex:1}}>
              <Card>
                <CardItem header>
                  <Text>{item}</Text>
                </CardItem>
                <CardItem cardBody>
                  {/* <Text>{this._retrieveData(item)}</Text> */}
                </CardItem>
              </Card>
              </View>
              </ListItem>
            }
          />
          <Fab style={{ backgroundColor: '#5067FF' }}
            onPress = {()=>{Alert.alert('pressed')}}
            position="bottomRight">
            <Icon name="add" />
          </Fab>
        </View>
      </Container>
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
