import { useState } from "react";
import { FaBarsStaggered } from "react-icons/fa6";
import { IoMdHeart } from "react-icons/io";
import { IoBookSharp } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getActiveNav, getOption, getOption2, getSearch, getSearch2 } from "../../rtk-query/features/books/booksSlice";

const Navbar = () => {
    const [open, setOpen] = useState(false);
    const { activeNav, wishlist } = useSelector((state) => state.books);
    const dispatch = useDispatch();

    return (
        <div className={` shadow-lg fixed w-full h-16 bg-[#f2eddd] flex justify-between items-center md:px-16 lg:px-[150px] xl:px-[150px] 2xl:px-[150px] sm:px-10 z-50`}>
            <Link onClick={() => {
                dispatch(getActiveNav("Home"));
                dispatch(getSearch(''));
                dispatch(getSearch2(''));
                dispatch(getOption("All genre"));
                dispatch(getOption2("All genre"));
            }} to='/'><IoBookSharp className="text-5xl text-black"></IoBookSharp></Link>

            <div className="lg:flex md:flex xl:flex 2xl:flex justify-between items-center hidden  gap-5">
                {/* <div className="relative">
                    <input type="text" className=" focus:outline-none p-1 rounded-full text-black " />
                    <CiSearch className="absolute top-1 right-4  text-2xl text-gray-400 " />

                </div> */}
                <Link onClick={() => {
                    dispatch(getActiveNav("Home"));
                    dispatch(getSearch(''));
                    dispatch(getSearch2(''));
                    dispatch(getOption("All genre"));
                    dispatch(getOption2("All genre"));

                }} to='/' className={` ${activeNav === "Home" ? "bg-black" : "bg-white"} ${activeNav === "Home" ? "text-white" : "text-black"} p-2 rounded-lg text-sm  font-bold`}>Home</Link>
                <Link onClick={() => {
                    dispatch(getActiveNav("WishList"));
                    dispatch(getSearch(''));
                    dispatch(getSearch2(''));
                    dispatch(getOption("All genre"));
                    dispatch(getOption2("All genre"));
                }} to='/wishList' className={` ${activeNav === "WishList" ? "bg-black" : "bg-white"} ${activeNav === "WishList" ? "text-white" : "text-black"} p-2 rounded-lg text-sm  font-bold`}>Wishlist</Link>
                <Link onClick={() => {
                    dispatch(getActiveNav("WishList"));
                    dispatch(getSearch(''));
                    dispatch(getSearch2(''));
                    dispatch(getOption("All genre"));
                    dispatch(getOption2("All genre"));
                }} to='/wishList' className="relative">
                    <IoMdHeart className="text-3xl text-pink-600" ></IoMdHeart>
                    <span className="absolute top-[-10px] -right-1 font-semibold text-xs rounded-full h-3 w-3 flex justify-center items-center p-[9px]  text-white bg-red-600">{wishlist?.length}</span>
                </Link>



            </div>
            <FaBarsStaggered onClick={() => setOpen(!open)} className="text-black text-2xl sm:hidden" />
            <div className={`absolute right-0 opacity-50 bg-gray-400 flex flex-col justify-center items-center w-screen h-[90vh] gap-4 transition ${open ? "translate-y-0" : "-translate-y-full"} ${open ? "top-16" : "top-0"}`}>

                <Link onClick={() => {
                    dispatch(getActiveNav("Home"));
                    dispatch(getSearch(''));
                    dispatch(getSearch2(''));
                    dispatch(getOption("All genre"));
                    dispatch(getOption2("All genre"));
                }} to='/' className={` ${activeNav === "Home" ? "bg-black" : "bg-white"} ${activeNav === "Home" ? "text-white" : "text-black"} p-2 rounded-lg text-sm  font-bold`}>Home</Link>
                <Link onClick={() => {
                    dispatch(getActiveNav("WishList"));
                    dispatch(getSearch(''));
                    dispatch(getSearch2(''));
                    dispatch(getOption("All genre"));
                    dispatch(getOption2("All genre"));
                }} to='/wishList' className={` ${activeNav === "WishList" ? "bg-black" : "bg-white"} ${activeNav === "WishList" ? "text-white" : "text-black"} p-2 rounded-lg text-sm  font-bold`}>Wishlist</Link>
                <Link onClick={() => {
                    dispatch(getActiveNav("WishList"));
                    dispatch(getSearch(''));
                    dispatch(getSearch2(''));
                    dispatch(getOption("All genre"));
                    dispatch(getOption2("All genre"));
                }} to='/wishList' className="relative">
                    <IoMdHeart className="text-3xl text-pink-600" ></IoMdHeart>
                    <span className="absolute top-[-10px] -right-1 font-semibold text-xs rounded-full h-3 w-3 flex justify-center items-center p-[9px]  text-white bg-red-600">{wishlist?.length}</span>
                </Link>
                {/* <div className="relative">
                    <input type="text" className=" focus:outline-none p-1 rounded-full text-black " />
                    <CiSearch className="absolute  top-1 right-4 text-2xl text-gray-400 " />

                </div> */}
            </div>
        </div>
    );
};

export default Navbar;