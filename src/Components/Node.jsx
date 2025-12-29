import { FaFlag, FaFlagCheckered } from "react-icons/fa";
import * as constants from "../constants";
import { useBoard } from "../context/BoardContext";

const Node = ({ i, j, k }) => {
    const { board, setBoard, drawMode, placementMode } = useBoard();
    let cName = "node disable-select aspect-square ";
    let icon = "";

    const HandleWall = (e) => {
        if (e.buttons !== 1 && e.type !== "click") return;

        setBoard((prev) => {
            const next = prev.map((row) => [...row]);
            if (drawMode === 0 && k === constants.UNVISITED_NODE) {
                next[i][j] = constants.WALL;
            } else if (drawMode === 1 && k === constants.UNVISITED_NODE) {
                next[i][j] = constants.MUD;
            }

            return next;
        });
    };

    if (k === constants.START_FLAG) {
        cName += "start text-green-600";
        icon = <FaFlag />;
    } else if (k === constants.END_FLAG) {
        cName += "end text-red-600";
        icon = <FaFlagCheckered />;
    } else if (k === constants.VISITED_NODE) {
        cName += "visited";
    } else if (k === constants.RECONSTRUCTED_PATH) {
        cName += "path";
    } else if (k === constants.WALL) {
        cName += "wall";
    } else if (k === constants.MUD) {
        cName += "mud";
    }

    return (
        <div
            onClick={(e) => HandleWall(e)}
            onMouseEnter={(e) => HandleWall(e)}
            className={cName}
        >
            {icon}
        </div>
    );
};

export default Node;
