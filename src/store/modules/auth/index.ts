import { Reducer } from 'redux';
import { AuthState, AuthTypes } from './types';

const INITIAL_STATE: AuthState = {
  user: {},
  token: undefined,
  invalidToken: false,
  logged: false,
  loading: false,
  error: false,
};

const reducer: Reducer<AuthState> = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case AuthTypes.LOGIN_REQUEST:
      return { ...state, loading: true, error: false };

    case AuthTypes.LOGIN_SUCCESS:
      return {
        loading: false,
        error: false,
        logged: true,
        user: action.payload.user,
        token: action.payload.token,
        invalidToken: false,
      };

    case AuthTypes.LOGIN_FAILURE:
      return {
        ...state,
        loading: false,
        error: true,
      };

    case AuthTypes.CHECK_TOKEN_REQUEST:
      return {
        ...state,
        loading: true,
        error: false,
      };

    case AuthTypes.CHECK_TOKEN_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
      };

    case AuthTypes.CHECK_TOKEN_FAILURE:
      return {
        ...state,
        loading: false,
        error: true,
        invalidToken: true,
      };

    case AuthTypes.SET_ERROR_FALSE:
      return {
        ...state,
        error: false,
      };

    case AuthTypes.LOGOUT:
      return {
        ...state,
        token: undefined,
        user: {},
        logged: false,
      };

    default:
      return state;
  }
};

export default reducer;
