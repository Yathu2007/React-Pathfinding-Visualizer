import { BsFlagFill } from "react-icons/bs";
import { FaFlagCheckered } from "react-icons/fa";

const Board = () => {
    const board = [];

    for (let i = 0; i < 32; i++) {
        const row = [];

        for (let j = 0; j < 64; j++) {
            const k =
                i === 15 && j === 15 ? 1 : i === 15 && j === 47 ? 0 : null;

            row.push(
                <td
                    key={`${i}-${j}`}
                    className={
                        k === 1
                            ? "node text-green-600"
                            : k === 0
                            ? "node text-red-600"
                            : "node"
                    }
                >
                    {k === 1 ? (
                        <BsFlagFill />
                    ) : k === 0 ? (
                        <FaFlagCheckered />
                    ) : (
                        ""
                    )}
                </td>
            );
        }

        board.push(<tr key={i}>{row}</tr>);
    }

    return (
        <div className="relative flex left-16 m-8 shadow-2xl">
            <table>
                <tbody>{board}</tbody>
            </table>
        </div>
    );
};

export default Board;
