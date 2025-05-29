import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
const token = document.getElementById('root_upd')?.getAttribute('token');
const baseURL = process.env.REACT_APP_BASE_URL;

export const updsApiActions = createApi({
  reducerPath: 'updsApiActions',
  tagTypes: ['Upd', 'Upds'],
  baseQuery: fetchBaseQuery({
    baseUrl: baseURL,
    headers: {
      'Content-Type': 'application/json',
      Authorization: token ? token : '',
      Accept: 'application/json'
    }
  }),
  endpoints: (build) => ({

    getUpds: build.query({
      query: (params) => ({
        url: `upd`,
        method: 'GET',
        params
      }),
      transformResponse: (response) => response?.data,
      providesTags: ['Upds']
    }),

    getUpd: build.query({
      query: (id) => ({
        url: `upd/detail/${id}`,
        method: 'GET',
      }),
      transformResponse: (response) => response?.data
    }),

    getParameters: build.query({
      query: () => ({
        url: `parameters`,
        method: 'GET',
      }),
      transformResponse: (response) => response?.data
    }),

    createUpd: build.mutation({
      query: (body) => ({
        url: `upd/create`,
        method: 'POST',
        body: body
      }),
      invalidatesTags: ['Upds']
    }),

    updateUpd: build.mutation({
      query: ({ body, id }) => ({
        url: `upd/update/${id}`,
        method: 'PATCH',
        body: body
      }),
      invalidatesTags: ['Upds']
    }),

    deleteUpd: build.mutation({
      query: (id) => ({
        url: `upd/delete/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Upds']
    }),

    sendUpd: build.mutation({
      query: ({ body, id }) => ({
        url: `upd/send/${id}`,
        method: 'POST',
        body: body
      }),
      invalidatesTags: ['Upds']
    }),

    getUpdDownload: build.mutation({
      query: ({ id, params }) => ({
        url: `upd/download/${id}`,
        method: 'GET',
        params,
        responseHandler: (response) => {
          return response.blob();
        }
      }),
    }),
  })
});

export const {
  useGetUpdsQuery,
  useGetUpdQuery,
  useGetParametersQuery,
  useCreateUpdMutation,
  useUpdateUpdMutation,
  useDeleteUpdMutation,
  useSendUpdMutation,
  useGetUpdDownloadMutation
} = updsApiActions;
