import React from 'react';
import { useTranslation } from 'react-i18next';
import { 
  Box, 
  Typography, 
  Grid, 
  Paper, 
  Card, 
  CardContent, 
  CardHeader,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  LinearProgress,
  Chip
} from '@mui/material';
import { 
  Gavel as CaseIcon,
  Event as EventIcon,
  AccessTime as DeadlineIcon,
  Description as DocumentIcon,
  AttachMoney as BillingIcon
} from '@mui/icons-material';

const Dashboard: React.FC = () => {
  const { t } = useTranslation();
  
  // Mock data - in a real app, this would come from API
  const activeCases = 12;
  const pendingDeadlines = 5;
  const upcomingEvents = 3;
  const recentDocuments = 8;
  const unbilledHours = 24.5;
  
  const caseStatusData = [
    { status: 'Active', count: 12, color: '#1e4d8c' },
    { status: 'Pending', count: 4, color: '#c79a3c' },
    { status: 'Closed', count: 8, color: '#388e3c' },
    { status: 'Archived', count: 15, color: '#757575' },
  ];
  
  const upcomingDeadlines = [
    { id: 1, title: 'File Motion for Summary Judgment', case: 'Smith v. Johnson', date: '2023-06-15' },
    { id: 2, title: 'Submit Expert Witness List', case: 'Al-Farsi Corp. Litigation', date: '2023-06-18' },
    { id: 3, title: 'Prepare Discovery Responses', case: 'Dubai Properties Contract', date: '2023-06-20' },
  ];
  
  const recentEvents = [
    { id: 1, title: 'Client Meeting', case: 'Smith v. Johnson', date: '2023-06-10 14:00' },
    { id: 2, title: 'Court Hearing', case: 'Al-Farsi Corp. Litigation', date: '2023-06-12 09:30' },
    { id: 3, title: 'Document Review', case: 'Dubai Properties Contract', date: '2023-06-14 11:00' },
  ];

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        {t('dashboard')}
      </Typography>
      
      {/* Summary Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={4} lg={2.4}>
          <Paper
            elevation={2}
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              bgcolor: 'primary.light',
              color: 'white',
            }}
          >
            <CaseIcon sx={{ fontSize: 40 }} />
            <Typography variant="h4">{activeCases}</Typography>
            <Typography variant="body2">{t('active_cases')}</Typography>
          </Paper>
        </Grid>
        
        <Grid item xs={12} sm={6} md={4} lg={2.4}>
          <Paper
            elevation={2}
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              bgcolor: 'secondary.light',
              color: 'white',
            }}
          >
            <DeadlineIcon sx={{ fontSize: 40 }} />
            <Typography variant="h4">{pendingDeadlines}</Typography>
            <Typography variant="body2">{t('pending_deadlines')}</Typography>
          </Paper>
        </Grid>
        
        <Grid item xs={12} sm={6} md={4} lg={2.4}>
          <Paper
            elevation={2}
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              bgcolor: 'info.light',
              color: 'white',
            }}
          >
            <EventIcon sx={{ fontSize: 40 }} />
            <Typography variant="h4">{upcomingEvents}</Typography>
            <Typography variant="body2">{t('upcoming_events')}</Typography>
          </Paper>
        </Grid>
        
        <Grid item xs={12} sm={6} md={4} lg={2.4}>
          <Paper
            elevation={2}
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              bgcolor: 'success.light',
              color: 'white',
            }}
          >
            <DocumentIcon sx={{ fontSize: 40 }} />
            <Typography variant="h4">{recentDocuments}</Typography>
            <Typography variant="body2">{t('recent_documents')}</Typography>
          </Paper>
        </Grid>
        
        <Grid item xs={12} sm={6} md={4} lg={2.4}>
          <Paper
            elevation={2}
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              bgcolor: 'warning.light',
              color: 'white',
            }}
          >
            <BillingIcon sx={{ fontSize: 40 }} />
            <Typography variant="h4">{unbilledHours}</Typography>
            <Typography variant="body2">{t('unbilled_hours')}</Typography>
          </Paper>
        </Grid>
      </Grid>
      
      {/* Main Content */}
      <Grid container spacing={3}>
        {/* Case Status */}
        <Grid item xs={12} md={6}>
          <Card elevation={2}>
            <CardHeader title={t('case_status')} />
            <CardContent>
              {caseStatusData.map((status) => (
                <Box key={status.status} sx={{ mb: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body2">{status.status}</Typography>
                    <Typography variant="body2">{status.count}</Typography>
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={(status.count / 39) * 100}
                    sx={{
                      height: 10,
                      borderRadius: 5,
                      bgcolor: 'grey.200',
                      '& .MuiLinearProgress-bar': {
                        bgcolor: status.color,
                      },
                    }}
                  />
                </Box>
              ))}
            </CardContent>
          </Card>
        </Grid>
        
        {/* Upcoming Deadlines */}
        <Grid item xs={12} md={6}>
          <Card elevation={2}>
            <CardHeader 
              title={t('upcoming_deadlines')} 
              action={
                <Chip 
                  label={`${upcomingDeadlines.length} ${t('items')}`} 
                  color="primary" 
                  size="small" 
                />
              }
            />
            <CardContent>
              <List>
                {upcomingDeadlines.map((deadline, index) => (
                  <React.Fragment key={deadline.id}>
                    <ListItem>
                      <ListItemIcon>
                        <DeadlineIcon color="error" />
                      </ListItemIcon>
                      <ListItemText
                        primary={deadline.title}
                        secondary={
                          <>
                            <Typography component="span" variant="body2" color="text.primary">
                              {deadline.case}
                            </Typography>
                            {` — ${new Date(deadline.date).toLocaleDateString()}`}
                          </>
                        }
                      />
                    </ListItem>
                    {index < upcomingDeadlines.length - 1 && <Divider variant="inset" component="li" />}
                  </React.Fragment>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
        
        {/* Recent Events */}
        <Grid item xs={12}>
          <Card elevation={2}>
            <CardHeader 
              title={t('recent_events')} 
              action={
                <Chip 
                  label={`${recentEvents.length} ${t('items')}`} 
                  color="secondary" 
                  size="small" 
                />
              }
            />
            <CardContent>
              <Grid container spacing={2}>
                {recentEvents.map((event) => (
                  <Grid item xs={12} md={4} key={event.id}>
                    <Paper elevation={1} sx={{ p: 2 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                        <EventIcon color="secondary" sx={{ mr: 1 }} />
                        <Typography variant="h6">{event.title}</Typography>
                      </Box>
                      <Typography variant="body2" color="text.secondary">
                        {event.case}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {new Date(event.date).toLocaleString()}
                      </Typography>
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
