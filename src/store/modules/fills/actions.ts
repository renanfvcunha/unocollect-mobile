import { action } from 'typesafe-actions';
import { Action } from 'redux';

import { FillsTypes } from './types';

// Add User Location
export const addUserLocation = (latitude: number, longitude: number): Action =>
  action(FillsTypes.ADD_USER_LOCATION, { latitude, longitude });

// Add Fill
export const addFillRequest = (data: FormData, formId: string): Action =>
  action(FillsTypes.ADD_FILL_REQUEST, { data, formId });

export const addFillSuccess = (msg: string): Action =>
  action(FillsTypes.ADD_FILL_SUCCESS, { msg });

export const addFillFailure = (): Action => action(FillsTypes.ADD_FILL_FAILURE);
