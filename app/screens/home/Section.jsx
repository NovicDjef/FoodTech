import { View, Text } from 'react-native'
import React from 'react'
import { TextButton } from '../../components';
import { COLORS, SIZES, FONTS } from '../../constants';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';

export default function Section({containerStyle, title, onPress, children}) {
    const { t } = useTranslation()
    const restaurants = useSelector(state => state.restaurant.restaurants)
    const navigation = useNavigation();
        return (
          <View
            style={{
              ...containerStyle,
              marginHorizontal: 6,
            }}>
            <View
              style={{
                flexDirection: 'row',
                paddingHorizontal: SIZES.padding,
              }}>
              <Text
                style={{
                  flex: 1,
                  ...FONTS.h3,
                  right: 22,
                }}>
                {title}
              </Text>
              <TextButton
                contentContainerStyle={{
                  paddingHorizontal: 8,
                  borderRadius: 13,
                  left: 24,
                  backgroundColor: COLORS.primary,
                }}
                label={t('see_all')}
                onPress={() => navigation.navigate("ListRestaurants",
                  //  { restaurant: restaurants}
                   )}
                disabled={undefined}
                labelStyle={undefined}
                
              />
             
            </View>
            {children}
          </View>
        );
      };