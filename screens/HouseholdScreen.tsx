import { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
// import { container } from '../themes/styles';
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
import { container } from '../themes/styles';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

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
  const translateX = useSharedValue(0);

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
    if (currentPage === 0) {
      translateX.value = 1000;
      translateX.value = withTiming(0, { duration: 300 });
    }
  };

  const handleLeftPress = () => {
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
      return <StatisticsScreen timespan={getLastWeekDates()} />;
    } else {
      return <StatisticsScreen timespan={getMonthDates(currentPage - 2)} />;
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
  );
}

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
