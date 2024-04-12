import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  ImageBackground,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  ActivityIndicator,
} from 'react-native';
import Button from 'apsl-react-native-button';
// import Dialog from "react-native-dialog";
// import LottieView from 'lottie-react-native';
import COLORS from '../consts/colors';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize
} from "react-native-responsive-dimensions";
import Modal from "react-native-modal";
import { ScreenComponent } from './errors/ScreenComponent';
import { useDispatch, useSelector } from 'react-redux';
import { debitWallet } from '../redux/action/walletAction';
import { fetchLot } from '../redux/action/dataActions';


const {width, height} = Dimensions.get('window');
const CIRCLE_SIZE = width * 0.5;



const DetailsScreen = ({ route }) => {
   
  const { lotId } = route.params;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchLot(lotId));
    console.debug(",n,,cnd :..", lotId )
  }, [dispatch, lotId]);

  const { data, isLoading, error } = useSelector((state) => state.lotReducer);
  console.log("bobobob;;: ", data)
  if (isLoading) {
    return (
      <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
        <Text style={{ justifyContent: 'center', alignItems: 'center',}}>Loading...</Text>
      <ActivityIndicator size="large" color="COLORS.primary"/>
    </View>
    )
  }

  if (error) {
    return <Text>Error: {error}</Text>;
  }

 
  const [selectedEmojis, setSelectedEmojis] = useState([]);
  //const [emojiToRandomNumber, setEmojiToRandomNumber] = useState({});
  const [modalPaymentModal, setModalPaymentModal] = useState(false)
  
 
   //const walletBalance = useSelector((state) => state.walletBalance);
  //let calculatedAmount  = `${item.price * selectedEmojis.length}`

  // const handleValidateGame = (lotId, walletBalance ) => {

  //   if (walletBalance >= calculatedAmount) {
  //   // Appeler l'action "debitWallet" pour débiter le wallet après la validation du jeu
  //   dispatch(debitWallet( calculatedAmount ));
  //   alert('Bingo! Vous avez gagné le jeu.');
  // } else {
  //   // Solde insuffisant, affichez une alerte
  //   alert('Solde insuffisant. Rechargez votre wallet.');
  //   }
  // };
 // let calculatedAmount = `${lot.price * selectedEmojis.length}`;

// const handleValidateGame = (lotId, walletBalance) => {
//   if (walletBalance >= calculatedAmount) {
//     console.warn("walletBalance", walletBalance)
//     console.debug("calculatedAmount", calculatedAmount)
//     // Solde suffisant, débitez le montant et affichez "Bingo"
//     dispatch(debitWallet(calculatedAmount));
//     alert('Bingo! Vous avez gagné le jeu.');
//   } else {
//     // Solde insuffisant, affichez une alerte appropriée
//     alert(`Solde insuffisant. Rechargez votre wallet. car votre solde est de: ${walletBalance} `, {walletBalance} );
//   }
// };
  
  // const uniqueRandomNumbers = Array.from({ length: 20 }, () => {
  //   let randomNumber
  //   do {
  //     randomNumber = Math.floor(Math.random() * 20) + 1;
  //   } while (uniqueRandomNumbers.includes(randomNumber));
  //   return randomNumber;
  // });

  // const uniqueRandomNumbers = Array.from({ length: 20 }, () => {
  //   let randomNumber
  //   do {
  //     randomNumber = Math.floor(Math.random() * 20) + 1;
  //   } while (uniqueRandomNumbers.includes(randomNumber));
  //   return randomNumber;
  // });
