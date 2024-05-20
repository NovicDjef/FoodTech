import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import TabMenu from '../screens/menu/tabMenu';
import FavoriteList from '../screens/FavoriteListe';
import RestaurantDetail from '../screens/detailScreen';
import Categories from '../screens/categories';
import Payemant from '../pages/payement';
import Panier from '../screens/panier';
import DetailsPlats from '../screens/DetailsPlats';
import DetailCours from '../screens/cours/DetailCours';
import Cart from '../screens/Cart';
import Setting from '../screens/Setting';
import Status from '../components/Status';
import PlatCategorie from '../screens/PlatCategorie';
import ListRestaurants from '../screens/ListRestaurants';
import Notifications from '../pages/menu/Notifications';
import FavoriteRepas from '../screens/home/FavoriteRepas';
import Helps from '../screens/home/helps';

const Stack = createStackNavigator();

export default function StackNavigation() {
  return (
   
    <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="TabMenu" component={TabMenu} />
        <Stack.Screen name="FavoriteList" component={FavoriteList} />
        <Stack.Screen name="restaurantDetail" component={RestaurantDetail} />
        <Stack.Screen name="categories" component={Categories} />
        <Stack.Screen name="payemant" component={Payemant} />
        <Stack.Screen name="panier" component={Panier} />
        <Stack.Screen name="DetailsPlats" component={DetailsPlats} />
        <Stack.Screen name="DetailCours" component={DetailCours} />
        <Stack.Screen name='Cart' component={Cart} />
        <Stack.Screen name="settings" component={Setting} />
        <Stack.Screen name='Status' component={Status} />
        <Stack.Screen name='PlatCategorie' component={PlatCategorie} />
        <Stack.Screen name='ListRestaurants' component={ListRestaurants} />
        <Stack.Screen name='Notification' component={Notifications} />
        <Stack.Screen name='favorite' component={FavoriteRepas} />
        <Stack.Screen name='Helps' component={Helps} />
    </Stack.Navigator>
  )
}