import React, { useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import TabMenu from '../screens/menu/tabMenu';
import FavoriteList from '../screens/FavoriteListe';
import RestaurantDetail from '../screens/detailScreen';
import Categories from '../screens/categories';
import Payemant from '../screens/payement';
import Panier from '../screens/panier';
import DetailCours from '../screens/cours/DetailCours';
import DetailsPlats from "../screens/DetailsPlats"
import Cart from '../screens/Cart';
import LoginScreen from '../pages/auth/LoginScreen';
import PlatCategorie from "../screens/PlatCategorie"
import { useDispatch, useSelector } from 'react-redux';
import { setUser, logoutUser } from '../redux/reducer/authReducer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Status from '../components/Status';
import ListRestaurants from '../screens/ListRestaurants';
import Notifications from '../pages/menu/Notifications';
import Setting from '../screens/Setting';

const Stack = createStackNavigator();

export default function Navigation() {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const userData = await AsyncStorage.getItem('userData');
      if (userData) {
        dispatch(setUser(JSON.parse(userData)));
      } else {
        dispatch(logoutUser());
      }
    } catch (error) {
      console.error('Error checking authentication status:', error);
    }
  };
    return (
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
            }}
          >
          <>
             {isAuthenticated ? (
              <>
                <Stack.Screen name="Home" component={TabMenu} />
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
                <Stack.Screen name='ListFavorite' component={FavoriteList} />
                <Stack.Screen name='Notification' component={Notifications} />
              </>
             ): (
              <Stack.Screen name="Login" component={LoginScreen} />
             )}
          </>     
          </Stack.Navigator>
        </NavigationContainer>
    );
  }

