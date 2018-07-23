import React from 'react';
import { StyleSheet, Text, View, Button, Alert, TouchableHighlight } from 'react-native';

export default class App extends React.Component {

  constructor(props){
    super(props)
    this.state = { firstNum: '',
                  answered: 'false',
                  num: ''}
    this.underC = '#b5c5ff'
  }

  calculate = (exp) => {
    let values = exp.split(" ")
    let ans = 0
    switch(values[1]){
      case "+":
        ans = parseInt(ans = values[0]) + parseInt(values[2])
        break;
      case "-":
        ans = values[0] - values[2]
        break;
      case "*":
        ans = values[0] * values[2]
        break;
      case "/":
        ans = values[0] / values[2]
        break;
      default:
        if(values.length == 1){
          ans = values[0]
        } else{
          ans = 'Error'
        }
        break;
    }
    this.setState({
      answered: 'true'
    })
    return ans
  }

  onPress = (num) => {
    if(this.state.answered == 'true'){
      if(isNaN(num)){
        this.setState({
          num: '',
          firstNum: '',
          answered: 'false'
        })
      } else{
        this.setState({
          num: ''+num,
          firstNum: ''+num,
          answered: 'false'
        })
      }
      
    } else{
      if(isNaN(num)){
        switch(num){
          default:
            this.setState({
              num: '',
              firstNum: this.state.firstNum + " "+ num+ " "
            })
            break;
          case "=":
            let ans = this.calculate(this.state.firstNum)
            this.setState({
              num: ans
            })
            break;
        }
        
      }else{
        this.setState({
          num: this.state.num + num,
          firstNum: this.state.firstNum + num
        })
      }
    }
    
  }

  render() {
    return (
      <View style={styles.container}>
      <View style={styles.answerBox}>
        <Text style={{ fontSize:60}}>{ this.state.num}</Text>
        {/* <Text>{this.state.firstNum}</Text>
        <Text>{this.state.answered}</Text> */}
      </View>
      <View style={{ flex: 4}}>
        <View style={styles.row}>
          <TouchableHighlight onPress={() => this.onPress(1)} style={styles.button} underlayColor={this.underC}>
            <View>
              <Text ref="1">1</Text>
            </View>
          </TouchableHighlight>
          <TouchableHighlight onPress={() => this.onPress(2)} style={styles.button} underlayColor={this.underC}>
            <View >
              <Text>2</Text>
            </View>
          </TouchableHighlight>
          <TouchableHighlight onPress={() => this.onPress(3)} style={styles.button} underlayColor={this.underC}>
            <View >
              <Text>3</Text>
            </View>
          </TouchableHighlight>
        </View>
        <View style={styles.row}>
          <TouchableHighlight onPress={() => this.onPress(4)} style={styles.button} underlayColor={this.underC}>
            <View>
              <Text>4</Text>
            </View>
          </TouchableHighlight>
          <TouchableHighlight onPress={() => this.onPress(5)} style={styles.button} underlayColor={this.underC}>
            <View >
              <Text>5</Text>
            </View>
          </TouchableHighlight>
          <TouchableHighlight onPress={() => this.onPress(6)} style={styles.button} underlayColor={this.underC}>
            <View >
              <Text>6</Text>
            </View>
          </TouchableHighlight>
        </View>
        <View style={styles.row}>
          <TouchableHighlight onPress={() => this.onPress(7)} style={styles.button} underlayColor={this.underC}>
            <View>
              <Text>7</Text>
            </View>
          </TouchableHighlight>
          <TouchableHighlight onPress={() => this.onPress(8)} style={styles.button} underlayColor={this.underC}>
            <View >
              <Text>8</Text>
            </View>
          </TouchableHighlight>
          <TouchableHighlight onPress={() => this.onPress(9)} style={styles.button} underlayColor={this.underC}>
            <View >
              <Text>9</Text>
            </View>
          </TouchableHighlight>
        </View>
        <View style={styles.row}>
          <TouchableHighlight onPress={() => this.onPress(0)} style={styles.button} underlayColor={this.underC}>
            <View>
              <Text>0</Text>
            </View>
          </TouchableHighlight>
          <TouchableHighlight onPress={() => this.onPress("+")} style={styles.button} underlayColor={this.underC}>
            <View >
              <Text>+</Text>
            </View>
          </TouchableHighlight>
          <TouchableHighlight onPress={() => this.onPress("-")} style={styles.button} underlayColor={this.underC}>
            <View >
              <Text>-</Text>
            </View>
          </TouchableHighlight>
        </View>
        <View style={styles.row}>
          <TouchableHighlight onPress={() => this.onPress("*")} style={styles.button} underlayColor={this.underC}>
            <View>
              <Text>*</Text>
            </View>
          </TouchableHighlight>
          <TouchableHighlight onPress={() => this.onPress("/")} style={styles.button} underlayColor={this.underC}>
            <View >
              <Text>/</Text>
            </View>
          </TouchableHighlight>
          <TouchableHighlight onPress={() => this.onPress("=")} style={styles.button} underlayColor={this.underC}>
            <View >
              <Text>=</Text>
            </View>
          </TouchableHighlight>
        </View>
      </View>
    </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  answerBox: {
    flex: 1, 
    backgroundColor: '#b79bff',
    marginTop: 50, 
    marginLeft: 5, 
    marginRight: 5,
    marginBottom:5, 
    borderRadius: 5,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    paddingEnd: 10,
    
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    marginBottom: 10,
  },
  button: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#9bb1ff',
    margin: 5,
    borderRadius: 5,
  },
});
