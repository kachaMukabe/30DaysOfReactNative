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
  CheckBox,
  Card,
  CardItem
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
    if(this.state.task != ''){
      let itemsList = this.state.items
      itemsList.push(this.state.task)
      this.setState({items: itemsList})
    }
    
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
          <List dataArray={this.state.items}
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
          <Modal transparent={true}
          visible={this.state.modalVisible}
          onDismiss={()=> this.addItem()}
          onRequestClose={()=>{Alert.alert('closed')}}>
            <View style={{ backgroundColor:'rgba(52, 52, 52, 0.8)', flex:1, justifyContent: 'center'}}>
            <Card >
              <CardItem header>
                <Text>New Task</Text>
                <Right><Button transparent onPress={()=> this.setModalVisible(!this.state.modalVisible)}>
                  <Icon name="md-close"/></Button>
                </Right>
              </CardItem>
              <CardItem bordered>
                <Body>
                  <Item regular>
                    <Input placeholder="new" onChangeText={(text)=> this.setState({task: text})}/>
                  </Item>
                </Body>
              </CardItem>
              <CardItem footer bordered button onPress={()=>this.setModalVisible(!this.state.modalVisible)}>
                <Text style={{color: 'blue'}}>Enter New Task</Text>
              </CardItem>
            </Card></View>
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
    
  },
});
