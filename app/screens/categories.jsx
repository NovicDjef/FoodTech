import React, {useEffect, useRef, useState} from 'react'
import { useNavigation } from '@react-navigation/native';
import {View, Text, Image, FlatList, RefreshControl, ScrollView} from 'react-native';

import {TextButton, CategoriesCard} from '../components';
import {COLORS, FONTS, SIZES, icons, dummyData} from '../constants';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories } from '../redux/action/categorieAction';
import { fetchVilles } from '../redux/action/villesAction';

const Categories = () => {
  const navigation = useNavigation();
  const [refresh, setRefresh] = useState(false)
  const dispatch = useDispatch()
  const scrollViewRef = useRef();
  const categories = useSelector(state => state.categorie.categories)

   useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchVilles())
   },[])
   const RefreshMe = () => {
    setRefresh(true)
    setTimeout(() => {
      dispatch(fetchCategories());
        setRefresh(false)
    }, 3000)
  }
  function renderTopSearches() {
    return (
      <View
        style={{
          marginTop: SIZES.padding,
        }}>
        <Text
          style={{
            marginHorizontal: SIZES.padding,
            ...FONTS.h2,
          }}>
          Top Search
        </Text>
        <FlatList
          horizontal
          data={categories}
          // listKey="TopSearcher"
          keyExtractor={item => `TopSearches-${item.id}`}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            marginTop: SIZES.radius,
          }}
          renderItem={({item, index}) =>(
            <TextButton
               label={item.name}
               contentContainerStyle={{
                paddingVertical: SIZES.radius,
                paddingHorizontal: SIZES.padding,
                marginLeft: index === 0 ? SIZES.
                padding : SIZES.radius,
                marginRight: index ===  dummyData.
                top_searches.length - 1 ? SIZES.
                padding : 0,
                borderRadius: SIZES.radius,
                backgroundColor: COLORS.primary,
               }}
               labelStyle={{
                color: COLORS.white,
                ...FONTS.h3,
               }}
            />
          )}
        />
      </View>
    );

 }

    function renderBrowCategorie() {
        return (
           <View
             style={{
                flex: 1,
                marginTop: SIZES.padding,
                
             }}
           >
            <Text
              style={{
                marginHorizontal: SIZES.padding,
                ...FONTS.h2,
              }}
             >
                Toutes les Categories
             </Text>
            <FlatList
               data={categories}
               numColumns={2}
               scrollEnabled={false}
               listKey="BrowserCategorie"
               keyExtractor={item => `BrowserCategories-${item.id}`}
               contentContainerStyle={{
                marginTop: SIZES.radius,
               }}
                renderItem={({item, index}) => (
                    <CategoriesCard
                       category={item}
                       
                       containerStyle={{
                        height: 130,
                        width: (SIZES.width - (SIZES.padding * 2) - SIZES.radius) / 2,
                        marginTop: SIZES.radius,
                        marginLeft: (index + 1) % 2 === 0
                        ? SIZES.radius : SIZES.padding,
                       }}
                       onPress={() => navigation.navigate
                        ("PlatCategorie", { category: item})}
                    />
                )}
            />
            
           </View>
        );
    }


  return (
    <View
      style={{
        backgroundColor: COLORS.white,
      }}>
      <ScrollView
       refreshControl={
        <RefreshControl 
          refreshing={refresh}
          onRefresh={() => RefreshMe()}
        />
      }
        ref={scrollViewRef}
        contentContainerStyle={{
          // paddingBottom: 300,
        }}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
        keyboardDismissMode="on-drag"
        //onScroll={onScroll}
       
      >
        {/* rechercher */}
        {renderTopSearches()}

        {/* toutes la categories */}
        {renderBrowCategorie()}

      </ScrollView>
       {/* searchbar */}

    </View>

  )
}

export default Categories