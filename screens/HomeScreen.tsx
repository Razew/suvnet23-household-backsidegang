import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Button, Text, View } from 'react-native';
import { HomeStackParamList } from '../navigators/HomeStackNavigator';
import { container, large } from '../themes/styles';

type Props = NativeStackScreenProps<HomeStackParamList, 'Home'>;

export default function HomeScreen({ navigation }: Props) {
  return (
    <View style={container}>
      <Text style={large}>Home screen</Text>
      <View>
        <Text>Davidsson Household</Text>
        <Button
          title="Enter"
          onPress={() => navigation.replace('HouseholdNavigator')}
        />
      </View>
      <Button
        title="Join Household"
        onPress={() => navigation.navigate('JoinHousehold')}
      />
      <Button
        title="Create Household"
        onPress={() => navigation.navigate('CreateHousehold')}
      />
    </View>
  );
}
