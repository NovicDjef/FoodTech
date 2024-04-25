import { View, Text, StatusBar, Image, TouchableOpacity, TextInput, Animated } from 'react-native'
import React, { useEffect, useState } from 'react'
import Ionic from "react-native-vector-icons/Ionicons"
import Feather from "react-native-vector-icons/Feather"


export default function Status({route, navigation}) {
    const {name} = route.params;
    const {image} = route.params;

    useEffect(() => {
        let timer = setTimeout(() => {
            navigation.goBack()
        }, 5000)
        Animated.timing(progress, {
            toValue: 5,
            duration: 5000,
            useNativeDriver: false,
        }).start();
        return () => clearTimeout(timer)
    }, [])

    const [progress, setProgress] = useState(new Animated.Value(0));
    const ProgressAnmation = progress.interpolate ({
        inputRange: [0, 5],
        outputRange: ["0%", "100%"]
    })
 
   
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
                <Image source={{uri: image}}
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
                {name}
            </Text>
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <Ionic 
                    name="close" 
                    style={{fontSize: 20, color: "white", opacity: 0.6 }} />
            </TouchableOpacity>
        </View>
       </View>

      </View>
      <Image source={{uri: `http://172.20.10.4:3000/images/${image}`}} style={{
        position: "absolute",
        width: "100%",
        height: 450
      }} />
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
        <TextInput 
            placeholder='Commandez maintenant...'
            placeholderTextColor="white"
            style={{
                borderColor: "white",
                borderRadius: 25,
                width: "70%",
                height: 40,
                paddingLeft: 20,
                borderWidth: 1,
                fontSize: 20,
                color: "white",
            }}
            />
            <View style={{flexDirection: "row"}}>
            <TouchableOpacity style={{left: -12}} onPress={() => {}}>
                <Feather name="heart" style={{
                    fontSize: 26, 
                    color: "white"
                }} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <Feather name="send" style={{
                    fontSize: 26, 
                    color: "white"
                }} />
            </TouchableOpacity>
            </View>
      </View>
    </View>
  )
}