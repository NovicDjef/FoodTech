import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Animated, {
  Easing,
  useSharedValue,
  withSpring,
  withTiming,
  useAnimatedStyle,
  withRepeat,
  withSequence,
} from 'react-native-reanimated';
import COLORS from '../consts/colors';
const numOptions = 20; // Nombre d'options de numéro
const winningNumber = Math.floor(Math.random() * numOptions) + 1; // Numéro gagnant aléatoire

const AnimationJeux = () => {

  const rotation = useSharedValue(0);
  const [isSpinning, setIsSpinning] = useState(false);

  const startSpin = () => {
    rotation.value = withSequence(
      withTiming(360, { duration: 2000, easing: Easing.linear }),
      withTiming(360, { duration: 1000, easing: Easing.linear }),
      withTiming(360, { duration: 500, easing: Easing.linear }),
      withSpring(0, { damping: 2, stiffness: 80 })
    );

    setTimeout(() => {
      setIsSpinning(false);
    }, 3500);
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: `${rotation.value}deg` }],
    };
  });

  return (
    
    <View style={styles.container}>
      <Animated.View style={[styles.wheel, animatedStyle]}>
        {Array.from({ length: numOptions }).map((_, index) => (
          <Text
            key={index}
            style={[
              styles.number,
              index === winningNumber - 1 ? styles.winningNumber : null,
            ]}
          >
            {index + 1}
          </Text>
        ))}
      </Animated.View>
      <TouchableOpacity
        style={styles.button}
        disabled={isSpinning}
        onPress={() => {
          setIsSpinning(true);
          startSpin();
        }}
      >
        <Text>Start</Text>
      </TouchableOpacity>
      {isSpinning ? (
        <Text style={styles.result}>Spinning...</Text>
      ) : (
        <Text style={styles.result}>
          Winning Number: {winningNumber}
        </Text>
      )}
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  wheel: {
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: 'lightgray',
    alignItems: 'center',
    justifyContent: 'center',
  },
  number: {
    fontSize: 120,
    fontWeight: 'bold',
    position: 'absolute',
    transform: [{ rotate: '0deg' }],
  },
  winningNumber: {
    color: 'green',
  },
  button: {
    marginTop: 20,
    padding: 10,
    backgroundColor: COLORS.primary,
    borderRadius: 5,
  },
  result: {
    marginTop: 20,
    fontSize: 18,
  },
});

export default AnimationJeux;


// import React, { useState, useRef, useEffect } from 'react';
// import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

// const numOptions = 20;
// const winningNumber = Math.floor(Math.random() * numOptions) + 1;

// const AnimationJeux = () => {
//   const [isSpinning, setIsSpinning] = useState(false);
//   const [result, setResult] = useState(null);

//   const spinIntervalRef = useRef(null);

//   useEffect(() => {
//     if (isSpinning) {
//       spinIntervalRef.current = setInterval(() => {
//         setResult(Math.floor(Math.random() * numOptions) + 1);
//       }, 100);
//     } else {
//       clearInterval(spinIntervalRef.current);
//       setTimeout(() => {
//         setResult(winningNumber);
//       }, 3000);
//     }

//     return () => {
//       clearInterval(spinIntervalRef.current);
//     };
//   }, [isSpinning]);

//   const startSpin = () => {
//     setIsSpinning(true);
//     setTimeout(() => {
//       setIsSpinning(false);
//     }, 3000);
//   };

//   return (
//     <View style={styles.container}>
//       <View style={styles.wheel}>
//         <Text style={styles.resultText}>
//           {isSpinning ? result || 'Spinning...' : `Winning Number: ${result}`}
//         </Text>
//       </View>
//       <TouchableOpacity
//         style={styles.button}
//         disabled={isSpinning}
//         onPress={startSpin}
//       >
//         <Text>Start</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   wheel: {
//     width: 200,
//     height: 200,
//     borderRadius: 100,
//     backgroundColor: 'lightgray',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   resultText: {
//     fontSize: 18,
//   },
//   button: {
//     marginTop: 20,
//     padding: 10,
//     backgroundColor: 'blue',
//     borderRadius: 5,
//   },
// });

// export default AnimationJeux;

