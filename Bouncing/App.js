import React from 'react';
import { ProcessingView } from 'expo-processing';

export default class App extends React.Component {
  render() {
    return (
      <ProcessingView style={{ flex: 1 }} sketch={this._sketch} />
    );
  }
  
  _sketch = (p) => {
    let location= null
    let velocity = null
    let gravity = null
    p.setup = () => {
      location = new p.PVector(100,100)
      velocity = new p.PVector(1.5,2.1)
      gravity = new p.PVector(0,0.2)
      p.background(255);
    }

    p.draw = () => {
      
      //background(0);
  
      // Add velocity to the location.
      location.add(velocity);
      // Add gravity to velocity
      velocity.add(gravity);
      
      // Bounce off edges
      if ((location.x > p.width) || (location.x < 0)) {
        velocity.x = velocity.x * -1;
      }
      if (location.y > p.height) {
        // We're reducing velocity ever so slightly 
        // when it hits the bottom of the window
        velocity.y = velocity.y * -0.95; 
        location.y = p.height;
      }

      // Display circle at location vector
      p.stroke(255);
      p.strokeWeight(2);
      p.fill(Math.abs(velocity.y), Math.abs(location.x), Math.abs(location.y));
      p.ellipse(location.x,location.y,48,48);
    }
  }
}