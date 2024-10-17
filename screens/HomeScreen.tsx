import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StyleSheet, View } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { HomeStackParamList } from '../navigators/HomeStackNavigator';
import { container, large } from '../themes/styles';

type Props = NativeStackScreenProps<HomeStackParamList, 'Home'>;

export default function HomeScreen({ navigation }: Props) {
  //
  return (
    <View style={container}>
      <Text style={large}>Home screen</Text>
      <View style={s.tempHouseholdContainer}>
        <Text style={s.tempHouseholdName}>CodeDiddy Household</Text>
        <Button
          mode="elevated"
          onPress={() => navigation.replace('HouseholdNavigator')}
        >
          Enter
        </Button>
      </View>
      <Button
        mode="elevated"
        onPress={() => navigation.navigate('JoinHousehold')}
      >
        Join Household
      </Button>
      <Button
        mode="elevated"
        onPress={() => navigation.navigate('CreateHousehold')}
      >
        Create Household
      </Button>
    </View>
  );
}

// TEMPORARY
const s = StyleSheet.create({
  tempHouseholdContainer: {
    marginTop: 20,
    marginBottom: 50,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  tempHouseholdName: {
    fontSize: 18,
  },
});
