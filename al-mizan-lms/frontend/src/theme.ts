import { createTheme, ThemeOptions } from '@mui/material/styles';
import { PaletteMode } from '@mui/material';

// Define colors
const primaryColor = {
  main: '#1e4d8c', // Deep blue
  light: '#4a78bc',
  dark: '#00275f',
  contrastText: '#ffffff',
};

const secondaryColor = {
  main: '#c79a3c', // Gold
  light: '#faca6b',
  dark: '#936d00',
  contrastText: '#000000',
};

// Create theme options
const getThemeOptions = (mode: PaletteMode, direction: 'ltr' | 'rtl'): ThemeOptions => ({
  direction,
  palette: {
    mode,
    primary: primaryColor,
    secondary: secondaryColor,
    background: {
      default: mode === 'light' ? '#f5f5f5' : '#121212',
      paper: mode === 'light' ? '#ffffff' : '#1e1e1e',
    },
  },
  typography: {
    fontFamily: [
      'Roboto',
      'Arial',
      'sans-serif',
      // Arabic fonts
      'Noto Sans Arabic',
      'Tahoma',
    ].join(','),
    h1: {
      fontSize: '2.5rem',
      fontWeight: 500,
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 500,
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 500,
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 500,
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 500,
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 500,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 4,
          textTransform: 'none',
          fontWeight: 500,
        },
        contained: {
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
        elevation1: {
          boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.05)',
        },
        elevation2: {
          boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.08)',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          overflow: 'hidden',
        },
      },
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          padding: 16,
          '&:last-child': {
            paddingBottom: 16,
          },
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          padding: '12px 16px',
        },
        head: {
          fontWeight: 600,
          backgroundColor: mode === 'light' ? '#f5f5f5' : '#2a2a2a',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontWeight: 500,
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: '0px 1px 4px rgba(0, 0, 0, 0.1)',
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: mode === 'light' ? '#ffffff' : '#1e1e1e',
          borderRight: `1px solid ${mode === 'light' ? '#e0e0e0' : '#333333'}`,
        },
      },
    },
  },
});

// Create light theme
export const lightTheme = (direction: 'ltr' | 'rtl' = 'ltr') => 
  createTheme(getThemeOptions('light', direction));

// Create dark theme
export const darkTheme = (direction: 'ltr' | 'rtl' = 'ltr') => 
  createTheme(getThemeOptions('dark', direction));

// Default theme
export default lightTheme();
