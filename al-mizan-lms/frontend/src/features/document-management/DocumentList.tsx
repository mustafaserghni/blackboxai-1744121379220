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
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
} from '@mui/material';
import {
  Add as AddIcon,
  Search as SearchIcon,
  FilterList as FilterIcon,
  Sort as SortIcon,
  MoreVert as MoreVertIcon,
  Visibility as VisibilityIcon,
  Edit as EditIcon,
  Download as DownloadIcon,
  Delete as DeleteIcon,
  Description as DocumentIcon,
  PictureAsPdf as PdfIcon,
  Image as ImageIcon,
  InsertDriveFile as FileIcon,
} from '@mui/icons-material';
import { useGetDocumentsQuery } from '../../services/api';

// Define document type icons
const documentTypeIcons: Record<string, React.ReactNode> = {
  PDF: <PdfIcon color="error" />,
  IMAGE: <ImageIcon color="primary" />,
  DOCUMENT: <DocumentIcon color="info" />,
  OTHER: <FileIcon color="action" />,
};

const DocumentList: React.FC = () => {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  
  // Query parameters
  const queryParams = {
    search: searchTerm,
    type: typeFilter,
    sort: sortBy,
    page: page + 1,
    limit: rowsPerPage,
  };
  
  // Fetch documents with RTK Query
  const { data: documentsData, isLoading, error } = useGetDocumentsQuery(queryParams);
  
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };
  
  const handleTypeFilterChange = (event: SelectChangeEvent) => {
    setTypeFilter(event.target.value);
  };
  
  const handleSortChange = (event: SelectChangeEvent) => {
    setSortBy(event.target.value);
  };
  
  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };
  
  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  
  // Mock data for development
  const mockDocuments = [
    {
      id: '1',
      title: 'Contract Agreement',
      type: 'PDF',
      size: 2500000, // in bytes
      caseNumber: 'CASE-2023-001',
      caseName: 'Smith vs. Johnson',
      uploadedBy: 'John Doe',
      uploadedAt: '2023-05-15T10:30:00Z',
      tags: ['contract', 'agreement', 'legal'],
    },
    {
      id: '2',
      title: 'Evidence Photo',
      type: 'IMAGE',
      size: 1500000, // in bytes
      caseNumber: 'CASE-2023-001',
      caseName: 'Smith vs. Johnson',
      uploadedBy: 'Jane Smith',
      uploadedAt: '2023-05-16T14:20:00Z',
      tags: ['evidence', 'photo'],
    },
    {
      id: '3',
      title: 'Court Filing',
      type: 'PDF',
      size: 3200000, // in bytes
      caseNumber: 'CASE-2023-002',
      caseName: 'Al-Farsi Corp. Litigation',
      uploadedBy: 'Ahmed Hassan',
      uploadedAt: '2023-05-18T09:15:00Z',
      tags: ['court', 'filing', 'legal'],
    },
    {
      id: '4',
      title: 'Client Statement',
      type: 'DOCUMENT',
      size: 500000, // in bytes
      caseNumber: 'CASE-2023-003',
      caseName: 'Dubai Properties Contract',
      uploadedBy: 'Sarah Johnson',
      uploadedAt: '2023-05-20T11:45:00Z',
      tags: ['client', 'statement'],
    },
    {
      id: '5',
      title: 'Expert Witness Report',
      type: 'PDF',
      size: 4100000, // in bytes
      caseNumber: 'CASE-2023-002',
      caseName: 'Al-Farsi Corp. Litigation',
      uploadedBy: 'Mohammed Al-Farsi',
      uploadedAt: '2023-05-22T16:30:00Z',
      tags: ['expert', 'witness', 'report'],
    },
  ];
  
  // Use mock data for development, replace with actual data in production
  const documents = documentsData?.items || mockDocuments;
  const totalCount = documentsData?.totalCount || mockDocuments.length;
  
  // Format file size
  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4">{t('documents')}</Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          component={RouterLink}
          to="/documents/upload"
        >
          {t('upload_document')}
        </Button>
      </Box>
      
      {/* Filters and Search */}
      <Paper elevation={2} sx={{ p: 2, mb: 3 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              placeholder={t('search_documents')}
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
              <InputLabel id="type-filter-label">{t('document_type')}</InputLabel>
              <Select
                labelId="type-filter-label"
                value={typeFilter}
                onChange={handleTypeFilterChange}
                label={t('document_type')}
                startAdornment={
                  <InputAdornment position="start">
                    <FilterIcon />
                  </InputAdornment>
                }
              >
                <MenuItem value="">{t('all_types')}</MenuItem>
                <MenuItem value="PDF">PDF</MenuItem>
                <MenuItem value="IMAGE">{t('image')}</MenuItem>
                <MenuItem value="DOCUMENT">{t('document')}</MenuItem>
                <MenuItem value="OTHER">{t('other')}</MenuItem>
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
                <MenuItem value="name">{t('name')}</MenuItem>
                <MenuItem value="size">{t('size')}</MenuItem>
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
      
      {/* Document List */}
      {isLoading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Paper elevation={2} sx={{ p: 3, textAlign: 'center' }}>
          <Typography color="error">
            {t('error_loading_documents')}
          </Typography>
        </Paper>
      ) : documents.length === 0 ? (
        <Paper elevation={2} sx={{ p: 3, textAlign: 'center' }}>
          <Typography>
            {t('no_documents_found')}
          </Typography>
        </Paper>
      ) : (
        <Paper elevation={2}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>{t('document')}</TableCell>
                  <TableCell>{t('case')}</TableCell>
                  <TableCell>{t('uploaded_by')}</TableCell>
                  <TableCell>{t('uploaded_at')}</TableCell>
                  <TableCell>{t('size')}</TableCell>
                  <TableCell align="right">{t('actions')}</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {documents.map((document) => (
                  <TableRow key={document.id}>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        {documentTypeIcons[document.type] || <FileIcon />}
                        <Box sx={{ ml: 2 }}>
                          <Typography variant="body1" component={RouterLink} to={`/documents/${document.id}`} sx={{ textDecoration: 'none', color: 'primary.main' }}>
                            {document.title}
                          </Typography>
                          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mt: 0.5 }}>
                            {document.tags.map((tag, index) => (
                              <Chip key={index} label={tag} size="small" variant="outlined" />
                            ))}
                          </Box>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">
                        {document.caseName}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {document.caseNumber}
                      </Typography>
                    </TableCell>
                    <TableCell>{document.uploadedBy}</TableCell>
                    <TableCell>
                      {new Date(document.uploadedAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell>{formatFileSize(document.size)}</TableCell>
                    <TableCell align="right">
                      <IconButton 
                        component={RouterLink} 
                        to={`/documents/${document.id}`}
                        size="small"
                      >
                        <VisibilityIcon fontSize="small" />
                      </IconButton>
                      <IconButton size="small">
                        <DownloadIcon fontSize="small" />
                      </IconButton>
                      <IconButton size="small">
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={totalCount}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      )}
    </Box>
  );
};

export default DocumentList;
