//User Search component

import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Store } from '@ngrx/store'; 
import { Observable } from 'rxjs/rx';

import { AppState } from '../../services/app-state';
import * as currentuser from '../../actions/currentuser.actions';

import { User } from '../../models/user';

import { InAppBrowser } from '@ionic-native/in-app-browser';

@Component({
  selector: 'page-usersearch',
  templateUrl: 'usersearch.html'
})
export class UserSearchPage {

  search:string;
  public currentUser: User;

  constructor(public navCtrl: NavController, private store: Store<AppState>, private iab: InAppBrowser) {
    
    //Suscribes to the users state, if it is populated it populates the
    //search bar with the current user's login name, else it clears it
    this.store.select('currentUser').subscribe(data => {
  		this.currentUser = data;
  		if(this.currentUser && this.currentUser.login) {
  			this.search = this.currentUser.login;
  		} else {
        this.search = "";
      }
  	});
  }

  doSearch() {
  	//Loads the user data based on the search string
    this.store.dispatch(new currentuser.LoadCurrentUserAction(this.search));
  }

  openWebsite(website:string) {
    //Opens the user website
    this.iab.create(website, '_blank');
  }

}
