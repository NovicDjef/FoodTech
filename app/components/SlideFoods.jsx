/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React from 'react';

import { Image, TouchableOpacity, View, Text } from 'react-native';
import { SIZES} from '../constants';
import { useSelector } from 'react-redux';

export default function SlideFoods({containerStyle, course}) {
  // const slide = useSelector(state => state.slide.slides)
  // const baseUrlImage = "http://172.20.10.4:3000/images";
  return (
    <TouchableOpacity
      style={{
        width: 170,
        right: 22,
        ...containerStyle,
      }}>
      <Image
        source={{uri: `http://172.20.10.4:3000/images/${course.image}`}}
        resizeMode="cover"
        style={{
          width: '100%',
          height: 100,
          marginBottom: SIZES.radius,
          borderRadius: SIZES.radius,

        }}
      />
      {/* detail section */}
      <View
      style={{
        flexDirection: 'row',
      }}>
      </View>
    </TouchableOpacity>
  );
}


