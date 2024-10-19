import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Chore_To_User as ChoreToUser } from '../../types/types';
import { supabase } from '../../utils/supabase';
import { createAppAsyncThunk } from '../hooks';
import { RootState } from '../store';

interface ChoreToUserState {
  allChoreToUser: ChoreToUser[];
  errorMessage?: string;
  loading: 'idle' | 'pending' | 'succeeded' | 'failed';
}

const initialState: ChoreToUserState = {
  allChoreToUser: [],
  loading: 'idle',
};

export const fetchChoreToUser = createAppAsyncThunk<ChoreToUser[], void>(
  'choreToUser/fetchChoreToUser',
  async (_, { rejectWithValue }) => {
    console.log('Fetching chore to user...');
    try {
      const { data: fetchedChoreToUser, error } = await supabase
        .from('chore_to_user')
        .select('*');
      console.log('Fetched Chore To User:', fetchedChoreToUser);

      if (error) {
        console.error('Supabase Error:', error);
        return rejectWithValue(error.message);
      }

      if (!fetchedChoreToUser || fetchedChoreToUser.length === 0) {
        console.error('No chore to user found');
        return rejectWithValue('No chore to user found');
      }

      return fetchedChoreToUser;
    } catch (error) {
      console.error(error);
      return rejectWithValue('Error while fetching chore to user');
    }
  },
);

const choreToUserSlice = createSlice({
  name: 'choreToUser',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchChoreToUser.pending, (state) => {
      state.loading = 'pending';
      state.errorMessage = undefined;
    });
    builder.addCase(
      fetchChoreToUser.fulfilled,
      (state, action: PayloadAction<ChoreToUser[]>) => {
        state.allChoreToUser = action.payload;
        state.loading = 'succeeded';
      },
    );
    builder.addCase(fetchChoreToUser.rejected, (state, action) => {
      state.errorMessage = action.payload;
      state.loading = 'failed';
    });
  },
});

export const selectAllChoreToUser = (state: RootState) =>
  state.choreToUser.allChoreToUser;

export default choreToUserSlice.reducer;
