import { CompositeScreenProps } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { ScrollView, TouchableOpacity, View } from 'react-native';
import { Button, Divider, Text, TextInput } from 'react-native-paper';
import DarkLightModeButton from '../components/DarkLightModeButton';
import { HomeStackParamList } from '../navigators/HomeStackNavigator';
import { RootStackParamList } from '../navigators/RootStackNavigator';
import { resetState, selectLoggedInUser } from '../store/auth/slice';
import { fetchAvatars, selectAvatars } from '../store/avatars/slice';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import {
  fetchHouseholds,
  selectCurrentHousehold,
} from '../store/households/slice';
import {
  deleteUserToHousehold,
  fetchUsersToHouseholds,
  selectUsersToHouseholds,
  updateUserToHousehold,
} from '../store/userToHousehold/slice';

type Props = CompositeScreenProps<
  NativeStackScreenProps<HomeStackParamList, 'Profile'>,
  NativeStackScreenProps<RootStackParamList>
>;

export default function ProfileScreen({ navigation }: Props) {
  const [nickname, setNickname] = useState('');
  const [choosenAvatar, setChoosenAvatar] = useState<number | undefined>();
  const allAvatars = useAppSelector(selectAvatars); // Avatar[]
  const allUsersToHouseholds = useAppSelector(selectUsersToHouseholds); //UserToHousehold[]
  const loggedInUser = useAppSelector(selectLoggedInUser); // User
  const currentHousehold = useAppSelector(selectCurrentHousehold); //Household[]

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchAvatars());
    dispatch(fetchUsersToHouseholds());
    dispatch(fetchHouseholds());
  }, [dispatch]);

  const unavailableAvatarIds = allUsersToHouseholds
    .filter((user) => user.household_id === currentHousehold?.id)
    .map((user) => user.avatar_id);

  const availableAvatars = allAvatars.filter(
    (avatar) => !unavailableAvatarIds.includes(avatar.id),
  );

  const findAvatarId = allUsersToHouseholds
    .filter((user) => user.user_id === loggedInUser?.id)
    .filter((user) => user.household_id === currentHousehold?.id)
    .find((user) => user.avatar_id);

  const currentHouseholdUserAvatar = allAvatars.find(
    (avatar) => avatar.id === findAvatarId?.avatar_id,
  );

  const handleSignOut = () => {
    console.log('Sign out');
    dispatch(resetState());
    navigation.replace('Login');
  };

  const handleLeaveHousehold = async () => {
    if (loggedInUser?.id === undefined) {
      return console.log('No logged in user');
    }
    if (currentHousehold?.id === undefined) {
      return console.log('No current household');
    }
    dispatch(
      deleteUserToHousehold({
        household_id: currentHousehold.id,
        user_id: loggedInUser.id,
      }),
    );

    navigation.replace('Home');
  };

  const changeName = async () => {
    if (loggedInUser?.id === undefined) {
      return console.log('No logged in user');
    }
    if (nickname === '') {
      return console.log('No nickname');
    }
    if (currentHousehold?.id === undefined || currentHousehold.id === null) {
      return console.log('No current household');
    }
    dispatch(
      updateUserToHousehold({
        nickname,
        user_id: loggedInUser.id,
        household_id: currentHousehold.id,
      }),
    );
  };

  const submitAvatar = async () => {
    if (loggedInUser?.id === undefined) {
      return console.log('No logged in user');
    }
    if (choosenAvatar === undefined) {
      return console.log('No choosen avatar');
    }
    if (currentHousehold?.id === undefined) {
      return console.log('No current household');
    }
    dispatch(
      updateUserToHousehold({
        avatar_id: choosenAvatar,
        user_id: loggedInUser.id,
        household_id: currentHousehold?.id,
      }),
    );
  };

  const currentNickname = allUsersToHouseholds
    .filter((user) => user.household_id === currentHousehold?.id)
    .find((user) => loggedInUser?.id === user.user_id)?.nickname;

  return (
    <ScrollView>
      <DarkLightModeButton />
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 20,
        }}
      >
        <Text style={{ fontSize: 24, fontWeight: 'bold' }}>
          Current Household:
        </Text>
        <Text style={{ fontSize: 24 }}>{currentHousehold?.name}</Text>
      </View>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'row',
          marginTop: 20,
        }}
      >
        <Text style={{ fontSize: 24, fontWeight: 'bold' }}>
          Household Code:{' '}
        </Text>
        <Text style={{ fontSize: 24 }}>{currentHousehold?.code}</Text>
      </View>
      <Divider style={{ height: 1, marginTop: 15, marginBottom: 15 }} />
      <View style={{ justifyContent: 'center' }}>
        <View
          style={{
            flexDirection: 'row',
            marginTop: 20,
            justifyContent: 'center',
          }}
        >
          <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
            Current nickname:{' '}
          </Text>
          <Text style={{ fontSize: 20, marginBottom: 20, marginLeft: 10 }}>
            {currentNickname}
          </Text>
          <Text
            style={{
              marginLeft: 10,
              fontSize: 20,
              borderWidth: 1,
              borderColor: currentHouseholdUserAvatar?.colour_code,
              width: 27,
              height: 27,
              backgroundColor: currentHouseholdUserAvatar?.colour_code,
              borderRadius: 20,
            }}
          >
            {currentHouseholdUserAvatar?.emoji}
          </Text>
        </View>
        <TextInput
          label="Choose nickname"
          value={nickname}
          onChangeText={setNickname}
        />
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
            onPress={changeName}
            mode="contained"
          >
            Change name
          </Button>
        </View>
      </View>
      <Divider style={{ height: 1, marginTop: 15, marginBottom: 15 }} />
      <View
        style={{
          flexDirection: 'row',
          marginBottom: 20,
          marginTop: 20,
          justifyContent: 'center',
        }}
      >
        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Change avatar:</Text>
      </View>
      <View
        style={{
          flexWrap: 'wrap',
          flexDirection: 'row',
          gap: 50,
          justifyContent: 'center',
        }}
      >
        {availableAvatars.map((avatar) => (
          <TouchableOpacity
            key={avatar.id}
            onPress={() => setChoosenAvatar(avatar.id)}
            style={{
              borderWidth: 1,
              borderColor: avatar.colour_code,
              alignItems: 'center',
              justifyContent: 'center',
              width: 60,
              height: 60,
              backgroundColor: avatar.colour_code,
              borderRadius: 40,
            }}
          >
            <Text style={{ fontSize: choosenAvatar === avatar.id ? 60 : 30 }}>
              {avatar.emoji}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <View
        style={{
          flexDirection: 'row',
          marginTop: 20,
          justifyContent: 'center',
        }}
      >
        <Button
          mode="contained"
          onPress={submitAvatar}
        >
          Change avatar
        </Button>
      </View>
      <Divider style={{ height: 1, marginTop: 15, marginBottom: 15 }} />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          gap: 30,
          marginBottom: 20,
        }}
      >
        <Button
          style={{ backgroundColor: '#daa520' }}
          mode="contained"
          onPress={() => navigation.replace('Home')}
        >
          Change Household
        </Button>
        <Button
          mode="contained"
          style={{ backgroundColor: 'red' }}
          onPress={handleLeaveHousehold}
        >
          Leave Household
        </Button>
      </View>
      <Divider style={{ height: 1, marginTop: 15 }} />
      <Button
        mode="elevated"
        elevation={5}
        style={{
          flex: 1,
          borderRadius: 1,
          marginTop: 5,
        }}
        onPress={handleSignOut}
      >
        <Text style={{ fontSize: 20, color: 'red' }}>Sign Out</Text>
      </Button>
    </ScrollView>
  );
}
