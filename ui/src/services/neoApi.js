import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const API_KEY = process.env.REACT_APP_API_KEY
const BASE_URL = process.env.REACT_APP_BASE_URL

// this clever little library takes care of requests to our endpoints and
// memoisation so the data can be cached seamlessly
export const neoApi = createApi({
  reducerPath: 'neoApi',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),
  endpoints: (builder) => ({
    getNeoById: builder.query({
      query: (id) => `neo/${id}&${API_KEY}`,
    }),
    getNeosByDate: builder.query({
      query: (date) => `feed/${date.start}&${date.end}&${API_KEY}`,
    }),
  }),
})

export const { useGetNeosByDateQuery, useGetNeoByIdQuery } = neoApi