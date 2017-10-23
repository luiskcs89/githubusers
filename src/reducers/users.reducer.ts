//users state reducer

import * as users from '../actions/users.actions';

export function UsersReducer(state = [], action) {  
    switch(action.type) {
        case users.LOAD_USERS_SUCCESS:
            return [...state, ...action.payload.slice(0, 12)];
        default:
            return state;
    };
}