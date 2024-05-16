import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AuthNavigation from './AuthNavigation';
import StackNavigation from './StackNavigation';
import { logoutUser, setUser } from '../redux/reducer/authReducer';


export default function Navigation() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const userData = await AsyncStorage.getItem('userData');
      if (userData) {
        dispatch(setUser(JSON.parse(userData)));
      } else {
        dispatch(logoutUser());
      }
    } catch (error) {
      console.error('Error checking authentication status:', error);
    }
  };
 
console.log("status :", isAuthenticated)
  return (
    <NavigationContainer>
      {!isAuthenticated ? 
        <AuthNavigation />
      : 
        <StackNavigation />
      }
    </NavigationContainer>
  );
}
