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

            <SideBarIcon icon={<BsCpuFill size={25} />} tooltip="algorithm" />

            <SideBarIcon
                icon={<TbBarrierBlock size={25} />}
                tooltip="add barrier"
            />

            <div className="separator"></div>

            <div className="absolute bottom-4">
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

const SideBarIcon = ({ icon, tooltip, click }) => {
    return (
        <button className="sidebar-icon group" onClick={() => click()}>
            {icon}
            <span className="sidebar-tooltip group-hover:scale-100 transition-all group-active:scale-0">
                {tooltip}
            </span>
        </button>
    );
};

export default SideBar;
