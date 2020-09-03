import { takeLatest, call, put, all } from 'redux-saga/effects';
import { SagaIterator } from 'redux-saga';
import { Alert } from 'react-native';

import api from '../../../services/api';
import { FormsTypes } from './types';
import { getFormsSuccess, getFormsFailure } from './actions';

export function* getForms(): SagaIterator {
  try {
    const response = yield call(api.get, 'fills');

    yield put(getFormsSuccess(response.data));
  } catch (err) {
    if (err.response) {
      Alert.alert('Erro', err.response.data.msg);
      yield put(getFormsFailure());
    } else if (err.message === 'Network Error') {
      yield put(getFormsFailure());
    } else {
      Alert.alert('Erro', err);
      yield put(getFormsFailure());
    }
  }
}

export default all([takeLatest(FormsTypes.GET_FORMS_REQUEST, getForms)]);
