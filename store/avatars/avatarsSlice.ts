import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Avatar } from '../../types/types';
import { supabase } from '../../utils/supabase';
import { createAppAsyncThunk } from '../hooks';
import { RootState } from '../store';

type AvatarsState = {
  allAvatars: Avatar[];
  errorMessage?: string;
  loading: 'idle' | 'pending' | 'succeeded' | 'failed';
};

const initialState: AvatarsState = {
  allAvatars: [],
  loading: 'idle',
};

const avatarsSlice = createSlice({
  name: 'avatars',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAvatars.pending, (state) => {
      state.loading = 'pending';
      state.errorMessage = undefined;
    });
    builder.addCase(
      fetchAvatars.fulfilled,
      (state, action: PayloadAction<Avatar[]>) => {
        state.allAvatars = action.payload;
        state.loading = 'succeeded';
      },
    );
    builder.addCase(fetchAvatars.rejected, (state, action) => {
      state.errorMessage = action.payload;
      state.loading = 'failed';
    });
  },
});

export const fetchAvatars = createAppAsyncThunk(
  'avatars/fetchAvatars',
  async (_, { rejectWithValue }) => {
    console.log('Fetching avatars...');
    try {
      const { data: fetchedAvatars, error } = await supabase
        .from('avatar')
        .select('*');
      console.log('Fetched Avatars:', fetchedAvatars);

      if (error) {
        console.error('Supabase Error:', error);
        return rejectWithValue(error.message);
      }

      if (!fetchedAvatars || fetchedAvatars.length === 0) {
        console.error('No avatars found');
        return rejectWithValue('No avatars found');
      }

      return fetchedAvatars;
    } catch (error) {
      console.error(error);
      return rejectWithValue('Error while fetching avatars');
    }
  },
);

export const selectAllAvatars = (state: RootState) => state.avatars.allAvatars;

export default avatarsSlice.reducer;
