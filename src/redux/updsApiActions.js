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

    getBills: build.query({
      query: (params) => ({
        url: `upd`,
        method: 'GET',
        params
      }),
      transformResponse: (response) => response?.data,
      providesTags: ['Upds']
    }),

    getBill: build.query({
      query: (id) => ({
        url: `bills/detail/${id}`,
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

    updateBill: build.mutation({
      query: ({ body, id }) => ({
        url: `bills/update/${id}`,
        method: 'PATCH',
        body: body
      }),
      invalidatesTags: ['Upds']
    }),

    deleteBill: build.mutation({
      query: (id) => ({
        url: `bills/delete/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Upds']
    }),

    sendBill: build.mutation({
      query: ({ body, id }) => ({
        url: `bills/send/${id}`,
        method: 'POST',
        body: body
      }),
      invalidatesTags: ['Upds']
    }),

    getBillDownload: build.mutation({
      query: ({ id, params }) => ({
        url: `bills/download/${id}`,
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
  useGetBillsQuery,
  useGetBillQuery,
  useGetParametersQuery,
  useCreateUpdMutation,
  useUpdateBillMutation,
  useDeleteBillMutation,
  useSendBillMutation,
  useGetBillDownloadMutation
} = updsApiActions;
