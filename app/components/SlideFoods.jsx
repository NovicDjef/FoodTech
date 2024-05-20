/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React, {useEffect, useState} from 'react';

import { Image, TouchableOpacity, View } from 'react-native';
import { SIZES} from '../constants';
import baseImage from "../services/urlApp"

export default function SlideFoods({containerStyle, course, loading}) {
  const [isLoading, setIsLoading] = useState(true);
 

return(

      <TouchableOpacity
  style={{
    width: 270,
    right: 2,
    ...containerStyle,
    marginBottom: 20
  }}>
  <Image
    source={{uri: `${baseImage}/${course.image}`}}
    resizeMode="cover"
    style={{
      width: '100%',
      height: 120,
      justifyContent: "center",
      alignItems: "center",
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

    
    )}




