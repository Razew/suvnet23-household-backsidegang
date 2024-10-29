import { useState } from 'react';
import { Text, View } from 'react-native';
import { Button, Snackbar, TextInput } from 'react-native-paper';
import { selectLoggedInUser } from '../store/auth/slice';
import { selectCurrentAvatar } from '../store/avatars/slice';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { selectHouseholdBeingJoined } from '../store/households/slice';
import {
  selectCurrentProfile,
  setCurrentProfile,
  updateNickname,
} from '../store/userToHousehold/slice';
import { User_To_Household } from '../types/types';
import { supabase } from '../utils/supabase';

export default function NicknameForm() {
  const dispatch = useAppDispatch();

  const [nickname, setNickname] = useState('');
  const [snackBarVisible, setSnackBarVisible] = useState(false);
  const loggedInUser = useAppSelector(selectLoggedInUser);
  const householdBeingJoined = useAppSelector(selectHouseholdBeingJoined);
  const currentUser = useAppSelector(selectCurrentProfile); //UserToHousehold
  // const { setMostRecentHousehold } = useHouseholdContext();

  const currentAvatar = useAppSelector(selectCurrentAvatar);

  const onDismissSnackBar = () => setSnackBarVisible(false);

  const insertUserToHousehold = async () => {
    // console.log('Pre flight check avatar!', currentAvatar?.emoji);
    // console.log('Entarrdd insertUserToHousehold function');
    // const result: boolean = loggedinuser, currentHousehold;
    // console.log('logged in user:', loggedInUser?.username);
    // console.log('household being joined:', householdBeingJoined);
    // console.log('chosen avatar:', currentAvatar?.id);

    if (loggedInUser && householdBeingJoined && currentAvatar) {
      const userToInsert: User_To_Household = {
        user_id: loggedInUser.id,
        household_id: householdBeingJoined.id,
        avatar_id: currentAvatar.id,
        nickname: nickname,
        is_active: true,
        is_admin: false,
      };
      console.log('userToInsert object:', userToInsert);

      try {
        const { error } = await supabase
          .from('user_to_household')
          .insert(userToInsert);

        if (error) {
          console.error(error.message);
          // Snackbar error: you are already in this household
          setSnackBarVisible(true);
          <Snackbar
            visible={snackBarVisible}
            onDismiss={onDismissSnackBar}
            action={{
              label: 'Hail Satan',
              onPress: () => {
                console.error(error.message);
              },
            }}
          >
            {error.message}
          </Snackbar>;
        } else {
          console.log('Post inserted');
        }
      } catch (error) {
        console.error(
          'Something catastrophic happened eg DB connection failed: ',
          (error as Error).message,
        );
        // Some other snackbar error too
      }
    } else {
      // Did not select avatar
      console.error('You did not select an avatar, or something else happened');
    }
  };

  const changeNickname = async () => {
    if (!loggedInUser) {
      return console.log('No logged in user');
    }
    if (nickname === '') {
      return console.log('No nickname');
    }
    if (!householdBeingJoined) {
      return console.log('No household is being joined');
    }
    // DB Insert | Should really be in an extraReducer
    await insertUserToHousehold();

    dispatch(
      updateNickname({
        nickname,
        userId: loggedInUser.id,
        currentHouseholdId: householdBeingJoined.id,
      }),
    );
    dispatch(
      setCurrentProfile({
        nickname: nickname,
        userId: loggedInUser.id,
        householdId: householdBeingJoined.id,
        avatarId: currentAvatar?.id,
        isAdmin: currentUser?.is_admin,
        isActive: currentUser?.is_active,
      }),
    );
    // dispatch(setCurrentHousehold(householdBeingJoined));
  };

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
          <Text style={{ fontSize: 20 }}>Current nickname: </Text>
          <Text style={{ fontSize: 20, marginBottom: 20, marginLeft: 10 }}>
            {nickname}
          </Text>
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
            onPress={() => changeNickname()}
            mode="contained"
          >
            Set nickname
          </Button>
        </View>
      </View>
    </>
  );
}
