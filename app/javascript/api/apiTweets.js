import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import {csrfToken} from "../components/helpers/helpers";

export const apiTweets = createApi({
  reducerPath: "tweets",
  baseQuery: fetchBaseQuery({baseUrl: "/api/v1/"}),
  tagTypes: ['Tweets'],
  endpoints: (builder) => ({
    getTweets: builder.query({
      query: ({page = 1}) => `tweets?page=${page}`,
      serializeQueryArgs: ({ endpointName }) => {
        return endpointName;
      },
      // Merge incoming data to the cache entry for scrolling page
      merge: (currentCache, newItems, opts) => {
        if (opts.arg.hasNextPage) {
          currentCache.data.push(...newItems.data);
        } else {
          return { data: newItems.data }
        }
      },
      // Refetch when the page arg changes
      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg;
      },
      providesTags: ['Tweets'],
    }),
    addTweet: builder.mutation({
      query: (tweet) => ({
        initialState: '',
        url: `tweets`,
        method: 'POST',
        body: tweet,
        headers: { 'X-CSRF-Token': csrfToken },
      }),
      invalidatesTags:['Tweets'],
    }),
    updateTweet: builder.mutation({
      query: (tweet) => ({
        url: `tweets/${tweet.id}`,
        method: 'PATCH',
        body: tweet,
        headers: { 'X-CSRF-Token': csrfToken },
      }),
      invalidatesTags:['Tweets'],
    }),
    removeTweet: builder.mutation({
      query: (id) => ({
        url: `tweets/${id}`,
        method: 'DELETE',
        body: id,
        headers: { 'X-CSRF-Token': csrfToken },
      }),
      invalidatesTags:['Tweets'],
    }),
  })
})

export const {
  useGetTweetsQuery,
  useAddTweetMutation,
  useUpdateTweetMutation,
  useRemoveTweetMutation
} = apiTweets