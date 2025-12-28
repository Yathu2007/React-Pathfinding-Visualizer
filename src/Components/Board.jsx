import Node from "./Node";
import { ROWS, COLS } from "../constants";

const GenerateBoard = (board, setBoard, drawMode) => {
    const nodeBoard = [];

    for (let i = 0; i < ROWS; i++) {
        for (let j = 0; j < COLS; j++) {
            nodeBoard.push(
                <Node
                    key={`${i}-${j}`}
                    i={i}
                    j={j}
                    k={board[i][j]}
                    board={board}
                    setBoard={setBoard}
                    drawMode={drawMode}
                />
            );
        }
    }

    return nodeBoard;
};

const Board = ({ board, setBoard, drawMode }) => {
    return (
        <div className="h-fit relative flex left-16 m-8 shadow-2xl overflow-auto">
            <div
                className="grid-container"
                style={{
                    gridTemplateColumns: `repeat(${COLS}, 28px)`,
                    gridTemplateRows: `repeat(${ROWS}, 28px)`,
                }}
            >
                {GenerateBoard(board, setBoard, drawMode)}
            </div>
        </div>
    );
};

export default Board;
