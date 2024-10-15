import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
    reducerPath: "booksStore",
    baseQuery: fetchBaseQuery({
        baseUrl: "https://gutendex.com/"
    }),
    tagTypes: ['allBook','singleBook'],
    endpoints: (builder) => ({})
})