import { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { selectAvatars } from '../store/avatars/slice';
import { useAppSelector } from '../store/hooks';
import { selectCurrentHousehold } from '../store/households/slice';
import { selectUsersToHouseholds } from '../store/userToHousehold/slice';

// type Props = {
//   avatar: Avatar;
// };

// {avatar}: Props

export default function SelectAvatar() {
  const [choosenAvatar, setChoosenAvatar] = useState<number | undefined>();
  const allUsersToHouseholds = useAppSelector(selectUsersToHouseholds); //UserToHousehold[]
  const currentHousehold = useAppSelector(selectCurrentHousehold); //Household[]
  const allAvatars = useAppSelector(selectAvatars); // Avatar[]

  const unavailableAvatarIds = allUsersToHouseholds
    .filter((user) => user.household_id === currentHousehold?.id)
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
  );
}
