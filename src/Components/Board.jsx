import Node from "./Node";

import Visualizer from "./Algorithms";

var board = [];

const Board = () => {
    board = [];

    for (let i = 0; i < 32; i++) {
        const row = [];

        for (let j = 0; j < 64; j++) {
            row.push(<Node key={`${i}-${j}`} i={i} j={j} />);
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

export const Visualize = (algoID) => {
    const frames = Visualizer(algoID, board);
    console.log(frames);
};

export default Board;
