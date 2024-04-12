
import React, {useRef, useEffect, useState} from 'react';
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
  RefreshControl
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

const {width} = Dimensions.get('screen');
import Icon from 'react-native-vector-icons/Feather';
import {useNavigation} from '@react-navigation/native';
import LottieView from 'lottie-react-native';
// Tab ICons...
import { useSelector, useDispatch } from 'react-redux';
import { fetchRestaurant } from '../redux/action/restaurantActions';
import { checkUserLoggedIn } from '../redux/action/userAction';
// Menu
import menu from '../../assets/drawer/menu.png';
import close from '../../assets/drawer/close.png';

import RestaurantHorizontal from '../components/RestaurantHorizontal';
// logique de redux


function Home() {
  const navigation = useNavigation();

  // To get the curretn Status of menu ...
  const [showMenu, setShowMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [refresh, setRefresh] = useState(false)
  // Animated Properties...

  const dispatch = useDispatch();
  const user = useSelector(state => state.userReducer.user)
  const { isLoading, restaurantData, error } = useSelector(state => state.restaurantReducer);
  useEffect(() => {
    dispatch(fetchRestaurant());
  }, []);
  const RefreshMe = () => {
    setRefresh(true)

    setTimeout(() => {
        setRefresh(false)
    }, 3000)
  }
  const offsetValue = useRef(new Animated.Value(0)).current;
  // Scale Intially must be One...
  const scaleValue = useRef(new Animated.Value(1)).current;
  const closeButtonOffset = useRef(new Animated.Value(0)).current;



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
              width: 80,
              borderRadius: 30,
              left: 24,
              backgroundColor: COLORS.primary,
            }}
            label="tout voir"
            onPress={() => navigation.navigate('categories')}
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
        <TouchableOpacity
          onPress={() => {
            // Do Actions Here....
            // Scaling the view...
            Animated.timing(scaleValue, {
              toValue: showMenu ? 1 : 0.88,
              duration: 300,
              useNativeDriver: true,
            }).start();

            Animated.timing(offsetValue, {
              // YOur Random Value...
              toValue: showMenu ? 0 : 230,
              duration: 300,
              useNativeDriver: true,
            }).start();

            Animated.timing(closeButtonOffset, {
              // YOur Random Value...
              toValue: !showMenu ? -30 : 0,
              duration: 300,
              useNativeDriver: true,
            }).start();

            setShowMenu(!showMenu);
          }}>
          <Image
            source={showMenu ? close : menu}
            style={{
              width: 25,
              height: 25,
              tintColor: 'black',
              marginTop: -40,
              top: 63,
              left: 12,
            }}
          />
        </TouchableOpacity>



        {renderHeader()}
        <ScrollView 
          refreshControl={
            <RefreshControl 
              refreshing={refresh}
              onRefresh={() => RefreshMe()}
            />
          }
          >
          {/* header */}

          {/* slide */}
          {slide()}

          {/* search */}
          {search()}

          {/* Categories */}

          {renderCategories()}

          {/* cours populaire */}

          {/* {renderPopularCours()} */}

          {/* restaurant */}
          {restaurantFavoris()}

          {restaurantProche()}

          {restaurant()}
        </ScrollView>
      </Animated.View>

      {/* </Animated.View> */}
    </SafeAreaView>
  );

  function renderHeader() {
    return (
      <View
        style={{
          flexDirection: 'row',
          marginTop: 15,
          paddingHorizontal: SIZES.padding,
          alignItems: 'center',
        }}>
        {/* greeting */}
        <View
          style={{
            flexDirection: 'row',
            flex: 1,
          }}>

          <View style={{marginLeft: 22}}>
            <Text style={{...FONTS.h3}}>Hello {user.username}</Text>
            <Text style={{color: COLORS.gray50, ...FONTS.body4}}>
              Dim, 19 mars 2023
            </Text>
          </View>
        </View>

        {/* notifications */}
        <View
          style={{
            flexDirection: 'row',
          }}>
          <Icon
            name="shopping-cart"
            color="#000"
            size={25}
            style={{marginRight: 12}}
          />
          <IconsButton
            icon={icons.notification}
            iconStyle={{
              tintColor: COLORS.black,
            }}
            containerStyle={{marginRight: -24}}
            onPress={undefined}
          />
        </View>
      </View>
    );
  }

  function slide() {
    return (
      <FlatList
        horizontal
        data={dummyData.slides}
        // listKey="Courses"
        keyExtractor={item => `Courses-${item.id}`}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          marginTop: SIZES.padding,
          margin: 22,
        }}
        renderItem={({item, index}) => (
          <SlideFoods
            containerStyle={{
              marginLeft: index === 0 ? SIZES.padding : SIZES.radius,
              marginRight:
                index === dummyData.restaurants.length - 1 ? SIZES.padding : 0,
            }}
            course={item}
          />
        )}
      />
    );
  }

  function search() {
    return (
      <View style={styles.search}>
        <TouchableOpacity style={styles.icon}>
          <Icon name="search" color="#000" size={24} style={styles.iconImage} />
        </TouchableOpacity>
        <TextInput
          placeholder="search"
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
      <Section
        title="Categories"
        containerStyle={{
          marginTop:15,
          marginHorizontal: 6
        }}>
        <FlatList
          horizontal
          data={dummyData.categoriesPlats}
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
      </Section>
    );
  }

  function restaurantFavoris() {

    return (
      <Section  title="Restaurant Favoris">
        <>
             { restaurantData ? (
          <FlatList
          horizontal
          data={restaurantData}
          keyExtractor={item => item.id.toString()}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            marginTop: SIZES.padding,
            margin: 22,
          }}
          renderItem={({item, index}) => (
           
                <>
                  {isLoading ? (
                //  <View style={{flex: 1}}>
                <View style={{justifyContent: 'center', alignItems: 'center'}}>
                  <LottieView
                    style={styles.lottie}
                    source={require('../../assets/json/loadingRestau.json')}
                    autoPlay
                    loop
                  />
                </View>
              ) : error ? (
                <Text>Error: {error}</Text>
              ) :   (
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
                        index === restaurantData.length - 1 ? SIZES.padding : 0,
                    }}
                    course={item}
                  />
                </TouchableOpacity>
              )}
               
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
    );
  }

  function restaurantProche() {
    return (
      <Section title="Restaurant Proche">
        <FlatList
          horizontal
          data={dummyData.restaurants}
          // listKey="Courses"
          keyExtractor={item => `Courses-${item.id}`}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            marginTop: SIZES.padding,
            margin: 22,
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
                <RestaurantVertical
                  containerStyle={{
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
