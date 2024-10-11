import { StyleSheet, Text, View } from 'react-native';

export default function HouseholdScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.large}>Household screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  large: {
    fontSize: 24,
  },
});
