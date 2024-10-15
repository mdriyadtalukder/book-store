import { useParams } from "react-router-dom";
import { useGetBookQuery } from "../../rtk-query/features/books/booksApi";
import Loading from "../../components/loading/Loading";

const SingleBook = () => {
    const { id } = useParams();
    const { data, isLoading, isError, error } = useGetBookQuery(id);
    let content;
    const formatName = {
        "text/html": "HTML Book",
        "text/html; charset=iso-8859-1": "HTML (ISO-8859-1)",
        "application/epub+zip": "EPUB Book",
        "application/x-mobipocket-ebook": "MOBI Book",
        "text/plain; charset=iso-8859-1": "Plain Text (ISO-8859-1)",
        "application/rdf+xml": "RDF Metadata",
        "image/jpeg": "Book Cover Image",
        "application/octet-stream": "ZIP Archive",
        "text/plain; charset=us-ascii": "Plain Text (ASCII)"
    }; if (isLoading) {
        return <Loading></Loading>
    };
    if (!isLoading && isError) content = <p className='text-red-600 font-bold text-center'>{error?.status}</p>
    if (!isLoading && !isError && !data?.id) content = <p className='text-blue-400 font-bold  text-center'>No book details found!!</p>
    if (!isLoading && !isError && data?.id) {
        content = (
            <div key={data?.id} className="flex flex-col md:flex-row -mx-4">
                <div className="md:flex-1 px-4">
                    <div className="h-[460px] rounded-lg bg-[#EDEBE4]  mb-4">
                        <img className="w-full h-full object-cover" src={data?.formats["image/jpeg"]} alt="Book Image" />
                    </div>

                </div>
                <div className="md:flex-1 px-4">
                    <h2 className="text-2xl font-bold text-gray-800  mb-2">{data?.title}</h2>
                    <p className="text-gray-600 mb-4 text-lg font-semibold">
                        Author: {data?.authors?.length > 0 ? data?.authors?.map((author, idx) => (
                            <span key={idx} className="font-light ms-1">
                                {idx+1}. {author?.name}
                                {author?.birth_year ? ` (Born: ${author?.birth_year})` : ""}
                                {author?.death_year ? ` - Died: ${author?.death_year}` : ""}
                            </span>
                        )) : <span className="my-1 mx-1">N/A</span>}
                    </p>
                    <p className="text-gray-600  mb-4 text-lg">

                        Book ID: <span className="my-1 mx-1 font-semibold">{data?.id}</span>
                    </p>
                    <div className="flex mb-4">
                        <div className="mr-4">
                            <span className="font-bold text-gray-700 ">Download count: </span>
                            <span className="text-gray-600 ">{data?.download_count}</span>
                        </div>

                        <div className="mr-4">
                            <span className="font-bold text-gray-700 ">Media type: </span>
                            <span className="text-gray-600 ">{data?.media_type}</span>
                        </div>
                        <div>
                            <span className="font-bold text-gray-700 ">Copyright: </span>
                            <span className="text-gray-600 ">{data?.copyright ? "True" : "False"}</span>
                        </div>
                    </div>
                    <div className="mr-4">
                        <span className="font-bold text-gray-700 ">Languange: </span>
                        {
                            data?.languages?.length > 0 ? data?.languages?.map((l, idx) => <span key={idx} className="text-gray-600 ">{l}</span>
                            ) : <span className="my-1 mx-1">N/A</span>
                        }
                    </div>
                    <div className="my-4">
                        <p className="text-gray-600 mb-4 text-lg font-semibold">
                        Translators: {data?.translators?.length > 0 ? data?.translators?.map((translator, idx) => (
                                <span key={idx} className="font-light ms-1">
                                    {idx+1}. {translator?.name}
                                    {translator?.birth_year ? ` (Born: ${translator?.birth_year})` : ""}
                                    {translator?.death_year ? ` - Died: ${translator?.death_year}` : ""}
                                </span>
                            )) : <span className="my-1 mx-1">N/A</span>}
                        </p>

                    </div>
                    <div className="mb-4">
                        <span className="font-bold text-gray-700 ">Genre:</span>
                        {
                            data?.subjects?.length > 0 ? data?.subjects?.map((g, idx) => <button key={idx} className="bg-white text-gray-700  py-2 px-2 mx-1 my-1 rounded-lg font-bold mr-2 inline-block  ">{g}</button>
                            ) : <span className="my-1 mx-1">N/A</span>
                        }
                    </div>
                    <div className="flex justify-between items-center gap-4">
                        <div>
                            <span className="font-bold text-gray-700 ">Bookshelves:</span>
                            {
                                data?.bookshelves?.length > 0 ? data?.bookshelves?.map((b, idx) => <p key={idx} className="text-gray-600 text-sm mt-2">{b}</p>) : <span className="my-1 mx-1">N/A</span>
                            }

                        </div>

                        <div>
                            <span className="font-bold text-gray-700">Book sources:</span>
                            {data?.formats && Object.keys(data.formats).length > 0 ? (
                                Object.keys(data.formats).map((key, idx) => (
                                    <a
                                        target="blank"
                                        href={data.formats[key]}
                                        key={idx}
                                        className="text-blue-600 underline block text-sm mt-2"
                                    >
                                        {formatName[key] || "Unknown Format"}
                                    </a>
                                ))
                            ) : (
                                <span className="my-1 mx-1">N/A</span>
                            )}
                        </div>
                    </div>
                </div>
            </div>)

    } return (
        <div className="bg-[#EDEBE4]  py-8 pt-20">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                {content}
            </div>
        </div>

    );
};

export default SingleBook;