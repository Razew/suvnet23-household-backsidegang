import { createSelector } from '@reduxjs/toolkit';
import { selectChores } from './chores/slice';
import { selectCurrentHousehold } from './households/slice';

export const selectChoresCurrentHousehold = createSelector(
  [selectChores, selectCurrentHousehold],
  (chores, currentHousehold) => {
    return chores.filter(
      (chore) => chore.household_id === currentHousehold?.id,
    );
  },
);
