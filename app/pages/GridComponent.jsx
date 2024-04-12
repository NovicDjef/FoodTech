import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Modal } from 'react-native';
import COLORS from '../consts/colors';
import Icon from 'react-native-vector-icons/MaterialIcons';

// const emojis = {1: '😀', 2:'😍', 3:'🚀', 4:'🎉', 5:'🌟', 6:'👍', 7:'🙌', 8:'🤩', 9:'😎', 10:'❤️', 11:'👏', 12:'🎁', 13:'🌈', 14:'🔥', 15:'✨', 16:'💯', 17:'🌺', 18:'🌼', 19:'🦋'};
const emojis = ['😀', '😍', '🚀', '🎉', '🌟', '👍', '🙌', '🤩', '😎', '❤️', '👏', '🎁', '🌈', '🔥', '✨', '💯', '🌺', '🌼', '🦋'];

const GridComponent = ({navigation}) => {

  const [selectedEmojis, setSelectedEmojis] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [emojiToRandomNumber, setEmojiToRandomNumber] = useState({});
  
  const uniqueRandomNumbers = Array.from({ length: 20 }, () => {
    let randomNumber
    do {
      randomNumber = Math.floor(Math.random() * 20) + 1;
    } while (uniqueRandomNumbers.includes(randomNumber));
    return randomNumber;
  });

  const toggleEmoji = (emoji, index) => {
    if (selectedEmojis.includes(emoji)) {
      setSelectedEmojis(selectedEmojis.filter((e) => e !== emoji));
    } else {
        const randomNumber = uniqueRandomNumbers.pop();
      setSelectedEmojis([...selectedEmojis, emoji]);
      setEmojiToRandomNumber({ ...emojiToRandomNumber, [emoji]: randomNumber });
    }
  };

  const showModal = () => {
    setModalVisible(true);
  };

  const hideModal = () => {
    setModalVisible(false);
  }

  const Validation = () => {
    navigation.navigate('payement')
  }

  return (
    <ScrollView style={styles.container}>
            <View >
        <View style={styles.header}>
          <Icon
            name="arrow-back-ios"
            size={28}
            color={COLORS.dark}
            onPress={navigation.goBack}
          />
          <Icon name="bookmark-border" size={28} color={COLORS.dark} />
        
      </View>
      <View style={styles.grid}>
        {emojis.map((emoji, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.emojiContainer,
              { backgroundColor: selectedEmojis.includes(emoji) ? 'lightgray' : 'transparent' },
            ]}
            onPress={() => toggleEmoji(emoji, index)}
          >
            <Text style={styles.emoji}>
              {selectedEmojis.includes(emoji) ? emojiToRandomNumber[emoji] : emoji}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.result}>
        <Text style={{display: 'flex', textAlign: 'center'}}>Les Emojis sélectionnés corresponde a :</Text>
        <View style={styles.selectedEmojis}>
            {selectedEmojis.map((emoji, index) => (
            <Text key={index} style={styles.selectedEmoji}>
                N°: {emojiToRandomNumber[emoji]}
            </Text>
            ))}
        </View>
      </View>

      <TouchableOpacity
        style={styles.btn}
        onPress={showModal}
      >
        <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>
          Sélectionner maintenant
        </Text>
      </TouchableOpacity>


      {/* <TouchableOpacity style={styles.btn}
          onPress={() => }
         >
          <Text style={{color: COLORS.white, fontSize: 18, fontWeight: 'bold'}}>
            Selectionner maintenant 
          </Text>
        </TouchableOpacity> */}
        <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text> Vous avez sélectionnés :</Text>
           <View style={styles.selectedEmojis}>
            {selectedEmojis.map((emoji, index) => (
                <Text key={index} style={styles.selectedEmoji}>
                   N°: {emojiToRandomNumber[emoji]}
                </Text>
                ))}
           </View>
            <View style={{ flexDirection: 'row'}}>
                <TouchableOpacity
                style={styles.modalButton}
                onPress={hideModal}
                >
                <Text style={{ color: 'white', fontWeight: 'bold' }}>Annuler</Text>
                </TouchableOpacity>
                <TouchableOpacity
                style={styles.modalButton}
                onPress={() => {
                    // Continuer l'opération ici
                    Validation();
                }}
                >
                <Text style={{ color: 'white', fontWeight: 'bold' }}>Continuer</Text>
                </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 22,
   // alignItems: 'center',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
  },
  result: {
    marginTop: 20,
   
  },
  emojiContainer: {
    width: 80,
    height:80,
    margin: 5,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  selectedEmojis: {
    flexDirection: 'row',
    marginTop: 10,
  },
  emojiText: {
    fontSize: 20,
  },
  selectionContainer: {
    marginTop: 20,
  },
  selectionText: {
    fontSize: 18,
    fontWeight: 'bold',
  },

  btn: {
    height: 55,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
    backgroundColor: COLORS.primary,
    marginHorizontal: 20,
    borderRadius: 10,
  },

  header: {
    marginTop: 30,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    justifyContent: 'space-between',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  selectedEmoji: {
    fontSize: 14,
    paddingLeft: 22
    
  },
  modalButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    width: 100,
    alignItems: 'center',
    margin: 22
  },
});

export default GridComponent;
