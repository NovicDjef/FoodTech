import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';

const NUMBERS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 
                 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 
                 21, 22, 23, 24, 25, 26, 27, 28, 29, 30]; // Les numéros possibles
const WINNER = 15; // Le numéro gagnant défini de base
const SPEED = 100; // La vitesse de défilement en millisecondes
const SIZE = 6; // La taille du tableau

const Animation = () => {
  const [numbers, setNumbers] = useState([]); // Les numéros affichés dans le tableau
  const [winner, setWinner] = useState(null); // Le numéro gagnant trouvé
  const [spinAnim, setSpinAnim] = useState(new Animated.Value(0)); // La valeur de l'animation

  // Cette fonction génère un tableau de numéros aléatoires
  const generateRandomNumbers = () => {
    let randomNumbers = [];
    for (let i = 0; i < SIZE; i++) {
      let randomIndex = Math.floor(Math.random() * NUMBERS.length);
      randomNumbers.push(NUMBERS[randomIndex]);
    }
    return randomNumbers;
  };

  // Cette fonction vérifie si le numéro gagnant est dans le tableau
  const checkWinner = () => {
    if (numbers.includes(WINNER)) {
      setWinner(WINNER);
    }
  };

  // Cette fonction anime le défilement du tableau
  const spin = () => {
    setSpinAnim(new Animated.Value(0));
    Animated.timing(spinAnim, {
      toValue: 1,
      duration: SPEED,
      useNativeDriver: true,
    }).start(() => {
      setNumbers(generateRandomNumbers());
      if (winner === null) {
        spin();
      }
    });
  };

  // Cette fonction démarre l'animation au montage du composant
  useEffect(() => {
    spin();
  }, []);

  // Cette fonction vérifie le gagnant à chaque mise à jour du tableau
  useEffect(() => {
    checkWinner();
  }, [numbers]);

  // Cette fonction rend le texte du numéro avec une couleur différente si c'est le gagnant
  const renderNumber = (number) => {
    return (
      <Text style={[styles.number, number === winner ? styles.winner : null]}>
        {number}
      </Text>
    );
  };

  // Cette fonction rend le tableau des numéros avec une animation de rotation
  const renderNumbers = () => {
    const spinInterpolate = spinAnim.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '360deg'],
    });
    const spinStyle = {
      transform: [{ rotate: spinInterpolate }],
    };
    return (
      <Animated.View style={[styles.numbers, spinStyle]}>
        {numbers.map((number, index) => (
          <View key={index} style={styles.numberContainer}>
            {renderNumber(number)}
          </View>
        ))}
      </Animated.View>
    );
  };

  // Cette fonction rend le message du gagnant si il y en a un
  const renderMessage = () => {
    if (winner !== null) {
      return <Text style={styles.message}>Félicitations ! Vous avez gagné le numéro {winner} !</Text>;
    }
  };

  return (
    <View style={styles.container}>
      {renderNumbers()}
      {renderMessage()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  numbers: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  numberContainer: {
    margin: 10,
    padding: 10,
    borderWidth: 2,
    borderColor: '#000',
    borderRadius: 10,
  },
  number: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
  winner: {
    color: '#f00',
  },
  message: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#f00',
    marginTop: 20,
  },
});

export default Animation;