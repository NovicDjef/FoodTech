
  import React, { useEffect, useId, useState } from 'react';
  import {
    StyleSheet,
    SafeAreaView,
    ScrollView,
    Text,
    View,
    TouchableOpacity,
    Image,
    RefreshControl,
  } from 'react-native';
  import FontAwesome from 'react-native-vector-icons/FontAwesome5';
  import { useSelector, useDispatch } from 'react-redux';
  import { fetchcommandes, getAllCommande } from '../../redux/action/commandeActions';
  import { fetchRepas } from '../../redux/action/platsActions';
  import { COLORS } from '../../constants';
  import { fetchLivraisons } from '../../redux/action/livraisonAction';
  
  export default function Historique() {
    const dispatch = useDispatch();
    const [refresh, setRefresh] = useState()
    const commandes = useSelector(state => state.commande.commandes)
    const plats = useSelector(state => state.plat.repas)
    const livraisons = useSelector((state) => state.livraison.livraison)
    useEffect(() => {
      dispatch(fetchcommandes())
      dispatch(fetchRepas())
      dispatch(fetchLivraisons())
    }, [])
    const RefreshMe = () => {
      setRefresh(true)
      setTimeout(() => {
          setRefresh(false)
      }, 3000)
    }
  
    return (
      <SafeAreaView style={{ backgroundColor: '#fff' }}>
        <ScrollView 
        refreshControl={
          <RefreshControl 
            refreshing={refresh}
            onRefresh={() => RefreshMe()}
          />
        }
        contentContainerStyle={styles.container}>
          <Text style={styles.title}>Historiques Commandes</Text>
  
          {commandes.map((commande, index) => {
            const plat = plats.find(plat => plat.id === commande.platsId); 
            const nomPlat = plat ? plat.nom : 'nom plat inconnu'; 
            const imagePlat = plat ? plat.image : 'Image inconnu'; 
            const livraison = livraisons.find(livraison => livraison.id === commande.livraisonId); 
            const livraisonplat = livraison ? livraison.statut : 'livraison inconnu'; 
            const prixplat = plat ? plat.prix : 'prix inconnu'; 
            // const prixTotalplat = plat ? plat.prix * commande.quantity: 'prix inconnu'; 
            return (
              <View
                key={index}
                style={[
                  styles.cardWrapper,
                  index === 0 && { borderTopWidth: 0 },
                ]}>
                <TouchableOpacity
                  onPress={() => {
                    // handle onPress
                  }}>
                  <View style={styles.card}>
                    <Image
                      alt=""
                      resizeMode="cover"
                      source={{uri: `http://172.20.10.4:3000/images/${imagePlat}`}}
                      style={styles.cardImg}
                    />
  
                    <View style={styles.cardBody}>
                      <Text numberOfLines={1} style={styles.cardTitle}>
                        {nomPlat}
                      </Text>
  
                      <View style={styles.cardRow}>
                        <View style={styles.cardRowItem}>
                          <FontAwesome color="#173153" name="map-marker-alt" size={13} />
  
                          <Text style={styles.cardRowItemText}>
                            {livraisonplat} 
                          </Text>
                        </View>
  
                        <View style={styles.cardRowItem}>
                          <FontAwesome
                            color="#173153"
                            name="cart-arrow-down"
                            solid={true}
                            size={13}
                          />
  
                          <Text style={styles.cardRowItemText}>
                          {/* {commande.quantity.toLocaleString('en-US')} sqft */}
                           Quantité: {commande.quantity}
                          </Text>
                        </View>
                      </View>
  
                      <View style={{flexDirection: "row"}}>
                        <Text style={styles.cardPrice}>
                        Unité: {prixplat}.00Frs / 
                        </Text>
                        <Text style={styles.cardStatus}>
                          Accepté 
                        </Text>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              </View>
            );
          })}
        </ScrollView>
      </SafeAreaView>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      padding: 24,
    },
    title: {
      fontSize: 28,
      fontWeight: '700',
      color: '#1d1d1d',
      marginBottom: 12,
    },
    card: {
      flexDirection: 'row',
      alignItems: 'stretch',
    },
    cardWrapper: {
      paddingVertical: 16,
      borderTopWidth: 2,
      borderColor: '#e6e7e8',
    },
    cardImg: {
      width: 88,
      height: 88,
      borderRadius: 12,
      marginRight: 16,
    },
    cardBody: {
      flexGrow: 1,
      flexShrink: 1,
      flexBasis: 0,
      paddingVertical: 4,
      alignItems: 'flex-start',
      justifyContent: 'space-between',
    },
    cardTitle: {
      fontSize: 17,
      lineHeight: 24,
      fontWeight: '700',
      color: '#222',
    },
    cardRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-start',
      marginHorizontal: -6,
    },
    cardRowItem: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 6,
    },
    cardRowItemText: {
      fontSize: 15,
      fontWeight: '500',
      color: '#173153',
      marginLeft: 4,
    },
    cardPrice: {
      fontSize: 19,
      fontWeight: '700',
      color: '#173153',
    },
    cardStatus: {
      fontSize: 15,
      fontWeight: '700',
      color: '#fff',
      backgroundColor: COLORS.primary,
      padding: 4,
      borderRadius: 8,
      marginLeft: 12
    },
  });