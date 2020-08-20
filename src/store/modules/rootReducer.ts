import { combineReducers } from 'redux';
import auth from './auth';
import forms from './forms';

export default combineReducers({
  auth,
  forms,
});
