
import React from 'react';
import {useNetInfo} from '@react-native-community/netinfo';
import {Dimensions, StyleSheet, View} from 'react-native';
import { Text } from 'react-native';

const {width} = Dimensions.get('window');

export const NetWork = () => {
    const netInfo = useNetInfo();

    if (!netInfo.isConnected && netInfo.isConnected !== null) {
        return (
            <View style={styles.offlineContainer}>
                <Text style={styles.offlineText}>No Internet Connection</Text>
            </View>
        );
    }
    return null;
};

const styles = StyleSheet.create({
    offlineContainer: {
        backgroundColor: '#C31C0D',
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        width,
        position: 'absolute',
    },
    offlineText: {color: '#fff'},
});
