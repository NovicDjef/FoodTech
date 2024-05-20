import { View, Text, ActivityIndicator, TouchableOpacity, ScrollView, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import Section from './Section';
import { COLORS, SIZES, FONTS } from '../../constants';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import Geolocation from '@react-native-community/geolocation';
import { fetchRestaurants } from '../../redux/action/restaurantActions';
import { RestaurantVertical } from '../../components';
import LottieView from 'lottie-react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';


export default function Restaurants() {

    const navigation = useNavigation();
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const restaurants = useSelector((state) => state.restaurant.restaurants);
    const loadingRestaurant = useSelector((state) => state.restaurant.loading);
    const [nearestRestaurants, setNearestRestaurants] = useState([]);
    const [farthestRestaurants, setFarthestRestaurants] = useState([]);
    const [locationsRestaurant, setLocationsRestaurant] = useState([]);
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        dispatch(fetchRestaurants());
        getCurrentLocation()
    },[])

    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
          setLoading(false);
        }, 3000); 
  
    }, []);
    useEffect(() => {
      if (restaurants.length > 0) {
        getCurrentLocation();
      }
    }, [restaurants]);
    
    const renderLoader = () => {
        return(
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size="large" color={COLORS.primary} />
            <Text style={{ fontSize: 17 }}>Chargement</Text>
          </View>
        )
      }

      const doualaLatitude = 4.0511;
      const doualaLongitude = 9.7679;
      
      const getCurrentLocation = () => {
          Geolocation.getCurrentPosition(
              position => {
                  const { latitude, longitude } = position.coords;
                  console.log('position user Latitude:', latitude);
                  console.log('position user Longitude:', longitude);
      
                  // Appeler la fonction pour calculer la distance en utilisant les coordonnées de Douala
                  calculateAndDisplayDistance(latitude, longitude, doualaLatitude, doualaLongitude);
              },
              error => {
                  console.log(error);
              },
              { enableHighAccuracy: true }
          );
      };
      
      const calculateDistance = (lat1, lon1, lat2, lon2) => {
          const R = 6371; // Rayon de la Terre en km
          const dLat = toRadians(lat2 - lat1);
          const dLon = toRadians(lon2 - lon1);
          const a =
              Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
          const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
          const distance = R * c; // Distance en km
          return distance;
      }
      
      const toRadians = (degrees) => {
          return degrees * (Math.PI / 180);
      }
      
      function calculateAndDisplayDistance(userLatitude, userLongitude, doualaLatitude, doualaLongitude) {
          const restaurantDistances = [];
          restaurants.forEach((restaurant, index) => {
              const { latitude, longitude } = restaurant; // Coordonnées géographiques du restaurant
              const distanceFromDouala = calculateDistance(doualaLatitude, doualaLongitude, latitude, longitude);
              const distanceFromUser = calculateDistance(userLatitude, userLongitude, latitude, longitude);
              restaurantDistances.push({ index, distanceFromDouala, distanceFromUser });
          });
      
          restaurantDistances.sort((a, b) => a.distanceFromDouala - b.distanceFromDouala);
          const sortedRestaurants = restaurantDistances.map(restaurant => restaurants[restaurant.index]);
      
          const nearest = restaurantDistances
              .filter(({ distanceFromDouala }) => distanceFromDouala <= 4.99)
              .map(({ index }) => restaurants[index]);
      
          const farthest = restaurantDistances
              .filter(({ distanceFromDouala }) => distanceFromDouala > 5)
              .map(({ index }) => restaurants[index]);
      
          setNearestRestaurants(nearest);
          setFarthestRestaurants(farthest);
      
          restaurantDistances.forEach(({ index, distanceFromDouala, distanceFromUser }) => {
            // console.log(`La distance entre l'utilisateur et le restaurant ${index + 1} est de ${distanceFromUser.toFixed(2)} km (à ${distanceFromDouala.toFixed(2)} km de Douala)`);
              console.log(`La distance entre l'utilisateur et le restaurant ${index + 1} est de ${distanceFromDouala.toFixed(2)} km )`);
          });
      }
      

    
    
 // if (loadingRestaurant) {
  //   return renderLoader(); // Render loader until data is loaded
  // }

        return (
        <View style={{top: 12}}> 
  {loadingRestaurant ? (
    <>
      {renderLoader()}
    </>
  ) : (
    <>
      <Section title={t("Nearest_restaurant")}>
        {nearestRestaurants.length > 0 ? (
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              marginTop: SIZES.padding,
              margin: 22
            }}
          >
            {nearestRestaurants.map((item, index) => {
              const distanceFromDouala = calculateDistance(
                doualaLatitude,
                doualaLongitude,
                item.latitude,
                item.longitude
              );
              return(
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
                      index === nearestRestaurants.length - 1
                        ? SIZES.padding
                        : 0
                  }}
                  course={item}
                  restaurant={item} // Assurez-vous que cette ligne est correcte
                  distances={distanceFromDouala}
                />
              </TouchableOpacity>
            )})}
          </ScrollView>
        ) : (
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              marginTop: SIZES.padding,
              //margin: 22
            }}
          >
                {renderPlaceholders()}
          </ScrollView>
        )}
      </Section>
      <Section title={t("List_restaurant")}>
        {farthestRestaurants.length > 0 ? (
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              marginTop: SIZES.padding,
              margin: 22
            }}
          >
            {farthestRestaurants.map((item, index) => {
              const distanceFromDouala = calculateDistance(
                doualaLatitude,
                doualaLongitude,
                item.latitude,
                item.longitude
              );
              return(
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
                  restaurant={item} // Assurez-vous que cette ligne est correcte
                  distances={distanceFromDouala}
                />
              </TouchableOpacity>
            )})}
          </ScrollView>
        ) : (
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              marginTop: SIZES.padding,
              //margin: 22
            }}
          >
                {renderPlaceholders()}
          </ScrollView>
        )}
      </Section>
      <Section title={t("All_restaurant")}>
        {restaurants.length > 0 ? (
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              marginTop: SIZES.padding,
              margin: 22
            }}
          >
            {restaurants.map((item, index) => {
               const distanceFromDouala = calculateDistance(
                doualaLatitude,
                doualaLongitude,
                item.latitude,
                item.longitude
              );
               return(
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
                  restaurant={item} // Assurez-vous que cette ligne est correcte
                  distances={distanceFromDouala}
                  loading={loadingRestaurant}
                />
              </TouchableOpacity>
              )
})}
          </ScrollView>
        ) : (
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              marginTop: SIZES.padding,
              //margin: 22
            }}
          >
                {renderPlaceholders()}
          </ScrollView>
        )}
      </Section>
    </>
  )}
