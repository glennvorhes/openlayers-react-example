import {Action, combineReducers, createStore} from 'redux';
import * as actions from './actions';


interface iSetColor extends Action {
    newColor: string;
}



function theColor(state = 'green', action: iSetColor) {
    if (action.type === actions.CHANGE_COLOR) {
        return action.newColor
    } else {
        return state;
    }
}


export const store = createStore(combineReducers({theColor}));

export interface iState {
    theColor: string;
    theText: string;
}

export function getState(): iState {
    return store.getState() as iState;
}

