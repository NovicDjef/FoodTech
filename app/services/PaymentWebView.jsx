import React, { useEffect, useRef } from 'react';
import { WebView } from 'react-native-webview';
import { View, ActivityIndicator, Text, Alert, StyleSheet, Dimensions } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useRoute } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { COLORS } from '../constants';
import { fetchPaymentStatus } from '../redux/action/payementAction';
import { addCommande } from '../redux/action/commandeActions';

const PaymentWebView = ({ navigation }) => {
  const { t } = useTranslation();
  const route = useRoute();
  const { paymentUrl, commandeData } = route.params;
  const webViewRef = useRef(null);
  const dispatch = useDispatch();
  
  const paymentStatus = useSelector(state => state.payement.paymentStatus);

  const reference = commandeData.reference; // Assuming commandeData contains reference
  console.debug(`wwwwww : `, commandeData)
  useEffect(() => {
    if (reference) {
     dispatch(fetchPaymentStatus(reference));
    }
    
  }, [dispatch, reference]);

  useEffect(() => {
    if (paymentStatus) {
      Alert.alert(
        "Payment Status",
        `Status: ${paymentStatus.status}, Reference: ${paymentStatus.reference}`,
        [
          {
            text: "OK",
            onPress: () => {
              navigation.goBack();
            }
          }
        ]
      );
    }
    console.log(`ddddddddddd: `, reference)
  }, [paymentStatus, navigation]);

  const handleMessage = (event) => {
    try {
      const message = JSON.parse(event.nativeEvent.data);
      const { status, reference } = message;

      if (status === "complete") {
        dispatch(addCommande({ commandeData }));
        Alert.alert(
          "Status Paiment",
          `Status: ${status}, reference de paiment: ${reference}`,
          [
            {
              text: "OK",
              onPress: () => {
                navigation.goBack();
              }
            }
          ]
        );
      } else if (status === "failed" || status === "expired") {
        Alert.alert(
          "Status Paiment",
          `Status: ${status}, reference de paiment: ${reference}`,
          [
            {
              text: "OK",
              onPress: () => {
                navigation.goBack();
              }
            }
          ]
        );
      } else {
        Alert.alert(
          "Status Paiment",
          `Status: ${status}, reference de paiment: ${reference}`,
          [
            {
              text: "OK",
              onPress: () => {
                navigation.goBack();
              }
            }
          ]
        );
      }
    } catch (error) {
      console.error('Error parsing message from webview:', error);
      Alert.alert(
        "Error",
        "Failed to process payment status update",
        [{ text: "OK", onPress: () => navigation.goBack() }]
      );
    }
  };

  return (
    <View style={styles.contain}>
      <WebView
        style={styles.webview}
        source={{ uri: paymentUrl }}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        onMessage={handleMessage}
        ref={webViewRef}
        renderLoading={() => (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={COLORS.primary} />
            <Text style={{ fontSize: 18 }}>{t("Loading")}</Text>
          </View>
        )}
        startInLoadingState={true}
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
