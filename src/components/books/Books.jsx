import { useDispatch, useSelector } from "react-redux";
import { useGetBooksQuery } from "../../rtk-query/features/books/booksApi";
import Loading from "../loading/Loading";
import Book from "./book/Book";
import { useEffect, useState } from "react";
import { getAllOption, getOption, getPageNumber, getSearch } from "../../rtk-query/features/books/booksSlice";
import { CiSearch } from "react-icons/ci";

const Books = () => {
    const [loading, setLoading] = useState(false)
    const { pageNumber, option, search, allOptions } = useSelector((state) => state.books);
    const { data, isLoading, isError, error } = useGetBooksQuery(pageNumber);
    const dispatch = useDispatch();


    useEffect(() => {
        if (data) {
            const uniqueBValues = [...new Set(data?.results.flatMap(item => item.subjects))];
            dispatch(getAllOption(uniqueBValues));
            setLoading(false);
        }
    }, [data, dispatch]);


    const handleNextPage = () => {
        if (data?.next) {
            setLoading(true);
            const queryParams = data?.next?.split('?')[1];
            const page = queryParams?.split('=')[1];
            dispatch(getPageNumber(page));
        }
    }

    const handlePrevPAge = () => {
        if (data?.previous) {
            setLoading(true)
            const queryParams = data?.previous?.split('?')[1];
            const page = queryParams?.split('=')[1];
            dispatch(getPageNumber(page));
        }
    }

    let content;
    if (isLoading || loading) {
        return <Loading></Loading>
    };
    if (!isLoading && isError) content = <p className='text-red-600 font-bold text-center'>{error?.status}</p>
    if (!isLoading && !isError && data?.results?.length === 0) content = <p className='text-blue-400 font-bold  text-center'>No book found!!</p>
    if (!isLoading && !isError && data?.results?.length > 0) {
        content = data?.results?.filter((f) => {
            if (search) {
                return f.title.toLowerCase().includes(search.toLowerCase())
            }
            else {
                return true;
            }
        })?.filter((f) => {
            if (option && option !== "All genre") {
                return f.subjects.includes(option);
            }
            else {
                return true;
            }
        })?.map((d, idx) => <Book key={idx} d={d}></Book>)

    }


    return (
        <div className="max-w-screen mx-auto xl:px-20 md:px-10 sm:px-2 px-4 pt-20 overflow-hidden">
            <div className="  pt-4 flex sm:flex-row flex-col sm:gap-10 gap-3 justify-center items-center">
                <select onChange={(e) => dispatch(getOption(e.target.value))} className="flex-1 max-w-44   outline-none focus:outline-none border-none p-2 rounded-lg ">
                    <option selected={option === "All genre"} className="">All genre</option>
                    {allOptions?.map((value, idx) => (
                        <option disabled={!data?.results.some(book => book.subjects.includes(value))} selected={option === value} key={idx} value={value}>{value}</option>
                    ))}
                </select>
                <div className="relative">
                    <input defaultValue={search} onChange={(e) => dispatch(getSearch(e.target.value))} placeholder="Search by title..." type="text" className=" focus:outline-none p-1 rounded-full text-black " />
                    <CiSearch className="absolute top-1 right-4  text-2xl text-gray-400 " />

                </div>
            </div>
            <h1 className="font-bold text-black text-5xl pb-4 pt-2">Book lists</h1>
            <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-4 gap-8">
                {content}
            </div>
            <div className='flex justify-center items-center gap-2 py-8'>
                <button
                    className={`${!data?.previous ? "bg-gray-300" : "bg-black"} rounded-lg text-white p-2 font-bold text-xs`}
                    disabled={!data?.previous}
                    onClick={handlePrevPAge}
                >
                    Prev page
                </button>
                <div className='font-bold text-gray-800'>
                    {pageNumber}
                </div>
                <button
                    className={`${!data?.next ? "bg-gray-300" : "bg-black"} rounded-lg text-white p-2 font-bold text-xs`}
                    disabled={!data?.next}
                    onClick={handleNextPage}
                >
                    Next page
                </button>



            </div>
        </div>
    );
};

export default Books;