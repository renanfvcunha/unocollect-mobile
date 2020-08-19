/**
 * Action Types
 */

export enum AuthTypes {
  LOGIN_REQUEST = '@auth/LOGIN_REQUEST',
  LOGIN_SUCCESS = '@auth/LOGIN_SUCCESS',
  LOGIN_FAILURE = '@auth/LOGIN_FAILURE',
  SET_ERROR_FALSE = '@auth/SET_ERROR_FALSE',
  LOGOUT = '@auth/LOGOUT',
}

/**
 * Data Types
 */

export interface User {
  id?: number;
  name?: string;
}

export interface AuthState {
  readonly user: User;
  readonly token?: string;
  readonly logged: boolean;
  readonly loading: boolean;
  readonly error: boolean;
}
