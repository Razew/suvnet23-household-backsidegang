import { Pressable, StyleSheet, View } from 'react-native';
import { Surface, Text, useTheme } from 'react-native-paper';
import { mockedHouseholdUserProfiles } from '../data/mocked';
import { Chore } from '../types/types';

type Props = {
  chore: Chore;
};

export default function ChoreCard({ chore }: Props) {
  const avatar = mockedHouseholdUserProfiles[0].avatar.image;
  const daysSinceLastCompleted = 5; // Example value, replace with actual logic with appselector(?)
  const { colors } = useTheme();

  const getDaysContainerStyle = () => ({
    ...s.daysContainer,
    backgroundColor:
      daysSinceLastCompleted > chore.frequency
        ? colors.tertiaryContainer
        : colors.surfaceVariant,
  });

  const getDaysTextStyle = () => ({
    ...s.daysText,
    color:
      daysSinceLastCompleted > chore.frequency
        ? colors.onTertiaryContainer
        : colors.onSurfaceVariant,
  });

  return (
    <Pressable style={s.pressableContainer}>
      <Surface style={s.cardSurface}>
        <Text
          style={s.choreTitle}
          numberOfLines={1}
        >
          {chore.name}
        </Text>
        {daysSinceLastCompleted > 0 ? (
          <View style={getDaysContainerStyle()}>
            <Text style={getDaysTextStyle()}>{daysSinceLastCompleted}</Text>
          </View>
        ) : (
          <Text style={s.avatar}>{avatar}</Text>
        )}
      </Surface>
    </Pressable>
  );
}

const s = StyleSheet.create({
  pressableContainer: {
    marginBottom: 13,
    height: 65,
  },
  cardSurface: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    borderRadius: 10,
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
    fontSize: 22,
    fontWeight: 'bold',
  },
  avatar: {
    fontSize: 22,
  },
});
