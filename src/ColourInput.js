import React, { Component } from 'react';

export default class ColourInput extends Component {

    constructor(props) {
        super();
        this.changeHSL = this.changeHSL.bind(this)
        this.state = {
            hue: props.initialHue,
            saturation: props.initialSaturation,
            brightness: props.initialBrightness,
            hex: '#ABCDEF'
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
        const {value, id} = event.target;
        let formattedValue = value;
        if (id !== 'hue') {
            formattedValue = `${value}%`;
        }
        const newState = {};
        newState[id] = value;
        this.setState(newState);
        document.documentElement.style.setProperty(`--${this.props.target}_${id}`, formattedValue);
    }

    calculateContrast(){

    }

}