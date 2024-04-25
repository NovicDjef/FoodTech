/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import { useNavigation } from '@react-navigation/native';
import React from 'react';

import { Image, TouchableOpacity } from 'react-native';


export default function CategoriesPlats({ course}) {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={{
        width: 170,
        marginRight: -70, // Supprime la marge droite
      }} 
      onPress={() => navigation.navigate("Status", {
        name: course.name,
        image: course.image
    })}>
      <Image
      source={{uri: `http://172.20.10.4:3000/images/${course.image}`}}
        resizeMode="cover"
        style={{
          width: '50%',
          height: 80,
          borderRadius: 100,
    

        }}
      />

    </TouchableOpacity>
  );
}


