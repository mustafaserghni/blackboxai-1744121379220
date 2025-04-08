import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Divider,
  Grid,
  IconButton,
  InputAdornment,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
  FormControl,
  InputLabel,
  SelectChangeEvent,
} from '@mui/material';
import {
  Add as AddIcon,
  Search as SearchIcon,
  FilterList as FilterIcon,
  Sort as SortIcon,
  MoreVert as MoreVertIcon,
  Visibility as VisibilityIcon,
  Edit as EditIcon,
} from '@mui/icons-material';
import { useGetCasesQuery } from '../../services/api';

// Define case status colors
const statusColors: Record<string, string> = {
  ACTIVE: 'primary',
  PENDING: 'warning',
  CLOSED: 'success',
  ARCHIVED: 'default',
};

// Define case priority colors
const priorityColors: Record<string, string> = {
  HIGH: 'error',
  MEDIUM: 'warning',
  LOW: 'info',
};

const CaseList: React.FC = () => {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  
  // Query parameters
  const queryParams = {
    search: searchTerm,
    status: statusFilter,
    sort: sortBy,
  };
  
  // Fetch cases with RTK Query
  const { data: casesData, isLoading, error } = useGetCasesQuery(queryParams);
  
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };
  
  const handleStatusFilterChange = (event: SelectChangeEvent) => {
    setStatusFilter(event.target.value);
  };
  
  const handleSortChange = (event: SelectChangeEvent) => {
    setSortBy(event.target.value);
  };
  
  // Mock data for development
  const mockCases = [
    {
      id: '1',
      caseNumber: 'CASE-2023-001',
      titleEn: 'Smith vs. Johnson',
      status: 'ACTIVE',
      priority: 'HIGH',
      court: 'Dubai Civil Court',
      filingDate: '2023-01-15',
      clientName: 'Smith Corporation',
    },
    {
      id: '2',
      caseNumber: 'CASE-2023-002',
      titleEn: 'Al-Farsi Corp. Litigation',
      status: 'PENDING',
      priority: 'MEDIUM',
      court: 'Abu Dhabi Commercial Court',
      filingDate: '2023-02-20',
      clientName: 'Al-Farsi Corporation',
    },
    {
      id: '3',
      caseNumber: 'CASE-2023-003',
      titleEn: 'Dubai Properties Contract',
      status: 'ACTIVE',
      priority: 'LOW',
      court: 'Dubai Real Estate Court',
      filingDate: '2023-03-05',
      clientName: 'Dubai Properties LLC',
    },
    {
      id: '4',
      caseNumber: 'CASE-2022-045',
      titleEn: 'International Trading Dispute',
      status: 'CLOSED',
      priority: 'HIGH',
      court: 'DIFC Courts',
      filingDate: '2022-11-10',
      clientName: 'Global Trading Co.',
    },
  ];
  
  // Use mock data for development, replace with actual data in production
  const cases = casesData?.items || mockCases;

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4">{t('cases')}</Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          component={RouterLink}
          to="/cases/new"
        >
          {t('new_case')}
        </Button>
      </Box>
      
      {/* Filters and Search */}
      <Paper elevation={2} sx={{ p: 2, mb: 3 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              placeholder={t('search_cases')}
              value={searchTerm}
              onChange={handleSearchChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          
          <Grid item xs={12} md={3}>
            <FormControl fullWidth>
              <InputLabel id="status-filter-label">{t('status')}</InputLabel>
              <Select
                labelId="status-filter-label"
                value={statusFilter}
                onChange={handleStatusFilterChange}
                label={t('status')}
                startAdornment={
                  <InputAdornment position="start">
                    <FilterIcon />
                  </InputAdornment>
                }
              >
                <MenuItem value="">{t('all_statuses')}</MenuItem>
                <MenuItem value="ACTIVE">{t('active')}</MenuItem>
                <MenuItem value="PENDING">{t('pending')}</MenuItem>
                <MenuItem value="CLOSED">{t('closed')}</MenuItem>
                <MenuItem value="ARCHIVED">{t('archived')}</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          
          <Grid item xs={12} md={3}>
            <FormControl fullWidth>
              <InputLabel id="sort-by-label">{t('sort_by')}</InputLabel>
              <Select
                labelId="sort-by-label"
                value={sortBy}
                onChange={handleSortChange}
                label={t('sort_by')}
                startAdornment={
                  <InputAdornment position="start">
                    <SortIcon />
                  </InputAdornment>
                }
              >
                <MenuItem value="newest">{t('newest')}</MenuItem>
                <MenuItem value="oldest">{t('oldest')}</MenuItem>
                <MenuItem value="priority">{t('priority')}</MenuItem>
                <MenuItem value="case_number">{t('case_number')}</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          
          <Grid item xs={12} md={2}>
            <Button
              fullWidth
              variant="outlined"
              startIcon={<FilterIcon />}
            >
              {t('more_filters')}
            </Button>
          </Grid>
        </Grid>
      </Paper>
      
      {/* Case List */}
      {isLoading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Paper elevation={2} sx={{ p: 3, textAlign: 'center' }}>
          <Typography color="error">
            {t('error_loading_cases')}
          </Typography>
        </Paper>
      ) : cases.length === 0 ? (
        <Paper elevation={2} sx={{ p: 3, textAlign: 'center' }}>
          <Typography>
            {t('no_cases_found')}
          </Typography>
        </Paper>
      ) : (
        <Grid container spacing={2}>
          {cases.map((caseItem) => (
            <Grid item xs={12} key={caseItem.id}>
              <Card elevation={2}>
                <CardContent>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={8}>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                        <Typography variant="h6" component={RouterLink} to={`/cases/${caseItem.id}`} sx={{ textDecoration: 'none', color: 'primary.main' }}>
                          {caseItem.titleEn}
                        </Typography>
                      </Box>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        {caseItem.caseNumber} | {caseItem.court}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {t('client')}: {caseItem.clientName}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {t('filing_date')}: {new Date(caseItem.filingDate).toLocaleDateString()}
                      </Typography>
                    </Grid>
                    
                    <Grid item xs={12} sm={4}>
                      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 1 }}>
                        <Chip 
                          label={t(caseItem.status.toLowerCase())} 
                          color={statusColors[caseItem.status] as any} 
                          size="small" 
                          sx={{ mr: 1 }} 
                        />
                        <Chip 
                          label={t(caseItem.priority.toLowerCase())} 
                          color={priorityColors[caseItem.priority] as any} 
                          size="small" 
                        />
                      </Box>
                      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                        <IconButton 
                          component={RouterLink} 
                          to={`/cases/${caseItem.id}`}
                          size="small"
                        >
                          <VisibilityIcon fontSize="small" />
                        </IconButton>
                        <IconButton 
                          component={RouterLink} 
                          to={`/cases/${caseItem.id}/edit`}
                          size="small"
                        >
                          <EditIcon fontSize="small" />
                        </IconButton>
                        <IconButton size="small">
                          <MoreVertIcon fontSize="small" />
                        </IconButton>
                      </Box>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default CaseList;
