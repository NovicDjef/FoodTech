import { View, Text, StatusBar, Image, Dimensions, TouchableOpacity, StyleSheet, Animated, Share } from 'react-native'
import React, { useEffect, useState } from 'react'
import Ionic from "react-native-vector-icons/Ionicons"
import Icon from "react-native-vector-icons/FontAwesome"
import Feather from "react-native-vector-icons/Feather"
import { COLORS } from '../constants';
import AntDesign from "react-native-vector-icons/AntDesign"
import { addToCart } from '../redux/action/cartActions';
import { useDispatch, useSelector } from 'react-redux';
import { ajoutFavoris, suppressionFavoris } from '../redux/reducer/favorisReducer';
import { sauvegarderFavorisLocalement } from '../redux/action/favorisActions';
import baseImage from "../services/urlApp"
import { useTranslation } from 'react-i18next';

export default function Status({route, navigation, repas}) {
    const {item, restaurant} = route.params;
    const dispatch = useDispatch()
    const { t } = useTranslation()
    const [count, setCount] = useState(0)
    const [showCommandButton, setShowCommandButton] = useState(false);
    const cart = useSelector(state => state.cart)
    const plats = useSelector(state => state.plat.repas)
    const windowWidth = Dimensions.get("window").width
    const windowHeight = Dimensions.get("window").height
    const [like, setLike] = useState(false)
    // const [isPaused, setIsPaused] = useState(false);
    // useEffect(() => {
    //   if(!isPaused) {
    //     let timer = setTimeout(() => {
    //         navigation.goBack()
    //     }, 5000)
       
    //       Animated.timing(progress, {
    //         toValue: 5,
    //         duration: 10000,
    //         useNativeDriver: false,
            
    //     }).start();
    //   }
    //    return () => {
    //         clearTimeout(timer);
    //         Animated.timing(progress).stop();
    //     };
        
    // }, [isPaused])
    // const trisPlas = plats.map(item)
    // const [progress, setProgress] = useState(new Animated.Value(0));
    // const ProgressAnmation = progress.interpolate ({
    //     inputRange: [0, 5],
    //     outputRange: ["0%", "100%"]
    // })


  const handleAddToCart = () => {
  const platSelectionne = plats.find(plat => plat.id === item.id);

  if (!platSelectionne) {
    console.error("Plat non trouvé");
    return;
  }
  const isProductInCart = cart.items.some(item => item.id === platSelectionne.id);
  setShowCommandButton(true);
  if (isProductInCart) {
    return;
  }

  dispatch(addToCart(platSelectionne));
  setCount(count + 1);
};


  const handleAddToCommande = () => { 
    navigation.navigate('panier', {restaurant: restaurant})
}


  // const toggleFavori = (repas) => {
  //   if (like) {
  //     dispatch(suppressionFavoris(repas));
  //   } else {
  //     dispatch(ajoutFavoris(repas));
  //     dispatch(sauvegarderFavorisLocalement(repas));
  //   }
  // };
    const handleShare = async () => {
      try {
        await Share.share({
          message : "Voici le message à partagerv DU lien vers l'apllication mobile"
        });
      } catch (error) {
        console.error(error.message);
      }
    };
  return (
    <View style={{
        backgroundColor: "black", 
        height: "100%",
        position: "relative",
        justifyContent: "center",
        alignItems: "center"
        }}>
      <StatusBar backgroundColor="black" barStyle="light-content"/>
      <View style={{
        height: 3,
        width: "95%",
        borderWidth: 1,
        backgroundColor: "gray",
        position: "absolute",
        top: 18
      }}>
        <Animated.View style={{
            height: "100%",
            backgroundColor: "white",
           // width: ProgressAnmation
        }}>

        </Animated.View>
       <View style={{
        padding: 15,
        flexDirection: "row",
        alignItems: "center",
        position: "absolute",
        top: 12,
        left: 0,
        width: "90%"
       }}>
            <View style={{
                borderRadius: 100,
                width: 30,
                height: 30,
                justifyContent: "center",
                alignItems: "center"
            }}>
                <Image source={{uri: `${baseImage}/${item.image}`}}
                    style={{
                        borderRadius: 100,
                        backgroundColor: "orange",
                        resizeMode: "cover",
                        width: "94%",
                        height: "94%",
                        top: -12
                    }}/>
                  
            </View>
            <View style={{
            justifyContent: "space-between",
            flexDirection: 'row',
            width: "100%"
        }}>
            <Text style={{color: "white", fontSize: 22, paddingLeft: 10, top: -8}}>
                {item.nom}
            </Text>
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <Ionic 
                    name="close" 
                    style={{fontSize: 30, color: "white", opacity: 0.6, top: -12 }} />
            </TouchableOpacity>
        </View>
       </View>
      </View>
      <Image source={{uri: `${baseImage}/${item.image}`}} style={{
        position: "absolute",
        width: "100%",
        height: 470
      }} />
        <View style={{
          //position: "absolute ",
          width: windowWidth,
          zIndex: 1,
          top: 150,
          padding: 10
        }}>
            <View style={{}}>
                <TouchableOpacity style={{width: 150,}}>
                  <View style={{}}>
                    <Text style={{color: "white", fontSize: 26, marginHorizontal: 8}}> {item.nom}</Text>
                  </View>
                  <View style={{flexDirection: "column", margin: 2,}}>
                  <View style={{ flexDirection: 'row' }}>
                    {[...Array(item.ratings)].map((_, index) => (
                      <Icon key={index} name="star" size={16} color={COLORS.yellow} style={{ marginRight: 4 }} />
                    ))}
                    {[...Array(5 - item.ratings)].map((_, index) => (
                      <Icon key={item.ratings + index} name="star" size={16} color={COLORS.gray30} style={{ marginRight: 4 }} />
                    ))}
                  </View>
                    <Text style={{color: COLORS.primary}}>{item.ratings} {t("Star_ratings")}</Text>
                  </View>
                </TouchableOpacity>
                <Text style={{color: "white", fontSize: 14, marginHorizontal: 10}} numberOfLines={4}>{item.description}</Text>
                <View style={{flexDirection: "row", padding: 10}}>
                  <Ionic name="wallet" style={{color: "white", fontSize: 16, top: 6, marginLeft: -8}} />
                  <Text style={{color: "white", fontSize: 24}}>{item.prix} Frs</Text>
                </View>
            </View>
        </View>
        <View style={{
          position: "absolute",
          top: 340,
          right: 0,
          alignItems: "center",
          flexDirection: 'column'
          }}>
            <TouchableOpacity
            onPress={handleShare}
            style={{padding: 10}}>
              <Ionic 
              name="paper-plane-outline" 
              style={{color: "white", fontSize: 30}}
            />
            <Text style={{color: COLORS.white}}>{t("Share")}</Text>
            </TouchableOpacity> 
            <TouchableOpacity 
            onPress={() => {setLike(!like)}}
            style={{padding: 10}}>
              <AntDesign 
              name={like ? "heart" : "hearto"} 
              style={{color: like ? 'red' : "white", fontSize: 30}}
            />
            </TouchableOpacity>
            
            
            {/*   */}
        </View>
        <View style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          flexDirection: "row",
          justifyContent: "space-around",
          alignItems: "center",
          marginVertical: 25,
          width: "100%"
        }}>
        
        {showCommandButton ? (
          <TouchableOpacity style={{
            backgroundColor: COLORS.primary,
            padding: 12,
            borderRadius: 12,
            flexDirection: "row"
          }}
            onPress={handleAddToCommande}
          >
            <Text style={{ color: COLORS.white, fontSize: 22 }}>{t("Order")}</Text>
            <Ionic name="cart" style={{ color: COLORS.white, fontSize: 28, marginLeft: 12 }} />
          </TouchableOpacity>
        ) : (
          <><TouchableOpacity style={{
              backgroundColor: COLORS.primary,
              padding: 12,
              borderRadius: 12,
              flexDirection: "row"
            }}
              onPress={handleAddToCart}
            >
              <Text style={{ color: COLORS.white, fontSize: 22 }}>{t("Add_card")}</Text>
              <Ionic name="cart" style={{ color: COLORS.white, fontSize: 28, marginLeft: 12 }} />
            </TouchableOpacity>
              <View style={styles.countAdd}>
                <Text style={{ color: COLORS.white, fontSize: 18, fontWeight: "bold" }}>{count}</Text>
              </View>
            </>
        )}
        
        </View>
    </View>
  )
}
const styles = StyleSheet.create({
  
  countAdd: {
    backgroundColor: 'red',
    width: 20,
    height: 20,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: "center",
    top: -5,
    left: 100,
    position: "absolute"
  }
});