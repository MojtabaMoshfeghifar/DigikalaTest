import {Dimensions, StyleSheet} from 'react-native';
const width = Dimensions.get('window').width;

export const styles = StyleSheet.create({
  marginTop25: {
    marginTop: 25,
  },
  tag: {
    paddingHorizontal: 15,
    height: 20,
    borderRadius: 1000,
    marginHorizontal: 5,
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  gradLine: {width: 1, alignSelf: 'center', height: '80%'},
  summary: {marginTop: 10, lineHeight: 25},
  summaryBox: {
    width: '90%',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    padding: 15,
    borderRadius: 15,
    marginTop: 20,
    marginBottom: 25,
  },
  marginTop10: {marginTop: 10},
  detailBox: {
    width: '33%',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  centerView: {
    width: '90%',
    height: 80,
    marginTop: 20,
    borderRadius: 1000,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  playIcon: {width: 50, height: 50},
  marginHorizontal5: {marginHorizontal: 5},
  ratingIcon: {width: 25, height: 25, marginHorizontal: 5},
  langIcon: {width: 20, height: 20},
  ratingWrapper: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    marginTop: 10,
  },
  glassLeftView: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  blackGlassView: {
    width: '90%',
    height: 100,
    borderRadius: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 25,
    position: 'absolute',
    top: width - 70,
  },
  main: {
    flexGrow: 1,
    alignItems: 'center',
  },
  movieCoverImage: {width: width, aspectRatio: 1},
});
