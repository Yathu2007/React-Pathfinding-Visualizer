var boardStates = [];

const Visualizer = (id, board) => {
    const algorithms = [aStar, dijkstra, dfs, bfs];
    return algorithms[id](board);
};

const aStar = (board) => {};

const dijkstra = (board) => {};

const dfs = (board) => {
    const visited = [false] * 2048;
    const stack = [];

    return board;
};

const bfs = (board) => {};

export default Visualizer;
