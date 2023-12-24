import {useRecoilState} from 'recoil';
import apiInstance from '../api/apiInstance';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ConfirmPopUp, UserRes, User_id, device_number} from '../recoil/recoil';

const useAuth = () => {
  const [Confirm, setConfirm] = useRecoilState(ConfirmPopUp);
  const [UserR, setUserRes] = useRecoilState(UserRes);
  const [UserId, setUserid] = useRecoilState(User_id);
  const [Device, setDevice] = useRecoilState(device_number);

  const useLogin = async user => {
    console.log('====================================');
    console.log(user);
    console.log('====================================');
    try {
      const response = await apiInstance.post(`/api/login_post`, user);

      console.log(response.data);
      setConfirm(true);

      setUserRes(response.data);

      AsyncStorage.setItem('userResponse', JSON.stringify(response.data));

      const {
        dashboard_endpoint,
        device: {device_number, id: deviceId, user_id: deviceUserId},
        message,
        status,
        user: {
          address,
          city,
          email,
          gender,
          group,
          id: userId,
          name,
          phone,
          report_to_user,
          status: userStatus,
          user_type,
        },
      } = response.data;

      await AsyncStorage.setItem('user_id', userId.toString());
      await AsyncStorage.setItem('device_number', device_number.toString());

      // Set state variables with the values
      setDevice(device_number.toString());
      setUserid(userId.toString());

      console.log(dashboard_endpoint);
      console.log(device_number, deviceId, deviceUserId);
      console.log(message);
      console.log(status);
      console.log(
        address,
        city,
        email,
        gender,
        group,
        userId,
        name,
        phone,
        report_to_user,
        userStatus,
        user_type,
      );

      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  const LocationSending = async location => {
    console.log('LiveLocation Api success =>', location);
    try {
      const response = await apiInstance.post(
        `/api/storeLiveLocation`,
        location,
      );
      console.log('====================================');
      console.log(response.data);
      console.log('====================================');
      return response.data;
    } catch (error) {
      console.log('====================================');
      console.log('Confirm  error', error);
      console.log('====================================');
    }
  };

  return {
    useLogin,
    LocationSending,
  };
};

export default useAuth;
