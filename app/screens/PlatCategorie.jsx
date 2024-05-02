import React, { useEffect, useId, useState } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  Image,
  RefreshControl,
} from 'react-native';
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
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import { IconsButton, IconLabel  } from '../components';
import { COLORS, FONTS, images, icons, SIZES} from '../constants';
import { SharedElement } from 'react-navigation-shared-element';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRepas } from '../redux/action/platsActions';

export default function PlatCategorie({navigation, route}) {
  const dispatch = useDispatch();
  const [refresh, setRefresh] = useState()
  const {category} = route.params;
  // const plats = useSelector(state => state.plat.repas)
  const platsData = useSelector((state) => state.plat.repas);
  useEffect(() => {
    dispatch(fetchRepas());
  }, [])
  const RefreshMe = () => {
    setRefresh(true)
    setTimeout(() => {
      dispatch(fetchRepas());
        setRefresh(false)
    }, 3000)
  }
  function BackHandler() {
    navigation.goBack();
  }
  function renderHeader() {

    return (
      <Animated.View
       style={{
        position: 'relative',
        top: 0,
        left: 0,
        right: 0,
        height: 110,
        overflow: 'hidden',
       }}
      >

          <SharedElement
          // id={`${sharedElementPrefix}-CategoryCard-Bg-${categorie?.id}`}
         style={[StyleSheet.absoluteFillObject]}
       >
         <Image
         source={{uri: `http://172.20.10.4:3000/images/${category.image}`}}
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
          //  id={`${sharedElementPrefix}-CategoryCard-title-${category?.id}`}
          style={[StyleSheet.absoluteFillObject]}
          >
            <Text
            style={{
              position: 'absolute',
              color: COLORS.primary,
              ...FONTS.h1,
              marginTop: 20
            }}
            >
              {category.name}
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
            top: 5,
            left: 20,
            width: 40,
            height: 40,
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
            width: 80,
            height:120,

           }}

          />

      </Animated.View>
    );
  }


  return (
    <SafeAreaView style={{ backgroundColor: '#fff' }}>
      <ScrollView 
      refreshControl={
        <RefreshControl 
          refreshing={refresh}
          onRefresh={() => RefreshMe()}
        />
      }
      contentContainerStyle={styles.container} >
          {/* header */}
          {renderHeader()}

        {platsData.map((plat, index) => {
    
          return (
            <View
              key={index}
              style={[
                styles.cardWrapper,
                index === 0 && { borderTopWidth: 0 },
              ]}>
              <TouchableOpacity
               onPress={() => {
                navigation.navigate("DetailsPlats", {
                  plats: plat,
                })}}
              >
                <View style={styles.card}>
                  <Image
                    alt=""
                    resizeMode="cover"
                    source={{uri: `http://172.20.10.4:3000/images/${plat.image}`}}
                    style={styles.cardImg}
                  />

                  <View style={styles.cardBody}>
                    <Text numberOfLines={1} style={styles.cardTitle}>
                      {plat.nom}
                    </Text>

                    <View style={styles.cardRow}>
                      <View style={styles.cardRowItem}>
                        {/* <FontAwesome color="#173153" name="map-marker-alt" size={13} /> */}
                        <Text style={styles.cardRowItemText}>
                          {plat.description}
                        </Text>
                      </View>

                      {/* <View style={styles.cardRowItem}>
                        <FontAwesome
                          color="#173153"
                          name="cart-arrow-down"
                          solid={true}
                          size={13}
                        />

                        <Text style={styles.cardRowItemText}>
                        
                         Quantité: 
                        </Text>
                      </View> */}
                    </View>

                    <View style={{flexDirection: "row"}}>
                      <Text style={styles.cardPrice}>
                      {plat.prix}.00Frs / 
                      </Text>
                      <View
                    style={{
                      flexDirection: 'row',
                      marginLeft: 12,
                      marginTop: -8
                    }}>
                            <IconLabel
                              icon={ icons.star }
                            containerStyle={{
                              marginTop: SIZES.base,
                              fontSize: 12
                          }}
                          />
                          <IconLabel
                              icon={ icons.star }
                            containerStyle={{
                              marginTop: SIZES.base,
                          }}
                          />
                          <IconLabel
                              icon={ icons.star }
                            containerStyle={{
                              marginTop: SIZES.base,
                          }}
                          />
                         
                          <IconLabel
                              icon={ icons.star }
                            containerStyle={{
                              marginTop: SIZES.base,
                          }}
                          />
                      {/* <FontAwesome color="#173153" name="ratting" size={13} /> */}
                      </View>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
           ); 
         })} 
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    // padding: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1d1d1d',
    marginBottom: 12,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'stretch',
  },
  cardWrapper: {
    paddingVertical: 10,
    marginHorizontal: 10,
    borderTopWidth: 2,
    borderColor: '#e6e7e8',
  },
  cardImg: {
    width: 88,
    height: 88,
    borderRadius: 12,
    marginRight: 16,
  },
  cardBody: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    paddingVertical: 4,
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  cardTitle: {
    fontSize: 17,
    lineHeight: 24,
    fontWeight: '700',
    color: '#222',
  },
  cardRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginHorizontal: -6,
  },
  cardRowItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 6,
  },
  cardRowItemText: {
    fontSize: 15,
    fontWeight: '500',
    color: '#173153',
    marginLeft: 4,
  },
  cardPrice: {
    fontSize: 19,
    fontWeight: '700',
    color: '#173153',
  },
  cardStatus: {
    marginLeft: 12
  },
});






   