import { takeLatest, call, put, all } from 'redux-saga/effects';
import { SagaIterator } from 'redux-saga';
import { Alert, Platform } from 'react-native';
import { AnyAction } from 'redux';
import { AxiosResponse } from 'axios';

import api from '../../../services/api';
import { AuthTypes, User } from './types';
import {
  loginSuccess,
  loginFailure,
  checkTokenSuccess,
  checkTokenFailure,
} from './actions';
import swAlert from '../../../utils/alert';

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

export function* login({ payload }: Payload): SagaIterator {
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
    console.log(err)
    if (err.response) {
      if (Platform.OS === 'web') {
        swAlert('error', 'Erro', err.response.data.msg);
      } else {
        Alert.alert('Erro', err.response.data.msg);
      }
    } else if (err.message === 'Network Error') {
      if (Platform.OS === 'web') {
        swAlert(
          'error',
          'Erro',
          'Não foi possível conectar ao servidor. Tente novamente ou contate o suporte.',
        );
      } else {
        Alert.alert(
          'Erro',
          'Não foi possível conectar ao servidor. Tente novamente ou contate o suporte.',
        );
      }
    } else if (Platform.OS === 'web') {
      swAlert('error', 'Erro', err);
    } else {
      Alert.alert('Erro', err);
    }
    yield put(loginFailure());
  }
}

export function* checkToken(): SagaIterator {
  try {
    yield call(api.get, 'checktoken');

    yield put(checkTokenSuccess());
  } catch (err) {
    if (err.message === 'Network Error') {
      yield put(checkTokenSuccess());
    } else if (err.response) {
      if (Platform.OS === 'web') {
        swAlert('error', 'Erro', err.response.data.msg);
      } else {
        Alert.alert('Erro', err.response.data.msg);
      }
    } else if (Platform.OS === 'web') {
      swAlert('error', 'Erro', err);
    } else {
      Alert.alert('Erro', err);
    }
    yield put(checkTokenFailure());
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
  takeLatest(AuthTypes.CHECK_TOKEN_REQUEST, checkToken),
]);
