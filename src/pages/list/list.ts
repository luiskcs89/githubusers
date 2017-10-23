//List component

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
  	//Loads the first few users
    this.store.dispatch(new users.LoadUsersAction(0));

    //Suscribes to the users state, when it changes (receives new data)
    //it stops the infinite scroll
  	this.store.select('users').subscribe(usersList => {
      this.users = usersList;
      if(this.infiniteScroll)
        this.infiniteScroll.complete();
    });
  }

  doInfinite(infiniteScroll) {
    //On the infinite scroll, it dispatches the LoadUsersAction starting
    //on the last user's id, to load the next few users
    this.store.dispatch(new users.LoadUsersAction(this.users[this.users.length-1].id));

    this.infiniteScroll = infiniteScroll;
  }

  openDetail(login:string) {
    //On tap of a user on the list, it dispatches the LoadCurrentUserAction
    //to load the details of the selected user
    this.store.dispatch(new currentuser.LoadCurrentUserAction(login));
    //Then it moves to the user search tab
    this.navCtrl.parent.select(1);
  }

}
