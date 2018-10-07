import React, { Component } from 'react';

export default class ColourInput extends Component {

    constructor() {
        super();
        this.changeHSL = this.changeHSL.bind(this)
        this.state = {
            hue: 0,
            saturation: 0,
            brightness: 0,
            hex: '#ABCDEF'
        }
    }

    render() {
        return (
        <div className="color-input">
            <h4>{this.props.target}</h4>
            <h3>{this.state.hex}</h3>
            <div class='control'>
                <label class='property'>Hue</label>
                <label class='value'>{this.state.hue}</label>
                <input id='hue' name='hue' type='range' min="0" max="360" value={this.state.hue} onChange={this.changeHSL}/>
            </div>
            <div class='control'>
                <div class='labels'>
                    <label class='property'>Saturation</label>
                    <label class='value'>{this.state.saturation}</label>
                    <input id='saturation' name='saturation' type='range' min="0" max="100" value={this.state.saturation} onChange={this.changeHSL}/>
                </div>
            </div>
            <div class='control'>
                <label class='property'>Brightness</label>
                <label class='value'>{this.state.brightness}</label>
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