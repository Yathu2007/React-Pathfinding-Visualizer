import { FaFlag, FaFlagCheckered } from "react-icons/fa";
import * as constants from "../constants";
import { useBoard } from "../context/BoardContext";

const deepCopy = (board) => {
    return JSON.parse(JSON.stringify(board));
};

const Node = ({ i, j, cell }) => {
    const {
        setBoard,
        drawMode,
        placementMode,
        setPlacementMode,
        start,
        setStart,
        end,
        setEnd,
    } = useBoard();
    let cName = ["node disable-select aspect-square"];
    let icon = "";

    const HandleWall = (e) => {
        if (e.buttons !== 1 && e.type !== "click") return;

        setBoard((prev) => {
            const next = deepCopy(prev);

            if (placementMode === "START") {
                const [sx, sy] = start;
                next[sx][sy].role = constants.ROLE.NONE;
                next[i][j].role = constants.ROLE.START;
                setStart([i, j]);
                setPlacementMode(null);
            } else if (placementMode === "END") {
                const [ex, ey] = end;
                next[ex][ey].role = constants.ROLE.NONE;
                next[i][j].role = constants.ROLE.END;
                setEnd([i, j]);
                setPlacementMode(null);
            } else {
                if (
                    drawMode === 0 &&
                    cell.terrain === constants.TERRAIN.EMPTY
                ) {
                    next[i][j].terrain = constants.TERRAIN.WALL;
                } else if (
                    drawMode === 1 &&
                    cell.terrain === constants.TERRAIN.EMPTY
                ) {
                    next[i][j].terrain = constants.TERRAIN.MUD;
                }
            }

            return next;
        });
    };

    if (cell.terrain === constants.TERRAIN.WALL) cName.push("wall");
    if (cell.terrain === constants.TERRAIN.MUD) cName.push("mud");

    if (cell.state === constants.NODE_STATE.VISITED) cName.push("visited");
    if (cell.state === constants.NODE_STATE.PATH) cName.push("path");

    if (cell.role === constants.ROLE.START) {
        cName.push("start text-green-600");
        icon = <FaFlag />;
    }

    if (cell.role === constants.ROLE.END) {
        cName.push("end text-red-600");
        icon = <FaFlagCheckered />;
    }

    if (placementMode !== null) cName.push("cursor-crosshair");
    else cName.push("cursor-default");

    return (
        <div
            onClick={(e) => HandleWall(e)}
            onMouseEnter={(e) => HandleWall(e)}
            className={cName.join(" ")}
        >
            {icon}
        </div>
    );
};

export default Node;
