import { View, Text, SafeAreaView, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import Icon from 'react-native-vector-icons/Feather'
import { COLORS } from '../constants'

export default function ChoixCommde() {
    
    const delivery = [
        {price: "1200", label: " payer maintenant", description: "vous serez rediriger vers la page de paiment OM et MOMO"},
        {price: "00.0", label: " payer a la Livraison", description: "Vous preferez payer tous les frais sur place directement au livreur"}
    ]
const [selected, setSelected] = useState(delivery[0]);

  return (
     <SafeAreaView style={{flex: 1, backgroundColor: "#f4eff3"}}>
         <View style={styles.container}>
            <View style={styles.header}>
            <TouchableOpacity style={styles.headerAction} >
                <Icon name='arrow-left' color={COLORS.primary} size={24}/>
            </TouchableOpacity>
            <Text style={styles.title}>Choix de Livraison</Text>
            <Text style={styles.subtitle }>Choisisez si vous souhaitew payer depuis la plate forme ou pluto payer a la livraison</Text>
            </View>
       
            <View style={styles.font }>
                <View>
                    {delivery.map((item, index) => {
                        const isActive = item.price === selected.price
                    return(
                        <TouchableOpacity key={index} onPress={() => { 
                            setSelected(item)
                        }}>
                            <View style={[styles.radio, isActive && {borderColor: COLORS.primary, backgroundColor: "#ffda" }]}>
                                <Icon name={isActive ? "check-circle" : "circle"} color={isActive ? COLORS.primary : "#f81818"} size={24}/>

                                <View style={styles.radioBody}>
                                    <View>
                                        <Text style={styles.radioLabel}>{item.label}</Text>
                                        <Text style={styles.radioText}>{item.description}</Text>
                                    </View>
                                </View>
                                
                                <Text style={[styles.radioPrice, isActive && styles.radioPriceActive]}>{item.price} Frs</Text>
                            </View>
                        </TouchableOpacity>
                    )
                    })}
                </View>
                <View>
                <TouchableOpacity>
                    <View style={styles.btn}>
                        <Text style={styles.btnText}>Continuer </Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity>
                    <View style={styles.btnEnpty}>
                        <Text style={styles.btnEntyText }>Restaurer le choix </Text>
                    </View>
                </TouchableOpacity>
            </View>
            </View>
        </View>
     </SafeAreaView> 
  )
}

const styles = StyleSheet.create({
    container : {
        flex: 1,
        padding : 0
    },
    header: {
        paddingHorizontal: 24,
        marginBottom: 28,
        top: 11
    },
    headerAction: {
        width: 40,
        height: 40,
        backgroundColor: "#ffda",
        alignItems:"center",
        borderRadius:9999,
        alignItems:"center",
        justifyContent: "center",
        marginBottom: 16

    },
    title: {
        fontSize: 34,
        fontWeight: 'bold',
        color: "#181818",
        marginBottom: 12
    },
    subtitle: {
        fontSize: 15,
        fontWeight: "500",
        lineHeight: 20,
       // color "#889797"
    },
    font: {
        flex: 1,
        paddingBottom: 24,
        paddingHorizontal: 24,
        justifyContent: "space-between"
    },
    radio : {
        padding:16,
        flexDirection: "row",
        alignItems: "flex-start",
        justifyContent: "flex-start",
        borderWidth: 2,
        borderColor: "transparent",
        borderStyle: "solid",
        borderRadius: 24,
        marginBottom: 16,
        backgroundColor: "#fff"
    },
    radioBody : {
        flexDirection: "row",
        alignItems: "flex-start",
        justifyContent: "space-between",
        paddingLeft: 10,
        flex: 1 
    },
    radioPrice :{
        fontSize: 16,
        fontWeight: "600",
        color: "#1d1d1d"
    },
    radioLabel : {
        fontSize:18,
        fontWeight: "700",
        color: "#1d1d1d" 
    },
    radioText: {
         marginTop: 6,
         fontSize: 16,
         fontWeight: "500",
         color: "#889797"
    },
    radioPriceActive : {
        transform: [
            {
                scale: 1.2
            }
        ]
    },
    btn: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent:"center",
        borderRadius: 12,
        backgroundColor: COLORS.primary,
        borderColor: COLORS.primary,
        paddingHorizontal: 24,
        paddingVertical: 16
    },
    btnText: {
        fontSize: 19,
        lineHeight: 22,
        color :"#fff",
        fontWeight: "bold"
    },
    btnEnpty: {
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: "center",
        borderRadius: 12,
        paddingVertical: 16,
        paddingHorizontal: 24,
        backgroundColor: "transparent",
        borderColor: COLORS.primary,
        marginTop: 12
    },
    btnEntyText: {
        color: COLORS.primary,
        fontSize: 19,
        fontWeight: "bold",
        lineHeight: 22
    }

})