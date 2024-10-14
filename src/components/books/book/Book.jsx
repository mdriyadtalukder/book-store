import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getWishList } from "../../../rtk-query/features/books/booksSlice";

const Book = ({ d }) => {
    const { wishlist } = useSelector((state) => state.books);
    const dispatch = useDispatch();
    const exitsBook=wishlist.find((f)=>f?.id===d?.id);
    return (
        <div className="col-span-1 cursor-pointer group bg-white  flex flex-col shadow-xl rounded-lg">
            <div className="flex flex-col gap-2 w-full h-full">
                <div className="w-full relative aspect-square overflow-hidden rounded-xl">
                    <img
                        alt="Listing"
                        src={d?.formats["image/jpeg"]}
                        className="object-cover w-full h-full hover:scale-110 transition"
                    />
                    <div className="absolute top-3 right-3">
                        <div onClick={() => dispatch(getWishList(d))} className="relative hover:opacity-80 transition cursor-pointer">
                            <AiOutlineHeart size={28} className="fill-white absolute -top-[1px] -right-[1px]"></AiOutlineHeart>
                            <AiFillHeart size={26} className={` ${exitsBook ? 'fill-rose-500' : 'fill-neutral-500/70'} `}></AiFillHeart>
                        </div>
                    </div>
                </div>
                <div className="font-semibold text-lg px-2">
                    {d?.title}
                </div>

                <div className="font-semibold text-sm px-2">
                    Author:{d?.authors?.map((author, idx) => (
                        <span key={idx} className="text-sm font-light ms-1">
                            {author?.name}
                        </span>
                    ))}
                </div>

                <div className="font-semibold text-xs px-2">
                    Genre:{d?.subjects?.map((genre, idx) => (
                        <span key={idx} className="text-xs font-light p-1 inline-block mt-1 ms-1 bg-[#EDEBE4] rounded-lg">
                            {genre}
                        </span>
                    ))}
                </div>

                <div className="mt-auto flex flex-col gap-1 text-lg">
                    <div className="font-semibold px-2">
                        Book ID: {d?.id}
                    </div>
                    <Link to={`/books/${d?.id}`} className="bg-black text-center text-white font-light text-xs p-1 rounded-full">View Book</Link>
                </div>

            </div>
        </div>
    );
};

export default Book;
