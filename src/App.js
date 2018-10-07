import React, { Component } from 'react';
import './App.css';
import ColourInput from './ColourInput';

class App extends Component {
  constructor() {
    super();
    this.state = {
      pass: true
    }
  }

  render() {
    return (
      <div className="App">
        <h2>{this.state.pass ? 'Pass' : 'Fail'}</h2><h3>Grade AA</h3>
        <ColourInput target='background'/>
        <ColourInput target='text'/>
      </div>
    );
  }
}

export default App;
