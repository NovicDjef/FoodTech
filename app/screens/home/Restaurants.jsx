import { View, Text, ProgressBarAndroid, ActivityIndicator, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import Section from './Section';
import { COLORS, SIZES } from '../../constants';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import Geolocation from '@react-native-community/geolocation';
import { fetchRestaurants } from '../../redux/action/restaurantActions';
import { RestaurantVertical } from '../../components';
import LottieView from 'lottie-react-native';
import { useNavigation } from '@react-navigation/native';
import { getchGeolocations } from '../../redux/action/locationActions';


export default function Restaurants() {

    const navigation = useNavigation();
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const restaurants = useSelector((state) => state.restaurant.restaurants);
    const loadingRestaurant = useSelector((state) => state.restaurant.loading);
    const location = useSelector(state => state.location.geolocation);
    const [nearestRestaurants, setNearestRestaurants] = useState([]);
    const [farthestRestaurants, setFarthestRestaurants] = useState([]);

    useEffect(() => {
        dispatch(fetchRestaurants());
        dispatch(getchGeolocations());
        getCurrentLocation()
    },[dispatch])
    
    const renderLoader = () => {
        return(
          <View style={{flex: 1, justifyContent: 'center', alignItems: 'center',}}>
                    {Platform.OS === 'android'
                        ?
                        (
                            <>
                                <ProgressBarAndroid size="large" color={COLORS.primary}/>
                                <Text style={{fontSize: 17}}>Chargement</Text>
                            </>
                        ) :
                        <>
                            <ActivityIndicator size="large" color={COLORS.primary}/>
                            <Text style={{fontSize: 17}}>Chargement</Text>
                        </>
                    }
                </View>
        )
      }
      const locationsrestaurant = restaurants.map(restaurant => {
        const geoLocation = location.find(geo => geo.id === restaurant.geolocalisationId);
        return {
          latitude: geoLocation.latitude,
          longitude: geoLocation.longitude,
        };
      });
      const getCurrentLocation = () => {
        Geolocation.getCurrentPosition(
          position => {
            const { latitude, longitude } = position.coords;
            console.log('position user Latitude:', latitude);
            console.log('position user Longitude:', longitude);
            calculateAndDisplayDistance(latitude, longitude, restaurants);
          },
          error => {
            console.log(error);
          },
          { enableHighAccuracy: true, }
        );
      };

      function calculateDistance(lat1, lon1, lat2, lon2) {
      const R = 6371; 
      const dLat = toRadians(lat2 - lat1);
      const dLon = toRadians(lon2 - lon1);
      const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      const distance = R * c; 
      return distance;
    }
    
    // Fonction pour convertir les degrés en radians
    function toRadians(degrees) {
      return degrees * Math.PI / 180;
    }
    
    function calculateAndDisplayDistance(userLatitude, userLongitude, restaurants) {
    
      const restaurantDistances = [];
      locationsrestaurant.forEach((restaurant, index) => {
        const distance = calculateDistance(
          userLatitude, 
          userLongitude, 
          restaurant.latitude, 
          restaurant.longitude
        );
        restaurantDistances.push({ index, distance });
      });
      
      restaurantDistances.sort((a, b) => a.distance - b.distance);
      const sortedRestaurants = restaurantDistances.map(
        restaurant => restaurants[restaurant.index]
      );
      console.log("restaurant position :", sortedRestaurants)
      const nearest = restaurantDistances
        .filter(({ distance }) => distance <= 3)
        .map(({ index }) => restaurants[index]);
    
      const farthest = restaurantDistances
        .filter(({ distance }) => distance > 5)
        .map(({ index }) => restaurants[index]);
    
      setNearestRestaurants(nearest);
      setFarthestRestaurants(farthest);
      console.warn("restaurant position :", farthest, sortedRestaurants)
      restaurantDistances.forEach(({ index, distance }) => {
        console.log(`La distance entre l'utilisateur et le restaurant ${index + 1} est de ${distance.toFixed(2)} km`);
      });
    }
    
 // if (loadingRestaurant) {
  //   return renderLoader(); // Render loader until data is loaded
  // }

        return (
          <View>
            {loadingRestaurant ? (
            <>
              {renderLoader()}
            </>
          ) : (
          <>
            <Section  title={t("Nearest_restaurant")}>
            <>
            { nearestRestaurants.length > 0 ? (
              <FlatList
              horizontal
              data={nearestRestaurants}
              keyExtractor={item => item.id.toString()}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{
                marginTop: SIZES.padding,
                margin: 22,
              }}
              renderItem={({item, index}) => (
                <>
                 
                <TouchableOpacity
                  key={item.id}
                  // onPress={() => {
                  //   handleRestaurantClick(item), console.debug('item..: ', item)}}
                  onPress={() =>
                    navigation.navigate('restaurantDetail', {
                      restaurant: item,
                    })
                  }>
                  <RestaurantVertical
                    containerStyle={{
                      marginLeft: index === 0 ? SIZES.padding : SIZES.radius,
                      marginRight:
                        index === nearestRestaurants.length - 1 ? SIZES.padding : 0,
                    }}
                    course={item}
                    restaurant={restaurant}
                  />
                </TouchableOpacity>          
                </>
              )}
            />
           
                  ) : (
                    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                    <LottieView
                      style={{
                        width: 168,
                        height: 168,
                      
                      }}
                      source={require('../../../assets/json/noData.json')}
                      autoPlay
                      loop
                    />
                  </View>
                  )}
            </>
          </Section>
          <Section title={t("List_restaurant")}>
            {farthestRestaurants.length > 0 ? (
              <FlatList
                horizontal
                data={farthestRestaurants}
                keyExtractor={item => item.id.toString()}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{
                  marginTop: SIZES.padding,
                  margin: 22
                }}
                renderItem={({ item, index }) => (
                  <TouchableOpacity
                    key={item.id}
                    onPress={() =>
                      navigation.navigate("restaurantDetail", {
                        restaurant: item
                      })
                    }
                  >
                    <RestaurantVertical
                      containerStyle={{
                        marginLeft: index === 0 ? SIZES.padding : SIZES.radius,
                        marginRight:
                          index === farthestRestaurants.length - 1
                            ? SIZES.padding
                            : 0
                      }}
                      course={item}
                      restaurant={restaurant}
                    />
                  </TouchableOpacity>
                )}
              />
            ) : (
              <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <LottieView
                  style={{
                    width: 168,
                    height: 168
                  }}
                  source={require("../../../assets/json/noData.json")}
                  autoPlay
                  loop
                />
              </View>
            )}
          </Section>
          </>
          )}
        </View>
        );
      }