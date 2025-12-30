import AlgoStates from "./Algorithms";

const Visualize = async (
    algoID,
    board,
    setBoard,
    start,
    end,
    setAlert,
    setAnimationPlaying
) => {
    const [found, frames] = AlgoStates(algoID, board, start, end);

    if (!found) {
        setAlert("There is no valid path between start and end.");
        return;
    }

    setAnimationPlaying(true);
    await Visualizer(frames, setBoard);
    setAnimationPlaying(false);
};

const Visualizer = async (boards, setBoard) => {
    for (const board of boards) {
        setBoard(board);
        await new Promise((resolve) => setTimeout(resolve, 20));
    }
};

export default Visualize;
