import { TbBarrierBlock } from "react-icons/tb";

const SideBar = () => {
    return (
        <div className="fixed top-0 h-screen w-16 flex flex-col text-white  bg-slate-400 align-top shadow-lg">
            <SideBarIcon icon={<TbBarrierBlock />} />
        </div>
    );
};

const SideBarIcon = ({ icon }) => {
    return <button className="sidebar-icon">{icon}</button>;
};

export default SideBar;
