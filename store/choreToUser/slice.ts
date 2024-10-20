import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Chore_To_User as ChoreToUser } from '../../types/types';
import { supabase } from '../../utils/supabase';
import { createAppAsyncThunk } from '../hooks';
import { RootState } from '../store';

interface ChoresToUsersState {
  entities: ChoreToUser[];
  errorMessage?: string;
  loading: 'idle' | 'pending' | 'succeeded' | 'failed';
}

const initialState: ChoresToUsersState = {
  entities: [],
  loading: 'idle',
};

export const fetchChoresToUsers = createAppAsyncThunk<ChoreToUser[], void>(
  'choresToUsers/fetchChoresToUsers',
  async (_, { rejectWithValue }) => {
    console.log('Fetching chores to users...');
    try {
      const { data: fetchedChoresToUsers, error } = await supabase
        .from('chore_to_user')
        .select('*');
      console.log('Fetched Chores To Users:', fetchedChoresToUsers);

      if (error) {
        console.error('Supabase Error:', error);
        return rejectWithValue(error.message);
      }

      if (!fetchedChoresToUsers || fetchedChoresToUsers.length === 0) {
        console.error('No chore to user found');
        return rejectWithValue('No chore to user found');
      }

      return fetchedChoresToUsers;
    } catch (error) {
      console.error(error);
      return rejectWithValue('Error while fetching chore to user');
    }
  },
);

const choresToUsersSlice = createSlice({
  name: 'choresToUsers',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchChoresToUsers.pending, (state) => {
      state.loading = 'pending';
      state.errorMessage = undefined;
    });
    builder.addCase(
      fetchChoresToUsers.fulfilled,
      (state, action: PayloadAction<ChoreToUser[]>) => {
        state.entities = action.payload;
        state.loading = 'succeeded';
      },
    );
    builder.addCase(fetchChoresToUsers.rejected, (state, action) => {
      state.errorMessage = action.payload;
      state.loading = 'failed';
    });
  },
});

export const selectChoresToUsers = (state: RootState) =>
  state.choresToUsers.entities;

export default choresToUsersSlice.reducer;
