import {FC} from "react";
import {SIDEBAR_ITEMS} from "@/constants";
import SidebarListItem from "./sidebar-list-item";
import { ISidebarItem } from "@/constants";

interface SidebarListProps {}

const SidebarList: FC<SidebarListProps> = () => {
    return (
        <ul className="flex flex-col items-start justify-center w-full">
            {SIDEBAR_ITEMS.map((item: ISidebarItem) => (
                <li
                    key={item.name}
                    className="flex items-center justify-center w-full p-1">
                    <SidebarListItem item={item} />
                </li>
            ))}
        </ul>
    );
};

export default SidebarList;
