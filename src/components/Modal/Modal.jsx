import Modal from 'react-native-modal';
import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

export default function Modal() {
  return (
    <View>
      <Modal>
        <View style={{flex: 1}}>
          <Text>I am the modal content!</Text>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({});
