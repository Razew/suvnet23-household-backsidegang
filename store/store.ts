import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import householdsReducer from './households/slice';
import { usersToHouseholdsReducer } from './userToHousehold/slice';

export const store = configureStore({
  reducer: {
    households: householdsReducer,
    usersToHouseholds: usersToHouseholdsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
