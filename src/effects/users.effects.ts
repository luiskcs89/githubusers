//Effects for the users State

import { Injectable } from '@angular/core';  
import { Effect, toPayload, Actions } from '@ngrx/effects';  
import { Observable } from 'rxjs/rx';

import { UserService } from '../services/user.service';  
import { User } from '../models/user';
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
      return this.svc.getUsers(action.since);    
    }).switchMap(result => {
      //Starts the LoadUsersSuccessAction
      return Observable.of(new users.LoadUsersSuccessAction(result))
    })

}