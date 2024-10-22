import { configureStore } from '@reduxjs/toolkit';
import { avatarsReducer } from './avatars/slice';
import { choresToUsersReducer } from './choreToUser/slice';
import householdsReducer from './households/slice';
import { usersToHouseholdsReducer } from './userToHousehold/slice';
import authReducer from './Auth/slice';

export const store = configureStore({
  reducer: {
    households: householdsReducer,
    auth: authReducer,
    choresToUsers: choresToUsersReducer,
    usersToHouseholds: usersToHouseholdsReducer,
    avatars: avatarsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
