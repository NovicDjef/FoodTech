import { View, Text, FlatList, ScrollView, TouchableOpacity, Image } from 'react-native'
import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import LottieView from 'lottie-react-native';
import { CategoriesPlats } from '../../components'
import { SIZES, COLORS } from '../../constants';
import Section from './Section';
import { useTranslation } from 'react-i18next';
import { fetchRepas } from '../../redux/action/platsActions';

export default function FastMenu() {

    const { t } = useTranslation()
    const dispatch = useDispatch()
    const plats = useSelector(state => state.plat.repas)
    const loadingPLats = useSelector(state => state.plat.loading)
  
    useEffect(() => {
        dispatch(fetchRepas());
    },[])

        return (
         
            <Section style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }} title={t("Fast_menu")}>
              { plats.length > 0 ? (
                <FlatList
              horizontal
              data={plats}
              // listKey="Courses"
              keyExtractor={item => `Courses-${item.id}`}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{
                marginTop: SIZES.padding,
                marginHorizontal: 2,
                
              }}
              renderItem={({item, index}) => (
                <CategoriesPlats
                  containerStyle={{
                    marginLeft: index === 0 ? SIZES.padding : SIZES.radius,
                    marginRight:
                      index === plats.length - 1
                        ? SIZES.padding
                        : 0,
                  }}
                  course={item}
                  loading={loadingPLats}
                />
              )}
            />
              ) : (
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
               )
              }
            </Section>
        )}
      

        const renderPlaceholders = () => {
          const placeholders = [];
                  for (let i = 0; i < 5; i++) {
                    placeholders.push(
                      <TouchableOpacity
                      key={i}
                          style={{
                            width: 170,
                            marginRight: -80, 
                          }} 
                          >
                          <Image
                          source={require("../../../assets/images/notFound.jpg")}
                            resizeMode="cover"
                            style={{
                              width: '50%',
                              height: 85,
                              borderRadius: 100,
                              borderWidth: 1,
                              borderColor: COLORS.primary,
                              backgroundColor: COLORS.gray20
                            }}
                          />
                          <Text style={{
                            fontSize: 16,
                            fontWeight: "bold",
                            marginHorizontal: 12,
                            backgroundColor: COLORS.gray20,
                            marginTop: 6
                    
                          }}>
                          </Text>
                        </TouchableOpacity>
                     
                    );
                  }
                  return placeholders;
                }
        