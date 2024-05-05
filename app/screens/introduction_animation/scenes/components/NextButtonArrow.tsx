import React, { useRef, useState } from 'react';
import { StyleSheet, Text, Animated, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import MyPressable from '../../../../components/MyPressable';
import { COLORS } from '../../../../constants';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';

interface Props {
  onBtnPress: () => void;
  animationController: React.MutableRefObject<Animated.Value>;
}

const IconPressable = Animated.createAnimatedComponent(Icon);

/*
 * TODO:- find better solution for this animation so we don't have to use 'useNativeDriver: false' in 'IntroductionAnimationScreen.tsx' as width doesn't support it yet
 */
const NextButtonArrow: React.FC<Props> = ({
  onBtnPress,
  animationController,
}) => {
  const arrowAnim = useRef<Animated.AnimatedInterpolation>(
    new Animated.Value(0),
  );

  const navigation = useNavigation();
  arrowAnim.current = animationController.current.interpolate({
    inputRange: [0, 0.2, 0.4, 0.6, 0.8],
    outputRange: [0, 0, 0, 0, 1],
  });

  // for transition from arrow to sign up
  const transitionAnim = arrowAnim.current.interpolate({
    inputRange: [0, 0.85, 1],
    outputRange: [36, 0, 0],
  });
  const opacityAnim = arrowAnim.current.interpolate({
    inputRange: [0, 0.7, 1],
    outputRange: [0, 0, 1],
  });
  const iconTransitionAnim = arrowAnim.current.interpolate({
    inputRange: [0, 0.35, 0.85, 1], // or [0, 0.85, 1],
    outputRange: [0, 0, -36, -36], // or [0, 0, -36]
  });
  const iconOpacityAnim = arrowAnim.current.interpolate({
    inputRange: [0, 0.7, 1],
    outputRange: [1, 0, 0],
  });
  // end

  const widthAnim = arrowAnim.current.interpolate({
    inputRange: [0, 1],
    outputRange: [58, 258],
  });

  const marginBottomAnim = arrowAnim.current.interpolate({
    inputRange: [0, 1],
    outputRange: [38, 0],
  });

  const radiusAnim = arrowAnim.current.interpolate({
    inputRange: [0, 1],
    outputRange: [40, 8],
  });

  const { t } = useTranslation();
  const onLoginButtonClick = () => {
    navigation.navigate('Login'); 
  };
  return (
    <Animated.View
      style={[
        styles.container,
        {
          width: widthAnim,
          borderRadius: radiusAnim,
          marginBottom: marginBottomAnim,
        },
      ]}
    >   
        <MyPressable
        style={{ flex: 1, justifyContent: 'center' }}
        android_ripple={{ color: 'darkgrey' }}
        onPress={() => onBtnPress()}
      >
        <TouchableOpacity onPress={onLoginButtonClick}>
        <Animated.View
          style={[
            styles.signupContainer,
            {
              opacity: opacityAnim,
              transform: [{ translateY: transitionAnim }],
            },
          ]}
        >
          <Text style={styles.signupText}>{t("Connexion")}</Text>
          <Icon name="arrow-forward" size={24} color="white" />
        </Animated.View>
        </TouchableOpacity>

        <IconPressable
          style={[
            styles.icon,
            {
              opacity: iconOpacityAnim,
              transform: [{ translateY: iconTransitionAnim }],
            },
          ]}
          name="arrow-forward-ios"
          size={24}
          color="white"
        />
      </MyPressable>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 58,
    backgroundColor: COLORS.primary,
    overflow: 'hidden',
  },
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  signupText: {
    fontSize: 18,
    fontFamily: 'WorkSans-Medium',
    color: 'white',
  },
  icon: {
    position: 'absolute',
    alignSelf: 'center',
  },
});

export default NextButtonArrow;
