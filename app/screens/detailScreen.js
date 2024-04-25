/* eslint-disable prettier/prettier */

  import { View, Text, Image, StyleSheet, FlatList, TouchableOpacity, TextInput } from 'react-native';
  import React, { useRef, useEffect, useState } from 'react';
  import
     Animated, {
    withTiming,
    withDelay,
    useSharedValue,
    useAnimatedStyle,
    //runOnJS,
    useAnimatedScrollHandler,
    interpolate,
    // Extrapolate,
  } from 'react-native-reanimated';
  import { fetchRepas } from '../redux/action/platsActions';
  import { useSelector, useDispatch } from 'react-redux';
  import { IconsButton, HorizontalCourses, LineDivider, FilterModal } from '../components';
  import { COLORS, FONTS, SIZES, images, icons, dummyData, data } from '../constants';
  import { SharedElement } from 'react-navigation-shared-element';
  import Icon from "react-native-vector-icons/FontAwesome"


  const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

  const HEADER_HEIGHT = 250;

  const RestaurantDetail = ({navigation, item, sharedElementPrefix, category, route }) => {
    const { restaurant } = route.params;
    
    const dispatch = useDispatch();
    const platsData = useSelector((state) => state.plat.repas);
    useEffect(() => {
      dispatch(fetchRepas());
    }, []);

    // Fonction pour filtrer les plats en fonction de l'identifiant du restaurant
  const getPlatsForRestaurant = (restaurantId) => {
    return platsData.filter(plat => plat.restaurantId === restaurantId);
  };

  // Récupérez les plats pour le restaurant spécifique
  const platsForRestaurant = getPlatsForRestaurant(restaurant.id);

  const headerShareValue = useSharedValue(80);
  const filterModalSharedValue1 = useSharedValue(SIZES.height);
  const filterModalSharedValue2 = useSharedValue(SIZES.height);


    function BackHandler() {
      navigation.goBack();
    }

  const flatListRef = useRef();
  const scrollY = useSharedValue(0);
  const onScroll = useAnimatedScrollHandler((event) => {
    scrollY.value = event.contentOffset.y;
  });


    function renderHeader({item,}) {

      // headerSharedValue.value = withDelay(500,
      //   withTiming(0, {
      //     duration: 500
      //   }))

        const headerFadeAnimatedStyle = useAnimatedStyle(() =>{
          return {
            opacity: interpolate(headerShareValue.value,
              [80, 0], [0, 1])
          }
        })


      // const headerTranslateAnimatedStyle = useAnimatedStyle(
      //   () => {
      //     return {
      //       transform: [
      //        {
      //         translateY: headerSharedValue.value
      //        }
      //       ]
      //     }
      //   }
      // )

      
      return (
        <Animated.View
         style={{
          position: 'relative',
          top: 0,
          left: 0,
          right: 0,
          height: 250,
          overflow: 'hidden',
         }}
        >

            <SharedElement
            id={`${sharedElementPrefix}-CategoryCard-Bg-${restaurant?.id}`}
           style={[StyleSheet.absoluteFillObject]}
         >
           <Image
           source={{uri: `http://172.20.10.4:3000/images/${restaurant.image}`}}
            resizeMode="cover"
             style={{
               height: '100%',
               width: '100%',
               borderBottomLeftRadius: 60,
             }}
           />

         </SharedElement>

          {/* titre */}
          <Animated.View
          style={{
            position: 'absolute',
            bottom: 70,
            left: 30,
          }}
          >
            <SharedElement
             id={`${sharedElementPrefix}-CategoryCard-title-${category?.id}`}
            style={[StyleSheet.absoluteFillObject]}
            >
              <Text
              style={{
                position: 'absolute',
                color: COLORS.primary,
                ...FONTS.h1,
              }}
              >
                {restaurant.nom}
              </Text>
            </SharedElement>
          </Animated.View>

  {/* back button */}

        <Animated.View
          //style={headerFadeAnimatedStyle}
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
           onPress={() =>{BackHandler();}}

           />
          </Animated.View>

           {/* category image component */}

           <Animated.Image
             source={images.mobile_image}
             resizeMode="contain"
             style={{
              position: 'absolute',
              right: 40,
              bottom: -40,
              width: 100,
              height:200,

             }}

            />

        </Animated.View>
      );
    }

    function renderResult({item}) {
      const [searchVisible, setSearchVisible] = useState(false);

  const toggleSearch = () => {
    setSearchVisible(!searchVisible);
  };
  const [searchQuery, setSearchQuery] = useState("")
  const filteredPlats = platsForRestaurant.filter(plat => {
    // Filtrer les agences par nom, prix et lieu
    const lowerCaseQuery = searchQuery.toLowerCase();
      return  plat.nom.toLowerCase().includes(lowerCaseQuery) ||  // Filtrer par nom
            //plat.prix.some(price => price.toString().includes(lowerCaseQuery)) ||  // Filtrer par prix
             plat.description.toLowerCase().includes(lowerCaseQuery)   // Filtrer par lieu
});
const resetSearch = () => {
  setSearchVisible(!searchVisible);
};
      return (
        <AnimatedFlatList
        ref={flatListRef}
        data={filteredPlats}
        keyExtractor={item => `Results-${item.id}`}
        contentContainerStyle={{
          paddingHorizontal: SIZES.padding,
          marginTop: -250,
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
              marginBottom: SIZES.base,
            }}

          >
            {/* result */}
            <Text
              style={{
                flex: 1,
                ...FONTS.body3,
              }}
            >
              853 Resultats

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
        renderItem={({item, index}) => (
          <>
            <TouchableOpacity
              key={item.id}
               onPress={() => {
               }}
              >
              <HorizontalCourses
                course={item}
                containerStyle={{
                  marginVertical: SIZES.padding,
                  marginTop: index == platsData.length - 1 ? SIZES.padding : 0
                }}
                onPress={() => {
                  navigation.navigate("DetailsPlats", {
                    plats: item,
                  })}}
                 />
            </TouchableOpacity>
          </>
        )}
        ItemSeparatorComponent={() => (
          <LineDivider
             lineStyle={{
              backgroundColor: COLORS.gray20,
             }}

          />
        )}
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


  const styles = StyleSheet.create({
    container: {
      position: 'relative',
      flexDirection: "row-reverse",
      width: 40,
      height: 40,
      alignItems: 'center',
      //justifyContent: "center",
      borderRadius: 10,
      backgroundColor: COLORS.primary,      
      
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
