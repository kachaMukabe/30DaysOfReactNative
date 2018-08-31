import React from 'react';
import { StyleSheet } from 'react-native';
import {Col, Row, Grid} from 'react-native-easy-grid';

export default class App extends React.Component {
  gridNum = 40;

  constructor(props){
    super(props);
    
    this.state = {
      board: []
    }
    setInterval(this.run, 1000);
  }
  componentDidMount(){
    let board = this.setupBoard();
    this.setState({board: board})
  }

  setupBoard = () =>{
    let board = new Array(this.gridNum);
    for (i = 0; i < this.gridNum; i++){
      board[i] = new Array(this.gridNum);
    }
    for(x=0; x< this.gridNum; x++){
      for(y=0; y < this.gridNum; y++){
        board[x][y] = {
          cell:Math.floor(Math.random()*2), 
          n:0
        };
      }
    }
    return board;
  }

  run = () => {
    this.checkNeighbours();
    this.newBoard();
  }

  checkNeighbours = () => {
    let oldBoard = this.state.board
    for(x=1; x< this.gridNum-1; x++){
      for(y=1; y < this.gridNum-1; y++){
        
        for(i=-1; i< 2; i++){
          for(j=-1; j < 2; j++){
            oldBoard[x][y].n += oldBoard[(x+i)][(y+j)].cell
          }
        }
        oldBoard[x][y].n -= oldBoard[x][y].cell
      }
    }
    this.setState({board: oldBoard})
  }

  newBoard = () => {
    let oldBoard = this.state.board
    let board = this.setupBoard()
    for(let a = 0; a < this.gridNum; a++){
      for(let b=0; b<this.gridNum;b++){
        board[a][b] = {cell:0, n:0}
      }
    }
    for(x=1; x< this.gridNum-1; x++){
      for(y=1; y < this.gridNum-1; y++){

        if((oldBoard[x][y].cell == 1) && oldBoard[x][y].n < 2){
          board[x][y].cell = 0
        } else if((oldBoard[x][y].cell == 1) && oldBoard[x][y].n > 3){
          board[x][y].cell = 0
        } else if((oldBoard[x][y].cell == 0) && oldBoard[x][y].n == 3){
          board[x][y].cell = 1
        } else if((oldBoard[x][y].cell == 1)&& (oldBoard[x][y].n == 3 || oldBoard[x][y].n == 2)){
          board[x][y].cell = 1
        } else{
          board[x][y].cell = oldBoard[x][y].cell
        }
      }
    }
    this.setState({board: board})
  }

  render() {
    if(this.state.board != null){
    }
    return (
      <Grid style={styles.container} >
        {this.state.board.map((row, key)=>{
          return <Col key={key}>{row.map((cell, key)=>{
            return <Row style={{backgroundColor:cell.cell==1?'#00FFFF':'#FFF', margin:1}} key={key}></Row>
          })}</Col>
        })}
      </Grid>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop:22,
  },
});
