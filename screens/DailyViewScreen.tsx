import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Portal, Snackbar, Text, useTheme } from 'react-native-paper';
import ChoreCard from '../components/ChoreCard';
import { selectChoresToUsersErrorMessage } from '../store/choreToUser/slice';
import { selectActiveChoresCurrentHousehold } from '../store/combinedSelectors';
import { useAppSelector } from '../store/hooks';
import { large } from '../themes/styles';

export default function DailyViewScreen() {
  const { colors } = useTheme();
  const chores = useAppSelector(selectActiveChoresCurrentHousehold);
  const errorMessage = useAppSelector(selectChoresToUsersErrorMessage);
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const showSnackbar = (message: string) => {
    setSnackbarMessage(message);
    setSnackbarVisible(true);
  };

  const hideSnackbar = () => {
    setSnackbarVisible(false);
  };

  if (errorMessage) {
    showSnackbar(errorMessage);
  }

  return (
    <View style={s.cardsContainer}>
      {chores.length === 0 ? (
        <Text style={large}>Household screen</Text>
      ) : (
        chores.map((chore) => (
          <ChoreCard
            key={chore.id}
            chore={chore}
            onComplete={() => showSnackbar('Chore completed!')}
          />
        ))
      )}
      <Portal>
        <Snackbar
          visible={snackbarVisible}
          onDismiss={hideSnackbar}
          duration={2000}
          onIconPress={hideSnackbar}
          style={errorMessage ? { backgroundColor: colors.error } : null}
        >
          <Text style={errorMessage ? { color: colors.onError } : null}>
            {snackbarMessage}
          </Text>
        </Snackbar>
      </Portal>
    </View>
  );
}

const s = StyleSheet.create({
  cardsContainer: {
    padding: 15,
    flex: 1,
  },
});
