import { View, Text, StatusBar, Image, Dimensions, TouchableOpacity, StyleSheet, Animated, Share } from 'react-native'
import React, { useEffect, useState } from 'react'
import Ionic from "react-native-vector-icons/Ionicons"
import Feather from "react-native-vector-icons/Feather"
import { COLORS } from '../constants';
import AntDesign from "react-native-vector-icons/AntDesign"
import { addToCart } from '../redux/action/cartActions';
import { useDispatch, useSelector } from 'react-redux';
import { ajoutFavoris, suppressionFavoris } from '../redux/reducer/favorisReducer';
import { sauvegarderFavorisLocalement } from '../redux/action/favorisActions';

export default function Status({route, navigation, repas}) {
    const {item} = route.params;
    const dispatch = useDispatch()
    const [count, setCount] = useState(0)
    const cart = useSelector(state => state.cart)
    const plats = useSelector(state => state.plat.repas)

    const windowWidth = Dimensions.get("window").width
    const windowHeight = Dimensions.get("window").height
    const [like, setLike] = useState(true)
    const [isPaused, setIsPaused] = useState(false);
    useEffect(() => {
      if(!isPaused) {
        let timer = setTimeout(() => {
            navigation.goBack()
        }, 5000)
       
          Animated.timing(progress, {
            toValue: 5,
            duration: 10000,
            useNativeDriver: false,
            
        }).start();
      }
       return () => {
            clearTimeout(timer);
            Animated.timing(progress).stop();
        };
        
    }, [isPaused])
    // const trisPlas = plats.map(item)
    const [progress, setProgress] = useState(new Animated.Value(0));
    const ProgressAnmation = progress.interpolate ({
        inputRange: [0, 5],
        outputRange: ["0%", "100%"]
    })


    const togglePause = () => {
      setIsPaused(!isPaused);
  };

  const handleAddToCart = () => {
  const platSelectionne = plats.find(plat => plat.id === item.id);

  if (!platSelectionne) {
    console.error("Plat non trouvé");
    return;
  }
  const isProductInCart = cart.items.some(item => item.id === platSelectionne.id);
  if (isProductInCart) {
    return;
  }

  dispatch(addToCart(platSelectionne));
  setCount(count + 1);
};


  const handleAddToCommande = () => { 
    navigation.navigate('panier')
}


  // const toggleFavori = (repas) => {
  //   if (like) {
  //     dispatch(suppressionFavoris(repas));
  //   } else {
  //     dispatch(ajoutFavoris(repas));
  //     dispatch(sauvegarderFavorisLocalement(repas));
  //   }
  // };
    const handleShare = async () => {
      try {
        await Share.share({
          message : "Voici le message à partagerv DU lien vers l'apllication mobile"
        });
      } catch (error) {
        console.error(error.message);
      }
    };
  return (
    <View style={{
        backgroundColor: "black", 
        height: "100%",
        position: "relative",
        justifyContent: "center",
        alignItems: "center"
        }}>
      <StatusBar backgroundColor="black" barStyle="light-content"/>
      <View style={{
        height: 3,
        width: "95%",
        borderWidth: 1,
        backgroundColor: "gray",
        position: "absolute",
        top: 18
      }}>
        <Animated.View style={{
            height: "100%",
            backgroundColor: "white",
            width: ProgressAnmation
        }}>

        </Animated.View>
       <View style={{
        padding: 15,
        flexDirection: "row",
        alignItems: "center",
        position: "absolute",
        top: 12,
        left: 0,
        width: "90%"
       }}>
            <View style={{
                borderRadius: 100,
                width: 30,
                height: 30,
                justifyContent: "center",
                alignItems: "center"
            }}>
                <Image source={{uri: `http://172.20.10.4:3000/images/${item.image}`}}
                    style={{
                        borderRadius: 100,
                        backgroundColor: "orange",
                        resizeMode: "cover",
                        width: "92%",
                        height: "92%"
                    }}/>
            </View>
            <View style={{
            justifyContent: "space-between",
            flexDirection: 'row',
            width: "100%"
        }}>
            <Text style={{color: "white", fontSize: 15, paddingLeft: 10}}>
                {item.name}
            </Text>
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <Ionic 
                    name="close" 
                    style={{fontSize: 20, color: "white", opacity: 0.6 }} />
            </TouchableOpacity>
        </View>
       </View>
      </View>
      <Image onPress={togglePause} source={{uri: `http://192.168.1.136:3000/images/${item.image}`}} style={{
        position: "absolute",
        width: "100%",
        height: 470
      }} />
        <View style={{
          //position: "absolute ",
          width: windowWidth,
          zIndex: 1,
          top: 160,
          padding: 10
        }}>
            <View style={{}}>
                <TouchableOpacity style={{width: 150,}}>
                  <View style={{width: 100, flexDirection: 'row', alignItems: "center"}}>
                    <View 
                        style={{
                          width: 32, 
                          height: 32, 
                          borderRadius: 100, 
                          backgroundColor: "white", 
                          margin: 10
                        }}>
                        <Image source={{uri: `http://192.168.1.136:3000/images/${item.image}`}} style={{
                          width: "100%",
                          height: "100%",
                          resizeMode: "cover",
                          borderRadius: 100,
                        }} />
                    </View>
                    <Text style={{color: "white", fontSize: 16}}> {item.name}</Text>
                  </View>
                </TouchableOpacity>
                <Text style={{color: "white", fontSize: 14, marginHorizontal: 10}} numberOfLines={4}>{item.description}</Text>
                <View style={{flexDirection: "row", padding: 10}}>
                  <Ionic name="wallet" style={{color: "white", fontSize: 16, top: 6, marginLeft: -8}} />
                  <Text style={{color: "white", fontSize: 24}}>{item.prix} Frs</Text>
                </View>
            </View>
        </View>
        <View style={{
          position: "absolute",
          top: 380,
          right: 0,
          alignItems: "center",
          flexDirection: 'column'
          }}>
            <TouchableOpacity 
            onPress={() => {setLike(!like)}}
            style={{padding: 10}}>
              <AntDesign 
              name={like ? "heart" : "hearto"} 
              style={{color: like ? 'red' : "white", fontSize: 25}}
            />
            </TouchableOpacity>
            
            <TouchableOpacity
            onPress={handleShare}
            style={{padding: 10}}>
              <Ionic 
              name="paper-plane-outline" 
              style={{color: "white", fontSize: 25}}
            />
            </TouchableOpacity> 
            {/*   */}
            {/* <View style={{
              width: 30, 
              height: 30,
              borderRadius:10,
              borderWidth: 2,
              borderColor: "white"}}>
              <Image source={item.postProfile} style={{width: "100%", height: "100%", borderRadius: 8, resizeMode: "cover"}}/>
            </View> */}
        </View>
      <View style={{
        position: "absolute",
        bottom: 0,
        left: 0,
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        marginVertical: 25,
        width: "100%"
      }}>
       
        <TouchableOpacity style={{
            backgroundColor: COLORS.primary,
            // marginHorizontal: 22,
            padding: 12,
            borderRadius: 12,
            flexDirection: "row"
            
        }}
        onPress={handleAddToCommande} 
        >
            <Text style={{color: COLORS.white, fontSize: 22}}>Commandez maintenant</Text> 
            <Ionic name="cart" style={{color: COLORS.white,  fontSize: 28, marginLeft: 12}} />
        </TouchableOpacity>
        <TouchableOpacity  onPress={handleAddToCart}>
          <Ionic name="cart" style={{color: COLORS.white,  fontSize: 28, marginLeft: 12}} />
        </TouchableOpacity>
        <View style={styles.countAdd}>
                    <Text style={{color: COLORS.white, fontSize: 18, fontWeight: "bold"}}>{count}</Text>
                </View>
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  
  countAdd: {
    backgroundColor: 'red',
    width: 20,
    height: 20,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: "center",
    top: -5,
    left: 100,
    position: "absolute"
  }
});