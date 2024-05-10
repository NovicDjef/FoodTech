import React, { useEffect, useState } from 'react';
import { StyleSheet, SafeAreaView, ScrollView, Text, View, TouchableOpacity, Image, RefreshControl, Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import LottieView from 'lottie-react-native';
import { fetchcommandes } from '../../redux/action/commandeActions';
import { fetchRepas } from '../../redux/action/platsActions';
import { fetchRestaurants } from '../../redux/action/restaurantActions';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import { COLORS } from '../../constants';

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
    setTimeout(() => setRefreshing(false), 3000);
  };

  const showAlert = (title, message) => {
    Alert.alert(title, message, [{ text: 'OK' }]);
  };

  // Filtrer les commandes de l'utilisateur connecté
  const userCommandes = commandes.filter((cmd) => cmd.userId === userId);
  const hasCommandes = userCommandes.length > 0;

  return (
    <SafeAreaView style={{ backgroundColor: '#fff', flex: 1 }}>
      <ScrollView
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        contentContainerStyle={styles.container}
      >
        <Text style={styles.title}>Historiques Commandes</Text>

        {hasCommandes ? (
          userCommandes.map((commande) => {
            const plat = platsData.find((plat) => plat.id === commande.platsId);
            const restaurant = restaurants.find((resto) => resto.id === plat.restaurantId);
            const imageplat = plat.image || 'Image plat inconnu';
            const nomPlat = plat.nom || 'nom plat inconnu';
            const prixplat = plat.prix || 'nom plat inconnu';

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
                      source={{ uri: `http://172.20.10.4:3000/images/${imageplat}` }}
                      style={styles.cardImg}
                    />

                    <View style={styles.cardBody}>
                      <Text numberOfLines={1} style={styles.cardTitle}>
                        {nomPlat}
                      </Text>
                      <Text numberOfLines={1} style={styles.cardRowItemText}>
                        {restaurant.nom}
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
        ) : (
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
    marginLeft: 12,
  },
});
