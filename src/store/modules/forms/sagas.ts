import { takeLatest, call, put, all } from 'redux-saga/effects';
import { Alert } from 'react-native';
import { AnyAction } from 'redux';

import api from '../../../services/api';
import { FormsTypes } from './types';
import {
  getFormsSuccess,
  getFormsFailure,
  getFormSuccess,
  getFormFailure,
} from './actions';

export function* getForms() {
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

export function* getForm({ payload }: AnyAction) {
  try {
    const response = yield call(api.get, `forms/${payload.id}`);

    yield put(getFormSuccess(response.data));
  } catch (err) {
    alert(err.response.data.msg);
    yield put(getFormFailure());
  }
}

export default all([
  takeLatest(FormsTypes.GET_FORMS_REQUEST, getForms),
  takeLatest(FormsTypes.GET_FORM_REQUEST, getForm),
]);
