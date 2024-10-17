import React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';
import { container, large } from '../themes/styles';

export default function HouseholdScreen() {
  return (
    <View style={container}>
      <Text style={large}>Household screen</Text>
    </View>
  );
}
