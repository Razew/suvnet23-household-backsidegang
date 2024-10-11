// import { userReducer } from "./user/slice";
// import { householdReducer } from "./household/reducer";
// import { choreReducer } from "./chore/reducer";
// import { choresReducer } from "./chores/reducer";
// import { householdsReducer } from "./households/reducer";
import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
// import userReducer from "./user/slice";
import accountsReducer from "./accounts/slice";

export const store = configureStore({
	reducer: {
		// user: userReducer,
		accounts: accountsReducer,
		// household: householdReducer,
		// households: householdsReducer,
		// chore: choreReducer,
		// chores: choresReducer,
	},
});

// ------ TYPESCRIPT ------ //
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
