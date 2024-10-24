import { TouchableOpacity, View, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Button, Divider, Text, TextInput } from 'react-native-paper';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { fetchAvatars, selectAvatars } from '../store/avatars/slice';
import {
  fetchUsersToHouseholds,
  selectUsersToHouseholds,
  updateAvatarEmoji,
  updateNickname,
} from '../store/userToHousehold/slice';
import {
  fetchHouseholds,
  selectCurrentHousehold,
  setCurrentHousehold,
  updateHouseholdName,
} from '../store/households/slice';
import { selectLoggedInUser } from '../store/auth/slice';
import DarkLightModeButton from '../components/DarkLightModeButton';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { HomeStackParamList } from '../navigators/HomeStackNavigator';

type Props = NativeStackScreenProps<HomeStackParamList, 'Profile'>;

export default function ProfileScreen({ navigation }: Props) {
  const [nickname, setNickname] = useState('');
  const [choosenAvatar, setChoosenAvatar] = useState<number | undefined>();
  const allAvatars = useAppSelector(selectAvatars); // Avatar[]
  const allUsersToHouseholds = useAppSelector(selectUsersToHouseholds); //UserToHousehold[]
  const loggedInUser = useAppSelector(selectLoggedInUser); // User
  const currentHousehold = useAppSelector(selectCurrentHousehold); //Household[]
  const [householdName, setHouseholdName] = useState('');

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchAvatars());
    dispatch(fetchUsersToHouseholds());
    dispatch(fetchHouseholds());
  }, []);

  const unavailableAvatarIds = allUsersToHouseholds
    .filter((user) => user.household_id === currentHousehold?.id)
    // .filter((user) => user.household_id === loggedInUser?.id)
    .map((user) => user.avatar_id);

  const availableAvatars = allAvatars.filter(
    (avatar) => !unavailableAvatarIds.includes(avatar.id),
  );

  const isAdminOnHousehold2 = allUsersToHouseholds
    .filter((user) => user.user_id === loggedInUser?.id)
    .filter((user) => user.household_id === currentHousehold?.id)
    .find((user) => user.is_admin === true);

  const findAvatarId = allUsersToHouseholds
    .filter((user) => user.user_id === loggedInUser?.id)
    .filter((user) => user.household_id === currentHousehold?.id)
    .find((user) => user.avatar_id);

  const currentHouseholdUserAvatar = allAvatars.find(
    (avatar) => avatar.id === findAvatarId?.avatar_id,
  );

  const isAdmin = () => {
    if (isAdminOnHousehold2) {
      return (
        <View>
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
        </View>
      );
    }
    return null;
  };

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
      updateNickname({
        nickname,
        userId: loggedInUser.id,
        currentHouseholdId: currentHousehold.id,
      }),
    );
    // Add the timer when using the emulator it works on the phone witout it
    // setTimeout(() => {
    navigation.push('Profile');
    // }, 2000);
  };

  // useEffect(() => {
  //   changeName();
  // }, [loggedInUser, nickname, currentHousehold]);

  // const handleSelectAvatar = (avatarId: number) => {
  //   setChoosenAvatar(avatarId);
  // };

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
      updateAvatarEmoji({
        avatarId: choosenAvatar,
        userId: loggedInUser.id,
        currentHouseholdId: currentHousehold?.id,
      }),
    );

    // Add the timer when using the emulator it works on the phone witout it
    // setTimeout(() => {
    navigation.push('Profile');
    // }, 2000);
  };

  const currentNickname = allUsersToHouseholds
    .filter((user) => user.household_id === currentHousehold?.id)
    .find((user) => loggedInUser?.id === user.user_id)?.nickname;

  return (
    <ScrollView>
      <DarkLightModeButton />
      <View
        style={{
          flexDirection: 'column',
          marginTop: 20,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Text
          style={{
            fontSize: 20,
          }}
        >
          Household: {currentHousehold?.name}
        </Text>

        <Text
          style={{
            fontSize: 20,
            marginBottom: 20,
          }}
        >
          Code: {currentHousehold?.code}
        </Text>
      </View>
      {isAdmin()}
      <Divider style={{ height: 1, marginTop: 15, marginBottom: 15 }} />
      <View style={{ justifyContent: 'center' }}>
        <View
          style={{
            flexDirection: 'row',
            marginTop: 20,
            justifyContent: 'center',
          }}
        >
          <Text style={{ fontSize: 20 }}>Current nickname: </Text>
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
          marginBottom: 50,
          marginTop: 20,
          justifyContent: 'center',
        }}
      >
        <Text style={{ fontSize: 20 }}>Change avatar:</Text>
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
          Change household
        </Button>
        <Button
          mode="contained"
          style={{ backgroundColor: 'red' }}
        >
          Leave Household
        </Button>
      </View>
    </ScrollView>
  );
}
