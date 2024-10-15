import { apiSlice } from "../api/apiSlice";

export const booksApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getBooks: builder.query({
            query: (page = 1) => ({
                url: `books/?page=${page}`,
                method: "GET"
            }),
            providesTags: ["allBook"]
        }),
        getBook: builder.query({
            query: (id) => ({
                url: `books/${id}`,
                method: "GET"
            }),
            providesTags: ["singleBook"]
        })
    })
})
export const { useGetBooksQuery,useGetBookQuery } = booksApi;