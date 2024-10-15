import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { nextPage, prevPage } from "../../rtk-query/features/books/booksSlice";

const Pagination = () => {
    const navigate = useNavigate();
    const { currentPage, perPage, totalEntries } = useSelector((state) => state.books);
    const dispatch = useDispatch();


    const totalPages = Math.ceil(totalEntries / perPage)
    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            dispatch(newPage > currentPage ? nextPage() : prevPage())
            navigate(`/wishList/?wishListedPage=${newPage}&wishListedPer_page=${perPage}`)
        }
    }
    return (
        <div className='flex justify-center items-center gap-2 py-8'>
            <button
                className={`${currentPage === 1 ? "bg-gray-300" : "bg-black"} rounded-lg text-white p-2 font-bold text-xs`}
                disabled={currentPage === 1}
                onClick={() => handlePageChange(currentPage - 1)}
            >
                Prev page
            </button>

            <div className='font-bold text-gray-800'>
                {currentPage} / {totalPages}
            </div>

            <button
                className={`${currentPage === totalPages || totalPages === 0 ? "bg-gray-300" : "bg-black"} rounded-lg text-white p-2 font-bold text-xs`}
                disabled={currentPage === totalPages || totalPages === 0}
                onClick={() => handlePageChange(currentPage + 1)}>
                Next page
            </button>



        </div>
    );
};

export default Pagination;