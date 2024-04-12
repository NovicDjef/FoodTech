import React, { useEffect, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import TabMenu from '../screens/menu/tabMenu';
import FavoriteList from '../screens/favoriteListe';
import Drawer from '../screens/menu/drawer';
import RestaurantDetail from '../screens/detailScreen';
import Categories from '../screens/categories';
import Payemant from '../screens/payement';
import Panier from '../screens/panier';
import DetailCours from '../screens/cours/DetailCours';
import DetailsPlats from "../screens/DetailsPlats"
import Cart from '../screens/Cart';
import LoginScreen from '../pages/auth/LoginScreen';
import { useDispatch, useSelector } from 'react-redux';
import { loadUserDataFromStorage } from '../redux/reducer/userReducer';


const Stack = createStackNavigator();

export default function Navigation() {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(state => state.userReducer.user !== null);
  useEffect(() => {
    // Charger les données utilisateur au démarrage de l'application
    dispatch(loadUserDataFromStorage());
  }, []);

// useEffect(() => {
//   if(Platform.OS === 'android')  SplashScreen.hide();
  
// }, []);


  //const dispatch = useDispatch();
  //const isLoading = useSelector(state => state.loginReducer.isLoading);

  // useEffect(() => {
  //   setTimeout(async () => {
  //     let userToken;
  //     userToken = null;
  //     try {
  //       userToken = await AsyncStorage.getItem('userToken');
  //     } catch (e) {
  //       console.log(e);
  //     }
  //     dispatch(retrieveTokenAction(userToken));
  //   }, 1000);
  // }, []);

  // if (isLoading) {
  //   return (
  //     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
  //       <Loading />
  //     </View>
  //   );
  // } else {
    return (
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
            }}>
        {isAuthenticated  ? (
          <>
            <Stack.Screen name="Home" component={TabMenu} />
            <Stack.Screen name="FavoriteList" component={FavoriteList} />
            <Stack.Screen name="drawer" component={Drawer} />
            <Stack.Screen name="restaurantDetail" component={RestaurantDetail} />
            <Stack.Screen name="categories" component={Categories} />
            <Stack.Screen name="payemant" component={Payemant} />
            <Stack.Screen name="panier" component={Panier} />
            <Stack.Screen name="DetailsPlats" component={DetailsPlats} />
            <Stack.Screen name="DetailCours" component={DetailCours} />
            <Stack.Screen name='Cart' component={Cart} />
          </>
        ) : (
            <Stack.Screen name='login' component={LoginScreen} />
        )}
          </Stack.Navigator>
        </NavigationContainer>
    );
  }

