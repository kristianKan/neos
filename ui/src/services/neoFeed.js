import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const API_KEY = 'DEMO_KEY'

export const neoFeedApi = createApi({
  reducerPath: 'neoFeedApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.nasa.gov/neo/rest/v1/feed?',
  }),
  endpoints: (builder) => ({
    getNeosByDate: builder.query({
      query: (date) =>
        `start_date/${date.start}&end_date${date.end}&api_key=${API_KEY}`,
    }),
  }),
})

export const { useGetNeosByDateQuery } = neoFeedApi
