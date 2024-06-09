/* eslint-disable prettier/prettier */

  import { View, Text, Image, StyleSheet, FlatList, TouchableOpacity, TextInput } from 'react-native';
  import React, { useRef, useEffect, useState } from 'react';
  import
     Animated, {
    withTiming,
    withDelay,
    useSharedValue,
    useAnimatedStyle,
    useAnimatedScrollHandler,
    interpolate,
    Extrapolate,
    runOnJS,
  } from 'react-native-reanimated';
  import { fetchRepas } from '../redux/action/platsActions';
  import LottieView from 'lottie-react-native';
  import { useSelector, useDispatch } from 'react-redux';
  import { IconsButton, HorizontalCourses, LineDivider, FilterModal } from '../components';
  import { COLORS, FONTS, SIZES, images, icons, dummyData, data } from '../constants';
  import { SharedElement } from 'react-navigation-shared-element';
  import Icon from "react-native-vector-icons/FontAwesome"
import { useTranslation } from 'react-i18next';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import baseImage from "../services/urlApp"
import { fetchMenus } from '../redux/action/menuAction';
import { fetchCategories } from '../redux/action/categorieAction';

  const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

  const HEADER_HEIGHT = 180;

  const RestaurantDetail = ({navigation, item, sharedElementPrefix, category, route }) => {
    const { restaurant } = route.params;
    const { t } = useTranslation();
    const flatListRef = useRef();
    const scrollY = useSharedValue(0);
    const dispatch = useDispatch();
    const platsData = useSelector((state) => state.plat.repas);
    const menus = useSelector(state => state.menu.menus);
    const categories =  useSelector(state => state.categorie.categories)
    const [selectedMenu, setSelectedMenu] = useState(null);
    const [searchVisible, setSearchVisible] = useState(false)
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
      dispatch(fetchRepas());
      dispatch(fetchMenus());
      dispatch(fetchCategories());
    }, [dispatch]);
    
    useEffect(() => {
      // Sélectionner le premier menu par défaut si available
      if (menus.length > 0) {
        const firstMenu = menus.find(menu => menu.restaurantId === restaurant.id);
        if (firstMenu) {
          setSelectedMenu(firstMenu.id);
        }
      }
    }, [menus, restaurant.id]);

  const getPlatsForCategoryAndMenu = (categoryId, menuId) => {
    const plats = platsData.filter((plat) => {
      const match = plat.categorieId === categoryId || plat.menuId === menuId;
      return match;
  });
  return plats;
}
  const getCategoriesForMenu = (menuId) => {
    const result = categories.filter((category) => category.menuId === menuId);
    return result;
  };

  const getPlatsForMenu = (menuId, restaurantId) => {
    const categoriesForMenu = getCategoriesForMenu(menuId);
        let platsForMenu = [];
        categoriesForMenu.forEach((category) => {
            const platsForCategory = getPlatsForCategoryAndMenu(category.id, restaurantId, menuId);
            platsForMenu = [...platsForMenu, ...platsForCategory];
        });
        return platsForMenu;
  };

  const platsForMenu = selectedMenu ? getPlatsForMenu(selectedMenu, restaurant.id) : [];


  const filteredPlats = platsForMenu.filter((plat) => {
      const lowerCaseQuery = searchQuery.toLowerCase();
      return (
          plat.name.toLowerCase().includes(lowerCaseQuery) ||
          plat.description.toLowerCase().includes(lowerCaseQuery)
      );
  });

  const toggleSearch = () => {
    setSearchVisible(!searchVisible);
  };

  const resetSearch = () => {
    setSearchVisible(!searchVisible);
    setSearchQuery('');
  };

  function BackHandler() {
    navigation.goBack();
  }
  const headerShareValue = useSharedValue(80);
  const filterModalSharedValue1 = useSharedValue(SIZES.height);
  const filterModalSharedValue2 = useSharedValue(SIZES.height);

    function BackHandler() {
      navigation.goBack();
    }

  const onScroll = useAnimatedScrollHandler((event) => {
    scrollY.value = event.contentOffset.y;
  });
 
    function renderHeader({item,}) {
      const inputRange =  [0, HEADER_HEIGHT -40]
      headerShareValue.value = withDelay(500, 
        withTiming(0, {
          duration: 500
        })
      )
        const headerFadeAnimatedStyle = useAnimatedStyle(() =>{
          return {
            opacity: interpolate(headerShareValue.value,
              [80, 0], [0, 1])
          }
        })

        const headerTranslateAnimation = useAnimatedStyle(() => {
          return {
            transform: [
              {
                translateY: headerShareValue.value
              }
            ]
          }
        })

        const headerHieghtAnimatedStyle = useAnimatedStyle(() => {
          return {
            height: interpolate(scrollY.value, inputRange,
            [HEADER_HEIGHT, 100], Extrapolate.CLAMP)
          }
        })
      
        const headerHideOnscrollAnimationStyle = useAnimatedStyle(() => {
          return {
            opacity : interpolate(scrollY.value, [80, 0],
            [0, 1], Extrapolate.CLAMP),
            transform: [
              {
                translateY: interpolate(scrollY.value,
                inputRange, [0, 200], Extrapolate.CLAMP)
              }
            ]
          }
        })

        const headerShowOnScrollAnimatedStyle = useAnimatedStyle(() => {
          return {
            opacity: interpolate(scrollY.value, [80, 0],
            [1, 0], Extrapolate.CLAMP), 
            transform: [
              {
                translateY: interpolate(scrollY.value,
                inputRange, [50, 130], Extrapolate.CLAMP)
              }
            ]
          }
        })
      
      return (
        <Animated.View
         style={[{
          position: 'relative',
          top: 0,
          left: 0,
          right: 0,
          height: 180,
          overflow: 'hidden',
         }, headerHieghtAnimatedStyle]}
        >

            <SharedElement
            id={`${sharedElementPrefix}-CategoryCard-Bg-${restaurant?.id}`}
           style={[StyleSheet.absoluteFillObject]}
         >
           <Image
           source={{uri: `${baseImage}/${restaurant.image}`}}
            resizeMode="cover"
             style={{
               height: '100%',
               width: '100%',
               borderBottomLeftRadius: 60,
             }}
           />

         </SharedElement>

          {/* titre */}
             <Animated.View style={[{
              position: "absolute",
              top: -100,
              left: 0,
              right: 0
             }, headerShowOnScrollAnimatedStyle]}>
              <Text style={{
                textAlign: "center",
                color: COLORS.white,
                ...FONTS.h1,
                fontWeight: "bold"
              }}>
                {restaurant.name}
              </Text>
              <View style={{display: "flex", justifyContent: "center", alignItems: "center", top: 22}}>
              <View style={{ position: "absolute", marginTop: 140, marginLeft: 32, flexDirection: "row", justifyContent: "space-between", alignItems: "center"}}>
                <View style={{flexDirection: "column", margin: 2,}}>
                  <View style={{ flexDirection: 'row' }}>
                    {[...Array(restaurant.ratings)].map((_, index) => (
                      <Icon key={index} name="star" size={18} color={COLORS.yellow} style={{ marginRight: 4 }} />
                    ))}
                    {[...Array(5 - restaurant.ratings)].map((_, index) => (
                      <Icon key={restaurant.ratings + index} name="star" size={18} color={COLORS.gray30} style={{ marginRight: 4 }} />
                    ))}
                  </View>
                    <Text style={{color: COLORS.white}}>{restaurant.ratings} {t("Star_ratings")}</Text>
                </View>
              </View>
              </View>
             </Animated.View>


          <Animated.View
          style={[{
            position: 'absolute',
            bottom: 70,
            left: 30,
          }, headerHideOnscrollAnimationStyle]}
          >
            <SharedElement
             id={`${sharedElementPrefix}-CategoryCard-title-${category?.id}`}
            style={[StyleSheet.absoluteFillObject]}
            >
              <Text
              style={{
                position: 'absolute',
                color: COLORS.white,
                ...FONTS.h1,
                fontWeight: "bold"
              }}
              >
                {restaurant.name}
              </Text>
             
            </SharedElement>
            
          </Animated.View>
          <View style={{ position: "absolute", marginTop: 140, marginLeft: 32, flexDirection: "row", justifyContent: "space-between", alignItems: "center"}}>
            <View style={{flexDirection: "column", margin: 2,}}>
                  <View style={{ flexDirection: 'row' }}>
                    {[...Array(restaurant.ratings)].map((_, index) => (
                      <Icon key={index} name="star" size={18} color={COLORS.yellow} style={{ marginRight: 4 }} />
                    ))}
                    {[...Array(5 - restaurant.ratings)].map((_, index) => (
                      <Icon key={restaurant.ratings + index} name="star" size={18} color={COLORS.gray30} style={{ marginRight: 4 }} />
                    ))}
                  </View>
                    <Text style={{color: COLORS.white}}>{restaurant.ratings} {t("Star_ratings")}</Text>
            </View>
          </View>
  {/* back button */}

        <Animated.View
          style={headerFadeAnimatedStyle}
        >
           <IconsButton
             icon={icons.back}
             iconStyle={{
              tintColor: COLORS.black,
             }}
             containerStyle={{
              position: 'absolute',
              top: 40,
              left: 20,
              width: 50,
              height: 50,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 25,
              backgroundColor: COLORS.white,

             }}
           onPress={() =>{
            
            // if(scrollY.value > 0 && scrollY.value <= 200 ) {
            //   flatListRef.current?.scrollToOffset({
            //     offset: 0,
            //     Animated: true
            //   })
              
            // } else {
            //   BackHandler()
            // }
              
            
            setTimeout(() => {
              headerShareValue.value = 
              withTiming(80, {
                duration: 500
              }, () => {
                runOnJS(BackHandler)();
              })
            }, 100)
            
            ;}}

           />
          </Animated.View>

           {/* category image component */}

           <Animated.Image
             source={images.mobile_image}
             resizeMode="contain"
             style={[{
              position: 'absolute',
              right: 40,
              bottom: -40,
              width: 100,
              height:160,

             }, headerFadeAnimatedStyle,
             headerTranslateAnimation,
             headerHideOnscrollAnimationStyle]}

            />
              <Animated.View style={[{ 
               position: 'absolute',
               right: 30,
               bottom: -60,
               width: 100,
               height: 160,}, 
                headerFadeAnimatedStyle,
                headerTranslateAnimation,
                headerHideOnscrollAnimationStyle]}>
              <LottieView
                  style={[{
                    width: 68,
                    height: 78
                  }]}
                  source={require("../../assets/json/animation_lljmrq2l.json")}
                  autoPlay
                  loop
              />
          </Animated.View>
          
        </Animated.View>
      );
    }
    function renderMenu() {
      return (
        <View style={{ flexDirection: 'row', marginTop: 10, marginBottom: -10 }}>
          <FlatList
            data={menus.filter(menu => menu.restaurantId === restaurant.id)}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={item => `Menu-${item.id}`}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={{
                  padding: 8,
                  backgroundColor: selectedMenu === item.id ? COLORS.primary : COLORS.gray10,
                  borderRadius: SIZES.radius,
                  marginHorizontal: 10
                }}
                onPress={() => setSelectedMenu(item.id)}
              >
                <Text style={{ ...FONTS.h3, color: selectedMenu === item.id ? COLORS.white : COLORS.black }}>{item.name}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      );
    }

    function renderResult({item}) {
      
      return (
        <AnimatedFlatList
        ref={flatListRef}
        data={filteredPlats}
        keyExtractor={item => `Results-${item.id}`}
        contentContainerStyle={{
          paddingHorizontal: SIZES.padding,
          marginTop: -255,
        }}
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        keyboardDismissMode="on-drag"
        onScroll={onScroll}
        ListHeaderComponent={
          <View
            style={{
              flexDirection: 'row',
              alignItems:'center',
              marginTop: 270,
              marginBottom: 22
              
            }}
          >
            {/* result */}
            <Text
              style={{
                flex: 1,
                ...FONTS.body3,
              }}
            >
             {platsForMenu.length} {t("Result")}

            </Text>

  {/* filter button */}

        <View style={styles.container}>
          <TouchableOpacity onPress={searchVisible ? resetSearch : toggleSearch} >
            <Icon name={searchVisible ? "times" : "search"} size={24} color="white" style={{margin: 8, right: 3,}} />
          </TouchableOpacity>
          {searchVisible && (
            <View style={styles.mainbox}>
              <TextInput
                style={styles.search_input}
                value={searchQuery}
                onChangeText={(query) => setSearchQuery(query)}
                placeholder="Rechercher un plat...."
                placeholderTextColor={COLORS.primary}
              />
            </View>
          )}
        </View>
      </View>
        }
        ListEmptyComponent={
          <>
          {selectedMenu > 0 ? (
          <View style={{flex: 1, marginTop: -62}}>
          <View style={{justifyContent: "center", alignItems: 'center'}}>
              <LottieView
                  style={{
                    width: 248,
                    height: 248
                  }}
                  source={require("../../assets/json/629-empty-box.json")}
                  autoPlay
                  loop
              />
               <Text style={styles.text}>{t("menuVide")}</Text>
          </View>
      </View>) : (
        <Text style={styles.text}> {t("Veuillez sélectionner un menu")}</Text>
        )}
          </>
        }
        renderItem={({item, index}) => (
          <>
          { platsForMenu.length < 0 ? (
            <View style={{ justifyContent: 'center', alignItems: 'center'}}>
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
          ) : (
            <TouchableOpacity
              key={item.id}
               onPress={() => {
               }}
              >
              <HorizontalCourses
                course={item}
                containerStyle={{
                  marginVertical: SIZES.padding,
                  marginTop: index === platsForMenu.length - 1 ? SIZES.padding : -10
                }}
                onPress={() => {
                  navigation.navigate("DetailsPlats", {
                    plats: item,
                    restaurant: restaurant
                  })}}
                 />
            </TouchableOpacity>
            
          )}
            
          </>
        )}
        // ItemSeparatorComponent={() => (
        //   <LineDivider
        //      lineStyle={{
        //       backgroundColor: COLORS.gray10,
        //       marginTop: -25
        //      }}

        //   />
        // )}
      />
      );
    }

  function renderModal() {
    return(
      <Animated.View
      style={{
        position: "absolute",
        bottom: 0,
        height: SIZES.height,
        width: COLORS.width
      }}
    >
    {/* bacground */}
    <Animated.View
     style={{
      flex: 1,
      height: SIZES.height,
      width: COLORS.width,
      backgroundColor: COLORS.transparentBlack7
    }}
    >



    {/* content container */}
    <Animated.View
     style={{
      position: "absolute",
      bottom: 0,
      height: SIZES.height * 0.9,
      width: COLORS.width,
      borderBottomLeftRadius: 30,
      borderBottomRightRadius: 30,
      backgroundColor: COLORS.white
     }}
    >

    </Animated.View>
    </Animated.View>
  </Animated.View>
    )
  }

    return (
      <View
        style={{
          flex: 1,
          backgroundColor: COLORS.white,
        }}
      >
        {/* header */}
        {renderHeader({item})}

        {/* Menus */}
        {renderMenu()}

        {/* result */}
       {renderResult({item})}

       {/* filter modal */}
         <FilterModal
         filterModalSharedValue1={filterModalSharedValue1}
         filterModalSharedValue2={filterModalSharedValue2}
         />

         {/* {renderModal()}  */}

     </View>
    );
  };
  RestaurantDetail.sharedElements = (route, otherRoute, showing) => {
    if (otherRoute.name === "MainLayout") {
      const { restaurant } = route.params;
      return [
        {
          id: `restaurant-${restaurant.id}`,
        },
      ];
    }
  };

  const styles = StyleSheet.create({
    container: {
      position: 'aboluste',
      flexDirection: "row-reverse",
      width: 40,
      height: 40,
      top: -2,
      alignItems: 'center',
      //justifyContent: "center",
      borderRadius: 10,
      backgroundColor: COLORS.primary,
      marginTop: 8
      
    },
    mainbox: {
      position: 'relative',
      width: 180,
      height: 38,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: "flex-start",
      borderRadius: 160,
      backgroundColor: "#d7d7d79c",
      transitionDuration: 0.3,
      marginRight: 6
    },
    search_input: {
      height: '100%',
      backgroundColor: 'transparent',
      borderBottomWidth: 1,
      borderBottomColor: "transparent",
      paddingLeft: 10,
      fontSize: 16,
      color: COLORS.black,
      fontFamily: 'System',
    },

  });

export default RestaurantDetail;
