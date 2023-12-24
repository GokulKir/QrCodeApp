import { StyleSheet, Text, View , TouchableOpacity } from "react-native";
import React from "react";
import Modal from "react-native-modal";
import {
  responsiveFontSize,
  responsiveScreenHeight,
  responsiveScreenWidth,
} from "react-native-responsive-dimensions";
import useIcon from "../../hook/useIcon";

import { useRecoilState } from "recoil";
import { useNavigation } from "@react-navigation/native";
import { ConfirmPopUp } from "../../recoil/recoil";

export default function InvalidQr() {
  const navigation = useNavigation();
  const [confirm, setConfirm] = useRecoilState(ConfirmPopUp);
  const { ConfirmCredentialIcon, InvalidQrIcon } = useIcon();

  const ConfirmAction = () => {
      setConfirm(false)
  }

  return (
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
          <InvalidQrIcon />
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
            Please scan the correct QR code.
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
  );
}
