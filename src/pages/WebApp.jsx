import {Alert, StyleSheet, Text, View , Linking} from 'react-native';
import React, {useEffect, useState} from 'react';
import {WebView} from 'react-native-webview';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useRecoilState} from 'recoil';
import {
  ConfirmPopUp,
  LOCATION_DATA,
  User_id,
  WebViewUrl,
  device_number,
} from '../recoil/recoil';
import useLocation from '../hook/useLocation';
import useAuth from '../hook/useApi';
import Geolocation from '@react-native-community/geolocation';
import JailMonkey from 'jail-monkey';
import DeveloperModal from '../components/Modal/DeveloperModal';
import LocationEnabler from 'react-native-android-location-enabler';
import useIcon from '../hook/useIcon';
import { useNavigation } from '@react-navigation/native';
import Modal from "react-native-modal";
import { responsiveFontSize, responsiveScreenHeight, responsiveScreenWidth } from 'react-native-responsive-dimensions';
import { TouchableOpacity } from 'react-native-gesture-handler';


export default function WebApp() {
  const [url, setUrl] = useRecoilState(WebViewUrl);
  const [UserId, setUserid] = useRecoilState(User_id);
  const [Device, setDevice] = useRecoilState(device_number);
  const [LocationData, setLocationData] = useRecoilState(LOCATION_DATA);
  const [Accuracy, setAccuracy] = useState(null);
  const [apiKey, setApiKey] = useState(
    `AIzaSyDLg_VU_6t6k3GdnSDUr8_ExrBfKQ3k-2I`,
  );
  const [Latitude, setLatitude] = useState(null);
  const [Longitude, setLongitude] = useState(null);
  const {LocationSending, useLogin} = useAuth();
  const [address, setAddress] = useState(null);
  const [error, setError] = useState(null);
  const [location, setLocation] = useState(null);
  const [confirm, setConfirm] = useRecoilState(ConfirmPopUp);
  const [isDeveloperMode, setIsDeveloperMode] = useState(false);
  const [alertVisible , setAlertVisible] = useState(false)
  const [LocationStatus , setLocationStatus] = useState(false)
  const navigation = useNavigation();
  const { ConfirmCredentialIcon, InvalidQrIcon } = useIcon();

  const ConfirmAction = async () => {
      await Linking.openSettings();
  }

  const retrieveUserData = async () => {
    try {
      // Retrieve user ID and device number from AsyncStorage
      const storedUserId = await AsyncStorage.getItem('user_id');
      const storedDeviceNumber = await AsyncStorage.getItem('device_number');
      // Set state variables with the retrieved values
      setDevice(storedDeviceNumber);
      setUserid(storedUserId);
    } catch (error) {
      // Handle errors, if any
      console.error('Error retrieving user data:', error);
    }
  };

  useEffect(() => {
    retrieveUserData();
  }, [Device, UserId]);

  useEffect(() => {
    console.log('Effect is running');

    const getLocation = async () => {
      try {
        const position = await Geolocation.getCurrentPosition(
          position => {
            console.log('Location obtained successfully:', position.coords);
            setLocation(position.coords);
            setLatitude(position.coords.latitude);
            setLongitude(position.coords.longitude);
            setAccuracy(position.coords.accuracy);
            getAddress(position.coords.latitude, position.coords.longitude);
          },
          error => {
            console.error('Error getting location:', error);
            // Handle error, e.g., display an error message to the user
          },
          {timeout: 15000},
        );
      } catch (error) {
        console.error('Error getting location:', error);
        // Handle error, e.g., display an error message to the user
      }
    };

    getLocation();
  }, []); // Empty dependency array ensures useEffect runs only once, similar to componentDidMount

  const getAddress = async (latitude, longitude) => {
    try {
      // Replace with your actual API key
      const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`;

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Failed to fetch address. Status: ${response.status}`);
      }

      const data = await response.json();

      // Extract the formatted address from the response
      const formattedAddress =
        data.results && data.results.length > 0
          ? data.results[0].formatted_address
          : 'Address not found';

      setAddress(formattedAddress);
    } catch (error) {
      console.error('Error getting address:', error);
      // Handle error, e.g., display an error message to the user
    }
  };

  useEffect(() => {
    const requestLocationPermission = async () => {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Location Permission',
            message: 'This app needs access to your location.',
          },
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        return false;
      }
    };
    requestLocationPermission();
  }, []);

  useEffect(() => {
    console.log('++++++++++++++++++++++++++', location, address);
    if (LocationData != null) {
      const {accuracy, latitude, longitude} = LocationData;
      console.log('Accuracy:', accuracy);
      setAccuracy(accuracy);
      console.log('Latitude:', latitude);
      setLatitude(latitude);
      console.log('Longitude:', longitude);
      setLongitude(longitude);
    } else {
      console.log('Location null');
    }

    const StoredData = async () => {
      const token = await AsyncStorage.getItem('scannedData');
      console.log('stored data', token);
      setUrl(token);
    };
    StoredData();
  }, [location]);

  

  const sendLocationData = () => {
    console.log('=>=>=> ', UserId, Device, Latitude, Longitude, Accuracy);
    if (
      UserId != null &&
      Device != null &&
      Latitude != null &&
      Longitude != null &&
      Accuracy !== null
    ) {
      const data = {
        user_id: UserId,
        device_number: Device,
        latitude: Latitude,
        longitude: Longitude,
        cords_accuracy: Accuracy,
      };
      LocationSending(data);
    }
  };



  const handleDebugModeCheck = async () => {
    const isMockLocationEnabled = await JailMonkey.canMockLocation();
    setIsDeveloperMode(isMockLocationEnabled);
  };



 const handleLocationEnable = async () => {
  const isLocationEnabled = await DeviceInfo.isLocationEnabled();
  setLocationStatus(isLocationEnabled)
 }
 

 useEffect(() => {
  const intervalId = setInterval(() => {
    handleLocationEnable()
  }, 1000); 
  return () => clearInterval(intervalId);
  }, []); 


  useEffect(() => {
    const intervalId = setInterval(() => {
      // Check the value of isDeveloperMode periodically
      if (LocationStatus) {
        console.log('Location mode is enabled! Taking precautions.');
        // Do something when developer mode is detected
      } else {
        console.log('Location mode is not enabled. Safe to proceed.');
        // Do something when developer mode is not detected
        Alert.alert("Warning",
        "Location is not enabled.", [
          { text: 'OK', onPress: () => Linking.openSettings() },
        ]);
      }
    }, 10000); // Adjust the interval time (in milliseconds) as needed
  
    // Clear the interval when the component unmounts or when isDeveloperMode changes
    return () => clearInterval(intervalId);
  }, [isDeveloperMode]);

  




  


  useEffect(() => {
    const intervalId = setInterval(() => {
      handleDebugModeCheck();
    }, 1000); // Change the interval duration as needed

    return () => clearInterval(intervalId);
  }, []); // No dependencies, so it runs once when the component mounts

  useEffect(() => {
      const intervalId = setInterval(() => {
        // Check the value of isDeveloperMode periodically
        if (isDeveloperMode) {
          console.log('Developer mode is enabled! Taking precautions.');
          // Do something when developer mode is detected
          setAlertVisible(true);
        } else {
          console.log('Developer mode is not enabled. Safe to proceed.');
          // Do something when developer mode is not detected
          setAlertVisible(false);
        }
      }, 1000); // Adjust the interval time (in milliseconds) as needed
    
      // Clear the interval when the component unmounts or when isDeveloperMode changes
      return () => clearInterval(intervalId);
    }, [isDeveloperMode]);
  
    useEffect(() => {
      // Set up a interval to check alert visibility every 1000 milliseconds (1 second)
      const intervalId = setInterval(() => {
        if (alertVisible) {
          Alert.alert("Warning",
          "This app may not function properly with mock locations enabled.", [
            { text: 'OK', onPress: () => Linking.openSettings() },
          ]);
          // Clear the interval after showing the alert
          clearInterval(intervalId);
          // Reset alertVisible to false
          setAlertVisible(false);
        }
      }, 10000);
  
      // Clear the interval when the component unmounts
      return () => clearInterval(intervalId);
    }, [alertVisible]);

  useEffect(() => {
    // Initial call
    sendLocationData();
    // Set up interval to call the function every 1 minute
    const intervalId = setInterval(() => {
      sendLocationData();
    }, 1000); // 60000 milliseconds = 1 minute

    // Clean up the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, [Latitude, Longitude, Accuracy, UserId, Device]); // Empty dependency array to run the effect only once during component mount



  useEffect(() => {
    // Check if location services are enabled

    const checkLocationStatus = async () => {
      try {
        const isEnabled = await LocationEnabler. isEnabled();
    
        if (isEnabled) {
          // Location services are enabled, proceed with your app logic
          console.log('Location enabled!');
        } else {
          // Location services are disabled, prompt the user to enable them
          console.log('Location disabled, requesting user to enable it...');

          const intervalId = setInterval(() => {
            if (alertVisible) {
              Alert.alert('', 'Location disabled.', [
                { text: 'OK', onPress: () => Linking.openSettings() },
              ]);
              // Clear the interval after showing the alert
              clearInterval(intervalId);
              // Reset alertVisible to false
              setAlertVisible(false);
            }
          }, 10000);
      
          // Clear the interval when the component unmounts
          return () => clearInterval(intervalId);
          await LocationEnabler.requestLocationSettings();
        }
      } catch (error) {
        console.error('Error checking location status:', error);
      }
    };


    checkLocationStatus()

  }, []); 



  return (
    <View style={styles.container}>
      <WebView source={{uri: `${url}`}} style={{flex: 1}} />

      <View>
    <Modal isVisible={confirm}>
      <View
        style={{
          width: responsiveScreenWidth(90),
          height: responsiveScreenHeight(40),
          borderRadius: 10,
          backgroundColor: "#fff",
          elevation: 5,
        }}
      >
        <View
          style={{
            width: responsiveScreenWidth(40),
            height: responsiveScreenWidth(40),
            alignSelf: "center",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <DeveloperModal />
        </View>

        <View
          style={{
            width: responsiveScreenWidth(80),
            height: responsiveScreenHeight(10),
            alignSelf: "center",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              color: "#000",
              fontSize: responsiveFontSize(2.3),
              fontWeight: "500",
            }}
          >
            Please Disable developer option.
          </Text>
        </View>

        <TouchableOpacity
          onPress={ConfirmAction}
          style={{
            width: responsiveScreenWidth(40),
            height: responsiveScreenHeight(5),
            backgroundColor: "#0798e6",
            alignSelf: "center",
            borderRadius: 5,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text
            style={{
              color: "#fff",
              fontSize: responsiveFontSize(2),
            }}
          >
            OK
          </Text>
        </TouchableOpacity>
      </View>
    </Modal>
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
