import { View, Text, ActivityIndicator, TouchableOpacity, ScrollView } from 'react-native'
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

    // console.debug("restaurant :", restaurants)
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
              .filter(({ distanceFromDouala }) => distanceFromDouala <= 4)
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
        //   <View>
        //     {loadingRestaurant ? (
        //     <>
        //       {renderLoader()}
        //     </>
        //   ) : (
        //   <>
        //     <Section  title={t("Nearest_restaurant")}>
        //     <>
        //     { nearestRestaurants.length > 0 ? (
        //       <ScrollView
        //       horizontal
        //       data={nearestRestaurants}
        //       keyExtractor={item => item.id.toString()}
        //       showsHorizontalScrollIndicator={false}
        //       contentContainerStyle={{
        //         marginTop: SIZES.padding,
        //         margin: 22,
        //       }}
        //       renderItem={({item, index}) => (
        //         <>
                 
        //         <TouchableOpacity
        //           key={item.id}
        //           // onPress={() => {
        //           //   handleRestaurantClick(item), console.debug('item..: ', item)}}
        //           onPress={() =>
        //             navigation.navigate('restaurantDetail', {
        //               restaurant: item,
        //             })
        //           }>
        //           <RestaurantVertical
        //             containerStyle={{
        //               marginLeft: index === 0 ? SIZES.padding : SIZES.radius,
        //               marginRight:
        //                 index === nearestRestaurants.length - 1 ? SIZES.padding : 0,
        //             }}
        //             course={item}
        //             restaurant={restaurant}
        //           />
        //         </TouchableOpacity>          
        //         </>
        //       )}
        //     />
           
        //           ) : (
        //             <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        //             <LottieView
        //               style={{
        //                 width: 168,
        //                 height: 168,
                      
        //               }}
        //               source={require('../../../assets/json/noData.json')}
        //               autoPlay
        //               loop
        //             />
        //           </View>
        //           )}
        //     </>
        //   </Section>
        //   <Section title={t("List_restaurant")}>
        //     {farthestRestaurants.length > 0 ? (
        //       <ScrollView
        //         horizontal
        //         data={farthestRestaurants}
        //         keyExtractor={item => item.id.toString()}
        //         showsHorizontalScrollIndicator={false}
        //         contentContainerStyle={{
        //           marginTop: SIZES.padding,
        //           margin: 22
        //         }}
        //         renderItem={({ item, index }) => (
        //           <TouchableOpacity
        //             key={item.id}
        //             onPress={() =>
        //               navigation.navigate("restaurantDetail", {
        //                 restaurant: item
        //               })
        //             }
        //           >
        //             <RestaurantVertical
        //               containerStyle={{
        //                 marginLeft: index === 0 ? SIZES.padding : SIZES.radius,
        //                 marginRight:
        //                   index === farthestRestaurants.length - 1
        //                     ? SIZES.padding
        //                     : 0
        //               }}
        //               course={item}
        //               restaurant={restaurant}
        //             />
        //           </TouchableOpacity>
        //         )}
        //       />
        //     ) : (
        //       <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        //         <LottieView
        //           style={{
        //             width: 168,
        //             height: 168
        //           }}
        //           source={require("../../../assets/json/noData.json")}
        //           autoPlay
        //           loop
        //         />
        //       </View>
        //     )}
        //   </Section>
        //   </>
        //   )}
        // </View>
        <View>
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
            {nearestRestaurants.map((item, index) => (
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
                />
              </TouchableOpacity>
            ))}
          </ScrollView>
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
            {farthestRestaurants.map((item, index) => (
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
                />
              </TouchableOpacity>
            ))}
          </ScrollView>
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