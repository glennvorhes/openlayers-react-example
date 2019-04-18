import React = require('react');
import {connect} from 'react-redux';
import {iState} from "./store";
import * as actions from './actions';

/**
 * Components defined as classes that extent React.Component
 *
 * The <> syntax after React,Component define the attributes and their types.
 * The atributes can be simple strings or numbers or complex objects such as an OpenLayers
 * map or layer
 */

class _ColorPicker extends React.Component<{ selectedColor: string, colorChanged: (theColor: string) => any }> {
    render() {
        return <div>
            <label style={{marginRight: '5px'}}>Color</label>
            <select value={this.props.selectedColor} onChange={(e) => {
                this.props.colorChanged(e.target.value);
            }
            }>
                <option value="red">Red</option>
                <option value="green">Green</option>
                <option value="blue">Blue</option>
            </select>
        </div>

    }
}

export const ColorPicker = connect(
    (s: iState) => {
        return {
            selectedColor: s.theColor
        }
    },
    (dispatch) => {
        return {
            colorChanged: (theColor: string) => {
                dispatch({type: actions.CHANGE_COLOR, newColor: theColor});
            }
        };
    }
)(_ColorPicker);

class _ColorLabel extends React.Component<{theColor: string}, {}>{


    render() {
        return <div>
            The color is {this.props.theColor}
        </div>
    }
}

export const ColorLabel = connect(
    (s: iState) => {
        return {
            theColor: s.theColor
        }
    }
)(_ColorLabel);