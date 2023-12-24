import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AppStack from './src/routes/stack/Stack';
import locationReducer from './src/redux/reducers/locationReducer';
import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from 'recoil';

export default function App() {

  return (
    <NavigationContainer>
      <RecoilRoot>
        <AppStack />
      </RecoilRoot>
    </NavigationContainer>
  );
}
