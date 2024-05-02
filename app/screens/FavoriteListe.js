

import React from 'react';
import {Text, View, FlatList, TouchableOpacity, Image, StyleSheet} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
// import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
// import { removeFavorite } from '../redux/action/restaurantAction';


export default function FavoriteList() {

  const {favorites} = useSelector(state => state.favorites.restaurants);

  // const dispatch = useDispatch();
  // const removeFromFavorites = restaurant => dispatch(removeFavorite(restaurant));
  // const handleRemoveFavorite = restaurant => {
  //   removeFromFavorites(restaurant);
  // };

  return (
    // <View style={{flex: 1, marginTop: 44, paddingHorizontal: 20}}>
    //   <Text style={{fontSize: 22}}>Favorites</Text>
    //   <View style={{flex: 1, marginTop: 8}}>
    //     {favorites.length === 0 ? (
    //       <Text style={{color: '#010101', fontSize: 18}}>
    //         Ajouter un restaurant a la liste.
    //       </Text>
    //     ) : (
    //       <FlatList
    //         data={favorites}
    //         keyExtractor={item => item.id.toString()}
    //         showsVerticalScrollIndicator={false}
    //         renderItem={({item}) => {
    //           const IMAGE_URL =
    //             'https://image.tmdb.org/t/p/w185' + item.thumbnail;

    //           return (
    //             <View style={{marginVertical: 12}}>
    //               <View style={{flexDirection: 'row', flex: 1}}>
    //                 <Image
    //                   source={{
    //                     uri: IMAGE_URL,
    //                   }}
    //                   resizeMode="cover"
    //                   style={{width: 100, height: 150, borderRadius: 10}}
    //                 />
    //                 <View style={{flex: 1, marginLeft: 12}}>
    //                   <View>
    //                     <Text style={{fontSize: 22, paddingRight: 16}}>
    //                       {item.name}
    //                     </Text>
    //                   </View>
    //                   <View
    //                     style={{
    //                       flexDirection: 'row',
    //                       marginTop: 10,
    //                       alignItems: 'center',
    //                     }}>
    //                     <MaterialIcons
    //                       color="green"
    //                       name="thumb-up"
    //                       size={32}
    //                     />
    //                     <Text
    //                       style={{
    //                         fontSize: 18,
    //                         paddingLeft: 10,
    //                         color: '#64676D',
    //                       }}>
    //                       {item.location}
    //                     </Text>
    //                     <TouchableOpacity
    //                       onPress={() => handleRemoveFavorite(item)}
    //                       activeOpacity={0.7}
    //                       style={{
    //                         marginLeft: 14,
    //                         flexDirection: 'row',
    //                         padding: 2,
    //                         borderRadius: 20,
    //                         alignItems: 'center',
    //                         justifyContent: 'center',
    //                         height: 40,
    //                         width: 40,
    //                       }}>
    //                       <MaterialIcons
    //                         color="orange"
    //                         size={32}
    //                         name="favorite"
    //                       />
    //                     </TouchableOpacity>
    //                   </View>
    //                 </View>
    //               </View>
    //             </View>
    //           );
    //         }}
    //       />
    //     )}
    //   </View>
    // </View>
    <View>
      <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10 }}>Favorites</Text>
      <FlatList
        data={favorites}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={{ margin: 10 }}>
            <Text>{item.name}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center', 
    justifyContent: 'center' 
  }
});