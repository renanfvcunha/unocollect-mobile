import { takeLatest, call, put, all } from 'redux-saga/effects';
import { AnyAction } from 'redux';

import api from '../../../services/api';
import { FillsTypes } from './types';
import { addFillSuccess, addFillFailure } from './actions';

export function* addFill({ payload }: AnyAction) {
  try {
    const response = yield call(
      api.post,
      `fills/${payload.data.formId}`,
      payload.data,
    );

    alert(response.data.msg);
    yield put(addFillSuccess(response.data.msg));
  } catch (err) {
    alert(err.response.data.msg);
    yield put(addFillFailure());
  }
}

export default all([takeLatest(FillsTypes.ADD_FILL_REQUEST, addFill)]);
