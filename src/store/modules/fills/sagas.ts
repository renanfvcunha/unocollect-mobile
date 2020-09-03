import { takeLatest, call, put, all } from 'redux-saga/effects';
import { SagaIterator } from 'redux-saga';
import { AnyAction } from 'redux';
import { Alert } from 'react-native';
import { AxiosResponse } from 'axios';

import api from '../../../services/api';
import { FillsTypes } from './types';
import { addFillSuccess, addFillFailure } from './actions';

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

    Alert.alert('', response.data.msg);
    yield put(addFillSuccess(response.data.msg));
  } catch (err) {
    if (err.message === 'Network Error') {
      yield put(addFillFailure());
      Alert.alert('Erro', 'Não foi possível conectar ao servidor.');
    } else if (err.response) {
      Alert.alert('Erro', err.response.data.msg);
      yield put(addFillFailure());
    } else {
      Alert.alert('Erro', err);
      yield put(addFillFailure());
    }
  }
}

export default all([takeLatest(FillsTypes.ADD_FILL_REQUEST, addFill)]);
