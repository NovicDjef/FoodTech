import React, { useState, useEffect } from 'react'
import { 
  View, 
  Text, 
  TouchableOpacity, 
  Platform,
  Alert,
  StyleSheet ,
  StatusBar,
  Dimensions,
  ActivityIndicator,
  TouchableWithoutFeedback,
  Keyboard, } from 'react-native'
  import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import LottieView from 'lottie-react-native';
import { OtpInput } from "react-native-otp-entry";
import Icon from "react-native-vector-icons/FontAwesome5";
import { COLORS } from '../../constants';
import { verifyOTP } from '../../redux/action/authActions';
import { useNavigation } from '@react-navigation/native';



export default function OtpScreen({navigation}) {
    const dispatch = useDispatch();
    const {t} = useTranslation();
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const [loading, setLoading] = useState(false);
    const [otpCode, setOTPCode] = useState('');
    const [otpError, setOTPError] = useState('');
    const handleChangeOTP = (code) => {
        setOTPCode(code);
      };
      const validateOTP = () => {
        let isValid = true;
    
        if (!/^\d{5}$/.test(otpCode)) {
          setOTPError('Le code OTP doit contenir exactement 5 chiffres.');
          isValid = false;
        } else {
          setOTPError('');
        }
    
        return isValid;
      };
    
      const handleSubmitOTP = async () => {
        if (validateOTP()) {
          setLoading(true);
          try {
            const response  = await dispatch(verifyOTP(otpCode));
            if (response && response.data && response.data.message) {
              showAlert("Succès", response.data.message);
            } else {
              showAlert("Erreur", "Désolé, mais le code que vous avez entré est incorrect. veillez entrer le code recu par SMS.");
            }
          } catch (error) {
              showAlert("Erreur", error);
          } finally {
            setLoading(false);
          }
        }
      };
        const showAlert = (title, message) => {
          Alert.alert(title, message, [{ text: 'OK', onPress: () => handleOKPress()}]);
        };
        const handleOKPress = () => {
          //navigation.navigate('TabMenu')
        };
      
        return(
          <>
          <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
            <StatusBar backgroundColor='#42C6A5' barStyle="light-content"/>
            <View style={styles.header}>
              <Icon
                name="angle-left"
                size={28}
                color={COLORS.white}
                onPress={() => navigation.navigate('Login')}
              />
              <Icon 
                name="bookmark" 
                size={28} 
                color={COLORS.white}
              />
            </View>
            <View
              style={{
                width: '100%',
                height: '10%',
                alignItems: 'center',
                paddingTop: 80,
              }}>
                <LottieView
                  style={styles.lottie}
                  source={require("../../../assets/json/addToFovotite")}
                  autoPlay
                  loop />
            </View>
            <Animatable.Text 
              style={
                [styles.titleText, 
                {top: 35}]} 
                animation='fadeInUp' 
                delay={1200} 
            >
                {t("SIMPLE")} 
            </Animatable.Text> 
            <Animatable.View
              animation="fadeInUpBig"
              style={styles.bottomView}>
              <Text style={styles.loginText}>{t("OTP_CODE")}</Text> 
              <View style={{position: 'relative', margin: 6}}>        
                <OtpInput
                  numberOfDigits={5}
                  focusColor={COLORS.accentColor}
                  focusStickBlinkingDuration={500}
                  handleChangeotp={(code) => handleChangeOTP(code)}
                  onTextChange={(code) => handleChangeOTP(code)}
                  onFilled={(text) => console.log(`OTP is ${text}`)}
                />
                  {otpError && <Text style={styles.ErrorText}>{otpError}</Text>}
                <View style={{
                  flexDirection: 'row',
                  display: 'flex',
                  justifyContent: 'space-between'
                }}> 
                <View style={{flex: 1,}}>
                  <View>
                    <Text style={{color: COLORS.gray50, marginTop: 4}}>{t("Note_send")}</Text>
                    <TouchableOpacity>
                      <Text style={{ color: '#42C6A5', margin:8}}>{t("Resend_again")} </Text>
                    </TouchableOpacity>
                  </View>
                  <View style={styles.signIn}>
                    <TouchableOpacity
                      style={[styles.signIn, {flexDirection: "row", width: 130, color: COLORS.primary}]}
                      onPress={handleSubmitOTP}                  
                    >
                      <LinearGradient
                        colors={['#08d4c4', '#08d4c4']}
                        style={[styles.signIn, {flexDirection: "row", width: 140,}]}
                      >
                        {loading ? (
                          <View style={{flexDirection: "row", justifyContent:"center"}}>
                            <ActivityIndicator size="small" color="#fff" />
                            <Text style={{color: "white"}}>Chargement...</Text>
                          </View>
                      ) : (
                      <Text style={[styles.textSign, { color: '#fff' }]}> {t("To_check")} <FontAwesome
                        name="angle-right"
                        color={COLORS.white}
                        size={30}
                      /> 
                      </Text>
                      )}
                      </LinearGradient>
                    </TouchableOpacity>
                  </View>
                </View>
  
                </View>
              </View>  
            
            </Animatable.View>
            </View>
    </TouchableWithoutFeedback>

</>
        )
      }
const styles = StyleSheet.create({
titleText: { 
    position: 'absolute', 
    top: Dimensions.get('screen').height * 0.1, 
    alignSelf: 'center', 
    color: '#fff', 
    fontFamily: 'SourceSansProBold', 
    fontSize: 34, 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 8, }, 
    shadowOpacity: 0.44, 
    shadowRadius: 10.32, 
    elevation: 16, 
}, 
ErrorText : {
color: "red",
marginTop: 4
},
bottomView: { 
    backgroundColor: '#fff', 
    opacity: 0.95, 
    position: 'absolute', 
    bottom: 0, left: 0, right: 0, 
    borderTopLeftRadius: 30, 
    borderTopRightRadius: 30, 
    paddingTop: 10, 
    paddingBottom: 20, 
    paddingHorizontal: 20, 
}, 
loginText: { 
    fontFamily: 'SourceSansProBold', 
    fontSize: 18, 
    marginTop: 12, 
    marginBottom: 4, 
}, 
inputView: { 
    height: 50, 
    borderRadius: 10, 
    backgroundColor: '#f1f3f6', 
    marginTop: 10, 
    display: 'flex', 
    flexDirection: 'row', 
    alignItems: 'center', 
}, 
inputIcon: { 
    paddingHorizontal: 8, 
}, 
input: { 
    height: 40, 
    flex: 1, 
    fontFamily: 'SourceSansProRegular', 
    fontSize: 19, 
    color: '#333', 
}, 
container: {
    flex: 1, 
backgroundColor: '#42C6A5',

},
header: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingBottom: 50
},
lottie: {
    width: 248,
    height: 208,
    textAlign: 'center'
},
header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    justifyContent: 'space-between',
},
textInput: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 10,
    color: '#05375a',
},
button: {
    alignItems: 'center',
    marginTop: 10
},
signIn: {
    width: '100%',
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
},
textSign: {
    fontSize: 18,
    fontWeight: 'bold'
}
});
      