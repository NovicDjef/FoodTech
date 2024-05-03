import { View, Text, Dimensions, ProgressBarAndroid, ActivityIndicator } from 'react-native'
import React, { useEffect } from 'react'
import Carousel from 'react-native-banner-carousel';
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
              {slide.map((item, index) => (
                <View key={index}>
                  <SlideFoods
                    containerStyle={{
                      width: BannerWidth - 26,
                      marginLeft: index === 0 ? 2 : 0, 
                      marginRight: index === slide.length - 1 ? 22 : 0,
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