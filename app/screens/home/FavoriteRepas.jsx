import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { suppressionFavoris } from '../../redux/reducer/favorisReducer';

export default function FavoriteRepas() {
    const favoris = useSelector(state => state.favoris);
    const dispatch = useDispatch();
  
    const removeFromFavoris = (repas) => {
      dispatch(suppressionFavoris(repas));
    };
  
    return (
      <View>
        <Text>Liste des favoris :</Text>
        {/* {favoris.map((repas, index) => (
          <View key={index}>
            <Text>{repas.nom}</Text>
            <TouchableOpacity onPress={() => removeFromFavoris(repas)}>
              <Text>Retirer des favoris</Text>
            </TouchableOpacity>
          </View>
        ))} */}
      </View>
    );
  };
  
