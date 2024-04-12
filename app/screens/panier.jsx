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
  SafeAreaView,
  ScrollView,
  RefreshControl,
} from 'react-native';
import { Icon } from 'react-native-elements';
import { ListItem, Left, Right, Radio, Content } from 'native-base';
import { COLORS } from '../constants'
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, updateCartItemQuantity } from '../redux/action/cartActions';
import { sendLocation } from '../redux/action/locationActions';
import Geolocation from '@react-native-community/geolocation';
import DarkMode from '../utils/darkmode.context';
import Dialog from "react-native-dialog";
import { sendCommande } from '../redux/action/commandeActions';
import { useTranslation } from 'react-i18next';
import { sendAdressLivraison } from '../redux/action/livraisonAction';



export default function Panier({ navigation }) {
  const { t } = useTranslation()
  const dispatch = useDispatch();
  const [shippingMethod, setShippingMethod] = useState('Normal');
  const [showModalDetailRecu, setShowModalDetailRecu] = useState(false)
  const [adresse, SetAdresse] = useState("");
  const [refresh, setRefresh] = useState(false)
  const cart = useSelector(state => state.cartReducer)
  const user = useSelector(state => state.userReducer.user)
  useEffect(() => {
    StatusBar.setBarStyle('light-content', true);
  }, []);

  const handleRemoveFromCart = (id) => {
    dispatch(removeFromCart(id));
  };
  const userId = useSelector(state => state.userReducer.user.id);


  console.debug("userId: ", userId)

  const handleShowCommande = () => {
    // const userToken = await AsyncStorage.getItem("userToken")
    // if(userToken) {
      setShowModalDetailRecu(true)
      
    // } else {
    //   navigation.navigate("login")
    // }
    getCurrentLocation()
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

  //const { latitude, longitude } = useSelector((state) => state.locationReducer);

  const getCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords;
        console.debug('Latitude:', latitude);
        console.debug('Longitude:', longitude);
        dispatch(sendLocation(latitude, longitude));
      },
      error => {
        console.log(error);
      },
      { enableHighAccuracy: true, }
    );
  };

  const handleCommande = () => {
    dispatch(sendCommande(cart, userId))
    setShowModalDetailRecu(false)
    //handleAdress()
    console.log("ffffffff : ", cart.items )
  }

  
  const handleAdress = () => {
    dispatch(sendAdressLivraison(adresse))
   }
 // Surcharge de la fonction console.error pour ignorer spécifiquement l'erreur i18next::pluralResolver
 console.error = (error) => {
   if (error.includes("i18next::pluralResolver")) {
     return;
   }
   // Laissez les autres erreurs être gérées normalement
   console.error(error);
 };
  const ConfirmInfo = () => {
    const { isDarkMode } = useContext(DarkMode)

    const totalPrice = cart.items.reduce((acc, val) => val.prix * val.quantity + acc, 0);
  const shippingCost = shippingMethod === 'Normal' ? 1000 : 60;
    return(
      <Dialog.Container useNativeDriver={true} visible={showModalDetailRecu}>
        <Dialog.Title isDarkMode={isDarkMode}>Recu</Dialog.Title>
          <ScrollView >
          {cart.items.map((product, index) => (
            <View style={{margin: 18 }} key={index}>
               <View style={{flexDirection: 'row', marginTop: 10}}>
                <View style={{flex: 1}}>
                    <Text isDarkMode={isDarkMode}>Votre nom</Text>
                </View>
                <View style={{flex: 1, alignItems: 'flex-end'}}>
                  <Text isDarkMode={isDarkMode}>{user.username}</Text>
                </View>
              </View>
              <View style={{flexDirection: 'row', marginTop: 10}}>
                <View style={{flex: 1}}>
                    <Text isDarkMode={isDarkMode}>Votre numero</Text>
                </View>
                <View style={{flex: 1, alignItems: 'flex-end'}}>
                <Text isDarkMode={isDarkMode}>{user.phone}</Text>
              </View>
            
              </View>
              <View style={{flexDirection: 'row', marginTop: 10}}>
                <View style={{flex: 1}}>
                  <Text isDarkMode={isDarkMode}>Adresse de livraison</Text>
                </View>
                <View style={{flex: 1, alignItems: 'flex-end'}}>
                  <Text isDarkMode={isDarkMode}>{adresse}</Text>
                </View>
              </View>
              
        <View style={{flexDirection: 'row', marginTop: 10}}>
            <View style={{flex: 1}}>
                <Text isDarkMode={isDarkMode}>Nom du plat</Text>
            </View>
            <View style={{flex: 1, alignItems: 'flex-end'}}>
                <Text isDarkMode={isDarkMode}>{product.nom}</Text>
            </View>
        </View>
        <View style={{flexDirection: 'row', marginTop: 10}}>
            <View style={{flex: 1}}>
                <Text isDarkMode={isDarkMode}>Description du plats</Text>
            </View>
            <View style={{flex: 1, alignItems: 'flex-end'}}>
                <Text
                    isDarkMode={isDarkMode}>{product.description}</Text>
            </View>
        </View>
        <View style={{flexDirection: 'row', marginTop: 10}}>
            <View style={{flex: 1}}>
                <Text isDarkMode={isDarkMode}>Image plat</Text>
            </View>
            <View style={{flex: 1, alignItems: 'flex-end'}}>
            <Image
              style={{
                width: 35,
                height: 35,
                borderRadius: 10,
                alignSelf: "flex-end"
              }}
              source={{uri: `http://172.20.10.4:3000/images/${product.image}`}}
            />
            </View>
        </View>
        <View style={{flexDirection: 'row', marginTop: 10}}>
            <View style={{flex: 1}}>
                <Text isDarkMode={isDarkMode}>Prix du plat</Text>
            </View>
            <View style={{flex: 1, alignItems: 'flex-end'}}>
                <Text
                    isDarkMode={isDarkMode}>{product.prix}</Text>
            </View>
        </View>
        <View style={{flexDirection: 'row', marginTop: 10}}>
            <View style={{flex: 1}}>
                <Text isDarkMode={isDarkMode}>Quantité</Text>
            </View>
            <View style={{flex: 1, alignItems: 'flex-end'}}>
                <Text
                    isDarkMode={isDarkMode}>{product.quantity}</Text>
            </View>
        </View>
        <View style={{flexDirection: 'row', marginTop: 10}}>
            <View style={{flex: 1}}>
                <Text isDarkMode={isDarkMode}>Prix livraison</Text>
            </View>
            <View style={{flex: 1, alignItems: 'flex-end'}}>
                <Text
                    isDarkMode={isDarkMode}>1 000Frs</Text>
            </View>
        </View>
        <View style={{flexDirection: 'row', marginTop: 10}}>
            <View style={{flex: 1}}>
                <Text isDarkMode={isDarkMode}>Net a payer</Text>
            </View>
            <View style={{flex: 1, alignItems: 'flex-end'}}>
                <Text>{totalPrice + shippingCost} Frs</Text>
            </View>
        </View>
          </View>
          ))}
          



      <View style={{display: "flex", justifyContent: "space-between", alignItems: 'center', flexDirection: "row", marginHorizontal: 12}}>
        <TouchableOpacity onPress={() => {setShowModalDetailRecu(false)}} style={{flexDirection: 'row'}}>
          <Text style={{color: isDarkMode ? "white" : "black", fontWeight: "bold"}}>Annuler</Text> 
        </TouchableOpacity>
        <Dialog.Button bold={true} label={"Valider"} onPress={() => handleCommande()}/>
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
      <Text style={styles.paymentTitle}>Payment</Text>
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
            <Text style={styles.cartTitle}>My Cart</Text>
          </View>

          {cart.items.length > 0 ? (
            <View>
              {cart.items
                .sort((a, b) => a.nom > b.nom)
                .map((product, index) => (
                  <View style={styles.productView} key={index}>
                    <Image
                      style={styles.productImage}
                      source={{uri: `http://172.20.10.4:3000/images/${product.image}`}}
                    />
                    <View style={styles.productMiddleView}>
                      <Text style={styles.productTitle}>{product.nom}</Text>
                      <Text style={styles.productCompanyTitle}>
                        {product.description}
                      </Text>
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
                                `Remove ${product.nom}?`, '', 
                                [
                                  { text: 'Cancel', style: 'cancel' },
                                  {
                                    text: 'Remove',
                                    onPress: () => {
                                      const newCart = cart.items.filter((p) => p.id !== product.id);
                                      handleRemoveFromCart(newCart);
                                    },
                                },
                              ]);
                            }
                            const newProd = {
                              ...product,
                              quantity: newQuantity,
                              prix: product.prix - product.perPrice,
                            };
                            const updatedCart = cart.items.map((p) =>
        p.id === product.id ? newProd : p
      );
                            //const restProds = cart.items.filter((p) => p.id !== product.id);
                            handleUpdateCartItemQuantity(updatedCart);
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
                            const restProds = cart.items.filter(
                              (p) => p.id !== product.id
                            );
                            handleUpdateCartItemQuantity([...restProds, newProd]);
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
              <View style={styles.couponInputView}>
                <TextInput
                  placeholder={t('Coupon_Code')}
                  style={styles.couponInput}
                />
                <TouchableOpacity style={styles.couponButton}>
                  <Text style={styles.couponButtonText}>{t('Apply_Coupon')}</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.subtotalView}>
                <Text style={styles.subtotalText}>{t("Subtotal")} -</Text>
                <Text style={styles.subtotalPrice}>
                  {cart.items.reduce((acc, val) => val.prix + acc, 0)} Frs
                </Text>
              </View>
              <View style={styles.shippingView}>
                <Text style={styles.shippingText}>{t("Shipping")} -</Text>
                <View style={styles.shippingItemsView}>
                  <TouchableOpacity
                    style={styles.shippingItem}
                    onPress={() => {
                      setShippingMethod('Normal');
                    }}
                  >
                    <Text style={styles.shippingItemText}>Normal (Free)</Text>
                    {/* <Radio selected={shippingMethod === 'Normal'} /> */}
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.shippingItem}
                    onPress={() => {
                      setShippingMethod('Express');
                    }}
                  >
                    <Text style={styles.shippingItemText}>Express (600 Frs)</Text>
                    {/* <Radio selected={shippingMethod === 'Express'} /> */}
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.totalView}>
                <Text style={styles.totalText}>{t("Total")} -</Text>
                {shippingMethod === 'Normal' ? (
                  <Text style={styles.totalPrice}>
                    {cart.items.reduce((acc, val) => val.prix + acc, 0)} Frs
                  </Text>
                ) : (
                  <Text style={styles.totalPrice}>
                    {cart.items.reduce((acc, val) => val.prix + acc, 0) + 600} Frs
                  </Text>
                )}
              </View>

              <View style={styles.couponInputView}>
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
                  <Text style={styles.couponButtonText}>position</Text>
                  <Icon
                    color={COLORS.white}
                    name='map'
                    type='font-awesome-5'
                  />
                </TouchableOpacity>
              </View>

              <TouchableOpacity style={styles.checkoutButton} onPress={() => handleShowCommande()}>
                <Text style={styles.checkoutButtonText}>
                  Valider Commande
                </Text>
              </TouchableOpacity>
              
            </View>
          ) : (
            <View style={styles.emptyCartView}>
              <Text style={styles.emptyCartViewText}>Your cart is empty.</Text>
            </View>
          )}

          <View style={{ height: 100 }}></View>
          <ConfirmInfo showModalDetailRecu={showModalDetailRecu} setShowModalDetailRecu={setShowModalDetailRecu} />
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
      fontWeight: '500',
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
  });