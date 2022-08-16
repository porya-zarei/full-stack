import {FC} from "react";
import {SIDEBAR_ITEMS} from "@/constants";
import SidebarListItem from "./sidebar-list-item";

interface SidebarListProps {}

const SidebarList: FC<SidebarListProps> = () => {
    return (
        <ul className="flex flex-col items-start justify-center w-full">
            {SIDEBAR_ITEMS.map((item) => (
                <>
                    <li
                        key={item.name}
                        className="flex items-center justify-center w-full p-1">
                        <SidebarListItem isSubPath={false} item={item} />
                    </li>
                    {item.subPaths &&
                        item.subPaths.map((subItem) => (
                            <li
                                key={subItem.name}
                                className="flex items-center justify-center w-full p-1">
                                - <SidebarListItem isSubPath={true} item={subItem} />
                            </li>
                        ))}
                </>
            ))}
        </ul>
    );
};

export default SidebarList;
