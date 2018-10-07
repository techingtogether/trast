import React, { Component } from 'react';

export default class ColourInput extends Component {
    render() {
        return (
        <div>
            <h3>{this.props.target}</h3>
            <label>Hue</label>
            <input id='hue' name='hue' type='range'/>
            <label>Saturation</label>
            <input id='saturation' name='saturation' type='range'/>
            <label>Brightness</label>
            <input id='brightness' name='brightness' type='range'/>
        </div>
        );
      }

}