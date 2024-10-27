import { ScrollView, View } from 'react-native';
import {
  TextInput,
  Button,
  Text,
  List,
  Divider,
  IconButton,
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
import { selectUsersWithAvatarsCurrentHousehold } from '../store/combinedSelectors';

type Props = {
  navigation: NativeStackNavigationProp<HomeStackParamList, 'Admin'>;
};

export default function AdminScreen({ navigation }: Props) {
  const loggedInUser = useAppSelector(selectLoggedInUser);
  const currentHousehold = useAppSelector(selectCurrentHousehold);
  const usersWithAvatars = useAppSelector(
    selectUsersWithAvatarsCurrentHousehold,
  );
  const [householdName, setHouseholdName] = useState('');

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchAvatars());
    dispatch(fetchUsersToHouseholds());
    dispatch(fetchHouseholds());
  }, [dispatch]);

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

  const kickUser = (userId: number) => {
    console.log('Kick user:', userId);
  };

  const pauseUser = (userId: number) => {
    console.log('Pause user:', userId);
  };

  return (
    <ScrollView>
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

      {usersWithAvatars.map((user) => (
        <View key={user.user_id}>
          <List.Item
            title={`${user.nickname}`}
            description={user.is_active ? '' : 'Not active'}
            left={() => (
              <Text
                style={{
                  margin: 10,
                  marginLeft: 15,
                  marginTop: 15,
                  borderWidth: 1,
                  borderColor: user.avatar?.colour_code,
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 30,
                  height: 30,
                  backgroundColor: user.avatar?.colour_code,
                  borderRadius: 20,
                  fontSize: 20,
                  textAlign: 'center',
                  lineHeight: 30,
                }}
              >
                {user.avatar?.emoji}
              </Text>
            )}
            right={(props) => (
              <>
                {user.is_admin && (
                  <List.Icon
                    {...props}
                    icon="crown"
                  />
                )}
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginLeft: 80,
                  }}
                >
                  <IconButton
                    icon="account-remove"
                    onPress={() => kickUser(user.user_id)}
                  />
                  <IconButton
                    icon={user.is_active ? 'pause-circle' : 'play-circle'}
                    onPress={() => pauseUser(user.user_id)}
                  />
                </View>
              </>
            )}
          />
        </View>
      ))}
    </ScrollView>
  );
}
