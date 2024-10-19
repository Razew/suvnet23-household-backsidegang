import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Chore } from '../../types/types';
import { supabase } from '../../utils/supabase';
import { createAppAsyncThunk } from '../hooks';
import { RootState } from '../store';

type ChoresState = {
  allChores: Chore[];
  errorMessage?: string;
  loading: 'idle' | 'pending' | 'succeeded' | 'failed';
};

const initialState: ChoresState = {
  allChores: [],
  loading: 'idle',
};

export const fetchChores = createAppAsyncThunk<Chore[], void>(
  'chores/fetchChores',
  async (_, { rejectWithValue }) => {
    try {
      const { data: fetchedChores, error } = await supabase
        .from('chore')
        .select('*');

      if (error) {
        console.error('Supabase Error:', error);
        return rejectWithValue(error.message);
      }

      if (!fetchedChores || fetchedChores.length === 0) {
        console.error('No chores found');
        return rejectWithValue('No chores found');
      }

      return fetchedChores;
    } catch (error) {
      console.error(error);
      return rejectWithValue('Error while fetching chores');
    }
  },
);

const choresSlice = createSlice({
  name: 'chores',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchChores.pending, (state) => {
      state.loading = 'pending';
      state.errorMessage = undefined;
    });
    builder.addCase(
      fetchChores.fulfilled,
      (state, action: PayloadAction<Chore[]>) => {
        state.allChores = action.payload;
        state.loading = 'succeeded';
      },
    );
    builder.addCase(fetchChores.rejected, (state, action) => {
      state.errorMessage = action.payload;
      state.loading = 'failed';
    });
  },
});

export const selectAllChores = (state: RootState) => state.chores.allChores;
// export const selectChoresForCurrentHousehold = (state: RootState) =>
//   state.chores.allChores.filter(
//     (chore) => chore.household_id === state.households.current,
//   );

export default choresSlice.reducer;
