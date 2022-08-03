import { BsFlagFill } from "react-icons/bs";
import { FaFlagCheckered } from "react-icons/fa";

const Node = ({ i, j }) => {
    const cName = "node disable-select ";
    const k = i === 15 && j === 15 ? 1 : i === 15 && j === 47 ? 0 : null;

    return (
        <td
            onClick={(e) => HandleWall(e)}
            onMouseEnter={(e) => HandleWall(e)}
            className={
                k === 1
                    ? cName + "start text-green-600"
                    : k === 0
                    ? cName + "end text-red-600"
                    : cName
            }
        >
            {k === 1 ? <BsFlagFill /> : k === 0 ? <FaFlagCheckered /> : ""}
        </td>
    );
};

const HandleWall = (e) => {
    const classes = e.target.classList; // class names

    if (
        !classes.contains("start") &&
        !classes.contains("end") &&
        (e._reactName === "onClick" || e.buttons === 1)
    ) {
        classes.toggle("wall");
    }
};

export default Node;
