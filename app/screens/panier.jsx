import React, { useState, useEffect, useContext } from 'react';
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TouchableOpacity,
  Image,
  TextInput,
  Alert,
  ScrollView,
  RefreshControl,
  Button, Modal,
} from 'react-native';
import LottieView from 'lottie-react-native';
import { Icon } from 'react-native-elements';
import { COLORS } from '../constants'
import { RadioButton } from 'react-native-paper';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, updateCartItemQuantity } from '../redux/action/cartActions';
import DarkMode from '../utils/darkmode.context';
import Dialog from "react-native-dialog";
import { addCommande } from '../redux/action/commandeActions';
import { useTranslation } from 'react-i18next';
import { fetchRestaurants } from '../redux/action/restaurantActions';
import PushNotification from 'react-native-push-notification';
import baseImage from "../services/urlApp"
import PaymentWebView from '../services/PaymentWebView';
import { addPayment } from '../redux/action/payementAction';


export default function Panier({ navigation }) {

  useEffect(() => {

    // Configure PushNotification
    PushNotification.configure({
      onNotification: function (notification) {
        console.log("LOCAL NOTIFICATION ==>", notification);
      },
    });

    // Create a channel for Android
    PushNotification.createChannel(
      {
        channelId: "default-channel-id", // (required)
        channelName: "Default channel", // (required)
      },
      (created) => console.log(`CreateChannel returned '${created}'`)
    );
  }, []);

  const { t } = useTranslation()
  const dispatch = useDispatch();
  const [shippingMethod, setShippingMethod] = useState('Normal');
  const [showModalDetailRecu, setShowModalDetailRecu] = useState(false)
  const [adresse, SetAdresse] = useState("");
  const [refresh, setRefresh] = useState(false)
  const [recommendationText, setRecommendationText] = useState('');
  const [showRecommendation, setShowRecommendation] = useState(false);
  const [showPosition, setShowPosition] = useState(false)
  const [positionText, setPositionText] = useState(""); 
 
  const user = useSelector(state => state.auth.user.user)
  const cart = useSelector(state => state.cart)
  const restaurants = useSelector(state => state.restaurant.restaurants)
  const locations = useSelector(state => state.location.geolocation)
  const userId = useSelector(state => state.auth.user.user.id)
  const getRestaurantCoordinates = (restaurantId) => {
    const restaurant = restaurants.find(resto => resto.geolocalisationId === restaurantId);
    if (restaurant) {
      const location = locations.find(loc => loc.id === restaurant.geolocalisationId);
      if (location) {
        return { latitude: location.latitude, longitude: location.longitude };
      } else {
        return 'Position inconnue';
      }
    } else {
      return 'Restaurant non trouvé';
    }
  };
  
  const restaurantId = 1; // ID du restaurant
const coordinates = getRestaurantCoordinates(restaurantId);
// console.warn("Coordonnées du restaurant :", coordinates);





const [showModal, setShowModal] = useState(false);
const [paymentUrl, setPaymentUrl] = useState('');
  useEffect(() => {
    StatusBar.setBarStyle('light-content', true);
  }, []);


  const handleRemoveFromCart = (id) => {
    dispatch(removeFromCart(id));
  };
 
  const handleShowCommande = () => {
      setShowModalDetailRecu(true)
  }
  const handleUpdateCartItemQuantity = (id, quantity) => {
    dispatch(updateCartItemQuantity(id, quantity));
  };

  const RefreshMe = () => {
    setRefresh(true)

    setTimeout(() => {
        setRefresh(false)
    }, 3000)
  }

  const calculateTotalPrice = () => {
    if (shippingMethod === 'Normal') {
      return totalPrice;
    } else if (shippingMethod === 'Express') {
      return totalPrice + 600;
    }
  };


  // const handleCommande = async () => {
  //   try {
  //     console.debug("commnder")
   // const commandeDetails = commander.map(item => 
      //   `Plat: ${item.platsId}, Quantité: ${item.quantity}`
      // ).join('\n');
      // PushNotification.localNotification({
      //   channelId: "default-channel-id",
      //   title: `${user.username} ta Commande a réussie`,
      //   message: `Votre commande a été passée avec succès ${user.username} !\nDétails:\n${commandeDetails}`,
      // });
  //   } catch(error) {
  //     showAlert("Erreur", "Une erreur s'est produite lors du traitement de votre commande.");
  //   }
  // }
  function generateUniqueReference() {
    return 'ref_' + new Date().getTime();
  }
  const uniqueReference = generateUniqueReference();
  console.log(uniqueReference);

  
  const handleCommande = async () => {
    const paymentData = {
      amount: totalCommande,
      mode_payement: "cm.orange",
      currency: "XAF",
      userId: userId,
      commandeId: 1,
      phone: "656019261",
    };
    try {
      const response = await dispatch(addPayment(paymentData));      
      if (response.authorization_url) {
        console.log("Navigating to Payment with URL:", response.authorization_url);
        navigation.navigate('Payment', { paymentUrl: response.authorization_url });
      } else {
        console.error("URL de paiement manquante dans la réponse :", response);
      }
    } catch (error) {
      console.error("Erreur dans handleCommande :", error);
    }
  };
  const showAlert = (title, message) => {
    Alert.alert(title, message);
  };

  // const handleCommande = async () => {
  //   try {
  //     const paymentData = {
  //       amount: 100,
  //       mode_payement: "cm.orange",
  //       currency: "XAF",
  //       userId: 5,
  //       commandeId: 1,
  //       phone: "656019261",
  //       email: "customer@email.com",
  //       description: "Payment description"
  //     };
  //      uniqueReference

  //     console.log("commandes :", paymentData, uniqueReference) 
  //    dispatch(addPayment(paymentData));

  
  // } catch (error) {
  //   showAlert("Erreur", "Une erreur s'est produite lors du traitement de votre commande.");
  // } finally {
  //     setShowModalDetailRecu(false);
  //   }
  // };
  
  // const showAlert = (title, message) => {
  //   Alert.alert(title, message, [{ text: 'OK', onPress: () => handleOKPress() }]);
  // };

   // const commandeDetails = commander.map(item => 
        //   `Plat: ${item.platsId}, Quantité: ${item.quantity}`
        // ).join('\n');
  
        // PushNotification.localNotification({
        //   channelId: "default-channel-id",
        //   title: `${user.username} ta Commande a réussie`,
        //   message: `Votre commande a été passée avec succès ${user.username} !\nDétails:\n${commandeDetails}`,
        // });

  //       const handleCommande = async () => {
  //         try {
  //           const commande = cart.items.map(item => ({
  //             quantity: item.quantity,
  //             platsId: item.id,
  //             recommandation: recommendationText,
  //             restaurantId: restaurantId,
  //             prix: totalCommande,
  //             userId: userId,
  //             position: positionText
  //           }));
  //           console.log("commandes :", commande);
          
  //           const response = aw dispatch(addCommande(commande));
  //           console.log("responses :", response);
  //           if (response && response.data && response.data.message) {
  //             showAlert("Succès", response.data.message);
          
  //             // Redirection vers la WebView avec l'URL de paiement
  //             if (response.data.payment_url) {
  //               navigation.navigate('PaymentWebView', { paymentUrl: response.data.payment_url });
  //             } else {
  //               showAlert("Erreur", "L'URL de paiement n'a pas été reçue. Veuillez réessayer plus tard.");
  //             }
          
  //           } else {
  //             showAlert("Erreur", "Désolé, votre commande a échoué. Veuillez réessayer plus tard.");
  //           }
  //         } catch (error) {
  //           console.error("Error during order:", error);
  //           showAlert("Erreur", "Une erreur s'est produite lors du traitement de votre commande.");
  //         } finally {
  //           setShowModalDetailRecu(false);
  //         }
  //       };
  
  // const showAlert = (title, message) => {
  //   Alert.alert(
  //     title,
  //     message,
  //     [
  //       { text: "OK" }
  //     ],
  //     { cancelable: false }
  //   );
  // };

  const handleOKPress = () => {
    navigation.goBack();
  };

  const handleSubmit = () => {
    setShowRecommendation(true);
  };
  const handleSubmitPosition = () => {
    setShowPosition(true);
  };
  const handlePressOutside = () => {
    // Masquer l'input lorsqu'on clique en dehors
    setShowRecommendation(true);
  };
  const handlePressPosition = () => {
    setShowPosition(true)
  }
  
 console.error = (error) => {
   if (error.includes("i18next::pluralResolver")) {
     return;
   }
   console.error(error);
 };
 const validationCommande = () => {
  return(
    <View style={{flex: 1}}>
        <View style={{justifyContent: "center", alignItems: 'center', marginTop: 260}}>
            <LottieView
                style={{
                  width: 248,
                  height: 248
                }}
                source={require("../../assets/json/success.json")}
                autoPlay
                loop
            />
             <Text style={{fontSize: 17, fontWeight: "bold"}}> Soyez Les Bienvenue</Text>
        </View>
    </View>
  )
 }
 const totalPrice = cart.items.reduce((acc, val) => val.prix * val.quantity + acc, 0);
 const shippingCost = shippingMethod === 'Normal' ? 600 : 0;
 const totalCommande = totalPrice + shippingCost;

  const ConfirmInfo = ({totalCommande}) => {
    const { isDarkMode } = useContext(DarkMode)
    return(
      <Dialog.Container useNativeDriver={true} visible={showModalDetailRecu}>
        <Dialog.Title isDarkMode={isDarkMode}>{t("Recu")}</Dialog.Title>
          <ScrollView >
          {cart.items.map((product, index) => (
            <View style={{margin: 18 }} key={index}>
               <View style={{flexDirection: 'row', marginTop: 10}}>
                <View style={{flex: 1}}>
                    <Text isDarkMode={isDarkMode}>{t("Your_Name")}</Text>
                </View>
                <View style={{flex: 1, alignItems: 'flex-end'}}>
                  <Text isDarkMode={isDarkMode}>{user.username}</Text>
                </View>
              </View>
              <View style={{flexDirection: 'row', marginTop: 10}}>
                <View style={{flex: 1}}>
                    <Text isDarkMode={isDarkMode}>{t("Your_phone")}</Text>
                </View>
                <View style={{flex: 1, alignItems: 'flex-end'}}>
                <Text isDarkMode={isDarkMode}>{user.phone}</Text>
              </View>
            
              </View>
              <View style={{flexDirection: 'row', marginTop: 10}}>
                <View style={{flex: 1}}>
                  <Text isDarkMode={isDarkMode}>{t("Delivey_adress")}</Text>
                </View>
                <View style={{flex: 1, alignItems: 'flex-end'}}>
                  <Text isDarkMode={isDarkMode}>{positionText}</Text>
                </View>
              </View>
              
        <View style={{flexDirection: 'row', marginTop: 10}}>
            <View style={{flex: 1}}>
                <Text isDarkMode={isDarkMode}>{t("Food_name")}</Text>
            </View>
            <View style={{flex: 1, alignItems: 'flex-end'}}>
                <Text isDarkMode={isDarkMode}>{product.name}</Text>
            </View>
        </View>
        <View style={{flexDirection: 'row', marginTop: 10}}>
            <View style={{flex: 1}}>
                <Text isDarkMode={isDarkMode}>{t("Desc_Food")}</Text>
            </View>
            <View style={{flex: 1, alignItems: 'flex-end'}}>
                <Text
                  numberOfLines={2}  isDarkMode={isDarkMode}>{product.description}</Text>
            </View>
        </View>
        <View style={{flexDirection: 'row', marginTop: 10}}>
            <View style={{flex: 1}}>
                <Text isDarkMode={isDarkMode}>{t("Img_food")}</Text>
            </View>
            <View style={{flex: 1, alignItems: 'flex-end'}}>
            <Image
              style={{
                width: 35,
                height: 35,
                borderRadius: 10,
                alignSelf: "flex-end"
              }}
              source={{uri: `${baseImage}/${product.image}`}}
            />
            </View>
        </View>
        <View style={{flexDirection: 'row', marginTop: 10}}>
            <View style={{flex: 1}}>
                <Text isDarkMode={isDarkMode}>{t("Recommandation")}</Text>
            </View>
            <View style={{flex: 1, alignItems: 'flex-end'}}>
                <Text
                    isDarkMode={isDarkMode}>{recommendationText}</Text>
            </View>
        </View>
        <View style={{flexDirection: 'row', marginTop: 10}}>
            <View style={{flex: 1}}>
                <Text isDarkMode={isDarkMode}>{t("Price_Food")}</Text>
            </View>
            <View style={{flex: 1, alignItems: 'flex-end'}}>
                <Text
                    isDarkMode={isDarkMode}>{product.prix}</Text>
            </View>
        </View>
        <View style={{flexDirection: 'row', marginTop: 10}}>
            <View style={{flex: 1}}>
                <Text isDarkMode={isDarkMode}>{t("Quantity")}</Text>
            </View>
            <View style={{flex: 1, alignItems: 'flex-end'}}>
                <Text
                    isDarkMode={isDarkMode}>{product.quantity}</Text>
            </View>
        </View>
        <View style={{flexDirection: 'row', marginTop: 10}}>
            <View style={{flex: 1}}>
                <Text isDarkMode={isDarkMode}>{t("Delivery_price")}</Text>
            </View>
            <View style={{flex: 1, alignItems: 'flex-end'}}>
                <Text
                    isDarkMode={isDarkMode}>{shippingCost} Frs</Text>
            </View>
        </View>
        <View style={{flexDirection: 'row', marginTop: 10}}>
            <View style={{flex: 1}}>
                <Text isDarkMode={isDarkMode}>{t("Net_payable")}</Text>
            </View>
            <View style={{flex: 1, alignItems: 'flex-end'}}>
                <Text>{totalCommande} Frs</Text>
            </View>
        </View>
          </View>
          ))}
          



      <View style={{display: "flex", justifyContent: "space-between", alignItems: 'center', flexDirection: "row", marginHorizontal: 12}}>
        <TouchableOpacity onPress={() => {setShowModalDetailRecu(false)}} style={{flexDirection: 'row'}}>
          <Text style={{color: isDarkMode ? "white" : "black", fontWeight: "bold"}}>{t("Cancel")}</Text> 
        </TouchableOpacity>
        <Dialog.Button bold={true} label={"Valider"} onPress={handleCommande}/>
      </View>
      
          </ScrollView>
      </Dialog.Container>
    ) 
  }


  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={{
            paddingRight: 10,
          }}
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Icon name='angle-left' type='font-awesome' size={30} color='#fff' />
        </TouchableOpacity>
      </View>
      <Text style={styles.paymentTitle}>{t("Payment")}</Text>
      <View style={styles.cartContainer}>
        <ScrollView 
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl 
            refreshing={refresh}
            onRefresh={() => RefreshMe()}
          />
        }
        >
          <View style={styles.cartTitleView}>
            <Icon name='shopping-cart' color={COLORS.primary} type='font-awesome-5' />
            <Text style={styles.cartTitle}>{t("My_Cart")}  </Text>
          </View>

          {cart.items.length > 0 ? (
            <View>
              {cart.items
                .sort((a, b) => a.name > b.name)
                .map((product, index) => (
                  <View style={styles.productView} key={index}>
                    <Image
                      style={styles.productImage}
                      source={{uri: `${baseImage}/${product.image}`}}
                    />
                    <View style={styles.productMiddleView}>
                      <Text style={styles.productTitle}>{product.name}</Text>
                      <Text numberOfLines={2} style={styles.productCompanyTitle}>
                        {product.description}
                      </Text>
                      <View style={{flexDirection: "column", margin: 2,}}>
                  <View style={{ flexDirection: 'row' }}>
                    {[...Array(product.ratings)].map((_, index) => (
                      <Icon key={index} name="star" size={12} color={COLORS.yellow} style={{ marginRight: 4 }} />
                    ))}
                    {[...Array(5 - product.ratings)].map((_, index) => (
                      <Icon key={product.ratings + index} name="star" size={12} color={COLORS.gray30} style={{ marginRight: 4 }} />
                    ))}
                  </View>
                    {/* <Text style={{color: COLORS.primary}}>{product.ratings} {("Star_ratings")}</Text> */}
                  </View>
                    </View>
                    <View style={styles.productRightView}>
                      <Text
                        style={styles.productPriceText}
                      >{`${product.prix} Frs`}</Text>
                      <View style={styles.productItemCounterView}>
                        <TouchableOpacity
                          onPress={() => {
                            const newQuantity = product.quantity - 1;
                            if (newQuantity < 1) {
                              return Alert.alert(
                                `Voulez vous vraiment supprimer ${product.name} du panier ?`, '', 
                                [
                                  { text: 'Annuler', style: 'cancel' },
                                  {
                                    text: 'Supprimer',
                                    onPress: () => {
                                      handleRemoveFromCart(product.id);
                                    },
                                },
                              ]);
                            }
                            handleUpdateCartItemQuantity(product.id, newQuantity);
                          }}
                        >
                          <Icon
                            style={styles.toggleCounterButton}
                            name='minus-circle'
                            type='font-awesome'
                          />
                        </TouchableOpacity>
                        <Text style={styles.counterValue}>
                          {product.quantity}
                        </Text>
                        <TouchableOpacity
                          onPress={() => {
                            const newProd = {
                              ...product,
                              quantity: product.quantity + 1,
                              prix: product.prix + product.perPrice,
                            };
                            handleUpdateCartItemQuantity(product.id, product.quantity + 1);
                          }}
                        >
                          <Icon
                            style={styles.toggleCounterButton}
                            name='plus-circle'
                            type='font-awesome'
                          />
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                ))}
                <Text  style={{top: 12, fontSize: 17}}>{t("Add_Recommendation")} </Text> 
              <View style={styles.couponInputView}>
              {!showRecommendation && (
                <><TextInput
                    value={recommendationText}
                    onChangeText={setRecommendationText}
                    onSubmitEditing={handleSubmit}
                    multiline
                    placeholder={t('Recommendation')}
                    style={styles.couponInput} />
                    <TouchableOpacity style={styles.couponButton} onPress={handlePressOutside}>
                      <Text style={styles.couponButtonText}>{t("Validate")}</Text>
                    </TouchableOpacity></>
              )}
                
             </View>
             {showRecommendation && (
              <><View>
                  <Text style={{top: 12, textAlign: "center"}}>{t("Text_Recommandation")}</Text>
                </View><TouchableOpacity onPress={() => setShowRecommendation(false)}>
                    <Text style={{ fontSize: 16, top: 16, color: COLORS.primary, textAlign: "center", }}>
                      {recommendationText}
                    </Text>
                  </TouchableOpacity></>
                )}
              <View style={styles.subtotalView}>
                <Text style={styles.subtotalText}>{t("Subtotal")} -</Text>
                <Text style={styles.subtotalPrice}>
                  {cart.items.reduce((acc, val) => val.prix * val.quantity + acc, 0)} Frs
                </Text>
              </View>
              <View style={styles.shippingView}>
                <Text style={styles.shippingText}>{t("Shipping")} -</Text>
                <View style={styles.shippingItemsView}>
                <RadioButton.Group onValueChange={newValue => setShippingMethod(newValue)} value={shippingMethod}>
                  {/* <TouchableOpacity
                    style={styles.shippingItem}
                    onPress={() => {
                      setShippingMethod('Normal');
                    }}
                    >
                    <Text style={styles.shippingItemText}>{t("On_spot")} ({t("Free")})</Text>
                    <RadioButton value='Normal' />
                  </TouchableOpacity> */}
                  <TouchableOpacity
                    style={styles.shippingItem}
                    onPress={() => {
                      setShippingMethod('Normal');
                    }}
                  >
                    <Text style={styles.shippingItemText}>{t("Delivery")} (600 Frs)</Text>
                    <RadioButton value='Normal' />
                    
                  </TouchableOpacity>
                  </RadioButton.Group>
                </View>
              </View>
              <View style={styles.totalView}>
                <Text style={styles.totalText}>{t("Total")} -</Text>
                {shippingMethod === 'Normal' ? (
                  <Text style={styles.totalPrice}>
                    {cart.items.reduce((acc, val) => val.prix * val.quantity + acc, 600)} Frs
                  </Text>
                ) : (
                  <Text style={styles.totalPrice}>
                    {calculateTotalPrice} Frs
                  </Text>
                )}
              </View>
              <Text  style={{top: 12, fontSize: 17}}>{t("Enter_the_neighborhood_name")}</Text> 
              <View style={styles.couponInputView}>
              {!showPosition && (
                <><TextInput
                    value={positionText}
                    onChangeText={setPositionText}
                    onSubmitEditing={handleSubmitPosition}
                    multiline
                    placeholder={t('Enter_Delivery_Address')}
                    style={styles.couponInput} />
                    <TouchableOpacity style={styles.couponButton} onPress={handlePressPosition}>
                      <Text style={styles.couponButtonText}>{t("Validate")}</Text>
                    </TouchableOpacity></>
              )}
                
             </View>
             {showPosition && (
              <>
              <View>
                  <Text style={{top: 12, textAlign: "center"}}>{t("Your_neighborhood")}</Text>
                </View>
                <TouchableOpacity onPress={() => setShowPosition(false)}>
                    <Text style={{ fontSize: 16, top: 16, color: COLORS.primary, textAlign: "center", }}>
                      {positionText}
                    </Text>
                  </TouchableOpacity></>
                )}
              {/* <View style={styles.couponInputView}>
                <TextInput
                  placeholder="Entrer l'Adresse de livraison"
                  style={styles.couponInput}
                  clearButtonMode="always"
                  placeholderTextColor="#888"
                  autoCapitalize="none"
                  autoCorrect={false}
                  value={adresse}
                  onChangeText={test => SetAdresse(test)}
                />
                <TouchableOpacity style={styles.couponButton} onPress={() => {}}>
                  <Text style={styles.couponButtonText}>{t("Position")}</Text>
                  <Icon
                    color={COLORS.white}
                    name='map'
                    type='font-awesome-5'
                  />
                </TouchableOpacity>
              </View> */}

              <TouchableOpacity style={styles.checkoutButton} onPress={() => handleShowCommande()}>
                <Text style={styles.checkoutButtonText}>
                  {t("Validate_order")}
                </Text>
              </TouchableOpacity>
              
            </View>
          ) : (
            <View style={styles.emptyCartView}>
              <Text style={styles.emptyCartViewText}>{t("Your_cart_is_empty")}</Text>
            </View>
          )}

          <View style={{ height: 100 }}></View>
          <ConfirmInfo showModalDetailRecu={showModalDetailRecu} setShowModalDetailRecu={setShowModalDetailRecu} totalCommande={totalCommande} />
          
        </ScrollView>
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: COLORS.primary,
      paddingTop: 40,
    },
    header: {
      alignItems: 'flex-start',
      marginTop: 10,
      paddingHorizontal: 20,
    },
    paymentTitle: {
      fontSize: 30,
      fontWeight: '900',
      color: '#fff',
      marginVertical: 12,
      paddingHorizontal: 20,
    },
    cartContainer: {
      flex: 1,
      backgroundColor: '#fff',
      marginTop: 10,
      borderTopLeftRadius: 40,
      borderTopRightRadius: 40,
      paddingTop: 30,
      paddingHorizontal: 16,
      shadowColor: COLORS.primary,
      shadowOffset: {
        width: 0,
        height: 3,
      },
      shadowOpacity: 0.5,
      shadowRadius: 8,
      elevation: 6,
    },
    cartTitleView: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
    },
    cartTitle: {
      fontSize: 26,
      fontWeight: '700',
      marginLeft: 10,
    },
    productView: {
      display: 'flex',
      flexDirection: 'row',
      backgroundColor: '#fff',
      paddingVertical: 6,
      paddingHorizontal: 8,
      // borderRadius: 10,
      shadowColor: COLORS.primary,
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.2,
      // shadowRadius: 2,
      elevation: 2,
      marginTop: 14,
    },
    productImage: {
      width: 60,
      height: 60,
      alignSelf: 'center',
    },
    productMiddleView: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      paddingHorizontal: 10,
      justifyContent: 'center',
    },
    productTitle: {
      fontSize: 20,
      fontWeight: '700',
    },
    productCompanyTitle: {
      fontSize: 16,
      fontWeight: '300',
    },
    productRightView: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    productItemCounterView: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-around',
      marginTop: 4,
    },
    counterValue: {
      fontSize: 20,
      fontWeight: '500',
    },
    productPriceText: {
      alignSelf: 'flex-end',
      paddingRight: 10,
      fontSize: 20,
      fontWeight: '700',
    },
    toggleCounterButton: {
      paddingHorizontal: 10,
    },
    couponInputView: {
      width: '100%',
      height: 50,
      borderWidth: 1,
      borderColor: COLORS.primary,
      marginTop: 20,
      display: 'flex',
      flexDirection: 'row',
    },
    couponInput: {
      flex: 1,
      fontSize: 20,
      paddingHorizontal: 10,
    },
    couponButton: {
     backgroundColor: COLORS.primary,
      backgroundColor: COLORS.primary,
      paddingHorizontal: 12,
      justifyContent: 'center',
    },
    couponButtonText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: '700',
    },
    subtotalView: {
      display: 'flex',
      flexDirection: 'row',
      marginTop: 40,
      justifyContent: 'space-between',
      paddingBottom: 10,
      borderBottomColor: COLORS.primary,
      borderBottomWidth: 1,
    },
    subtotalText: {
      fontSize: 18,
      fontWeight: '500',
    },
    subtotalPrice: {
      fontSize: 18,
      fontWeight: '300',
    },
    shippingView: {
      display: 'flex',
      flexDirection: 'column',
      marginTop: 20,
      paddingBottom: 10,
      borderBottomColor: COLORS.primary,
      borderBottomWidth: 1,
    },
    shippingItemsView: {
      marginTop: 10,
    },
    shippingText: {
      fontSize: 18,
      fontWeight: '500',
    },
    shippingItem: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    shippingItemText: {
      fontSize: 16,
      paddingVertical: 4,
      fontWeight: '300',
    },
    totalView: {
      display: 'flex',
      flexDirection: 'row',
      marginTop: 20,
      justifyContent: 'space-between',
      paddingBottom: 10,
      borderBottomColor: COLORS.primary,
      borderBottomWidth: 1,
    },
    totalText: {
      fontSize: 18,
      fontWeight: '500',
    },
    totalPrice: {
      fontSize: 18,
      fontWeight: '300',
    },
    checkoutButton: {
     backgroundColor: COLORS.primary,
      paddingVertical: 14,
      marginTop: 30,
      alignItems: 'center',
      borderRadius: 15,
    },
    checkoutButtonText: {
      fontSize: 18,
      color: '#fff',
      fontWeight: '700',
    },
    emptyCartView: {
      flex: 1,
      marginTop: 140,
    },
    emptyCartViewText: {
      fontSize: 20,
      fontWeight: '300',
      alignSelf: 'center',
    },
  })
