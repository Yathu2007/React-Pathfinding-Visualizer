import { createContext, useContext, useState, useEffect } from "react";
import * as constants from "../constants";

const deepCopy = (board) => {
    return JSON.parse(JSON.stringify(board));
};

const BoardContext = createContext(null);

export const BoardProvider = ({ children }) => {
    const [board, setBoard] = useState(
        Array.from({ length: constants.ROWS }, () =>
            Array.from({ length: constants.COLS }, () => ({
                terrain: constants.TERRAIN.EMPTY,
                role: constants.ROLE.NONE,
                state: constants.NODE_STATE.UNVISITED,
            }))
        )
    );
    const [start, setStart] = useState([15, 15]);
    const [end, setEnd] = useState([15, 45]);
    const [algorithm, setAlgorithm] = useState(0);
    const [placementMode, setPlacementMode] = useState(null);
    const [drawMode, setDrawMode] = useState(null);
    const [alert, setAlert] = useState(null);
    const [animationPlaying, setAnimationPlaying] = useState(false);

    useEffect(() => {
        let copy = deepCopy(board);
        copy[start[0]][start[1]].role = constants.ROLE.START;
        copy[end[0]][end[1]].role = constants.ROLE.END;
        setBoard(copy);
    }, []);

    return (
        <BoardContext.Provider
            value={{
                board,
                setBoard,
                start,
                setStart,
                end,
                setEnd,
                algorithm,
                setAlgorithm,
                placementMode,
                setPlacementMode,
                drawMode,
                setDrawMode,
                alert,
                setAlert,
                animationPlaying,
                setAnimationPlaying,
            }}
        >
            {children}
        </BoardContext.Provider>
    );
};

export const useBoard = () => useContext(BoardContext);
