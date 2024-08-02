/* eslint-disable react-native/no-inline-styles */
import React, {ReactNode} from 'react';
import {
  Dimensions,
  Image,
  Platform,
  Pressable,
  StyleProp,
  StyleSheet,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import {TextDefault} from '../textDefault';
const width = Dimensions.get('window').width;

interface Props {
  title?: string | ReactNode;
  titleStyle?: TextStyle;
  hasBackButton?: boolean;
  isHeaderAtMiddle?: boolean;
  onBackButtonPress?: () => void;
  startIcon?: ReactNode;
  onStartIconPress?: () => void;
  endIcon?: ReactNode;
  onEndIconPress?: () => void;
  endViewStyle?: StyleProp<TextStyle>;
  wrapperStyle?: StyleProp<ViewStyle>;
}

const PageHeader = ({
  title,
  titleStyle,
  hasBackButton = true,
  isHeaderAtMiddle = true,
  onBackButtonPress,
  startIcon,
  onStartIconPress,
  endIcon,
  onEndIconPress,
  endViewStyle,
  wrapperStyle,
}: Props) => {
  return (
    <View
      style={[
        styles.pageHeader,
        {
          marginTop: Platform.OS === 'ios' ? 15 : 0,
        },
        wrapperStyle,
      ]}>
      <View
        style={[
          styles.startView,
          {
            width: 100,
          },
        ]}>
        {hasBackButton ? (
          <TouchableOpacity
            onPress={() => (hasBackButton ? onBackButtonPress?.() : undefined)}
            style={styles.backView}>
            <Image
              source={require('./../../assets/left-arrow.png')}
              style={styles.backIcon}
            />
          </TouchableOpacity>
        ) : (
          <Pressable style={styles.startView} onPress={onStartIconPress}>
            {startIcon}
          </Pressable>
        )}
      </View>

      <View
        style={[
          styles.middleView,
          {alignItems: !isHeaderAtMiddle ? 'flex-start' : 'center'},
        ]}>
        {typeof title === 'string' ? (
          <TextDefault style={[styles.titleDefaultStyle, titleStyle]}>
            {title}
          </TextDefault>
        ) : (
          title
        )}
      </View>

      <Pressable
        style={[styles.endView, endViewStyle]}
        onPress={onEndIconPress}>
        {endIcon}
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  backIcon: {width: 30, height: 30},
  backView: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  pageHeader: {
    height: 50,
    width: width,
    paddingHorizontal: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  titleDefaultStyle: {
    fontSize: 15,
  },
  startView: {
    // flex: 1,
    alignItems: 'flex-start',
  },
  middleView: {
    flex: 5,
    alignItems: 'center',
  },
  endView: {
    width: 100,
    alignItems: 'flex-end',
  },
});

export {PageHeader};
