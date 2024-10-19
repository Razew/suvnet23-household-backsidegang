import { useEffect } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import ChoreCard from '../components/ChoreCard';
import { fetchChores, selectAllChores } from '../store/chores/choresSlice';
import { useAppDispatch, useAppSelector } from '../store/store';
import { large } from '../themes/styles';

export default function HouseholdScreen() {
  const chores = useAppSelector(selectAllChores);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchChores());
  }, []);

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
