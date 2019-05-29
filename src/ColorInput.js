import React, { Component } from "react";
import { hslToRgb, rgbToHex, hslToHex, isValidHex, hexToHsl } from './ColorUtils.js';

export default class ColorInput extends Component {
  constructor(props) {
    super();

    this.changeHsl = this.changeHsl.bind(this);
    this.changeHslFromText = this.changeHslFromText.bind(this);
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

    this.setTargetProperty('hue', props.initialHue, props);
    this.setTargetProperty('saturation', `${props.initialSaturation}%`, props);
    this.setTargetProperty('lightness', `${props.initialLightness}%`, props);
  }

  render() {
    return (
      <div className="color-input">
        <div className="control-header">
            <span className="selector-name">{this.props.target}</span>
            <div className="selector-input">
              <input
                className={`hex ${this.props.target}`}
                value={this.state.hex}
                size={7}
                maxLength={7}
                onChange={this.changeHslFromText}
              />
              <button className="clipboard" onClick={this.copyHexToClipboard}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M7 13h10v1h-10v-1zm15-11v22h-20v-22h3c1.229 0 2.18-1.084 3-2h8c.82.916 1.771 2 3 2h3zm-11 1c0 .552.448 1 1 1s1-.448 1-1-.448-1-1-1-1 .448-1 1zm9 15.135c-1.073 1.355-2.448 2.763-3.824 3.865h3.824v-3.865zm0-14.135h-4l-2 2h-3.898l-2.102-2h-4v18h7.362c4.156 0 2.638-6 2.638-6s6 1.65 6-2.457v-9.543zm-13 12h5v-1h-5v1zm0-4h10v-1h-10v1zm0-2h10v-1h-10v1z"/></svg>
              </button>
            </div>
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
            onChange={this.changeHsl}
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
            onChange={this.changeHsl}
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
            onChange={this.changeHsl}
          />
        </div>
      </div>
    );
  }

  changeHsl(event) {
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

    this.setTargetProperty(id, formattedValue);
  }

  changeHslFromText(event) {
    let value = event.target.value;
    const newState = {
      hex: value
    };

    if (isValidHex(value)) {
      if (!value.startsWith('#')) {
        value = `#${value}`;
      }

      const [hue, saturation, lightness] = hexToHsl(value);

      newState.hue = hue;
      newState.saturation = saturation;
      newState.lightness = lightness;

      this.props.onColorChange(hue, saturation, lightness);

      this.setTargetProperty('hue', hue);
      this.setTargetProperty('saturation', `${saturation}%`);
      this.setTargetProperty('lightness', `${lightness}%`);
    }

    this.setState(newState);
  }

  copyHexToClipboard() {
    const hexElement = document.getElementsByClassName(`hex ${this.props.target}`)[0];
    const range = document.createRange();  
    range.selectNode(hexElement);  
    window.getSelection().addRange(range);

    document.execCommand('copy');
  };

  setTargetProperty(id, value, props) {
    document.documentElement.style.setProperty(
      `--${props ? props.target : this.props.target}_${id}`,
      value
    );
  }
}
