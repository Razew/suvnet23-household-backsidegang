import { StyleSheet } from 'react-native';

export const { container, large, image } = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5, // Temporary solution to keep buttons apart
  },
  large: {
    fontSize: 24,
  },
  image: {
    width: 200,
    height: 200,
  },
});
