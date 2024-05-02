/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */

import React, { useEffect, useState } from 'react';
import { Image, TouchableOpacity, View, Text, StyleSheet, Animated, Alert } from 'react-native';

import { IconLabel } from '.'
import Icon from 'react-native-vector-icons/Feather';
import { SIZES, icons, FONTS, COLORS, } from '../constants';
import LottieView from 'lottie-react-native';
// import Toast from 'react-native-toast-message'
import { useDispatch, useSelector } from 'react-redux';
import { toggleFavorite } from '../redux/action/favoriteAction';
// import SkeletonPlaceholder from "react-native-skeleton-placeholder";
// import { fetchRestaurants } from '../redux/action/restaurantActions';
import { RadioButton } from 'react-native-paper';



export default function RestaurantVertical({containerStyle, course, restaurant}) {

  const favorites = useSelector(state => state.favorite.restaurants);
  const isFavorite = favorites.some((r) => r.id === restaurant.id);
  const dispatch = useDispatch();
  const handleToggleFavorite = () => {
    dispatch(toggleFavorite(restaurant));
  };

  // const showToast = () => {
  //   Toast.show({
  //     type: "success",
  //     text1: "message",
  //     text2: "conteneu de la notifications",
  //     autoHide: true,
  //     visibilityTime: 2500,
  //     position: "top",
  //     bottomOffset: 50,
    
  //   })
  // }
  // if (loading) {
  //   return (
  //     <SkeletonPlaceholder>
  //       <View style={{ flexDirection: "row", alignItems: "center" }}>
  //         <View style={{ width: 230, height: 150, borderRadius: 10, marginRight: 15 }} />
  //         <View style={{ flex: 1 }}>
  //           <View style={{ width: '100%', height: 18, marginBottom: 6, borderRadius: 4 }} />
  //           <View style={{ width: '70%', height: 18, marginBottom: 6, borderRadius: 4 }} />
  //           <View style={{ width: '40%', height: 18, marginBottom: 6, borderRadius: 4 }} />
  //         </View>
  //       </View>
  //     </SkeletonPlaceholder>
  //   );
  // }


  return (
   <>
   
   <View style={{
    border: 2,
    borderBlockColor: 'red'
   }}>
   <View
      style={{
        width: 230,
        right: 22,
        ...containerStyle,
        }}>
      <Image
         source={{uri: `http://172.20.10.4:3000/images/${course.image}`}}
        resizeMode="cover"
        style={{
          width: '100%',
          height: 150,
          marginBottom: SIZES.radius,
          borderRadius: SIZES.radius,

        }}
      />

      {/* detail section */}
     
        <View
            style={{
              flexShrink: 1,
              paddingHorizontal: SIZES.radius,
              flexDirection: 'row'
            }}>
              <Text
                style={{
                  flex: 1,
                  ...FONTS.h3,
                  fontSize: 18,
                  fontWeight:700,
                }}
              >
                {course.nom}
              </Text>
              <TouchableOpacity
                            style={{
                                marginLeft: -12
                            }}
                            // onPress={() =>
                            //   exists(item)
                            //     ? handleRemoveFavorite(item)
                            //     : handleAddFavorite(item)
                            // }
                      onPress={handleToggleFavorite}
                        >
           {isFavorite ? (
              <Animated.View style={[styles.heartContainer]}>
                  <Icon
                  name='heart'
                  color='#000' size={35}  />
              </Animated.View> 
            ) : (
            <View style={{marginTop: -30, marginLeft: 20}}>
                    <LottieView
                        style={styles.lottie}
                        source={require("../../assets/json/addToFovotite.json")}
                        autoPlay
                        loop
                    />
            </View> )}
                
                {/* <Animated.View style={[styles.heartContainer]}>
                  <Icon
                  name='heart'
                  color='#000' size={35}  />
                </Animated.View> */}
              
              </TouchableOpacity>
        </View>
         
          {/* Info section */}
     
          <View
      style={{
        flexDirection: 'row',
      }}>
           
      
              <IconLabel
                 icon={ icons.userplace }
                 //label={course.ville}
                 containerStyle={{
                  
               }}
              />
              <View>
              <Text
              style={{
                fontSize: SIZES.h3,
              }}
              >{course.adresse}</Text>
              </View>
      </View>
     
             <View
              style={{
                flexDirection: 'row',
              }}>
               <IconLabel
                 icon={ icons.star }
                 label={course.mention}
                 containerStyle={{
                  marginTop: SIZES.base,
               }}
              />
               <IconLabel
                 icon={ icons.star }
                 label={course.mention}
                 containerStyle={{
                  marginTop: SIZES.base,
               }}
              />
                <IconLabel
                 icon={ icons.star }
                 label={course.mention}
                 containerStyle={{
                  marginTop: SIZES.base,
               }}
              /> 
              <IconLabel
                 icon={ icons.star }
                 label={course.mention}
                 containerStyle={{
                  marginTop: SIZES.base,
               }}
              /> 
             {/* <IconLabel
              icon={ icons.star }
              label={course.mention}
              containerStyle={{
               marginTop: SIZES.base,
            }}
           /> */}
              
              </View>

            
    </View>
   </View>
   </>
  );
}

export const styles = StyleSheet.create({
  heartContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  lottie: {
    width: 68,
    height: 68
},
})


