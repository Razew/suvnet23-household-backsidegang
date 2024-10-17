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

export const authStyles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: 'center',
  },
  container: {
    width: '80%',
    gap: 5,
  },
  logo: {
    width: '60%',
  },
  title: {
    fontSize: 16,
    fontStyle: 'normal',
  },
  input: {
    borderRadius: 10,
  },
  button: {
    marginTop: 10,
  },
  linkTextContainer: {
    flexDirection: 'row',
    marginTop: 10,
    justifyContent: 'center',
  },
  linkText: {
    color: 'blue', // If keeping the link as text, might want to set color by theme instead
    textDecorationLine: 'underline',
  },
});