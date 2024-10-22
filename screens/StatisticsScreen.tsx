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
} from '../mocked'; // Import the mocked data function, users, households, chores, and completedChores
import CustomPieChart from '../components/CustomPieChart'; // Import the custom pie chart

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
const smallChartRadius = screenWidth * 0.1;

export default function StatisticsScreen({ timespan }: StatisticsScreenProps) {
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
    <View style={styles.container}>
      <View style={styles.totalContainer}>
        <CustomPieChart
          data={data}
          radius={150}
        />
      </View>
      <View style={styles.choresContainer}>
        {chores
          .filter((chore) => chore.householdId === household.id)
          .map((chore) => (
            <View
              key={chore.id}
              style={styles.choreChart}
            >
              <Text style={styles.choreText}>{chore.name}</Text>
              <CustomPieChart
                data={choreData[chore.id]}
                radius={smallChartRadius}
              />
            </View>
          ))}
      </View>
      {/* <View style={styles.exampleContainer}>
				<Text style={styles.exampleText}>Example Pie Chart</Text>
				<CustomPieChart
					data={[
						{ value: 100, color: "#0000FF", emoji: "🐶" }, // 100% filled
					]}
					radius={150}
				/>
			</View> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
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
    marginBottom: 5,
    fontSize: 16,
    fontWeight: 'bold',
  },
  exampleContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  exampleText: {
    marginBottom: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
});
