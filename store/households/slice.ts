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

type UpdateHousehold = Omit<Household, 'code'>;

export const fetchHouseholds = createAppAsyncThunk<Household[], void>(
  'households/fetchHouseholds',
  async (_, { rejectWithValue }) => {
    try {
      const { data: fetchedHouseholds, error } = await supabase
        .from('household')
        .select();

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

export const updateHousehold = createAppAsyncThunk<Household, UpdateHousehold>(
  'households/updateHousehold',
  async (updateHouseholdData, { rejectWithValue }) => {
    try {
      const { data: updatedHousehold, error } = await supabase
        .from('household')
        .update(updateHouseholdData)
        .eq('id', updateHouseholdData.id)
        .select()
        .single();

      if (error) {
        console.error('Supabase Error:', error);
        return rejectWithValue(error.message);
      }

      return updatedHousehold;
    } catch (error) {
      console.error(error);
      return rejectWithValue('Error while updating household');
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
      })
      .addCase(updateHousehold.pending, (state) => {
        state.loading = 'pending';
        state.errorMessage = undefined;
      })
      .addCase(
        updateHousehold.fulfilled,
        (state, action: PayloadAction<Household>) => {
          const targetHousehold = state.list.find(
            (household) => household.id === action.payload.id,
          );
          if (targetHousehold) {
            Object.assign(targetHousehold, action.payload);
          }
          if (state.current?.id === action.payload.id) {
            state.current = action.payload;
          }
          state.loading = 'succeeded';
        },
      )
      .addCase(updateHousehold.rejected, (state, action) => {
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
