import { configureStore, isPlain } from '@reduxjs/toolkit';
import { authReducer } from './auth/slice';
import { avatarsReducer } from './avatars/slice';
import { choresReducer } from './chores/slice';
import { choresToUsersReducer } from './choreToUser/slice';
import { householdsReducer } from './households/slice';
import { usersToHouseholdsReducer } from './userToHousehold/slice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    households: householdsReducer,
    avatars: avatarsReducer,
    chores: choresReducer,
    choresToUsers: choresToUsersReducer,
    usersToHouseholds: usersToHouseholdsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: ['choresToUsers/addOptimisticChoreToUser'],
        // Ignore these field paths in all actions
        ignoredActionPaths: ['meta.arg', 'payload.done_date'],
        // Ignore these paths in the state
        // ignoredPaths: ['items.dates'],
        ignoredPaths: ['choresToUsers.list.*.done_date'],
        isSerializable: (value: Date) => {
          // Return false for non-serializable values such as Dates
          return isPlain(value) || value instanceof Date;
        },
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
