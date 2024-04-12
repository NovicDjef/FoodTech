// import React, { useState, useCallback, useEffect } from 'react';
// import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, RefreshControl,} from 'react-native';
// import Axios from 'axios';
// import { Alert } from 'react-native'; 

// export default function SwipeRefresh() { 
//     const [refreshing, setRefreshing] = useState(false); 
//     const [users, setUsers] = useState([]); 
//     useEffect(() => { Axios.get('https://randomuser.me/api/?results=5')
//     .then((res) => { setUsers(res.data.results); 
//     }); 
// }, []); 
// const onRefresh = useCallback(() => {
//      setRefreshing(true); 
//      Axios.get('https://randomuser.me/api/?results=5')
//      .then((res) => { setUsers(res.data.results); 
//         setRefreshing(false); 
//     }); 
//     }, []); 
    
//     return ( 
//     <ScrollView contentContainerStyle={styles.scrollView} refreshControl={ <RefreshControl refreshing={refreshing} onRefresh={onRefresh} /> } >
//          {users.map((user) => ( 
//          <TouchableOpacity style={styles.userCard} 
//         //onPress={() => { Alert.alert( {user.name.first} {user.name.last}, You can call me at ${user.phone} ); }} 
//          >
//              <Image style={styles.userImage} source={{ uri: user.picture?.large }} /> 
//              <View style={styles.userCardRight}> 
//              <Text style={{ fontSize: 18, fontWeight: '500', color: '#fff' }} >
//                 {user.name.first} {user.name.last}</Text> 
//                 <Text style={{ color: '#fff' }}>{user?.phone}</Text> 
//                 </View> 
//                 </TouchableOpacity> ))} 
//                 </ScrollView> 
//                 );} 
                
                
// const styles = StyleSheet.create({ 
//     scrollView: { paddingHorizontal: 10, }, 
//     userCard: { backgroundColor: '#2f3542', 
//     paddingVertical: 6, 
//     paddingHorizontal: 6, 
//     borderRadius: 10, 
//     marginTop: 10, 
//     display: 'flex', 
//     flexDirection: 'row', 
//     alignItems: 'center', 
// }, 
// userImage: {
//      width: 40, 
//      height: 40, 
//      borderRadius: 100, 
//     }, 
// userCardRight: { 
//     paddingHorizontal: 10, 
// },
// });









// import { View, Text, StyleSheet } from 'react-native'
// import React from 'react'
// import LottieView from 'lottie-react-native'


// const Notifications = () => {
//   return (
//     <>
//     <View
//     style={{
//       width: '100%',
//       height: '100%',
//       backgroundColor: '#f1f3f6',
//       justifyContent: 'center',
//       alignItems: 'center',
//       //paddingTop: 20,
//     }}>
//       <LottieView
//         style={styles.lottie}
//         source={require("../../assets/json/781-no-notifications.json")}
//         autoPlay
//         loop />
//     </View>
//   </>
//   )
// }
// const styles = StyleSheet.create({
//   lottie: {
//     width: 348,
//     height: 348,
//     textAlign: 'center'
//   },
// })

// export default Notifications

import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Notifications = () => {
  
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
             ttgtgtgtgtg
            </Text>
            <Text
              style={{ color: '#fff', fontFamily: 'NSRegular', fontSize: 16 }}
            >
              tbtbtbtbtbt
            </Text>
          </View>
          <TouchableOpacity>
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
          <TouchableOpacity style={styles.postStatsOpacity}>
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
export default Notifications;
 
 
