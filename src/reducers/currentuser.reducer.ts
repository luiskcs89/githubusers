//currentuser state reducer

import * as currentuser from '../actions/currentuser.actions';

export function CurrentUserReducer(state = [], action) {  
    switch(action.type) {
        case currentuser.LOAD_CURRENT_USER_SUCCESS:
            return action.payload;
        case currentuser.CLEAR_CURRENT_USER:
        	return null;
        default:
            return state;
    };
}