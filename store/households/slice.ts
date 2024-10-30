// store/households/slice.ts
import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Household, NewHousehold } from '../../types/types';
import { supabase } from '../../utils/supabase';
import { createAppAsyncThunk } from '../hooks';
import { RootState } from '../store';

interface HouseholdState {
  list: Household[];
  current?: Household;
  foundHousehold?: Household; // Alex & Andrew are using the from JoinHousehold.tsx
  errorMessage?: string;
  loading: 'idle' | 'pending' | 'succeeded' | 'failed';
}

const initialState: HouseholdState = {
  list: [],
  current: undefined,
  foundHousehold: undefined,
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

export const createHousehold = createAppAsyncThunk<Household, NewHousehold>(
  'households/createHousehold',
  async (createHouseholdData, { rejectWithValue }) => {
    try {
      const { data: createdHousehold, error } = await supabase
        .from('household')
        .insert(createHouseholdData)
        .select()
        .single();

      if (error) {
        console.error('Supabase Error:', error);
        return rejectWithValue(error.message);
      }

      return createdHousehold;
    } catch (error) {
      console.error(error);
      return rejectWithValue('Error while creating household');
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
    setHouseholdBeingJoined(state, action) {
      state.foundHousehold = action.payload;
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
      })
      .addCase(createHousehold.pending, (state) => {
        state.loading = 'pending';
        state.errorMessage = undefined;
      })
      .addCase(
        createHousehold.fulfilled,
        (state, action: PayloadAction<Household>) => {
          state.list.push(action.payload);
          state.current = action.payload;
          state.loading = 'succeeded';
        },
      )
      .addCase(createHousehold.rejected, (state, action) => {
        state.loading = 'failed';
        state.errorMessage = action.payload as string;
      });
  },
});

export const { setCurrentHousehold, setHouseholdBeingJoined } =
  householdsSlice.actions;
export const householdsReducer = householdsSlice.reducer;

// Selector function
export const selectHouseholds = (state: RootState) => state.households.list;
export const selectCurrentHousehold = (state: RootState) =>
  state.households.current;
export const selectHouseholdBeingJoined = (state: RootState) =>
  state.households.list.find(
    (h) => h.id === state.households.foundHousehold?.id,
  );
//Alex and Andrews selector, dont get mad Marcus :( <3<3<3<3<3
export const selectHouseholdErrorMessage = (state: RootState) =>
  state.households.errorMessage;
export const selectHouseholdLoadingStatus = (state: RootState) =>
  state.households.loading;
export const selectHouseholdStatus = createSelector(
  [selectHouseholdLoadingStatus, selectHouseholdErrorMessage],
  (loading, errorMessage) => ({ loading, errorMessage }),
);
