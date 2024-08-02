/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/react-in-jsx-scope */
import {Platform, StyleSheet, View} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {WithSplashScreen} from '../../components/splashScreen';
import MainRoutes from '../Routes';
import {colors} from '../../core/colors';

const AppContainer = () => {
  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: colors.reverseMainBackground,
        },
      ]}>
      {Platform.OS === 'android' ? null : <View style={styles.fakeBox} />}
      <GestureHandlerRootView style={styles.flexOne}>
        <WithSplashScreen isAppReady={true} component={<MainRoutes />} />
      </GestureHandlerRootView>
      {Platform.OS === 'android' ? null : <View style={styles.fakeBox} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {width: '100%', height: '100%'},
  flexOne: {
    flex: 1,
  },
  fakeBox: {width: '100%', height: 28},
});

export default AppContainer;
