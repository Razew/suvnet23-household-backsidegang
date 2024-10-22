// import React, { useCallback, useState } from 'react';
// import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
// import { useFocusEffect, useRoute } from '@react-navigation/native';
// import HouseholdScreen from '../screens/HouseholdScreen';
// import LastMonthScreen from '../screens/statistics/LastMonthScreen';
// import LastWeekScreen from '../screens/statistics/LastWeekScreen';
// import ThisWeekScreen from '../screens/statistics/ThisWeekScreen';
// import HouseholdHeader from '../screens/HouseholdHeader';
// import { set } from 'react-hook-form';

// import { LogBox } from 'react-native';

// LogBox.ignoreLogs([
//   'Non-serializable values were found in the navigation state',
// ]);

// export type HouseholdTabParamList = {
//   Household: { updateTitle: (title: string) => void };

// };

// const Tab = createMaterialTopTabNavigator<HouseholdTabParamList>();
// export default function HouseholdTabNavigator() {
//   const [title, setTitle] = useState('Household');
//   const updateTitle = (screenTitle: string): void => {
//     setTitle(screenTitle);
//   };
//   return (
//     <Tab.Navigator
//       initialRouteName={'Household'}
//       tabBar={({ navigation }: { navigation: any }) => (
//         <HouseholdHeader
//           navigation={navigation}
//           title={title}
//         />
//       )}
//     >
//       <Tab.Screen
//         name="Household"
//         component={HouseholdScreen}
//         options={{ title: 'Daily' }}
//         initialParams={{ updateTitle }}
//       />
//       <Tab.Screen
//         name="ThisWeekStatistics"
//         component={ThisWeekScreen}
//         options={{ title: 'This Week' }}
//         initialParams={{ updateTitle }}
//       />
//       <Tab.Screen
//         name="LastWeekStatistics"
//         component={LastWeekScreen}
//         options={{ title: 'Last Week' }}
//         initialParams={{ updateTitle }}
//       />
//       <Tab.Screen
//         name="LastMonthStatistics"
//         component={LastMonthScreen}
//         options={{ title: 'Last Month' }}
//         initialParams={{ updateTitle }}
//       />
//     </Tab.Navigator>
//   );
// }
