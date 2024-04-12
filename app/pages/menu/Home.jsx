import React, { useEffect } from 'react';
import {
  Dimensions,
  FlatList,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  ActivityIndicator
} from 'react-native';
 import Icon from 'react-native-vector-icons/MaterialIcons';
//import Icon from "react-native-vector-icons/FontAwesome5";
import COLORS from '../../consts/colors';

const {width} = Dimensions.get('screen');
const cardWidth = width / 1.8;
// import LottieView from 'lottie-react-native';

import AutreJeu from '../../components/jeux/AutreJeux';

import Wallet from '../Wallet';
import Carousele from '../../components/carousele';
import { fetchCategory } from '../../redux/action/dataActions';
import { useDispatch, useSelector } from 'react-redux';
import { loadUserDataFromStorage } from '../../redux/action/authActions';


const Home = () => {
  const dispatch = useDispatch();
  const username = useSelector(state => state.authReducer.username);
  const data = useSelector(state => state.categoryReducer.data);
  const isLoading = useSelector(state => state.categoryReducer.isLoading);
  const error = useSelector(state => state.categoryReducer.error);
  useEffect(() => {
    dispatch(loadUserDataFromStorage())
  dispatch(fetchCategory())
  }, [dispatch]);

  if (isLoading) {
    
    return (
      <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
        <Text style={{ justifyContent: 'center', alignItems: 'center',}}>Loading...</Text>
      <ActivityIndicator size="large" color="red"/>
    </View>
    )
    
  }

  if (error) {
    console.log(error)
    return (<Text>Error: {error}</Text>);
    // return(
    //   <View style={{flex: 1}}>
    //   <View style={{justifyContent: "center", alignItems: 'center',}}>
    //       <LottieView
    //           style={style.lottie}
    //           source={require("../../assets/json/loadingRestau.json")}
    //           autoPlay
    //           loop
    //       />
    //   </View>
    //<Text>Error: {error}</Text>
    //      </View>
    // )
  } 

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: COLORS.white}}>
      <View style={style.header}>
        <View style={{ flexDirection: 'row', }}>
          <Text style={{fontSize: 30, fontWeight: 'bold', }}>
            Ca 
          </Text>
          <Text
              style={{fontSize: 30, fontWeight: 'bold', marginLeft: 8, color: COLORS.primary}}>
              Gag
            </Text>  
            <Text style={{fontSize: 30, fontWeight: 'bold', }}>
            ne   
          </Text>
        </View>
       <View style={{flexDirection: 'row', }}>
        <Text style={{marginTop: 6, fontSize: 20, color: COLORS.green2}}>@{username}</Text>
       {/* <Icon name="person-outline" size={38} style={{marginTop : 6}}  color={COLORS.grey} /> */}
       </View>
      </View>
      <Wallet />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Carousele  />
      {data ? ( data.map((item) => (
      <React.Fragment key={item.id}><View
          key={item.id}
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginHorizontal: 20,
          }}>
          <Text style={{ fontWeight: 'bold', color: COLORS.grey }}>
            {item.name}
          </Text>
          <Text style={{ color: COLORS.grey }}>Tous voir</Text>
        </View>
        <FlatList
            data={item.lots}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              paddingLeft: 20,
              marginTop: 20,
              paddingBottom: 30,
            }}
            renderItem={({item}) => 
            <AutreJeu 
              lot={item}
             />
          } />
          </React.Fragment>
    
))) :  (
      <View>
        <Text>ERREUR</Text>
      </View>
    )}  

      </ScrollView>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  lottie: {
    width: 148,
    height: 148
},
  header: {
    marginTop: -4,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  searchInputContainer: {
    height: 50,
    backgroundColor: COLORS.light,
    marginTop: -20,
    marginLeft: 20,
    borderTopLeftRadius: 30,
    borderBottomLeftRadius: 30,
    flexDirection: 'row',
    alignItems: 'center',
  },
  categoryListContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    marginTop: 30,
  },
  categoryListText: {
    fontSize: 17,
    fontWeight: 'bold',
  },
  card: {
    height: 220,
    width: cardWidth,
    elevation: 15,
    marginRight: 20,
    borderRadius: 15,
    backgroundColor: COLORS.white,
  },
  cardImage: {
    height: 150,
    width: '100%',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  priceTag: {
    height: 40,
    width: 85,
    backgroundColor: COLORS.primary,
    position: 'absolute',
    zIndex: 1,
    right: 0,
    borderTopRightRadius: 15,
    borderBottomLeftRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardDetails: {
    height: 90,
    borderRadius: 15,
    backgroundColor: COLORS.white,
    position: 'absolute',
    bottom: 0,
    padding: 20,
    width: '100%',
  },
  cardOverLay: {
    height: 280,
    backgroundColor: COLORS.white,
    position: 'absolute',
    zIndex: 100,
    width: cardWidth,
    borderRadius: 15,
  },
  topHotelCard: {
    height: 120,
    width: 120,
    backgroundColor: COLORS.white,
    elevation: 15,
    marginHorizontal: 10,
    borderRadius: 10,
  },
  topHotelCardImage: {
    height: 80,
    width: '100%',
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
  },
});


export const FontWeight = {
  thin: "100",
  ultraLight: "200",
  light: "300",
  regular: "400",
  medium: "500",
  semibold: "600",
  bold: "700",
  heavy: "800",
  black: "900"
};
export const Typography = StyleSheet.create({
  header: {
       fontSize: 34,
       fontWeight: FontWeight.regular
  },
  title1: {
       fontSize: 28,
       fontWeight: FontWeight.regular
  },
  title2: {
       fontSize: 22,
       fontWeight: FontWeight.regular
  },
  title3: {
       fontSize: 20,
       fontWeight: FontWeight.regular
  },
  headline: {
       fontSize: 17,
       fontWeight: FontWeight.regular
  },
  body1: {
       fontSize: 17,
       fontWeight: FontWeight.regular
  },
  body2: {
       fontSize: 14,
       fontWeight: FontWeight.regular
  },
  callout: {
       fontSize: 17,
       fontWeight: FontWeight.regular
  },
  subhead: {
       fontSize: 15,
       fontWeight: FontWeight.regular
  },
  footnote: {
       fontSize: 13,
       fontWeight: FontWeight.regular
  },
  caption1: {
       fontSize: 12,
       fontWeight: FontWeight.regular
  },
  caption2: {
       fontSize: 11,
       fontWeight: FontWeight.regular
  },
  overline: {
       fontSize: 10,
       fontWeight: FontWeight.regular
  }
});

export default Home
