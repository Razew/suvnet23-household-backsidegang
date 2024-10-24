import { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
// import { container } from '../themes/styles';
import {
  GestureHandlerRootView,
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
  State,
} from 'react-native-gesture-handler';
import { Appbar, IconButton, Surface } from 'react-native-paper';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { container } from '../themes/styles';
import {
  getLastMonthDates,
  getLastWeekDates,
  getThisWeekDates,
} from '../utils/statistics';
import DailyViewScreen from './DailyViewScreen';
import StatisticsScreen from './StatisticsScreen';

export default function HouseholdScreen() {
  // const chores = useAppSelector(selectActiveChoresCurrentHousehold);
  // const dispatch = useAppDispatch();

  // useEffect(() => {
  //   dispatch(fetchChores());
  // }, []);

  const [currentPage, setCurrentPage] = useState<number>(0);
  const [title, setTitle] = useState<string>('Today');
  const translateX = useSharedValue(0);

  const updateTitle = (page: number) => {
    if (page === 0) {
      setTitle('Today');
    } else if (page === 1) {
      setTitle('This week');
    } else if (page === 2) {
      setTitle('Last week');
    } else {
      setTitle('Last month');
    }
  };
  const handleRightPress = () => {
    const newPage = currentPage + 1;
    setCurrentPage(newPage);
    updateTitle(newPage);
    if (currentPage === 0) {
      translateX.value = 1000;
      translateX.value = withTiming(0, { duration: 300 });
    }
  };

  const handleLeftPress = () => {
    if (currentPage === 0) return;
    const newPage = currentPage - 1;
    setCurrentPage(newPage);
    updateTitle(newPage);
    if (currentPage === 1) {
      translateX.value = -1000;
      translateX.value = withTiming(0, { duration: 300 });
    }
  };

  const handleSwipe = (event: PanGestureHandlerGestureEvent) => {
    if (event.nativeEvent.state === State.END) {
      const { translationX } = event.nativeEvent;
      if (translationX < -25) {
        handleRightPress();
      } else if (translationX > 25) {
        handleLeftPress();
      }
    }
  };

  useEffect(() => {
    updateTitle(currentPage);
  }, [currentPage]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }],
    };
  });

  const renderScreen = () => {
    if (currentPage === 0) {
      return <DailyViewScreen />;
    } else if (currentPage === 1) {
      return <StatisticsScreen timespan={getThisWeekDates()} />;
    } else if (currentPage === 2) {
      return <StatisticsScreen timespan={getLastWeekDates()} />;
    } else {
      return <StatisticsScreen timespan={getLastMonthDates()} />;
    }
    // }
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Surface style={container}>
        <Surface
          style={styles.header}
          elevation={0}
        >
          <IconButton
            icon="arrow-left"
            size={30}
            onPress={handleLeftPress}
            disabled={currentPage === 0}
          />
          <Surface
            style={styles.titleContainer}
            elevation={0}
          >
            <Appbar.Content
              title={title}
              titleStyle={styles.headerTitle}
            />
          </Surface>
          <IconButton
            icon="arrow-right"
            size={30}
            onPress={handleRightPress}
            disabled={currentPage === 3}
          />
        </Surface>

        <PanGestureHandler onHandlerStateChange={handleSwipe}>
          <Surface style={[container, { width: '100%' }]}>
            <Animated.View style={[{ flex: 1 }, animatedStyle]}>
              {renderScreen()}
            </Animated.View>
          </Surface>
        </PanGestureHandler>
      </Surface>
    </GestureHandlerRootView>
    //   <ScrollView contentContainerStyle={s.root}>
    //   {chores.length === 0 ? (
    //     <Text style={large}>Household screen</Text>
    //   ) : (
    //     chores.map((chore) => (
    //       <ChoreCard
    //         key={chore.id}
    //         chore={chore}
    //       />
    //     ))
    //   )}
    // </ScrollView>
  );
}

// const s = StyleSheet.create({
//   root: {
//     padding: 15,
//   },
// });

const styles = StyleSheet.create({
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
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
});