</View>
        );
      }

      const renderPlaceholders = () => {
        const placeholders = [];
        for (let i = 0; i < 5; i++) {
          placeholders.push(
            <TouchableOpacity key={i}>
            
          <View style={{
            border: 2,
            borderBlockColor: 'red'
           }}>
           <View
              style={{
                width: 250,
                right: 22,
                justifyContent: "center",
                marginLeft: 0 ? SIZES.padding : SIZES.radius,
                    marginRight: 2
                       
                }}>
              <Image
                 source={require('../../../assets/images/notFound.jpg')}
                resizeMode="cover"
                style={{
                  width: '100%',
                  height: 150,
                  marginBottom: SIZES.radius,
                  borderRadius: SIZES.radius,
        
                }}
              />     
                <View
                    style={{
                      flexShrink: 1,
                      paddingHorizontal: SIZES.radius,
                      flexDirection: 'row',
                      backgroundColor: COLORS.gray20
                    }}>
                    
                      <Text
                        style={{
                          flex: 1,
                          ...FONTS.h3,
                          fontSize: 18,
                          fontWeight:700,
                          backgroundColor: COLORS.gray20
                        }}
                      >
                      </Text>
                      <View>
                      
                      <View style={{flexDirection: "row", justifyContent: 'center', backgroundColor: COLORS.gray20}}>
                        <Text numberOfLines={1} style={{fontSize: 16, fontWeight: 700, marginRight: 3, backgroundColor: COLORS.gray20}}>
                        </Text>
                      <Text style={{backgroundColor: COLORS.gray20}} numberOfLines={1}>
                        </Text>
                      </View>
                    
                    </View>
                </View>
                  <View
                  style={{
                    flexDirection: 'row',
                    backgroundColor: COLORS.gray20,
                    marginTop: 4,
                    width: 180,
                  }}>
                     
                      <View style={{backgroundColor: COLORS.gray20,  }}>
                      <Text
                      style={{
                        fontSize: SIZES.h3,
                        backgroundColor: COLORS.gray20
                      }}>
                        </Text>
                      </View>
              </View>
                  <View style={{flexDirection: "row", justifyContent: "space-between", }}>
                    <View style={{flexDirection: "column", margin: 2,}}>
                          <View style={{ flexDirection: 'row', backgroundColor: COLORS.gray20, width: 140  }}>
                            {
                            //[...Array(course.ratings)].map((_, index) => (
                              <Icon 
                              size={14} color={COLORS.yellow} style={{ marginLeft: 24, }} />
                            //))
                            }
                            {
                            //[...Array(5 - course.ratings)].map((_, index) => (
                              <Icon 
                              
                              size={14} color={COLORS.gray30} style={{ marginRight: 4 }} />
                            //))
                            }
                          </View>
                            <View style={{backgroundColor: COLORS.gray20, marginTop: 4, width: 90}}>
                            <Text style={{color: COLORS.primary, }}>
                              </Text>
                            </View>
                    </View>
                  </View>
              </View>
            </View>
            </TouchableOpacity>
           
          );
        }
        return placeholders;
      };