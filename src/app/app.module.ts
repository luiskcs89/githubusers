import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { DirectivesModule } from '../directives/directives.module';
import { MyApp } from './app.component';

import { UserSearchPage } from '../pages/usersearch/usersearch';
import { ListPage } from '../pages/list/list';
import { TabsPage } from '../pages/tabs/tabs';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { UsersReducer } from '../reducers/users.reducer';
import { UsersEffects } from '../effects/users.effects';  
import { CurrentUserReducer } from '../reducers/currentuser.reducer';
import { CurrentUserEffects } from '../effects/currentuser.effects';  
import { UserService } from '../services/user.service';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { InAppBrowser } from '@ionic-native/in-app-browser';

@NgModule({
  declarations: [
    MyApp,
    ListPage,
    UserSearchPage,
    TabsPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    DirectivesModule,
    IonicModule.forRoot(MyApp),
    StoreModule.forRoot({ users: UsersReducer, currentUser: CurrentUserReducer }),
    EffectsModule.forRoot([UsersEffects, CurrentUserEffects])
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ListPage,
    UserSearchPage,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    InAppBrowser,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    UserService
  ]
})
export class AppModule {}
