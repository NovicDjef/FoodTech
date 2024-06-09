import React, {useEffect, useRef} from 'react';
import { WebView } from 'react-native-webview';
import { View, ActivityIndicator, Text, Alert, StyleSheet, Dimensions } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useRoute } from '@react-navigation/native';
import { addCommande } from '../redux/action/commandeActions';
import { useDispatch, useSelector } from 'react-redux';
import { COLORS } from '../constants';

const PaymentWebView = ({navigation}) => {
    const { t } = useTranslation();
  const route = useRoute();
  const { paymentUrl, commandeData } = route.params;
  const webViewRef = useRef(null);
  const dispatch =  useDispatch();

  useEffect(() => {
    console.debug("commandes Payement.... :",commandeData )
    dispatch(addCommande(commandeData))
  },[])
  const handleMessage = (event) => {
    //message = JSON.parse(message);
    // let status = message['status'];
    // let transaction_id = message['transaction_id'];

    const message = event.nativeEvent.data;
    // if(status === "complete") {
    //         dispatch(fetchcommandes({
    //             payment_transaction_id: transaction_id,
    //             // userId: userId,
    //             // commandeId: 1,
    //             // platId: 1
    //         }, true))
    //         navigation.goBack()
       
    // }


  console.debug("commandes Payement.... :",commandeData )
    if (message === 'payment_success') {    

          const message = event.nativeEvent.data;
          dispatch(addCommande(commandeData))
          console.debug("commandes arrive dans payment :",commandeData )
          if (message === 'payment_success') {
            Alert.alert('Payment Success', 'Your payment was successful!', [
              {
                text: 'OK',
                onPress: () => navigation.goBack(), // Navigate to another screen after payment success
              },
            ]);
        }
    }
  };



return (
  <View style={styles.contain}>
  <WebView
    style={styles.webview}
    source={{ uri: paymentUrl }}
    ref={webViewRef}
    renderLoading={() => (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={COLORS.primary} />
        <Text style={{ fontSize: 18 }}>{t("Loading")}</Text>
      </View>
    )}
    startInLoadingState={true}
    javaScriptEnabled={true}
    domStorageEnabled={true}
    onMessage={handleMessage}
  />
</View>
  );
};

const styles = StyleSheet.create({
    contain: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingLeft: 20,
        paddingRight: 20,
    },
    webview: {
        height: Dimensions.get('window').height,
        width: Dimensions.get('window').width,
    },
    loadingContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
});

export default PaymentWebView;
