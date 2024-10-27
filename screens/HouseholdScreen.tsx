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
import { Appbar, IconButton, Surface } from 'react-native-paper';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import ButtonGroup, { ButtonGroupProps } from '../components/ButtonGroup';
import { RootStackParamList } from '../navigators/RootStackNavigator';
import { selectLoggedInUser } from '../store/auth/slice';
import { selectIsCurrentUserAdminForCurrentHousehold } from '../store/combinedSelectors';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { selectCurrentHousehold } from '../store/households/slice';
import {
  selectCurrentProfile,
  selectUsersToHouseholds,
  setCurrentProfile,
} from '../store/userToHousehold/slice';
import { container } from '../themes/styles';
import { createButton } from '../utils/buttonUtils';
import {
  getLastMonthDates,
  getLastWeekDates,
  getThisWeekDates,
} from '../utils/statistics';
import DailyViewScreen from './DailyViewScreen';
import StatisticsScreen from './StatisticsScreen';

export default function HouseholdScreen() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const currentHousehold = useAppSelector(selectCurrentHousehold);
  if (!currentHousehold) {
    console.log('No current household found');
  }
  const loggedInUser = useAppSelector(selectLoggedInUser);
  const isAdmin = useAppSelector(selectIsCurrentUserAdminForCurrentHousehold);
  const allUserToHouseholds = useAppSelector(selectUsersToHouseholds);
  const currentUserToHousehold = allUserToHouseholds.find(
    (userToHousehold) =>
      userToHousehold.user_id === loggedInUser?.id &&
      userToHousehold.household_id === currentHousehold?.id,
  );
  const dispatch = useAppDispatch();
  if (!currentUserToHousehold) {
    console.log('No current user to household found');
  }
  dispatch(setCurrentProfile(currentUserToHousehold));
  const currentProfile = useAppSelector(selectCurrentProfile);
  console.log(currentProfile);
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
