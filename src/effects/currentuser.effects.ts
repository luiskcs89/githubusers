import { Injectable } from '@angular/core';  
import { Effect, toPayload, Actions } from '@ngrx/effects';  
import { Observable } from 'rxjs/rx';

import { UserService } from '../services/user.service';  
import { User } from '../models/user';
import * as currentuser from '../actions/currentuser.actions';

@Injectable()
export class CurrentUserEffects {

    constructor(
        private actions$: Actions,
        private svc: UserService
    ) { }

    @Effect() loadCurrentUser$ = this.actions$
    .ofType(currentuser.LOAD_CURRENT_USER)
    .switchMap((action: currentuser.LoadCurrentUserAction) => {
        console.log('in the first switchMap!');
      return this.svc.getUser(action.login);    
    }).switchMap(result => {
      console.log(result);
      return Observable.of(new currentuser.LoadCurrentUserSuccessAction(result))
    })

}