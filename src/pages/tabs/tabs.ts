import { Component } from '@angular/core';

import { ListPage } from '../list/list';
import { UserSearchPage } from '../usersearch/usersearch';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = ListPage;
  tab2Root = UserSearchPage;

  constructor() {

  }
}
