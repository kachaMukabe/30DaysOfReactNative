import React from 'react';
import { StyleSheet, Alert, Modal, TextInput, TouchableHighlight } from 'react-native';
import {
  Container,
  Header,
  Title,
  Footer,
  Button,
  Fab,
  Icon,
  Left,
  Right,
  Content,
  List,
  ListItem,
  Form,
  Item,
  Input,
  Body,
  Text,
  View,
  CheckBox
} from 'native-base';

export default class App extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      modalVisible: false,
      task: '',
      items: [
        "one",
        "two"
      ]
    }
  }

  async componentWillMount() {
    await Expo.Font.loadAsync({
      'Roboto': require('native-base/Fonts/Roboto.ttf'),
      'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
    });
  }

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  addItem(){
    this.state.items.push(this.state.task)
    Alert.alert(this.state.items.length)
  }

  items = [
    "ONE",
    "teo"
  ]
  
  render() {
    let lItems = this.state.items
    return (
      <Container>
        <Header>
          <Body>
            <Title>ToDo List</Title>
          </Body>
        </Header>
        <View style={{ flex: 1 }} padder>
          <Modal transparent={false}
          visible={this.state.modalVisible}
          onDismiss={()=> this.addItem()}
          onRequestClose={()=>{Alert.alert('closed')}}>
            <View style={{ flex:1, justifyContent: 'center', alignItems: 'center'}}>
              <TextInput style={{ width:100, margin: 10, height: 40, borderColor: 'gray', borderBottomWidth:1}}
              value="Enter New Task" onChangeText={(text)=> this.setState({task: text})}/>
              <TouchableHighlight onPress={()=> this.setModalVisible(!this.state.modalVisible)}>
                <Text style={{color: 'blue'}}>Enter</Text>
              </TouchableHighlight>
            </View>
          </Modal>
          <List dataArray={lItems}
          renderRow={(item)=>
            <ListItem>
              <CheckBox />
              <Body><Text>{item}</Text></Body> 
            </ListItem>
          }>  
          </List>
          <Fab position='bottomRight'
          onPress={()=>{this.setModalVisible(true)}}
          style={{ backgroundColor: '#5067FF' }}>
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
    
  },
});
