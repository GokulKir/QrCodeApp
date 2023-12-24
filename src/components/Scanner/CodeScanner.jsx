import {
  Alert,
  Button,
  Platform,
  StyleSheet,
  Text,
  View,
  NativeModules,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {RNCamera} from 'react-native-camera';
import QRCodeScanner from 'react-native-qrcode-scanner';
import usePermissions from '../../hook/usePermissions';
import {
  responsiveFontSize,
  responsiveScreenHeight,
  responsiveScreenWidth,
} from 'react-native-responsive-dimensions';
import Ripple from 'react-native-material-ripple';
import {TouchableOpacity} from 'react-native-gesture-handler';
import useIcon from '../../hook/useIcon';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useRecoilState} from 'recoil';
import {ConfirmPopUp, WebViewUrl} from '../../recoil/recoil';
import {useNavigation} from '@react-navigation/native';
import DeviceInfo from 'react-native-device-info';
import Config from 'react-native-config';

export default function CodeScanner() {
  const navigation = useNavigation();
  const [url, setUrl] = useRecoilState(WebViewUrl);
  const {ScannerIcon} = useIcon();
  const [confirm, setConfirm] = useRecoilState(ConfirmPopUp);
  const {useCameraPermissions} = usePermissions();

  const isDeveloperOptionsEnabled = async () => {
    console.log(Config.DEVELOPER_OPTIONS);
    // try {
    //   const developerOptionsEnabled = await NativeModules.DeveloperOptionsHelper.isDeveloperOptionsEnabled();
    //   return developerOptionsEnabled;
    // } catch (error) {
    //   console.error(error);
    // }
    const developerOptionsEnabled = Config.DEVELOPER_OPTIONS === 'true';

    if (developerOptionsEnabled) {
      // Do something for developer options
      console.log('developer option is enabled');
    } else {
      // Do something else
      console.log('developer option is desabled');
    }
  };

  useEffect(() => {
    const checkDeveloperOptions = async () => {
      try {
        const isEmulator = await DeviceInfo.isEmulator();
        if (isEmulator) {
          console.log('Developer options ON (emulator detected)');
        } else {
          console.log('Developer options OFF');
        }
      } catch (error) {
        console.error('Error checking developer options:', error);
      }
    };
    checkDeveloperOptions();
  }, []);

  const handleQRCodeScanned = async ({data}) => {
    console.log(`Scanned QR Code: ${data}`);
    try {
      if (data === 'https://patronus.theleadmanagerapp.com/') {
        await AsyncStorage.setItem('scannedData', data);
        console.log('Scanned data saved to AsyncStorage');

        setUrl(data);

        // Ensure 'navigation' is defined and has a 'navigate' method
        console.log('Navigation:', navigation);
        if (navigation && navigation.navigate) {
          navigation.replace('Login');
          console.log('Navigation to QrScreen successful');
        } else {
          console.error('Navigation object or navigate method is undefined');
        }
      } else {
        console.log('Web url is not the expected URL');
        setConfirm(true);
      }
    } catch (error) {
      console.error('Error saving data to AsyncStorage:', error);
    }
  };

  useEffect(() => {
    if (Platform.OS === 'android') {
      useCameraPermissions();
    }
  }, []);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column',
    },
    preview: {
      flex: 1,
      justifyContent: 'flex-end',
      alignItems: 'center',
    },
  });

  const customMarkerStyle = {
    // Your custom marker styles go here
    borderWidth: 2,
    borderColor: '#0798e6',
    borderRadius: 10,
  };

  return (
    <View style={{flex: 1}}>
      <QRCodeScanner
        onRead={handleQRCodeScanned}
        showMarker={true}
        reactivate={true}
        markerStyle={customMarkerStyle}
        cameraStyle={{flex: 1, alignSelf: 'center'}}
        topViewStyle={{backgroundColor: '#FFF'}}
        bottomViewStyle={{backgroundColor: '#fff'}}
        topContent={
          <View>
            <Text
              style={{
                color: '#000',
                fontSize: responsiveFontSize(3),
                fontWeight: 'bold',
              }}>
              Scan QR Code
            </Text>
          </View>
        }
        bottomContent={
          <View>
            <Ripple
              onPress={() => isDeveloperOptionsEnabled()}
              rippleContainerBorderRadius={100}
              style={{
                width: responsiveScreenWidth(20),
                height: responsiveScreenWidth(20),
                backgroundColor: '#0798e6',
                alignItems: 'center',
                justifyContent: 'center',
                elevation: 5,
                borderRadius: 100,
              }}>
              <ScannerIcon />
            </Ripple>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({});
