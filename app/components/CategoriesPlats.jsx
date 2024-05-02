
import { useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';

import { Image, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories } from '../redux/action/categorieAction';
import { fetchRestaurants } from '../redux/action/restaurantActions';

export default function CategoriesPlats({ course}) {
  const navigation = useNavigation();
//   const isLoading = useSelector(state => state.isLoading); // Utilisez votre état de chargement global
// const dispatch = useDispatch();
// useEffect(() => {
//   dispatch(fetchCategories());
// })
//   if (isLoading) {
//     return (
//       <SkeletonPlaceholder>
//         <TouchableOpacity
//           style={{
//             width: 170,
//             marginRight: -70,
//           }}>
//           <View style={{ width: '50%', height: 80, borderRadius: 100 }} />
//         </TouchableOpacity>
//       </SkeletonPlaceholder>
//     );
//   }

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


