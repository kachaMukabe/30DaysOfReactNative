import React from 'react';
import { StyleSheet, Alert, AsyncStorage, Modal} from 'react-native';
import store from 'react-native-simple-store';
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
      title: 'First',
      note: 'Kkkkkkk',
      notes: [],
      newNote: '',
      modalVisible: false
    }
    this._storeData()
    store.update('album', {
      albumName: 'Blurry Face'
    })
    
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
      const value = await AsyncStorage.getItem(note).then((text)=>{return text})
      if(value != null){
        //console.log(typeof(value))
        const item = JSON.stringify(value)
        return value
      } else{
        return ''
      }
    } catch (error) {
      console.log(error.toString())
    }
  }

  getNote = (note) =>{
    let no = '[]'
    no = JSON.stringify(store.get('album')
    .then((res) =>{
      return res.albumName
      }
    ))
    console.log(typeof(no))
    
    return no
    // console.log(typeof(curNote))
  }

  _getAllNotes = async() =>{
    try {
      const value = await AsyncStorage.getAllKeys()
      this.setState({notes: value})
      let notes = []
      value.forEach((item, index)=>{
        //console.log(item+" "+index)
        notes.push(item)
      })
      //console.log(notes)
      if(value != null){
        return notes
      }
    } catch (error) {
      console.log(error.toString())
    }
  }

  render() {
    console.log(this.state.notes)
    return (
      <Container>
        <Header>

        </Header>
        <View style={{flex:1}}>
          <List dataArray={this.state.notes}
            renderRow={(item)=>
              <ListItem>
                <View style={{flex:1}}>
              <Card>
                <CardItem header>
                  <Text>{item}</Text>
                </CardItem>
                <CardItem cardBody>
                  <Text>{this.getNote(item)}</Text>
                </CardItem>
              </Card>
              </View>
              </ListItem>
            }
          />
          <Fab style={{ backgroundColor: '#5067FF' }}
            onPress = {()=>{this._getAllNotes()}}
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
