import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useSelector } from 'react-redux';

const ListNotification = ({navigation}) => {

  const selectedNumber = useSelector(state => state.lotReducer.selectedNumber);
  const gameStatus = useSelector(state => state.lotReducer.gameStatus);
  
  return(
    <>
      <View style={styles.postView}>
        <View style={styles.postHeader}>
          <View>
            {/* <Image
              style={{ width: 50, height: 50, borderRadius: 100 }}
              source={{
                uri: post.userProfileImage,
              }}
            /> */}
          </View>
          <View style={{ flex: 1, paddingHorizontal: 10 }}>
            <Text style={{ color: '#fff', fontFamily: 'NSBold', fontSize: 18 }}>
            l,grlmg,rl,rl,lnkdnjddj {selectedNumber === null ? "La valeur est null" : "il ya une valeur"}
            </Text>
            <Text
              style={{ color: '#fff', fontFamily: 'NSRegular', fontSize: 16 }}
            >
              tbtbtbtbtbt {gameStatus === null ? "La valeur est null" : "il ya une valeur" }
            </Text>
          </View>
          <TouchableOpacity 
          onPress={() => {navigation.navigate('DetailsScreen')}}>
            {/* <Icon name='more-horizontal' color='#fff' size={28} /> */}
          </TouchableOpacity>
        </View>
        {/* Post Content */}
        <View style={{ marginTop: 10 }}>
          <Text
            style={{
              color: '#fafafa',
              fontFamily: 'NSRegular',
              fontSize: 14,
              paddingHorizontal: 10,
            }}
          >
dfdfdf          </Text>
 {/* <Image
              style={{ width: '100%', height: 300, marginTop: 10 }}
              source={{ uri: post.postImage }}
            />
          ) : null} */}
        </View>
        {/* Post Stats */}
        <View
          style={{ marginTop: 10, flexDirection: 'row', paddingHorizontal: 10 }}
        >
          <TouchableOpacity style={styles.postStatsOpacity}
          onPress={() => {navigation.navigate('Tabs')}}>
            <Icon name='heart' color='#fff' size={16} />
            <Text
              style={{
                marginLeft: 6,
                fontFamily: 'NSRegular',
                color: '#fff',
              }}
            >
tgtgtgt            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              ...styles.postStatsOpacity,
              marginLeft: 10,
            }}
          >
            {/* <Icon name='message-circle' color='#fff' size={16} /> */}
            <Text
              style={{
                marginLeft: 6,
                fontFamily: 'NSRegular',
                color: '#fff',
              }}
            >
tbttbtgttg            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  postsView: { paddingHorizontal: 10, marginTop: 10 },
  postView: {
    paddingVertical: 10,
    marginTop: 10,
    backgroundColor: '#333',
    borderRadius: 10,
    shadowColor: '#1e1e1e',
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 3,
    elevation: 8,
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  postStatsOpacity: {
    backgroundColor: '#222',
    padding: 8,
    borderRadius: 6,
    flexDirection: 'row',
    alignItems: 'center',
  },
})
export default ListNotification;
 
 
