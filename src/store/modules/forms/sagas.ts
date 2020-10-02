import { takeLatest, call, put, all } from 'redux-saga/effects';
import { SagaIterator } from 'redux-saga';
import { Alert, Platform } from 'react-native';

import api from '../../../services/api';
import { FormsTypes } from './types';
import { getFormsSuccess, getFormsFailure } from './actions';
import swAlert from '../../../utils/alert';

export function* getForms(): SagaIterator {
  try {
    const response = yield call(api.get, 'fills');

    yield put(getFormsSuccess(response.data));
  } catch (err) {
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
    yield put(getFormsFailure());
  }
}

export default all([takeLatest(FormsTypes.GET_FORMS_REQUEST, getForms)]);
