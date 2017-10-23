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
    console.log(this.currentUser);
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
  	console.log(this.search);
  	this.store.dispatch(new currentuser.LoadCurrentUserAction(this.search));
  }

  openWebsite(website:string) {
    this.iab.create(website, '_blank');
  }

}
