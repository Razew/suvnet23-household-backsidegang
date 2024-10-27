import { createSelector } from '@reduxjs/toolkit';
import { selectLoggedInUser } from './auth/slice';
import { selectAvatars } from './avatars/slice';
import { selectChores } from './chores/slice';
import { selectCompletedChoreToUsersByChoreId } from './choreToUser/slice';
import { selectCurrentHousehold } from './households/slice';
import { selectUsersToHouseholds } from './userToHousehold/slice';

// USERS
export const selectUsersCurrentHousehold = createSelector(
  [selectUsersToHouseholds, selectCurrentHousehold],
  (users, currentHousehold) => {
    return users.filter((user) => user.household_id === currentHousehold?.id);
  },
);

export const selectIsCurrentUserAdminForCurrentHousehold = createSelector(
  [selectUsersCurrentHousehold, selectLoggedInUser],
  (users, currentUser) => {
    return users.some(
      (user) => user.user_id === currentUser?.id && user.is_admin,
    );
  },
);

// USERS TO HOUSEHOLDS
export const selectCurrentUserHouseholds = createSelector(
  [selectLoggedInUser, selectUsersToHouseholds],
  (currentUser, usersToHouseholds) => {
    return usersToHouseholds.filter(
      (userToHousehold) => userToHousehold.user_id === currentUser?.id,
    );
  },
);

// CHORES
export const selectChoresCurrentHousehold = createSelector(
  [selectChores, selectCurrentHousehold],
  (chores, currentHousehold) => {
    return chores.filter(
      (chore) => chore.household_id === currentHousehold?.id,
    );
  },
);

export const selectActiveChoresCurrentHousehold = createSelector(
  [selectChoresCurrentHousehold],
  (chores) => {
    return chores.filter((chore) => chore.is_active && !chore.is_archived);
  },
);

// CHORES TO USERS, AKA CHORE RECORDS
export const selectChoresCompletedToday = (choreId: number) =>
  createSelector(
    [selectCompletedChoreToUsersByChoreId(choreId)],
    (choreRecords) => {
      const today = new Date();
      const todayYear = today.getFullYear();
      const todayMonth = today.getMonth();
      const todayDate = today.getDate();

      return choreRecords.filter((choreRecord) => {
        const doneDate = new Date(choreRecord.done_date);
        return (
          doneDate.getFullYear() === todayYear &&
          doneDate.getMonth() === todayMonth &&
          doneDate.getDate() === todayDate
        );
      });
    },
  );

export const selectSortedChoreRecordsByCompletionDate = (choreId: number) =>
  createSelector(
    [selectCompletedChoreToUsersByChoreId(choreId)],
    (choreRecords) => {
      return choreRecords.sort(
        (a, b) =>
          new Date(b.done_date).getTime() - new Date(a.done_date).getTime(),
      );
    },
  );

export const selectDaysSinceLastCompleted = (choreId: number) =>
  createSelector(
    [selectSortedChoreRecordsByCompletionDate(choreId)],
    (choreRecords) => {
      const validChoreRecords = choreRecords.filter(
        (chore) =>
          chore.done_date !== null && new Date(chore.done_date) <= new Date(),
      );

      if (validChoreRecords.length === 0) return null;

      const lastCompletedDate = new Date(validChoreRecords[0].done_date);
      const today = new Date();

      const timeDiff = today.getTime() - lastCompletedDate.getTime();
      const daysDiff = Math.floor(timeDiff / (1000 * 3600 * 24));
      return daysDiff;
    },
  );

export const selectUsersWithAvatarsWhoCompletedChoreToday = (choreId: number) =>
  createSelector(
    [
      selectChoresCompletedToday(choreId),
      selectUsersWithAvatarsCurrentHousehold,
    ],
    (choreRecords, users) => {
      const userIds = choreRecords.map((record) => record.user_id);
      return users.filter((user) => userIds.includes(user.user_id));
    },
  );

// TODO: Select only active users for current household

// AVATARS
export const selectUsersWithAvatarsCurrentHousehold = createSelector(
  [selectUsersCurrentHousehold, selectAvatars],
  (users, avatars) => {
    return users.map((user) => ({
      ...user,
      avatar: avatars.find((avatar) => avatar.id === user.avatar_id),
    }));
  },
);

export const selectAvailableAvatarsCurrentHousehold = createSelector(
  [selectUsersCurrentHousehold, selectAvatars],
  (users, avatars) => {
    const usedAvatarIds = users.map((user) => user.avatar_id);
    return avatars.filter((avatar) => !usedAvatarIds.includes(avatar.id));
  },
);

// CHORECARD
export const selectChoreCardData = (choreId: number) =>
  createSelector(
    [
      selectDaysSinceLastCompleted(choreId),
      selectIsCurrentUserAdminForCurrentHousehold,
      selectUsersWithAvatarsWhoCompletedChoreToday(choreId),
      selectLoggedInUser,
    ],
    (daysSinceLastCompleted, isAdmin, profiles, currentUser) => ({
      daysSinceLastCompleted: daysSinceLastCompleted ?? -1,
      isAdmin,
      profiles,
      currentUser,
    }),
  );
