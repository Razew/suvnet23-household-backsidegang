import { TouchableOpacity, View } from 'react-native';
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
} from '../store/households/slice';
import { selectLoggedInUser } from '../store/auth/slice';
import DarkLightModeButton from '../components/DarkLightModeButton';

export default function ProfileScreen() {
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
  }, []);

  //******* FOR AVALIBALE AVATAR EMOJIS */
  const unavailableAvatarIds = allUsersToHouseholds
    .filter((user) => user.household_id === currentHousehold?.id)
    // .filter((user) => user.household_id === loggedInUser?.id)
    .map((user) => user.avatar_id);

  const availableAvatars = allAvatars.filter(
    (avatar) => !unavailableAvatarIds.includes(avatar.id),
  );

  // const availableAvatarsEmojis = availableAvatars.map((avatar) => avatar.emoji);
  //******************/

  const getUserToHousehold = allUsersToHouseholds.find(
    (UserToHousehold) => UserToHousehold.user_id === loggedInUser?.id,
  );

  const userAvatar = allAvatars.find(
    (avatar) => getUserToHousehold?.avatar_id === avatar.id,
  );

  const changeName = async () => {
    if (loggedInUser?.id === undefined) {
      return console.log('No logged in user');
    }
    if (nickname === '') {
      return console.log('No nickname');
    }
    setNickname(nickname);
    dispatch(updateNickname({ nickname, userId: loggedInUser.id }));
    console.log('nickname', nickname);
  };

  const handleSelectAvatar = (avatarId: number) => {
    setChoosenAvatar(avatarId);
  };

  const submitAvatar = async () => {
    if (loggedInUser?.id === undefined) {
      return console.log('No logged in user');
    }
    if (choosenAvatar === undefined) {
      return console.log('No choosen avatar');
    }
    dispatch(
      updateAvatarEmoji({
        avatarId: choosenAvatar,
        userId: loggedInUser.id,
      }),
    );
  };

  const currentNickname = allUsersToHouseholds.find(
    (user) => loggedInUser?.id === user.user_id,
  )?.nickname;

  return (
    <>
      <DarkLightModeButton />
      <Text
        style={{
          fontSize: 20,
          marginTop: 20,
        }}
      >
        Household: {currentHousehold?.name}
      </Text>
      <Text
        style={{
          fontSize: 20,
          marginBottom: 50,
          marginTop: 5,
        }}
      >
        Code: {currentHousehold?.code}
      </Text>
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
              borderColor: userAvatar?.colour_code,
              width: 27,
              height: 27,
              backgroundColor: userAvatar?.colour_code,
              borderRadius: 20,
            }}
          >
            {userAvatar?.emoji}
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
      <Text
        style={{
          fontSize: 20,
          marginBottom: 50,
          marginTop: 20,
        }}
      >
        Change avatar:
      </Text>
      <View
        style={{
          flexWrap: 'wrap',
          flexDirection: 'row',
          gap: 65,
          justifyContent: 'center',
        }}
      >
        {availableAvatars.map((avatar) => (
          <TouchableOpacity
            key={avatar.id}
            onPress={() => handleSelectAvatar(avatar.id)}
            style={{
              borderWidth: 1,
              borderColor: avatar.colour_code,
              alignItems: 'center',
              justifyContent: 'center',
              width: 60,
              height: 60,
              backgroundColor: avatar.colour_code,
              borderRadius: 50,
            }}
          >
            <Text style={{ fontSize: choosenAvatar === avatar.id ? 60 : 30 }}>
              {avatar.emoji}
            </Text>
          </TouchableOpacity>
        ))}
        <Button
          mode="contained"
          onPress={submitAvatar}
        >
          Change avatar
        </Button>
      </View>
      <Divider style={{ height: 1, marginTop: 15, marginBottom: 15 }} />
    </>
  );
}
