import { StyleSheet, ScrollView, Text, View } from 'react-native';
import PieChart from 'react-native-pie-chart';
import {
  Chore,
  CompletedChore,
  Household,
  HouseholdUserProfile,
} from '../types/types';
import { container } from '../themes/styles';

export default function PieChartStats({
  pieKey = Math.random(),
  chores = [],
  users = [],
  size = 250,
  timespan = [new Date(Date.now())],
  currentHousehold, //temp, will get this from store later
}: {
  pieKey?: number;
  chores?: Chore[];
  users?: HouseholdUserProfile[];
  size?: number;
  timespan: Date[];
  currentHousehold: Household;
}) {
  let completedChores: CompletedChore[] = [];
  const widthAndHeight = size;

  // Use provided users or fallback to currentHousehold users
  if (users.length === 0 || users == null || users == undefined) {
    users = currentHousehold.users;
  }

  // Use provided chores or fallback to currentHousehold completed chores
  if (chores.length === 0 || chores == null || chores == undefined) {
    completedChores = currentHousehold.completedChores;
  } else {
    completedChores = currentHousehold.completedChores.filter(
      (completedChore) =>
        chores.some((chore) => chore.id === completedChore.id),
    );
  }

  // Filter completed chores based on timespan
  if (timespan.length === 1) {
    const targetDate = timespan[0];
    completedChores = completedChores.filter(
      (completedChore) =>
        new Date(completedChore.done_date).toDateString() ===
        targetDate.toDateString(),
    );
  } else if (timespan.length === 2) {
    const [startDate, endDate] = timespan;
    completedChores = completedChores.filter(
      (completedChore) =>
        new Date(completedChore.done_date) >= startDate &&
        new Date(completedChore.done_date) <= endDate,
    );
  }

  let series: number[] = []; // Initialize series array for pie chart

  // Calculate series data
  users.forEach((user) => {
    let count = 0;
    completedChores.forEach((completedChore) => {
      if (completedChore.user.id === user.id) {
        count++;
      }
    });
    series.push(count);
  });

  //set colors based on user avatar
  const sliceColor = users.map((user) => user.avatar.colour_code);

  //check if series is valid
  const isValidSeries = series.some((value) => value > 0);

  return (
    <View style={[container, { justifyContent: 'center' }]}>
      {isValidSeries ? (
        <PieChart
          key={pieKey}
          widthAndHeight={widthAndHeight}
          series={series}
          sliceColor={sliceColor}
        />
      ) : (
        <Text style={{ fontStyle: 'italic' }}>No data</Text>
      )}
    </View>
  );
}
