
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';

import { Image, TouchableOpacity, Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories } from '../redux/action/categorieAction';
import { fetchRestaurants } from '../redux/action/restaurantActions';
import baseImage from "../services/urlApp"
import { COLORS } from '../constants';

export default function CategoriesPlats({course, loading}) {
  const navigation = useNavigation();
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

  if(isLoading) {
    return(
      <TouchableOpacity
      style={{
        width: 170,
        marginRight: -80, // Supprime la marge droite
        
      }} 
      onPress={() => navigation.navigate("Status", {
        item: course,
    })}>
      <Image
      source={require("../../assets/images/notFound.jpg")}
        resizeMode="cover"
        style={{
          width: '50%',
          height: 85,
          borderRadius: 100,
          borderWidth: 1,
          borderColor: COLORS.primary,
          // backgroundColor: COLORS.gray20
        }}
      />
      <Text style={{
        fontSize: 16,
        fontWeight: "bold",
        marginHorizontal: 12,
        backgroundColor: COLORS.gray20,
        marginTop: 6

      }}>
        {/* {course.name} */}
      </Text>
    </TouchableOpacity>
    )
  }


  return (
    <TouchableOpacity
      style={{
        width: 170,
        marginRight: -80, // Supprime la marge droite
        
      }} 
      onPress={() => navigation.navigate("Status", {
        item: course,
    })}>
      <Image
      source={{uri: `${baseImage}/${course.image}`}}
        resizeMode="cover"
        style={{
          width: '50%',
          height: 85,
          borderRadius: 100,
          borderWidth: 1,
          borderColor: COLORS.primary,
    

        }}
      />
      <Text style={{
        fontSize: 16,
        fontWeight: "bold",
        marginHorizontal: 12
      }}>
        {course.name}
      </Text>
    </TouchableOpacity>
  );
}


