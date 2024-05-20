
import React from 'react';

import {
  View,
  Image,
  Text,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import {IconLabel} from '.';
import Icon from "react-native-vector-icons/FontAwesome"
import {SIZES, COLORS, FONTS, icons} from '../constants';
import baseImage from "../services/urlApp"
import { useTranslation } from 'react-i18next';

 export default function HorizontalCourses({containerStyle, course, onPress,}) {
  const { t } = useTranslation();
  return (
    <TouchableOpacity
      style={{
        flexDirection: 'row',
        ...containerStyle,

      }}
      onPress={onPress}
      >
      {/* thumbnail */}
      <ImageBackground
      source={{uri: `${baseImage}/${course.image}`}}
        resizeMode="cover"
        style={{
          width: 120,
          height: 110,
          marginBottom: -8,
        }}
        imageStyle={{
          borderRadius: SIZES.radius,
        }}
      >
        <View
         style={{
            position: 'absolute',
            top: 10,
            right: 10,
            width: 30,
            height: 30,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 5,
            backgroundColor: COLORS.white,
         }}
         >
            <Image
              source={icons.favourite}
              resizeMode="contain"
              style={{
                width: 30,
                height: 20,
                tintColor: course.is_favourite ?
                COLORS.secondary : COLORS.additionalColor4,

            }}

            />
         </View>
        </ImageBackground>
{/* details */}
      <View
        style={{
         flex: 1,
         marginLeft: SIZES.base,
         
        }}

      >
        {/* titre */}
        <Text
          style={{
            ...FONTS.h3,
            fontSize: 18,
            color: COLORS.black
          }}
        >
      {course.name}
        </Text>
    {/* durée */}
      <View
         style={{
            //flexDirection: 'row',
            alignItems: 'flex-start',
            marginTop: SIZES.base,
         }}
         >
        {/* <Text
          style={{
            ...FONTS.body4,
          }}
        >
            Par {course.nom}
        </Text> */}
        <Text numberOfLines={3}>
        {course.description}
        </Text>
    
      </View>
      {/* price */} 
        <View style={{
                    flexDirection: 'row',
                    marginHorizontal: 1,  
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginTop: 8
                }}>
                  <View style={{flexDirection: "column", margin: 2,}}>
                  <View style={{ flexDirection: 'row' }}>
                    {[...Array(course.ratings)].map((_, index) => (
                      <Icon key={index} name="star" size={12} color={COLORS.yellow} style={{ marginRight: 4 }} />
                    ))}
                    {[...Array(5 - course.ratings)].map((_, index) => (
                      <Icon key={course.ratings + index} name="star" size={12} color={COLORS.gray30} style={{ marginRight: 4 }} />
                    ))}
                  </View>
                    <Text style={{color: COLORS.primary}}>{course.ratings} {t("Star_ratings")}</Text>
                  </View>
                  <View>
                    <Text
                      style={{
                          ...FONTS.h2,
                          color: COLORS.primary,
                          //marginLeft: 28
                          
                      }}
                      >
                      {course.prix}Frs
                    </Text>
                  </View>
        </View>
      </View>

    </TouchableOpacity>
  );
}
