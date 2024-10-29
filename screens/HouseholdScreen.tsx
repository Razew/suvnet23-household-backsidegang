import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import {
  GestureHandlerRootView,
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
  ScrollView,
  State,
} from 'react-native-gesture-handler';
import { Appbar, IconButton, Surface, Text } from 'react-native-paper';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import ButtonGroup, { ButtonGroupProps } from '../components/ButtonGroup';
import { RootStackParamList } from '../navigators/RootStackNavigator';
import { selectChores } from '../store/chores/slice';
import { selectChoresToUsers } from '../store/choreToUser/slice';
import { selectIsCurrentUserAdminForCurrentHousehold } from '../store/combinedSelectors';
import { useAppSelector } from '../store/hooks';
import { selectCurrentHousehold } from '../store/households/slice';
import { container } from '../themes/styles';
import { createButton } from '../utils/buttonUtils';
import { getChoresByDates, hasCompletedChores } from '../utils/statistics';
import DailyViewScreen from './DailyViewScreen';
import StatisticsScreen from './StatisticsScreen';

export default function HouseholdScreen() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const currentHousehold = useAppSelector(selectCurrentHousehold);
  const allChores = useAppSelector(selectChores);
  const allChoreToUsers = useAppSelector(selectChoresToUsers);
  const isAdmin = useAppSelector(selectIsCurrentUserAdminForCurrentHousehold);

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
  const findNextPageWithChores = (startPage: number) => {
    if (startPage === 0) return 0; // Always allow navigation to Today
    if (startPage === 1 && hasCompletedChores(thisWeeksChores)) return 1;
    if (startPage === 2 && hasCompletedChores(lastWeeksChores)) return 2;
    if (startPage === 3 && hasCompletedChores(lastMonthsChores)) return 3;
    if (startPage < 3) return findNextPageWithChores(startPage + 1);
    return -1; // No page with chores found
  };

  const findPrevPageWithChores = (startPage: number) => {
    if (startPage === 0) return 0; // Can't go back from Today
    if (startPage === 1 && hasCompletedChores(thisWeeksChores)) return 1;
    if (startPage === 2 && hasCompletedChores(lastWeeksChores)) return 2;
    if (startPage === 3 && hasCompletedChores(lastMonthsChores)) return 3;
    if (startPage > 1) return findPrevPageWithChores(startPage - 1);
    return 0; // Default to Today if no previous page with chores found
  };

  const handleRightPress = () => {
    const nextPage = findNextPageWithChores(currentPage + 1);
    if (nextPage !== -1 && nextPage !== currentPage) {
      setCurrentPage(nextPage);
      updateTitle(nextPage);
      if (currentPage === 0) {
        translateX.value = 1000;
        translateX.value = withTiming(0, { duration: 300 });
      }
    }
  };

  const handleLeftPress = () => {
    if (currentPage === 0) return;
    const prevPage = findPrevPageWithChores(currentPage - 1);
    if (prevPage !== currentPage) {
      setCurrentPage(prevPage);
      updateTitle(prevPage);
      if (currentPage === 1) {
        translateX.value = -1000;
        translateX.value = withTiming(0, { duration: 300 });
      }
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

  const buttons: ButtonGroupProps['buttons'] = [
    createButton('Add chore', 'plus', () =>
      navigation.navigate('HandleChore', { chore: undefined }),
    ),
    createButton('Admin', 'cog', () => undefined),
  ];

  const renderScreen = () => {
    if (currentPage === 0) {
      return (
        <View>
          <ScrollView>
            <DailyViewScreen />
          </ScrollView>
          {isAdmin ? <ButtonGroup buttons={buttons} /> : null}
        </View>
      );
    } else if (currentPage === 1) {
      return <StatisticsScreen chores={thisWeeksChores} />;
    } else if (currentPage === 2) {
      return <StatisticsScreen chores={lastWeeksChores} />;
    } else {
      return <StatisticsScreen chores={lastMonthsChores} />;
    }
  };

  const isRightArrowDisabled = () => {
    return findNextPageWithChores(currentPage + 1) === -1;
  };

  if (!currentHousehold) {
    return (
      <View>
        <Text>No household selected</Text>
      </View>
    );
  }

  const { thisWeeksChores, lastWeeksChores, lastMonthsChores } =
    getChoresByDates(allChoreToUsers, allChores, currentHousehold.id);
  console.log('this weeks chores: ', thisWeeksChores);
  console.log('last weeks chores: ', lastWeeksChores);
  console.log('last months chores: ', lastMonthsChores);

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
            disabled={isRightArrowDisabled()}
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
