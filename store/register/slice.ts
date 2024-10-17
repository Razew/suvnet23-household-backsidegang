import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type UserState = {
	name: string;
	password: string;
};

export const initialState: UserState = {
	name: "",
	password: "",
};

export const createUserSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		setNameAction: (state, action: PayloadAction<string>) => {
			state.name = action.payload;
		},
		setPasswordAction: (state, action: PayloadAction<string>) => {
			state.password = action.payload;
		},
	},
});

export const { setNameAction, setPasswordAction } = createUserSlice.actions;
export default createUserSlice.reducer;