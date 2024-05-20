import { View, Text, Dimensions, ScrollView, TouchableOpacity, Image } from 'react-native'
import React, { useEffect } from 'react'
import { SwiperFlatList } from 'react-native-swiper-flatlist';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSlides } from '../../redux/action/slideAction';
import { SlideFoods } from '../../components';
import { COLORS, SIZES, FONTS } from '../../constants';

const BannerWidth = Dimensions.get('window').width;
const {width} = Dimensions.get('screen');
export default function Slide() {
    const dispatch = useDispatch()
    const slide = useSelector((state) => state.slide.slides)
    const loadingSlide = useSelector((state) => state.slide.loading)

    useEffect(() => {
        dispatch(fetchSlides());
    },[])

  
        return (
          <>
         {slide.length > 0 ? (
          <SwiperFlatList
          autoplay
          autoplayDelay={4}
          autoplayLoop
          index={0}
          showPagination
          data={slide}
          useNativeDriver={true}
          renderItem={({ item, index }) => (
          <View key={index}>
            <SlideFoods
              containerStyle={{
                width: BannerWidth - 16,
                marginLeft: index === 14 ? 14 : 12,
                 marginRight: index === slide.length - 8 ? 8 : 1,
                  marginTop: 12,
              }}
              course={item}
            />
          </View>
)}
/>
         ) : (
          <>
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
           
         </> 
         )}
              
             
              </>
        );
      }

      const renderPlaceholders = () => {
        const placeholders = [];
        for (let i = 0; i < 5; i++) {
          placeholders.push(      
            <TouchableOpacity
            key={i}
            style={{
              width: 270,
              right: 2,
              // ...containerStyle,
              marginBottom: 20
            }}>
            <Image
              source={require('../../../assets/images/notFound.jpg')}
              resizeMode="cover"
              style={{
                height: 120,
                width: '100%',
                justifyContent: "center",
                alignItems: "center",
                marginBottom: SIZES.radius,
                borderRadius: SIZES.radius,
                width: "100%",
                marginLeft:  24 ? 14 : 12,
                 marginRight: 18 ? 18 : 1,
      
              }}
            />
            {/* detail section */}
            <View
            style={{
              flexDirection: 'row',
            }}>
            </View>
          </TouchableOpacity>
           
          );
        }
        return placeholders;
      };