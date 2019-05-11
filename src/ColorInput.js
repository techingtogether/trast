import React, { Component } from "react";
import { hslToRgb, rgbToHex, hslToHex } from './ColorUtils.js';

export default class ColorInput extends Component {
  constructor(props) {
    super();
    this.changeHSL = this.changeHSL.bind(this);
    this.copyHexToClipboard = this.copyHexToClipboard.bind(this);
    this.state = {
      hue: props.initialHue,
      saturation: props.initialSaturation,
      lightness: props.initialLightness,
      hex: hslToHex(
        props.initialHue,
        props.initialSaturation,
        props.initialLightness
      )
    };

    const stylesheet = document.documentElement.style;
    stylesheet.setProperty(`--${props.target}_hue`, props.initialHue);
    stylesheet.setProperty(
      `--${props.target}_saturation`,
      `${props.initialSaturation}%`
    );
    stylesheet.setProperty(
      `--${props.target}_lightness`,
      `${props.initialLightness}%`
    );
  }

  render() {
    return (
      <div className="color-input">
        <div className="control-header">
            <span className="selector-name">{this.props.target}</span>
            <button className={`hex ${this.props.target}`} onClick={this.copyHexToClipboard}>
            {this.state.hex}
            </button>
        </div>
        <div className="control">
          <label className="property">Hue</label>
          <label className="value">{`${this.state.hue}°`}</label>
          <input
            id="hue"
            name="hue"
            type="range"
            min="0"
            max="360"
            value={this.state.hue}
            onChange={this.changeHSL}
          />
        </div>
        <div className="control">
          <label className="property">Saturation</label>
          <label className="value">{this.state.saturation}</label>
          <input
            id="saturation"
            name="saturation"
            type="range"
            min="0"
            max="100"
            value={this.state.saturation}
            onChange={this.changeHSL}
          />
        </div>
        <div className="control">
          <label className="property">Lightness</label>
          <label className="value">{this.state.lightness}</label>
          <input
            id="lightness"
            name="lightness"
            type="range"
            min="0"
            max="100"
            value={this.state.lightness}
            onChange={this.changeHSL}
          />
        </div>
      </div>
    );
  }

  changeHSL(event) {
    let { value, id } = event.target;
    value = Number(value);

    const formattedValue = id !== "hue" ? `${value}%` : value;
    const newState = {};
    newState[id] = value;

    const hue = id === "hue" ? value : this.state.hue;
    const saturation = id === "saturation" ? value : this.state.saturation;
    const lightness = id === "lightness" ? value : this.state.lightness;

    const [r, g, b] = hslToRgb(hue, saturation, lightness);

    newState.hex = rgbToHex(r, g, b);
    this.setState(newState);
    this.props.onColorChange(hue, saturation, lightness);

    document.documentElement.style.setProperty(
      `--${this.props.target}_${id}`,
      formattedValue
    );
  }

  copyHexToClipboard() {
    const hexElement = document.getElementsByClassName(`hex ${this.props.target}`)[0];
    const range = document.createRange();  
    range.selectNode(hexElement);  
    window.getSelection().addRange(range);

    document.execCommand('copy');
  };
}
