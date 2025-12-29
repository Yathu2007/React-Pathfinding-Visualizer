import { IoMdCloseCircleOutline } from "react-icons/io";
import { useBoard } from "../context/BoardContext";

const Alert = () => {
    const { alert, setAlert } = useBoard();

    return (
        <div
            className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 transition-all translate-y-0 ${
                alert !== null ? "scale-100" : "scale-0"
            }`}
        >
            <div
                className="flex items-center gap-3 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded shadow-lg"
                role="alert"
            >
                <strong className="font-bold">No path found</strong>

                <span className="text-sm">{alert}</span>

                <button
                    onClick={() => setAlert(null)}
                    className="ml-2 hover:text-red-900"
                >
                    <IoMdCloseCircleOutline size={20} />
                </button>
            </div>
        </div>
    );
};

export default Alert;
