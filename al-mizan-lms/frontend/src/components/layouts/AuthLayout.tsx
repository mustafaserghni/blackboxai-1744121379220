import React from 'react';
import { Outlet } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  Box,
  Container,
  Paper,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  AppBar,
  Toolbar,
} from '@mui/material';
import { Translate as TranslateIcon } from '@mui/icons-material';
import { useAppDispatch } from '../../store';
import { setDirection } from '../../features/ui/uiSlice';
import { changeLanguage } from '../../i18n';

const AuthLayout: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const [anchorElLang, setAnchorElLang] = React.useState<null | HTMLElement>(null);

  const handleOpenLangMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElLang(event.currentTarget);
  };

  const handleCloseLangMenu = () => {
    setAnchorElLang(null);
  };

  const handleLanguageChange = (lang: string) => {
    changeLanguage(lang);
    dispatch(setDirection(lang === 'ar' ? 'rtl' : 'ltr'));
    handleCloseLangMenu();
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <AppBar position="static" color="transparent" elevation={0}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Al-Mizan LMS
          </Typography>
          
          {/* Language Menu */}
          <Tooltip title={t('change_language')}>
            <IconButton onClick={handleOpenLangMenu} sx={{ p: 0, mx: 1 }}>
              <TranslateIcon />
            </IconButton>
          </Tooltip>
          <Menu
            sx={{ mt: '45px' }}
            id="language-menu"
            anchorEl={anchorElLang}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorElLang)}
            onClose={handleCloseLangMenu}
          >
            <MenuItem onClick={() => handleLanguageChange('en')}>
              <Typography textAlign="center">English</Typography>
            </MenuItem>
            <MenuItem onClick={() => handleLanguageChange('ar')}>
              <Typography textAlign="center">العربية</Typography>
            </MenuItem>
            <MenuItem onClick={() => handleLanguageChange('fr')}>
              <Typography textAlign="center">Français</Typography>
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
      
      <Container component="main" maxWidth="sm" sx={{ mt: 8, mb: 4 }}>
        <Paper
          elevation={3}
          sx={{
            p: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Box
            sx={{
              my: 2,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Typography component="h1" variant="h4" gutterBottom>
              {t('welcome_to_almizan')}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary" align="center">
              {t('legal_management_system')}
            </Typography>
          </Box>
          
          <Outlet />
        </Paper>
      </Container>
      
      <Box
        component="footer"
        sx={{
          py: 3,
          px: 2,
          mt: 'auto',
          backgroundColor: (theme) =>
            theme.palette.mode === 'light'
              ? theme.palette.grey[200]
              : theme.palette.grey[800],
        }}
      >
        <Container maxWidth="sm">
          <Typography variant="body2" color="text.secondary" align="center">
            © {new Date().getFullYear()} Al-Mizan Legal Management System
          </Typography>
        </Container>
      </Box>
    </Box>
  );
};

export default AuthLayout;
