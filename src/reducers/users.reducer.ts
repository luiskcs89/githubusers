import { ActionReducer, Action } from '@ngrx/store';
import * as users from '../actions/users.actions';

export function UsersReducer(state = [], action) {  
    switch(action.type) {
        case users.LOAD_USERS_SUCCESS:
            return [...state, ...action.payload];
        case users.LOAD_USER_SUCCESS:
            return state.map(user => {
                return user.id === action.payload.id ? Object.assign({}, user, user.payload) : user;
            });
        default:
            return state;
    };
}