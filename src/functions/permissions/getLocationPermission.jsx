import { PermissionsAndroid } from "react-native";
import {ISLocationEnable} from '../../recoil/recoil';
import { useRecoilState } from "recoil";

export const getLocationPermission = async () => {
    // const [locationPermission , setLocationPermission] = useRecoilState(ISLocationEnable)
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'Location Permission',
        message: 'This app needs access to your location.',
      },
    );

    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
    //   setLocationPermission(true);
      console.log('Location permission granted');
      handleCheckPressed();
    } else {
    //   setLocationPermission(false);
      console.log('Location permission denied');
      handleCheckPressed();
    }
  } catch (error) {
    console.error('Error checking or requesting location permission:', error);
    // setLocationPermission(false);
  }
};
