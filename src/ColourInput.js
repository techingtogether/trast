import React, { Component } from 'react';

export default class ColourInput extends Component {

    constructor(props) {
        super();
        this.changeHSL = this.changeHSL.bind(this)
        this.state = {
            hue: props.initialHue,
            saturation: props.initialSaturation,
            brightness: props.initialBrightness,
            hex: this.hslToHex(props.initialHue, props.initialSaturation, props.initialBrightness)
        }

        const stylesheet = document.documentElement.style;
        stylesheet.setProperty(`--${props.target}_hue`, props.initialHue);
        stylesheet.setProperty(`--${props.target}_saturation`, `${props.initialSaturation}%`);
        stylesheet.setProperty(`--${props.target}_brightness`, `${props.initialBrightness}%`);
    }

    render() {
        return (
        <div className="color-input">
            <h4>{this.props.target}</h4>
            <h3>{this.state.hex}</h3>
            <div className='control'>
                <label className='property'>Hue</label>
                <label className='value'>{this.state.hue}</label>
                <input id='hue' name='hue' type='range' min="0" max="360" value={this.state.hue} onChange={this.changeHSL}/>
            </div>
            <div className='control'>
                <label className='property'>Saturation</label>
                <label className='value'>{this.state.saturation}</label>
                <input id='saturation' name='saturation' type='range' min="0" max="100" value={this.state.saturation} onChange={this.changeHSL}/>
            </div>
            <div className='control'>
                <label className='property'>Brightness</label>
                <label className='value'>{this.state.brightness}</label>
                <input id='brightness' name='brightness' type='range' min="0" max="100" value={this.state.brightness} onChange={this.changeHSL}/>
            </div>
        </div>
        );
    }

    changeHSL(event) {
        let {value, id} = event.target;
        value *= 1;

        const formattedValue = id !== 'hue' ? `${value}%` : value;
        const newState = {};
        newState[id] = value;

        const hue = id === 'hue' ? value : this.state.hue;
        const saturation = id === 'saturation' ? value : this.state.saturation;
        const brightness = id === 'brightness' ? value : this.state.brightness;

        const [r, g, b] = this.hslToRgb(hue, saturation, brightness);

        const hex = this.rgbToHex(r, g, b);
        this.props.onColorChange(r, g, b);
        newState.hex = hex;
        this.setState(newState);
        document.documentElement.style.setProperty(`--${this.props.target}_${id}`, formattedValue);
    }

    hslToRgb(h, s, l) {
        h /= 360;
        s /= 100;
        l /= 100;
        let r, g, b;
        if (s === 0) {
          r = g = b = l; // achromatic
        }
        else {
          const hue2rgb = (p, q, t) => {
            if (t < 0) t += 1;
            if (t > 1) t -= 1;
            if (t < 1 / 6) return p + (q - p) * 6 * t;
            if (t < 1 / 2) return q;
            if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
            return p;
          };
          const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
          const p = 2 * l - q;
          r = hue2rgb(p, q, h + 1 / 3);
          g = hue2rgb(p, q, h);
          b = hue2rgb(p, q, h - 1 / 3);
        }
        return [r, g, b];
        
    }

    rgbToHex(r, g, b) {
        const toHex = x => {
            const hex = Math.round(x * 255).toString(16);
            return hex.length === 1 ? '0' + hex : hex;
          };
        return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
    }

    hslToHex(h, s, l) {
        const rgb = this.hslToRgb(h, s, l);
        const [r, g, b] = rgb;
        return this.rgbToHex(r, g, b)
    }

}