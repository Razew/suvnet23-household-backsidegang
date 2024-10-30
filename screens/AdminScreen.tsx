import React, { useEffect, useState } from 'react';
import { ScrollView, View } from 'react-native';
import {
  Button,
  Divider,
  IconButton,
  List,
  Text,
  TextInput,
} from 'react-native-paper';
import { selectLoggedInUser } from '../store/auth/slice';
import { selectUsersWithAvatarsCurrentHousehold } from '../store/combinedSelectors';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import {
  selectCurrentHousehold,
  selectHouseholdStatus,
  updateHousehold,
} from '../store/households/slice';
import {
  deleteUserToHousehold,
  fetchUsersToHouseholds,
  updateUserToHousehold,
} from '../store/userToHousehold/slice';
import { User_To_Household as UserToHousehold } from '../types/types';

export default function AdminScreen() {
  const loggedInUser = useAppSelector(selectLoggedInUser);
  const currentHousehold = useAppSelector(selectCurrentHousehold);
  const usersWithAvatars = useAppSelector(
    selectUsersWithAvatarsCurrentHousehold,
  );
  // const { loading, errorMessage } = useAppSelector(selectHouseholdStatus);
  const { loading } = useAppSelector(selectHouseholdStatus);
  const [householdName, setHouseholdName] = useState('');

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchUsersToHouseholds());
  }, []);

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
      updateHousehold({
        name: householdName,
        id: currentHousehold.id,
      }),
    );
  };

  const handleKickUser = (user: UserToHousehold) => {
    if (currentHousehold?.id === undefined) {
      return console.log('No current household');
    }
    dispatch(
      deleteUserToHousehold({
        user_id: user.user_id,
        household_id: currentHousehold.id,
      }),
    );
  };

  const handlePauseToggle = (user: UserToHousehold) => {
    if (currentHousehold?.id === undefined) {
      return console.log('No current household');
    }
    dispatch(
      updateUserToHousehold({
        is_active: !user.is_active,
        user_id: user.user_id,
        household_id: currentHousehold.id,
      }),
    );
  };

  const handleToggleAdmin = (user: UserToHousehold) => {
    if (currentHousehold?.id === undefined) {
      return console.log('No current household');
    }
    dispatch(
      updateUserToHousehold({
        is_admin: !user.is_admin,
        user_id: user.user_id,
        household_id: currentHousehold.id,
      }),
    );
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
        <Text style={{ fontSize: 24, marginTop: 10, marginBottom: 15 }}>
          {currentHousehold?.name}
        </Text>
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
          justifyContent: 'center',
          marginTop: 20,
        }}
      >
        <Button
          mode="contained"
          onPress={changeHouseholdName}
          disabled={loading === 'pending'}
        >
          {loading === 'pending'
            ? 'Updating household name...'
            : 'Change household name'}
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
            right={() => (
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
              >
                <IconButton
                  icon="account-remove"
                  onPress={() => handleKickUser(user)}
                  disabled={user.is_admin}
                />
                <IconButton
                  icon={user.is_active ? 'pause-circle' : 'play-circle'}
                  onPress={() => handlePauseToggle(user)}
                  disabled={user.is_admin}
                />
                <IconButton
                  icon={user.is_admin ? 'crown' : 'crown-outline'}
                  onPress={() => handleToggleAdmin(user)}
                  disabled={user.is_admin}
                />
              </View>
            )}
          />
        </View>
      ))}
    </ScrollView>
  );
}
