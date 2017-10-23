import { ActionReducer, Action } from '@ngrx/store';
import * as users from '../actions/user.actions';

//let nextId = 0;

export function UsersReducer(state = [], action) {  
    switch(action.type) {
        /*case BirthdayActions.ADD_BIRTHDAY:
            return [...state, Object.assign({}, action.payload, { id: nextId++ })];
        case BirthdayActions.UPDATE_BIRTHDAY:
            return state.map(birthday => {
                return birthday.id === action.payload.id ? Object.assign({}, birthday, action.payload) : birthday;
            });
        case BirthdayActions.DELETE_BIRTHDAY:
            return state.filter(birthday => birthday.id !== action.payload.id);*/
        case users.LOAD_USERS_SUCCESS:
            console.log("In reducer");
            console.log(action);
            return action.payload;
        default:
            return state;
    };
}