import React, { Component } from "react";
import ColorInput from "./ColorInput";
import { calculateContrast } from "./ColorUtils.js";

class App extends Component {
  constructor() {
    super();

    this.state = {
      hslText: [0, 50, 100],
      hslBackground: [0, 0, 0],
      contrast: 21,
      pangram: this.getRandomPangram()
    };

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
            <svg
              version="1.1"
              id="icon"
              x="0px"
              y="0px"
              width="0px"
              height="0px"
              viewBox="0 0 32 32"
              enableBackground="new 0 0 32 32"
            >
              <path
                id="half1"
                fill="#FFFFFF"
                d="M27.335,4.708c6.249,6.249,6.248,16.379,0,22.627c-6.249,6.249-16.378,6.249-22.627,0.001"
              />
              <path
                id="half2"
                d="M27.335,4.708c-6.364-6.364-16.379-6.249-22.627,0c-6.248,6.249-6.363,16.263,0,22.628L27.335,4.708z"
              />
            </svg>
            TRAST
          </div>
        </div>
        <div className="info">
          <span className="result">{contrast >= 3 ? "Pass" : "Fail"}</span>
          <span className="ratio">{this.stringifyContrast(contrast)}</span>
          <span className="grade">{this.resultForContrast(contrast)}</span>
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
        <footer>
          Made with ♥ by <a href="https://www.zahratraboulsi.com">Zahra</a> and{" "}
          <a href="https://syeefkarim.com">Syeef</a> for <a href="https://www.techingtogether.com">Teching Together</a>.
        </footer>
      </div>
    );
  }

  stringifyContrast(contrast) {
    const contrastString = contrast.toFixed(1);
    if (contrastString.endsWith("0")) {
      return `${contrastString.slice(0, -2)}:1`;
    }
    return `${contrastString}:1`;
  }

  resultForContrast(contrast) {
    if (contrast >= 7) {
      return "AAA";
    } else if (contrast >= 4.5) {
      return "AA";
    } else if (contrast >= 3) {
      return "AA Large";
    }
  }

  onColorChange(hsl1, hsl2) {
    const contrast = calculateContrast(hsl1, hsl2);
    this.setState({ contrast: contrast });
  }

  onBackgroundColorChange(h, s, l) {
    this.setState({ hslBackground: [h, s, l] });
    this.onColorChange(this.state.hslText, [h, s, l]);
  }

  onTextColorChange(h, s, l) {
    this.setState({ hslText: [h, s, l] });
    this.onColorChange([h, s, l], this.state.hslBackground);
  }

  getRandomPangram() {
    const pangrams = [
      "How quickly daft jumping zebras vex.",
      "Zephyrs may blow five tjalks during a coming equinox.",
      "Quickly juxtapose fonts with varied z-heights, maybe?",
      "Nix the vectorized artwork files, just use bitmaps quite sparingly.",
      "Fix problems quickly with galvanized jets.",
      "Pack my red box with five dozen quality jugs."
    ];

    const pangramIndex = Math.round(Math.random() * (pangrams.length-1));
    return pangrams[pangramIndex];
  }
}

export default App;
