
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

 export default function HorizontalCourses({containerStyle, course, onPress,}) {
 
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
      source={{uri: `http://172.20.10.4:3000/images/${course.image}`}}
        resizeMode="cover"
        style={{
          width: 130,
          height: 130,
          marginBottom: SIZES.radius,
        }}
        imageStyle={{
          borderRadius: SIZES.radius,
        }}
      >
        <View
         style={{
            position: 'absolute',
            top: 30,
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
          }}
        >
      {course.nom}
        </Text>
    {/* durée */}
      <View
         style={{
            //flexDirection: 'row',
            alignItems: 'flex-start',
            marginTop: SIZES.base,
         }}
         >
        <Text
          style={{
            ...FONTS.body4,
          }}
        >
            Par {course.nom}
        </Text>
        <IconLabel
       
          icon={icons.reminder}
          label={course.description}
          containerStyle={{
            marginLeft: SIZES.base,
            
          }}
          iconStyle={{
            width: 15,
            height: 15,
          }}
          iconLabel={{
            ...FONTS.body4,
          }}
          
        />
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
                   <View style={{flexDirection: 'row'}}>
                      <Icon name="star" size={11} color={COLORS.yellow} style={{marginRight: 4}}/>
                      <Icon name="star" size={11} color={COLORS.yellow} style={{marginRight: 4}}/>
                      <Icon name="star" size={11} color={COLORS.yellow} style={{marginRight: 4}}/>
                      <Icon name="star" size={11} color={COLORS.yellow} style={{marginRight: 4}} />
                      <Icon name="star" size={11} color={COLORS.gray30} style={{marginRight: 4}} />
                   </View>
                    <Text style={{color: COLORS.primary}}>4 Star Ratings</Text>
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
