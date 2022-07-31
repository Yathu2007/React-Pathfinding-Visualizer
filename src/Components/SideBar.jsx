import React from "react";
import useDarkMode from "../hooks/useDarkMode";

import { BsFillLightningChargeFill, BsCpuFill } from "react-icons/bs";
import { TbBarrierBlock } from "react-icons/tb";
import { FaPlay, FaCog, FaSun, FaMoon } from "react-icons/fa";

const SideBar = () => {
    const [oppositeTheme, setTheme] = useDarkMode();

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

            <SideBarIcon icon={<FaPlay size={20} />} tooltip="play animation" />

            <SideBarIcon
                id="algo"
                icon={<BsCpuFill size={25} />}
                tooltip="algorithm"
                click={() => HandleClick("algo")}
                options={[
                    "A* algorithm",
                    "Dijkstra's algorithm",
                    "Depth First Search",
                    "Breadth First Search",
                ]}
            />

            <SideBarIcon
                icon={<TbBarrierBlock size={25} />}
                tooltip="add barrier"
            />

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

const SideBarIcon = ({ id = "", icon, tooltip, click, options = [] }) => {
    return (
        <button id={id} className="sidebar-icon group" onClick={() => click()}>
            {icon}
            <span className="sidebar-tooltip group-hover:scale-100 transition-all group-active:scale-0">
                {tooltip}
            </span>
            {options.length !== 0 ? <Dropdown id={id} options={options} /> : ""}
        </button>
    );
};

const Dropdown = ({ id, options }) => {
    const option_list = [];

    for (let i = 0; i < options.length; i++) {
        const key = id + "-" + i;
        option_list.push(
            <li key={key} id={key}>
                {options[i]}
            </li>
        );
    }

    return (
        <div className="dropdown-menu">
            <ul>{option_list}</ul>
        </div>
    );
};

const HandleClick = (id) => {
    const dropdown = window.document.getElementById(id).lastChild;
    dropdown.classList.toggle("scale-100");

    window.onclick = function (e) {
        if (!e.target.matches(".dropdown-menu") && !(e.target.id === id)) {
            if (dropdown.classList.contains("scale-100")) {
                dropdown.classList.remove("scale-100");
                window.onclick = () => {};
            }
        }
        console.log(e.target.id);
    };
};

// class NavBar extends React.Component {
//     constructor(props) {
//         super(props);

//         this.state = {
//             algorithm: null,
//         };
//     }

//     render() {
//         return ();
//     }
// }

export default SideBar;
