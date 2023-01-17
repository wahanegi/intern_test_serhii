import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import {csrfToken} from "../components/helpers/helpers";

export const apiTwits = createApi({
  reducerPath: "twits",
  baseQuery: fetchBaseQuery({baseUrl: "/api/v1/"}),
  tagTypes: ['Twits'],
  endpoints: (builder) => ({
    getTwits: builder.query({
      query: () => 'twits.json',
      providesTags: ['Twits'],
      // headers: { 'Content-Type': 'multipart/form-data' }
    }),
  })
})

export const {
  useGetTwitsQuery
} = apiTwits