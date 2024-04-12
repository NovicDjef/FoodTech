import React, {useRef, useState, useEffect } from 'react';
import {
  Dimensions,
  ImageBackground,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  ActivityIndicator,
} from 'react-native';
import COLORS from '../consts/colors';
import Icon from 'react-native-vector-icons/MaterialIcons';
import LottieView from 'lottie-react-native';
import {
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import { useDispatch, useSelector } from 'react-redux';
import { fetchLot } from '../redux/action/dataActions';
import  BottomSheet  from 'react-native-raw-bottom-sheet';
import { useNavigation } from '@react-navigation/native';


const {width, height} = Dimensions.get('window');
const CIRCLE_SIZE = width * 0.5;



const randomNumber = () => Math.floor(Math.random() * 30) + 1;

const WinningNumber = randomNumber();
const SPEED = 10; // La vitesse de défilement en millisecondes


const DetailsScreen = ({ route }) => {
  const bottomSheetRef = useRef(null);
  const { lotId } = route.params;
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [selectedItems, setSelectedItems] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [numbers, setNumbers] = useState(Array.from({ length: 5 }, () => randomNumber()));
  const [gameStatus, setGameStatus] = useState('running'); // 'running', 'won', 'lost';
  const [totalPrice, setTotalPrice] = useState(0);


  useEffect(() => {
    let intervalId;

    if (gameStatus === 'running') {
      intervalId = setInterval(() => {
        const newNumbers = [...numbers];
        newNumbers.pop();
        newNumbers.unshift(randomNumber());
        setNumbers(newNumbers);
      }, SPEED);
    }

    return () => clearInterval(intervalId);
  }, [numbers, gameStatus]);


  useEffect(() => {
    dispatch(fetchLot(lotId));
  }, [dispatch, lotId]);

  const {data, isLoading, error } = useSelector((state) => state.lotReducer);

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

   const handleEmojiPress = (lot) => {
    const isItemSelected = selectedItems.includes(lot);
    if (isItemSelected) {
      const updatedItems = selectedItems.filter((item) => item !== lot);
      setSelectedItems(updatedItems);
    } else {
      setSelectedItems([...selectedItems, lot]);
    }
    calculateTotalPrice();
  }
  function calculateTotalPrice() {

    const defaultPrice = lotId.prix; 
    const selectedItemsCount = selectedItems.length;
    if (selectedItemsCount === 0) {
      setTotalPrice(0);
      return;
    }
    const totalPrice = defaultPrice * selectedItemsCount;
    setTotalPrice(totalPrice);
  };

  const handleModalClose = () => {
    setModalVisible(false);
  };

  const imagePath = [
    '../assets/removebg/Image1.png',
  ]

  // Create a mapping between numbers and image sources
  const numberToImageSource = {};
  lotId.numero_masque.forEach((num) => {
    numberToImageSource[num] = require(`${imagePath}`);
  });


  const renderLottieAnimation = () => {
    switch (gameStatus) {
      case 'won':
        return (
          <LottieView
          style={styles.lottie}
             source={require("../assets/json/781-no-notifications.json")}
            autoPlay
            loop={false}
          />
        );
      case 'lost':
        return (
          <LottieView
          style={styles.lottie}
          source={require("../assets/json/781-no-notifications.json")}
            autoPlay
            loop={false}
          />
        );
      default:
        return null;
    }
  }

  const renderFloatingMenu = () => {

    return (
      <>
        {selectedItems.length > 0 && (
          <View style={style.modalContainer}>
          <View
            style={{
              height:70,
              width: 330,
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 40,
              backgroundColor: COLORS.primary,
              // marginHorizontal: 10,
              // marginVertical: 10,
              borderRadius: 30,
            }}
          
            >
              <View  style={{flexDirection: 'row', display: 'flex', justifyContent: 'space-between', right: 33}}>
              {selectedItems.map((item, index) => (
            <View key={index} style={{ 
              position: 'absolute',
             marginRight: 0,
             width: 30,
             height: 30,
            // borderRadius: 15,
            // overflow: 'hidden',
            //backgroundColor: COLORS.line,
             }}>
                <Image source={numberToImageSource[item]} style={style.selectedItemImage} />
                </View>
          ))}
                {/* <Text style={style.selectedItemText}>{selectedItems}</Text> */}
                <Text style={style.selectedItemText}>{totalPrice} XAF</Text>
              </View>
            
            
              <View style={{flexDirection: 'row', right: -80, top:-14}}>
                <View style={{}}>
              {gameStatus === 'running' && (
                  <TouchableOpacity onPress={() => {bottomSheetRef.current.open()}}>
                    <Text style={{
                      width: responsiveWidth(20), 
                      borderRadius: 10, 
                      backgroundColor: COLORS.accentColor, 
                      textAlign: "center", 
                      color: COLORS.white, 
                      fontSize: 22, 
                      fontWeight: 800 }}
                    >Jouer</Text>
                  </TouchableOpacity>
                  )}
                </View>
                <View style={{left: 32}}>
                  <TouchableOpacity onPress={handleModalClose}>
                    <Icon style={{fontSize: 24, top: -40, left: -14, color: 'white', fontWeight: 800}} name='close' />
                  </TouchableOpacity>
                </View>
              </View>
          </View>
          </View>
        )}
      </>
    );
  };


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
       
            <ImageBackground  style={style.headerImage}  >
              <View style={style.header}>
                <Icon
                  name="arrow-back-ios"
                  size={28}
                  color={COLORS.black}
                  onPress={() => {navigation.goBack()}}
                />
                <Icon name="bookmark" size={28} color={COLORS.white} />
              </View>
            </ImageBackground>
            

              <View style={style.iconContainer}>
                <Icon name="place" color={COLORS.white} size={28} />
                {/* <Text style={{position: 'relative', color: COLORS.white}} >{item.numero_gagnat}</Text> */}
              </View>
              <View  style={{marginTop: 20, paddingHorizontal: 20}}>
                <Text style={{fontSize: 20, fontWeight: 'bold'}}>{lotId.name}</Text>
                <Text
                  style={{
                    fontSize: 12,
                    fontWeight: '400',
                    color: COLORS.grey,
                    marginTop: 5,
                  }}>
                    {lotId.description}
                </Text>
                <View
                style={{
                  marginTop: 20,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <Text style={{fontSize: 20, fontWeight: 'bold'}}>
                  Jouer a seulement 
                </Text>
                <View style={style.priceTag}>
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: 'bold',
                      color: COLORS.grey,
                      marginLeft: -14,
                    }}>
                    {lotId.prix}Frs
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
                {lotId.numero_masque.map((lot, index) => (
                  <TouchableOpacity
                    style={[styles.imageContainer,
                      selectedItems.includes(lot) && styles.selectedItem,
                    ]}
                    key={index}
                    onPress={() => handleEmojiPress(lot)}
                  >
                    <Image source={numberToImageSource[lot]} style={{width: 50, height: 50}} />
                  </TouchableOpacity>
        ))}
              </View>
              {renderFloatingMenu()}
              </View>
          {/* ))} */}
            <BottomSheet
              ref={bottomSheetRef}
              closeOnDragDown={true}
              height={380}
              openDuration={250}
              customStyles={{
                container: {
                  borderTopLeftRadius: 30,
                  borderTopRightRadius: 30,
                  backgroundColor: '#f1f3f6'
                },
              }}
              >
              
                <View
                  style={{
                    width: '100%',
                    height: '100%',
                    backgroundColor: '#f1f3f6',
                    alignItems: 'center',
                    paddingTop: 5,
                  }}>
                     <View style={styles.BlocLottieText}>
                      <View style={style.lottie}>
                      <LottieView
                      style={style.lottie}
                      source={require("../assets/json/boule_magique_roze.json")}
                      autoPlay
                      loop
                    /> 
                      </View>
                        <Text style={{fontSize: 18, fontWeight: 600,}}>Le texte Est ici </Text>
                     </View>
                 

                <View style={styles.conta}>
                  <View style={styles.row}>
                  {numbers.map((num, idx) => (
                    <Text key={idx} style={styles.cell}>
                      {num}
                    </Text>
                  ))}
                </View>

                {renderLottieAnimation()}

                </View>
                   
                </View>
            </BottomSheet>
      
     </ScrollView>
     </KeyboardAvoidingView>
   );
};
const styles = StyleSheet.create({
  conta: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 33,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 10,
    

  },
  selectedItem: {
    backgroundColor: COLORS.line, // Change the background color for selected items
    opacity: 0.5,
    borderRadius: 32,
    margin: 2,
  },
  BlocLottieText : {
    flexDirection: 'row', 
    position: 'absolute',
    right: 112,

  },

  cell: {
     backgroundColor: COLORS.accentColor,
    padding: 20,
    margin: 5,
    borderWidth: 1,
    borderRadius: 50,
    borderColor: 'black',
  },
  checkButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: COLORS.primary,
    borderRadius: 5,
    color: COLORS.white

  },
  checkButtonText: {
    color: COLORS.white,
  },
  winnerContainer: {
    alignItems: 'center',
  },
  lottieAnimation: {
    width: 200,
    height: 200,
  },
  winnerText: {
    marginTop: 20,
    fontSize: 24,
    color: 'green',
    fontWeight: 'bold',
  },




  iconButton: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 6,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 2, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    marginTop: 10,
  },
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
    height: 148,
    textAlign: 'center'
},

emojiContainer: {
  width: 50,
  height: 50,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '#e0e0e0', // or any other background color for disabled state
  margin: 5,
},
emoji: {
  fontSize: 20,
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
    top: 250,
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
grid: {
  flexDirection: 'row',
  flexWrap: 'wrap',
  justifyContent: 'center',
},
imageContainer: {
  width: 50,
  height: 50,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '#e0e0e0',
  margin: 5,
},


selectedItemImage: {
  width: 35, 
  height: 35,
  marginTop: 30,
  right: 72,
  justifyContent: 'space-between',
  flexDirection: 'row'
},
selectedItemText: {
  marginTop: 30,
  fontSize: 18,
  color: 'white', 
  fontWeight: 'bold' ,
  right: 12,
},
closeButtonText: {
  fontSize: 22,
  color: 'white', 
  fontWeight: 'bold' 
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
export default DetailsScreen


