import React from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
import {cardShadow, colors} from '../theme';

export default function Card({children, style, onPress}) {
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
