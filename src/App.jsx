import React, { useEffect, useState } from "react";
import SideBar from "./Components/SideBar";
import Board from "./Components/Board";

function App() {
    const [board, setBoard] = useState(
        Array.from({ length: 32 }, () => Array.from({ length: 64 }, () => 0))
    );
    const [start, setStart] = useState([15, 15]);
    const [end, setEnd] = useState([15, 47]);
    const [algorithm, setAlgorithm] = useState(0);

    useEffect(() => {
        let copy = [...board];
        copy[start[0]][start[1]] = 1;
        copy[end[0]][end[1]] = 2;
        setBoard(copy);
    }, []);

    return (
        <div className="App">
            <div className="flex min-h-screen max-h-max dark:bg-gray-800">
                <Board board={board} setBoard={setBoard} />
                <SideBar
                    algorithm={algorithm}
                    setAlgorithm={setAlgorithm}
                    board={board}
                    setBoard={setBoard}
                />
            </div>
        </div>
    );
}

export default App;
