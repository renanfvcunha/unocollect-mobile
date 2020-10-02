import { Fill } from '../fills/types';

/**
 * Action Types
 */

export enum FormsTypes {
  GET_FORMS_REQUEST = '@forms/GET_FORMS_REQUEST',
  GET_FORMS_SUCCESS = '@forms/GET_FORMS_SUCCESS',
  GET_FORMS_FAILURE = '@forms/GET_FORMS_FAILURE',
}

/**
 * Data Types
 */

export interface Form {
  id?: number;
  title?: string;
  description?: string;
  fields: Field[];
  fill?: Fill | null;
}

export interface Field {
  id: number;
  name: string;
  description?: string | null;
  type: string;
  options?: string[] | null;
  required: boolean;
}

/**
 * State Type
 */
export interface FormsState {
  readonly form: Form;
  readonly forms: Form[];
  readonly loading: boolean;
  readonly error: boolean;
}
