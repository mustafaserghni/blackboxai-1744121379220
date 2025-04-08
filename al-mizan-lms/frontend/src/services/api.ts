import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '../store';

// Define base types
interface PaginatedResponse<T> {
  items: T[];
  totalCount: number;
  page: number;
  limit: number;
}

// Auth types
interface LoginRequest {
  email: string;
  password: string;
}

interface AuthResponse {
  accessToken: string;
  user: User;
}

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  language: string;
}

// Case types
interface Case {
  id: string;
  caseNumber: string;
  titleEn: string;
  titleAr?: string;
  status: 'ACTIVE' | 'PENDING' | 'CLOSED' | 'ARCHIVED';
  priority: 'HIGH' | 'MEDIUM' | 'LOW';
  court: string;
  filingDate: string;
  clientId: string;
  clientName: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
}

// Document types
interface Document {
  id: string;
  title: string;
  type: 'PDF' | 'IMAGE' | 'DOCUMENT' | 'OTHER';
  size: number;
  caseId: string;
  caseNumber: string;
  caseName: string;
  uploadedBy: string;
  uploadedAt: string;
  tags: string[];
  url: string;
}

// Create the API service
export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_URL || 'http://localhost:3000/api',
    prepareHeaders: (headers, { getState }) => {
      // Get token from auth state
      const token = (getState() as RootState).auth.token;
      
      // If token exists, add authorization header
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      
      return headers;
    },
  }),
  tagTypes: ['Case', 'Document', 'User'],
  endpoints: (builder) => ({
    // Auth endpoints
    login: builder.mutation<AuthResponse, LoginRequest>({
      query: (credentials) => ({
        url: '/auth/login',
        method: 'POST',
        body: credentials,
      }),
    }),
    
    logout: builder.mutation<void, void>({
      query: () => ({
        url: '/auth/logout',
        method: 'POST',
      }),
    }),
    
    // Case endpoints
    getCases: builder.query<PaginatedResponse<Case>, any>({
      query: (params) => ({
        url: '/cases',
        params,
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.items.map(({ id }) => ({ type: 'Case' as const, id })),
              { type: 'Case', id: 'LIST' },
            ]
          : [{ type: 'Case', id: 'LIST' }],
    }),
    
    getCase: builder.query<Case, string>({
      query: (id) => `/cases/${id}`,
      providesTags: (result, error, id) => [{ type: 'Case', id }],
    }),
    
    createCase: builder.mutation<Case, Partial<Case>>({
      query: (newCase) => ({
        url: '/cases',
        method: 'POST',
        body: newCase,
      }),
      invalidatesTags: [{ type: 'Case', id: 'LIST' }],
    }),
    
    updateCase: builder.mutation<Case, { id: string; updates: Partial<Case> }>({
      query: ({ id, updates }) => ({
        url: `/cases/${id}`,
        method: 'PATCH',
        body: updates,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: 'Case', id },
        { type: 'Case', id: 'LIST' },
      ],
    }),
    
    // Document endpoints
    getDocuments: builder.query<PaginatedResponse<Document>, any>({
      query: (params) => ({
        url: '/documents',
        params,
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.items.map(({ id }) => ({ type: 'Document' as const, id })),
              { type: 'Document', id: 'LIST' },
            ]
          : [{ type: 'Document', id: 'LIST' }],
    }),
    
    getDocument: builder.query<Document, string>({
      query: (id) => `/documents/${id}`,
      providesTags: (result, error, id) => [{ type: 'Document', id }],
    }),
    
    uploadDocument: builder.mutation<Document, FormData>({
      query: (formData) => ({
        url: '/documents',
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: [{ type: 'Document', id: 'LIST' }],
    }),
    
    deleteDocument: builder.mutation<void, string>({
      query: (id) => ({
        url: `/documents/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, id) => [
        { type: 'Document', id },
        { type: 'Document', id: 'LIST' },
      ],
    }),
    
    // User endpoints
    updateUserLanguage: builder.mutation<User, string>({
      query: (language) => ({
        url: '/users/language',
        method: 'PATCH',
        body: { language },
      }),
      invalidatesTags: (result, error, id) => [{ type: 'User', id }],
    }),
  }),
});

// Export hooks for usage in components
export const {
  useLoginMutation,
  useLogoutMutation,
  useGetCasesQuery,
  useGetCaseQuery,
  useCreateCaseMutation,
  useUpdateCaseMutation,
  useGetDocumentsQuery,
  useGetDocumentQuery,
  useUploadDocumentMutation,
  useDeleteDocumentMutation,
  useUpdateUserLanguageMutation,
} = api;
