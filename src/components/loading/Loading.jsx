import { PuffLoader } from "react-spinners";

const Loading = () => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#EDEBE4]">
            <PuffLoader size={100} color="black" />
        </div>
    );
};

export default Loading;