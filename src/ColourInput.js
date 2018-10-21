import React, { Component } from "react";
import {hslToRgb, rgbToHex, hslToHex} from './ColourUtils.js';

export default class ColourInput extends Component {
  constructor(props) {
    super();
    this.changeHSL = this.changeHSL.bind(this);
    this.state = {
      hue: props.initialHue,
      saturation: props.initialSaturation,
      brightness: props.initialBrightness,
      hex: hslToHex(
        props.initialHue,
        props.initialSaturation,
        props.initialBrightness
      )
    };

    const stylesheet = document.documentElement.style;
    stylesheet.setProperty(`--${props.target}_hue`, props.initialHue);
    stylesheet.setProperty(
      `--${props.target}_saturation`,
      `${props.initialSaturation}%`
    );
    stylesheet.setProperty(
      `--${props.target}_brightness`,
      `${props.initialBrightness}%`
    );
  }

  render() {
    return (
      <div className="color-input">
        <div className="control-header">
            <span class="selector-name">{this.props.target}</span>
            <button className="hex" onClick={() => navigator.clipboard.writeText(this.state.hex)}>
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
          <label className="property">Brightness</label>
          <label className="value">{this.state.brightness}</label>
          <input
            id="brightness"
            name="brightness"
            type="range"
            min="0"
            max="100"
            value={this.state.brightness}
            onChange={this.changeHSL}
          />
        </div>
      </div>
    );
  }

  changeHSL(event) {
    let { value, id } = event.target;
    value *= 1;

    const formattedValue = id !== "hue" ? `${value}%` : value;
    const newState = {};
    newState[id] = value;

    const hue = id === "hue" ? value : this.state.hue;
    const saturation = id === "saturation" ? value : this.state.saturation;
    const brightness = id === "brightness" ? value : this.state.brightness;

    const [r, g, b] = hslToRgb(hue, saturation, brightness);

    const hex = rgbToHex(r, g, b);
    this.props.onColorChange(r, g, b);
    newState.hex = hex;
    this.setState(newState);
    document.documentElement.style.setProperty(
      `--${this.props.target}_${id}`,
      formattedValue
    );
  }
}
