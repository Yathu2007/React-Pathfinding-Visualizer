import { BsFlagFill } from "react-icons/bs";
import { FaFlagCheckered } from "react-icons/fa";
import * as constants from "../constants";

const Node = ({ i, j, k, board, setBoard, drawMode }) => {
    let cName = "node disable-select aspect-square ";
    let icon = "";

    const HandleWall = (e) => {
        if (e.buttons !== 1 && e.type !== "click") return;

        // const classes = e.target.classList; // class names

        setBoard((prev) => {
            const next = prev.map((row) => [...row]);
            if (drawMode === 0 && k === constants.UNVISITED_NODE) {
                next[i][j] = constants.WALL;
            } else if (drawMode === 1 && k === constants.UNVISITED_NODE) {
                next[i][j] = constants.MUD;
            }
            // else if (drawMode === 0) {
            //     next[i][j] = constants.UNVISITED_NODE;
            // }

            return next;
        });

        // if (
        //     !classes.contains("start") &&
        //     !classes.contains("end") &&
        //     (e._reactName === "onClick" || e.buttons === 1)
        // ) {
        //     classes.toggle("wall");
        //     let copy = [...board];
        //     copy[i][j] = 3;
        //     setBoard(copy);
        // }
    };

    if (k === constants.START_FLAG) {
        cName += "start text-green-600";
        icon = <BsFlagFill />;
    } else if (k === constants.END_FLAG) {
        cName += "end text-red-600";
        icon = <FaFlagCheckered />;
    } else if (k === constants.VISITED_NODE) {
        cName += "visited";
    } else if (k === constants.RECONSTRUCTED_PATH) {
        cName += "path";
    } else if (k === constants.WALL) {
        cName += "wall";
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
