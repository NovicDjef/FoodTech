import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../pages/auth/LoginScreen'
import OtpScreen from '../pages/auth/OtpScreen'
// import { IntroductionAnimationScreen } from '../screens/introduction_animation';



const Stack = createStackNavigator();

export default function AuthNavigation() {
  return (
    <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="otpScreen" component={OtpScreen} />
    </Stack.Navigator>
  )
}