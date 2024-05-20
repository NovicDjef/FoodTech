import {
    ColorSchemeName,
    StyleSheet,
    Switch,
    TouchableOpacity,
    View,
    Image,
    Share,
    useColorScheme,
    ScrollView,
    RefreshControl,
    Modal,
    TextInput
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
import { useNavigation } from '@react-navigation/native';
import { COLORS } from '../constants';
import { updateUser } from '../redux/action/authActions';


export default function Setting() {
  const navigation = useNavigation();
  const { isDarkMode, setIsDarkMode, useDeviceSettings, setUseDeviceSettings } =useContext(DarkMode);
  const scheme = useColorScheme();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.user.user)
    const { t } = useTranslation();

  const [refresh, setRefresh] = useState(false)
  const [modalVisible, setModalVisible] = useState(false);
  const [username, setUsername] = useState(user?.username || '');
  const [phone, setPhone] = useState(user?.phone || '');


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
  const handleContactSelect = async () => {
    try {
      await Share.share({
        message : "Téléchargez notre application via ce lien : https://example.com/download",
        title: 'Partager l\'application',
      });
    } catch (error) {
      console.error(error.message);
    }
  };
  const handleEdit = () => {
    dispatch(updateUser({ username, phone }))
    setModalVisible(false);
    console.log("user :", phone)
  };


  
  
  return (
      <Card isDarkMode={isDarkMode} style={{flex: 1,}} >
        <ScrollView 
         refreshControl={
          <RefreshControl 
            refreshing={refresh}
            onRefresh={() => RefreshMe()}
          />
        }>
            <Card style={[styles.card, { display: "flex", alignItems: "center", justifyContent: "space-around", margin: 22, flexDirection: 'row', backgroundColor: isDarkMode ? "#001630" : '#efefef' }]}>
          <Image style={{ width: 70, height: 70, borderRadius: 12 }} source={require("../../assets/images/novic.png")} />
          <View style={{ flexDirection: "column", justifyContent: "center" }}>
            <Text style={{ color: isDarkMode ? "white" : "black", marginTop: 6 }}>@_{user.username}</Text>
            <Text style={{ color: isDarkMode ? "white" : "black", margin: 2 }}>+237 {user.phone}</Text>
          </View>
          <TouchableOpacity onPress={() => setModalVisible(true)} style={{ flexDirection: "column", alignItems: "center" }}>
            <View style={{ width: 30, height: 30, borderRadius: 10, backgroundColor: "#3880ff" }}>
              <Icon name='create-outline' size={24} style={{ color: COLORS.white, textAlign: "center" }} />
            </View>
            <Text style={{ color: isDarkMode ? "white" : "black", margin: 2 }}>Modifier</Text>
          </TouchableOpacity>
        </Card>
            <Card style={[styles.card, { backgroundColor: isDarkMode ? "#001630" : '#efefef' }]}>
              <View style={styles.option}>
              <View style={{flexDirection: "row", alignItems: "center"}}>
                <Icon name='cloudy-night' size={28} color={isDarkMode ? "white" : "black"} />
                <Text style={[styles.text, {color: isDarkMode ? "white" : "black", margin: 6}]} >
                {t('Device_theme')}
              </Text>
              </View>
              <Switch
                trackColor={{
                  true: COLORS.primary,
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
            </Card>

            <Card style={[styles.card, { backgroundColor: isDarkMode ? "#001630" : '#efefef',}]}>
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


              <TouchableOpacity onPress={() => navigation.navigate("Helps")} style={styles.option}>
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

            <TouchableOpacity onPress={handleContactSelect} style={styles.option}>
              <View style={{flexDirection: "row", alignItems: "center"}}>
                <Icon name='paper-plane-outline' size={28} color={isDarkMode ? "white" : "black"}  />
                <Text style={[styles.text, {color: isDarkMode ? "white" : "black", marginLeft: 6,}]}>
                  {t("Invite_a_contact")}
                </Text>
              </View>
            <View style={{flexDirection: "row" }}>
              <Icon name='chevron-forward' size={24} color={isDarkMode ? "white" : "black"} />
            </View>
            </TouchableOpacity>
            <View style={[styles.hr]} />

            <TouchableOpacity onPress={() => navigation.navigate("favorite")} style={styles.option}>
              <View style={{flexDirection: "row", alignItems: "center"}}>
                <Icon name='heart-outline' size={28} color={isDarkMode ? "white" : "black"}  />
                <Text style={[styles.text, {color: isDarkMode ? "white" : "black", marginLeft: 6,}]}>
                  {t("Favorite")}
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
            </Card>

           {/* Modal for editing user info */}
        <Modal visible={modalVisible} animationType="slide" transparent={true}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Modifier les informations</Text>
              <TextInput
                style={styles.input}
                placeholder="Nom d'utilisateur"
                value={username}
                onChangeText={setUsername}
              />
              <TextInput
                style={styles.input}
                placeholder="Téléphone"
                value={phone}
                keyboardType="phone-pad"
                onChangeText={setPhone}
              />
              <View style={styles.modalButtons}>
                <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={() => setModalVisible(false)}>
                  <Text style={styles.buttonText}>Annuler</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={handleEdit}>
                  <Text style={styles.buttonText}>Enregistrer</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
        </ScrollView>
      </Card>
    
  );
}

const styles = StyleSheet.create({
  hr: {
    width: '100%',
    height: 1,
    backgroundColor: COLORS.gray90,
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
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: COLORS.gray30,
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  button: {
    padding: 10,
    borderRadius: 8,
    backgroundColor: COLORS.primary,
  },
  cancelButton: {
    backgroundColor: COLORS.gray50,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
})