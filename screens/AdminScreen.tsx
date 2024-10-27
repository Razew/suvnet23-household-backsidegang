import { View } from 'react-native';
import {
  TextInput,
  Button,
  Text,
  List,
  Icon,
  Divider,
} from 'react-native-paper';
import React, { useEffect, useState } from 'react';
import { selectLoggedInUser } from '../store/auth/slice';
import { selectAvatars, fetchAvatars } from '../store/avatars/slice';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import {
  selectCurrentHousehold,
  fetchHouseholds,
  setCurrentHousehold,
  updateHouseholdName,
  selectHouseholds,
} from '../store/households/slice';
import {
  selectUsersToHouseholds,
  fetchUsersToHouseholds,
} from '../store/userToHousehold/slice';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { HomeStackParamList } from '../navigators/HomeStackNavigator';
import { User_To_Household } from '../types/types';
import { Item } from 'react-native-paper/lib/typescript/components/Drawer/Drawer';
import { Accordion } from 'react-native-paper/lib/typescript/components/List/List';
import { map } from 'zod';
import { selectUsersWithAvatarsCurrentHousehold } from '../store/combinedSelectors';

type Props = {
  navigation: NativeStackNavigationProp<HomeStackParamList, 'Admin'>;
};

export default function AdminScreen({ navigation }: Props) {
  const allAvatars = useAppSelector(selectAvatars);
  const allUserToHouseholds = useAppSelector(selectUsersToHouseholds);
  const loggedInUser = useAppSelector(selectLoggedInUser);
  const currentHousehold = useAppSelector(selectCurrentHousehold);
  const allHouseholds = useAppSelector(selectHouseholds);
  const UsersWithAvatarsCurrentHousehold = useAppSelector(
    selectUsersWithAvatarsCurrentHousehold,
  );
  const [householdName, setHouseholdName] = useState('');

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchAvatars());
    dispatch(fetchUsersToHouseholds());
    dispatch(fetchHouseholds());
  }, [dispatch]);

  const userHouseholds: User_To_Household[] = allUserToHouseholds.filter(
    (uth) => uth.household_id === currentHousehold?.id,
  );

  const profileAndHouseholds = userHouseholds.map((userHousehold) => {
    const household = allHouseholds.find(
      (household) => household.id === userHousehold.household_id,
    )!;
    return { household, profile: userHousehold };
  });

  const changeHouseholdName = async () => {
    if (loggedInUser?.id === undefined) {
      return console.log('No logged in user');
    }
    if (householdName === '') {
      return console.log('No household name');
    }
    if (currentHousehold?.id === undefined) {
      return console.log('No current household');
    }
    dispatch(
      updateHouseholdName({
        name: householdName,
        id: currentHousehold.id,
      }),
    );
    dispatch(
      setCurrentHousehold({
        name: householdName,
        id: currentHousehold.id,
        code: currentHousehold.code,
      }),
    );
    // Add the timer when using the emulator it works on the phone witout it
    // setTimeout(() => {
    navigation.push('Profile');
    // }, 2000);
  };

  return (
    <View>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 20,
        }}
      >
        <Text style={{ fontSize: 24, fontWeight: 'bold' }}>
          Current Householdname:
        </Text>
        <Text style={{ fontSize: 24 }}>{currentHousehold?.name}</Text>
      </View>
      <View>
        <TextInput
          label={currentHousehold?.name}
          value={householdName}
          onChangeText={setHouseholdName}
        />
      </View>
      <View
        style={{
          flexWrap: 'wrap',
          flexDirection: 'row',
          gap: 65,
          justifyContent: 'center',
          marginTop: 20,
        }}
      >
        <Button
          mode="contained"
          onPress={changeHouseholdName}
        >
          Change household name
        </Button>
      </View>
      <Divider style={{ height: 1, marginTop: 15, marginBottom: 15 }} />

      {profileAndHouseholds.map((profileAndHousehold) => (
      
      <List.Item
        title="First Item"
        description="Item description"
        left={(props) => (
          <List.Icon
            {...props}
            icon={123}
          />
        )}
        />
      )}

      {/* {profileAndHouseholds.map((profileAndHousehold) => (
        <View key={profileAndHousehold.household.id}>
          <List.Accordion
            title={profileAndHousehold.household.name}
            description={
              profileAndHousehold.household.id === currentHousehold?.id
                ? `${profileAndHousehold.household.code} (Current household)`
                : profileAndHousehold.household.code
            }
            left={(props) => (
              <List.Icon
                {...props}
                icon="home"
              />
            )}
          >
            {allUserToHouseholds.map(
              (userToHousehold) =>
                userToHousehold.household_id ===
                  profileAndHousehold.household.id && (
                  <View key={userToHousehold.nickname}>
                    <List.Item
                      title={userToHousehold.nickname}
                      // description={
                      //   userToHousehold.is_active ? '' : 'Not active'
                      // }
                      left={() => {
                        const avatar = allAvatars.find(
                          (avatar) => avatar.id === userToHousehold.avatar_id,
                        );
                        return avatar ? <Text>{avatar.emoji}</Text> : null;
                      }}
                      right={(props) =>
                        userToHousehold.is_admin ? (
                          <List.Icon
                            {...props}
                            icon="crown"
                          />
                        ) : null
                      }
                    />
                  </View>
                ),
            )}
          </List.Accordion>
        </View>
      ))} */}
    </View>
  );
}
