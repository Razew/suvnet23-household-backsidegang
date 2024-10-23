import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { User } from '../../types/types';
import { supabase } from '../../utils/supabase';
import { RootState } from '../store';

interface AuthState {
  currentUser?: User;
  loading: boolean;
  error?: string;
}

const initialState: AuthState = {
  currentUser: undefined,
  loading: false,
  error: undefined,
};

export type CredentialsPayload = { username: string; password: string };

// async function saveUserToLocalStorage(user: {
//   id: string;
//   user_name: string;
//   hashed_password: string;
// }) {
//   try {
//     const userJson = JSON.stringify(user);
//     await AsyncStorage.setItem('loggedInUser', userJson);
//   } catch (error) {
//     console.error('Failed to save user to local storage', error);
//   }
// }

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ username, password }: CredentialsPayload, { rejectWithValue }) => {
    try {
      if (username === '' || password === '') {
        return rejectWithValue('Fill in username and password');
      }
      const { data, error } = await supabase
        .from('user')
        .select('id, user_name, hashed_password')
        .eq('user_name', username)
        .eq('hashed_password', password)
        .single();

      if (error) {
        throw error;
      }

      if (!data) {
        return rejectWithValue('User not found');
      }
      // const user = {
      //   id: data.id,
      //   user_name: data.user_name,
      //   hashed_password: data.hashed_password,
      // };
      // saveUserToLocalStorage(user);
      return { user: data };
    } catch (error) {
      console.log('error', error);
      return rejectWithValue('Invalid login details');
    }
  },
);

export const logoutUser = createAsyncThunk(
  'auth/logoutUser',
  async (_, { rejectWithValue }) => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      return true;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  },
);

export const createUser = createAsyncThunk(
  'auth/createUser',
  async ({ username, password }: CredentialsPayload, { rejectWithValue }) => {
    try {
      if (username === '') {
        return rejectWithValue('Username cannot be empty');
      }
      if (password === '' || password.length < 8) {
        return rejectWithValue('Password must be at least 8 characters long');
      }
      const { error } = await supabase
        .from('user')
        .insert([{ user_name: username, hashed_password: password }]);

      if (error) {
        console.log('Supabase error:', error);
        return rejectWithValue('Username already exists');
      }

      const { data: updatedData, error: updatedError } = await supabase
        .from('user')
        .select('id, user_name, hashed_password')
        .eq('user_name', username)
        .eq('hashed_password', password)
        .single();

      if (updatedError) {
        console.log('Supabase error:', updatedError);
        throw updatedError;
      }

      return { user: updatedData };
    } catch (error) {
      console.log('Catch error:', error);
      return rejectWithValue('Failed to register');
    }
  },
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    resetState: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = undefined;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.currentUser = {
          id: action.payload.user.id,
          username: action.payload.user.user_name,
          password: action.payload.user.hashed_password,
        };
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
        state.error = undefined;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.loading = false;
        state.currentUser = initialState.currentUser;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(createUser.pending, (state) => {
        state.loading = true;
        state.error = undefined;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.loading = false;
        state.currentUser = {
          id: action.payload.user.id,
          username: action.payload.user.user_name,
          password: action.payload.user.hashed_password,
        };
      })
      .addCase(createUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { resetState } = authSlice.actions;
export const authReducer = authSlice.reducer;

// SELECTORS
export const selectLoggedInUser = (state: RootState) => state.auth.currentUser;
export const selectLogInSuccess = (state: RootState) =>
  state.auth.currentUser !== undefined;