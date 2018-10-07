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
        <div className='results'>
          <span className='result'>{this.state.pass ? 'Pass' : 'Fail'}</span>
          <span className='ratio'>7:7:1</span>
          <span className='grade'>AA</span>
        </div>
        <ColourInput target='background' initialHue={0} initialSaturation={50} initialBrightness={0}/>
        <ColourInput target='text' initialHue={0} initialSaturation={50} initialBrightness={100}/>
      </div>
    );
  }
}

export default App;
