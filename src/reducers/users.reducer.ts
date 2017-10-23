//users state reducer

import { ActionReducer, Action } from '@ngrx/store';
import * as users from '../actions/users.actions';

export function UsersReducer(state = [], action) {  
    switch(action.type) {
        case users.LOAD_USERS_SUCCESS:
            return [...state, ...action.payload];
        default:
            return state;
    };
}