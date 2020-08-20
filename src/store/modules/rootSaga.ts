import { all } from 'redux-saga/effects';
import auth from './auth/sagas';
import forms from './forms/sagas';

export default function* rootSaga() {
  return yield all([auth, forms]);
}
