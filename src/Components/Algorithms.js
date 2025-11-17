var boardStates = [];

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
    /*
    Mode = 0  DFS  (uses stack)
    Mode = 1  BFS  (uses queue)
    */

    const container = [[15, 15]];
    let found = false;

    while (container.length > 0 && found === false) {
        console.log(deepCopy(container));

        // DFS stack (pop last element); BFS queue (pop first element)
        let [x, y] = mode ? container.shift() : container.pop();

        console.log(x, y);

        if (board[x][y] === 2) {
            found = true;
        } else if (board[x][y] === 0 || board[x][y] === 1) {
            if (board[x][y] === 0) {
                board[x][y] = 4;
                boardStates.push(deepCopy(board));
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
                    container.push([x2, y2]);
                }
            }
        }
    }

    console.log(boardStates);
    return boardStates;
};

const bfs = (board) => {
    return dfs(board, 1);
};

export default AlgoStates;
