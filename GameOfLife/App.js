import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import {Col, Row, Grid} from 'react-native-easy-grid';

export default class App extends React.Component {

  constructor(props){
    super(props)
    let board = new Array(20)
    for (i = 0; i < 20; i++){
      board[i] = new Array(20)
    }
    for(x=0; x< 20; x++){
      for(y=0; y < 20; y++){
        switch(Math.floor(Math.random() * 2)){
          case 0:
            board[x][y] = '#fff'
            break;
          case 1:
            board[x][y] = '#00FFFF'
            break;
        }
      }
    }
    this.state = {
      board: board
    }
    setInterval(this.newBoard, 2000)
    
  }

  newBoard =()=>{
    let oldBoard = this.state.board
    console.log(oldBoard)
    let board = new Array(20)
    for (i = 0; i < 20; i++){
      board[i] = new Array(20)
    }
    for(x=0; x< 20; x++){
      for(y=0; y < 20; y++){
        neighbours = 0
        for(i=-1; i< 1; i++){
          for(j=-1; j < 1; j++){
            switch(oldBoard[(x+i+20)%20][(y+j+20)%20]){
              case '#fff':
                neighbours += 0
                break;
              case '#00FFFF':
                neighbours += 1
                break;
            }
          }
        }
        if(oldBoard[x][y] == '#00FFFF'){
          neighbours -= 1
        }

        if((oldBoard[x][y] == '#00FFFF') && neighbours < 2){
          board[x][y] = '#fff'
        } else if((oldBoard[x][y] == '#00FFFF') && neighbours > 3){
          board[x][y] = '#fff'
        } else if((oldBoard[x][y] == '#fff') && neighbours == 3){
          board[x][y] = '#00FFFF'
        } else{
          board[x][y] = oldBoard[x][y]
        }
      }
    }
    this.setState({board: board})
  }

  render() {
    if(this.state.board != null){
    }
    return (
      <Grid style={styles.container}>
        {this.state.board.map((row, key)=>{
          return <Col key={key}>{row.map((cell, key)=>{
            return <Row style={{backgroundColor:cell, margin:1}} key={key}></Row>
          })}</Col>
        })}
      </Grid>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 22,
  },
});
