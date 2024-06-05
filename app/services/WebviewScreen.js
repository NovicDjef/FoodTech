							  
import React, {useState, useEffect, useCallback} from 'react';
import {ActivityIndicator, Platform, Alert, ProgressBarAndroid, Dimensions, StyleSheet, View, Text,} from 'react-native';
import WebView from 'react-native-webview';
import {connect, useDispatch} from 'react-redux';
import {ScreenComponent} from "../components/ScreenComponent";
import {readUser} from "../webservice/AuthApi";
import I18n from "react-native-i18n";
import {bindActionCreators} from "redux";

const WebviewScreen = ({navigation,}) => {

    let webviewRef = null;
    const dispatch = useDispatch();
    const [hasRedirected, setHasRedirected] = useState(false);
    const [constRedirect, setCountRedirect ] = useState(0)

    const {url, requestBody, transactionType, subscription} = navigation.state.params;
  
    //useEffect(
        // useCallback(() => {
        //     const onBackPress = () => {
        //         if (backButtonEnabled) {
        //             webviewRef?.goBack();
        //         } else {
        //             navigation.goBack();
        //         }
        //         return false;
        //     };
        //     BackHandler.addEventListener('hardwareBackPress', onBackPress);
        //     return () =>
        //         BackHandler.removeEventListener(
        //             'hardwareBackPress',
        //             onBackPress,
        //         );
        // }, []);
      
        useEffect(() => {
        //useCallback(() => {
            if(saveTransaction.result !== null) {
                Alert.alert(
                    I18n.t("SUCCESS"),
                    saveTransaction.result.response,
                    [
                        {
                            text: I18n.t("OK"), onPress: () => {
                                readUser().then(() => {
                                    if (user) {
                                        if (user !== undefined) {
                                            getCommissionUserWalletToCardAction(user.phone, 0)
                                        }
                                    }
                                });
                                navigation.goBack()
                            }
                        }
                    ],
                    {cancelable: false}
                );
            }
    
            if(saveTransaction.error !== null) {
                navigation.goBack();
                Alert.alert(
                    I18n.t("ERROR_TREATMENT_REQUEST"),
                    saveTransaction.error.data.error,
                    [
                        {
                            text: I18n.t("OK"), onPress: () => {
                                navigation.goBack();
                            }
                        }
                    ],
                    {cancelable: false}
                )
            }
    }, [saveTransaction]);

    const renderLoader = () => (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        {Platform.OS === 'android'
            ?
            (
                <>
                    <ProgressBarAndroid/>
                    <Text>{I18n.t('LOADING_DOTS')}</Text>

                </>
            ) :
            <>
                <ActivityIndicator size="large" color={'#ccc'}/>
                <Text>{I18n.t('LOADING_DOTS')}</Text>
            </>
        }
    </View>
    )

    const checkPaymentStatus = (message) => {
        message = JSON.parse(message);

        let status = message['status'];
        let transaction_id = message['transaction_id'];

        if(status === "0") {
            navigation.goBack()
            Alert.alert(I18n.t('PAYMENT_ERROR'), I18n.t('PAYMENT_COULD_NOT_MADE'), [{text:"Ok",onPress:()=>{}}])
        }
         if(status === "1") {
            
            if(transactionType === "USER_CARD_WALLET" ){
                envoieUserWalletToCardAction({
                    payment_transaction_id: transaction_id,
                    ...requestBody
                }, true)
                navigation.goBack()
            } 
            
            if(transactionType === "USER_PAY_INSURANCE") {
                fetchActivePaySubscription(subscription.id, {
                    payment_transaction_id: transaction_id,
                    ...requestBody
                }, true)
                navigation.goBack()
            }
              // Marquez la redirection comme déjà effectuée
              setHasRedirected(true);

              // Retournez dans l'application
              navigation.goBack();
       
        }
    };

    return (
        <ScreenComponent>
            <View style={styles.contain}>
                <WebView
                    source={{uri: url}}
                    style={styles.webview}
                    ref={ref => {
                        webviewRef = ref;
                    }}
                    javaScriptEnabled
                    domStorageEnabled
                    onMessage={({nativeEvent}) => {
                        checkPaymentStatus(nativeEvent.data);
                    }}
                    renderLoading={() => (
                        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: -42}}>
                        {Platform.OS === 'android'
                            ?
                            (
                                <>
                                    <ProgressBarAndroid/>
                                    <Text>{I18n.t('LOADING_DOTS')}</Text>
        
                                </>
                            ) :
                            <>
                                <ActivityIndicator size="large" color={'#ccc'}/>
                                <Text>{I18n.t('LOADING_DOTS')}</Text>
                            </>
                        }
                    </View>
                        
                    )}
                    startInLoadingState
                />
            
            </View>

                </ScreenComponent>
          
    );
};
const mapStateToProps = state => ({
    saveTransaction: state.envoieUserWalletToCardReducer

});

const mapDispatchToProps = dispatch => bindActionCreators({
    envoieUserWalletToCardAction,
    getCommissionUserWalletToCardAction,
    fetchActivePaySubscription
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(WebviewScreen);

const styles = StyleSheet.create({
    contain: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingLeft: 20,
        paddingRight: 20,
    },
    contentModal: {
        width: '100%',
        borderRadius: 8,
        padding: 8,
    },
    item: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 20,
    },
    contentAction: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        paddingTop: 24,
    },
    webview: {
        height: Dimensions.get('window').height,
        width: Dimensions.get('window').width,
    },
});