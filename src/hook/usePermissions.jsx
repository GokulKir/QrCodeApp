import {PermissionsAndroid} from 'react-native';
import {check, request, PERMISSIONS, RESULTS} from 'react-native-permissions';
import {useDispatch, useSelector} from 'react-redux';
import {checkLocationStatus} from '../redux/actions/locationActions';
import {useRecoilState} from 'recoil';
import {ISLocationEnable} from '../recoil/recoil';
import {useEffect} from 'react';

const usePermissions = () => {
  const [locationPermission, setLocationPermission] =
    useRecoilState(ISLocationEnable);

  useEffect(() => {
    checkLocationPermission();
  }, [checkLocationPermission]);


  async function handleCheckPressed() {
    if (Platform.OS === 'android') {
      const checkEnabled = await isLocationEnabled();
      console.log('checkEnabled', checkEnabled);
    } 
    // No specific handling for iOS case as of now
  }

  const checkLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Location Permission',
          message: 'This app needs access to your location.',
        },
      );

      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        setLocationPermission(true);
        console.log('Location permission granted');
        handleCheckPressed()
      } else {
        setLocationPermission(false);
        console.log('Location permission denied');
        handleCheckPressed()
      }
    } catch (error) {
      console.error('Error checking or requesting location permission:', error);
      setLocationPermission(false);
    }
  };

  const useCameraPermissions = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Camera Permission',
          message: 'We need access to your camera to scan QR codes',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Camera permission granted');
      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  return {
    useCameraPermissions,
    checkLocationPermission,
    locationPermission,
  };
};

export default usePermissions;
