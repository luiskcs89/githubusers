import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Store } from '@ngrx/store'; 
import { Observable } from 'rxjs/rx';

import { AppState } from '../../services/app-state';  
import * as users from '../../actions/users.actions';
import * as currentuser from '../../actions/currentuser.actions';

import { User } from '../../models/user';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {

  public users: User[];

  public infiniteScroll:any;

  constructor(public navCtrl: NavController, private store: Store<AppState>) {
  	this.store.dispatch(new users.LoadUsersAction(0));

  	this.store.select('users').subscribe(usersList => {
      this.users = usersList;
      if(this.infiniteScroll)
        this.infiniteScroll.complete();
    });
  }

  doInfinite(infiniteScroll) {
    console.log('Begin async operation');

    this.store.dispatch(new users.LoadUsersAction(this.users[this.users.length-1].id));

    this.infiniteScroll = infiniteScroll;
  }

  openDetail(login:string) {
    this.store.dispatch(new currentuser.LoadCurrentUserAction(login));
    this.navCtrl.parent.select(1);
  }

}
