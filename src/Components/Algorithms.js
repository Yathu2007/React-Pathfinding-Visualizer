let boardStates = [];

const deepCopy = (board) => {
    return JSON.parse(JSON.stringify(board));
};

const AlgoStates = (id, board) => {
    const algorithms = [aStar, dijkstra, dfs, bfs];
    return algorithms[id](deepCopy(board));
};

const aStar = (board) => {};

const dijkstra = (board) => {};

const dfs = (board, mode = 0) => {
    boardStates.length = 0;
    /*
    Mode = 0  DFS  (uses stack)
    Mode = 1  BFS  (uses queue)
    */

    const container = [[15, 15]];
    let previous_nodes = {};
    let found = false;

    while (container.length > 0 && found === false) {
        // DFS stack (pop last element); BFS queue (pop first element)
        let [x, y, prev] = mode ? container.shift() : container.pop();

        if (board[x][y] === 2) {
            found = true;
            previous_nodes[`${x}-${y}`] = prev;
        } else if (board[x][y] === 0 || board[x][y] === 1) {
            if (board[x][y] === 0) {
                board[x][y] = 4;
                boardStates.push(deepCopy(board));
                previous_nodes[`${x}-${y}`] = prev;
            }

            const neighbors = [
                [x - 1, y],
                [x + 1, y],
                [x, y - 1],
                [x, y + 1],
            ];

            // add valid unvisited neighbors to the stack/queue
            for (const [x2, y2] of neighbors) {
                if (
                    x2 >= 0 &&
                    x2 < 32 &&
                    y2 >= 0 &&
                    y2 < 64 &&
                    board[x2][y2] !== 4
                ) {
                    container.push([x2, y2, [x, y]]);
                }
            }
        }
    }

    boardStates.push(...path_reconstruction(previous_nodes, board));
    return boardStates;
};

const bfs = (board) => {
    return dfs(board, 1);
};

const path_reconstruction = (previous_nodes, board) => {
    let coord = previous_nodes["15-47"];
    const path_boards = [];

    while (`${coord[0]}-${coord[1]}` !== "15-15") {
        let [x, y] = coord;
        board[x][y] = 5;
        path_boards.push(deepCopy(board));
        coord = previous_nodes[`${x}-${y}`];
    }

    return path_boards;
};

export default AlgoStates;
