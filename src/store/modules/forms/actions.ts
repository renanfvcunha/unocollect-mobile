import { action } from 'typesafe-actions';
import { Action } from 'redux';
import { FormsTypes, Form } from './types';

// Get Forms
export const getFormsRequest = (): Action =>
  action(FormsTypes.GET_FORMS_REQUEST);

export const getFormsSuccess = (data: Form[]): Action =>
  action(FormsTypes.GET_FORMS_SUCCESS, { data });

export const getFormsFailure = (): Action =>
  action(FormsTypes.GET_FORMS_FAILURE);

// Get Form
export const getFormRequest = (id: number): Action =>
  action(FormsTypes.GET_FORM_REQUEST, { id });

export const getFormSuccess = (data: Form): Action =>
  action(FormsTypes.GET_FORM_SUCCESS, { data });

export const getFormFailure = (): Action => action(FormsTypes.GET_FORM_FAILURE);
