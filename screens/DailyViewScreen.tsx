import React from 'react';
import { StyleSheet } from 'react-native';
import { Surface, Text } from 'react-native-paper';

export default function DailyViewScreen() {
  return (
    <Surface
      style={styles.container}
      elevation={0}
    >
      <Text style={styles.text}>Daily View Screen</Text>
      {/* Add your list of chores and completed chores here */}
    </Surface>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
  },
});
