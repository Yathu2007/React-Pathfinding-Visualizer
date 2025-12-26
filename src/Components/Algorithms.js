import * as constants from "../constants";
import PriorityQueue from "./PriorityQueue";

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
    const previousNodes = {};
    const distances = {};
    const pq = new PriorityQueue();
    pq.push([15, 15, null, 0]);
    let found = false;

    while (!pq.isEmpty() && !found) {
        console.log(pq.peek());
        console.log(deepCopy(pq._heap));
        let [x, y, prev, cost] = pq.pop();

        if (board[x][y] === constants.END_FLAG) {
            found = true;
            previousNodes[`${x}-${y}`] = prev;
        } else if (
            board[x][y] === constants.UNVISITED_NODE ||
            board[x][y] === constants.START_FLAG
        ) {
            if (board[x][y] === constants.UNVISITED_NODE) {
                board[x][y] = constants.VISITED_NODE;
                boardStates.push(deepCopy(board));
                previousNodes[`${x}-${y}`] = prev;
            }

            const neighbors = [
                [x - 1, y],
                [x + 1, y],
                [x, y - 1],
                [x, y + 1],
            ];

            // add valid unvisited neighbors to the priority queue
            for (const [x2, y2] of neighbors) {
                if (
                    x2 >= 0 &&
                    x2 < 32 &&
                    y2 >= 0 &&
                    y2 < 64 &&
                    board[x2][y2] !== constants.WALL &&
                    board[x2][y2] !== constants.VISITED_NODE
                ) {
                    const newCost = cost + 1; // assuming uniform cost of 1
                    const nKey = `${x2}-${y2}`;

                    if (
                        distances[nKey] === undefined ||
                        newCost < distances[nKey]
                    ) {
                        distances[nKey] = newCost;
                        pq.push([x2, y2, [x, y], newCost]);
                    }
                }
            }
        }
    }
    console.log(previousNodes);
    boardStates.push(...pathReconstruction(previousNodes, board));
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
    const previousNodes = {};
    let found = false;

    while (container.length > 0 && !found) {
        let [x, y, prev] = popFn(container);

        if (board[x][y] === constants.END_FLAG) {
            found = true;
            previousNodes[`${x}-${y}`] = prev;
        } else if (
            board[x][y] === constants.UNVISITED_NODE ||
            board[x][y] === constants.START_FLAG
        ) {
            if (board[x][y] === constants.UNVISITED_NODE) {
                board[x][y] = constants.VISITED_NODE;
                boardStates.push(deepCopy(board));
                previousNodes[`${x}-${y}`] = prev;
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

    boardStates.push(...pathReconstruction(previousNodes, board));
    return boardStates;
};

const pathReconstruction = (previousNodes, board) => {
    let coord = previousNodes["15-47"];
    const pathBoards = [];

    console.log(previousNodes);

    while (`${coord[0]}-${coord[1]}` !== "15-15") {
        let [x, y] = coord;
        board[x][y] = constants.RECONSTRUCTED_PATH;
        pathBoards.push(deepCopy(board));
        coord = previousNodes[`${x}-${y}`];
    }

    return pathBoards;
};

export default AlgoStates;
