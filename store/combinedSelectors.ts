import { createSelector } from '@reduxjs/toolkit';
import { selectAvatars } from './avatars/slice';
import { selectChores } from './chores/slice';
import { selectChoresToUsers } from './choreToUser/slice';
import { selectCurrentHousehold } from './households/slice';
import { selectUsersToHouseholds } from './userToHousehold/slice';

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

// export const selectActiveCompletedChoresCurrentHousehold = createSelector([selectActiveChoresCurrentHousehold,],
//   (chores) => {
//     return chores.filter((chore) => chore)
//   }
// )

// CHORES TO USERS, AKA CHORE RECORDS
export const selectChoreRecords = (choreId: number) =>
  createSelector([selectChoresToUsers], (choreRecords) => {
    return choreRecords.filter(
      (choreRecord) => choreRecord.chore_id === choreId,
    );
  });

export const selectChoresCompletedToday = (choreId: number) =>
  createSelector([selectChoreRecords(choreId)], (choreRecords) => {
    const today = new Date().toDateString();
    return choreRecords.filter(
      (choreRecord) =>
        choreRecord.is_completed &&
        new Date(choreRecord.done_date).toDateString() === today,
    );
  });

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

export const selectSortedChoreRecordsByCompletionDate = (choreId: number) =>
  createSelector([selectChoreRecords(choreId)], (choreRecords) => {
    const completedChores = choreRecords.filter((chore) => chore.is_completed);

    return completedChores.sort(
      (a, b) =>
        new Date(a.done_date).getTime() - new Date(b.done_date).getTime(),
    );
  });

export const selectDaysSinceLastCompleted = (choreId: number) =>
  createSelector(
    [selectSortedChoreRecordsByCompletionDate(choreId)],
    (choreRecords) => {
      const validChoreRecords = choreRecords.filter(
        (chore) => chore.done_date !== null,
      );

      if (validChoreRecords.length === 0) return null;

      const lastCompletedDate = new Date(choreRecords[0].done_date);
      const today = new Date();
      const timeDiff = today.getTime() - lastCompletedDate.getTime();
      const daysDiff = Math.floor(timeDiff / (1000 * 3600 * 24));

      return daysDiff;
    },
  );

// export const selectChoreRecordsForUser = (userId: number) =>
//   createSelector([selectChoresToUserById(userId), selectActiveChoresCurrentHousehold], ());

// USERS
export const selectUsersCurrentHousehold = createSelector(
  [selectUsersToHouseholds, selectCurrentHousehold],
  (users, currentHousehold) => {
    return users.filter((user) => user.household_id === currentHousehold?.id);
  },
);

// TODO: Select only active users for current household

export const selectUsersWithAvatarsCurrentHousehold = createSelector(
  [selectUsersCurrentHousehold, selectAvatars],
  (users, avatars) => {
    return users.map((user) => ({
      ...user,
      avatar: avatars.find((avatar) => avatar.id === user.avatar_id),
    }));
  },
);

// AVATARS
export const selectAvailableAvatarsCurrentHousehold = createSelector(
  [selectUsersCurrentHousehold, selectAvatars],
  (users, avatars) => {
    const usedAvatarIds = users.map((user) => user.avatar_id);
    return avatars.filter((avatar) => !usedAvatarIds.includes(avatar.id));
  },
);
