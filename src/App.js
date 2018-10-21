import React, { Component } from "react";
import ColorInput from "./ColorInput";

class App extends Component {
  constructor() {
    super();

    this.state = {
      rgbText: [1, 1, 1],
      rgbBackground: [0, 0, 0],
      contrast: 21,
      pangram: this.getRandomPangram()
    };

    this.contrast = this.contrast.bind(this);
    this.luminance = this.luminance.bind(this);
    this.onColorChange = this.onColorChange.bind(this);
    this.onBackgroundColorChange = this.onBackgroundColorChange.bind(this);
    this.onTextColorChange = this.onTextColorChange.bind(this);
  }

  render() {
    const { contrast, pangram } = this.state;
    return (
      <div className="App">
        <div className="info">
          <div className="logo">
            <svg version="1.1" id="icon" x="0px" y="0px" width="0px" height="0px" viewBox="0 0 32 32" enable-background="new 0 0 32 32">
              <path id="half1" fill="#FFFFFF" d="M27.335,4.708c6.249,6.249,6.248,16.379,0,22.627c-6.249,6.249-16.378,6.249-22.627,0.001"/>
              <path id="half2" d="M27.335,4.708c-6.364-6.364-16.379-6.249-22.627,0c-6.248,6.249-6.363,16.263,0,22.628L27.335,4.708z"/>
            </svg>
            TRAST
          </div>
        </div>
        <div className="info">
          <span className="result">{contrast >= 4.5 ? "Pass" : "Fail"}</span>
          <span className="ratio">{`${contrast.toFixed(1)}:1`}</span>
          <span className="grade">
            {contrast >= 7 ? "AAA" : contrast >= 4.5 ? "AA" : ""}
          </span>
        </div>
        <div className="info">{pangram}</div>
        <div className="color-inputs">
          <ColorInput
            target="background"
            initialHue={0}
            initialSaturation={50}
            initialBrightness={0}
            onColorChange={this.onBackgroundColorChange}
          />
          <ColorInput
            target="text"
            initialHue={0}
            initialSaturation={50}
            initialBrightness={100}
            onColorChange={this.onTextColorChange}
          />
        </div>
        <div className="footer">
          Made with ♥ by <a href="https://www.zahratraboulsi.com" target="_blank">Zahra</a> and <a href="https://syeefkarim.com" target="_blank">Syeef</a>
        </div>
      </div>
    );
  }

  contrast(rgb1, rgb2) {
    const luminance1 = this.luminance(rgb1[0], rgb1[1], rgb1[2]);
    const luminance2 = this.luminance(rgb2[0], rgb2[1], rgb2[2]);
    const lighter = Math.max(luminance1, luminance2);
    const darker = Math.min(luminance1, luminance2);
    
    return (lighter + 0.05) / (darker + 0.05);
  }

  onColorChange(rgb1, rgb2) {
    const contrast = this.contrast(rgb1, rgb2);
    this.setState({ contrast: contrast });
  }

  onBackgroundColorChange(r, g, b) {
    this.setState({ rgbBackground: [r, g, b] });
    this.onColorChange(this.state.rgbText, [r, g, b]);
  }

  onTextColorChange(r, g, b) {
    this.setState({ rgbText: [r, g, b] });
    this.onColorChange([r, g, b], this.state.rgbBackground);
  }

  luminance(r, g, b) {
    const a = [r, g, b].map(v => {
      return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
    });
    return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
  }

  getRandomPangram() {
    const pangrams = [
      "How quickly daft jumping zebras vex.",
      "Go, lazy fat vixen; be shrewd, jump quick.",
      "Fix problems quickly with galvanized jets.",
      "Pack my red box with five dozen quality jugs."
    ];

    const pangramIndex = Math.round(Math.random() * 3);
    return pangrams[pangramIndex];
  }
}

export default App;
