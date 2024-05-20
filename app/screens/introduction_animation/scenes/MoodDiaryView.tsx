import React, { useRef } from 'react';
import { StyleSheet, Text, Animated, useWindowDimensions } from 'react-native';
import { AppImages } from '../../../../assets';
import { useTranslation } from 'react-i18next';

interface Props {
  animationController: React.MutableRefObject<Animated.Value>;
}

const IMAGE_WIDTH = 350;
const IMAGE_HEIGHT = 250;

const MoodDiaryView: React.FC<Props> = ({ animationController }) => {
  const window = useWindowDimensions();
  const { t } = useTranslation();

  const slideAnim = animationController.current.interpolate({
    inputRange: [0, 0.4, 0.6, 0.8],
    outputRange: [window.width, window.width, 0, -window.width],
    extrapolate: 'clamp',
  });

  const textAnim = animationController.current.interpolate({
    inputRange: [0, 0.4, 0.6, 0.8],
    outputRange: [window.width * 2, window.width * 2, 0, -window.width * 2],
    extrapolate: 'clamp',
  });

  const imageAnim = animationController.current.interpolate({
    inputRange: [0, 0.4, 0.6, 0.8],
    outputRange: [IMAGE_WIDTH * 4, IMAGE_WIDTH * 4, 0, -IMAGE_WIDTH * 4],
    extrapolate: 'clamp',
  });

  return (
    <Animated.View style={[styles.container, { transform: [{ translateX: slideAnim }] }]}>
      <Text style={styles.title} ref={useRef(null)}>
        {t("life_simplify")}
      </Text>
      <Animated.Text style={[styles.subtitle, { transform: [{ translateX: textAnim }] }]}>
        {t("Text_life")}
      </Animated.Text>
      <Animated.Image style={[styles.image, { transform: [{ translateX: imageAnim }] }]} source={AppImages.mood_dairy_image} />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    alignItems: 'center',
    paddingTop: 100,
  },
  title: {
    color: 'black',
    fontSize: 26,
    textAlign: 'center',
    fontFamily: 'WorkSans-Bold',
  },
  subtitle: {
    color: 'black',
    textAlign: 'center',
    fontFamily: 'WorkSans-Regular',
    paddingHorizontal: 64,
    paddingVertical: 16,
  },
  image: {
    maxWidth: IMAGE_WIDTH,
    maxHeight: IMAGE_HEIGHT,
  },
});

export default MoodDiaryView;
