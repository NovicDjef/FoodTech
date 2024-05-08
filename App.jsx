/* eslint-disable prettier/prettier */
import {Provider} from 'react-redux';
import store from './app/redux/store';
import Navigation from './app/navigations/navigation';
import { LogBox } from 'react-native';
import SplashScreen from "react-native-splash-screen"
import { useEffect } from 'react';
import messaging from '@react-native-firebase/messaging';

export default function App() {
  LogBox.ignoreAllLogs();

  messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log('Message handled in the background!', remoteMessage);
});
  async function requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;
  
    if (enabled) {
      console.log('Authorization status:', authStatus);
    }
  }
  const getToken = async () => {
    const token = await messaging().getToken()
    console.log("Token :", token)
  }
 
  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide()
    }, 2000) 
    requestUserPermission()
  getToken()
  },[])



  return (
    <Provider store={store}>
      <Navigation />
    </Provider>
  );
}
