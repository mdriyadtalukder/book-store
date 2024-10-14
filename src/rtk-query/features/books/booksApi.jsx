import { apiSlice } from "../api/apiSlice";

export const booksApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getBooks: builder.query({
            query: (page = 1) => ({
                url: `books/?page=${page}`,
                method: "GET"
            }),
            providesTags: ["allBook"]
        })
    })
})
export const { useGetBooksQuery } = booksApi;