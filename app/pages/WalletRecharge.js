import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, Alert, StyleSheet } from 'react-native';
import COLORS from '../consts/colors';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { rechargeWallet } from '../redux/action/walletAction';

function WalletRecharge() {

    const dispatch = useDispatch()
  const navigation = useNavigation()
  const [phoneNumber, setPhoneNumber] = useState('');
  const [amount, setAmount] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleRecharge = async () => {
    dispatch(rechargeWallet(amount)); // Exemple de recharge
  

//   const handleRecharge = async () => {
//     // Validation des données
//     if (!phoneNumber || !amount) {
//         dispatch(rechargeWallet(100)); 
//       Alert.alert('Erreur', 'Veuillez remplir tous les champs.');
//       return;
      
//     }

    // Commencer le chargement
    setIsLoading(true);

    try {
      // Appel fictif à une API de recharge de portefeuille (à adapter en fonction de l'opérateur)
      const response = await rechargeWalletAPI(phoneNumber, amount);

      // Traiter la réponse
      if (response.success) {
        Alert.alert('Succès', 'Recharge réussie.');
      } else {
        Alert.alert('Erreur', response.error);
      }
    } catch (error) {
      console.error('Erreur:', error);
      Alert.alert('Erreur', 'Une erreur s\'est produite lors de la recharge.');
    } finally {
      // Arrêter le chargement
      setIsLoading(false);
    }
  };

  return (
    <><TouchableOpacity
          onPress={() => navigation.navigate('Home')} // Remarquez le bouton de retour vers la page d'accueil
          style={{ marginTop: 20, textDecoration: 'underline' }}
      >
        <Icon 
            name="arrow-back-ios"
            size={28}
            style={{margin: 22}}
            color={COLORS.primary}
            />
          {/* <Text>Retour vers la page d'accueil</Text> */}
      </TouchableOpacity><View style={styles.comtainer}>
              <Text style={{}}>Recharge de Portefeuille</Text>
              <View style={{}}>
                  <TextInput
                      placeholder="Numéro de téléphone"
                      value={phoneNumber}
                      onChangeText={setPhoneNumber} />
                  <TextInput
                      placeholder="Montant à recharger"
                      value={amount}
                      onChangeText={setAmount} />
              </View>
              <TouchableOpacity
                  onPress={handleRecharge}
                  disabled={isLoading}
                  style={[styles.btn, { backgroundColor: isLoading ? COLORS.primary : COLORS.primary }]}
              >
                  {isLoading ? (
                      <Text>Chargement en cours...</Text>
                  ) : (
                      <Text>Recharger</Text>
                  )}
              </TouchableOpacity>
          </View></>
  );
}

// Fonction fictive pour simuler l'appel à l'API de recharge
async function rechargeWalletAPI(phoneNumber, amount) {
  // Ici, vous pouvez simuler l'appel à l'API de recharge avec des délais fictifs et des réponses simulées.
  // En réalité, vous appelleriez l'API de l'opérateur de mobile money.

  await new Promise(resolve => setTimeout(resolve, 2000)); // Simuler une requête asynchrone

  // Exemple de réponse simulée (à adapter en fonction de l'opérateur)
  return {
    success: true, // Indique si la recharge a réussi
    error: null, // Message d'erreur en cas d'échec
  };
}

const styles = StyleSheet.create({
    comtainer: {
     flex: 1, 
     alignItems: 'center',
    justifyContent: 'center' 
    },
    btn: {
        height: 55,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40,
        backgroundColor: COLORS.primary,
        marginHorizontal: 20,
        borderRadius: 10,
        width: 260,
        
      },
})

export default WalletRecharge;
