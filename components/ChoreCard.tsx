import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useState } from 'react';
import { StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import {
  Button,
  Dialog,
  Divider,
  Portal,
  Surface,
  Text,
  useTheme,
} from 'react-native-paper';
import { RootStackParamList } from '../navigators/RootStackNavigator';
import { selectLoggedInUser } from '../store/auth/slice';
import { updateChore } from '../store/chores/slice';
import { addChoreToUser } from '../store/choreToUser/slice';
import {
  selectDaysSinceLastCompleted,
  selectIsCurrentUserAdminForCurrentHousehold,
  selectUsersWithAvatarsWhoCompletedChoreToday,
} from '../store/combinedSelectors';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { Chore } from '../types/types';
import { CollapsibleContainer } from './CollapsibleContainer';

type Props = {
  chore: Chore;
};

export default function ChoreCard({ chore }: Props) {
  const [expanded, setExpanded] = useState(false);
  const [visible, setVisible] = useState(false);
  const { colors } = useTheme();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const dispatch = useAppDispatch();

  const profiles = useAppSelector(
    selectUsersWithAvatarsWhoCompletedChoreToday(chore.id),
  );
  const daysSinceLastCompleted =
    useAppSelector(selectDaysSinceLastCompleted(chore.id)) ?? -1;
  const isAdmin = useAppSelector(selectIsCurrentUserAdminForCurrentHousehold);
  const currentUser = useAppSelector(selectLoggedInUser);

  const hideDialog = () => setVisible(false);

  const onItemPress = () => {
    setExpanded(!expanded);
  };

  // Used for both archive and delete, as we don't have an "is_deleted" field for our soft delete currently.
  const onArchive = () => {
    dispatch(
      updateChore({ id: chore.id, is_active: false, is_archived: true }),
    );
  };

  const onCompletedPress = () => {
    if (currentUser) {
      dispatch(
        addChoreToUser({
          user_id: currentUser?.id,
          chore_id: chore.id,
          is_completed: true,
          done_date: new Date(),
        }),
      );
      setExpanded(false);
    } else {
      console.warn(
        "Could not dispatch addChoreToUser as there's no current user",
      );
    }
  };

  const daysContainerStyle = {
    ...s.daysContainer,
    backgroundColor:
      daysSinceLastCompleted > chore.frequency
        ? colors.tertiaryContainer
        : colors.surfaceVariant,
  };

  const daysTextStyle = {
    ...s.daysText,
    color:
      daysSinceLastCompleted > chore.frequency
        ? colors.onTertiaryContainer
        : colors.onSurfaceVariant,
  };

  const ribbonContainerStyle = {
    ...s.ribbonContainer,
  };

  const ribbonStyle = {
    ...s.ribbon,
    backgroundColor: colors.primary,
  };

  const ribbonTextStyle = {
    ...s.ribbonText,
    color: colors.onPrimary,
  };

  return (
    <Surface
      style={s.cardContainer}
      elevation={2}
    >
      <TouchableWithoutFeedback onPress={onItemPress}>
        <View style={s.card}>
          <Text
            style={s.choreTitle}
            numberOfLines={1}
          >
            {chore.name}
          </Text>
          {daysSinceLastCompleted === 0 ? (
            profiles.slice(0, 4).map((profile, index) => (
              <Text
                key={index}
                style={s.avatar}
              >
                {profile.avatar?.emoji}
              </Text>
            ))
          ) : daysSinceLastCompleted > 0 ? (
            <View style={daysContainerStyle}>
              <Text style={daysTextStyle}>{daysSinceLastCompleted}</Text>
            </View>
          ) : (
            <View style={ribbonContainerStyle}>
              <View style={ribbonStyle}>
                <Text style={ribbonTextStyle}>New</Text>
              </View>
            </View>
          )}
        </View>
      </TouchableWithoutFeedback>
      <CollapsibleContainer expanded={expanded}>
        <Divider
          horizontalInset={true}
          bold
        />
        <View style={s.collapsedContainer}>
          <Text style={s.description}>{chore.description}</Text>
          <Button
            mode="contained"
            icon="check"
            style={s.button}
            onPress={onCompletedPress}
          >
            Complete
          </Button>
          {isAdmin && (
            <View style={s.buttonRow}>
              <Button
                icon="lead-pencil"
                style={s.button}
                onPress={() => navigation.navigate('EditChore', { chore })}
              >
                Edit
              </Button>
              <Button
                icon="delete"
                style={s.button}
                textColor={colors.error}
                onPress={() => setVisible(true)}
              >
                Delete
              </Button>
              <Portal>
                <Dialog
                  visible={visible}
                  onDismiss={hideDialog}
                >
                  <Dialog.Icon
                    icon="alert"
                    color={colors.error}
                  />
                  <Dialog.Title style={{ textAlign: 'center' }}>
                    Delete chore
                  </Dialog.Title>
                  <Dialog.Content>
                    <Text variant="bodyMedium">
                      Are you sure you want to delete the chore? All data
                      pertaining to it will be lost forever.
                    </Text>
                  </Dialog.Content>
                  <Dialog.Actions>
                    <Button
                      icon="archive"
                      onPress={onArchive}
                    >
                      Archive
                    </Button>
                    <Button
                      icon="delete"
                      onPress={onArchive}
                    >
                      Confirm
                    </Button>
                  </Dialog.Actions>
                </Dialog>
              </Portal>
            </View>
          )}
        </View>
      </CollapsibleContainer>
    </Surface>
  );
}

const s = StyleSheet.create({
  cardContainer: {
    marginBottom: 13,
    borderRadius: 10,
  },
  card: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    minHeight: 65,
    padding: 15,
  },
  daysContainer: {
    width: 32,
    height: 32,
    borderRadius: 99,
    justifyContent: 'center',
    alignItems: 'center',
  },
  daysText: {
    fontSize: 18,
    fontWeight: '700',
  },
  choreTitle: {
    flex: 1,
    fontSize: 20,
    fontWeight: 'bold',
  },
  avatar: {
    fontSize: 22,
  },
  collapsedContainer: {
    padding: 15,
    gap: 25,
  },
  description: {
    opacity: 0.7,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  button: {
    width: 125,
  },
  newLabelContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  newLabel: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  ribbonContainer: {
    position: 'absolute',
    top: 0,
    right: 0,
    overflow: 'hidden',
    width: 75,
    height: 65,
    borderBottomRightRadius: 5,
  },
  ribbon: {
    position: 'absolute',
    top: 10,
    right: -25,
    transform: [{ rotate: '40deg' }],
    padding: 5,
    width: 105,
  },
  ribbonText: {
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
