import { BsFlagFill } from "react-icons/bs";
import { FaFlagCheckered } from "react-icons/fa";

const Node = ({ i, j, k, board, setBoard }) => {
    let cName = "node disable-select ";
    let icon = "";

    const HandleWall = (e) => {
        const classes = e.target.classList; // class names

        if (
            !classes.contains("start") &&
            !classes.contains("end") &&
            (e._reactName === "onClick" || e.buttons === 1)
        ) {
            classes.toggle("wall");

            let copy = [...board];
            copy[i][j] = 3;
            setBoard(copy);
        }
    };

    /*
    k = 0 unvisited node
    k = 1 start flag
    k = 2 end flag
    k = 3 barrier/wall
    k = 4 visited node
    k = 5 path reconstruction
    */

    if (k === 1) {
        cName += "start text-green-600";
        icon = <BsFlagFill />;
    } else if (k === 2) {
        cName += "end text-red-600";
        icon = <FaFlagCheckered />;
    } else if (k === 4) {
        cName += "visited";
    } else if (k === 5) {
        cName += "path";
    }

    return (
        <td
            onClick={(e) => HandleWall(e)}
            onMouseEnter={(e) => HandleWall(e)}
            className={cName}
        >
            {icon}
        </td>
    );
};

export default Node;
