/*
k = 0 unvisited node
k = 1 start flag
k = 2 end flag
k = 3 barrier/wall
k = 4 visited node
k = 5 path reconstruction
*/
export const UNVISITED_NODE = 0;
export const START_FLAG = 1;
export const END_FLAG = 2;
export const WALL = 3;
export const VISITED_NODE = 4;
export const RECONSTRUCTED_PATH = 5;
export const MUD = 6;

export const ROWS = 35;
export const COLS = 64;

export const TERRAIN = {
    EMPTY: 0,
    WALL: 1,
    MUD: 2,
};

export const ROLE = {
    NONE: 0,
    START: 1,
    END: 2,
};

export const NODE_STATE = {
    UNVISITED: 0,
    VISITED: 1,
    PATH: 2,
};
