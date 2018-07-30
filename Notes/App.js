import React from 'react';
import { StyleSheet, Alert, AsyncStorage, Modal} from 'react-native';
import {
  Container,
  Header,
  Text,
  List,
  ListItem,
  Fab,
  Body,
  Icon,
  View,
  Card,
  CardItem,
  Textarea,
  Title,
  Button
} from 'native-base';

export default class App extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      title: '',
      note: '',
      notes: {},
      modalVisible: false
    } 
  }

  _storeData = async() => {
    if(this.state.title != '' && this.state.note != ''){
      let notes = this.state.notes
      notes[this.state.title] = this.state.note
      this.setState({notes: notes})
      try {
        console.log( this.state.notes)
        await AsyncStorage.setItem('notes',JSON.stringify(notes))
      } catch (error) {
        console.log(error.toString())
      }
      this._retrieveData()
    }
    
    
  }

  _retrieveData = async() =>{
    try {
      const value = await AsyncStorage.getItem('notes')
      if(value != null){
        console.log(value)
        this.setState({notes: JSON.parse(value)})
        return value
      } else{
        return ''
      }
    } catch (error) {
      console.log(error.toString())
    }
  }


  render() {
    return (
      <Container>
        <Header>
          <Body><Title>Notes</Title></Body>
        </Header>
        <View style={{flex:1}}>
          <List dataArray={Object.keys(this.state.notes)}
            renderRow={(item)=>
              <ListItem>
                <View style={{flex:1}}>
              <Card>
                <CardItem header>
                  <Text>{item}</Text>
                </CardItem>
                <CardItem>
                  <Body>
                    <Text>{this.state.notes[item]}</Text>
                  </Body>
                </CardItem>
              </Card>
              </View>
              </ListItem>
            }
          />
          <Fab style={{ backgroundColor: '#5067FF' }}
            onPress = {()=>{this.setState({modalVisible: true})}}
            position="bottomRight">
            <Icon name="add" />
          </Fab>
          <Modal visible={this.state.modalVisible}
          onDismiss={this._storeData}>
            <View style={styles.container}>
              <Textarea rowSpan={1} bordered placeholder="Note title" 
                onChangeText={(text)=>{this.setState({title: text})}}/>
              <Textarea rowSpan={6} bordered placeholder="Enter new Note" onChangeText={(text)=>{this.setState({note: text})}}/>
              <View style={styles.modalButton}>
                <Button style={{ backgroundColor: '#5067FF' }} onPress={()=>this.setState({modalVisible: !this.state.modalVisible})}>
                  <Text>Cancel</Text>
                </Button>
                <Text>  </Text>
                <Button style={{ backgroundColor: '#5067FF' }} onPress={()=>this.setState({modalVisible: !this.state.modalVisible})}>
                  <Text>Add Task</Text>
                </Button>
              </View>
            </View>

          </Modal>
        </View>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  modalButton: {
    padding: 10,
    width: null,
    height: 20,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
});
