import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import {csrfToken} from "../components/helpers/helpers";

export const apiTweets = createApi({
  reducerPath: "tweets",
  baseQuery: fetchBaseQuery({baseUrl: "/api/v1/"}),
  tagTypes: ['Tweets'],
  endpoints: (builder) => ({
    getTweets: builder.query({
      query: () => 'tweets.json',
      providesTags: ['Tweets'],
      // headers: { 'Content-Type': 'multipart/form-data' }
    }),
    addTweet: builder.mutation({
      query: (tweet) => ({
        initialState: '',
        url: `tweets`,
        method: 'POST',
        body: tweet,
        headers: { 'X-CSRF-Token': csrfToken },
      }),
      invalidatesTags: ['Tweets'],
    }),
    updateTweet: builder.mutation({
      query: (tweet) => ({
        url: `tweets/${tweet.id}`,
        method: 'PATCH',
        body: tweet,
        headers: { 'X-CSRF-Token': csrfToken },
      }),
      invalidatesTags: ['Tweets'],
    }),
    removeTweet: builder.mutation({
      query: (id) => ({
        url: `tweets/${id}`,
        method: 'DELETE',
        body: id,
        headers: { 'X-CSRF-Token': csrfToken },
      }),
      invalidatesTags: ['Tweets'],
    }),
  })
})

export const {
  useGetTweetsQuery,
  useAddTweetMutation,
  useUpdateTweetMutation,
  useRemoveTweetMutation
} = apiTweets