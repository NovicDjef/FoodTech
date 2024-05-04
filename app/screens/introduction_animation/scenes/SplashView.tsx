import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  Animated,
  useWindowDimensions,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import MyPressable from '../../../components/MyPressable';
import { AppImages } from '../../../../assets';
import { useTranslation } from 'react-i18next';
import { COLORS } from '../../../constants';
import i18n from '../../../utils/locales/i18n';
import Icon from 'react-native-vector-icons/Ionicons';

interface Props {
  onNextClick: () => void;
  animationController: React.MutableRefObject<Animated.Value>;
}

const SplashView: React.FC<Props> = ({ onNextClick, animationController }) => {
  const window = useWindowDimensions();
  const insets = useSafeAreaInsets();

  const splashTranslateY = animationController.current.interpolate({
    inputRange: [0, 0.2, 0.8],
    outputRange: [0, -window.height, -window.height],
  });

  const introImageData = Image.resolveAssetSource(AppImages.introduction_image);
  const { t } = useTranslation()
  const [language, setLanguage] = useState(i18n.language);

  const ChangLangue = () => {
    const newLanguage = language === 'fr' ? 'en' : 'fr'; 
    i18n.changeLanguage(newLanguage);
    setLanguage(newLanguage); 
  }
  return (
    <Animated.View
      style={{ flex: 1, transform: [{ translateY: splashTranslateY }] }}
    >
      <ScrollView style={{ flexGrow: 0}} alwaysBounceVertical={false}>
        <TouchableOpacity onPress={ChangLangue} style={{}}>

      <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "flex-end", marginHorizontal: 14, top: 22}}>
        <Text style={{ fontSize: 18, fontWeight: "bold", margin: 4, color: "black" }}>
          {language === 'fr' ? 'FR' : 'ANG'}
        </Text>
        {language === 'fr' ? (
          <Image style={{width: 33, height: 33,}} source={require("../../../../assets/drapeaux/fr.png")} />
        ) : (
          <Image style={{width: 25, height: 25,}} source={require("../../../../assets/drapeaux/ag.png")} />
        )}
        </View>
        </TouchableOpacity>
      
          <Image
            style={{
              width: window.width,
              height: undefined,
              aspectRatio: introImageData
                ? introImageData.width / introImageData.height
                : 357 / 470,
            }}
            source={AppImages.introduction_image}
          />
        <Text style={styles.title}>{t("Originality")}</Text>
        <Text style={styles.subtitle}>
          {t("Wellcom_tchop")} {"\n"} {t("Text_decust")} {"\n"} {t("Continent")}
        </Text>
      </ScrollView>

      <View style={[styles.footer, { paddingBottom: 8 + insets.bottom }]}>
        <View style={styles.buttonContainer}>
          <MyPressable
            style={styles.button}
            android_ripple={{ color: 'powderblue' }}
            touchOpacity={0.6}
            onPress={() => onNextClick()}
          >
            <Text style={styles.buttonText}>{t("Let_begin")}</Text>
          </MyPressable>
        </View>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  title: {
    color: 'black',
    fontSize: 25,
    textAlign: 'center',
    fontFamily: 'WorkSans-Bold',
    paddingVertical: 8,
  },
  subtitle: {
    color: 'black',
    textAlign: 'center',
    fontSize: 16,
    fontFamily: 'WorkSans-Regular',
    paddingHorizontal: 4,
  },
  footer: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingTop: 8,
  },
  buttonContainer: {
    borderRadius: 38,
    overflow: 'hidden',
    alignSelf: 'center',
  },
  button: {
    height: 58,
    backgroundColor: COLORS.primary,
    paddingVertical: 16,
    paddingHorizontal: 56,
  },
  buttonText: {
    fontSize: 19,
    fontFamily: 'WorkSans-Regular',
    color: 'white',
  },
});

export default SplashView;
