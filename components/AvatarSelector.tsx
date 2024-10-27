import { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { selectLoggedInUser } from '../store/auth/slice';
import {
  selectAvatars,
  selectCurrentAvatar,
  setCurrentAvatar,
} from '../store/avatars/slice';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import {
  selectCurrentHousehold,
  selectHouseholdBeingJoined,
} from '../store/households/slice';
import {
  selectCurrentProfile,
  selectUsersToHouseholds,
} from '../store/userToHousehold/slice';

// type Props = {
//   avatar: Avatar;
// };

// {avatar}: Props

/*
Selecting an avatar
inserting to user_to_household
  - avatar id / user id / household id / is active / is admin



*/

export default function AvatarSelector() {
  const [choosenAvatar, setChoosenAvatar] = useState<number | undefined>();
  const allUsersToHouseholds = useAppSelector(selectUsersToHouseholds); //UserToHousehold[]
  const allAvatars = useAppSelector(selectAvatars); // Avatar[]
  const loggedinuser = useAppSelector(selectCurrentProfile); //UserToHousehold
  const currentHousehold = useAppSelector(selectCurrentHousehold); //UserToHousehold
  const currentUser = useAppSelector(selectLoggedInUser);
  const householdBeingJoined = useAppSelector(selectHouseholdBeingJoined);
  const dispatch = useAppDispatch();
  const currentAvatar = useAppSelector(selectCurrentAvatar);

  const unavailableAvatarIds = allUsersToHouseholds
    .filter((user) => user.household_id === householdBeingJoined?.id)
    .map((user) => user.avatar_id);

  const availableAvatars = allAvatars.filter(
    (avatar) => !unavailableAvatarIds.includes(avatar.id),
  );

  return (
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
          // Onpress -> tell reducer to insert to user_to_household table
          onPress={() => {
            setChoosenAvatar(avatar.id);
            dispatch(setCurrentAvatar(avatar));
            console.log('Avatar selected: ', currentAvatar?.id);
          }}
          // onPress={() => setChoosenAvatar(avatar.id)}
          // onPress={() => insertUserToHousehold}
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

      {/* <Button
        mode="contained"
        onPress={}
      >
        JOIN
      </Button> */}
    </View>
  );
}
