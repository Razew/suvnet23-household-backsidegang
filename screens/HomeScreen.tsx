import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StyleSheet, View } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { HomeStackParamList } from '../navigators/HomeStackNavigator';
import { container, large } from '../themes/styles';
type Props = NativeStackScreenProps<HomeStackParamList, 'Home'>;

export default function HomeScreen({ navigation }: Props) {
  return (
    <View style={container}>
      <Text style={large}>Home screen</Text>
      <View style={s.tempHouseholdContainer}>
        <Text style={s.tempHouseholdName}>CodeDiddy Household</Text>
        <Button
          mode="elevated"
          onPress={() => navigation.replace('HouseholdScreen')}
        >
          Enter
        </Button>
      </View>
      <Button mode="elevated">Another Button</Button>
      <Button
        mode="elevated"
        onPress={() => navigation.replace('CreateHousehold')}
      >
        Create Household
      </Button>
    </View>
  );
}

const s = StyleSheet.create({
  tempHouseholdContainer: {
    marginBottom: 20,
  },
  tempHouseholdName: {
    fontSize: 18,
  },
});
