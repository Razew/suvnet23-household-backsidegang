import { useState } from 'react';
import { Text, View } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { selectCurrentAvatar } from '../store/avatars/slice';
import { useAppSelector } from '../store/hooks';

type Props = {
  setNickname: (nickname: string) => void;
};

export default function NicknameForm({ setNickname }: Props) {
  const [nicknameLocal, setNicknameLocal] = useState('');
  const currentAvatar = useAppSelector(selectCurrentAvatar);
  const changeNickname = () => setNickname(nicknameLocal);

  return (
    <>
      <View style={{ justifyContent: 'center' }}>
        <View
          style={{
            flexDirection: 'row',
            marginTop: 20,
            justifyContent: 'center',
          }}
        >
          <Text
            style={{
              marginLeft: 10,
              fontSize: 20,
              borderWidth: 1,
              borderColor: currentAvatar?.colour_code,
              width: 27,
              height: 27,
              backgroundColor: currentAvatar?.colour_code,
              borderRadius: 20,
            }}
          >
            {currentAvatar?.emoji}
          </Text>
        </View>
        <TextInput
          label="Choose nickname"
          value={nicknameLocal}
          onChangeText={setNicknameLocal}
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
            // onPress={() => changeNickname()}
            onPress={changeNickname}
            mode="contained"
          >
            Set nickname
          </Button>
        </View>
      </View>
    </>
  );
}
