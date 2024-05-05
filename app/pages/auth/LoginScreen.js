import React, { useState, useEffect } from 'react'
import { 
  View, 
  Text, 
  TouchableOpacity, 
  TextInput,
  Platform,
  StyleSheet ,
  StatusBar,
  Dimensions,
  ActivityIndicator,
  TouchableWithoutFeedback,
  Keyboard, } from 'react-native'
  import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import LottieView from 'lottie-react-native';
import { COLORS } from '../../constants';
import { authenticateUser, verifyOTP } from '../../redux/action/authActions';


const LoginScreen = ({navigation}) => {
    const {t} = useTranslation();
    const dispatch = useDispatch();    
    const [loading, setLoading] = useState(false);
    const [userData, setUserData] = useState({
      username: '',
      phone: ''
    });
    const [errors, setErrors] = useState({
      username: '',
      phone: '',
    });
  
    const handleChange = (name, value) => {
      setUserData({ ...userData, [name]: value });
    };
    const validateForm = () => {
      let isValid = true;
      const newErrors = {};
  
      // Validation du nom d'utilisateur
      if (userData.username.length < 4) {
        newErrors.username = 'Le nom d\'utilisateur doit contenir au moins 4 caractères.';
        isValid = false;
      } else {
        newErrors.username = '';
      }
  
      // Validation du numéro de téléphone
      if (!/^\d{9}$/.test(userData.phone)) {
        newErrors.phone = 'Le numéro de téléphone doit contenir exactement 9 chiffres.';
        isValid = false;
      } else {
        newErrors.phone = '';
      }
  
      setErrors(newErrors);
  
      return isValid;
    };
    const handleSubmit = () => {
      const isValid = validateForm();

      if(isValid){
        setLoading(true);
        dispatch(authenticateUser(userData));
         navigation.navigate('otp');
         setLoading(false);
        } 
    };
    
    console.log('userData :', userData)

    const renderMainView = () => {
      return(
        <>
          <View
                  style={{
                    width: '100%',
                    height: '10%',
                    alignItems: 'center',
                    paddingTop: 70,
                  }}>
                    <LottieView
                      style={styles.lottie}
                      source={require("../../../assets/json/animation_lljmrq2l.json")}
                      autoPlay
                      loop />
          </View>
            <Animatable.Text style={[styles.titleText, {top: 22}]} animation='fadeInUp' delay={1200} > {t("WELCOME")} </Animatable.Text> 
          <Animatable.View
            animation="fadeInUpBig"
            style={styles.bottomView}
          >
              <Text style={styles.loginText}>{t("NAME_PSUDO")}</Text> 
        <View style={styles.inputView}> 
        <FontAwesome 
            name="user-o"
            color={COLORS.primary}
            size={30}
            style={styles.inputIcon}
        />
        <TextInput 
        style={styles.input} 
        value={userData.username} 
        onChangeText={(value) => handleChange('username', value)}
        placeholder='Username' 
        autoCapitalize='none' 
        textContentType='username'
        />
        </View> 
        {errors.username && <Text style={styles.ErrorText}>{errors.username}</Text>}
            <Text style={styles.loginText}>{t("PHONE_NUMBER")}</Text> 
        <View style={styles.inputView}> 
        <FontAwesome
          name="phone"
          color={COLORS.primary}
          size={30}
          style={styles.inputIcon} />
          <Text style={{fontSize: 20}}>+237 :</Text>
        <TextInput 
          style={styles.input} 
          placeholder='Téléphone' 
          autoCapitalize='none' 
          keyboardType='numeric' 
          value={userData.phone} 
          onChangeText={(value) => handleChange('phone', value)}
        />
        </View> 
        {errors.phone && <Text style={styles.ErrorText}>{errors.phone}</Text>}
        <TouchableOpacity
                style={{display: 'flex', alignSelf: 'flex-end', justifyContent:'flex-end', margin: 12 }}
                onPress={() => handleSubmit()}
              >
                        
              <LinearGradient
                colors={['#08d4c4', '#08d4c4']}
                style={[styles.signIn, {flexDirection: "row", width: 140,}]}
              >
                {loading ? (
                        <View style={{flexDirection: "row", justifyContent:"center"}}>
                          <ActivityIndicator size="small" color="#fff" />
                          <Text style={{color: "white", marginLeft: 12}}>Chargement...</Text>
                        </View>
                    ) : (
                <Text style={[styles.textSign, { color: '#fff', marginRight: 8 }]}> Continuer </Text>   
              )}
                <FontAwesome
                    name="angle-right"
                    color={COLORS.white}
                    size={30}
                    style={{marginRight: 8 }}
                  /> 
              </LinearGradient>
            
                    </TouchableOpacity>
        
          </Animatable.View>
        </>
      )
    }

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
          <StatusBar backgroundColor='#42C6A5' barStyle="light-content"/>
          {renderMainView()}
      </View>
    </TouchableWithoutFeedback>

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

export default LoginScreen;
