import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { authApi } from '../../services/api';

// Define types for auth state
interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  language: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

// Load initial state from localStorage if available
const loadState = (): AuthState => {
  try {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    
    if (token && user) {
      return {
        token,
        user: JSON.parse(user),
        isAuthenticated: true,
        isLoading: false,
        error: null,
      };
    }
  } catch (e) {
    // Ignore errors when loading from localStorage
  }
  
  return {
    user: null,
    token: null,
    isAuthenticated: false,
    isLoading: false,
    error: null,
  };
};

// Create the auth slice
const authSlice = createSlice({
  name: 'auth',
  initialState: loadState(),
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{ user: User; token: string }>
    ) => {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;
      state.isAuthenticated = true;
      state.error = null;
      
      // Save to localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.error = null;
      
      // Clear localStorage
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
    updateUserLanguage: (state, action: PayloadAction<string>) => {
      if (state.user) {
        state.user.language = action.payload;
        localStorage.setItem('user', JSON.stringify(state.user));
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addMatcher(
        authApi.endpoints.login.matchPending,
        (state) => {
          state.isLoading = true;
          state.error = null;
        }
      )
      .addMatcher(
        authApi.endpoints.login.matchFulfilled,
        (state, { payload }) => {
          state.isLoading = false;
          state.user = payload.user;
          state.token = payload.token;
          state.isAuthenticated = true;
          
          // Save to localStorage
          localStorage.setItem('token', payload.token);
          localStorage.setItem('user', JSON.stringify(payload.user));
        }
      )
      .addMatcher(
        authApi.endpoints.login.matchRejected,
        (state, { error }) => {
          state.isLoading = false;
          state.error = error.message || 'Authentication failed';
        }
      )
      
      // Register
      .addMatcher(
        authApi.endpoints.register.matchPending,
        (state) => {
          state.isLoading = true;
          state.error = null;
        }
      )
      .addMatcher(
        authApi.endpoints.register.matchRejected,
        (state, { error }) => {
          state.isLoading = false;
          state.error = error.message || 'Registration failed';
        }
      )
      
      // Get Profile
      .addMatcher(
        authApi.endpoints.getProfile.matchFulfilled,
        (state, { payload }) => {
          state.user = payload;
          localStorage.setItem('user', JSON.stringify(payload));
        }
      );
  },
});

// Export actions and reducer
export const { 
  setCredentials, 
  logout, 
  setError, 
  clearError,
  updateUserLanguage
} = authSlice.actions;

export default authSlice.reducer;
