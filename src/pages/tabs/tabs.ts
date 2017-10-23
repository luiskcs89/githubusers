import { Component } from '@angular/core';

import { ListPage } from '../list/list';
import { UserSearchPage } from '../usersearch/usersearch';

import { Store } from '@ngrx/store'; 
import { AppState } from '../../services/app-state';
import * as currentuser from '../../actions/currentuser.actions';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = ListPage;
  tab2Root = UserSearchPage;

  constructor(private store: Store<AppState>) {

  }

  clearCurrentUser() {
  	console.log("clear");
  	this.store.dispatch(new currentuser.ClearCurrentUserAction());
  }
}
