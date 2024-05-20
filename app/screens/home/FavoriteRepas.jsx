import React, { useEffect, useId, useState } from 'react';
  import {
    StyleSheet,
    SafeAreaView,
    ScrollView,
    Text,
    View,
    TouchableOpacity,
    Image,
    RefreshControl,
  } from 'react-native';
  import { useSelector, useDispatch } from 'react-redux';
import { suppressionFavoris } from '../../redux/reducer/favorisReducer';

  import LottieView from 'lottie-react-native';
  import Icon from 'react-native-vector-icons/FontAwesome';
  import FontAwesome from 'react-native-vector-icons/FontAwesome5';
  import { COLORS } from '../../constants';
  // import PushNotification from 'react-native-push-notification';


  export default function FavoriteRepas({navigation}) {

    const favoris = useSelector(state => state.favoris);
    const dispatch = useDispatch();
  
    const removeFromFavoris = (repas) => {
      dispatch(suppressionFavoris(repas));
    };
  
    const [refreshing, setRefreshing] = useState(false)
    const [platsData, setPlatsData] = useState([
      {
        id: 1,
        name: "Bonus sur vos commandes",
        text: "contenu de la notification qui est un texte Lorem ipsum dolor sit, amet consectetur adipisicing elit. Qui quisquam iusto, repellat consequuntur minus asperiores error enim quis impedit nostrum inventore, odit, repudiandae aliquid debitis? Dignissimos eveniet deleniti quam doloribus!",
        mention: true,
      },
      {
        id: 2,
        name: "Commande Validé",
        text: "contenu de la notification qui est un texte Lorem ipsum dolor sit, amet consectetur adipisicing elit. Qui quisquam iusto, repellat consequuntur minus asperiores error enim quis impedit nostrum inventore, odit, repudiandae aliquid debitis? Dignissimos eveniet deleniti quam doloribus!",
        mention: false,
      },
      {
        id: 3,
        name: "Restaurant proche",
        text: "contenu de la notification qui est un texte Lorem ipsum dolor sit, amet consectetur adipisicing elit. Qui quisquam iusto, repellat consequuntur minus asperiores error enim quis impedit nostrum inventore, odit, repudiandae aliquid debitis? Dignissimos eveniet deleniti quam doloribus!",
        mention: true,
      }
      
    ]);

  //   useEffect(() => {
  //     PushNotification.configure({
  //         onNotification: function(notification) {
  //             console.log('NOTIFICATION:', notification);

  //             // Traitez la notification comme nécessaire, par exemple :
  //             // Afficher une alerte ou une modal
  //             // Naviguer vers une autre vue
  //         },
  //     });

  //     return () => {
  //         PushNotification.unregister();
  //     };
  // }, []);


    const onRefresh = () => {
      setRefreshing(true);
      setTimeout(() => setRefreshing(false), 3000);
    };
  
    return (
      <SafeAreaView style={{ backgroundColor: '#fff', flex: 1 }}>
        <ScrollView 
        refreshControl={
          <RefreshControl 
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
        contentContainerStyle={styles.container}>
          <View style={styles.header}>
        <TouchableOpacity
          style={{
            paddingRight: 10,
          }}
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Icon name='angle-left' type='font-awesome' size={30} color={COLORS.black} />
        </TouchableOpacity>
      </View>
          <Text style={styles.title}>Liste des favoris :</Text>

          {platsData.length > 0 ? (
            platsData.map((item, index) =>  (

              <View
              key={index}
                style={[
                  styles.cardWrapper,
                  // index === 0 && { borderTopWidth: 0 },
                ]}>
                <TouchableOpacity
                  onPress={() => {
                    // handle onPress
                  }}>
                    
                  <View style={styles.card}>
                    <Image
                      alt=""
                      resizeMode="cover"
                      source={require('../../../assets/icons/notification.png')}
                      style={styles.cardImg}
                    />
  
                    <View style={styles.cardBody}>
                     <View style={{flexDirection: "row", justifyContent: "space-between"}}> 
                       <Text numberOfLines={1} style={styles.cardTitle}>
                        {item.name}
                        </Text>
                        <Text numberOfLines={1} 
                          style={{
                            fontSize: 17,
                            lineHeight: 24,
                            color: COLORS.gray40
                          }}>
                        Maintenant
                      </Text>
                     </View>
                      <Text numberOfLines={2} style={{
                        lineHeight: 24,
                        fontWeight: '500',
                        color: '#222',
                      }}>
                      {item.text}
                      </Text>
  
                      <View style={{flexDirection: "row", justifyContent: "flex-end"}}>
                        <Text style={styles.cardStatus}>
                        {item.mention ? "lue" : "Non lu"}
                        </Text>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              </View>))
          ) : (
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <LottieView
                style={{
                  width: 268,
                  height: 268,
                  top: 42
                }}
                source={require('../../../assets/json/781-no-notifications.json')}
                autoPlay
                loop
              />
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
      width: 33,
      height: 36,
      marginRight: 16,
      top: 20
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
      marginLeft: 12
    },
  });
