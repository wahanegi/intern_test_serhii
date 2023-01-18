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
    addTwit: builder.mutation({
      query: (twit) => ({
        initialState: '',
        url: `twits`,
        method: 'POST',
        body: twit,
        headers: { 'X-CSRF-Token': csrfToken },
      }),
      invalidatesTags: ['Twits'],
    }),
    updateTwit: builder.mutation({
      query: (twit) => ({
        url: `twits/${twit.id}`,
        method: 'PATCH',
        body: twit,
        headers: { 'X-CSRF-Token': csrfToken },
      }),
      invalidatesTags: ['Twits'],
    }),
    removeTwit: builder.mutation({
      query: (id) => ({
        url: `twits/${id}`,
        method: 'DELETE',
        body: id,
        headers: { 'X-CSRF-Token': csrfToken },
      }),
      invalidatesTags: ['Twits'],
    }),
  })
})

export const {
  useGetTwitsQuery,
  useAddTwitMutation,
  useUpdateTwitMutation,
  useRemoveTwitMutation
} = apiTwits