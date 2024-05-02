
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
  import { fetchcommandes } from '../../redux/action/commandeActions';
  import { COLORS } from '../../constants';
import { fetchRepas } from '../../redux/action/platsActions';
import { fetchRestaurants } from '../../redux/action/restaurantActions';
  
  export default function Historique() {
    const dispatch = useDispatch();
    const [refreshing, setRefreshing] = useState(false)
    const userId = useSelector((state) => state.auth.user.user.id)
    const commandes = useSelector(state => state.commande.commandes)
   const platsData = useSelector((state) => state.plat.repas);
    const restau = useSelector(state => state.restaurant.restaurants)
    
 
    const commandeUsers = commandes.flatMap(commande => 
      commande.filter(item => item.userId === userId)
    );
    
    const restauList = platsData.map(plat => {
      // Trouvez le restaurant correspondant à l'ID du plat
      const restaurant = restau.find(rest => rest.id === plat.restaurantId);
      // Renvoyez le nom du restaurant ou une chaîne vide s'il n'est pas trouvé
      return restaurant ? restaurant.nom : 'Nom de restaurant inconnu';
  });
  

    useEffect(() => {
      if (!commandeUsers.length) {
        fetchData();
       }
      dispatch(fetchRepas());
      dispatch(fetchRestaurants());
    }, []);

    const fetchData = () => {
      dispatch(fetchcommandes());
      
    };
    const onRefresh = () => {
      setRefreshing(true);
      setTimeout(() => setRefreshing(false), 3000);
    };
  
    return (
      <SafeAreaView style={{ backgroundColor: '#fff', flex: 1 }}>
        <ScrollView 
        refreshControl={
          <RefreshControl 
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
        contentContainerStyle={styles.container}>
          <Text style={styles.title}>Historiques Commandes</Text>

          {restauList.map((restaurant, index) => {
       //const restaurantPlats = platsData.filter((plat) => plat.restaurantId === restaurant.id);
      
           return(
            <View key={restaurant.id}>
            <Text style={{ fontSize: 20, fontWeight: 'bold', marginTop: 10 }}>
            {restauList[index]}
            </Text>  
          {platsData.map((plat, index) => {
              const commande = commandeUsers.find((cmd) => cmd.platsId === plat.id);
              const imageplat = plat.image ? plat.image : 'Image plat inconnu';
              const nomPlat = plat.nom ? plat.nom : 'nom plat inconnu';
              const prixplat = plat.prix ? plat.prix : 'nom plat inconnu';

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
                      source={{uri: `http://172.20.10.4:3000/images/${imageplat}`}}
                      style={styles.cardImg}
                    />
  
                    <View style={styles.cardBody}>
                      <Text numberOfLines={1} style={styles.cardTitle}>
                      {nomPlat}
                      </Text>
                      <Text numberOfLines={1} style={{
                        fontSize: 17,
                        lineHeight: 24,
                        fontWeight: '500',
                        color: '#222',
                        backgroundColor: "#ffd9d9", 
                        paddingHorizontal: 4,
                        borderRadius: 6,
                      }}>
                      {restauList[index]}
                      </Text>
  
                      <View style={styles.cardRow}>
                        <View style={styles.cardRowItem}>
                          <FontAwesome color="#173153" name="wallet" size={13} />
  
                          <Text style={styles.cardRowItemText}>
                          Unité: {prixplat}.00Frs
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
                           {/* Quantité: {commande.quantity} */}
                          </Text>
                        </View>
                      </View>
  
                      <View style={{flexDirection: "row"}}>
                        <Text style={styles.cardPrice}>
                        Total: {commande.prix}.00Frs 
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
          </View>
        )} )}
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