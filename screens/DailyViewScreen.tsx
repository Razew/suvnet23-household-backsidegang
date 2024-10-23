import React from 'react';
import { StyleSheet } from 'react-native';
import { Surface, Text } from 'react-native-paper';
import { container } from '../themes/styles';

export default function DailyViewScreen() {
  return (
    <Surface
      style={container}
      elevation={0}
    >
      <Text style={styles.text}>Daily View Screen</Text>
    </Surface>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
  },
});
