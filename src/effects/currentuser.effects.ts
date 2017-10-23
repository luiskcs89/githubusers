//Effects for the currentUser State

import { Injectable } from '@angular/core';  
import { Effect, Actions } from '@ngrx/effects';  
import { Observable } from 'rxjs/rx';

import { UserService } from '../services/user.service';
import * as currentuser from '../actions/currentuser.actions';

@Injectable()
export class CurrentUserEffects {

    constructor(
        private actions$: Actions,
        private svc: UserService
    ) { }

    //Starts by the LoadCurrentUserAction
    @Effect() loadCurrentUser$ = this.actions$
    .ofType(currentuser.LOAD_CURRENT_USER)
    .switchMap((action: currentuser.LoadCurrentUserAction) => {
      //Gets the user data based on its login name
      return this.svc.getUser(action.login).switchMap(result => {
        //Starts the LoadCurrentUserSuccessAction
        return Observable.of(new currentuser.LoadCurrentUserSuccessAction(result))
      }).catch((e) => {
        //handle error and run the error action
        return Observable.of(new currentuser.LoadCurrentUserErrorAction(e));
      })
    }).share();

}