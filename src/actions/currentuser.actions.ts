import { Injectable } from '@angular/core';  
import { Action } from '@ngrx/store';

import { User } from '../models/user';

export const LOAD_CURRENT_USER = 'LOAD_CURRENT_USER';
export const LOAD_CURRENT_USER_SUCCESS = 'LOAD_CURRENT_USER_SUCCESS';
export const CLEAR_CURRENT_USER = 'CLEAR_CURRENT_USER';

export class LoadCurrentUserAction implements Action {
  readonly type = LOAD_CURRENT_USER;

  constructor(public login: string) {}
}

export class LoadCurrentUserSuccessAction implements Action {
  readonly type = LOAD_CURRENT_USER_SUCCESS;

  constructor(public payload: User) {}
}

export class ClearCurrentUserAction implements Action {
  readonly type = CLEAR_CURRENT_USER;

  constructor() {}
}

export type Actions =
  | LoadCurrentUserAction
  | LoadCurrentUserSuccessAction
  | ClearCurrentUserAction