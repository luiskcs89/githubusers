//Actions for the users state

import { Action } from '@ngrx/store';

import { User } from '../models/user';

export const LOAD_USERS = 'LOAD_USERS';
export const LOAD_USERS_SUCCESS = 'LOAD_USERS_SUCCESS';
export const LOAD_USERS_ERROR = 'LOAD_USERS_ERROR';

export class LoadUsersAction implements Action {
  readonly type = LOAD_USERS;

  constructor(public since: number) {}
}

export class LoadUsersSuccessAction implements Action {
  readonly type = LOAD_USERS_SUCCESS;

  constructor(public payload: User[]) {}
}

export class LoadUsersErrorAction implements Action {
  readonly type = LOAD_USERS_ERROR;

  constructor(public error: any) {}
}

export type Actions =
  | LoadUsersAction
  | LoadUsersSuccessAction
  | LoadUsersErrorAction