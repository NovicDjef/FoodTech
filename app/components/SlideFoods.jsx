/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React from 'react';

import { Image, TouchableOpacity, View } from 'react-native';
import { SIZES} from '../constants';

export default function SlideFoods({containerStyle, course}) {

  return (
    <TouchableOpacity
      style={{
        width: 170,
        right: 22,
        ...containerStyle,
        marginBottom: 20
      }}>
      <Image
        source={{uri: `http://172.20.10.4:3000/images/${course.image}`}}
        resizeMode="cover"
        style={{
          width: '100%',
          height: 120,
          justifyContent: "center",
          alignItems: "center",
          marginHorizontal : 36,
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


