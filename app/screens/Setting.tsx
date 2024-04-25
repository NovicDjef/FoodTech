import {
    ColorSchemeName,
    StyleSheet,
    Switch,
    TouchableOpacity,
    View,
    Image,
    useColorScheme,
    ScrollView,
    RefreshControl,
  } from 'react-native';
  import React, { useCallback, useContext, useEffect, useState } from 'react';
  import { regular } from '../utils/fonts';
  import { Text, Card } from '../utils/theme';
  import DarkMode from '../utils/darkmode.context';
  import { useTranslation } from 'react-i18next';
  import i18n from '../utils/locales/i18n';
  import Icon from 'react-native-vector-icons/Ionicons';
  import { useDispatch, useSelector } from 'react-redux';
  import { logoutUser } from '../redux/reducer/authReducer';



export default function Setting() {
  const { isDarkMode, setIsDarkMode, useDeviceSettings, setUseDeviceSettings } =
    useContext(DarkMode);
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.user.userData)
    const { t } = useTranslation();

  const scheme = useColorScheme();
  const [refresh, setRefresh] = useState(false)
  const currentActivatedTheme: ColorSchemeName = isDarkMode ? 'dark' : 'light';
  function handleUseDeviceTheme() {
    setUseDeviceSettings(!useDeviceSettings);
    if (scheme === 'dark') {
      setIsDarkMode(true);
      return;
    }
    setIsDarkMode(false);
  }

  const toggleDarkMode = useCallback(() => {
    setIsDarkMode(!isDarkMode);
  }, [isDarkMode, scheme, useDeviceSettings]);

  useEffect(() => {
    if (currentActivatedTheme !== scheme) {
      setUseDeviceSettings(false);
    }
  }, [isDarkMode, useDeviceSettings]);

  const [language, setLanguage] = useState(i18n.language); // État pour suivre la langue actuelle

  const ChangLangue = () => {
    const newLanguage = language === 'fr' ? 'en' : 'fr'; // Inverser la langue actuelle
    i18n.changeLanguage(newLanguage);
    setLanguage(newLanguage); 
  }

  const handlelogoutUser = () => {
      dispatch(logoutUser());
  }
  const RefreshMe = () => {
    setRefresh(true)

    setTimeout(() => {
      setRefresh(false)
    }, 2000)
    
  }
  return (
      <Card isDarkMode={isDarkMode} style={{flex: 1,}} >
        <ScrollView 
         refreshControl={
          <RefreshControl 
            refreshing={refresh}
            onRefresh={() => RefreshMe()}
          />
        }>
            <View style={{display: "flex", alignItems: "center", justifyContent: "center", margin: 22}}>
              <Image style={{width: 70, height: 70}} source={require("../../assets/images/novic.png")} />
              <View  style={{flexDirection: "column", alignItems: "center"}}>
                <Text style={{color: isDarkMode ? "white" : "black", marginTop: 6}}>@{user.username}</Text>
                <Text style={{color: isDarkMode ? "white" : "black", margin: 2}}>+237 {user.phone}</Text>
              </View>
            </View>
            <View style={[styles.card, { backgroundColor: isDarkMode ? "#001630" : '#efefef' }]}>
              <View style={styles.option}>
              <View style={{flexDirection: "row", alignItems: "center"}}>
                <Icon name='cloudy-night' size={28} color={isDarkMode ? "white" : "black"} />
                <Text style={[styles.text, {color: isDarkMode ? "white" : "black", margin: 6}]} >
                {t('Device_theme')}
              </Text>
              </View>
              <Switch
                trackColor={{
                  true: '#02b875',
                  false: 'gray',
                }}
                onChange={handleUseDeviceTheme}
                value={useDeviceSettings}
                thumbColor={'white'}
              />
            </View>

            <View style={[styles.hr]} />


              <TouchableOpacity onPress={ChangLangue} style={styles.option}>
              <View style={{flexDirection: "row", alignItems: "center"}}>
                <Icon name='language' size={28} color={isDarkMode ? "white" : "black"} />
                <Text style={[styles.text, {color: isDarkMode ? "white" : "black", margin: 6}]}>
                  {t("Language")}
                </Text>
              </View>
              
            <View style={{flexDirection: "row" }}>
              <Text style={{fontSize: 18, fontWeight: "bold", margin: 4, color: isDarkMode ? "white" : "black"}}>{language === 'fr' ? 'Francais' : 'Anglais'}</Text>
              <Icon name='chevron-forward' size={24} color={isDarkMode ? "white" : "black"} />
            </View>
            </TouchableOpacity>

        

            <View style={[styles.hr]} />

            <View style={styles.option}>
            <View style={{flexDirection: "row", alignItems: "center"}}>
                <Icon name='sunny' size={28} color={isDarkMode ? "white" : "black"} />
                <Text style={[styles.text, {color: isDarkMode ? "white" : "black", margin: 6}]} isDarkMode={isDarkMode}>
                  {t('Dark_Mode')}
                </Text>
              </View>
              
              <Switch
                trackColor={{
                  true: '#02b875',
                  false: 'gray',
                }}
                value={isDarkMode}
                onChange={toggleDarkMode}
                thumbColor={'white'}
              />
            </View>
            </View>

            <View style={[styles.card, { backgroundColor: isDarkMode ? "#001630" : '#efefef',}]}>
              <View style={styles.option}>
              <View style={{flexDirection: "row", alignItems: "center"}}>
                <Icon name='notifications' size={24} color={isDarkMode ? "white" : "black"} />
                <Text style={[styles.text, {color: isDarkMode ? "white" : "black", margin: 6}]} >
                  {t('Notifications')}
                </Text>
              </View>
              <Switch
                trackColor={{
                  true: '#02b875',
                  false: 'gray',
                }}
                //onChange={handleUseDeviceTheme}
                //value={useDeviceSettings}
                thumbColor={'white'}
              />
            </View>

            <View style={[styles.hr]} />


              <TouchableOpacity onPress={() => {}} style={styles.option}>
              <View style={{flexDirection: "row", alignItems: "center"}}>
                <Icon name='information' size={28} color={isDarkMode ? "white" : "black"} />
                <Text style={[styles.text, {color: isDarkMode ? "white" : "black"}]}>
                  {t("Help")}
                </Text>
              </View>
            <View style={{flexDirection: "row" }}>
              <Icon name='chevron-forward' size={24} color={isDarkMode ? "white" : "black"} />
            </View>
            </TouchableOpacity>

            <View style={[styles.hr]} />

            <TouchableOpacity onPress={() => {}} style={styles.option}>
              <View style={{flexDirection: "row", alignItems: "center"}}>
                <Icon name='heart-outline' size={28} color={isDarkMode ? "white" : "black"}  />
                <Text style={[styles.text, {color: isDarkMode ? "white" : "black", marginLeft: 6,}]}>
                  {t("Invite_a_contact")}
                </Text>
              </View>
            <View style={{flexDirection: "row" }}>
              <Icon name='chevron-forward' size={24} color={isDarkMode ? "white" : "black"} />
            </View>
            </TouchableOpacity>


            <View style={[styles.hr]} />
            <TouchableOpacity onPress={() => handlelogoutUser()} style={styles.option}>
              <View style={{flexDirection: "row", alignItems: "center"}}>
                <Icon name='power' size={28} color={"red"} />
                <Text style={[styles.text, {color: isDarkMode ? "white" : "black", marginLeft: 6,}]}>
                  {t("Logout")}
                </Text>
              </View>
            <View style={{flexDirection: "row" }}>
              <Icon name='chevron-forward' size={24} color={isDarkMode ? "white" : "black"} />
            </View>
            </TouchableOpacity>
            </View>
        </ScrollView>
      </Card>
    
  );
}

const styles = StyleSheet.create({
  hr: {
    width: '100%',
    height: 1,
    backgroundColor: 'gray',
    opacity: 0.1,
  },
  text: {
    ...regular,
    fontSize: 16,
    textTransform: 'capitalize',
    opacity: 0.6,
  },
  option: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
  },
  card: {
    backgroundColor: 'white',
    margin: 15,
    borderRadius: 8,
  },
});
