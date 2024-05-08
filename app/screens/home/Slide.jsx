import { View, Text, Dimensions, ActivityIndicator } from 'react-native'
import React, { useEffect } from 'react'
import { SwiperFlatList } from 'react-native-swiper-flatlist';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSlides } from '../../redux/action/slideAction';
import { SlideFoods } from '../../components';
import { COLORS } from '../../constants';

const BannerWidth = Dimensions.get('window').width;
const {width} = Dimensions.get('screen');
export default function Slide() {
    const dispatch = useDispatch()
    const slide = useSelector((state) => state.slide.slides)
    const loadingSlide = useSelector((state) => state.slide.loading)

    useEffect(() => {
        dispatch(fetchSlides());
    },[])

    const renderLoader = () => {
        return(
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size="large" color={COLORS.primary} />
            <Text style={{ fontSize: 17 }}>Chargement</Text>
          </View>
        )
      }
        return (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
           {loadingSlide ? (
            <>
              {renderLoader()}
            </>
          ) : (
           <>
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
                      width: BannerWidth - 30,
                      marginLeft: index === 20 ? 12 : 6, 
                      marginRight: index === slide.length - 1 ? 2 : 0,
                        marginTop: 12
                    }}
                    course={item}
                  />
                </View>
      )}
    />
              {/* {slide.map((item, index) => (
                
              ))}
            </Carousel> */}
           </>
            
           )} 
        </View>
         
        );
      }