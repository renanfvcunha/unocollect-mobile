import { combineReducers } from 'redux';
import auth from './auth';
import forms from './forms';
import fills from './fills';

export default combineReducers({
  auth,
  forms,
  fills,
});
