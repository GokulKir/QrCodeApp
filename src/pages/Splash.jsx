import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  View,
  Linking,
  StatusBar,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
  responsiveScreenHeight,
  responsiveScreenWidth,
} from 'react-native-responsive-dimensions';
import {useNavigation} from '@react-navigation/native';
import {checkLocationStatus} from '../redux/actions/locationActions';
import usePermissions from '../hook/usePermissions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useRecoilState} from 'recoil';
import {ISLocationEnable, LOGIN_CHECKING, WebViewUrl} from '../recoil/recoil';
import {
  IsLocationEnabled,
  AndroidLocationEnablerOptions,
} from 'react-native-android-location-enabler';

export default function Splash() {
  const [url, setUrl] = useRecoilState(WebViewUrl);
  const {checkLocationPermission} = usePermissions();
  const [location, setLocation] = useRecoilState(ISLocationEnable);
  const [Islocation, setIsLocation] = useState(false);
  const navigation = useNavigation();
  const [LogCheck, setLogCheck] = useRecoilState(LOGIN_CHECKING);

  const retrieveData = async () => {
    try {
      // Use AsyncStorage.getItem to retrieve the stored data
      const storedDataJSON = await AsyncStorage.getItem('userResponse');

      // Parse the JSON string back into an object
      const storedData = JSON.parse(storedDataJSON);
      setLogCheck(storedData);

      // Now you can use the 'storedData' object as needed
      console.log('Retrieved data:', storedData);
    } catch (error) {
      // Handle errors, if any
      console.error('Error retrieving data:', error);
    }
  };

  useEffect(() => {
    retrieveData();
  }, [LogCheck]);


  // Call the function to retrieve data

  const checkLocation = async () => {
    try {
      const locationEnabled = await IsLocationEnabled();

      if (locationEnabled) {
        console.log('Location is enabled');
        setLocation(true);
      } else {
        console.log('Location is not enabled');
        setLocation(false);
      }
    } catch (err) {
      console.error('Error checking/enabling location:', err);
    }
  };

  const checkDeveloperOptions = async () => {
    if (DeviceInfo.isEmulator()) {
      console.log('Developer options might be enabled (emulator detected)');
    } else {
      const usbConfig = await getUsbConfigAsync();
      if (usbConfig !== 'unknown') {
        console.log(
          'Developer options might be enabled (USB debugging active)',
        );
      }
    }
  };

  useEffect(() => {
    setInterval(() => {
      checkLocationPermission();
    }, 3000);
    checkDeveloperOptions();
  }, []);

  useEffect(() => {
    checkLocation();
  }, [checkLocationPermission]);

  async function handleCheckPressed() {
    const checkEnabled = await IsLocationEnabled();
    console.log('checkEnabled', checkEnabled);

    return checkEnabled;

    // No specific handling for iOS case as of now
  }

  const NavigationScreen = () => {
    if (url != null) {
      navigation.replace('Login');
    } else {
      navigation.replace('QrScreen');
    }
  };

  useEffect(() => {
    const StoredData = async () => {
      const token = await AsyncStorage.getItem('scannedData');
      console.log('stored data', token);
      setUrl(token);

      if (token === 'https://patronus.theleadmanagerapp.com/') {
        navigation.replace('Home');
      }
    };
    StoredData();
  }, []);

  useEffect(() => {
    handleCheckPressed();
  }, []);

  useEffect(() => {
    console.log('====================================');
    console.log(location);
    console.log('====================================');
  }, [location]);

  useEffect(() => {
    checkLocationPermission();
    if(LogCheck != null) {

      navigation.replace('Home')

    } else if (location == true && LogCheck == null) {
      console.log('location enabled');
      NavigationScreen();
    } else {
      handleCheckPressed();
    }
    checkLocationPermission();
  
  }, [location]);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={'#fff'} />
      <ImageBackground
        style={styles.ImageStyle}
        source={require('../assets/logo.png')}></ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  ImageStyle: {
    width: responsiveScreenWidth(100),
    height: responsiveScreenHeight(12),
  },
});
