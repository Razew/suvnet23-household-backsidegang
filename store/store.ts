import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth/slice';
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
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
