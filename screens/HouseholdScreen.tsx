import { ScrollView, StyleSheet } from 'react-native';

export default function HouseholdScreen() {
  // const chores = useAppSelector(selectActiveChoresCurrentHousehold);
  // const dispatch = useAppDispatch();

  // useEffect(() => {
  //   dispatch(fetchChores());
  // }, []);

  return (
    <ScrollView contentContainerStyle={s.root}>
      {/* {chores.length === 0 ? (
        <Text style={large}>Household screen</Text>
      ) : (
        chores.map((chore) => (
          <ChoreCard
            key={chore.id}
            chore={chore}
          />
        ))
      )} */}
    </ScrollView>
  );
}

const s = StyleSheet.create({
  root: {
    padding: 15,
  },
});
