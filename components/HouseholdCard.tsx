import { useEffect } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { Surface, Text, useTheme } from 'react-native-paper';
import { useAppSelector } from '../store/hooks';
import { Household, User_To_Household } from '../types/types';
import { selectUsersToHouseholds } from '../store/userToHousehold/slice';

type Props = {
  household: Household;
  profile: User_To_Household;
};

export default function HouseholdCard({ household, profile }: Props) {
  const { colors } = useTheme();
  // const userProfile = useAppSelector(selectUsersToHouseholds).filter((usersToHousehold: User_To_Household) => usersToHousehold.household_id === household.id);

  //   const daysContainerStyle = {
  //     ...s.daysContainer,
  //     backgroundColor:
  //       daysSinceLastCompleted > chore.frequency
  //         ? colors.tertiaryContainer
  //         : colors.surfaceVariant,
  //   };

  //   const daysTextStyle = {
  //     ...s.daysText,
  //     color:
  //       daysSinceLastCompleted > chore.frequency
  //         ? colors.onTertiaryContainer
  //         : colors.onSurfaceVariant,
  //   };

  //   const ribbonContainerStyle = {
  //     ...s.ribbonContainer,
  //   };

  //   const ribbonStyle = {
  //     ...s.ribbon,
  //     backgroundColor: colors.primary,
  //   };

  //   const ribbonTextStyle = {
  //     ...s.ribbonText,
  //     color: colors.onPrimary,
  //   };

  return (
    <Pressable style={s.pressableContainer}>
      <Surface style={s.cardSurface}>
        <Text
          style={s.choreTitle}
          numberOfLines={1}
        >
          {household.name}
        </Text>
        {/* {daysSinceLastCompleted === 0 ? (
          profiles.slice(0, 3).map((profile, index) => (
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
        )} */}
        {/* {daysSinceLastCompleted > 0 ? (
          <View style={getDaysContainerStyle()}>
            <Text style={getDaysTextStyle()}>{daysSinceLastCompleted}</Text>
          </View>
        ) : (
          <Text>Hi LOL</Text>
          // avatars.slice(0, 3).map((avatar, index) => (
          //   <Text
          //     key={index}
          //     style={s.avatar}
          //   >
          //     {avatar}
          //   </Text>
          // ))
        )} */}
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
    fontSize: 20,
    fontWeight: 'bold',
  },
  avatar: {
    fontSize: 22,
  },
  newLabelContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  newLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'green',
  },
  ribbonContainer: {
    position: 'absolute',
    top: 0,
    right: 0,
    overflow: 'hidden',
    width: 75,
    height: 75,
  },
  ribbon: {
    position: 'absolute',
    top: 10,
    right: -20,
    transform: [{ rotate: '45deg' }],
    padding: 5,
    width: 100,
  },
  ribbonText: {
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
