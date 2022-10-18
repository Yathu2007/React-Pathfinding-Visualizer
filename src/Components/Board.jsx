import Node from "./Node";

import AlgoStates from "./Algorithms";

const GenerateBoard = (board, setBoard) => {
    const nodeBoard = [];

    for (let i = 0; i < 32; i++) {
        const row = [];

        for (let j = 0; j < 64; j++) {
            row.push(
                <Node
                    key={`${i}-${j}`}
                    i={i}
                    j={j}
                    k={board[i][j]}
                    board={board}
                    setBoard={setBoard}
                />
            );
        }

        nodeBoard.push(<tr key={i}>{row}</tr>);
    }

    return nodeBoard;
};

const Board = ({ board, setBoard }) => {
    return (
        <div className="relative flex left-16 m-8 shadow-2xl">
            <table>
                <tbody>{GenerateBoard(board, setBoard)}</tbody>
            </table>
        </div>
    );
};

export const Visualize = (algoID, board, setBoard) => {
    const frames = AlgoStates(algoID, board);
    Visualizer(frames, setBoard);
};

const Visualizer = async (boards, setBoard) => {
    for (const board of boards) {
        setBoard(board);
        await new Promise((resolve) => setTimeout(resolve, 20));
    }
};

export default Board;
