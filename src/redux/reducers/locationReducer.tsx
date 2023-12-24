// locationReducer.js

import {
    CHECK_LOCATION_STATUS,
    LOCATION_STATUS_ENABLED,
    LOCATION_STATUS_DISABLED,
  } from '../actions/actions';
  
  const initialState = {
    loading: false,
    locationEnabled: null,
  };
  
  const locationReducer = (state = initialState, action) => {
    switch (action.type) {
      case CHECK_LOCATION_STATUS:
        return {
          ...state,
          loading: true,
        };
      case LOCATION_STATUS_ENABLED:
        return {
          ...state,
          loading: false,
          locationEnabled: true,
        };
      case LOCATION_STATUS_DISABLED:
        return {
          ...state,
          loading: false,
          locationEnabled: false,
        };
      default:
        return state;
    }
  };
  
  export default locationReducer;
  