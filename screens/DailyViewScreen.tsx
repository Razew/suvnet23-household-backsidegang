import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import ChoreCard from '../components/ChoreCard';
import { selectActiveChoresCurrentHousehold } from '../store/combinedSelectors';
import { useAppSelector } from '../store/hooks';
import { large } from '../themes/styles';

export default function DailyViewScreen() {
  const chores = useAppSelector(selectActiveChoresCurrentHousehold);
  // const navigation =
  //   useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  // const dispatch = useAppDispatch();

  // useEffect(() => {
  //   dispatch(fetchChores());
  // }, []);

  return (
    <View style={s.cardsContainer}>
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
    </View>
  );
}

const s = StyleSheet.create({
  cardsContainer: {
    padding: 15,
    flex: 1,
  },
});
