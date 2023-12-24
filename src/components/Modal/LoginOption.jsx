import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import Modal from 'react-native-modal';
import {
  responsiveFontSize,
  responsiveScreenHeight,
  responsiveScreenWidth,
} from 'react-native-responsive-dimensions';
import useIcon from '../../hook/useIcon';
import {useRecoilState} from 'recoil';
import {useNavigation} from '@react-navigation/native';
import {ConfirmPopUp} from '../../recoil/recoil';

export default function LoginOption() {
  const navigation = useNavigation();
  const [confirm, setConfirm] = useRecoilState(ConfirmPopUp);
  const {ConfirmCredentialIcon} = useIcon();

  const HomePage = () => {
    navigation.navigate('Home');
  };

  return (
    <Modal isVisible={confirm}>
      <View
        style={{
          width: responsiveScreenWidth(90),
          height: responsiveScreenHeight(40),
          borderRadius: 10,
          backgroundColor: '#fff',
          elevation: 5,
        }}>
        <View
          style={{
            width: responsiveScreenWidth(40),
            height: responsiveScreenWidth(40),
            alignSelf: 'center',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <ConfirmCredentialIcon />
        </View>

        <View
          style={{
            width: responsiveScreenWidth(80),
            height: responsiveScreenHeight(10),
            alignSelf: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{
              color: '#000',
              fontSize: responsiveFontSize(2.3),
              fontWeight: '500',
            }}>
            Please Confirm the login credentials.
          </Text>
        </View>

        <TouchableOpacity
          onPress={() => HomePage()}
          style={{
            width: responsiveScreenWidth(40),
            height: responsiveScreenHeight(5),
            backgroundColor: '#0798e6',
            alignSelf: 'center',
            borderRadius: 5,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text
            style={{
              color: '#fff',
              fontSize: responsiveFontSize(2),
            }}>
            OK
          </Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
}
