/* eslint-disable prettier/prettier */
import {Provider} from 'react-redux';
import store from './app/redux/store';
import Navigation from './app/navigations/navigation';
import { LogBox } from 'react-native';
import SplashScreen from "react-native-splash-screen"
import { useEffect } from 'react';

export default function App() {
  LogBox.ignoreAllLogs();

  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide()
    }, 2000) 
  },[])


  return (
    <Provider store={store}>
      <Navigation />
    </Provider>
  );
}
