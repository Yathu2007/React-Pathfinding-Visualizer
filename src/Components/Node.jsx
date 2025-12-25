import { BsFlagFill } from "react-icons/bs";
import { FaFlagCheckered } from "react-icons/fa";
import constants from "../constants";

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
