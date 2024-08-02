import React, {memo} from 'react';
import {StyleProp, StyleSheet} from 'react-native';
//@ts-ignore
import MaterialCommunityIcons from 'react-native-vector-icons/dist/MaterialCommunityIcons';

interface IconProp {
  name: string;
  size: number;
  style: StyleProp<any>;
  color: string;
  onPress: () => void;
}

const Icon = memo(({size = 16, style, name, ...rest}: IconProp) => {
  return (
    <MaterialCommunityIcons
      name={name}
      size={size}
      style={[styles.icon, style]}
      {...rest}
    />
  );
});

const styles = StyleSheet.create({
  icon: {
    textAlign: 'center',
  },
});

export {Icon};
