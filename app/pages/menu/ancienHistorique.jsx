import React, { useState} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  View,
  Text,
  Image,
  TouchableOpacity,
  Switch,
} from 'react-native';
import SECTIONS from '../../consts/historiques';
//import Icon from 'react-native-vector-icons/Feather';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { COLORS } from '../../consts/colors';


export default function Notifications() {
  const [sectionActive, setSectionActive] = useState("envoie1"); 


  const handleSectionClick = (section) => {
    
    setSectionActive(section);
  };
  const activeLink = " bg-blue-100 ";
  const normalLink = "";

  const [value, setValue] = React.useState(0);
  const { tabs, items } = React.useMemo(() => {
    return {
      tabs: SECTIONS.map(({ header, icon }) => ({
        name: header,
        icon,
      })),
      items: SECTIONS[value].items,
    };
  }, [value]);

  return (
    <SafeAreaView style={{ backgroundColor: '#f8f8f8', flex: 1 }}>
      <View style={styles.container}>
        <View>
          <TouchableOpacity onPress={() => handleSectionClick("Notifications")} style={[styles.menu, sectionActive === "Notifications" ? styles.bgblue : normalLink]} >
            <Icon color="#173153" name="bell" style={styles.menuIcons} size={23} />
            <Text style={{color: "#000", fontSize: 16, fontWeight: 500}}>Notifications</Text>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity onPress={() => handleSectionClick("Historiques")} style={[styles.menu, sectionActive === "Historiques" ? styles.bgblue : normalLink]}>
            <Icon color="#173153" name="align-center" style={styles.menuIcons} size={23} />
            <Text style={{color: "#000", fontSize: 16, fontWeight: 500}}>Historiques</Text>
          </TouchableOpacity>
        </View>
        </View>
        {sectionActive === 'Notifications' && (
          <ScrollView>
             {items.map(({ img, bedrooms, address, sqft, price, type, value }, index) => {
            return (
              <View
                key={index}
                style={[
                  styles.cardWrapper,
                  index === 0 && { borderTopWidth: 0 },
                ]}>
                <TouchableOpacity
                  onPress={() => {
                    // handle onPress
                  }}>
                  <View style={styles.card}>
                          <Image
                            alt=""
                            resizeMode="cover"
                            source={img}
                            style={styles.cardImg}
                          />
                           <View style={styles.cardBody}>
                            <Text numberOfLines={1} style={styles.cardTitle}>
                              {address}
                            </Text>

                            <View style={styles.cardRow}>
                              <View style={styles.cardRowItem}>
                                <Icon color="#173153" name="bell" size={13} />

                                <Text style={styles.cardRowItemText}>
                                  {bedrooms} Jeux
                                </Text>
                              </View>
                              <View style={styles.cardRowItem}>
                                <Icon
                                  color="#173153"
                                  name="wallet"
                                  solid={true}
                                  size={13}
                                />

                                <Text style={styles.cardRowItemText}>
                                  {sqft} 
                                </Text>
                              </View>
                            </View>

                            <Text style={styles.cardPrice}>
                              {price} Frs
                            </Text>
                          </View>
                      
                    <View style={styles.rowSpacer} />

                    {type === 'input' && (
                      <Text style={styles.rowValue}>{value}</Text>
                    )}

                    {type === 'boolean' && (
                      <Switch trackColor={{ true: COLORS.primary }} value={value} />
                    )}

                    {(type === 'input' || type === 'link') && (
                      <Icon
                        color="#7f7f7f"
                        name="chevron-right"
                        size={20}
                      />
                    )}
                  </View>
                </TouchableOpacity>
              </View>
            );
          })}
          </ScrollView>
        )}
        {sectionActive === 'Historiques' && (
          <ScrollView>
              {items.map(({ img, bedrooms, address, sqft, price, type, value }, index) => {
            return (
              <View
                key={index}
                style={[
                  styles.cardWrapper,
                  index === 0 && { borderTopWidth: 0 },
                ]}>
                <TouchableOpacity
                  onPress={() => {
                    // handle onPress
                  }}>
                  <View style={styles.card}>
                          <Image
                            alt=""
                            resizeMode="cover"
                            source={img}
                            style={styles.cardImg}
                          />
                           <View style={styles.cardBody}>
                            <Text numberOfLines={1} style={styles.cardTitle}>
                              {address}
                            </Text>

                            <View style={styles.cardRow}>
                              <View style={styles.cardRowItem}>
                                <Icon color="#173153" name="bell" size={13} />

                                <Text style={styles.cardRowItemText}>
                                  {bedrooms} Jeux
                                </Text>
                              </View>
                              <View style={styles.cardRowItem}>
                                <Icon
                                  color="#173153"
                                  name="wallet"
                                  solid={true}
                                  size={13}
                                />

                                <Text style={styles.cardRowItemText}>
                                  {sqft} 
                                </Text>
                              </View>
                            </View>

                            <Text style={styles.cardPrice}>
                              {price} Frs
                            </Text>
                          </View>
                      
                    <View style={styles.rowSpacer} />

                    {type === 'input' && (
                      <Text style={styles.rowValue}>{value}</Text>
                    )}

                    {type === 'boolean' && (
                      <Switch trackColor={{ true: COLORS.primary }} value={value} />
                    )}

                    {(type === 'input' || type === 'link') && (
                      <Icon
                        color="#7f7f7f"
                        name="chevron-right"
                        size={20}
                      />
                    )}
                  </View>
                </TouchableOpacity>
              </View>
            );
          })}
          </ScrollView>
        )}
      
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({

  menu : {
 display: 'flex',
 justifyContent: 'space-between',
 flexDirection:'row',

  },
  menuIcons:{
   right: 10, 

  },
  bgblue: {
  backgroundColor: 'rgb(234, 153, 32)', 
  color: 'white',
  padding: 10,
  borderRadius: 12,
},

/* Style normal */
textblack: {
  color: '#333',
},
  tabs: {
    padding: 16,
    flexDirection: 'row',
  },
  tab: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 10,
    paddingBottom: 10,
    position: 'relative',
    overflow: 'hidden',
  },
  tabWrapper: {
    
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    borderColor: '#e5e7eb',
    borderBottomWidth: 2,
  },
  tabText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#6b7280',
    marginLeft: 5,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    height: 50,
    paddingLeft: 24,
    paddingRight: 24,
  },
  rowWrapper: {
    borderTopWidth: 1,
    borderColor: '#e3e3e3',
  },
  rowLabel: {
    fontSize: 17,
    fontWeight: '500',
    color: '#2c2c2c',
  },
  rowValue: {
    fontSize: 15,
    fontWeight: '500',
    color: '#7f7f7f',
    marginRight: 4,
  },
  rowSpacer: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  container: {
   padding: 4,
   flexDirection: 'row',
   justifyContent: 'space-between',
   margin: 16,

  },
  content: {
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderColor: '#e3e3e3',
  },


  //  

  title: {
    fontSize: 32,
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
});