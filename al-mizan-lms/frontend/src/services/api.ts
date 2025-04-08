import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '../store';

// Define base API configuration
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
  tagTypes: ['Cases', 'Documents', 'Clients', 'Users', 'Tasks', 'Billing'],
  endpoints: () => ({}),
});

// Case API endpoints
export const caseApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getCases: builder.query({
      query: (params) => ({
        url: 'cases',
        params,
      }),
      providesTags: ['Cases'],
    }),
    getCaseById: builder.query({
      query: (id) => `cases/${id}`,
      providesTags: (_result, _error, id) => [{ type: 'Cases', id }],
    }),
    createCase: builder.mutation({
      query: (caseData) => ({
        url: 'cases',
        method: 'POST',
        body: caseData,
      }),
      invalidatesTags: ['Cases'],
    }),
    updateCase: builder.mutation({
      query: ({ id, ...caseData }) => ({
        url: `cases/${id}`,
        method: 'PATCH',
        body: caseData,
      }),
      invalidatesTags: (_result, _error, { id }) => [{ type: 'Cases', id }],
    }),
    deleteCase: builder.mutation({
      query: (id) => ({
        url: `cases/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Cases'],
    }),
    getCaseEvents: builder.query({
      query: (id) => `cases/${id}/events`,
      providesTags: (_result, _error, id) => [{ type: 'Cases', id: `${id}-events` }],
    }),
    getCaseDeadlines: builder.query({
      query: (id) => `cases/${id}/deadlines`,
      providesTags: (_result, _error, id) => [{ type: 'Cases', id: `${id}-deadlines` }],
    }),
    getCaseTeam: builder.query({
      query: (id) => `cases/${id}/team`,
      providesTags: (_result, _error, id) => [{ type: 'Cases', id: `${id}-team` }],
    }),
    getCaseParties: builder.query({
      query: (id) => `cases/${id}/parties`,
      providesTags: (_result, _error, id) => [{ type: 'Cases', id: `${id}-parties` }],
    }),
    checkCaseConflicts: builder.query({
      query: (id) => `cases/${id}/conflict-check`,
      providesTags: (_result, _error, id) => [{ type: 'Cases', id: `${id}-conflicts` }],
    }),
  }),
});

// Document API endpoints
export const documentApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getDocuments: builder.query({
      query: (params) => ({
        url: 'documents',
        params,
      }),
      providesTags: ['Documents'],
    }),
    getDocumentById: builder.query({
      query: (id) => `documents/${id}`,
      providesTags: (_result, _error, id) => [{ type: 'Documents', id }],
    }),
    createDocument: builder.mutation({
      query: (documentData) => ({
        url: 'documents',
        method: 'POST',
        body: documentData,
      }),
      invalidatesTags: ['Documents'],
    }),
    updateDocument: builder.mutation({
      query: ({ id, ...documentData }) => ({
        url: `documents/${id}`,
        method: 'PATCH',
        body: documentData,
      }),
      invalidatesTags: (_result, _error, { id }) => [{ type: 'Documents', id }],
    }),
    deleteDocument: builder.mutation({
      query: (id) => ({
        url: `documents/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Documents'],
    }),
  }),
});

// Auth API endpoints
export const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: 'auth/login',
        method: 'POST',
        body: credentials,
      }),
    }),
    register: builder.mutation({
      query: (userData) => ({
        url: 'auth/register',
        method: 'POST',
        body: userData,
      }),
    }),
    forgotPassword: builder.mutation({
      query: (email) => ({
        url: 'auth/forgot-password',
        method: 'POST',
        body: { email },
      }),
    }),
    resetPassword: builder.mutation({
      query: (data) => ({
        url: 'auth/reset-password',
        method: 'POST',
        body: data,
      }),
    }),
    getProfile: builder.query({
      query: () => 'auth/profile',
      providesTags: ['Users'],
    }),
    updateProfile: builder.mutation({
      query: (userData) => ({
        url: 'auth/profile',
        method: 'PATCH',
        body: userData,
      }),
      invalidatesTags: ['Users'],
    }),
  }),
});

// Export hooks for usage in components
export const {
  useGetCasesQuery,
  useGetCaseByIdQuery,
  useCreateCaseMutation,
  useUpdateCaseMutation,
  useDeleteCaseMutation,
  useGetCaseEventsQuery,
  useGetCaseDeadlinesQuery,
  useGetCaseTeamQuery,
  useGetCasePartiesQuery,
  useCheckCaseConflictsQuery,
} = caseApi;

export const {
  useGetDocumentsQuery,
  useGetDocumentByIdQuery,
  useCreateDocumentMutation,
  useUpdateDocumentMutation,
  useDeleteDocumentMutation,
} = documentApi;

export const {
  useLoginMutation,
  useRegisterMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useGetProfileQuery,
  useUpdateProfileMutation,
} = authApi;
