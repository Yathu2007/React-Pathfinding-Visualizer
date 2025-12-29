import { createContext, useContext, useState, useEffect } from "react";
import * as constants from "../constants";

const BoardContext = createContext(null);

export const BoardProvider = ({ children }) => {
    const [board, setBoard] = useState(
        Array.from({ length: constants.ROWS }, () =>
            Array.from(
                { length: constants.COLS },
                () => constants.UNVISITED_NODE
            )
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
        let copy = board.map((row) => [...row]);
        copy[start[0]][start[1]] = constants.START_FLAG;
        copy[end[0]][end[1]] = constants.END_FLAG;
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
