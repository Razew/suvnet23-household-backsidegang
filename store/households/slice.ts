// store/households/slice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { supabase } from '../../utils/supabase';
import { RootState } from '../store';
import { Household } from '../../types/types';

interface HouseholdState {
  allHouseholds: Household[];
  loading: 'idle' | 'pending' | 'succeeded' | 'failed';
  errorMessage: string | null;
}

const initialState: HouseholdState = {
  allHouseholds: [],
  loading: 'idle',
  errorMessage: null,
};

export const fetchHouseholds = createAsyncThunk(
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
      return rejectWithValue(error);
    }
  },
);

const householdsSlice = createSlice({
  name: 'households',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchHouseholds.pending, (state) => {
        state.loading = 'pending';
      })
      .addCase(fetchHouseholds.fulfilled, (state, action) => {
        state.loading = 'succeeded';
        state.allHouseholds = action.payload;
      })
      .addCase(fetchHouseholds.rejected, (state, action) => {
        state.loading = 'failed';
        state.errorMessage = action.payload as string;
      });
  },
});

// Selector function
export const selectAllHouseholds = (state: RootState) =>
  state.households.allHouseholds;

export default householdsSlice.reducer;
