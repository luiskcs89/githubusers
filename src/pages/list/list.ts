//List component

import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Store } from '@ngrx/store'; 
import { Observable } from 'rxjs/rx';
import { ToastController } from 'ionic-angular';

import { AppState } from '../../services/app-state';  
import * as users from '../../actions/users.actions';
import * as currentuser from '../../actions/currentuser.actions';
import { UsersEffects } from '../../effects/users.effects';

import { User } from '../../models/user';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {

  users: User[];
  infiniteScroll:any;
  error: any;
  loading: boolean;
  loadUsersError$: Observable<any>;

  constructor(public navCtrl: NavController, private store: Store<AppState>, private usersEffects: UsersEffects, public toastCtrl: ToastController) {
    //Suscribes to the users state, when it changes (receives new data)
    //it stops the infinite scroll
  	this.store.select('users').subscribe(usersList => {
      this.loading = false;
      this.users = usersList;
      if(this.infiniteScroll)
        this.infiniteScroll.complete();
    });

    //Suscribe to the Error Effect and Action to handle errors
    this.loadUsersError$ = this.usersEffects.loadUsers$
    .filter(res => res.type === users.LOAD_USERS_ERROR);

    this.loadUsersError$.subscribe(error => {
      this.error = error.error;

      this.loading = false;
      if(this.infiniteScroll) {
        this.infiniteScroll.complete();
        this.infiniteScroll.enable(false);
      }

      //If some users are already loaded, show the error as a toast
      if(this.users.length > 0) {
        if(this.error.status == 403)
          this.presentToast('API rate limit exceeded, please try again later');
        if(this.error.status == 0)
          this.presentToast('There was a connection error, please check your internet connection and try again');
      }
    });

    //Loads the first few users
    this.initUsers();

  }

  initUsers() {
    //Loads the first few users
    this.loading = true;
    this.error = null;
    this.store.dispatch(new users.LoadUsersAction(0));
  }

  loadMoreUsers() {
    this.infiniteScroll.enable(true);
    this.doInfinite(this.infiniteScroll);
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

  presentToast(errorMessage:string) {
    const toast = this.toastCtrl.create({
      message: errorMessage,
      duration: 5000,
      position: 'bottom'
    });

    toast.present();
  }

}
