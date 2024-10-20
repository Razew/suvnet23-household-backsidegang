import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User_To_Household as UserToHousehold } from '../../types/types';
import { supabase } from '../../utils/supabase';
import { createAppAsyncThunk } from '../hooks';
import { RootState } from '../store';

interface UsersToHouseholdsState {
  usersToHouseholds: UserToHousehold[];
  errorMessage?: string;
  loading: 'idle' | 'pending' | 'succeeded' | 'failed';
}

const initialState: UsersToHouseholdsState = {
  usersToHouseholds: [],
  loading: 'idle',
};

export const fetchUsersToHouseholds = createAppAsyncThunk<
  UserToHousehold[],
  void
>(
  'usersToHouseholds/fetchUsersToHouseholds',
  async (_, { rejectWithValue }) => {
    console.log('Fetching users to households...');
    try {
      const { data: fetchedUsersToHouseholds, error } = await supabase
        .from('user_to_household')
        .select('*');
      console.log('Fetched users to households:', fetchedUsersToHouseholds);

      if (error) {
        console.error('Supabase Error:', error);
        return rejectWithValue(error.message);
      }

      if (!fetchedUsersToHouseholds || fetchedUsersToHouseholds.length === 0) {
        console.error('No user to household found');
        return rejectWithValue('No user to household found');
      }

      return fetchedUsersToHouseholds;
    } catch (error) {
      console.error(error);
      return rejectWithValue('Error while fetching user to household');
    }
  },
);

const usersToHouseholdsSlice = createSlice({
  name: 'usersToHouseholds',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUsersToHouseholds.pending, (state) => {
      state.loading = 'pending';
      state.errorMessage = undefined;
    });
    builder.addCase(
      fetchUsersToHouseholds.fulfilled,
      (state, action: PayloadAction<UserToHousehold[]>) => {
        state.usersToHouseholds = action.payload;
        state.loading = 'succeeded';
      },
    );
    builder.addCase(fetchUsersToHouseholds.rejected, (state, action) => {
      state.errorMessage = action.payload;
      state.loading = 'failed';
    });
  },
});

export const selectUsersToHouseholds = (state: RootState) =>
  state.usersToHouseholds.usersToHouseholds;

export default usersToHouseholdsSlice.reducer;
