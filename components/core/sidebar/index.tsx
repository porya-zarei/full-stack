import {FC} from "react";
import {HiOutlineCog} from "react-icons/hi";
import SidebarList from "./sidebar-list";

interface SidebarProps {}

const Sidebar: FC<SidebarProps> = () => {
    return (
        <div className="flex justify-start items-start w-full h-full p-1 md:p-2">
            <aside className="flex items-start justify-start flex-wrap w-full">
                <div className="w-full flex justify-start items-center mb-4">
                    <div className="flex items-center justify-center w-auto relative px-0 md:px-2">
                        <h3 className="after:h-2 after:w-full after:rounded-full after:bg-secondary after:absolute after:bottom-0 after:right-0 after:-z-10">
                            <strong className="hidden md:block">امکانات</strong>
                            <span className="block md:hidden text-2xl">
                                <HiOutlineCog/>
                            </span>
                        </h3>
                    </div>
                </div>
                <SidebarList />
            </aside>
        </div>
    );
};

export default Sidebar;
