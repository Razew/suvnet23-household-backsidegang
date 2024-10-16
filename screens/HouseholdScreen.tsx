import { ScrollView, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import ChoreCard from '../components/ChoreCard';
import { mockedChores } from '../data/mocked';
import { large } from '../themes/styles';
import { Chore } from '../types/types';

export default function HouseholdScreen() {
  const chores: Chore[] = mockedChores;

  return (
    <ScrollView contentContainerStyle={s.root}>
      {chores.length === 0 ? (
        <Text style={large}>Household screen</Text>
      ) : (
        chores.map((chore) => (
          <ChoreCard
            key={chore.id}
            chore={chore}
          />
        ))
      )}
    </ScrollView>
  );
}

const s = StyleSheet.create({
  root: {
    padding: 15,
  },
});
