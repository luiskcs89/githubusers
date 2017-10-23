//Effects for the users State

import { Injectable } from '@angular/core';  
import { Effect, Actions } from '@ngrx/effects';  
import { Observable } from 'rxjs/rx';

import { UserService } from '../services/user.service';  
import * as users from '../actions/users.actions';

@Injectable()
export class UsersEffects {

    constructor(
        private actions$: Actions,
        private svc: UserService
    ) { }

    //Starts by the LoadUsersAction
    @Effect() loadUsers$ = this.actions$
    .ofType(users.LOAD_USERS)
    .switchMap((action: users.LoadUsersAction) => {
      //Gets the users data
      return this.svc.getUsers(action.since).switchMap(result => {
        //Starts the LoadUsersSuccessAction
        return Observable.of(new users.LoadUsersSuccessAction(result))
      }).catch((e) => {
        //handle error and run the error action
        return Observable.of(new users.LoadUsersErrorAction(e));
      })
    }).share();

}