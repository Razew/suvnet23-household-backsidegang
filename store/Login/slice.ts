import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

export type UserState = {
	name: string;
	password: string;
	loggedIn: boolean;
};

export const initialState: UserState = {
	name: "",
	password: "",
	loggedIn: false,
};

export const logInSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		login: (state, action: PayloadAction<string>) => {
			state.name = action.payload;
			state.password = action.payload;
		},
		logout: (state) => {
			state.name = "";
			state.password = "";
		},
	},
});

export const fetchLogin = createAsyncThunk(

  'login',

  async ({ username, password, loggedIn }: { username: string; password: string; loggedIn: boolean }) => {

    // login logic here

  }

);

export const { login, logout } = logInSlice.actions;

export const selectUser = (state: { user: UserState; }) => state.user;

export default logInSlice.reducer;