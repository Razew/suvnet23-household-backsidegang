import { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import {
  selectAvatars,
  selectCurrentAvatar,
  setCurrentAvatar,
} from '../store/avatars/slice';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { selectHouseholdBeingJoined } from '../store/households/slice';
import { selectUsersToHouseholds } from '../store/userToHousehold/slice';
import { Avatar } from '../types/types';

type Props = {
  setAvatar: (avatar: Avatar) => void;
};

export default function AvatarSelector({ setAvatar }: Props) {
  const [choosenAvatar, setChoosenAvatar] = useState<number | undefined>();
  const allUsersToHouseholds = useAppSelector(selectUsersToHouseholds);
  const allAvatars = useAppSelector(selectAvatars);
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
      {availableAvatars.map((a) => (
        <TouchableOpacity
          key={a.id}
          onPress={() => {
            setAvatar(a);
            setChoosenAvatar(a.id);
            dispatch(setCurrentAvatar(a));
            console.log('Avatar selected: ', currentAvatar?.id);
          }}
          style={{
            borderWidth: 1,
            borderColor: a.colour_code,
            alignItems: 'center',
            justifyContent: 'center',
            width: 60,
            height: 60,
            backgroundColor: a.colour_code,
            borderRadius: 40,
          }}
        >
          <Text style={{ fontSize: choosenAvatar === a.id ? 60 : 30 }}>
            {a.emoji}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}
