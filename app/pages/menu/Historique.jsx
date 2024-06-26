import React, { useEffect, useState } from 'react';
import { StyleSheet, SafeAreaView, ScrollView, Text, View, TouchableOpacity, Image, RefreshControl, Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import LottieView from 'lottie-react-native';
import { fetchcommandes } from '../../redux/action/commandeActions';
import { fetchRepas } from '../../redux/action/platsActions';
import { fetchRestaurants } from '../../redux/action/restaurantActions';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import { COLORS } from '../../constants';
import baseImage from "../../services/urlApp"

export default function Historique() {
  const dispatch = useDispatch();
  const [refreshing, setRefreshing] = useState(false);
  const userId = useSelector((state) => state.auth.user.user.id);
  const commandes = useSelector((state) => state.commande.commandes);
  const platsData = useSelector((state) => state.plat.repas);
  const restaurants = useSelector((state) => state.restaurant.restaurants);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    dispatch(fetchcommandes());
    dispatch(fetchRepas());
    dispatch(fetchRestaurants());
  };

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      fetchData();
     // dispatch(filterCommandesUtilisateur(commandes))
     setRefreshing(false)
     }, 3000)
    
  };

  const filterCommandesUtilisateur = (commandes) => {
    let commandesUtilisateur = [];
    // Parcourir chaque liste de commandes
    commandes.forEach(listeCommandes => {
      // Filtrer les commandes de cette liste par l'ID de l'utilisateur
      const commandesFiltrees = listeCommandes.filter(commande => commande.userId === userId);
      // Ajouter les commandes filtrées à la liste finale
      commandesUtilisateur = commandesUtilisateur.concat(commandesFiltrees);
    });
    
    return commandesUtilisateur;
    
  };

  const commandesUtilisateur = filterCommandesUtilisateur(commandes, userId);

// Ajouter le nom du restaurant à chaque plat commandé
const platsAvecNomRestaurant = commandesUtilisateur.map(commande => {
  const plat = platsData.find(plat => plat.id === commande.platsId);
  const restaurant = restaurants.find(resto => resto.id === commande.restaurantId);
  if (plat && restaurant) {
    return { ...plat, nomRestaurant: restaurant.name };
  } else {
    return null; // Ignorez les plats sans restaurant correspondant
  }
}).filter(plat => plat !== null); // Filtrer les plats sans restaurant correspondant

  
  
  return (
    <SafeAreaView style={{ backgroundColor: '#fff', flex: 1 }}>
      <ScrollView
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        contentContainerStyle={styles.container}
      >
        <Text style={styles.title}>Historiques Commandes</Text>

        {platsAvecNomRestaurant === 0 ? (
          <View style={styles.emptyMessageContainer}>
          <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
                  <LottieView
                      style={{
                        width: 368,
                        height: 368
                      }}
                      source={require("../../../assets/json/25237-receipt.json")}
                      autoPlay
                      loop
                  />
                  <Text style={{fontSize: 18}}>Aucune commande passée pour le moment.</Text>
          </View>
          </View>
        ) : (
          commandesUtilisateur.map((commande) => {
            const plat = platsData.find((plat) => plat.id === commande.platsId);
            // const restaurant = restaurants.find((resto) => resto.id === plat.restaurantId);
            const commandesUtilisateur = filterCommandesUtilisateur(commandes, userId);

            // const nomRestaurant = restaurant.name || 'name restaurant inconnu';
            const imageplat = plat.image || 'Image plat inconnu';
            const nomPlat = plat.name || 'nom plat inconnu';
            const prixplat = plat.prix || 'prix plat inconnu';
            //const heureCommende = plat.createdAt || "Heure Inconnu"
            const isoDate = commande.createdAt;
            const date = new Date(isoDate);

// Extraire les composants de la date
const day = date.getUTCDate(); 
const month = date.getUTCMonth() + 1; 
const year = date.getUTCFullYear(); 
const hours = date.getUTCHours(); 
const minutes = date.getUTCMinutes();

// Ajouter un zéro devant les jours et mois inférieurs à 10
const formattedDay = day < 10 ? `0${day}` : day;
const formattedMonth = month < 10 ? `0${month}` : month;
const formattedHours = hours < 10 ? `0${hours}` : hours;
const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
const nomRestaurant = restaurants.name || 'Nom du restaurant inconnu';


// Formater la date et l'heure en jour/mois/année heure:minute
const heureCommende = `${formattedDay}/${formattedMonth}/${year} à ${formattedHours}:${formattedMinutes}`;


            return (
              <View key={commande.id} style={styles.cardWrapper}>
                <TouchableOpacity
                  onPress={() => {
                    // handle onPress
                  }}
                > 
                  <View style={styles.card}>
                    <Image
                      alt=""
                      resizeMode="cover"
                      source={{ uri: `${baseImage}/${imageplat}` }}
                      style={styles.cardImg}
                    />

                    <View style={styles.cardBody}>
                      <View style={{display: "flex",  flexDirection: 'row', alignItems: "center", justifyContent: "space-between"}}>
                          <Text numberOfLines={1} style={styles.cardTitle}>
                            {nomPlat}
                          </Text>
                          <Text>
                            {heureCommende}
                          </Text>
                      </View>
                      <Text numberOfLines={1} style={styles.cardRowItemText}>
                        {nomRestaurant}
                      </Text>

                      <View style={styles.cardRow}>
                        <View style={styles.cardRowItem}>
                          <FontAwesome color="#173153" name="wallet" size={13} />
                          <Text style={styles.cardRowItemText}>
                            Unité: {prixplat}.00Frs
                          </Text>
                        </View>

                        <View style={styles.cardRowItem}>
                          <FontAwesome color="#173153" name="cart-arrow-down" solid={true} size={13} />
                          <Text style={styles.cardRowItemText}>
                            Quantité: {commande.quantity}
                          </Text>
                        </View>
                      </View>

                      <View style={{ flexDirection: "row" }}>
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
          })
        )}
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
    marginLeft: 12,
  },
});
