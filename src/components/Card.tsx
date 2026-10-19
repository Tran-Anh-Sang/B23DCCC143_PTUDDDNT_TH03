import React, {type ReactNode} from 'react';
import {Pressable, StyleSheet, View, type StyleProp, type ViewStyle} from 'react-native';
import {cardShadow, colors} from '../theme';

interface Props {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
  onPress?: () => void;
}

export default function Card({children, style, onPress}: Props) {
  if (onPress) {
    return (
      <Pressable
        onPress={onPress}
        style={({pressed}) => [styles.card, style, pressed && styles.pressed]}>
        {children}
      </Pressable>
    );
  }
  return <View style={[styles.card, style]}>{children}</View>;
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.card,
    borderRadius: 14,
    padding: 14,
    ...cardShadow,
  },
  pressed: {opacity: 0.85},
});
