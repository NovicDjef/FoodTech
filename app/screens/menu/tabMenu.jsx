/* eslint-disable prettier/prettier */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-native/no-inline-styles */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useRef} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import * as Animatable from 'react-native-animatable';
// import Icon, {Icons} from '../../components/Icons'
import Icon from "react-native-vector-icons/FontAwesome";
import Colors from '../../constants/Colors';
import Home from '../home';
// import Historique from '../historique';
import Panier from '../panier';
import Categories from '../categories';
import FavoriteList from '../FavoriteListe';
import { regular, semiBold } from '../../utils/fonts';
import Setting from '../Setting';
import Historique from '../../pages/menu/Historique';


const Tab = createBottomTabNavigator();

export default function TabMenu() {
  return (
      <Tab.Navigator
           screenOptions={{
        tabBarLabelStyle: styles.label,
        headerShown: false,

        headerTitleStyle: styles.header,
        tabBarStyle: [
          styles.tabContainer,
          Platform.OS === 'ios' && {
            shadowOffset: { height: -2, width: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 15,
          },
        ],
        tabBarItemStyle: {
          marginBottom: 7,
        },
        tabBarInactiveTintColor: 'gray',
        tabBarActiveTintColor: '#02b875',
      }}
      safeAreaInsets={{
        bottom: 0,
      }}
    >
         <Tab.Screen
        options={{
          tabBarIcon: ({ focused }) => (
            <Icon
              name="home"
              size={24}
              color={focused ? '#02b875' : 'gray'}
            />
          ),
        }}
        name="Home"
        component={Home}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({ focused }) => (
            <Icon
              name="search"
              size={22}
              color={focused ? '#02b875' : 'gray'}
            />
          ),
        }}
        name="Categories"
        component={Categories}
      />
      <Tab.Screen
        name="Historique"
        component={Historique}
        options={{
          tabBarIcon: ({ focused }) => (
            <Icon
              name="history"
              size={22}
              color={focused ? '#02b875' : 'gray'}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Setting"
        component={Setting}
        options={{
          tabBarIcon: ({ focused }) => (
            <Icon
              name="user-circle-o"
              size={22}
              color={focused ? '#02b875' : 'gray'}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );      
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 4,
    borderRadius: 16,
  },
  label: {
    textTransform: 'capitalize',
    ...regular,
    fontSize: 12,
  },
});
