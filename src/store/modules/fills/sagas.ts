import { takeLatest, call, put, all } from 'redux-saga/effects';
import { SagaIterator } from 'redux-saga';
import { AnyAction } from 'redux';
import { Alert, Platform } from 'react-native';
import { AxiosResponse } from 'axios';

import api from '../../../services/api';
import { FillsTypes } from './types';
import { addFillSuccess, addFillFailure } from './actions';
import swAlert from '../../../utils/alert';

interface Msg {
  msg: string;
}

export function* addFill({ payload }: AnyAction): SagaIterator {
  try {
    const response: AxiosResponse<Msg> = yield call(
      api.post,
      `fills/${payload.formId}`,
      payload.data,
      {
        headers: {
          'content-type': 'multipart/formdata',
        },
      },
    );

    if (Platform.OS === 'web') {
      swAlert('success', '', response.data.msg);
    } else {
      Alert.alert('', response.data.msg);
    }
    yield put(addFillSuccess());
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
    yield put(addFillFailure());
  }
}

export default all([takeLatest(FillsTypes.ADD_FILL_REQUEST, addFill)]);
