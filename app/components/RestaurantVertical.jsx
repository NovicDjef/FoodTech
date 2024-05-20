/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */

import React, { useEffect, useState } from 'react';
import { Image, TouchableOpacity, View, Text, StyleSheet, Animated, Alert } from 'react-native';

import { IconLabel } from '.'
import Icon from 'react-native-vector-icons/FontAwesome';
import { SIZES, icons, FONTS, COLORS, } from '../constants';
import LottieView from 'lottie-react-native';
// import Toast from 'react-native-toast-message'
import { useDispatch, useSelector } from 'react-redux';
import { toggleFavorite } from '../redux/action/favoriteAction';
// import SkeletonPlaceholder from "react-native-skeleton-placeholder";
// import { fetchRestaurants } from '../redux/action/restaurantActions';
import { RadioButton } from 'react-native-paper';
import baseImage from "../services/urlApp"
import { useTranslation } from 'react-i18next';


export default function RestaurantVertical({containerStyle, course, restaurant, distances, loading}) {
  const { t } = useTranslation();
  const favorites = useSelector(state => state.favorite.restaurants);
  const isFavorite = favorites.some((r) => r.id === restaurant.id);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
 

  useEffect(() => {
    if (loading) {
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 5000);

      return () => clearTimeout(timer);
    } else {
      setIsLoading(false);
    }
  }, [loading]);


  if (isLoading) {
    return (
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
              source={require('../../assets/images/notFound.jpg')}
             resizeMode="cover"
             style={{
               width: '100%',
               height: 150,
               marginBottom: SIZES.radius,
               borderRadius: SIZES.radius,
     
             }}
           />     
             <View
                 style={{
                   flexShrink: 1,
                   paddingHorizontal: SIZES.radius,
                   flexDirection: 'row',
                   backgroundColor: COLORS.gray20
                 }}>
                 
                   <Text
                     style={{
                       flex: 1,
                       ...FONTS.h3,
                       fontSize: 18,
                       fontWeight:700,
                       backgroundColor: COLORS.gray20
                     }}
                   >
                   </Text>
                   <View>
                   {distances !== undefined ? (
                   <View style={{flexDirection: "row", justifyContent: 'center', backgroundColor: COLORS.gray20}}>
                     <Text numberOfLines={1} style={{fontSize: 16, fontWeight: 700, marginRight: 3, backgroundColor: COLORS.gray20}}>
                     </Text>
                   <Text style={{backgroundColor: COLORS.gray20}} numberOfLines={1}>
                     </Text>
                   </View>
                   ) : (
                     <Text style={{backgroundColor: COLORS.gray20}}>
                     </Text>
                   )}
                 </View>
             </View>
               <View
               style={{
                 flexDirection: 'row',
                 backgroundColor: COLORS.gray20,
                 marginTop: 4,
                 width: 180,
               }}>
                  
                   <View style={{backgroundColor: COLORS.gray20,  }}>
                   <Text
                   style={{
                     fontSize: SIZES.h3,
                     backgroundColor: COLORS.gray20
                   }}>
                     </Text>
                   </View>
           </View>
               <View style={{flexDirection: "row", justifyContent: "space-between", alignItems: "center", }}>
                 <View style={{flexDirection: "column", margin: 2,}}>
                       <View style={{ flexDirection: 'row', backgroundColor: COLORS.gray20, width: 140  }}>
                         {[...Array(course.ratings)].map((_, index) => (
                           <Icon key={index} 
                           size={14} color={COLORS.yellow} style={{ marginLeft: 24, }} />
                         ))}
                         {[...Array(5 - course.ratings)].map((_, index) => (
                           <Icon 
                           key={course.ratings + index} 
                           size={14} color={COLORS.gray30} style={{ marginRight: 4 }} />
                         ))}
                       </View>
                         <View style={{backgroundColor: COLORS.gray20, marginTop: 4, width: 90}}>
                         <Text style={{color: COLORS.primary, }}>
                           </Text>
                         </View>
                 </View>
               </View>
           </View>
         </View>
    );
  }


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
         source={{uri: `${baseImage}/${course.image}`}}
        resizeMode="cover"
        style={{
          width: '100%',
          height: 150,
          marginBottom: SIZES.radius,
          borderRadius: SIZES.radius,

        }}
      />     
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
                {course.name}
              </Text>
              <View>
              {distances !== undefined ? (
              <View style={{flexDirection: "row", justifyContent: 'center'}}>
                <Text numberOfLines={1} style={{fontSize: 16, fontWeight: 700, marginRight: 3}}>
                 {t("Has")} {distances.toFixed(2)} km
                </Text>
              <Text numberOfLines={1}>{t("From_you")}</Text>
              </View>
              ) : (
                <Text style={styles.distance}>{t("Distance_not_available")}</Text>
              )}
            </View>
        </View>
          <View
          style={{
            flexDirection: 'row',
          }}>
              <IconLabel
                 icon={ icons.userplace }
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
          <View style={{flexDirection: "row", justifyContent: "space-between", alignItems: "center"}}>
            <View style={{flexDirection: "column", margin: 2,}}>
                  <View style={{ flexDirection: 'row' }}>
                    {[...Array(course.ratings)].map((_, index) => (
                      <Icon key={index} name="star" size={18} color={COLORS.yellow} style={{ marginRight: 4 }} />
                    ))}
                    {[...Array(5 - course.ratings)].map((_, index) => (
                      <Icon key={course.ratings + index} name="star" size={18} color={COLORS.gray30} style={{ marginRight: 4 }} />
                    ))}
                  </View>
                    <Text style={{color: COLORS.primary}}>{course.ratings} {("Star_ratings")}</Text>
            </View>
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


