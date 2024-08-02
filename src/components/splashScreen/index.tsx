/* eslint-disable curly */
/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useRef, useState} from 'react';
import {Animated, Dimensions, View} from 'react-native';
import LottieView from 'lottie-react-native';
import NetInfo from '@react-native-community/netinfo';
import {TextDefault} from '../textDefault';
import {ModalAnimated} from '../animatedModal';
import {styles} from './styles';
const width = Dimensions.get('window').width;
enum SplashStatus {
  LOADING_IMAGE = 'Loading image',
  FADE_IN_IMAGE = 'Fade in image',
  WAIT_FOR_APP_TO_BE_READY = 'Wait for app to be ready',
  FADE_OUT = 'Fade out',
  HIDDEN = 'Hidden',
}

export const Splash = ({isAppReady}: {isAppReady: boolean}) => {
  const imageOpacity = useRef(new Animated.Value(0)).current;
  const containerOpacity = useRef(new Animated.Value(1)).current;
  const [state, setState] = useState<SplashStatus>(SplashStatus.LOADING_IMAGE);
  useEffect(() => {
    if (state === SplashStatus.FADE_IN_IMAGE) {
      Animated.timing(imageOpacity, {
        toValue: 1,
        duration: 1000, // Fade in duration
        useNativeDriver: true,
      }).start(() => {
        setState(SplashStatus.WAIT_FOR_APP_TO_BE_READY);
      });
    }
  }, [imageOpacity, state]);

  useEffect(() => {
    if (state === SplashStatus.WAIT_FOR_APP_TO_BE_READY) {
      if (isAppReady) {
        setState(SplashStatus.FADE_OUT);
      }
    }
  }, [isAppReady, state]);

  useEffect(() => {
    if (state === SplashStatus.FADE_OUT) {
      Animated.timing(containerOpacity, {
        toValue: 0,
        duration: 1000, // Fade out duration
        delay: 1000, // Minimum time the logo will stay visible
        useNativeDriver: true,
      }).start(() => {
        setState(SplashStatus.HIDDEN);
      });
    }
  }, [containerOpacity, state]);

  if (state === SplashStatus.HIDDEN) return null;

  return (
    <Animated.View
      collapsable={false}
      style={[
        styles.container,
        {
          opacity: containerOpacity,
        },
      ]}>
      <Animated.Image
        source={require('./../../assets/Digikala_smile_red.svg.png')}
        fadeDuration={0}
        onLoad={() => {
          setState(SplashStatus.FADE_IN_IMAGE);
        }}
        style={[styles.image, {opacity: imageOpacity}]}
        resizeMode="contain"
      />
    </Animated.View>
  );
};

export const WithSplashScreen = ({
  component,
  isAppReady,
}: {
  isAppReady: boolean;
  component: React.ReactNode;
}) => {
  const [netStatus, setNetStatus] = useState(false);
  useEffect(() => {
    NetInfo.fetch().then(state => {
      setNetStatus(state.isConnected !== null ? !state.isConnected : false);
    });
  }, []);

  const closeNetErrorModal = () => {
    setNetStatus(false);
  };

  return (
    <>
      {isAppReady && component}
      <Splash isAppReady={isAppReady} />
      {netStatus && (
        <ModalAnimated
          modalWidth={width * 0.9}
          modalHeight={300}
          modalStyle={{backgroundColor: 'white'}}
          visible={netStatus}
          onClose={closeNetErrorModal}>
          <View
            style={[
              styles.modal,
              {
                backgroundColor: 'white',
              },
            ]}>
            <View style={styles.lottiView}>
              <LottieView
                autoPlay={true}
                speed={1}
                loop={true}
                style={styles.lotti}
                source={require('./../../assets/no-wifi.png')}
              />
              <TextDefault style={styles.checknetText}>
                No Internet Connection
              </TextDefault>
            </View>
          </View>
        </ModalAnimated>
      )}
    </>
  );
};
