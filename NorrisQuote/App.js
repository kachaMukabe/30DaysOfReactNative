import React from 'react';
import { Alert,
  StyleSheet, 
  Text, 
  View, 
  Button, 
  Image, 
  TouchableHighlight,
  ActivityIndicator 
} from 'react-native';


const API = 'https://api.chucknorris.io/jokes/random';
const DEFAULT_QUERY = 'redux';

export default class App extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      hits: [],
      line: 'Tap my Face for a Quote'
    }
  }

  getQuote = () =>{
    this.setState({line: null})
    fetch(API)
      .then(response => response.json())
      .then(data => this.setState({ hits: data, line: data.value }));
    
  }

  render() {
    let pic = {
      uri: "https://assets.chucknorris.host/img/avatar/chuck-norris.png"
    };
    if(!this.state.line){
      return (<ActivityIndicator
        animating={true} 
        style={styles.indicator}
        size='large'
        />);
    }
    return (
      <View style={styles.container}>
        <TouchableHighlight onPress={ this.getQuote } underlayColor='#fff'>
          <Image source={ pic } style={{width: 60, height: 60}}/>
        </TouchableHighlight>
        
        <Text style={styles.quoteText}>{ this.state.line }</Text>
        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFD6BF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  indicator: {
    flex: 1,
    backgroundColor: '#ffe6d9',
    alignItems: 'center',
    justifyContent: 'center',
    height: 80
  },
  quoteText: {
    fontSize: 20,
    color: '#ffffff',
    textAlign: 'center',
    margin: 20
  },
});
