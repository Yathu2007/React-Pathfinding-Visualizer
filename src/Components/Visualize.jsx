import AlgoStates from "./Algorithms";

const Visualize = (algoID, board, setBoard, start, end) => {
    const frames = AlgoStates(algoID, board, start, end);
    Visualizer(frames, setBoard);
};

const Visualizer = async (boards, setBoard) => {
    for (const board of boards) {
        setBoard(board);
        await new Promise((resolve) => setTimeout(resolve, 20));
    }
};

export default Visualize;
