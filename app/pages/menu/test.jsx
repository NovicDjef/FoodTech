import { View, Text } from 'react-native'
import React, { useState, useEffect} from 'react'
import axios from 'axios';

const test = () => {
 const [data, setData] = useState(null)
 const config = {
    headers: {
      'Content-Type': 'application/json', 
    },
  };
useEffect(() => {

    axios.get('http://172.20.10.2:3000/category',
    {config},
    )
    .then(response => {
        const dataNotification = response.data;
        console.debug(dataNotification)
      })
      .catch(error => {
        console.error('Erreur lors de la requête API :', error);
      });
  
}, [])

  return (
    <View>
      <Text>test</Text>
      {data && data.map((item, index) => (
        <View key={index}>
            <Text>Id User: {item.userId}</Text>
        <Text>Id User: {item.message}</Text>
        <Text>Id User: {item.date_notification}</Text>
        </View>
     ))} 
    </View>

// ancien home: 
    //  {/* <Tooltip title="cusine" button="Tous voir" />
    //     <FlatList
    //       data={jeuxData}
    //       horizontal
    //       showsHorizontalScrollIndicator={false}
    //       contentContainerStyle={{
    //         paddingLeft: 20,
    //         marginTop: 20,
    //         paddingBottom: 30,
    //       }}
    //       renderItem={({item}) => <AutreJeu jeux={item} />}
    //     />
    //     <Tooltip title="Enguin Lourd" button="Tous voir" />
    //     <FlatList
    //       data={machienData}
    //       horizontal
    //       showsHorizontalScrollIndicator={false}
    //       contentContainerStyle={{
    //         paddingLeft: 20,
    //         marginTop: 20,
    //         paddingBottom: 30,
    //       }}
    //       renderItem={({item}) => <TopJeux jeux={item} />}
    //     />
    //      <Tooltip title="électroménager" button="Tous voir" />
    //     <FlatList
    //       data={electroData}
    //       horizontal
    //       showsHorizontalScrollIndicator={false}
    //       contentContainerStyle={{
    //         paddingLeft: 20,
    //         marginTop: 20,
    //         paddingBottom: 30,
    //       }}
    //       renderItem={({item}) => <Electro jeux={item} />}
    //     /> */}

  )
}

export default test