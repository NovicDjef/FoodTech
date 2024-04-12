import { View, Text, Image, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import React, { useRef, useEffect, useState } from 'react';
import
   Animated, {
  withTiming,
  withDelay,
  useSharedValue,
  useAnimatedStyle,
  //runOnJS,
  useAnimatedScrollHandler,
  interpolate,
  red,
  // Extrapolate,
} from 'react-native-reanimated';
import { COLORS, FONTS, SIZES, icons, images} from '../constants';
import Icon from "react-native-vector-icons/FontAwesome"
import { SharedElement } from 'react-navigation-shared-element';
import { useDispatch, useSelector } from 'react-redux';
import { IconsButton, TextButton } from '../components';
import { useTranslation } from 'react-i18next';
import { addToCart } from '../redux/action/cartActions';



export default function DetailsPlats({navigation, item, category, route }) {
    const { plats } = route.params
    const [count, setCount] = useState(0)
    const user = useSelector(state => state.userReducer.user)
    const isAuthenticated = useSelector(state => state.userReducer.user !== null);
    const { t } = useTranslation()
    function BackHandler() {
      navigation.goBack();
    }
    const dispatch = useDispatch();

  // const handleAddToCart = (plats) => {
  //   dispatch(addToCart(plats));
  //   setCount(count + 1)
  // }

  const handleAddToCart = (plats) => {
    if(isAuthenticated) {
      dispatch(addToCart(plats));
      setCount(count + 1)
      navigation.navigate('panier')
    } else {
      navigation.navigate('login')
    }
   
  }

    function renderHeader({item,}) {
        return (
          <Animated.View
           style={{
            position: 'relative',
            top: 0,
            left: 0,
            right: 0,
            height: 250,
            overflow: 'hidden',
           }}>
              <SharedElement
              //id={`${sharedElementPrefix}-CategoryCard-Bg-${restaurant?.id}`}
             style={[StyleSheet.absoluteFillObject]}
           >
            <Image
              source={{uri: `http://172.20.10.4:3000/images/${plats.image}`}}
              resizeMode="cover"
                style={{
                  height: '100%',
                  width: '100%',
                  borderBottomLeftRadius: 60,
               }}
            />
  
           </SharedElement>
  
            {/* titre */}
            <Animated.View
            style={{
              position: 'absolute',
              bottom: 70,
              left: 30,
            }}
            >
              <SharedElement
               //id={`${sharedElementPrefix}-CategoryCard-title-${category?.id}`}
              style={[StyleSheet.absoluteFillObject]}
              >
                <Text
                style={{
                  position: 'absolute',
                  color: COLORS.primary,
                  ...FONTS.h1,
                }}
                >
                  {plats.nom}
                </Text>
              </SharedElement>
            </Animated.View>
  
    {/* back button */}
  
          <Animated.View
            //style={headerFadeAnimatedStyle}
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
             onPress={() =>{BackHandler();}}
  
             />
            </Animated.View>
  
             {/* category image component */}
  
             <Animated.Image
               source={images.mobile_image}
               resizeMode="contain"
               style={{
                position: 'absolute',
                right: 40,
                bottom: -40,
                width: 100,
                height:200,
  
               }}
  
              />
  
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
                    {t("Dark_Mode")}
                  Description plats
                </Text>
              {/* filter button */}
              <View >
                <TouchableOpacity style={styles.container} onPress={() => setCount(count + 1)} >
                    <Icon name="shopping-cart" size={24} color="white" />
                </TouchableOpacity>
                <View style={styles.countAdd}>
                    <Text style={{color: COLORS.white, fontSize: 18, fontWeight: "bold"}}>{count}</Text>
                </View>
              </View>   
            </View>
            <View>
              <View style={{marginHorizontal: 12}}>
                <Text>
                  {plats.nom}
                </Text>
                <Text>
                  {plats.description}
                </Text>
                <Text>
                  {plats.prix}
                </Text>
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
                label="Commander"
                onPress={() => handleAddToCart()}
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
      width: 40,
      height: 40,
      alignItems: 'center',
      justifyContent: "center",
      borderRadius: 10,
      backgroundColor: COLORS.primary,      
      
    },
    countAdd: {
      backgroundColor: 'red',
      width: 20,
      height: 20,
      borderRadius: 20,
      alignItems: 'center',
      justifyContent: "center",
      top: -6,
      left: 26,
      position: "absolute"
    }
  });