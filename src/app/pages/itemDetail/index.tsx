/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/react-in-jsx-scope */
import {
  RefreshControl,
  View,
  Image,
  TouchableOpacity,
  Linking,
  FlatList,
} from 'react-native';
import {TextDefault} from '../../../components/textDefault';
import {KeyboardAvoidingScrollView} from 'react-native-keyboard-avoiding-scroll-view';
import {useEffect, useState} from 'react';
import {colors} from '../../../core/colors';
import {styles} from './styles';
import {PageHeader} from '../../../components/pageHeader';
import {
  useScreenNavigation,
  useScreenRoutes,
} from '../../../core/hooks/screenNavigation';
import {RoutesName} from '../../Routes/routesName';
import {LoadingView} from '../../../components/loadingView';
import {useGetMovieDetails} from '../../../core/services/hooks';
import LinearGradient from 'react-native-linear-gradient';
interface TorrentType {
  url: string;
  hash: string;
  quality: string;
  type: string;
  is_repack: string;
  video_codec: string;
  bit_depth: string;
  audio_channels: string;
  seeds: number;
  peers: number;
  size: string;
  size_bytes: number;
  date_uploaded: string;
  date_uploaded_unix: number;
}
interface MovieType {
  id: number | undefined;
  url: string | undefined;
  imdb_code: string;
  title: string | undefined;
  title_english: string;
  title_long: string | undefined;
  slug: string;
  year: number;
  rating: number;
  runtime: number;
  genres: Array<string>;
  summary: string;
  description_full: string;
  synopsis: string;
  yt_trailer_code: string;
  language: string;
  like_count: string | undefined;
  mpa_rating: string;
  background_image: string;
  background_image_original: string;
  small_cover_image: string;
  medium_cover_image: string;
  description_intro: string;
  large_cover_image: string;
  state: string;
  torrents: Array<TorrentType>;
  date_uploaded: string;
  date_uploaded_unix: number;
}
const ItemDetail = () => {
  //...................STATES AND CONSTANTS...................//
  const [refreshing, setRefreshing] = useState(false);
  const [movieDetails, setMovieDetails] = useState<MovieType>();

  //...................HOOKS...................//
  const {goBack} = useScreenNavigation();
  const {
    params: {movieId},
  } = useScreenRoutes<RoutesName.ITEM_DETAILS>();
  const {
    data: movieDetailData,
    refetch,
    isLoading,
  } = useGetMovieDetails(movieId);

  //...................FUNCTIONS...................//
  const onRefresh = () => {
    setRefreshing(true);
    refetch();
  };

  //...................USEEFFECTS...................//
  useEffect(() => {
    if (movieDetailData) {
      setMovieDetails(movieDetailData?.data?.movie);
      setRefreshing(false);
    }
  }, [movieDetailData, movieId]);

  //...................RENDER FUNCTIONS...................//
  const renderGenres = ({item}: any) => {
    return (
      <View
        style={[
          styles.tag,
          {
            backgroundColor: colors.tagColor,
          },
        ]}>
        <TextDefault size={9}>{item}</TextDefault>
      </View>
    );
  };

  return isLoading ? (
    <LoadingView />
  ) : (
    <KeyboardAvoidingScrollView
      refreshControl={
        <RefreshControl onRefresh={onRefresh} refreshing={refreshing} />
      }
      contentContainerStyle={[
        styles.main,
        {
          backgroundColor: colors.mainBackground,
        },
      ]}
      scrollEnabled={true}>
      {/* HEADER */}
      <PageHeader
        onBackButtonPress={goBack}
        title={
          movieDetails?.title_long?.length > 18
            ? movieDetails?.title_long?.slice(0, 18) + ' ...'
            : movieDetails?.title_long
        }
        hasBackButton
      />
      {/* HEADER */}

      {/* MOVIE COVER IMAGE */}
      <Image
        source={{uri: movieDetails?.large_cover_image}}
        style={styles.movieCoverImage}
      />
      {/* MOVIE COVER IMAGE */}

      {/* BLACK GLASS VIEW CONTAING MOVIE NAME AND RATING  */}
      <View
        style={[
          styles.blackGlassView,
          {
            backgroundColor: colors.blackGlass,
          },
        ]}>
        <View style={styles.glassLeftView}>
          <TextDefault fontFamily="Roboto-Bold" size={14}>
            {movieDetails?.title?.length > 30
              ? movieDetails?.title?.slice(0, 30) + ' ...'
              : movieDetails?.title}
          </TextDefault>
          <View style={styles.ratingWrapper}>
            <TextDefault size={14}>{movieDetails?.rating}</TextDefault>
            <Image
              source={require('./../../../assets/imdb.png')}
              style={styles.ratingIcon}
            />
            <TextDefault style={styles.marginHorizontal5} size={14}>
              {' '}
              -{' '}
            </TextDefault>

            <TextDefault style={styles.marginHorizontal5} size={14}>
              {movieDetails?.language?.toUpperCase()}
            </TextDefault>
            <Image
              source={require('./../../../assets/languages.png')}
              style={styles.langIcon}
            />
          </View>
        </View>
        <TouchableOpacity
          onPress={() => {
            Linking.openURL(movieDetails?.url ? movieDetails?.url : '');
          }}>
          <Image
            source={require('./../../../assets/play.png')}
            style={styles.playIcon}
          />
        </TouchableOpacity>
      </View>
      {/* BLACK GLASS VIEW CONTAING MOVIE NAME AND RATING  */}

      {/* GRAY VIEW CONTAINING YEAR,LINKES AND MOVIE TYPE */}
      <View
        style={[
          styles.centerView,
          {
            backgroundColor: colors.surface,
          },
        ]}>
        <View style={styles.detailBox}>
          <TextDefault color={colors.accent} fontFamily="Roboto-Bold" size={13}>
            Year
          </TextDefault>
          <TextDefault
            color={colors.reverseMainBackground}
            style={styles.marginTop10}>
            {movieDetails?.year || 'Undefined'}
          </TextDefault>
        </View>
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 1, y: 1}}
          style={[
            styles.gradLine,
            {
              backgroundColor: colors.accent,
            },
          ]}
          colors={[
            `${colors.surface}`,
            `${colors.accent}`,
            `${colors.surface}`,
          ]}
        />
        <View style={styles.detailBox}>
          <TextDefault color={colors.accent} fontFamily="Roboto-Bold" size={13}>
            MPA Rating
          </TextDefault>
          <TextDefault
            color={colors.reverseMainBackground}
            style={styles.marginTop10}>
            {movieDetails?.mpa_rating || 'Undefined'}
          </TextDefault>
        </View>
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 1, y: 1}}
          style={[
            styles.gradLine,
            {
              backgroundColor: colors.accent,
            },
          ]}
          colors={[
            `${colors.surface}`,
            `${colors.accent}`,
            `${colors.surface}`,
          ]}
        />
        <View style={styles.detailBox}>
          <TextDefault color={colors.accent} fontFamily="Roboto-Bold" size={13}>
            Likes
          </TextDefault>
          <TextDefault
            color={colors.reverseMainBackground}
            style={styles.marginTop10}>
            {movieDetails?.like_count || 'Undefined'}
          </TextDefault>
        </View>
      </View>
      {/* GRAY VIEW CONTAINING YEAR,LINKES AND MOVIE TYPE */}

      {/* MOVIE SUMMARY */}
      {movieDetails?.description_intro || movieDetails?.genres ? (
        <View
          style={[
            styles.summaryBox,
            {
              backgroundColor: colors.surface,
            },
          ]}>
          {movieDetails?.genres?.length > 0 ? (
            <TextDefault size={16} fontFamily="Roboto-Bold">
              Genres
            </TextDefault>
          ) : null}
          {movieDetails?.genres?.length > 0 ? (
            <FlatList
              style={styles.marginTop10}
              data={movieDetails?.genres}
              numColumns={4}
              renderItem={renderGenres}
            />
          ) : null}

          {movieDetails?.description_intro ? (
            <TextDefault
              style={styles.marginTop25}
              size={16}
              fontFamily="Roboto-Bold">
              Summary
            </TextDefault>
          ) : null}
          {movieDetails?.description_intro ? (
            <TextDefault fontFamily="Roboto-Light" style={styles.summary}>
              {movieDetails?.description_intro}
            </TextDefault>
          ) : null}
        </View>
      ) : null}
      {/* MOVIE SUMMARY */}
    </KeyboardAvoidingScrollView>
  );
};

export default ItemDetail;
