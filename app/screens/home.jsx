
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
  ProgressBarAndroid
} from 'react-native';
// import { useNavigation } from '@react-navigation/native';


import {
  IconsButton,
  TextButton,
  CategoriesPlats,
  SlideFoods,
  RestaurantVertical,
} from '../components';
import {
  COLORS,
  FONTS,
  icons,
  SIZES,
  images,
  dummyData,
  data,
} from '../constants';
const width = Dimensions.get('window').width;
// const {width} = Dimensions.get('screen');
import Icon from 'react-native-vector-icons/Feather';
import {useNavigation} from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import { useSelector, useDispatch } from 'react-redux';
import { fetchRestaurants } from '../redux/action/restaurantActions';
import Geolocation from '@react-native-community/geolocation';
import RestaurantHorizontal from '../components/RestaurantHorizontal';
import { fetchSlides } from '../redux/action/slideAction';
import { fetchCategories } from '../redux/action/categorieAction';
import { fetchUsers } from '../redux/action/authActions';
import { useTranslation } from 'react-i18next';
import DarkMode from '../utils/darkmode.context';
import { getchGeolocations } from '../redux/action/locationActions';
import { fetchcommandes } from '../redux/action/commandeActions';
import Carousel from 'react-native-banner-carousel';


const BannerWidth = Dimensions.get('window').width;
const BannerHeight = 230;

function Home() {
  const navigation = useNavigation();
  const { t } = useTranslation();
  const { isDarkMode } = useContext(DarkMode)
  const [searchQuery, setSearchQuery] = useState('');
  const [refresh, setRefresh] = useState(false)
  const [nearestRestaurants, setNearestRestaurants] = useState([]);
  const [farthestRestaurants, setFarthestRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.user.user)
    const slidee = useSelector((state) => state.slide.slides)
    const loadingSlide = useSelector((state) => state.slide.loading)
    const restaurants = useSelector((state) => state.restaurant.restaurants);
    const loadingRestaurant = useSelector((state) => state.restaurant.loading);
    const categories = useSelector(state => state.categorie.categories)
    const loadingCategories = useSelector(state => state.categorie.loading)
    const location = useSelector(state => state.location.geolocation)
    
    
    const locationsrestaurant = restaurants.map(restaurant => {
      const geoLocation = location.find(geo => geo.id === restaurant.geolocalisationId);
      return {
        latitude: geoLocation.latitude,
        longitude: geoLocation.longitude,
      };
    });

   useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);
    const fetchData = async () => {
      await Promise.all([
        dispatch(fetchRestaurants()),
        dispatch(fetchSlides()),
        dispatch(fetchCategories()),
        dispatch(getchGeolocations()),
        dispatch(fetchcommandes())
      ]);
      getCurrentLocation()
      return () => clearTimeout(timer);
    };

    fetchData();
  }, [dispatch]);
 
  const RefreshMe = () => {
    setRefresh(true)
    setTimeout(() => {
      getCurrentLocation()
      dispatch(fetchRestaurants())
      dispatch(fetchSlides())
      dispatch(fetchCategories());
      dispatch(fetchcommandes())
        setRefresh(false)
    }, 3000)
  }

  const getCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords;
        console.log('position user Latitude:', latitude);
        console.log('position user Longitude:', longitude);
        calculateAndDisplayDistance(latitude, longitude);
      },
      error => {
        console.log(error);
      },
      { enableHighAccuracy: true, }
    );
  };
//  // Fonction pour calculer la distance en kilomètres entre deux coordonnées GPS
function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Rayon de la Terre en kilomètres
  const dLat = toRadians(lat2 - lat1);
  const dLon = toRadians(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c; // Distance en kilomètres
  return distance;
}

// Fonction pour convertir les degrés en radians
function toRadians(degrees) {
  return degrees * Math.PI / 180;
}

