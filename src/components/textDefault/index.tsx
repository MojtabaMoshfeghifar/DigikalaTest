import React, {memo} from 'react';
import {
  Text as RNText,
  TextProps as RNTextProps,
  TextStyle,
} from 'react-native';

export interface TextProps extends RNTextProps {
  children?: any;
  color?: TextStyle['color'];
  size?: TextStyle['fontSize'];
  weight?: TextStyle['fontWeight'];
  fontFamily?: TextStyle['fontFamily'];
}

const TextDefault = memo(
  ({children, size, color, weight, style, fontFamily, ...rest}: TextProps) => {
    return (
      <RNText
        {...rest}
        style={[
          // eslint-disable-next-line react-native/no-inline-styles
          {
            color: color || 'white',
            textAlign: 'left',
            fontFamily: fontFamily || 'Roboto-Regular',
            fontSize: size || 12,
            fontVariant: ['tabular-nums'],
            fontWeight: weight,
          },
          style,
        ]}>
        {children}
      </RNText>
    );
  },
);

export {TextDefault};
