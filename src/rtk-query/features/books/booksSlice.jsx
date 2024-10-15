import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    activeNav: "",
    currentPage: 1,
    perPage: 8,
    totalEntries: 0,
    wishlist: JSON.parse(localStorage.getItem('wishlist')) || [],
    option: JSON.parse(localStorage.getItem('option')) || "All genre",
    search: JSON.parse(localStorage.getItem('search')) || "",
    option2: JSON.parse(localStorage.getItem('option2')) || "All genre",
    search2: JSON.parse(localStorage.getItem('search2')) || "",
    pageNumber: 1,
    allOptions: JSON.parse(localStorage.getItem("allOption")) || [],
    allOptions2: JSON.parse(localStorage.getItem("allOption2")) || [],
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
            localStorage.setItem('option', JSON.stringify(state.option))
        },
        getSearch: (state, action) => {
            state.search = action.payload;
            localStorage.setItem('search', JSON.stringify(state.search))
        },
        getOption2: (state, action) => {
            state.option2 = action.payload;
            localStorage.setItem('option2', JSON.stringify(state.option2))
        },
        getSearch2: (state, action) => {
            state.search2 = action.payload;
            localStorage.setItem('search2', JSON.stringify(state.search2))

        },
        getPageNumber: (state, action) => {
            state.pageNumber = action.payload;
        },
        getAllOption: (state, action) => {
            const newOptions = action.payload.filter(option =>
                !state.allOptions.includes(option)
            );
            state.allOptions = [...state.allOptions, ...newOptions];
            localStorage.setItem('allOption', JSON.stringify(state.allOptions))


        },
        getAllOption2: (state, action) => {
            const newOptions = action.payload.filter(option =>
                !state.allOptions2.includes(option)
            );
            state.allOptions2 = [...state.allOptions2, ...newOptions];
            localStorage.setItem('allOption', JSON.stringify(state.allOptions2))


        }
    }
})
export default booksSlice.reducer;
export const { setPage, setPerPage, setTotalEntries, nextPage, prevPage, getWishList, getActiveNav, getOption, getSearch, getOption2, getSearch2, getPageNumber, getAllOption, getAllOption2 } = booksSlice.actions