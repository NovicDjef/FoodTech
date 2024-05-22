import { View, Text, Image, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import React, { useRef, useEffect, useState } from 'react';
import
Animated, {
withTiming,
withDelay,
useSharedValue,
useAnimatedStyle,
useAnimatedScrollHandler,
interpolate,
Extrapolate,
runOnJS,
} from 'react-native-reanimated';
import LottieView from 'lottie-react-native';
import { COLORS, FONTS, SIZES, icons, images} from '../constants';
import Icon from "react-native-vector-icons/FontAwesome"
import { SharedElement } from 'react-navigation-shared-element';
import { useDispatch, useSelector } from 'react-redux';
import { IconsButton, TextButton } from '../components';
import { useTranslation } from 'react-i18next';
import { addToCart } from '../redux/action/cartActions';
import baseImage from "../services/urlApp"

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

const HEADER_HEIGHT = 250;
export default function DetailsPlats({navigation, item, route }) {
    const { plats } = route.params
    const flatListRef = useRef();
    const scrollY = useSharedValue(0);
    const [count, setCount] = useState(0)
    const user = useSelector((state) => state.auth.user)
    const cart = useSelector(state => state.cart)
    const { t } = useTranslation()

    const dispatch = useDispatch();

  const handleAddToCart = () => {
    const isProductInCart = cart.items.some(item => item.id === plats.id);

    if (isProductInCart) {
      return;
    }
    dispatch(addToCart(plats));
    setCount(count + 1)
    console.log("erere :", isProductInCart)
  }
 
  const handleAddToCommande = () => { 
      navigation.navigate('panier')
  }
  const headerShareValue = useSharedValue(80);
  const filterModalSharedValue1 = useSharedValue(SIZES.height);
  const filterModalSharedValue2 = useSharedValue(SIZES.height);

    function BackHandler() {
      navigation.goBack();
    }

  const onScroll = useAnimatedScrollHandler((event) => {
    scrollY.value = event.contentOffset.y;
  });
 
    function renderHeader({item,}) {
      const inputRange =  [0, HEADER_HEIGHT -40]
      headerShareValue.value = withDelay(500, 
        withTiming(0, {
          duration: 500
        })
      )
        const headerFadeAnimatedStyle = useAnimatedStyle(() =>{
          return {
            opacity: interpolate(headerShareValue.value,
              [80, 0], [0, 1])
          }
        })

        const headerTranslateAnimation = useAnimatedStyle(() => {
          return {
            transform: [
              {
                translateY: headerShareValue.value
              }
            ]
          }
        })

        const headerHieghtAnimatedStyle = useAnimatedStyle(() => {
          return {
            height: interpolate(scrollY.value, inputRange,
            [HEADER_HEIGHT, 100], Extrapolate.CLAMP)
          }
        })
      
        const headerHideOnscrollAnimationStyle = useAnimatedStyle(() => {
          return {
            opacity : interpolate(scrollY.value, [80, 0],
            [0, 1], Extrapolate.CLAMP),
            transform: [
              {
                translateY: interpolate(scrollY.value,
                inputRange, [0, 200], Extrapolate.CLAMP)
              }
            ]
          }
        })

        const headerShowOnScrollAnimatedStyle = useAnimatedStyle(() => {
          return {
            opacity: interpolate(scrollY.value, [80, 0],
            [1, 0], Extrapolate.CLAMP), 
            transform: [
              {
                translateY: interpolate(scrollY.value,
                inputRange, [50, 130], Extrapolate.CLAMP)
              }
            ]
          }
        })
        return (
          <Animated.View
           style={[{
            position: 'relative',
            top: 0,
            left: 0,
            right: 0,
            height: 250,
            overflow: 'hidden',
           }, headerHieghtAnimatedStyle]}>
              <SharedElement
              //id={`${sharedElementPrefix}-CategoryCard-Bg-${plats?.id}`}
             style={[StyleSheet.absoluteFillObject]}
           >
            <Image
              source={{uri: `${baseImage}/${plats.image}`}}
              resizeMode="cover"
                style={{
                  height: '100%',
                  width: '100%',
                  borderBottomLeftRadius: 60,
               }}
            />
  
           </SharedElement>
  
            {/* titre */}

            <Animated.View style={[{
              position: "absolute",
              top: -100,
              left: 0,
              right: 0
             }, headerShowOnScrollAnimatedStyle]}>
              <Text style={{
                textAlign: "center",
                color: COLORS.white,
                ...FONTS.h1,
                fontWeight: "bold"
              }}>
                {plats.name}
              </Text>
              <View style={{display: "flex", justifyContent: "center", alignItems: "center", top: 22}}>
              <View style={{ position: "absolute", marginTop: 140, marginLeft: 32, flexDirection: "row", justifyContent: "space-between", alignItems: "center"}}>
                <View style={{flexDirection: "column", margin: 2,}}>
                  <View style={{ flexDirection: 'row' }}>
                    {[...Array(plats.ratings)].map((_, index) => (
                      <Icon key={index} name="star" size={18} color={COLORS.yellow} style={{ marginRight: 4 }} />
                    ))}
                    {[...Array(5 - plats.ratings)].map((_, index) => (
                      <Icon key={plats.ratings + index} name="star" size={18} color={COLORS.gray30} style={{ marginRight: 4 }} />
                    ))}
                  </View>
                    <Text style={{color: COLORS.white}}>{plats.ratings} {t("Star_ratings")}</Text>
                </View>
              </View>
              </View>
             </Animated.View>

             <Animated.View
          style={[{
            position: 'absolute',
            bottom: 90,
            left: 30,
          }, headerHideOnscrollAnimationStyle]}
          >
            <SharedElement
             //id={`${sharedElementPrefix}-CategoryCard-title-${category?.id}`}
            style={[StyleSheet.absoluteFillObject]}
            >
              <Text
              style={{
                position: 'absolute',
                color: COLORS.white,
                ...FONTS.h1,
                fontWeight: "bold"
              }}
              >
                {plats.name}
              </Text>
             
            </SharedElement>
            
          </Animated.View>
          <View style={{ position: "absolute", marginTop: 200, marginLeft: 32, flexDirection: "row", justifyContent: "space-between", alignItems: "center"}}>
            <View style={{flexDirection: "column", margin: 2,}}>
                  <View style={{ flexDirection: 'row' }}>
                    {[...Array(plats.ratings)].map((_, index) => (
                      <Icon key={index} name="star" size={18} color={COLORS.yellow} style={{ marginRight: 4 }} />
                    ))}
                    {[...Array(5 - plats.ratings)].map((_, index) => (
                      <Icon key={plats.ratings + index} name="star" size={18} color={COLORS.gray30} style={{ marginRight: 4 }} />
                    ))}
                  </View>
                    <Text style={{color: COLORS.white}}>{plats.ratings} {t("Star_ratings")}</Text>
            </View>
          </View>
    {/* back button */}
  
          <Animated.View
            style={headerFadeAnimatedStyle}
          >
             <IconsButton
               icon={icons.back}
               iconStyle={{
                tintColor: COLORS.black,
               }}
               containerStyle={{
                position: 'absolute',
                top: 40,
                left: 20,
                width: 50,
                height: 50,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 25,
                backgroundColor: COLORS.white,
  
               }}
             onPress={() =>{
              setTimeout(() => {
                headerShareValue.value = 
                withTiming(80, {
                  duration: 500
                }, () => {
                  runOnJS(BackHandler)();
                })
              }, 100)
              
            }}
  
             />
            </Animated.View>
  
             {/* category image component */}
  
             <Animated.Image
               source={images.mobile_image}
               resizeMode="contain"
               style={[{
                position: 'absolute',
                right: 40,
                bottom: -40,
                width: 100,
                height:200,
  
               }, headerFadeAnimatedStyle,
               headerTranslateAnimation,
               headerHideOnscrollAnimationStyle]}
  
              />
                <Animated.View style={[{ 
               position: 'absolute',
               right: 40,
               bottom: -40,
               width: 100,
               height: 160,}, 
                headerFadeAnimatedStyle,
                headerTranslateAnimation,
                headerHideOnscrollAnimationStyle]}>
              <LottieView
                  style={[{
                    width: 88,
                    height: 96
                  }]}
                  source={require("../../assets/json/animation_lljmrq2l.json")}
                  autoPlay
                  loop
              />
          </Animated.View>
  
          </Animated.View>
        );
      }
    function renderResult({item}){
        return (
          <>
            <View
                style={{
                flexDirection: 'row',
                alignItems:'center',
                marginTop: 12,
                marginHorizontal: 12
                }}
              >
                {/* result */}
                <Text
                  style={{
                      flex: 1,
                      ...FONTS.body3,
                      fontWeight: "bold"
                  }}
                  >
                    {t("Description_plats")}
                </Text>
              {/* filter button */}
              <View >
                <TouchableOpacity style={styles.container} onPress={handleAddToCart} >
                    <Icon name="shopping-cart" size={24} color="white" />
                    <Text style={{color: COLORS.white, fontWeight: "bold", fontSize: 17, marginRight: 8}}>{t("Add_card")}</Text>
                </TouchableOpacity>
                <View style={styles.countAdd}>
                    <Text style={{color: COLORS.white, fontSize: 18, fontWeight: "bold"}}>{count}</Text>
                </View>
              </View>   
            </View>
            <View>
              <View style={{marginHorizontal: 12,}}>
                <Text style={{margin: 12, fontWeight: "bold", fontSize: 22}}>
                  {plats.name}
                </Text>
                <View style={{}}>
                  <Text style={{fontSize: 20, fontWeight: "bold"}}>
                    {t("Description_food")}
                  </Text>
                  <Text style={{}}>
                    {plats.description} 
                  </Text>
                </View>
                <View style={{
                    flexDirection: 'row',
                    alignItems:'center',
                    marginTop: 12,
                    marginHorizontal: 12,  
                    justifyContent: "space-between"
                }}>
                  <View style={{flexDirection: "column", margin: 2,}}>
                  <View style={{ flexDirection: 'row' }}>
                    {[...Array(plats.ratings)].map((_, index) => (
                      <Icon key={index} name="star" size={16} color={COLORS.yellow} style={{ marginRight: 4 }} />
                    ))}
                    {[...Array(5 - plats.ratings)].map((_, index) => (
                      <Icon key={plats.ratings + index} name="star" size={16} color={COLORS.gray30} style={{ marginRight: 4 }} />
                    ))}
                  </View>
                    <Text style={{margin: 4, color: COLORS.primary}}>{plats.ratings} {t("Star_ratings")}</Text>
                  </View>
                  <View style={{}}>
                  <Text style={{color: COLORS.black, fontWeight: "bold", fontSize: 24, marginRight: 8, marginTop: -12}}>
                    {plats.prix} Frs
                  </Text>
                  </View>
                </View>
                <Text>
                  {/* {plats.mentionPLat} */}
                </Text>
              </View>
              <TextButton
                contentContainerStyle={{
                  width: "88%",
                  borderRadius: 30,
                  marginHorizontal: 22,
                  padding: 12,
                  marginVertical: 12,
                  backgroundColor: COLORS.primary,
                }}
                label={t("Order")}
                onPress={() => handleAddToCommande()}
                labelStyle={{fontSize: 22, fontWeight: "bold"}}
              />
            </View>
            </>
        );
    }
    
    return (
        <View
          style={{
            flex: 1,
            backgroundColor: COLORS.white,
          }}
        >
          {/* header */}
          {renderHeader({item})}
  
          {/* result */}
         {renderResult({item})}
  
         {/* filter modal */}
           {/* <FilterModal
           filterModalSharedValue1={filterModalSharedValue1}
           filterModalSharedValue2={filterModalSharedValue2}
           /> */}
  
           {/* {renderModal()}  */}
  
       </View>
      );
}
const styles = StyleSheet.create({
    container: {
      position: 'relative',
      flexDirection: "row-reverse",
      width: "auto",
      height: 40,
      alignItems: 'center',
      justifyContent: "center",
      borderRadius: 10,
      backgroundColor: COLORS.primary,  
      paddingHorizontal: 8    
      
    },
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