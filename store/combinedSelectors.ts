import { createSelector } from '@reduxjs/toolkit';
import { selectAvatars } from './avatars/slice';
import { selectChores } from './chores/slice';
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

// USERS
export const selectUsersCurrentHousehold = createSelector(
  [selectUsersToHouseholds, selectCurrentHousehold],
  (users, currentHousehold) => {
    return users.filter((user) => user.household_id === currentHousehold?.id);
  },
);

export const selectUsersWithAvatarsCurrentHousehold = createSelector(
  [selectUsersCurrentHousehold, selectAvatars],
  (users, avatars) => {
    return users.map((user) => ({
      ...user,
      avatar: avatars.find((avatar) => avatar.id === user.avatar_id),
    }));
  },
);
