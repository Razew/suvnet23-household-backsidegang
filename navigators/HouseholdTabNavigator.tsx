import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import HouseholdScreen from '../screens/HouseholdScreen';

const Tab = createMaterialTopTabNavigator();

export default function HouseholdTabNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Household"
        component={HouseholdScreen}
      />
    </Tab.Navigator>
  );
}
