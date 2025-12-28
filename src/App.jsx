import React, { useEffect, useState } from "react";
import SideBar from "./Components/SideBar";
import Board from "./Components/Board";
import * as constants from "./constants";

function App() {
    const [board, setBoard] = useState(
        Array.from({ length: constants.ROWS }, () =>
            Array.from({ length: constants.COLS }, () => 0)
        )
    );
    const [start, setStart] = useState([15, 15]);
    const [end, setEnd] = useState([15, 47]);
    const [algorithm, setAlgorithm] = useState(0);

    const [animationPlaying, setAnimationPlaying] = useState(false);
    const [selectingStartEnd, setSelectingStartEnd] = useState(0);
    const [drawMode, setDrawMode] = useState(null);

    useEffect(() => {
        let copy = [...board];
        copy[start[0]][start[1]] = constants.START_FLAG;
        copy[end[0]][end[1]] = constants.END_FLAG;
        setBoard(copy);
    }, []);

    return (
        <div className="App">
            <div className="flex min-h-screen dark:bg-gray-800">
                <Board board={board} setBoard={setBoard} drawMode={drawMode} />
                <SideBar
                    algorithm={algorithm}
                    setAlgorithm={setAlgorithm}
                    board={board}
                    setBoard={setBoard}
                    start={start}
                    end={end}
                    selectingStartEnd={selectingStartEnd}
                    drawMode={drawMode}
                    setDrawMode={setDrawMode}
                />
            </div>
        </div>
    );
}

export default App;
