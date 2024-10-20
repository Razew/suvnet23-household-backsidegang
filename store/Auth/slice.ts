import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { supabase } from '../../utils/supabase';
import { RootState } from '../store';
import { User } from '../../types/types';

interface AuthState {
  user: User;
  isSignedIn: boolean;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  isSignedIn: false,
  user: { id: 0, username: '', password: '' },
  loading: false,
  error: null,
};

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ username, password }: { username: string; password: string }, { rejectWithValue }) => {
    try {
      const { data, error } = await supabase
        .from("user")
        .select("id, user_name, hashed_password")
        .eq("user_name", username)
        .eq("hashed_password", password)
        .single();

      if (error) throw error;

      if (!data) {
        return rejectWithValue('User not found');
      }

      return { user: data };
    } catch (error) {
      console.log('error', error);
      return rejectWithValue((error as Error).message);
    }
  }
);

export const logoutUser = createAsyncThunk('auth/logoutUser', async (_, { rejectWithValue }) => {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    return true;
  } catch (error) {
    return rejectWithValue((error as Error).message);
  }
});

export const createUser = createAsyncThunk(
  'auth/createUser',
  async ({ username, password }: { username: string; password: string }, { rejectWithValue }) => {
    try {
      const { error } = await supabase
        .from("user")
        .insert([{ user_name: username, hashed_password: password }]);

      if (error) {
        console.log('Supabase error:', error);
        throw error;
      }

      const { data: updatedData, error: updatedError } = await supabase
        .from("user")
        .select("id, user_name, hashed_password")
        .eq("user_name", username)
        .eq("hashed_password", password)
        .single();
      
      if (updatedError) {
        console.log('Supabase error:', updatedError);
        throw updatedError;
      }

      return { user: updatedData };
    } catch (error) {
      console.log('Catch error:', error);
      return rejectWithValue((error as Error).message);
    }
  }
);


const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isSignedIn = true;
        state.user = {
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
        state.error = null;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.loading = false;
        state.isSignedIn = false;
        state.user = initialState.user;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(createUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isSignedIn = true;
        state.user = {
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


export const selectLoggedInUser = (state: RootState) => state.auth.user;

export default authSlice.reducer;