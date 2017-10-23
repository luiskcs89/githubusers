import { Injectable } from '@angular/core';  
import { Effect, toPayload, Actions } from '@ngrx/effects';  
import { Observable } from 'rxjs/rx';

import { UserService } from '../services/user.service';  
import { User } from '../models/user';
import * as users from '../actions/user.actions';

@Injectable()
export class UserEffects {

    constructor(
        private actions$: Actions,
        private svc: UserService
    ) { }

    @Effect() loadUsers$ = this.actions$
    .ofType(users.LOAD_USERS)
    .switchMap(action => {
        console.log('in the first switchMap!');
      return this.svc.getUsers(action.since);    
    }).switchMap(result => {
      console.log(result);
      return Observable.of(new users.LoadUsersSuccessAction(result))
    })

}