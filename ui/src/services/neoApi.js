import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// this clever little library takes care of requests to our endpoints and
// memoisation so the data can be cached seamlessly
export const neoApi = createApi({
  reducerPath: 'neoApi',
  baseQuery: fetchBaseQuery({
    // TODO replace with environment variable
    baseUrl: 'http://localhost:8080',
  }),
  endpoints: (builder) => ({
    getNeoById: builder.query({
      query: (id) => `neo/${id}`,
    }),
    getNeosByDate: builder.query({
      query: (date) => `feed/${date.start}&${date.end}`,
    }),
  }),
})

export const { useGetNeosByDateQuery, useGetNeoByIdQuery } = neoApi
