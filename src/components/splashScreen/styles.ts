import {Dimensions, StyleSheet} from 'react-native';
const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

export const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#121212',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: height < 600 ? 200 : 250,
    height: height < 600 ? (200 * 2) / 3 : (250 * 2) / 3,
  },
  checknetText: {textAlign: 'center', width: '90%', marginTop: 15},
  lotti: {
    width: height < 600 ? 150 : 200,
    height: height < 600 ? 150 : 200,
  },
  lottiView: {
    justifyContent: 'flex-start',
    width: '90%',
    alignItems: 'center',
  },
  modal: {
    width: width * 0.9,
    aspectRatio: 1,
    alignSelf: 'center',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 10,
  },
});
