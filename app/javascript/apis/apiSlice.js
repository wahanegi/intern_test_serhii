import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

export const apiSlice = createApi({
  reducerPath: "",
  baseQuery: fetchBaseQuery({baseUrl: "/"}),
  tagTypes: [''],
  endpoints: (builder) => ({

  })
})

export const {

} = apiSlice