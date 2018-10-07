import React, { Component } from 'react';
import './App.css';
import ColourInput from './ColourInput';

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>a11ydentifier</h1>
        <h2>The quick brown fox jumps</h2>
        <h2>Pass: Grade AA</h2>
        <ColourInput target='Background'/>
        <ColourInput target='Text'/>
      </div>
    );
  }
}

export default App;
