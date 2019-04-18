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


/**
 * This is how the components are connected to the state
 *
 * The syntax is a little odd.
 *
 * The function connect takes one required parameter and one optional parameter and returns a function
 * that accepts as an argument a class derived from React.Component.
 *
 * The first function has one parameter, the state, and returns an object with the keys as attributes
 * that the component is expecting.  For the example here, _ColorPicker has an attribute
 * 'selectedColor'.  Given the state, we can return the needed value to define the component properties.
 *
 * The second optional parameter is a function with parameter dispatch.  This is how we can apply changes to
 * the store.  dispatch is a function that takes an object argument that has a key 'type' as a string as well as
 * any additional keys expected by the reducer.  Here, the reducer 'theColor' defined in store.ts will be triggered
 * by calling
 * dispatch({type: actions.CHANGE_COLOR, newColor: theColor});
 * The reducer expects the action to have the 'newColor' key.
 *
 * Review the _ColorPicker class to see how the colorChanged funtion is called within the
 * select element's onChange function.
 *
 */
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