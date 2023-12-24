// locationActions.js

import {check, request, PERMISSIONS, RESULTS} from 'react-native-permissions';
import {
  CHECK_LOCATION_STATUS,
  LOCATION_STATUS_ENABLED,
  LOCATION_STATUS_DISABLED,
} from './actions';

export const checkLocationStatus = () => {
  return async dispatch => {
    dispatch({type: CHECK_LOCATION_STATUS});

    try {
      const status = await check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);

      if (status === RESULTS.GRANTED) {
        dispatch({type: LOCATION_STATUS_ENABLED});
      } else {
        const requestStatus = await request(
          PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
        );

        if (requestStatus === RESULTS.GRANTED) {
          dispatch({type: LOCATION_STATUS_ENABLED});
        } else {
          dispatch({type: LOCATION_STATUS_DISABLED});
        }
      }
    } catch (error) {
      console.error('Error checking or requesting location permission:', error);
      dispatch({type: LOCATION_STATUS_DISABLED});
    }
  };
};