// Fonction pour calculer et afficher la distance entre l'utilisateur et chaque restaurant
function calculateAndDisplayDistance(userLatitude, userLongitude) {

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
  
  // Trier les restaurants par distance croissante
  restaurantDistances.sort((a, b) => a.distance - b.distance);
  const sortedRestaurants = restaurantDistances.map(
    restaurant => restaurants[restaurant.index]
  );

  const nearest = sortedRestaurants
    .filter(({ distance }) => distance <= 3)
    .map(({ index }) => restaurants[index]);

  const farthest = sortedRestaurants
    .filter(({ distance }) => distance > 5)
    .map(({ index }) => restaurants[index]);

  setNearestRestaurants(nearest);
  setFarthestRestaurants(farthest);
  console.warn("restaurant position :", farthest, nearest)
  sortedRestaurants.forEach(({ index, distance }) => {
    console.log(`La distance entre l'utilisateur et le restaurant ${index + 1} est de ${distance.toFixed(2)} km`);
  });
}

  const offsetValue = useRef(new Animated.Value(0)).current;
  // Scale Intially must be One...
  const scaleValue = useRef(new Animated.Value(1)).current;
  const closeButtonOffset = useRef(new Animated.Value(0)).current;


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

  // if (loadingRestaurant) {
  //   return renderLoader(); // Render loader until data is loaded
  // }

  const Section = ({containerStyle, title, onPress, children}) => {
    return (
      <View
        style={{
          ...containerStyle,
          marginHorizontal: 6,
        }}>
        <View
          style={{
            flexDirection: 'row',
            paddingHorizontal: SIZES.padding,
          }}>
          <Text
            style={{
              flex: 1,
              ...FONTS.h3,
              right: 22,
            }}>
            {title}
          </Text>
          <TextButton
            contentContainerStyle={{
              paddingHorizontal: 8,
              borderRadius: 13,
              left: 24,
              backgroundColor: COLORS.primary,
            }}
            label={t('see_all')}
            onPress={() => navigation.navigate
              ("ListRestaurants", { restaurants: restaurants} )}
            disabled={undefined}
            labelStyle={undefined}
            
          />
         
        </View>
        {children}
      </View>
    );
  };
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
        {loading ? (
        <View style={{ left: 62, bottom: 42 }}>
          {renderLoader()}
          </View>
          ) : (
        <ScrollView 
          refreshControl={
            <RefreshControl 
              refreshing={refresh}
              onRefresh={() => RefreshMe()}
            />
          }
          >
          {slide()}

          {search()}

          {renderCategories()}

          {restaurantFavoris()}
        </ScrollView>
        )}
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

  function slide() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
       {loadingSlide ? (
        <>
          {renderLoader()}
        </>
      ) : (
       <>
          <Carousel
          height={width / 2}
          autoPlay={true}
          autoplayTimeout={10000}
          loop
          index={0}
          useNativeDriver={true}
          pageSize={BannerWidth}
        >
          {slidee.map((item, index) => (
            <View key={index}>
              <SlideFoods
                containerStyle={{
                  width: BannerWidth - 26,
                  marginLeft: index === 0 ? 2 : 0, 
                  marginRight: index === slidee.length - 1 ? 22 : 0,
                    marginTop: 12
                }}
                course={item}
              />
            </View>
          ))}
        </Carousel>
       </>
        
       )} 
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

  function renderCategories() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
       {loadingCategories ? (
        <>
          {renderLoader()}
        </>
      ) : (
        <Section title={t("Fast_menu")}>
          { categories.length > 0 ? (
            <FlatList
          horizontal
          data={categories}
          // listKey="Courses"
          keyExtractor={item => `Courses-${item.id}`}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            marginTop: SIZES.padding,
            margin: 22,
          }}
          renderItem={({item, index}) => (
            <CategoriesPlats
              containerStyle={{
                marginLeft: index === 0 ? SIZES.padding : SIZES.radius,
                marginRight:
                  index === dummyData.restaurants.length - 1
                    ? SIZES.padding
                    : 0,
              }}
              course={item}
            />
          )}
        />
          ) : (
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <LottieView
              style={{
                width: 168,
                height: 168,
              
              }}
              source={require('../../assets/json/noData.json')}
              autoPlay
              loop
            />
          </View>
          )}
        
      </Section>
      )}
     </View>
    );
  }

  function restaurantFavoris() {

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
                  source={require('../../assets/json/noData.json')}
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
              source={require("../../assets/json/noData.json")}
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

  // function restaurantProche() {
  //   return (
  //     <Section title="Restaurant Proche">
  //       <FlatList
  //         horizontal
  //         data={dummyData.restaurants}
  //         // listKey="Courses"
  //         keyExtractor={item => `Courses-${item.id}`}
  //         showsHorizontalScrollIndicator={false}
  //         contentContainerStyle={{
  //           marginTop: SIZES.padding,
  //           margin: 22,
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
  //               <RestaurantVertical
  //                 containerStyle={{
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

  function restaurant() {
    return (
      <Section title="Restaurants">
        <FlatList
          //horizontal
          data={dummyData.restaurants}
          // listKey="Courses"
          keyExtractor={item => `Courses-${item.id}`}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            marginTop: SIZES.padding,
            margin: 2,
          }}
          renderItem={({item, index}) => (
            <>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('detailRestaurant', {
                    course: item,
                    sharedElementPrefix: 'Cours',
                  });
                }}>
                <RestaurantHorizontal
                  containerStyle={{
                    marginVertical: SIZES.padding,
                    marginLeft: index === 0 ? SIZES.padding : SIZES.radius,
                    marginRight:
                      index === dummyData.restaurants.length - 1
                        ? SIZES.padding
                        : 0,
                  }}
                  course={item}
                />
              </TouchableOpacity>
            </>
          )}
        />
      </Section>
    );
  }
}

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bgCircle1: {
    position: 'absolute',
    height: width * 2,
    width: width * 2,
    borderRadius: width,
    left: 0,
    top: 0,
  },
  // container: {
  //   flex: 1,
  //   backgroundColor: '#adf'
  // },
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

  spinnerTextStyle: {
    color: '#FFF',
  },
  Menu: {
    flex: 1,
    backgroundColor: COLORS.white,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },

  lottie: {
    width: 148,
    height: 148,
  },
  text: {
    fontSize: 7,
    fontWeight: 'bold',
  },
});
