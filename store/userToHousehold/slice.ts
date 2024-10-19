import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User_To_Household as UserToHousehold } from '../../types/types';
import { supabase } from '../../utils/supabase';
import { createAppAsyncThunk } from '../hooks';
import { RootState } from '../store';

interface UserToHouseholdState {
  allUserToHousehold: UserToHousehold[];
  errorMessage?: string;
  loading: 'idle' | 'pending' | 'succeeded' | 'failed';
}

const initialState: UserToHouseholdState = {
  allUserToHousehold: [],
  loading: 'idle',
};

export const fetchUserToHousehold = createAppAsyncThunk<
  UserToHousehold[],
  void
>('userToHousehold/fetchUserToHousehold', async (_, { rejectWithValue }) => {
  console.log('Fetching user to household...');
  try {
    const { data: fetchedUserToHousehold, error } = await supabase
      .from('user_to_household')
      .select('*');
    console.log('Fetched user to household:', fetchedUserToHousehold);

    if (error) {
      console.error('Supabase Error:', error);
      return rejectWithValue(error.message);
    }

    if (!fetchedUserToHousehold || fetchedUserToHousehold.length === 0) {
      console.error('No user to household found');
      return rejectWithValue('No user to household found');
    }

    return fetchedUserToHousehold;
  } catch (error) {
    console.error(error);
    return rejectWithValue('Error while fetching user to household');
  }
});

const userToHouseholdSlice = createSlice({
  name: 'userToHousehold',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUserToHousehold.pending, (state) => {
      state.loading = 'pending';
      state.errorMessage = undefined;
    });
    builder.addCase(
      fetchUserToHousehold.fulfilled,
      (state, action: PayloadAction<UserToHousehold[]>) => {
        state.allUserToHousehold = action.payload;
        state.loading = 'succeeded';
      },
    );
    builder.addCase(fetchUserToHousehold.rejected, (state, action) => {
      state.errorMessage = action.payload;
      state.loading = 'failed';
    });
  },
});

export const selectAllUserToHousehold = (state: RootState) =>
  state.userToHousehold.allUserToHousehold;

export default userToHouseholdSlice.reducer;
