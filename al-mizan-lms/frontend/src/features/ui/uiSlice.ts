import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UiState {
  direction: 'ltr' | 'rtl';
  theme: 'light' | 'dark';
  sidebarOpen: boolean;
  loading: boolean;
  notifications: {
    id: string;
    type: 'success' | 'error' | 'info' | 'warning';
    message: string;
  }[];
}

const initialState: UiState = {
  direction: localStorage.getItem('direction') as 'ltr' | 'rtl' || 'ltr',
  theme: localStorage.getItem('theme') as 'light' | 'dark' || 'light',
  sidebarOpen: true,
  loading: false,
  notifications: [],
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setDirection: (state, action: PayloadAction<'ltr' | 'rtl'>) => {
      state.direction = action.payload;
      localStorage.setItem('direction', action.payload);
      // Update document direction
      document.dir = action.payload;
      document.documentElement.setAttribute('dir', action.payload);
    },
    
    toggleTheme: (state) => {
      const newTheme = state.theme === 'light' ? 'dark' : 'light';
      state.theme = newTheme;
      localStorage.setItem('theme', newTheme);
    },
    
    setTheme: (state, action: PayloadAction<'light' | 'dark'>) => {
      state.theme = action.payload;
      localStorage.setItem('theme', action.payload);
    },
    
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen;
    },
    
    setSidebarOpen: (state, action: PayloadAction<boolean>) => {
      state.sidebarOpen = action.payload;
    },
    
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    
    addNotification: (
      state,
      action: PayloadAction<{
        type: 'success' | 'error' | 'info' | 'warning';
        message: string;
      }>
    ) => {
      const id = Date.now().toString();
      state.notifications.push({
        id,
        ...action.payload,
      });
    },
    
    removeNotification: (state, action: PayloadAction<string>) => {
      state.notifications = state.notifications.filter(
        (notification) => notification.id !== action.payload
      );
    },
    
    clearNotifications: (state) => {
      state.notifications = [];
    },
  },
});

export const {
  setDirection,
  toggleTheme,
  setTheme,
  toggleSidebar,
  setSidebarOpen,
  setLoading,
  addNotification,
  removeNotification,
  clearNotifications,
} = uiSlice.actions;

export default uiSlice.reducer;
