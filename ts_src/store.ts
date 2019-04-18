/**
 * Defiition of the redux store
 */

import {Action, combineReducers, createStore} from 'redux';
import * as actions from './actions';

/**
 * TypeScript has a nice way of creating type definitions as interfaces.
 * Here the redus defined interface 'Action' has one key, "type" as a string.
 * We extend it here to add the additional key 'newColor' as a string
 */
interface iSetColor extends Action {
    newColor: string;
}

/**
 * Reducers
 *
 * Redux works by having "reducers".  Only one is defined here.  The reducers take
 * two parameters.  First the state, and an action which is an object having at minimum
 * the key 'type' as a string.
 *
 * The collection of reducers determines which reducer to use and what updates should be applied to the store
 */


/**
 * Reducers typically have a default value set for the state
 */
function theColor(state = 'green', action: iSetColor) {
    if (action.type === actions.CHANGE_COLOR) {
        return action.newColor
    } else {
        return state;
    }
}

/**
 * reducers are combined and the store is created.
 * A real application would have many reducers.
 */
export const store = createStore(combineReducers({theColor}));


/**
 * A trick I like to use is define the keys and types of the state that would otherwise be unknown to the IDE
 */
export interface iState {
    theColor: string;
    theText: string;
}

/**
 * Helper function to get the state
 */
export function getState(): iState {
    return store.getState() as iState;
}

