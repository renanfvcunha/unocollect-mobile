import { takeLatest, call, put, all } from 'redux-saga/effects';
import { Alert } from 'react-native';
import { AnyAction } from 'redux';
import { AxiosResponse } from 'axios';

import api from '../../../services/api';
import { AuthTypes, User } from './types';
import { loginSuccess, loginFailure } from './actions';

interface Payload extends AnyAction {
  payload: {
    username: string;
    password: string;
  };
}

interface Response {
  token: string;
  user: User;
}

export function* login({ payload }: Payload) {
  try {
    const { username, password } = payload;

    const response: AxiosResponse<Response> = yield call(api.post, 'session', {
      username,
      password,
    });

    const { token, user } = response.data;

    api.defaults.headers.Authorization = `Bearer ${token}`;

    yield put(loginSuccess(token, user));
  } catch (err) {
    if (err.response) {
      Alert.alert('Erro', err.response.data.msg);
      yield put(loginFailure());
    } else if (err.message === 'Network Error') {
      Alert.alert(
        'Erro',
        'Não foi possível conectar ao servidor. Tente novamente ou contate o suporte.',
      );
    } else {
      Alert.alert('Erro', err);
    }
  }
}

export function setToken({ payload }: AnyAction): void {
  if (!payload) return;

  const { token } = payload.auth;

  if (token) {
    api.defaults.headers.Authorization = `Bearer ${token}`;
  }
}

export default all([
  takeLatest('persist/REHYDRATE', setToken),
  takeLatest(AuthTypes.LOGIN_REQUEST, login),
]);
