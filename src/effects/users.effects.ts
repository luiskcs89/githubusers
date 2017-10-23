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

    @Effect() loadUsers$ = this.actions$
    .ofType(users.LOAD_USERS)
    .switchMap((action: users.LoadUsersAction) => {
        console.log('in the first switchMap!');
      return this.svc.getUsers(action.since);    
    }).switchMap(result => {
      console.log(result);
      return Observable.of(new users.LoadUsersSuccessAction(result))
    })

    @Effect() loadUser$ = this.actions$
    .ofType(users.LOAD_USER)
    .switchMap((action: users.LoadUserAction) => {
        console.log('in the first switchMap!');
      return this.svc.getUser(action.login);    
    }).switchMap(result => {
      console.log(result);
      return Observable.of(new users.LoadUserSuccessAction(result))
    })

}