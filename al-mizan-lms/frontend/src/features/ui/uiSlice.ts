import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UIState {
  direction: 'ltr' | 'rtl';
  loading: boolean;
}

const initialState: UIState = {
  direction: 'ltr',
  loading: false,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setDirection: (state, action: PayloadAction<'ltr' | 'rtl'>) => {
      state.direction = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

// Export actions and reducer
export const { setDirection, setLoading } = uiSlice.actions;
export default uiSlice.reducer;
