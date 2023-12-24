import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import CodeScanner from '../components/Scanner/CodeScanner';
import InvalidQr from '../components/Modal/InvalidQr';

export default function QrScreen() {
  return (
    <View style={styles.container}>
      <CodeScanner />

      <View style={{alignItems: 'center', justifyContent: 'center'}}>
        <InvalidQr />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
