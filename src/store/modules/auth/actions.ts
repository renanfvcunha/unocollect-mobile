import { action } from 'typesafe-actions';
import { Action } from 'redux';

import { AuthTypes, User } from './types';

export const loginRequest = (username: string, password: string): Action =>
  action(AuthTypes.LOGIN_REQUEST, { username, password });

export const loginSuccess = (token: string, user: User): Action =>
  action(AuthTypes.LOGIN_SUCCESS, { token, user });

export const loginFailure = (errorMsg: string): Action =>
  action(AuthTypes.LOGIN_FAILURE, { errorMsg });

export const setErrorFalse = (): Action => action(AuthTypes.SET_ERROR_FALSE);

export const logout = (): Action => action(AuthTypes.LOGOUT);
