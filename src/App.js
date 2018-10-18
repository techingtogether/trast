import React, { Component } from 'react';
import './App.css';
import ColourInput from './ColourInput';

class App extends Component {
  constructor() {
    super();

    this.state = {
      rgbText: [1, 1, 1],
      rgbBackground: [0, 0, 0],
      contrast: 21,
      pangram: this.getRandomPangram(),
    }

    this.contrast = this.contrast.bind(this);
    this.luminance = this.luminance.bind(this);
    this.onColorChange = this.onColorChange.bind(this);
    this.onBackgroundColorChange = this.onBackgroundColorChange.bind(this);
    this.onTextColorChange = this.onTextColorChange.bind(this);
  }

  render() {
    const contrast = this.state.contrast
    return (
      <div className="App">
        <div className='results'>
          <span className='result'>{contrast >= 4.5 ? 'Pass' : 'Fail'}</span>
          <span className='ratio'>{`${contrast.toFixed(1)}:1`}</span>
          <span className='grade'>{contrast >= 7 ? 'AAA' : contrast >= 4.5 ? 'AA' : ''}</span>
        </div>
        <div className='results'>{this.state.pangram}</div>
        <ColourInput target='background' initialHue={0} initialSaturation={50} initialBrightness={0} onColorChange={this.onBackgroundColorChange}/>
        <ColourInput target='text' initialHue={0} initialSaturation={50} initialBrightness={100} onColorChange={this.onTextColorChange}/>
      </div>
    );
  }


  contrast(rgb1, rgb2) {
    return (this.luminance(rgb1[0], rgb1[1], rgb1[2]) + 0.05)
        / (this.luminance(rgb2[0], rgb2[1], rgb2[2]) + 0.05);
  }

  onColorChange(rgb1, rgb2) {
    const contrast = this.contrast(rgb1, rgb2);
    this.setState({contrast: contrast});
  }

  onBackgroundColorChange(r, g, b) {
    this.setState({rgbBackground: [r, g, b]})
    this.onColorChange(this.state.rgbText, [r, g, b]);
  }

  onTextColorChange(r, g, b) {
    this.setState({rgbText: [r, g, b]});
    this.onColorChange([r, g, b], this.state.rgbBackground);
  }

  luminance(r, g, b) {
    const a = [r, g, b].map(v => {
        return v <= 0.03928
            ? v / 12.92
            : Math.pow( (v + 0.055) / 1.055, 2.4 );
    });
    return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
  }

  getRandomPangram() {
    const pangrams = [
      'How quickly daft jumping zebras vex.',
      'Go, lazy fat vixen; be shrewd, jump quick.',
      'Fix problems quickly with galvanized jets.',
      'Pack my red box with five dozen quality jugs.'
    ];

    const pangramIndex = Math.round(Math.random() * 3);
    return pangrams[pangramIndex];
  }

}

export default App;
