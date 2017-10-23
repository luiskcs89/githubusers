//User Search component

import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Store } from '@ngrx/store'; 
import { Observable } from 'rxjs/rx';

import { AppState } from '../../services/app-state';
import * as currentuser from '../../actions/currentuser.actions';
import { CurrentUserEffects } from '../../effects/currentuser.effects';

import { User } from '../../models/user';

import { InAppBrowser } from '@ionic-native/in-app-browser';

@Component({
  selector: 'page-usersearch',
  templateUrl: 'usersearch.html'
})
export class UserSearchPage {

  search:string;
  currentUser: User;
  error: any;
  loading: boolean;
  loadCurrentUserError$: Observable<any>;

  constructor(public navCtrl: NavController, public navParams: NavParams, private store: Store<AppState>, private iab: InAppBrowser, private currentUserEffects: CurrentUserEffects) {
    //Suscribes to the users state, if it is populated it populates the
    //search bar with the current user's login name, else it clears it
    this.store.select('currentUser').subscribe(data => {
      this.currentUser = data;
      this.error = null;
      this.loading = false;
  	});

    //Suscribe to the Error Effect and Action to handle errors
    this.loadCurrentUserError$ = this.currentUserEffects.loadCurrentUser$
    .filter(res => res.type === currentuser.LOAD_CURRENT_USER_ERROR);

    this.loadCurrentUserError$.subscribe(error => {
      this.currentUser = null;
      this.loading = false;
      this.error = error.error;
    });
  }

  ionViewWillEnter() {
    //When entering get username from Nav Params and search for the user
    //when it comes from the list page, else set search bar string empty
    if(this.navParams && this.navParams.data.login) {
      this.search = this.navParams.data.login;
      this.doSearch();
    }
    else {
      this.search = "";
    }
  }

  doSearch() {
  	//Loads the user data based on the search string
    //(The GO! button was added just to not send a lot of requests to the API
    //and thus avoiding reaching the rate limit too fast)
    this.currentUser = null;
    this.loading = true;
    this.store.dispatch(new currentuser.LoadCurrentUserAction(this.search));
  }

  openWebsite(website:string) {
    //Opens the user website
    this.iab.create(website, '_blank');
  }

}
