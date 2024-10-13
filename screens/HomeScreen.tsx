import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Button, StyleSheet, Text, View } from 'react-native';
import { HomeStackParamList } from '../navigators/HomeStackNavigator';
import { container, large } from '../themes/styles';

type Props = NativeStackScreenProps<HomeStackParamList, 'Home'>;

export default function HomeScreen({ navigation }: Props) {
  //
  return (
    <View style={container}>
      <Text style={large}>Home screen</Text>
      <View style={s.tempHouseholdContainer}>
        <Text style={s.tempHouseholdName}>Davidsson Household</Text>
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
      <Button
        title="Upload File Test"
        onPress={() => navigation.navigate('UploadFileTest')}
      />
    </View>
  );
}

// TEMPORARY
const s = StyleSheet.create({
  tempHouseholdContainer: {
    marginTop: 20,
    marginBottom: 50,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  tempHouseholdName: {
    fontSize: 18,
  },
});
