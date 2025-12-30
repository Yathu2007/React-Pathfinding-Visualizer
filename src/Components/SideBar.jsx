import useDarkMode from "../hooks/useDarkMode";
import { useState } from "react";
import {
    BsFillLightningChargeFill,
    BsCpuFill,
    BsCheckSquareFill,
} from "react-icons/bs";
import { VscDebugRestart } from "react-icons/vsc";
import {
    FaPlay,
    FaCog,
    FaSun,
    FaMoon,
    FaPencilAlt,
    FaFlagCheckered,
    FaFlag,
} from "react-icons/fa";
import * as constants from "../constants";
import Visualize from "./Visualize";
import { useBoard } from "../context/BoardContext";

const SideBar = () => {
    const {
        algorithm,
        setAlgorithm,
        board,
        setBoard,
        start,
        end,
        placementMode,
        setPlacementMode,
        drawMode,
        setDrawMode,
        setAlert,
    } = useBoard();

    const [oppositeTheme, setTheme] = useDarkMode();
    const [openDropdown, setOpenDropdown] = useState(null);

    const handleAlgoChange = (index) => {
        setAlgorithm(index);
        setOpenDropdown(null);
    };

    const handleDrawing = (index) => {
        setDrawMode(index);
        setOpenDropdown(null);
    };

    return (
        // top part
        <div className="fixed top-0 left-0 h-screen w-16 flex flex-col text-white m-0 bg-slate-100  dark:bg-primary drop-shadow-xl items-center">
            <div className="flex justify-start">
                <SideBarIcon
                    icon={<BsFillLightningChargeFill size={25} />}
                    tooltip="Pathfinding visualizer"
                />
            </div>

            <div className="separator"></div>

            <SideBarIcon
                icon={<FaPlay size={20} />}
                tooltip="play animation"
                click={() =>
                    Visualize(algorithm, board, setBoard, start, end, setAlert)
                }
            />

            <div className="relative flex justify-center">
                <SideBarIcon
                    id="algo"
                    icon={<BsCpuFill size={25} />}
                    tooltip="algorithm"
                    click={() =>
                        setOpenDropdown(openDropdown === "algo" ? null : "algo")
                    }
                />

                <Dropdown
                    open={openDropdown === "algo"}
                    options={[
                        "A* algorithm",
                        "Dijkstra's algorithm",
                        "Depth First Search",
                        "Breadth First Search",
                    ]}
                    selected={algorithm}
                    onSelect={handleAlgoChange}
                />
            </div>

            <SideBarIcon
                icon={<VscDebugRestart size={25} />}
                tooltip="reset board"
                click={() => ResetBoard(setBoard, start, end)}
            />

            <div className="separator"></div>

            <SideBarIcon
                id="selectStart"
                icon={<FaFlag size={20} />}
                tooltip="select start"
                active={placementMode === "START"}
                click={() => setPlacementMode("START")}
            />

            <SideBarIcon
                id="selectEnd"
                icon={<FaFlagCheckered size={20} />}
                tooltip="select end"
                active={placementMode === "END"}
                click={() => setPlacementMode("END")}
            />

            <div className="relative flex justify-center">
                <SideBarIcon
                    id="drawing"
                    icon={<FaPencilAlt size={20} />}
                    tooltip="draw barriers"
                    click={() =>
                        setOpenDropdown(
                            openDropdown === "drawing" ? null : "drawing"
                        )
                    }
                />
                <Dropdown
                    open={openDropdown === "drawing"}
                    options={["Wall (cost = ∞)", "Mud (cost = 5)"]}
                    selected={drawMode}
                    onSelect={handleDrawing}
                />
            </div>

            <div className="separator"></div>

            <div className="absolute bottom-1">
                <div className="separator"></div>

                <SideBarIcon
                    icon={
                        oppositeTheme === "light" ? (
                            <FaSun size={20} />
                        ) : (
                            <FaMoon size={20} />
                        )
                    }
                    tooltip="theme"
                    click={() => setTheme(oppositeTheme)}
                />
                <SideBarIcon icon={<FaCog size={20} />} tooltip="settings" />
            </div>
        </div>
    );
};

const SideBarIcon = ({ id = "", icon, tooltip, click, active = false }) => {
    return (
        <button
            id={id}
            className={`sidebar-icon group ${
                active ? "dark:bg-secondary text-white scale-110" : ""
            }`}
            onClick={() => click()}
        >
            {icon}
            <span className="sidebar-tooltip group-hover:scale-100 transition-all group-active:scale-0">
                {tooltip}
            </span>
        </button>
    );
};

const Dropdown = ({ open, options, selected, onSelect }) => {
    const option_list = [];

    for (let i = 0; i < options.length; i++) {
        option_list.push(
            <li key={i} onClick={() => onSelect(i)} className="disable-select">
                {i === selected && <BsCheckSquareFill />}
                {" " + options[i]}
            </li>
        );
    }

    return (
        <div
            className={`absolute left-16 top-1/2 -translate-y-1/2
        dropdown-menu
        transition-transform
        origin-left
        ${open ? "scale-100" : "scale-0"}
      `}
        >
            <ul>{option_list}</ul>
        </div>
    );
};

const ResetBoard = (setBoard, start, end) => {
    let empty_board = Array.from({ length: constants.ROWS }, () =>
        Array.from({ length: constants.COLS }, () => ({
            terrain: constants.TERRAIN.EMPTY,
            role: constants.ROLE.NONE,
            state: constants.NODE_STATE.UNVISITED,
        }))
    );

    empty_board[start[0]][start[1]].role = constants.ROLE.START;
    empty_board[end[0]][end[1]].role = constants.ROLE.END;

    setBoard(empty_board);
};

export default SideBar;
