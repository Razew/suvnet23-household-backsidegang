import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import {
  getChoresData,
  users,
  households,
  chores,
  completedChores,
} from '../mocked';
import CustomPieChart from '../components/CustomPieChart';
import { Surface } from 'react-native-paper';
import { container } from '../themes/styles';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { selectLoggedInUser } from '../store/Auth/slice';
import {
  fetchHouseholds,
  selectAllHouseholds,
} from '../store/households/slice';
import { fetchChores, selectAllChores } from '../store/chores/slice';
import { fetchAvatars, selectAvatars } from '../store/avatars/slice';
import {
  fetchChoresToUsers,
  selectChoresToUsers,
} from '../store/choreToUser/slice';
import {
  fetchUsersToHouseholds,
  selectUsersToHouseholds,
} from '../store/userToHousehold/slice';

interface StatisticsScreenProps {
  timespan: string[];
}

interface PieDataItem {
  value: number;
  color: string;
  emoji: string;
}

interface ChoreDataMap {
  [key: number]: PieDataItem[];
}

const household = households[0];
const screenWidth = Dimensions.get('window').width;
const smallChartRadius = screenWidth * 0.14;

export default function StatisticsScreen({ timespan }: StatisticsScreenProps) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchChores());
    dispatch(fetchAvatars());
    dispatch(fetchChoresToUsers());
    dispatch(fetchHouseholds());
    dispatch(fetchUsersToHouseholds());
  }, []);

  const loggedInUser = useAppSelector(selectLoggedInUser);
  const allHouseholds = useAppSelector(selectAllHouseholds);
  const allAvatars = useAppSelector(selectAvatars);
  const allChoreToUser = useAppSelector(selectChoresToUsers);
  const allUserToHousehold = useAppSelector(selectUsersToHouseholds);
  // const allChores = useAppSelector(selectAllChores);

  console.log('Logged in user: ', loggedInUser);
  console.log('selectAllHouseholds: ', allHouseholds);
  console.log('allAvatars: ', allAvatars);
  console.log('allChoreToUser: ', allChoreToUser);
  console.log('allUserToHousehold: ', allUserToHousehold);

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<PieDataItem[]>([]);
  const [choreData, setChoreData] = useState<ChoreDataMap>({});

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const choresData = getChoresData(timespan, household.id);
      const filteredData = choresData.filter((chore) => chore.completed > 0); // Filter out users with zero completed chores
      const totalData = filteredData.map((chore) => {
        const user = users.find((user) => user.name === chore.user);
        return {
          value: chore.completed,
          color: user?.color || '#000000',
          emoji: user?.emoji || '',
        };
      });

      const choreDataMap: ChoreDataMap = {};
      chores
        .filter((chore) => chore.householdId === household.id)
        .forEach((chore) => {
          const data = getChoreData(chore.id);
          choreDataMap[chore.id] = data;
        });

      setData(totalData);
      setChoreData(choreDataMap);
      setLoading(false);
    };

    fetchData();
  }, [timespan]);

  const getChoreData = (choreId: number) => {
    const choreData = completedChores.filter(
      (chore) => chore.choreId === choreId && timespan.includes(chore.date),
    );
    const userChoreCounts = users
      .filter((user) => user.householdId === household.id)
      .map((user) => {
        const completed = choreData.filter(
          (chore) => chore.userId === user.id,
        ).length;
        return {
          value: completed,
          color: user?.color || '#000000',
          emoji: user?.emoji || '',
        };
      })
      .filter((chore) => chore.value > 0);
    return userChoreCounts;
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator
          size="large"
          color="#0000ff"
        />
        <Text>Loading data...</Text>
      </View>
    );
  }

  return (
    <Surface
      style={container}
      elevation={0}
    >
      <Surface
        style={styles.totalContainer}
        elevation={0}
      >
        <CustomPieChart
          data={data}
          radius={150}
        />
      </Surface>
      <Surface
        style={styles.choresContainer}
        elevation={0}
      >
        {chores
          .filter((chore) => chore.householdId === household.id)
          .map((chore) => (
            <Surface
              key={chore.id}
              style={styles.choreChart}
              elevation={0}
            >
              <CustomPieChart
                data={choreData[chore.id]}
                radius={smallChartRadius}
              />
              <Surface
                style={styles.choreTextContainer}
                elevation={0}
              >
                <Text style={styles.choreText}>{chore.name}</Text>
              </Surface>
            </Surface>
          ))}
      </Surface>
    </Surface>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  totalContainer: {
    marginBottom: 20,
  },
  choresContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  choreChart: {
    margin: 10,
    alignItems: 'center',
  },
  choreTextContainer: {
    width: screenWidth * 0.25,
  },
  choreText: {
    marginTop: 5,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
