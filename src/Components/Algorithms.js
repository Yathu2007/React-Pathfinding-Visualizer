import constants from "../constants";

let boardStates = [];

const deepCopy = (board) => {
    return JSON.parse(JSON.stringify(board));
};

const AlgoStates = (id, board) => {
    const algorithms = [aStar, dijkstra, dfs, bfs];
    return algorithms[id](deepCopy(board));
};

const aStar = (board) => {};

const dijkstra = (board) => {
    boardStates.length = 0;
    const previous_nodes = {};
    const pq = [[15, 15, null]];
    let found = false;

    while (pq.length > 0 && !found) {
        let [x, y, prev] = pq;

        if (board[x][y] === constants.END_FLAG) {
            found = true;
            previous_nodes[`${x}-${y}`] = prev;
        } else if (
            board[x][y] === constants.UNVISITED_NODE ||
            board[x][y] === constants.START_FLAG
        ) {
            if (board[x][y] === 0) {
                board[x][y] = constants.VISITED_NODE;
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
                    board[x2][y2] !== constants.WALL &&
                    board[x2][y2] !== constants.VISITED_NODE
                ) {
                    pq.push([x2, y2, [x, y]]);
                }
            }
        }
    }

    boardStates.push(...path_reconstruction(previous_nodes, board));
    return boardStates;
};

const dfs = (board) => {
    const stack = [[15, 15, null]];
    return traverse(board, stack, (s) => s.pop());
};

const bfs = (board) => {
    const queue = [[15, 15, null]];
    return traverse(board, queue, (q) => q.shift());
};

const traverse = (board, container, popFn) => {
    boardStates.length = 0;
    const previous_nodes = {};
    let found = false;

    while (container.length > 0 && !found) {
        let [x, y, prev] = popFn(container);

        if (board[x][y] === constants.END_FLAG) {
            found = true;
            previous_nodes[`${x}-${y}`] = prev;
        } else if (
            board[x][y] === constants.UNVISITED_NODE ||
            board[x][y] === constants.START_FLAG
        ) {
            if (board[x][y] === constants.UNVISITED_NODE) {
                board[x][y] = constants.VISITED_NODE;
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
                    board[x2][y2] !== constants.VISITED_NODE
                ) {
                    container.push([x2, y2, [x, y]]);
                }
            }
        }
    }

    boardStates.push(...path_reconstruction(previous_nodes, board));
    return boardStates;
};

const path_reconstruction = (previous_nodes, board) => {
    let coord = previous_nodes["15-47"];
    const path_boards = [];

    while (`${coord[0]}-${coord[1]}` !== "15-15") {
        let [x, y] = coord;
        board[x][y] = constants.RECONSTRUCTED_PATH;
        path_boards.push(deepCopy(board));
        coord = previous_nodes[`${x}-${y}`];
    }

    return path_boards;
};

export default AlgoStates;
