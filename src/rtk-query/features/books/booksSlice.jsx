import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    activeNav: "",
    currentPage: 1,
    perPage: 8,
    totalEntries: 0,
    wishlist: JSON.parse(localStorage.getItem('wishlist')) || [],
    option: "All genre",
    search: "",
    option2: "All genre",
    search2: "",
    pageNumber:1,
};
const booksSlice = createSlice({

    name: "bookstore",
    initialState,
    reducers: {
        setPage: (state, action) => {
            state.currentPage = action.payload
        },
        setPerPage: (state, action) => {
            state.perPage = action.payload
        },
        setTotalEntries: (state, action) => {
            state.totalEntries = action.payload
        },
        nextPage: (state) => {
            if (state.currentPage * state.perPage < state.totalEntries) {
                state.currentPage += 1
            }
        },
        prevPage: (state) => {
            if (state.currentPage > 1) {
                state.currentPage -= 1
            }
        },
        getWishList: (state, action) => {
            let book = state.wishlist.find((b) => b.id === action.payload.id);

            if (book) {
                state.wishlist = state.wishlist.filter((b) => b?.id !== action.payload?.id)
            }
            else {
                state.wishlist.push(action.payload)
            }

            localStorage.setItem('wishlist', JSON.stringify(state.wishlist));

        },
        getActiveNav: (state, action) => {
            state.activeNav = action.payload;
        },
        getOption: (state, action) => {
            state.option = action.payload;
        },
        getSearch: (state, action) => {
            state.search = action.payload;
        },
        getOption2: (state, action) => {
            state.option2 = action.payload;
        },
        getSearch2: (state, action) => {
            state.search2 = action.payload;
        },
        getPageNumber:(state,action)=>{
            state.pageNumber=action.payload;
        }
    }
})
export default booksSlice.reducer;
export const { setPage, setPerPage, setTotalEntries, nextPage, prevPage, getWishList, getActiveNav,getOption,getSearch,getOption2,getSearch2 ,getPageNumber} = booksSlice.actions