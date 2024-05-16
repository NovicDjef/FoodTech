
import React, {useRef, useEffect, useState, useContext} from 'react';
import {
  Animated,
  SafeAreaView,
  Dimensions,
  StyleSheet,
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
// import { useNavigation } from '@react-navigation/native';


import {
  IconsButton,
} from '../components';
import {
  COLORS,
  FONTS,
  icons,
} from '../constants';
const width = Dimensions.get('window').width;

import Icon from 'react-native-vector-icons/Feather';
import {useNavigation} from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import DarkMode from '../utils/darkmode.context';
import Slide from './home/Slide';
import FastMenu from './home/FastMenu';
import Restaurants from './home/Restaurants';
import { fetchRestaurants } from '../redux/action/restaurantActions';
import { fetchRepas } from '../redux/action/platsActions';



function Home() {
  const navigation = useNavigation();
  const { t } = useTranslation();
  const { isDarkMode } = useContext(DarkMode)
  const [searchQuery, setSearchQuery] = useState('');
  const [refresh, setRefresh] = useState(false)
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.user.user)
    console.log("utilisateur", user)
  const RefreshMe = () => {
    setRefresh(true)
    setTimeout(() => {
     dispatch(fetchRestaurants())
     dispatch(fetchRepas())
        setRefresh(false)
    }, 3000)
  }

  const closeButtonOffset = useRef(new Animated.Value(0)).current;
  
  const renderLoader = () => {
    return(
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color={COLORS.primary} />
        <Text style={{ fontSize: 17 }}>Chargement</Text>
      </View>
    )
  }
 
  return (
    <SafeAreaView style={styles.Menu}>
      <Animated.View
        style={{
          transform: [
            {
              translateY: closeButtonOffset,
            },
          ],
        }}>
       {renderHeader()}
        {/* {loading ? (
        <View style={{ left: 62, bottom: 42 }}>
          {renderLoader()}
          </View>
          ) : ( */}
        <ScrollView 
          refreshControl={
            <RefreshControl 
              refreshing={refresh}
              onRefresh={() => RefreshMe()}
            />
          }
          style={{ marginBottom: 100 }} // Ajoutez cette ligne
          >
          <Slide />

          {search()}

          <FastMenu />

          <Restaurants />


        </ScrollView>
        {/* )} */}
      </Animated.View>
    </SafeAreaView>
  );

  function renderHeader() {
    return (
      <View
        style={{
          flexDirection: 'row',
          marginTop: 15,
          alignItems: 'center',
          marginHorizontal: 10,
          justifyContent: "space-between"

        }}>
        {/* greeting */}
        <TouchableOpacity
        onPress={() => navigation.navigate("settings")}
          style={{
            flexDirection: 'row',
           
          }}>
            <View style={{display: 'flex', justifyContent: "center", alignItems: "center", width: 35, height: 35, borderRadius: 10, backgroundColor: "grey"}}>
              <Image style={{width: 34, height: 34, borderRadius: 10}} source={require('../../assets/imag/avatar.jpg')}/>
            </View>
          <View style={{marginLeft: 2}}>
            <Text style={{...FONTS.h3}}>Hello {user.username}</Text>
            <Text style={{color: COLORS.gray50, ...FONTS.body4}}>
              +237 {user.phone}
            </Text>
          </View>
        </TouchableOpacity>

        <View
          style={{
            flexDirection: 'row',
          }}>
           
          <Icon
            name="shopping-cart"
            color="#000"
            size={25}
            style={{marginRight: 8}}
            onPress={() => navigation.navigate("panier")}
          />
           <View style={{backgroundColor: "red", borderRadius: 10, width: 14, height: 14, left: -10, top: -2}}>
          <Text style={{color: COLORS.white, textAlign: "center"}} >0</Text>
          </View>
          <IconsButton
            icon={icons.notification}
            iconStyle={{
              tintColor: COLORS.black,
            }}
            containerStyle={{marginRight: 0}}
            onPress={() => navigation.navigate("Notification")}
          />
          <View style={{backgroundColor: "red", borderRadius: 10, width: 14, height: 14, left: -10, top: -2}}>
            <Text style={{color: COLORS.white, textAlign: "center"}} >0</Text>
          </View>
        </View>
      </View>
    );
  }

  function search() {
    return (
      <View style={styles.search}>
        <TouchableOpacity style={styles.icon}>
          <Icon name="search" color="#000" size={24} style={styles.iconImage} />
        </TouchableOpacity>
        <TextInput
          placeholder={t("search")}
          style={styles.input}
          clearButtonMode="always"
          placeholderTextColor="#888"
          autoCapitalize="none"
          autoCorrect={false}
          value={searchQuery}
          onChangeText={query => setSearchQuery(query)}
        />
        <TouchableOpacity style={[styles.icon, {color: 'red'}]}>
          <Icon
            name="align-right"
            color="#000"
            size={24}
            style={styles.iconImage}
          />
        </TouchableOpacity>
      </View>
    );
  }

  // function restaurant() {
  //   return (
  //     <Section title="Restaurants">
  //       <FlatList
  //         //horizontal
  //         data={dummyData.restaurants}
  //         // listKey="Courses"
  //         keyExtractor={item => `Courses-${item.id}`}
  //         showsHorizontalScrollIndicator={false}
  //         contentContainerStyle={{
  //           marginTop: SIZES.padding,
  //           margin: 2,
  //         }}
  //         renderItem={({item, index}) => (
  //           <>
  //             <TouchableOpacity
  //               onPress={() => {
  //                 navigation.navigate('detailRestaurant', {
  //                   course: item,
  //                   sharedElementPrefix: 'Cours',
  //                 });
  //               }}>
  //               <RestaurantHorizontal
  //                 containerStyle={{
  //                   marginVertical: SIZES.padding,
  //                   marginLeft: index === 0 ? SIZES.padding : SIZES.radius,
  //                   marginRight:
  //                     index === dummyData.restaurants.length - 1
  //                       ? SIZES.padding
  //                       : 0,
  //                 }}
  //                 course={item}
  //               />
  //             </TouchableOpacity>
  //           </>
  //         )}
  //       />
  //     </Section>
  //   );
  // }
}

export default Home;

const styles = StyleSheet.create({
  
  search: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e0e0e0',
    borderRadius: 20,
    paddingHorizontal: 6,
    marginHorizontal: 20,
    marginTop: -22,
    // marginBottom: -28,
  },
  input: {
    flex: 1,
    // paddingHorizontal: 10,
    color: '#333',
    height: 40,
  },
  icon: {
    padding: 2,
  },
  iconImage: {
    color: '#555',
  },

});
