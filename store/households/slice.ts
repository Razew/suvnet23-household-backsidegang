// store/households/slice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Household } from '../../types/types';
import { supabase } from '../../utils/supabase';
import { createAppAsyncThunk } from '../hooks';
import { RootState } from '../store';

interface HouseholdState {
  list: Household[];
  current?: Household;
  errorMessage?: string;
  loading: 'idle' | 'pending' | 'succeeded' | 'failed';
}

const initialState: HouseholdState = {
  list: [],
  current: undefined,
  loading: 'idle',
  errorMessage: undefined,
};

type HouseholdNameAndId = { name: string; id: number };
type DeleteUserFromHousehold = { householdId: number; userId: number };
// export type changeHouseholdName =  {name: string; id: string };

export const fetchHouseholds = createAppAsyncThunk<Household[], void>(
  'households/fetchHouseholds',
  async (_, { rejectWithValue }) => {
    // console.log('Fetching households...');
    try {
      const { data: fetchedHouseholds, error } = await supabase
        .from('household')
        .select('*');
      // console.log('Fetched Households:', fetchedHouseholds);

      if (error) {
        console.error('Supabase Error:', error);
        return rejectWithValue(error.message);
      }

      if (!fetchedHouseholds || fetchedHouseholds.length === 0) {
        console.error('No households found');
        return rejectWithValue('No households found');
      }

      return fetchedHouseholds;
    } catch (error) {
      console.error('Error while fetching households:', error);
      return rejectWithValue('Error while fetching households');
    }
  },
);

export const leaveHousehold = createAppAsyncThunk<
  DeleteUserFromHousehold,
  { householdId: number; userId: number }
>(
  'households/leaveHousehold',
  async ({ householdId, userId }, { rejectWithValue }) => {
    try {
      const { error } = await supabase
        .from('user_to_household')
        .delete()
        .eq('household_id', householdId)
        .eq('user_id', userId)
        .single();

      if (error) {
        console.error('Supabase Error:', error);
        return rejectWithValue(error.message);
      }

      console.log('Left household');
      return { householdId, userId };
    } catch (error) {
      console.error(error);
      return rejectWithValue('Error while leaving household');
    }
  },
);

export const updateHouseholdName = createAppAsyncThunk(
  'usersToHouseholds/updateHouseholdName',
  async ({ name, id }: HouseholdNameAndId, { rejectWithValue }) => {
    try {
      const { error } = await supabase
        .from('household')
        .update({ name: name })
        .match({ id: id });

      if (error) {
        console.error('Supabase Error:', error);
        return rejectWithValue(error.message);
      }

      return console.log('Username updated');
    } catch (error) {
      console.error(error);
      return rejectWithValue('Error while updating user to household');
    }
  },
);

const householdsSlice = createSlice({
  name: 'households',
  initialState,
  reducers: {
    setCurrentHousehold(state, action: PayloadAction<Household>) {
      state.current = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchHouseholds.pending, (state) => {
        state.loading = 'pending';
        state.errorMessage = undefined;
      })
      .addCase(
        fetchHouseholds.fulfilled,
        (state, action: PayloadAction<Household[]>) => {
          state.list = action.payload;
          state.loading = 'succeeded';
        },
      )
      .addCase(fetchHouseholds.rejected, (state, action) => {
        state.loading = 'failed';
        state.errorMessage = action.payload as string;
      });
  },
});

export const householdsReducer = householdsSlice.reducer;

// Selector function
export const selectHouseholds = (state: RootState) => state.households.list;
export const selectCurrentHousehold = (state: RootState) =>
  state.households.current;

export const { setCurrentHousehold } = householdsSlice.actions;
