import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
const token = document.getElementById('root_act')?.getAttribute('token');
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
        url: `acts/with_invoices`,
        method: 'GET',
        params
      }),
      transformResponse: (response) => response?.data,
      providesTags: ['Upds']
    }),

    getUpd: build.query({
      query: (id) => ({
        url: `acts/detail/${id}`,
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

    createAct: build.mutation({
      query: (body) => ({
        url: `acts/create`,
        method: 'POST',
        body: body
      }),
      invalidatesTags: ['Upds']
    }),


    updateUpd: build.mutation({
      query: ({ body, id }) => ({
        url: `acts/update/${id}`,
        method: 'PATCH',
        body: body
      }),
      invalidatesTags: ['Upds']
    }),

    deleteUpd: build.mutation({
      query: (id) => ({
        url: `acts/delete/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Upds']
    }),

    sendUpd: build.mutation({
      query: ({ body, id }) => ({
        url: `acts/send/${id}`,
        method: 'POST',
        body: body
      }),
      invalidatesTags: ['Upds']
    }),

    getUpdDownload: build.mutation({
      query: ({ type, id, params }) => ({
        url: `${type}/download/${id}`,
        method: 'GET',
        params,
        responseHandler: (response) => {
          return response.blob();
        }
      }),
    }),

    getUpdDownloadMass: build.mutation({
      query: ({ params }) => ({
        url: `acts/download`,
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
  useCreateActMutation,
  useUpdateUpdMutation,
  useDeleteUpdMutation,
  useSendUpdMutation,
  useGetUpdDownloadMutation,
  useGetUpdDownloadMassMutation,
} = updsApiActions;
