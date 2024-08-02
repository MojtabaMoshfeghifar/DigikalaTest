/* eslint-disable react-native/no-inline-styles */
import LottieView from 'lottie-react-native';
import React from 'react';
import {StyleProp, StyleSheet, View, ViewStyle} from 'react-native';

interface Props {
  style?: StyleProp<ViewStyle>;
}

const LoadingView = ({style}: Props) => {
  return (
    <View style={[styles.centeredView, style]}>
      <LottieView
        source={require('./../../assets/loading.json')}
        style={{width: 200, height: 200}}
        loop
        autoPlay
      />
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000910',
    flex: 1,
  },
  indicatorWrapper: {
    alignItems: 'center',
    justifyContent: 'center',

    shadowOffset: {width: 5, height: 5},
    shadowOpacity: 4,
    shadowRadius: 10,
    elevation: 6,
  },
});

export {LoadingView};
