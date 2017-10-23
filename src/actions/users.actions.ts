import { Injectable } from '@angular/core';  
import { Action } from '@ngrx/store';

import { User } from '../models/user';

export const LOAD_USERS = 'LOAD_USERS';
export const LOAD_USERS_SUCCESS = 'LOAD_USERS_SUCCESS';
export const LOAD_USER = 'LOAD_USER';
export const LOAD_USER_SUCCESS = 'LOAD_USER_SUCCESS';

export class LoadUsersAction implements Action {
  readonly type = LOAD_USERS;

  constructor(public since: number) {}
}

export class LoadUsersSuccessAction implements Action {
  readonly type = LOAD_USERS_SUCCESS;

  constructor(public payload: User[]) {}
}

export class LoadUserAction implements Action {
  readonly type = LOAD_USER;

  constructor(public login: string) {}
}

export class LoadUserSuccessAction implements Action {
  readonly type = LOAD_USER_SUCCESS;

  constructor(public payload: User) {}
}

export type Actions =
  | LoadUsersAction
  | LoadUsersSuccessAction
  | LoadUserAction
  | LoadUserSuccessAction