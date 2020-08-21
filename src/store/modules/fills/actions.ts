import { action } from 'typesafe-actions';
import { Action } from 'redux';

import { FillsTypes, Fill } from './types';

// Add User Location
export const addUserLocation = (latitude: number, longitude: number): Action =>
  action(FillsTypes.ADD_USER_LOCATION, { latitude, longitude });

// Add Fill
export const addFillRequest = (data: Fill): Action =>
  action(FillsTypes.ADD_FILL_REQUEST, { data });

export const addFillSuccess = (msg: string): Action =>
  action(FillsTypes.ADD_FILL_SUCCESS, { msg });

export const addFillFailure = (): Action => action(FillsTypes.ADD_FILL_FAILURE);