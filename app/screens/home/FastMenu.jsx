import { View, Text, FlatList, ActivityIndicator } from 'react-native'
import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import LottieView from 'lottie-react-native';
import { CategoriesPlats } from '../../components'
import { fetchCategories } from '../../redux/action/categorieAction';
import { SIZES, COLORS } from '../../constants';
import Section from './Section';
import { useTranslation } from 'react-i18next';

export default function FastMenu() {

    const { t } = useTranslation()
    const dispatch = useDispatch()
    const categories = useSelector(state => state.categorie.categories)
    const loadingCategories = useSelector(state => state.categorie.loading)

    useEffect(() => {
        dispatch(fetchCategories());
    },[])

    const renderLoader = () => {
        return(
          <View style={{flex: 1, justifyContent: 'center', alignItems: 'center',}}>
                    {Platform.OS === 'android'
                        ?
                        (
                            <>
                                <ActivityIndicator size="large" color={COLORS.primary}/>
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
                      index === categories.length - 1
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
                  source={require('../../../assets/json/noData.json')}
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