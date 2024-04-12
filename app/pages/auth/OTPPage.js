// components/OTPPage.js
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { OtpInput } from "react-native-otp-entry";
import COLORS from '../../consts/colors';
import LottieView from 'lottie-react-native'
import { StatusBar } from 'react-native';


const OTPPage = () => {
 

  return (
    <View style={styles.container}>
      <StatusBar  
       barStyle="light-content"
       translucent
       backgroundColor={COLORS.primary}/>
                      <LottieView
                      style={styles.lottie}
                      source={require("../../assets/json/opt_animation.json")}
                      autoPlay
                      loop
                    />
                      
      <OtpInput
          numberOfDigits={5}
          focusColor={COLORS.accentColor}
          focusStickBlinkingDuration={500}
          onTextChange={(text) => console.log(text)}
          onFilled={(text) => console.log(`OTP is ${text}`)}
          style={styles.content}
          //theme={{
            //containerStyle={styles.container},
            // inputsContainerStyle={styles.inputsContainer},
            // pinCodeContainerStyle={styles.pinCodeContainer},
            // pinCodeTextStyle={styles.pinCodeText},
            // focusStickStyle={styles.focusStick},
            // focusedPinCodeContainerStyle={styles.activePinCodeContainer}
         // }}
      />
      <Text>veillez resegeigner le code recu par SMS</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.primary,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    
    
  },
  content: {
    color: COLORS.white,
    
  },
  lottie: {
    width: 188,
    height: 208,
    textAlign: 'center',
    bottom: 12
},
})

export default OTPPage;
