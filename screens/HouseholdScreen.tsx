import { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { container } from '../themes/styles';
import { Appbar, IconButton, Surface } from 'react-native-paper';
import {
  GestureHandlerRootView,
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
  State,
} from 'react-native-gesture-handler';
import DailyViewScreen from './DailyViewScreen';
import StatisticsScreen from './StatisticsScreen';
import { getLastWeekDates, getMonthDates } from '../utils/statistics';

// type Props = MaterialTopTabScreenProps<HouseholdTabParamList, 'Household'>;

export default function HouseholdScreen() {
  // const currentHousehold = useAppSelector(selectCurrentHousehold());
  // const chores = useAppSelector(selectChoresByHousehold());
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
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [title, setTitle] = useState<string>('Today');
  const [currentScreen, setCurrentScreen] = useState<string>('Household');

  const updateTitle = (page: number) => {
    if (page === 0) {
      setTitle('Today');
    } else if (page === 1) {
      setTitle('Last week');
    } else {
      const now = new Date();
      const targetMonth = new Date(
        now.getFullYear(),
        now.getMonth() - (page - 2),
        1,
      );
      setTitle(months[targetMonth.getMonth()]);
    }
  };

  const handleRightPress = () => {
    const newPage = currentPage + 1;
    setCurrentPage(newPage);
    updateTitle(newPage);
  };

  const handleLeftPress = () => {
    if (currentPage > 0) {
      const newPage = currentPage - 1;
      setCurrentPage(newPage);
      updateTitle(newPage);
    }
  };

  const handleSwipe = (event: PanGestureHandlerGestureEvent) => {
    if (event.nativeEvent.state === State.END) {
      const { translationX } = event.nativeEvent;
      if (translationX < -50) {
        handleRightPress();
      } else if (translationX > 50) {
        handleLeftPress();
      }
    }
  };

  useEffect(() => {
    updateTitle(currentPage);
  }, [currentPage]);

  const renderScreen = () => {
    // if (currentScreen === 'Home') {
    //   return (
    //     <HomeScreen navigateToHousehold={() => setCurrentScreen('Household')} />
    //   );
    // } else if (currentScreen === 'Household') {
    if (currentPage === 0) {
      return <DailyViewScreen />;
    } else if (currentPage === 1) {
      return <StatisticsScreen timespan={getLastWeekDates()} />;
    } else {
      return <StatisticsScreen timespan={getMonthDates(currentPage - 2)} />;
    }
    // }
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Surface style={styles.container}>
        {currentScreen === 'Household' && (
          // <HouseholdHeader>
          <View style={styles.header}>
            <IconButton
              icon="arrow-left"
              size={30}
              onPress={handleLeftPress}
              disabled={currentPage === 0}
            />
            <View style={styles.titleContainer}>
              <Appbar.Content
                title={title}
                titleStyle={styles.title}
              />
            </View>
            <IconButton
              icon="arrow-right"
              size={30}
              onPress={handleRightPress}
            />
          </View>
          // </Appbar.Header>
        )}
        <PanGestureHandler onHandlerStateChange={handleSwipe}>
          <View style={{ flex: 1 }}>{renderScreen()}</View>
        </PanGestureHandler>
      </Surface>
    </GestureHandlerRootView>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
// });

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  header: {
    flexDirection: 'row',
    height: 50,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  titleContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
});
