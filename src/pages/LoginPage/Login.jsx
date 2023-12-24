import {
  StyleSheet,
  Text,
  View,
  Image,
  StatusBar,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import React from 'react';
import {
  responsiveScreenFontSize,
  responsiveScreenHeight,
  responsiveScreenWidth,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {TextInput} from 'react-native-gesture-handler';
import useAuth from '../../hook/useApi';
import useIcon from '../../hook/useIcon';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useState} from 'react';
import {useEffect} from 'react';
import useUid from '../../hook/useUid';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useRecoilState} from 'recoil';
import LoginOption from '../../components/Modal/LoginOption';
import axios from 'axios';

export default function Login() {
  const {USER_UUID} = useUid();
  const [isTablet, setIsTablet] = useState(false);
  const {UserIcon, PasswordIcon, ArrowRightIcon} = useIcon();
  const [UidState, setUidState] = useState(USER_UUID);
  const {useLogin} = useAuth();




  const handleSubmit = values => {
    const {email, password} = values;
    console.log('====================================');
    console.log(email, password);
    console.log('====================================');
    // Handle form submission here

    const data = {
      username: email,
      password: password,
      device_number: UidState,
    };

    useLogin(data);

    console.log(values);
  };

  const getAsyncStorageSettings = async () => {
    try {
      await AsyncStorage.setItem('userResponce');
      console.log('UID STORED => ' + USER_UUID);
      setUidState(USER_UUID);
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
      } = USER_UUID;

      console.log('Scanned data saved to AsyncStorage');
    } catch (error) {
      console.error('Error saving data to AsyncStorage:', error);
    }
  };

  useEffect(() => {
    getAsyncStorageSettings();
  }, []);

  useEffect(() => {
    // Check if the device is a tablet
    const {height, width} = Dimensions.get('window');
    const smallestDimension = Math.min(height, width);
    const isTabletDevice = smallestDimension > 600;

    setIsTablet(isTabletDevice);
  }, []);

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email('The Username field is required.')
      .required('The Username field is required.'),
    password: Yup.string().required('The Password field is required.'),
  });

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={'#fff'} />

      <View
        style={{
          alignItems: 'center',
          marginTop: responsiveScreenHeight(8),
          marginLeft: responsiveScreenWidth(-20),
        }}>
        <Image
          style={{
            height: isTablet ? hp(5) : hp(6),
            width: isTablet ? '35%' : '55%',
          }}
          source={require('../../assets/logo.png')}
        />
      </View>

      <View
        style={{
          width: isTablet ? '65%' : '80%',
          height: 30,
          backgroundColor: '#fff',
          alignSelf: 'center',
          marginTop: '3%',
        }}>
        <Text
          style={{
            color: '#0798e6',
            fontSize: isTablet
              ? responsiveScreenFontSize(1)
              : responsiveScreenFontSize(1.5),
            fontWeight: '400',
            marginLeft: isTablet ? 10 : 0,
          }}>
          Sign in your account
        </Text>
      </View>

      <Formik
        initialValues={{email: '', password: ''}}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}>
        {({handleChange, handleBlur, handleSubmit, values, errors}) => (
          <View
            style={{
              alignSelf: 'center',
              alignItems: 'center',
              width: isTablet ? '65%' : '83%',
              height: hp(50),
              borderWidth: 0.3,
              marginTop: responsiveScreenHeight(2),
              borderRadius: 10,
            }}>
            <View
              style={{
                backgroundColor: '#fff',
                alignSelf: 'center',
              }}>
              <Text
                style={{
                  color: '#000',
                  fontSize: 13,
                  fontWeight: '300',
                  marginTop: responsiveScreenHeight(2),
                }}>
                Please enter your email and password to log in.
              </Text>
            </View>

            <View
              style={{
                width: isTablet ? '70%' : '80%',
                height: isTablet ? 36 : 34,
                borderWidth: 0.3,
                marginTop: responsiveScreenHeight(4),
                flexDirection: 'row',
              }}>
              <View
                style={{
                  width: isTablet ? '12%' : '15%',
                  height: '100%',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <UserIcon />
              </View>
              <TextInput
                style={{
                  width: '100%',
                  height: '100%',
                  color: '#000',
                  fontSize: 12,
                  top: 2,
                }}
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email}
                placeholder="Email"
                placeholderTextColor={'grey'}
                keyboardType="email-address"
              />
            </View>
            <View style={{width: isTablet ? '70%' : '80%', height: 15}}>
              <Text
                style={{
                  color: '#a32607',
                  fontSize: 11,
                  top: 2,
                }}>
                {errors.email}
              </Text>
            </View>

            <View
              style={{
                width: isTablet ? '70%' : '80%',
                height: isTablet ? 36 : 34,
                borderWidth: 0.3,
                marginTop: responsiveScreenHeight(4),
                flexDirection: 'row',
              }}>
              <View
                style={{
                  width: isTablet ? '12%' : '15%',
                  height: '100%',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <PasswordIcon />
              </View>
              <TextInput
                style={{
                  width: '100%',
                  height: '100%',
                  color: '#000',
                  fontSize: 12,
                  top: 2,
                }}
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                value={values.password}
                secureTextEntry
                placeholder="Password"
                placeholderTextColor={'grey'}
              />
            </View>
            <View style={{width: isTablet ? '70%' : '80%', height: 15}}>
              <Text
                style={{
                  color: '#a32607',
                  fontSize: 11,
                  top: 2,
                }}>
                {errors.password}
              </Text>
            </View>

            <View
              style={{
                width: '75%',
                height: 40,
                marginTop: 40,
                alignItems: 'flex-end',
              }}>
              <TouchableOpacity
                onPress={handleSubmit}
                style={{
                  width: '45%',
                  height: '100%',
                  backgroundColor: '#0798e6',
                  borderRadius: 5,
                  alignItems: 'center',
                  flexDirection: 'row',
                  justifyContent: 'center',
                }}>
                <Text
                  style={{
                    color: '#fff',
                    fontSize: 13,
                  }}>
                  Login
                </Text>

                <View
                  style={{
                    width: 16,
                    height: 16,
                    borderRadius: 100,
                    backgroundColor: '#fff',
                    left: 9,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <ArrowRightIcon />
                </View>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </Formik>

      <View style={{alignItems: 'center'}}>
        <LoginOption />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
