import { useDispatch, useSelector } from "react-redux";
import Book from "../books/book/Book";
import Pagination from "../pagination/Pagination";
import { useSearchParams } from "react-router-dom";
import { getOption2, getSearch2, setPage, setPerPage, setTotalEntries } from "../../rtk-query/features/books/booksSlice";
import { useEffect } from "react";
import { CiSearch } from "react-icons/ci";

const WishListedBooks = () => {
    const { currentPage, perPage, wishlist, search2, option2 } = useSelector((state) => state.books);
    const dispatch = useDispatch();
    const [searchParams] = useSearchParams();

    useEffect(() => {
        const pageParam = searchParams.get('wishListedPage') ?? '1'
        const perPageParam = searchParams.get('wishListedPer_page') ?? '8'

        dispatch(setPage(Number(pageParam)))
        dispatch(setPerPage(Number(perPageParam)));

        dispatch(setTotalEntries(wishlist?.length))


    }, [searchParams, dispatch, wishlist.length, wishlist])

    const start = (currentPage - 1) * perPage
    const end = start + perPage
    let entries;

    entries = wishlist?.slice(start, end);


    let content;

    if (wishlist?.length === 0) content = <p className='text-blue-400 font-bold self-center  text-center'>No book found!!</p>
    if (wishlist?.length > 0) {
        content = entries?.filter((f) => {
            if (search2) {
                return f.title.toLowerCase().includes(search2.toLowerCase())
            }
            else {
                return true;
            }
        })?.filter((f) => {
            if (option2 && option2 !== "All genre") {
                return f.subjects.includes(option2);
            }
            else {
                return true;
            }
        })?.map((d, idx) => <Book key={idx} d={d}></Book>)
    }
    const uniqueBValues = [...new Set(entries?.flatMap(item => item.subjects))];

    return (
        <div className="max-w-screen mx-auto xl:px-20 md:px-10 sm:px-2 px-4 pt-20">
            <div className="  pt-4 flex sm:flex-row flex-col sm:gap-10 gap-3 justify-center items-center">
                <select onChange={(e) => dispatch(getOption2(e.target.value))} className="flex-1 max-w-44   outline-none focus:outline-none border-none p-2 rounded-lg ">
                    <option className="">All genre</option>
                    {uniqueBValues.map((value, idx) => (
                        <option key={idx} value={value}>{value}</option>
                    ))}
                </select>
                <div className="relative">
                    <input onChange={(e) => dispatch(getSearch2(e.target.value))} placeholder="Search by title..." type="text" className=" focus:outline-none p-1 rounded-full text-black " />
                    <CiSearch className="absolute top-1 right-4  text-2xl text-gray-400 " />

                </div>
            </div>
            <h1 className="font-bold text-black text-5xl pb-4 pt-2">Wishlisted books</h1>

            <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-4 gap-8">
                {content}
            </div>
            <Pagination wishlists></Pagination>
        </div>
    );
};

export default WishListedBooks;