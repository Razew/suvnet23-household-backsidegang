import { NativeStackScreenProps } from '@react-navigation/native-stack';
// import { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { HomeStackParamList } from '../navigators/HomeStackNavigator';
import { container, large } from '../themes/styles';
// import { useAppDispatch, useAppSelector } from '../store/store';
// import {
//   fetchHouseholds,
//   selectAllHouseholds,
// } from '../store/households/slice';

type Props = NativeStackScreenProps<HomeStackParamList, 'Home'>;

export default function HomeScreen({ navigation }: Props) {
  // const dispatch = useAppDispatch();
  // const households = useAppSelector(selectAllHouseholds);
  // const householdsStatus = useAppSelector((state) => state.households.loading);
  // const errorMessage = useAppSelector((state) => state.households.errorMessage);

  // useEffect(() => {
  //   if (householdsStatus === 'idle') {
  //     dispatch(fetchHouseholds());
  //   }
  // }, [householdsStatus, dispatch]);

  return (
    <View style={container}>
      {/* {householdsStatus === 'pending' && <Text>Loading...</Text>}
      {householdsStatus === 'failed' && <Text>Error: {errorMessage}</Text>}
      {householdsStatus === 'succeeded' &&
        households.map((household) => (
          <View
            key={household.id}
            style={s.tempHouseholdContainer}
          >
            <Text>{household.name}</Text>
          </View>
        ))} */}
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
      <Button mode="elevated">Another Button</Button>
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
