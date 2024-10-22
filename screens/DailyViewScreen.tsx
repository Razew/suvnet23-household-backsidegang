import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function DailyViewScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Daily View Screen</Text>
      {/* Add your list of chores and completed chores here */}
    </View>
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