//   const uniqueRandomNumbers = [];
// while (uniqueRandomNumbers.length < 20) {
//   let randomNumber;
//   do {
//     randomNumber = Math.floor(Math.random() * 20) + 1;
//   } while (uniqueRandomNumbers.includes(randomNumber));
//   uniqueRandomNumbers.push(randomNumber);
// }



  // const toggleEmoji = (emoji, index) => {
  //   if (selectedEmojis.includes(emoji)) {
  //     setSelectedEmojis(selectedEmojis.filter((e) => e !== emoji));
  //   } else {
  //       const randomNumber = uniqueRandomNumbers.pop();
  //     setSelectedEmojis([...selectedEmojis, emoji]);
  //     setEmojiToRandomNumber({ ...emojiToRandomNumber, [emoji]: randomNumber });
  //   }
  // };

  const showModal = () => {
    setModalPaymentModal(true)
  };

  // const hideModal = () => {
  //   navigation.push('payment')
  // }

  // const Validation = () => {
  //   navigation.navigate('animationJeux')
    
  // }



  const renderPaymentMethodModal = () => (

           <ScrollView style={{flex: 1, borderRadius: 22}}>
               <View style={[styles.containModal, {backgroundColor: COLORS.white}]}>
                   <Modal
                       isVisible={modalPaymentModal}
                       onSwipeComplete={() => {
                           setModalPaymentModal(false);
                       }}
                       swipeDirection={['down']}
                       style={styles.bottomModal}>
                       <View
                           style={[
                               styles.contentFilterBottom,
                               {backgroundColor: COLORS.secondary},
                           ]}>
                           <View style={styles.contentSwipeDown}>
                               <View style={styles.lineSwipeDown}/>
                           </View>
     
                           <Text body2 style={{marginTop: 10}}>Detail du Jeux</Text>
     
                           {/* <View>
                               <TouchableOpacity
                                   style={[
                                       styles.methodItem,
                                       {
                                           borderBottomColor: COLORS.grey,
                                           borderBottomWidth: 1,
                                       },
                                   ]}
                                   onPress={() => {
                                   }}>
                                   <View
                                       style={{
                                           flexDirection: 'row',
                                           alignItems: 'center',
                                       }}>
                                       <View style={styles.iconContent}>
                                           <Icon name="wallet" size={24} color={COLORS.text}/>
                                       </View>
                                       <Text headline>Orange Money</Text>
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
                                   onPress={() => {
                                       
                                      
                                   }}>
                                   <View
                                       style={{
                                           flexDirection: 'row',
                                           alignItems: 'center',
                                       }}>
                                       <View style={styles.iconContent}>
                                           <Icon
                                               name="cc-visa"
                                               size={24}
                                               color={COLORS.text}
                                           />
                                       </View>
                                       <Text headline>MTN Mobile Money</Text>
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
                                   onPress={() => {
                                   }}>
                                   <View
                                       style={{
                                           flexDirection: 'row',
                                           alignItems: 'center',
                                       }}>
                                       <View style={styles.iconContent}>
                                           <Icon
                                               name="mobile-alt"
                                               size={24}
                                               color={COLORS.text}
                                           />
                                       </View>
                                       <Text headline>Carte Visa</Text>
                                   </View>
                                   <Icon
                                       name="angle-right"
                                       size={18}
                                       color={COLORS.primary}
                                       enableRTL
                                   />
                               </TouchableOpacity>
                           </View> */}
                           <View style={[style.blockView, {borderBottomColor: COLORS.primary}]}>
          <View style={{flexDirection: 'row', marginTop: 10}}>
              <View style={{flex: 1}}>
                  <Text style={[style.body2]}>Vous</Text>
              </View>
              <View style={{flex: 1, alignItems: 'flex-end'}}>
                  <Text style={[Typography.caption1, COLORS.grey]}>Novic-djef</Text>
              </View>
          </View>
          <View style={{flexDirection: 'row', marginTop: 10}}>
              <View style={{flex: 1}}>
                  <Text style={[style.body2]}>Prix unitaire Jeux</Text>
              </View>
              <View style={{flex: 1, alignItems: 'flex-end'}}>
                  <Text
                      style={[Typography.caption1, COLORS.grey]}>{data.prix} Frs</Text>
              </View>
          </View>
          <View style={{flexDirection: 'row', marginTop: 10}}>
              <View style={{flex: 1}}>
                  <Text tyle={[Typography.body2]}>Dessin Choisir: </Text>
              </View>
              <View style={{flex: 1, alignItems: 'flex-end', flexDirection: "row", justifyContent: 'flex-end' }}>
              {selectedEmojis.map((emoji, index) => (
                <Text style={[Typography.caption1, {color: '#52c0b4'},]} key={index}>
                    {emoji};   
                </Text>
                ))}
                  
              </View>
          </View>
      </View>
      <View style={{paddingVertical: 10}}>
      <View style={{flexDirection: 'row', marginTop: 10}}>
              <View style={{flex: 1}}>
                  <Text tyle={[Typography.body2]}>Total choix: </Text>
              </View>
              <View style={{flex: 1, alignItems: 'flex-end'}}>
                  <Text
                      style={[Typography.caption1, COLORS.orange]}>
                        {selectedEmojis.length} Dessins
                      </Text>
              </View>
          </View>
     
          
          <View style={{flexDirection: 'row', marginTop: 10}}>
              <View style={{flex: 1}}>
                  <Text tyle={[Typography.body2]}>Net a payer</Text>
              </View>
              <View style={{flex: 1, alignItems: 'flex-end'}}>
                  <Text style={[Typography.caption1, COLORS.grey, ]}>{} Frs</Text>
                  <Text>Wallet Balance: {} Frs</Text>
              </View>
          </View>
 </View>
 <TouchableOpacity
        style={style.btn}
        //onPress={() => handleValidateGame(1, calculatedAmount)}
        >
        <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>
          Jouer Maintenant 
        </Text>
      </TouchableOpacity>
                           {/* <Button
                               full
                               style={{marginTop: 10, marginBottom: 20}}
                               onPress={() => {setModalPaymentModal(false)}}>
                               Ok
                           </Button> */}
     
                       </View>
                   </Modal>
               </View>
              
           </ScrollView>
     
)

  return (
      <KeyboardAvoidingView
    behavior={Platform.OS === 'android' ? 'height' : 'padding'}
    style={{flex: 1}}>
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        backgroundColor: COLORS.white,
        paddingBottom: 20,
      }}>
        {/* faire disparetre le blac qui se trouve au dessus de la page la ou il ya le reseau, la batttery les notifications */}
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="rgba(0,0,0,0)"
      />
      <ImageBackground style={style.headerImage} source={data && data.image} >
        <View style={style.header}>
          <Icon
            name="arrow-back-ios"
            size={28}
            color={COLORS.white}
            onPress={() => {navigation.goBack()}}
          />
          <Icon name="bookmark-border" size={28} color={COLORS.white} />
        </View>
      </ImageBackground>
      <View>
        <View style={style.iconContainer}>
          <Icon name="place" color={COLORS.white} size={28} />
        </View>
        <View style={{marginTop: 20, paddingHorizontal: 20}}>
          <Text style={{fontSize: 20, fontWeight: 'bold'}}>{data && data.name}</Text>
          <Text
            style={{
              fontSize: 12,
              fontWeight: '400',
              color: COLORS.grey,
              marginTop: 5,
            }}>
              {data && data.description}
          </Text>
          <View
          style={{
            marginTop: 20,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <Text style={{fontSize: 20, fontWeight: 'bold'}}>
            Jouer a seulement {data && data.id}
          </Text>
          <View style={style.priceTag}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: 'bold',
                color: COLORS.grey,
                marginLeft: -14,
              }}>
               {data && data.prix}Frs
            </Text>
            <Text
              style={{
                fontSize: 12,
                fontWeight: 'bold',
                color: COLORS.grey,
                marginLeft: 5,
              }}>
              le numero
            </Text>
          </View>
        </View>
        <View style={style.grid}>
        {/* <LottieView
                style={style.lottie}
                source={require("../assets/json/congratulate.json")}
                autoPlay
                loop
            /> */}
        {/* {lot.emojis.map((emoji, index) => ( */}
          <TouchableOpacity
            //key={index}
            style={[
              style.emojiContainer,
              //{ backgroundColor: selectedEmojis.includes(emoji) ? 'lightgray' : 'transparent' },
            ]}
            //onPress={() => toggleEmoji(emoji, index)}
          >
            <Text style={style.emoji}>
              {/* {selectedEmojis.includes(emoji) ? emoji : emoji} */}
            </Text>
          </TouchableOpacity>
        {/* ))} */}
      </View>
      <TouchableOpacity
        style={style.btn}
        onPress={showModal}
        >
        <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>
          Continuer 
        </Text>
      </TouchableOpacity>
        </View>
        
      </View>
      
      {/* <Dialog.Container useNativeDriver={true} visible={modalVisible} >
  
  <Dialog.Title>Detail de votre choix</Dialog.Title>

  <View>

      <View style={[style.blockView, {borderBottomColor: COLORS.primary}]}>
          <View style={{flexDirection: 'row', marginTop: 10}}>
              <View style={{flex: 1}}>
                  <Text style={[style.body2]}>Vous</Text>
              </View>
              <View style={{flex: 1, alignlots: 'flex-end'}}>
                  <Text style={[Typography.caption1, COLORS.grey]}>Novic-djef</Text>
              </View>
          </View>
          <View style={{flexDirection: 'row', marginTop: 10}}>
              <View style={{flex: 1}}>
                  <Text style={[style.body2]}>Prix unitaire Jeux</Text>
              </View>
              <View style={{flex: 1, alignlots: 'flex-end'}}>
                  <Text
                      style={[Typography.caption1, COLORS.grey]}>{lot.price} Frs</Text>
              </View>
          </View>
          <View style={{flexDirection: 'row', marginTop: 10}}>
              <View style={{flex: 1}}>
                  <Text tyle={[Typography.body2]}>Dessin Choisir: </Text>
              </View>
              <View style={{flex: 1, alignlots: 'flex-end', flexDirection: "row", justifyContent: 'flex-end' }}>
              {selectedEmojis.map((emoji, index) => (
                <Text style={[Typography.caption1, {color: '#52c0b4'},]} key={index}>
                    {emoji};   
                </Text>
                ))}
                  
              </View>
          </View>
      </View>
      <View style={{paddingVertical: 10}}>
      <View style={{flexDirection: 'row', marginTop: 10}}>
              <View style={{flex: 1}}>
                  <Text tyle={[Typography.body2]}>Total choix: </Text>
              </View>
              <View style={{flex: 1, alignlots: 'flex-end'}}>
                  <Text
                      style={[Typography.caption1, COLORS.orange]}>
                        {selectedEmojis.length} Dessins
                      </Text>
              </View>
          </View>
     
          
          <View style={{flexDirection: 'row', marginTop: 10}}>
              <View style={{flex: 1}}>
                  <Text tyle={[Typography.body2]}>Net a payer</Text>
              </View>
              <View style={{flex: 1, alignlots: 'flex-end'}}>
                  <Text style={[Typography.caption1, COLORS.grey, ]}>{lot.price * selectedEmojis.length} Frs</Text>
              </View>
          </View>
      </View>
  </View>

  <Dialog.Button bold={true} label="Annuler" onPress={() => {
      hideModal()
  }}/>
  <Dialog.Button bold={true} label="Valider" onPress={() => {
    Validation()


  // }}
  // />

  //     </Dialog.Container> */}
      {modalPaymentModal && renderPaymentMethodModal()}
     </ScrollView>
     </KeyboardAvoidingView>
   );
};
const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: COLORS.grey,
 },
 btnvalide: {
  marginTop: 20,
  marginLeft: 20,
  marginRight: 20,
  borderColor: 'transparent',
  backgroundColor: COLORS.grey,
  height: 52
},
subbigtitle: {
  color: 'white',
  fontSize: 17,
  textAlign: 'center',
  margin: 5,
},
textbtnvalide: {
color: 'white',
fontWeight: 'bold'
},
    dropdownContainer: {
      borderWidth: 1,
      borderRadius: 4,
      paddingHorizontal: 10,
    },
  textInput: {
      height: 46,
      backgroundColor: COLORS.black,
      borderRadius: 5,
      marginTop: 10,
      padding: 10,
      width: '100%',
  },
  lineRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingBottom: 20,
  },
  contain: {
      alignItems: 'center',
      marginTop: 40,
      paddingBottom: 20,
      paddingLeft: 20,
      paddingRight: 20,
      flex: 1,
  },
  circle: {
      width: CIRCLE_SIZE,
      height: CIRCLE_SIZE,
      borderRadius: CIRCLE_SIZE / 2,
      position: 'absolute',
      top: '15%',
  },
  circleContainer: {
      alignItems: 'flex-end',
      right: -(CIRCLE_SIZE / 3),
      top: -(CIRCLE_SIZE / 1.5),
  },
  lineSeparator: {
      borderWidth: 1,
      width: '40%',
      height: 1,
      alignSelf: 'center',
  },
  line: {
      width: 1,
      height: 14,
      backgroundColor: COLORS.grey,
      marginLeft: 10,
  },
  contentModeView: {
      width: 30,
      height: '100%',
      alignItems: 'flex-end',
      justifyContent: 'center',
  },
  contentFilter: {
      flexDirection: 'row',
      alignItems: 'center',
      marginLeft: 10,
  },
  bottomModal: {
      justifyContent: 'flex-end',
      margin: 0,
  },
  contentFilterBottom: {
      width: "100%",
      borderTopLeftRadius: 22,
      borderTopRightRadius: 22,
      paddingHorizontal: 20
  },
  contentSwipeDown: {
      paddingTop: 10,
      alignItems: 'center',
  },
  lineSwipeDown: {
      width: 30,
      height: 2.5,
      backgroundColor: COLORS.grey,
  },
  contentActionModalBottom: {
      flexDirection: 'row',
      paddingVertical: 15,
      justifyContent: 'space-between',
      borderBottomWidth: 1,
  },
  containModal: {
      paddingVertical: 100,
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
  },
  input: {
      height: 60,
      marginTop: responsiveHeight(2),
      marginLeft: responsiveWidth(5),
      marginRight: responsiveWidth(5),
      borderRadius: 5,
  }
});
export const FontWeight = {
  thin: "100",
  ultraLight: "200",
  light: "300",
  regular: "400",
  medium: "500",
  semibold: "600",
  bold: "700",
  heavy: "800",
  black: "900"
};
const style = StyleSheet.create({
  lottie: {
    width: 148,
    height: 148
},
  btn: {
    height: 55,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
    backgroundColor: COLORS.primary,
    marginHorizontal: 20,
    borderRadius: 10,
  },

  priceTag: {
    height: 40,
    alignItems: 'center',
    marginLeft: 30,
    paddingLeft: 20,
    top: -8,
    flex: 1,
    backgroundColor: COLORS.secondary,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    flexDirection: 'row',
  },
  iconContainer: {
    position: 'absolute',
    height: 60,
    width: 60,
    backgroundColor: COLORS.primary,
    top: -30,
    right: 20,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerImage: {
    height: 250,
    borderBottomRightRadius: 40,
    borderBottomLeftRadius: 40,
    overflow: 'hidden',
  },
  header: {
    marginTop: 60,
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    justifyContent: 'space-between',
  },

// style autre : 
container: {
  flex: 1,
  marginTop: 22,
 // alignItems: 'center',
},
grid: {
  flexDirection: 'row',
  flexWrap: 'wrap',
  alignItems: 'stretch',
  justifyContent: 'space-between',
},
result: {
  marginTop: 20,
 
},
emojiContainer: {
  width: 45,
  height:45,
  margin: 5,
  alignItems: 'center',
  justifyContent: 'center',
  borderWidth: 1,
  borderColor: '#ccc',
  borderRadius: 5,
},
selectedEmojis: {
  flexDirection: 'row',
  marginTop: 10,
},
emojiText: {
  fontSize: 20,
},
selectionContainer: {
  marginTop: 20,
},
selectionText: {
  fontSize: 18,
  fontWeight: 'bold',
},

btn: {
  height: 55,
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: 40,
  backgroundColor: COLORS.primary,
  marginHorizontal: 20,
  borderRadius: 10,
},

header: {
  marginTop: 30,
  marginBottom: 12,
  flexDirection: 'row',
  alignItems: 'center',
  marginHorizontal: 20,
  justifyContent: 'space-between',
},
modalContainer: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
},
modalContent: {
  backgroundColor: 'white',
  padding: 20,
  borderRadius: 10,
  alignItems: 'center',
},
selectedEmoji: {
  fontSize: 14,
  paddingLeft: 22
  
},
modalButton: {
  backgroundColor: 'blue',
  padding: 10,
  borderRadius: 5,
  marginTop: 10,
  width: 100,
  alignItems: 'center',
  margin: 22
},
blockView: {
  paddingVertical: 10,
  borderBottomWidth: 1
},



});
export const Typography = StyleSheet.create({
  header: {
       fontSize: 34,
       fontWeight: FontWeight.regular
  },
  title1: {
       fontSize: 28,
       fontWeight: FontWeight.regular
  },
  title2: {
       fontSize: 22,
       fontWeight: FontWeight.regular
  },
  title3: {
       fontSize: 20,
       fontWeight: FontWeight.regular
  },
  headline: {
       fontSize: 17,
       fontWeight: FontWeight.regular
  },
  body1: {
       fontSize: 17,
       fontWeight: FontWeight.regular
  },
  body2: {
       fontSize: 14,
       fontWeight: FontWeight.regular
  },
  callout: {
       fontSize: 17,
       fontWeight: FontWeight.regular
  },
  subhead: {
       fontSize: 15,
       fontWeight: FontWeight.regular
  },
  footnote: {
       fontSize: 13,
       fontWeight: FontWeight.regular
  },
  caption1: {
       fontSize: 12,
       fontWeight: FontWeight.regular
  },
  caption2: {
       fontSize: 11,
       fontWeight: FontWeight.regular
  },
  overline: {
       fontSize: 10,
       fontWeight: FontWeight.regular
  }
});

// const mapStateToProps = (state) => ({
//   data: state.lotReducer.data,
//   isLoading: state.lotReducer.isLoading,
//   error: state.lotReducer.error,
// });

export default DetailsScreen


