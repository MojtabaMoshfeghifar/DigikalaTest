/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/react-in-jsx-scope */
import {
  TouchableOpacity,
  View,
  Image,
  Dimensions,
  FlatList,
  Keyboard,
  RefreshControl,
} from 'react-native';
import {TextDefault} from '../../../components/textDefault';
import {useScreenNavigation} from '../../../core/hooks/screenNavigation';
import {LoadingView} from '../../../components/loadingView';
import {useEffect, useState} from 'react';
import {TextInput} from 'react-native-gesture-handler';
import Carousel from 'react-native-snap-carousel';
import {KeyboardAvoidingScrollView} from 'react-native-keyboard-avoiding-scroll-view';
import {RoutesName} from '../../Routes/routesName';
import {styles} from './styles';
import {colors} from '../../../core/colors';
import {useGetMovies} from '../../../core/services/hooks';
import LinearGradient from 'react-native-linear-gradient';
const width = Dimensions.get('window').width;
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
  id: number;
  url: string;
  imdb_code: string;
  title: string;
  title_english: string;
  title_long: string;
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
  mpa_rating: string;
  background_image: string;
  background_image_original: string;
  small_cover_image: string;
  medium_cover_image: string;
  large_cover_image: string;
  state: string;
  torrents: Array<TorrentType>;
  date_uploaded: string;
  date_uploaded_unix: number;
}

