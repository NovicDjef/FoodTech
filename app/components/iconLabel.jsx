
import React from 'react';

import {View, Image, Text} from 'react-native';

import {FONTS, COLORS, SIZES} from '../constants';
import Icon from 'react-native-vector-icons/Feather';

export default function IconLabel({containerStyle, icon, iconStyle, label, labelStyle}) {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        ...containerStyle,
      }}>
      <Image
        source={icon}
        style={{
          width: 15,
          height: 15,
          //tintColor: COLORS.gray30,
          ...iconStyle,
        }}
      />
      {/* <Icon
            name='map-pin'
            color='#000' size={25} /> */}
      <Text
      numberOfLines={2}
        style={{
            marginLeft: SIZES.base,
            color: COLORS.gray30,
            ...FONTS.body3,
            ...labelStyle,
        }}
      >
        {label}
      </Text>
    </View>
  );
}

