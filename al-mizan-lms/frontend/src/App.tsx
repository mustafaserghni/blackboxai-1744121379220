import React, { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, StyledEngineProvider } from '@mui/material/styles';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import rtlPlugin from 'stylis-plugin-rtl';
import { prefixer } from 'stylis';
import { useAppSelector } from './store';
import { lightTheme, darkTheme } from './theme';

// Layouts
import MainLayout from './components/layouts/MainLayout';
import AuthLayout from './components/layouts/AuthLayout';

// Pages
import Dashboard from './components/pages/Dashboard';
import NotFound from './components/pages/NotFound';

// Auth Pages
import Login from './features/auth/Login';

// Case Management Pages
import CaseList from './features/case-management/CaseList';

// Document Management Pages
import DocumentList from './features/document-management/DocumentList';

// Create rtl cache
const cacheRtl = createCache({
  key: 'muirtl',
  stylisPlugins: [prefixer, rtlPlugin],
});

// Create ltr cache
const cacheLtr = createCache({
  key: 'muiltr',
});

const App: React.FC = () => {
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const { direction } = useAppSelector((state) => state.ui);
  
  // Choose the appropriate cache based on direction
  const cache = direction === 'rtl' ? cacheRtl : cacheLtr;
  
  // Choose the appropriate theme based on direction
  const theme = lightTheme(direction);
  
  // Protected route component
  const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    if (!isAuthenticated) {
      return <Navigate to="/auth/login" replace />;
    }
    
    return <>{children}</>;
  };
  
  return (
    <CacheProvider value={cache}>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={theme}>
          <Routes>
            {/* Auth Routes */}
            <Route path="/auth" element={<AuthLayout />}>
              <Route path="login" element={<Login />} />
              <Route path="register" element={<div>Register</div>} />
              <Route path="forgot-password" element={<div>Forgot Password</div>} />
              <Route path="reset-password" element={<div>Reset Password</div>} />
            </Route>
            
            {/* Protected Routes */}
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <MainLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Dashboard />} />
              
              {/* Case Management Routes */}
              <Route path="cases">
                <Route index element={<CaseList />} />
                <Route path="new" element={<div>New Case</div>} />
                <Route path=":id" element={<div>Case Details</div>} />
                <Route path=":id/edit" element={<div>Edit Case</div>} />
              </Route>
              
              {/* Document Management Routes */}
              <Route path="documents">
                <Route index element={<DocumentList />} />
                <Route path="upload" element={<div>Upload Document</div>} />
                <Route path=":id" element={<div>Document Details</div>} />
              </Route>
              
              {/* Calendar Routes */}
              <Route path="calendar" element={<div>Calendar</div>} />
              
              {/* Client Routes */}
              <Route path="clients">
                <Route index element={<div>Client List</div>} />
                <Route path="new" element={<div>New Client</div>} />
                <Route path=":id" element={<div>Client Details</div>} />
                <Route path=":id/edit" element={<div>Edit Client</div>} />
              </Route>
              
              {/* Billing Routes */}
              <Route path="billing">
                <Route index element={<div>Billing Dashboard</div>} />
                <Route path="invoices" element={<div>Invoices</div>} />
                <Route path="time-entries" element={<div>Time Entries</div>} />
              </Route>
              
              {/* Settings Routes */}
              <Route path="settings" element={<div>Settings</div>} />
              
              {/* Profile Routes */}
              <Route path="profile" element={<div>User Profile</div>} />
            </Route>
            
            {/* 404 Route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </ThemeProvider>
      </StyledEngineProvider>
    </CacheProvider>
  );
};

export default App;
