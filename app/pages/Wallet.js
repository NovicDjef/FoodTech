
import React, {useState, useRef, useDebugValue} from 'react'
import { View, Text, TouchableOpacity, Image, StyleSheet, Dimensions, ScrollView, StatusBar } from 'react-native'
//import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon from "react-native-vector-icons/FontAwesome5";
import COLORS from '../consts/colors'
import {
    responsiveHeight,
    responsiveWidth,
    responsiveFontSize
  } from "react-native-responsive-dimensions";
import { useDispatch, useSelector } from 'react-redux';
import  BottomSheet  from 'react-native-raw-bottom-sheet';
import { TextInput } from 'react-native-paper';
import LottieView from 'lottie-react-native'
import { rechargeWallet } from '../redux/action/dataActions';
import { useTranslation } from 'react-i18next';

const {width, height} = Dimensions.get('window');
const CIRCLE_SIZE = width * 0.5;


    const Wallet = () => {

      const dispatch = useDispatch();
      const {t} = useTranslation();
        const bottomSheetRef = useRef(null);
        const [currentView, setCurrentView] = useState('main'); 
        const [numero_telephone, setNumero_telephone] = useState('');
        const [rechargeAmount, setRechargeAmount] = useState('');
      
        const walletBalance = useSelector((state) => state.authReducer.wallet)

        const recharge = () => {
          const userId = ''; // Replace this with the logic to get the current user's ID
          console.debug('Raw recharge amount:', rechargeAmount);
        
          const rechargeAmounts = parseFloat(rechargeAmount);
        
          if (!isNaN(rechargeAmounts)) {
            console.debug('Parsed recharge amount:', rechargeAmounts);
            dispatch(rechargeWallet(userId, rechargeAmounts));
            setCurrentView('recharge');
          } else {
            console.error('Invalid recharge amount:', rechargeAmount);
            // Handle the case where rechargeAmount is not a valid number
          }
        };

        const renderMainView = () => {
          return (
            <View
            style={styles.contentFilterBottom}>

            <Text body2 style={{marginTop: 10}}>{t("CHARGING_OPERATOR")}</Text>

            <View>
                <TouchableOpacity
                    style={[
                        styles.methodItem,
                        {
                            borderBottomColor: COLORS.grey,
                            borderBottomWidth: 1,
                        },
                    ]}
                    onPress={() => setCurrentView('orangeMoney')}
                    >
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                        }}>
                        <View style={styles.iconContent}>
                        <Image 
                          source={require('../assets/icons/orange.jpg')}
                          style={{width: 45, height: 30}}
                         />
                        </View>
                        <Text headline>{t("OM")}</Text>
                    </View>
                    <Icon
                        name="angle-right"
                        size={18}
                        color={COLORS.primary}
                        enableRTL
                    />
                </TouchableOpacity>
                <TouchableOpacity
                    style={[
                        styles.methodItem,
                        {
                            borderBottomColor: COLORS.grey,
                            borderBottomWidth: 1,
                        },
                    ]}
                    onPress={() => setCurrentView('mtnMobileMoney')}
                    >
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                        }}>
                        <View style={styles.iconContent}>
                         <Image 
                          source={require('../assets/icons/mtn.jpg')}
                          style={{width: 45, height: 30}}
                         />

                        </View>
                        <Text headline>{t("MOMO")}</Text>
                    </View>
                    <Icon
                        name="angle-right"
                        size={18}
                        color={COLORS.primary}
                        enableRTL
                    />
                </TouchableOpacity>
                
            </View>
             {/* <TouchableOpacity
                 style={styles.btn}
                 //onPress={() =>  setModalPaymentModal(false)}
                 >
                 <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>
                 Annuler 
                 </Text>
             </TouchableOpacity> */}
          

         </View>
          );
        };
      
        const renderOrangeMoneyView = () => {
          return (
            <View>
                 <View style={styles.header}>
                <Icon
                  name="angle-left"
                  size={28}
                  color={COLORS.black}
                  onPress={() => setCurrentView('main')}
                />
                <Icon name="bookmark" size={28} color={COLORS.white} />
              </View>
             
        <TextInput
          label="Numero de Téléphone"
          value={numero_telephone}
          placeholder="Entrez votre Numero de Téléphone..."
          onChangeText={(text) => setNumero_telephone(text)}
          mode="outlined"
          style={{marginLeft: 20, marginRight: 20, backgroundColor: '#f1f3f6'}}
           left={<TextInput.Icon icon="phone" color={COLORS.primary} />}
        />

        <TextInput
          label="Montant de Recharge"
          value={rechargeAmount}
          placeholder="Entrez le Montant De la Recharge..."
          onChangeText={(text) => setRechargeAmount(text)}
          mode="outlined"
          style={{marginLeft: 20, marginRight: 20, backgroundColor: '#f1f3f6'}}
           left={<TextInput.Icon icon="wallet" color={COLORS.primary} />}
        />
              <TouchableOpacity
                style={styles.btn}
                onPress={() => setCurrentView('recharge')}
              >
                <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>
                {t("RECHARGE")}
                </Text>
              </TouchableOpacity>
            </View>
          );
        };
      
        const renderMTNMobileMoneyView = () => {
          return (
            <View>
            <View style={styles.header}>
           <Icon
             name="angle-left"
             size={28}
             color={COLORS.black}
             onPress={() => setCurrentView('main')}
           />
           <Icon name="bookmark" size={28} color={COLORS.primary} />
            </View>
        

        <TextInput
          label="Numero de Téléphone"
          value={numero_telephone}
          placeholder="Entrez votre Numero de Téléphone..."
          onChangeText={(text) => setNumero_telephone(text)}
          mode="outlined"
          style={{marginLeft: 20, marginRight: 20, backgroundColor: '#f1f3f6'}}
            left={<TextInput.Icon icon="phone" color={COLORS.primary} />}
        />

        <TextInput
          label="Montant de Recharge"
          value={rechargeAmount}
          placeholder="Entrez le Montant De la Recharge..."
          onChangeText={(text) => setRechargeAmount(text)}
          mode="outlined"
          style={{marginLeft: 20, marginRight: 20, backgroundColor: '#f1f3f6'}}
            left={<TextInput.Icon icon="wallet" color={COLORS.primary} />}
        />
         <TouchableOpacity
           style={styles.btn}
           onPress={recharge}
         >
           <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>
              {t("RECHARGE")}
           </Text>
         </TouchableOpacity>
            </View>
          );
        };

        const renderRechargeView = () => {
          return(
            <>
              <View style={styles.header}>
                <Icon
                  name="angle-left"
                  size={28}
                  color={COLORS.black}
                  onPress={() => setCurrentView('main')} />
                <Icon name="bookmark" size={28} color={COLORS.primary} />
              </View>
              <View
              style={{
                width: '100%',
                height: '100%',
                backgroundColor: '#f1f3f6',

                alignItems: 'center',
                paddingTop: 20,
              }}>
                <LottieView
                  style={styles.lottie}
                  source={require("../assets/json/link_card.json")}
                  autoPlay
                  loop />
              </View>
            </>
          )
        }

         return(
     
            <>
                <View style={{
                    backgroundColor: COLORS.primary,
                    borderRadius: 22,
                    height: responsiveHeight(10),
                    width: responsiveWidth(88),
                    marginHorizontal: 22,
                    flexDirection: 'row',
                    justifyContent: "space-between"
                    }}
                >
        
                <View style={{
                        margin: 12,
                    }}>
                    <BottomSheet
                        ref={bottomSheetRef}
                        closeOnDragDown={true}
                        height={250}
                        openDuration={250}
                        customStyles={{
                            container: {
                            borderTopLeftRadius: 30,
                            borderTopRightRadius: 30,
                            backgroundColor: '#f1f3f6'
                            },
                        }}
                    >
                        {currentView === 'main' && renderMainView()}
                        {currentView === 'orangeMoney' && renderOrangeMoneyView()}
                        {currentView === 'mtnMobileMoney' && renderMTNMobileMoneyView()}
                        {currentView === 'recharge' && renderRechargeView()}
            
                    </BottomSheet>   
                    <TouchableOpacity
                        style={{position: 'absolute', top: 2}}
                        onPress={() => {
                            bottomSheetRef.current.open()
                        }}
                    >
                        <Text style={{ width: responsiveWidth(24), borderRadius: 10, backgroundColor: COLORS.accentColor, textAlign: "center", color: COLORS.white, fontSize: 20,  }}>{t("TOP_UP_ACCOUNT")}</Text>
                    </TouchableOpacity>
                    
                </View>
                <View style={{
                    margin: 12,
                    left: 12,
                }}>
                    
                    <Text style={{ color: COLORS.white, fontSize: 23, fontWeight: 700, right: 18 }}>{walletBalance} XAF</Text>
        
        
                </View>
                

                </View>
            </>
         )
       }
       
    
