import { Reducer } from 'redux';
import { FormsState, FormsTypes } from './types';

const INITIAL_STATE: FormsState = {
  form: {},
  forms: [],
  loading: false,
  error: false,
};

const reducer: Reducer<FormsState> = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FormsTypes.GET_FORMS_REQUEST:
      return { ...state, loading: true, error: false };

    case FormsTypes.GET_FORMS_SUCCESS:
      return {
        ...state,
        forms: action.payload.data,
        loading: false,
        error: false,
      };

    case FormsTypes.GET_FORMS_FAILURE:
      return {
        ...state,
        loading: false,
        error: true,
      };

    default:
      return state;
  }
};

export default reducer;
