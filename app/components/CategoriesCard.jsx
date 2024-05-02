import React, { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import {TouchableOpacity, Text, Image, View, StyleSheet} from 'react-native';
import { COLORS, FONTS, SIZES} from '../constants';
import { SharedElement } from 'react-navigation-shared-element';
// import { useSelector, useDispatch } from 'react-redux';
// import { fetchCategories } from '../redux/action/categorieAction';
// import SkeletonPlaceholder from "react-native-skeleton-placeholder";



export default function CategoriesCard({sharedElementPrefix, category, containerStyle, onPress}) {
  // const dispatch = useDispatch()
  // const loading  = useSelector(state => state.categorie.loading)
  // useEffect(() => {
  //   dispatch(fetchCategories());
  // },[])

  // if (loading) {
  //   return (
  //     <SkeletonPlaceholder>
  //       <TouchableOpacity
  //         style={{
  //           height: 150,
  //           width: 200,
  //           ...containerStyle
  //         }}
  //         onPress={onPress}
  //       >
  //         <View style={{ width: '100%', height: '100%', borderRadius: SIZES.radius }} />
  //       </TouchableOpacity>
  //     </SkeletonPlaceholder>
  //   );
  // }
  
  return (
    <TouchableOpacity
    style={{
      height: 150,
      width: 200,
      ...containerStyle
      
    }}
    onPress={onPress}
    >
      <SharedElement
        id={`${sharedElementPrefix}-CategoryCard-${category?.id}`}
        style={[StyleSheet.basoluteFillObject]}
        
      >
      <Image 
      source={{uri: `http://172.20.10.4:3000/images/${category.image}`}}
      resizeMode="cover"
      style={{
        width: "100%",
        height: "100%",
        borderRadius: SIZES.radius,

      }}
      
      />
      </SharedElement>

     {/* title */}
  <View 
  style={{
     position: "absolute",
     bottom: 50,
     left: 5
  }}>
    <SharedElement
    id={`${sharedElementPrefix}-CategoryCard-title-${category?.id}`}
    style={[StyleSheet.basoluteFillObject]}
    >
    <Text
      style={{
        position: "absolute",
        color: COLORS.white,
        ...FONTS.h2,
        bottom: 10,
        left: 16
        
        
        
      }}
    >
      {category?.name}
    </Text>
    </SharedElement>
  </View>


    </TouchableOpacity>
  );
}
