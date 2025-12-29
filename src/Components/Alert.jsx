import { IoMdCloseCircleOutline } from "react-icons/io";

const Alert = ({ content, onClose }) => {
    return (
        <div
            className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 transition-all translate-y-0 ${
                content !== null ? "scale-100" : "scale-0"
            }`}
        >
            <div
                className="flex items-center gap-3 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded shadow-lg"
                role="alert"
            >
                <strong className="font-bold">No path found</strong>

                <span className="text-sm">{content}</span>

                <button onClick={onClose} className="ml-2 hover:text-red-900">
                    <IoMdCloseCircleOutline size={20} />
                </button>
            </div>
        </div>
    );
};

export default Alert;
