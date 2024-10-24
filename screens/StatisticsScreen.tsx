import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import CustomPieChart from '../components/CustomPieChart';
import { useAppSelector } from '../store/hooks';
import { selectAvatars } from '../store/avatars/slice';
import { selectChores } from '../store/chores/slice';
import { selectChoresToUsers } from '../store/choreToUser/slice';
import { selectCurrentHousehold } from '../store/households/slice';
import { selectUsersToHouseholds } from '../store/userToHousehold/slice';
import {
  PieDataItem,
  Chore,
  User_To_Household,
  Chore_To_User,
} from '../types/types';
import { selectLoggedInUser } from '../store/auth/slice';
import { set } from 'react-hook-form';

const screenWidth = Dimensions.get('window').width;
const bigChartRadius = screenWidth * 0.45;
const smallChartRadius = screenWidth * 0.13;

export default function StatisticsScreen({
  chores,
}: {
  chores: Chore_To_User[];
}) {
  const storedHousehold = useAppSelector(selectCurrentHousehold);
  console.log('stored household', storedHousehold);
  const allChores = useAppSelector(selectChores);
  console.log('all chores', allChores);
  const allAvatars = useAppSelector(selectAvatars);
  const allChoreToUsers = useAppSelector(selectChoresToUsers);
  const allUserToHouseholds = useAppSelector(selectUsersToHouseholds);
  const loggedInUser = useAppSelector(selectLoggedInUser);
  // const loggedInUser: User = { id: 53, username: 'Anna', password: '1234' };

  if (!loggedInUser) {
    return (
      <View style={styles.loadingContainer}>
        <Text>User not found</Text>
      </View>
    );
  }

  if (!storedHousehold) {
    return (
      <View style={styles.loadingContainer}>
        <Text>No household selected</Text>
      </View>
    );
  }

  const selectedHousehold = allUserToHouseholds.find(
    (userToHousehold) =>
      userToHousehold.user_id === loggedInUser.id &&
      userToHousehold.household_id === storedHousehold.id,
  );

  if (!selectedHousehold) {
    return (
      <View style={styles.loadingContainer}>
        <Text>No household found for the user</Text>
      </View>
    );
  }

  const [loading, setLoading] = useState(true);
  const [chartData, setChartData] = useState<PieDataItem[]>([]);
  const [singleChoreData, setSingleChoreData] = useState<
    { name: string; chartData: PieDataItem[] }[]
  >([]);

  let householdChores: Chore[] = [];
  let currentHouseholdUsers: User_To_Household[] = [];
  let completedChores: Chore_To_User[] = [];

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      // Get all chores for the current household
      householdChores = allChores.filter(
        (chore) => chore.household_id === storedHousehold.id,
      );

      // Get all active users in the current household
      currentHouseholdUsers = allUserToHouseholds.filter(
        (uth) => uth.household_id === storedHousehold.id && uth.is_active,
      );

      // Filter completed chores to only include those done by current household users
      completedChores = chores.filter((chore) =>
        currentHouseholdUsers.some((user) => user.user_id === chore.user_id),
      );

      // Aggregate data for all chores, accounting for weights
      const aggregatedData: { [userId: number]: number } = {};
      completedChores.forEach((ctu) => {
        const chore = householdChores.find((c) => c.id === ctu.chore_id);
        if (chore) {
          if (aggregatedData[ctu.user_id]) {
            aggregatedData[ctu.user_id] += chore.weight;
          } else {
            aggregatedData[ctu.user_id] = chore.weight;
          }
        }
      });

      // Convert aggregated data to PieDataItem format
      const newChartData: PieDataItem[] = Object.entries(aggregatedData).map(
        ([userId, weightedCount]) => {
          const user = currentHouseholdUsers.find(
            (u) => u.user_id === Number(userId),
          );
          const avatar = allAvatars.find((a) => a.id === user?.avatar_id);
          return {
            id: Number(userId),
            value: weightedCount,
            color: avatar?.colour_code || '#FFFFFF',
            emoji: avatar?.emoji || '👤',
          };
        },
      );

      setChartData(newChartData);

      // Generate data for individual chores
      const newSingleChoreData = householdChores
        .map((chore) => {
          const choreCompletions = completedChores.filter(
            (cc) => cc.chore_id === chore.id,
          );
          const choreData: { [userId: number]: number } = {};

          choreCompletions.forEach((cc) => {
            if (choreData[cc.user_id]) {
              choreData[cc.user_id] += chore.weight;
            } else {
              choreData[cc.user_id] = chore.weight;
            }
          });

          const pieData: PieDataItem[] = Object.entries(choreData).map(
            ([userId, weightedCount]) => {
              const user = currentHouseholdUsers.find(
                (u) => u.user_id === Number(userId) && u.is_active,
              );
              const avatar = allAvatars.find((a) => a.id === user?.avatar_id);
              return {
                id: Number(userId),
                value: weightedCount,
                color: avatar?.colour_code || '#FFFFFF',
                emoji: avatar?.emoji || '👤',
              };
            },
          );

          return {
            name: chore.name,
            chartData: pieData,
          };
        })
        .filter((chore) => chore.chartData.length > 0); // Remove chores with no data

      newSingleChoreData.sort(
        (a, b) =>
          b.chartData.reduce((sum, item) => sum + item.value, 0) -
          a.chartData.reduce((sum, item) => sum + item.value, 0),
      );
      setSingleChoreData(newSingleChoreData);

      setLoading(false);
    };

    fetchData();
  }, [chores, allChores, allUserToHouseholds, allAvatars]);

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
      {/* Pie chart for total */}
      <View style={styles.totalContainer}>
        <CustomPieChart
          data={chartData}
          radius={bigChartRadius}
        />
      </View>

      {/* Pie charts for individual chores */}
      <View style={styles.choresContainer}>
        {singleChoreData.map((chore, index) => (
          <View
            key={index}
            style={styles.choreChart}
          >
            <CustomPieChart
              data={chore.chartData}
              radius={smallChartRadius}
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
