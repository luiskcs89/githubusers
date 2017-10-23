import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Store } from '@ngrx/store';

import { AppState } from '../../services/app-state';  
import * as users from '../../actions/user.actions';

import { User } from '../models/user';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {

  public users: Observable<User[]>;

  constructor(public navCtrl: NavController, private store: Store<AppState>) {
  	this.store.dispatch(new users.LoadUsersAction(0));

  	this.users = this.store.select('users');
  }

}
