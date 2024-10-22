import { TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Button, Text, TextInput } from 'react-native-paper';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { fetchAvatars, selectAvatars } from '../store/avatars/slice';
import {
  fetchUsersToHouseholds,
  selectUsersToHouseholds,
} from '../store/userToHousehold/slice';
import { selectLoggedInUser } from '../store/Auth/slice';
import {
  fetchHouseholds,
  selectAllHouseholds,
} from '../store/households/slice';

export default function ProfileScreen() {
  const [nickname, setNickname] = useState('');
  const [avatar, setAvatar] = useState('');
  // const [allAvatars, setAllAvatars] = useState(allAvatars);
  const allAvatars = useAppSelector(selectAvatars); // Avatar[]
  const allUsersToHouseholds = useAppSelector(selectUsersToHouseholds); //UserToHousehold[]
  const loggedInUser = useAppSelector(selectLoggedInUser); // User
  const allHousehold = useAppSelector(selectAllHouseholds); //Household[]

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchAvatars());
    dispatch(fetchUsersToHouseholds());
    dispatch(fetchHouseholds());
  }, []);

  /*  const getUserNicknamesAndAvatarsByHouseholdId = async (
    householdId: number,
  ) => {
    const { data, error } = await supabase
      .from('user_to_household')
      .select('nickname, avatar(emoji)')
      .eq('household_id', householdId);
  }; */

  // const unavailableAvatars = allUsersToHouseholds
  //   .filter((user) => user.household_id === loggedInUser?.id)
  //   .map((user) => user.avatar_id)
  //   .map((avatarId) => {
  //     const avatar = allAvatars.find((avatar) => avatar.id === avatarId);
  //     return avatar?.emoji;
  //   });

  //******* FOR AVALIBALE AVATAR EMOJIS */
  const unavailableAvatarIds = allUsersToHouseholds
    .filter((user) => user.household_id === 1)
    // .filter((user) => user.household_id === loggedInUser?.id)
    .map((user) => user.avatar_id);

  const availableAvatars = allAvatars.filter(
    (avatar) => !unavailableAvatarIds.includes(avatar.id),
  );

  // const availableAvatarsEmojis = availableAvatars.map((avatar) => avatar.emoji);
  //******************/

  const getUserToHousehold = allUsersToHouseholds.find(
    (user) => user.user_id === loggedInUser?.id,
  );
  const userToHousehold = allUsersToHouseholds.find(
    (household) => household.id === getUserToHousehold?.household_id,
  );

  const userAvatar = allAvatars.find(
    (avatar) => getUserToHousehold?.avatar_id === avatar.id,
  );

  // const householdId = 1;
  // const userHouseholds = allUsersToHouseholds.filter(
  //   (uth) => uth.household_id === householdId,
  // );

  // const householdAvatars = userHouseholds.map((uh) =>
  //   allAvatars.find((avatar) => avatar.id == uh.avatar_id),
  // );

  // const usedAvatars = householdAvatars.filter((avatar) => )
  const changeName = async () => {
    // const response = await supabase
    //   .from('users')
    //   .update({ nickname: nickname })
    //   .match({ id: loggedInUser?.id });
    // return response;
  };
  const chooseAvatar = async () => {
    console.log('selected avatar');
    setAvatar(avatar);
    // Koppla till DB
  };

  return (
    <>
      <View>
        <Button onPress={() => console.log('DENNA', userAvatar)}>test</Button>
        <Text style={{ fontSize: 30 }}>
          {loggedInUser?.username}
          {userAvatar?.emoji}
        </Text>
        <TextInput
          label="Choose nickname"
          value={nickname}
          onChangeText={setNickname}
        />
        <Button onPress={changeName}>Change name</Button>
      </View>
      <Text style={{ fontSize: 30, marginBottom: 50 }}>change avatar</Text>
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
            onPress={chooseAvatar}
          >
            <Text
              key={avatar.id}
              style={{ fontSize: 30 }}
            >
              {avatar.emoji}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </>
  );
}
