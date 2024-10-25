import { useState } from 'react';
import { StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import { Divider, Surface, Text, useTheme } from 'react-native-paper';
import {
  selectDaysSinceLastCompleted,
  selectUsersWithAvatarsWhoCompletedChoreToday,
} from '../store/combinedSelectors';
import { useAppSelector } from '../store/hooks';
import { Chore } from '../types/types';
import { CollapsibleContainer } from './CollapsibleContainer';

type Props = {
  chore: Chore;
};

export default function ChoreCard({ chore }: Props) {
  const { colors } = useTheme();
  const profiles = useAppSelector(
    selectUsersWithAvatarsWhoCompletedChoreToday(chore.id),
  );
  const daysSinceLastCompleted =
    useAppSelector(selectDaysSinceLastCompleted(chore.id)) ?? -1;
  const [expanded, setExpanded] = useState(false);

  const onItemPress = () => {
    setExpanded(!expanded);
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
  },
  description: {
    opacity: 0.7,
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
