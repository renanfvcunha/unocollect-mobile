/**
 * Action Types
 */

export enum FillsTypes {
  ADD_USER_LOCATION = '@fills/ADD_USER_LOCATION',
  ADD_FILL_REQUEST = '@fills/ADD_FILL_REQUEST',
  ADD_FILL_SUCCESS = '@fills/ADD_FILL_SUCCESS',
  ADD_FILL_FAILURE = '@fills/ADD_FILL_FAILURE',
}

/**
 * Data Types
 */

export interface Fill {
  latitude?: number;
  longitude?: number;
  values?: Value[];
  images?: Img[];
}

export interface Value {
  fieldId?: number;
  value: string;
}

export interface Img {
  uri: string;
  name: string;
  type: string;
}

/**
 * State Type
 */
export interface FillsState {
  readonly fill: Fill;
}
