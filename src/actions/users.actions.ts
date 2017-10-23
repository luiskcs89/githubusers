//Actions for the users state

import { Injectable } from '@angular/core';  
import { Action } from '@ngrx/store';

import { User } from '../models/user';

export const LOAD_USERS = 'LOAD_USERS';
export const LOAD_USERS_SUCCESS = 'LOAD_USERS_SUCCESS';

export class LoadUsersAction implements Action {
  readonly type = LOAD_USERS;

  constructor(public since: number) {}
}

export class LoadUsersSuccessAction implements Action {
  readonly type = LOAD_USERS_SUCCESS;

  constructor(public payload: User[]) {}
}

export type Actions =
  | LoadUsersAction
  | LoadUsersSuccessAction