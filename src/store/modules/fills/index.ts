import { Reducer } from 'redux';
import { FillsState, FillsTypes } from './types';

const INITIAL_STATE: FillsState = {
  fill: {},
  loading: false,
  error: false,
};

const reducer: Reducer<FillsState> = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FillsTypes.ADD_USER_LOCATION:
      return {
        ...state,
        fill: {
          latitude: action.payload.latitude,
          longitude: action.payload.longitude,
        },
      };

    case FillsTypes.ADD_FILL_REQUEST:
      return {
        ...state,
        loading: true,
        error: false,
      };

    case FillsTypes.ADD_FILL_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
      };

    case FillsTypes.ADD_FILL_FAILURE:
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
