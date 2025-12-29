import AlgoStates from "./Algorithms";

const Visualize = (algoID, board, setBoard, start, end, setAlert) => {
    const [found, frames] = AlgoStates(algoID, board, start, end);
    if (found) Visualizer(frames, setBoard);
    else setAlert("There is no valid path between start and end.");
};

const Visualizer = async (boards, setBoard) => {
    for (const board of boards) {
        setBoard(board);
        await new Promise((resolve) => setTimeout(resolve, 20));
    }
};

export default Visualize;
