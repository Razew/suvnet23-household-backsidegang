import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import CustomPieChart from '../components/CustomPieChart';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { fetchAvatars, selectAvatars } from '../store/avatars/slice';
import { fetchChores, selectChores } from '../store/chores/slice';
import {
  fetchChoresToUsers,
  selectChoresToUsers,
} from '../store/choreToUser/slice';
import {
  fetchHouseholds,
  selectAllHouseholds,
} from '../store/households/slice';
import {
  fetchUsersToHouseholds,
  selectUsersToHouseholds,
} from '../store/userToHousehold/slice';
import {
  User,
  PieDataItem,
  Chore,
  Household,
  Avatar,
  User_To_Household,
  Chore_To_User,
} from '../types/types';

interface StatisticsScreenProps {
  timespan: string[];
}

const screenWidth = Dimensions.get('window').width;
const smallChartRadius = screenWidth * 0.15;

export default function StatisticsScreen({ timespan }: StatisticsScreenProps) {
  const dispatch = useAppDispatch();

  // Fetch all necessary data
  useEffect(() => {
    dispatch(fetchHouseholds());
    dispatch(fetchChores());
    dispatch(fetchAvatars());
    dispatch(fetchChoresToUsers());
    dispatch(fetchUsersToHouseholds());
  }, [dispatch]);

  const allHouseholds = useAppSelector(selectAllHouseholds);
  const allChores = useAppSelector(selectChores);
  const allAvatars = useAppSelector(selectAvatars);
  const allChoreToUsers = useAppSelector(selectChoresToUsers);
  const allUserToHouseholds = useAppSelector(selectUsersToHouseholds);

  const loggedInUser: User = { id: 53, username: 'Anna', password: '1234' };

  const [loading, setLoading] = useState(true);
  const [chartData, setChartData] = useState<PieDataItem[]>([]);
  const [topChoresData, setTopChoresData] = useState<
    { name: string; chartData: PieDataItem[] }[]
  >([]);
  const userHouseholds = allUserToHouseholds.filter(
    (userToHousehold) => userToHousehold.user_id === loggedInUser.id,
  );
  let householdChores: Chore[] = [];
  let currentHouseholdUsers: User_To_Household[] = [];
  let completedChores: Chore_To_User[] = [];

  const household = userHouseholds[0];

  useEffect(() => {
    const fetchData = async () => {
      household
        ? console.log('household found for the user')
        : console.log('No household found for the user');

      setLoading(true);

      // Filter household-specific chores and users
      if (allChores.length < 1) {
        console.log('No chores found');
      } else {
        householdChores = allChores.filter((chore) => {
          return household
            ? chore.household_id === household.household_id
            : false;
        });
      }
      if (allUserToHouseholds.length < 1) {
        console.log('No userToHouseholds found');
      } else {
        currentHouseholdUsers = allUserToHouseholds.filter(
          (userToHousehold) =>
            userToHousehold.household_id === household.household_id,
        );
      }

      if (householdChores.length < 1) {
        console.log('No chores found for the household');
      } else {
        completedChores = allChoreToUsers.filter(
          (choreToUser) =>
            choreToUser.is_completed &&
            householdChores.some(
              (chore) => chore.id === choreToUser.chore_id,
            ) &&
            timespan.includes(choreToUser.done_date.slice(0, 10)),
        );
      }
      // Aggregated data for all chores
      const aggregatedChartData: PieDataItem[] = currentHouseholdUsers
        .map((userToHousehold) => {
          const userCompletedChores = completedChores.filter(
            (choreToUser) => choreToUser.user_id === userToHousehold.user_id,
          ).length;
          const avatar = allAvatars.find(
            (avatar) => avatar.id === userToHousehold.avatar_id,
          );

          return {
            value: userCompletedChores,
            color: avatar?.colour_code || '#000000',
            emoji: avatar?.emoji || '',
          };
        })
        .filter((item) => item.value > 0); // Exclude users with zero completed chores

      // Calculate top 6 most completed chores
      const choreCounts: { [key: number]: number } = {};
      completedChores.forEach((choreToUser) => {
        if (choreCounts[choreToUser.chore_id] === undefined) {
          choreCounts[choreToUser.chore_id] = 1;
        } else {
          choreCounts[choreToUser.chore_id]++;
        }
      });

      const topChores = Object.entries(choreCounts)
        // .filter(([_, count]) => count > 0)
        .sort((a, b) => b[1] - a[1])
        .map(([choreId]) => parseInt(choreId));
      console.log(topChores);
      // Data for each top chore
      const topChoresWithData = topChores.map((choreId) => {
        const choreData: PieDataItem[] = currentHouseholdUsers
          .map((userToHousehold) => {
            const userCompletedChores = completedChores.filter(
              (choreToUser) =>
                choreToUser.user_id === userToHousehold.user_id &&
                choreToUser.chore_id === choreId,
            ).length;
            const avatar = allAvatars.find(
              (avatar) => avatar.id === userToHousehold.avatar_id,
            );

            return {
              value: userCompletedChores,
              color: avatar?.colour_code || '#000000',
              emoji: avatar?.emoji || '',
            };
          })
          .filter((item) => item.value > 0);

        const choreName =
          allChores.find((chore) => chore.id === choreId)?.name ||
          'Unknown Chore';

        return { name: choreName, chartData: choreData };
      });

      setChartData(aggregatedChartData);
      setTopChoresData(topChoresWithData);
      setLoading(false);
    };
    fetchData();
  }, [timespan, allChores, allChoreToUsers, allUserToHouseholds, allAvatars]);

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
    <View style={[styles.container, { flexDirection: 'column' }]}>
      {/* Pie chart for aggregated data (all chores) */}
      <View style={styles.totalContainer}>
        <CustomPieChart
          data={chartData}
          radius={150}
        />
      </View>

      {/* Pie charts for individual top chores */}
      <View style={styles.choresContainer}>
        {topChoresData.map((chore, index) => (
          <View
            key={index}
            style={styles.choreChart}
          >
            <CustomPieChart
              data={chore.chartData}
              radius={50}
            />
            <Text style={styles.choreText}>{chore.name}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
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
  choreText: {
    marginVertical: 5,
    fontSize: 14,
    fontWeight: 'bold',
  },
});
