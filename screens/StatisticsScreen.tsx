import React, { useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { IconButton } from 'react-native-paper'; // Ensure correct import
import { container } from '../themes/styles'; // Ensure correct import
import PieChartStats from '../components/PieChartStats'; // Ensure correct import
import { mockedHouseholds } from '../data/mocked'; // Ensure correct import

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export default function StatisticsScreen() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [currentTitle, setCurrentTitle] = useState('Today');
  const [currentPage, setCurrentPage] = useState(0);
  const [timespan, setTimespan] = useState([new Date()]);

  const updateTitle = (date: Date, page: number) => {
    if (page === 0) {
      return 'Today';
    } else if (page === 1) {
      return 'Last Week';
    } else if (page === 2) {
      return 'This Month';
    } else {
      return months[date.getMonth()] + ' ' + date.getFullYear();
    }
  };

  const updateTimespan = (page: number, date: Date) => {
    if (page === 0) {
      return [new Date()];
    } else if (page === 1) {
      const lastWeek = new Date();
      lastWeek.setDate(date.getDate() - 7);
      return [lastWeek, date];
    } else if (page === 2) {
      const startOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
      return [startOfMonth, date];
    } else {
      const startOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
      const endOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);
      return [startOfMonth, endOfMonth];
    }
  };

  const goToPrevPage = () => {
    let newDate = new Date(currentDate);
    let newPage = currentPage;

    if (currentPage === 1) {
      // Go back to today
      newDate = new Date();
      newPage = 0;
    } else if (currentPage === 2) {
      // Go back to last week
      newDate.setDate(newDate.getDate() - 7);
      newPage = 1;
    } else if (currentPage > 2) {
      // Go back by one month
      newDate.setMonth(currentDate.getMonth() + 1);
      newPage -= 1;
    }

    setCurrentDate(newDate);
    setCurrentTitle(updateTitle(newDate, newPage));
    setCurrentPage(newPage);
    setTimespan(updateTimespan(newPage, newDate));
  };

  const goToNextPage = () => {
    let newDate = new Date(currentDate);
    let newPage = currentPage;

    if (currentPage === 0) {
      // Go to last week
      newDate.setDate(currentDate.getDate() - 7);
      newPage = 1;
    } else if (currentPage === 1) {
      // Go to this month
      newDate = new Date();
      newPage = 2;
    } else {
      // Go back by one month
      newDate.setMonth(currentDate.getMonth() - 1);
      newPage += 1;
    }

    setCurrentDate(newDate);
    setCurrentTitle(updateTitle(newDate, newPage));
    setCurrentPage(newPage);
    setTimespan(updateTimespan(newPage, newDate));
  };

  const completedChoreIds = new Set(
    mockedHouseholds[0].completedChores.map((chore) => chore.id),
  );

  return (
    <ScrollView style={{ flex: 1, width: '100%' }}>
      <View style={[container, { flexDirection: 'column', marginTop: 20 }]}>
        <View style={{ flexDirection: 'row', alignContent: 'center' }}>
          <IconButton
            icon="arrow-left"
            size={30}
            onPress={goToPrevPage}
          />
          <Text style={{ textAlignVertical: 'center' }}>{currentTitle}</Text>
          <IconButton
            icon="arrow-right"
            size={30}
            onPress={goToNextPage}
          />
        </View>
        <View
          style={{
            justifyContent: 'center',
            alignContent: 'center',
            height: 300,
          }}
        >
          <Text style={{ textAlign: 'center' }}>Total</Text>
          <PieChartStats
            pieKey={Math.random()}
            currentHousehold={mockedHouseholds[0]}
            timespan={timespan}
            size={200}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            width: '100%',
            flexWrap: 'wrap',
          }}
        >
          {mockedHouseholds[0].chores
            .filter((chore) => completedChoreIds.has(chore.id))
            .map((chore, index) => {
              return (
                <View
                  key={index}
                  style={{
                    width: '33.33%',
                    justifyContent: 'center',
                    alignContent: 'center',
                    height: 80,
                    marginBottom: 64,
                  }}
                >
                  <Text
                    style={{
                      alignSelf: 'center',
                    }}
                  >
                    {chore.name}
                  </Text>
                  <View style={{ alignSelf: 'center' }}>
                    <PieChartStats
                      chores={[chore]}
                      pieKey={Math.random()}
                      currentHousehold={mockedHouseholds[0]}
                      timespan={timespan}
                      size={64}
                    />
                  </View>
                </View>
              );
            })}
        </View>
      </View>
    </ScrollView>
  );
}
