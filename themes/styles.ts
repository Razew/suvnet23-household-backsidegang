import { StyleSheet } from 'react-native';

export const { container, large } = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5, // Temporary solution to keep buttons apart
  },
  large: {
    fontSize: 24,
  },
});