const ListOfItems = () => {
  //...................STATES AND CONSTANTS...................//
  const [refreshing, setRefreshing] = useState(false);
  const [data, setData] = useState<MovieType[]>([]);
  const [movies, setMovies] = useState<MovieType[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [carouselData, setCarouselData] = useState([]);

  //...................HOOKS...................//
  const {navigate} = useScreenNavigation();
  const {data: moviesData, isLoading} = useGetMovies();

  //...................FUNCTIONS...................//
  const onRefresh = () => {
    setRefreshing(true);
    console.log('hi');
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };
  const navigateToDetailScreen = (movieTitle: string) => {
    navigate(RoutesName.ITEM_DETAILS, {movieId: movieTitle});
  };
  const cleanInput = () => {
    setSearchTerm('');
    Keyboard.dismiss();
  };

  //...................USEEFFECTS...................//
  useEffect(() => {
    if (moviesData) {
      setData(moviesData?.data?.movies);
      setMovies(moviesData?.data?.movies);
      setCarouselData(moviesData?.data?.movies?.slice(0, 6));
    }
  }, [moviesData]);
  useEffect(() => {
    if (searchTerm !== '') {
      const searchedMovies = data?.filter?.(item => {
        return (
          item?.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item?.title_english
            ?.toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          item?.title_long?.toLowerCase().includes(searchTerm.toLowerCase())
        );
      });
      setMovies(searchedMovies);
    } else {
      setMovies(data);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm]);

  //...................RENDER FUNCTIONS...................//
  const renderMovies = ({item}: any) => (
    <TouchableOpacity
      onPress={() => {
        navigateToDetailScreen(item?.id?.toString());
      }}
      key={item?.id}
      style={[
        styles.movieItem,
        {
          borderColor: colors.borderColor,
        },
      ]}>
      {item?.large_cover_image ? (
        <Image
          style={styles.movieImage}
          source={{uri: item?.large_cover_image}}
        />
      ) : null}
      <TextDefault color={'white'} style={styles.movieTitle} size={11}>
        {item?.title?.length > 25
          ? item?.title?.slice(0, 25) + ' ...'
          : item?.title}
      </TextDefault>
      <View style={styles.detailRow}>
        <View style={styles.row}>
          <Image
            source={require('./../../../assets/calendar.png')}
            style={styles.calendarIcon}
          />
          <TextDefault size={11}>{item?.year}</TextDefault>
        </View>

        <View style={styles.row}>
          <Image
            source={require('./../../../assets/imdb.png')}
            style={styles.starIcon}
          />
          <TextDefault style={styles.marginHorizontal5} size={12}>
            {item?.rating}
          </TextDefault>
        </View>
      </View>
      <FlatList numColumns={2} renderItem={renderGenres} data={item?.genres} />
      <TextDefault
        fontFamily="Roboto-Light"
        color={colors.accent}
        style={styles.summary}
        size={9}>
        {item?.summary
          ? item?.summary?.slice(0, 120) + ' ...'
          : 'No summary provided for this movie'}
      </TextDefault>
    </TouchableOpacity>
  );
  const renderCarousel = ({item}: any) => {
    return item?.large_cover_image !== '' ? (
      <TouchableOpacity
        onPress={() => {
          navigateToDetailScreen(item?.id?.toString());
        }}
        style={styles.carouselItem}>
        <Image
          source={{uri: item?.large_cover_image}}
          style={styles.carouselItem}
        />
        <LinearGradient
          start={{x: 0, y: 1}}
          end={{x: 0, y: 0}}
          colors={[`${colors.mainBackground}`, `${colors.transparent}`]}
          style={styles.gradLine}>
          <TextDefault>{item?.title}</TextDefault>
        </LinearGradient>
      </TouchableOpacity>
    ) : null;
  };
  const renderGenres = ({item}: any) => {
    return (
      <View
        style={[
          styles.tag,
          {
            backgroundColor: colors.tagColor,
          },
        ]}>
        <TextDefault size={8}>{item}</TextDefault>
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
      {/* TOP ROW CONTAINING SEARCH INPUT AND LOGO */}
      <View style={styles.topHeaderWrapper}>
        <View
          style={[
            styles.topInputWrapper,
            {
              borderColor: colors.borderColor,
            },
          ]}>
          <TextInput
            value={searchTerm}
            placeholderTextColor={'#202930'}
            onChangeText={text => {
              setSearchTerm(text);
            }}
            placeholder="Search ..."
            style={styles.searchInput}
          />
          <TouchableOpacity onPress={cleanInput} style={styles.cross}>
            <Image
              source={
                searchTerm
                  ? require('./../../../assets/close.png')
                  : require('./../../../assets/search.png')
              }
              style={searchTerm ? styles.crossImage : styles.searchImage}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.mainIconWrapper}>
          <View style={styles.marginHorizontal10}>
            <TextDefault fontFamily="Roboto-Bold">Movie</TextDefault>
            <TextDefault fontFamily="Roboto-Bold">star</TextDefault>
          </View>
          <Image
            style={styles.popcornImage}
            source={require('./../../../assets/popcorn.png')}
          />
        </View>
      </View>
      {/* TOP ROW CONTAINING SEARCH INPUT AND LOGO */}

      {/* LAST WEEK MOVIES TITLE */}
      <TextDefault fontFamily="Roboto-Bold" style={styles.titles} size={16}>
        Last week movies
      </TextDefault>
      {/* LAST WEEK MOVIES TITLE */}

      {/* CAROUSEL */}
      <View style={styles.carouselWrapper}>
        <Carousel
          data={carouselData}
          autoplay
          style={styles.carousel}
          renderItem={renderCarousel}
          sliderWidth={width}
          itemWidth={width * 0.7}
          scrollEnabled={false}
          loop
        />
      </View>
      {/* CAROUSEL */}

      {/* TOP MOVIES TITLE */}
      <TextDefault fontFamily="Roboto-Bold" style={styles.titles} size={14}>
        Top Movies
      </TextDefault>
      {/* TOP MOVIES TITLE */}

      {/* MOVIES FLATLIST */}
      {movies?.length > 0 ? (
        <FlatList
          numColumns={2}
          data={movies}
          style={styles.marginBottom25}
          renderItem={renderMovies}
        />
      ) : null}
      {/* MOVIES FLATLIST */}

      {/* NO CONTENT FOR SEARCH RESULTS */}
      {searchTerm && movies?.length === 0 ? (
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <Image
            source={require('./../../../assets/no-content.png')}
            style={styles.noContentImage}
          />
          <TextDefault style={styles.marginTop10}>No results found</TextDefault>
        </View>
      ) : null}
      {/* NO CONTENT FOR SEARCH RESULTS */}
    </KeyboardAvoidingScrollView>
  );
};

export default ListOfItems;
