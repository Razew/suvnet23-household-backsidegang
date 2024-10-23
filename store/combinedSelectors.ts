import { createSelector } from '@reduxjs/toolkit';
import { selectAvatars } from './avatars/slice';
import { selectChores } from './chores/slice';
import { selectCompletedChoreToUsersByChoreId } from './choreToUser/slice';
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
// export const selectChoreRecords = (choreId: number) =>
//   createSelector([selectChoresToUsers], (choreRecords) => {
//     return choreRecords.filter(
//       (choreRecord) => choreRecord.chore_id === choreId,
//     );
//   });

// export const selectCompletedChoreRecords = (choreId: number) =>
//   createSelector([selectChoreRecords(choreId)], (choreRecords) => {
//     return choreRecords.filter((choreRecord) => choreRecord.is_completed);
//   });

// export const selectChoresCompletedToday = (choreId: number) =>
//   createSelector([selectChoreRecords(choreId)], (choreRecords) => {
//     const today = new Date().toDateString();
//     return choreRecords.filter(
//       (choreRecord) =>
//         choreRecord.is_completed &&
//         new Date(choreRecord.done_date).toDateString() === today,
//     );
//   });
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
  createSelector(
    [selectCompletedChoreToUsersByChoreId(choreId)],
    (choreRecords) => {
      return choreRecords.sort(
        (a, b) =>
          new Date(a.done_date).getTime() - new Date(b.done_date).getTime(),
      );
    },
  );

export const selectDaysSinceLastCompleted = (choreId: number) =>
  createSelector(
    [selectSortedChoreRecordsByCompletionDate(choreId)],
    (choreRecords) => {
      const validChoreRecords = choreRecords.filter(
        (chore) => chore.done_date !== null,
      );

      if (validChoreRecords.length === 0) return null;

      // const lastCompletedDate = new Date(validChoreRecords[0].done_date);
      // console.log('lastCompletedDate: ', lastCompletedDate);

      // const today = new Date();
      // console.log('Today: ', today);

      // const lastCompletedDateUTC = new Date(
      //   Date.UTC(
      //     lastCompletedDate.getUTCFullYear(),
      //     lastCompletedDate.getUTCMonth(),
      //     lastCompletedDate.getUTCDate(),
      //   ),
      // );

      // const todayUTC = new Date(
      //   Date.UTC(
      //     today.getUTCFullYear(),
      //     today.getUTCMonth(),
      //     today.getUTCDate(),
      //   ),
      // );

      // console.log('LAST COMPLETED UTC: ', lastCompletedDateUTC);
      // console.log('TODAY UTC: ', todayUTC);

      // const timeDiff = todayUTC.getTime() - lastCompletedDateUTC.getTime();
      // console.log('Time difference: ', timeDiff);

      // const daysDiff = Math.floor(timeDiff / (1000 * 3600 * 24));

      return 0;
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