const styles = StyleSheet.create({
container: {
    flex: 1,
    backgroundColor: COLORS.grey,
},
lottie: {
  width: 148,
  height: 148,
  textAlign: 'center'
},
     
btn: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
    backgroundColor: COLORS.primary,
    marginHorizontal: 20,
    borderRadius: 10,
    },
    
    
    contain: {
        alignItems: 'center',
        marginTop: 40,
        paddingBottom: 20,
        paddingLeft: 20,
        paddingRight: 20,
        flex: 1,
    },
    
    bottomModal: {
        justifyContent: 'flex-end',
        margin: 0,
    },
    contentFilterBottom: {
        width: "100%",
        borderTopLeftRadius: 28,
        borderTopRightRadius: 28,
        paddingHorizontal: 20,
    },
    contentSwipeDown: {
        paddingTop: 10,
        alignItems: 'center',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 20,
        justifyContent: 'space-between',
      },
    contentActionModalBottom: {
        flexDirection: 'row',
        paddingVertical: 15,
        justifyContent: 'space-between',
        borderBottomWidth: 1,
    },
    containModal: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    floatingButtonAdd: {
        backgroundColor: COLORS.primary,
        position: "absolute",
        width: 25,
        bottom: 0,
        zIndex: 1000,
        right: 20,
        top: 35,
        height: 25,
        borderRadius: 12.5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    contentSwitch: {
        width: responsiveWidth(40),
    },
    switch: {},
    choosePhotoBtn: {
        marginTop: 10,
        marginBottom: 10,
        width: "auto",
        height: "auto",
        padding: 5,
        alignItems: 'center',
        borderColor: COLORS.grey,
        marginRight: 10,
        elevation: 2,
    },
    checkbox: {
        alignSelf: "center",
        color: "white"
    },
    itemAmountPerMonth: {
        paddingLeft: 10,
        marginTop: 10,
        flexDirection: 'row',
    },
    dot: {
        width: 12,
        height: 12,
        borderRadius: 6
    },
    blockView: {
        paddingVertical: 10,
        borderBottomWidth: 0.5,
    },
    containPaymentMethod: {
        flex: 1,
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 15,
    },
    methodItem: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 15,
        marginBottom: 5,
    },
    iconContent: {
        width: 30,
        marginRight: 10,
        alignItems: 'center',
    }
      });


export default Wallet;