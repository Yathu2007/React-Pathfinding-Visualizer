import * as constants from "../constants";
import PriorityQueue from "./PriorityQueue";

let boardStates = [];

const deepCopy = (board) => {
    return JSON.parse(JSON.stringify(board));
};

const AlgoStates = (id, board, start, end) => {
    const algorithms = [aStar, dijkstra, dfs, bfs];
    return algorithms[id](deepCopy(board), start, end);
};

const aStar = (board, start, end) => {
    boardStates.length = 0;
    const previousNodes = {};
    const distances = {}; // stores gCost
    const pq = new PriorityQueue();

    const [endX, endY] = end;

    // push: x, y, prev, gCost, fCost
    pq.push([start[0], start[1], null, 0, 0]);

    let found = false;

    while (!pq.isEmpty() && !found) {
        let [x, y, prev, gCost] = pq.pop();

        if (board[x][y] === constants.END_FLAG) {
            found = true;
            previousNodes[`${x}-${y}`] = prev;
            break;
        }

        if (
            board[x][y] === constants.UNVISITED_NODE ||
            board[x][y] === constants.MUD
        ) {
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
                x2 < constants.ROWS &&
                y2 >= 0 &&
                y2 < constants.COLS &&
                board[x2][y2] !== constants.WALL
            ) {
                const costOfCell = board[x2][y2] === constants.MUD ? 5 : 1;
                const newGCost = gCost + costOfCell;
                const nKey = `${x2}-${y2}`;

                if (
                    distances[nKey] === undefined ||
                    newGCost < distances[nKey]
                ) {
                    distances[nKey] = newGCost;

                    const hCost = Math.abs(x2 - endX) + Math.abs(y2 - endY);
                    const fCost = newGCost + hCost;
                    pq.push([x2, y2, [x, y], newGCost, fCost]);
                }
            }
        }
    }

    if (found)
        boardStates.push(
            ...pathReconstruction(previousNodes, board, start, end)
        );

    return [found, boardStates];
};

const dijkstra = (board, start, end) => {
    boardStates.length = 0;
    const previousNodes = {};
    const distances = {};
    const pq = new PriorityQueue();
    pq.push([...start, null, 0]);
    let found = false;

    while (!pq.isEmpty() && !found) {
        let [x, y, prev, cost] = pq.pop();

        if (board[x][y] === constants.END_FLAG) {
            found = true;
            previousNodes[`${x}-${y}`] = prev;
            break;
        }

        if (
            board[x][y] === constants.UNVISITED_NODE ||
            board[x][y] === constants.MUD
        ) {
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
                x2 < constants.ROWS &&
                y2 >= 0 &&
                y2 < constants.COLS &&
                board[x2][y2] !== constants.WALL
            ) {
                const costOfCell = board[x2][y2] === constants.MUD ? 5 : 1;
                const newCost = cost + costOfCell;
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
    if (found)
        boardStates.push(
            ...pathReconstruction(previousNodes, board, start, end)
        );

    return [found, boardStates];
};

const dfs = (board, start, end) => {
    const stack = [[...start, null]];
    return traverse(board, start, end, stack, (s) => s.pop());
};

const bfs = (board, start, end) => {
    const queue = [[...start, null]];
    return traverse(board, start, end, queue, (q) => q.shift());
};

const traverse = (board, start, end, container, popFn) => {
    boardStates.length = 0;
    const previousNodes = {};
    let found = false;

    while (container.length > 0 && !found) {
        let [x, y, prev] = popFn(container);

        if (board[x][y] === constants.END_FLAG) {
            found = true;
            previousNodes[`${x}-${y}`] = prev;
            break;
        }

        if (
            board[x][y] === constants.UNVISITED_NODE ||
            board[x][y] === constants.MUD
        ) {
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
                x2 < constants.ROWS &&
                y2 >= 0 &&
                y2 < constants.COLS &&
                board[x2][y2] !== constants.WALL &&
                board[x2][y2] !== constants.VISITED_NODE
            ) {
                container.push([x2, y2, [x, y]]);
                console.log(container, x2, y2);
            }
        }
    }

    if (found)
        boardStates.push(
            ...pathReconstruction(previousNodes, board, start, end)
        );

    return [found, boardStates];
};

const pathReconstruction = (previousNodes, board, start, end) => {
    let coord = previousNodes[`${end[0]}-${end[1]}`];
    const pathBoards = [];

    while (`${coord[0]}-${coord[1]}` !== `${start[0]}-${start[1]}`) {
        let [x, y] = coord;
        board[x][y] = constants.RECONSTRUCTED_PATH;
        pathBoards.push(deepCopy(board));
        coord = previousNodes[`${x}-${y}`];
    }

    return pathBoards;
};

export default AlgoStates;
